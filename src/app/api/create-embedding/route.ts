import { CreateEmbedding } from "@/utils/create-embedding";
import { NextResponse } from "next/server";

export async function GET() {
  const embedding = await CreateEmbedding("Dette er en test");

  return NextResponse.json(
    { message: "Yeey", embedding: embedding },
    { status: 200 },
  );
}
