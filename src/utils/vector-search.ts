import { createClient } from "./supabase/server";

export async function vectorSearch(embedding: string) {
  const supabase = createClient();

  const { error, data } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.1,
    match_count: 1,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}
