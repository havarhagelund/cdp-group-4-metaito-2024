import { grid } from "@/types/layout";
import { createClient } from "./supabase/Client";
import { widget } from "@/types/splat";

type json = {
  grid: grid;
  content: widget[];
};

/**
 * updateSplat - Updates an existing splat record in the Supabase database.
 *
 * @param {number} id - The unique identifier of the splat to update.
 * @param {json} json - A JSON object containing the updated data for the splat.
 * @param {string} [title] - (Optional) The new title for the splat.
 * @param {string} [subtitle] - (Optional) The new subtitle for the splat.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the update is successful, or `false` if an error occurs.
 */
export async function updateSplat(
  id: number,
  json: json,
  title?: string,
  subtitle?: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("splat")
    .update({ id: id, title: title, subtitle: subtitle, json: json })
    .eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  console.log(data);

  return true;
}
