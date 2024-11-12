import { createClient } from "./supabase/server";
import type { splat } from "@/types/splat";

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
