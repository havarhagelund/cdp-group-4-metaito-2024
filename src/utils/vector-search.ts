import { createClient } from "./supabase/server";

export async function vectorSearch(embedding: string) {
  const supabase = createClient();

  const { error, data } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 3,
  });

  if (error) {
    console.error(error);
    return error;
  }

  console.log(data);

  return true;
}
