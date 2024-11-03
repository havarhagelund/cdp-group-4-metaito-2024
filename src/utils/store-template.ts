import { createClient } from "./supabase/server";

export async function StoreTemplate(title: string, embedding: string) {
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
