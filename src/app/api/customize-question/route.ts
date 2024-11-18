import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { answeredQuestions, questions, requirements } = await req.json();

    if (!answeredQuestions) {
        return NextResponse.json(
            { error: "Missing answered questions" },
            { status: 400 }
        );
    }

    try {
        const context = getContext(answeredQuestions);

        const generatedQuestions = [];

        const prompt_questions = [];

        for (const question of questions) {
            prompt_questions.push(question.prompt_question || question.question);
        }

        const payload = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an assistant that generates customized survey questions based on user input. The purpose of the survey is to determine how to improve productivity for the user's team. Previous personal experiences are therefore not relevant.  Follow the provided structure strictly.",
                } as const,
                {
                    role: "user",
                    content: `
                        User has answered the following questions:
                        ${context}

                        Customize the following question(s):
                        ${prompt_questions.join("\n\n")}

                        ### Requirements:
                        ${requirements}

                        ### Output Format:
                        Return only valid JSON, without markdown formatting or any additional text. For example:
                        [
                        {
                            "id": ${questions[0].id}, // Preserve predefined id
                            "question": "<customized question>",
                            ${"information" in questions[0] && questions[0].information !== ""
                            ? `"information": "${questions[0].information}", // Use predefined information`
                            : `"information": "<optional information>", // Generate dynamically`
                        }
                            "type": "${questions[0].type}", // Predefined type
                            "options": ["<option1>", "<option2>", ...] // Required for multiselect or singleselect questions

                        }
                        ]
                        
                        If you have multiple questions, provide the same structure for each question as a list.

                        IMPORTANT:
                        - Always include the "options" field for multiselect and singleselect questions, even if it's just placeholder options.
                        - Provide at least 10 options for multiselect and singleselect questions.
                    `,
                } as const,
            ],
            max_tokens: 300,
            temperature: 0.1,
        };

        const response = await openai.chat.completions.create(payload);

        const content = response.choices[0]?.message?.content?.trim();
        if (!content) {
            throw new Error("AI response content is null or undefined");
        }

        const cleanedContent = content.replace(/^```json\s*|\s*```$/g, '');

        let aiOutput;
        try {
            aiOutput = JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error("Error parsing AI response:", parseError);
            throw new Error("AI returned invalid JSON");
        }

        for (let i = 0; i < aiOutput.length; i++) {
            const question = questions[i];
            const hasPredefinedInfo = "information" in question && question.information !== "";
            if (hasPredefinedInfo && "information" in aiOutput[i]) {
                aiOutput[i].information = question.information;
            }
            if (question.type === "multiselect") {
                aiOutput[i].options.push("Annet");
            }
            aiOutput[i].id = question.id;
            generatedQuestions.push(aiOutput[i]);
        }

        return NextResponse.json({ generatedQuestions });
    } catch (error) {
        console.error("Error generating questions:", error);
        return NextResponse.json({ error: "Error generating questions" }, { status: 500 });
    }
};

function getContext(answeredQuestions: { question: string; answer: any; options?: string[] }[]) {
    return answeredQuestions
        .map((qa) => {
            const optionsText = qa.options?.length
                ? `Options: ${qa.options.join(", ")}`
                : "Options: None";
            return `Question: "${qa.question}"\nAnswer: ${JSON.stringify(qa.answer)}\n${optionsText}`;
        })
        .join("\n\n");
}