import { createClient } from "./supabase/Server";

/**
 * vectorSearch - Performs a vector-based search using the OpenAI embedding and Supabase RPC.
 *
 * @param {string} embedding - The embedding string used as the query for the vector search.
 * @returns {Promise<Object|Error>} - A promise that resolves to the search results object if successful, or an Error object if an error occurs.
 */
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
