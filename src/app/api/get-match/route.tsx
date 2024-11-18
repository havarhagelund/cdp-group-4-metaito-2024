import { CreateEmbedding } from "@/utils/create-embedding";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { vectorSearch } from "@/utils/vector-search";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const str = body.str;

  const embedding = await CreateEmbedding(str);
  const match = await vectorSearch(embedding);
  const template = match[0];

  //TODO: la AI lage subtitle og title

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that generates customized titles and subtitles based on user input. The titles and subitiels shall be used for a company dashbord. The titles and subtitles must be in Norwegian. Follow the provided structure strictly.",
      } as const,
      {
        role: "user",
        content: `
        Create a title and subtitle with the following context: ${str}

        ### Output Format:
        Return only valid JSON, without markdown formatting or any additional text on this format:
        {
            "title": "Dette er en tittel",
            "subtitle": "Dette er en subtitel"
        }`,
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

  const cleanedContent = content.replace(/^```json\s*|\s*```$/g, "");

  let aiOutput;
  try {
    aiOutput = JSON.parse(cleanedContent);
  } catch (parseError) {
    console.error("Error parsing AI response:", parseError);
    throw new Error("AI returned invalid JSON");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("splat")
    .insert([
      {
        title: aiOutput.title ?? "Dashbord",
        subtitle: aiOutput.subtitle ?? "Ditt område hvor du kan få oversikt.",
        embedding: embedding,
        json: template.json,
      },
    ])
    .select()
    .single();

  if (!data || error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server error, saving splat" },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: data.id }, { status: 200 });
}
