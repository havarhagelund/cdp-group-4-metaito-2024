import { equal } from "assert";
import { createClient } from "./supabase/server";

export async function StoreTemplate(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("splat").select("*").eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  console.log(data);

  return true;
}
