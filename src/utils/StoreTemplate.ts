import { createClient } from "./supabase/Server";

/**
 * storeTemplate - Inserts a new template record into the Supabase database.
 *
 * @param {string} title - The title of the template.
 * @param {string} embedding - The embedding associated with the template.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the insertion is successful, or `false` if an error occurs.
 */
export async function storeTemplate(title: string, embedding: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("template")
    .insert([{ title: title, embedding: embedding }])
    .select();

  if (error) {
    console.error(error);
    return false;
  }

  console.log(data);

  return true;
}
