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
        console.log("Answered questions:", answeredQuestions);
        const context = getContext(answeredQuestions);
        console.log("Context:", context);

        const generatedQuestions = [];

        const prompt_questions = [];

        for (const question of questions) {
            //const hasPredefinedInfo = "information" in question && question.information !== "";
            prompt_questions.push(question.prompt_question || question.question);

            /* const payload = {
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

                            Customize the following question:
                            "${question.prompt_question || question.question}"

                            ### Requirements:
                            ${requirements}

                            ### Output Format:
                            Return only valid JSON, without markdown formatting or any additional text. For example:
                            {
                            "id": ${question.id}, // Preserve predefined id
                            "question": "<customized question>",
                            ${hasPredefinedInfo
                                ? `"information": "${question.information}", // Use predefined information`
                                : `"information": "<optional information>", // Generate dynamically`
                            }
                            "type": "${question.type}", // Predefined type
                            "options": ["<option1>", "<option2>", ...] // Required for multiselect or singleselect questions

                            }


                            IMPORTANT:
                            - Always include the "options" field for multiselect and singleselect questions, even if it's just placeholder options.
                            - Provide at least 10 options for multiselect and singleselect questions.
                        `,
                    } as const
                ],
                max_tokens: 300,
                temperature: 0.1,
            } */
            /* if (question.type === "multiselect" || question.type === "singleselect") {
                if (!aiOutput.options || !Array.isArray(aiOutput.options)) {
                    console.warn(`Missing "answerOptions" for question ID ${question.id}. Adding placeholder options.`);
                    aiOutput.answerOptions = ["Option 1", "Option 2", "Option 3"]; // Default options
                }
            } */

            /* if (hasPredefinedInfo && "information" in aiOutput) {
                aiOutput.information = question.information;
            }

            aiOutput.id = question.id; */
            //aiOutput.page_number = pageNumber; // Add page number to the response

            //generatedQuestions.push(aiOutput);
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

        console.log("Response choices:", response.choices);

        const content = response.choices[0]?.message?.content?.trim();
        if (!content) {
            throw new Error("AI response content is null or undefined");
        }
        console.log("Raw AI response:", content);
        await writeToMarkdownFile(payload, response);

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


/* 
    User has answered the following questions:
    Question: "...?"
    Answer: "..."
    Options: ["...", "..."]
 */

import fs from 'fs/promises'; // Import the filesystem promises API

interface Payload {
    model: string;
    messages: Array<{
        role: "system" | "user";
        content: string;
    }>;
    max_tokens: number;
    temperature: number;
}

interface AIResponse {
    choices: Array<{
        message: {
            content: string | null;
        };
    }>;
}

async function writeToMarkdownFile(payload: Payload, response: AIResponse): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Use a timestamp to create unique file names
    const fileName = `ai_log_${timestamp}.md`;
    const user_content = cleanContent(JSON.stringify(payload.messages.find((message) => message.role === "user")?.content || "No user content provided", null));

    // Format content for markdown
    const markdownContent = `
# AI Request Log

## Payload Sent to OpenAI

### Messages (Role: user)
${user_content}

## AI Response


# Raw AI Request and Response

## Payload Sent to OpenAI

\`\`\`json
    ${JSON.stringify(payload, null, 2)}
\`\`\`

## AI Response

\`\`\`json
    ${JSON.stringify(response, null, 2)}
\`\`\`
    `;

    // Write to file
    await fs.writeFile(fileName, markdownContent);
    console.log(`Log written to ${fileName}`);
}


function cleanContent(rawContent: string): string {
    return rawContent
        .replace(/^"/, '') // Remove the starting double quote
        .replace(/"$/, '') // Remove the ending double quote
        .replace(/\\n/g, '\n') // Replace escaped newline characters with actual newlines
        .trim(); // Trim extra spaces or newlines from the start and end
}

