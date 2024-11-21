import { createClient } from "./supabase/Server";

/**
 * storeSplat - Inserts a new splat record into the Supabase database.
 *
 * @param {string} title - The title of the splat.
 * @param {string} description - A brief description of the splat.
 * @param {string} embedding - The embedding associated with the splat.
 * @param {string} json - A JSON string containing additional data for the splat.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the insertion is successful, or `false` if an error occurs.
 */
export async function storeSplat(
  title: string,
  description: string,
  embedding: string,
  json: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("splat")
    .insert([{ title: title, embedding: embedding, json: json }])
    .select();
  if (error) {
    console.error(error);
    return false;
  }

  console.log(data);

  return true;
}
