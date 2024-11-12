import { grid } from "@/types/layout";
import { createClient } from "./supabase/client";
import { widget } from "@/types/splat";

type json = {
  grid: grid;
  content: widget[];
};

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
