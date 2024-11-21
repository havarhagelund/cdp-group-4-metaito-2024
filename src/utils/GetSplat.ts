import { createClient } from "./supabase/Server";
import type { splat } from "@/types/splat";

/**
 * getSplat - Retrieves a splat record from the Supabase database by ID.
 *
 * @param {number} id - The ID of the splat record to retrieve.
 * @returns {Promise<Object|string>} - A promise that resolves to a splat object if successful, or an error message string if an error occurs.
 *
 * @throws {Error} Throws an error if the Supabase query fails.
 */
export async function getSplat(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("splat")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return error.message;
  }

  const splatFromBase: splat = {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    content: data.json.content,
    grid: data.json.grid,
  };
  return splatFromBase;
}
