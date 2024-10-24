import { CreateEmbedding } from "@/utils/create-embedding";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const embedding = await CreateEmbedding("Dette er en test");

  const supabase = createClient();

  const { data, error } = await supabase
    .from("splat")
    .insert([{ title: "Dette er en tittel", embedding: embedding }])
    .select();

  console.log(data);

  return NextResponse.json(
    { message: "Yeey", embedding: embedding },
    { status: 200 },
  );
}
