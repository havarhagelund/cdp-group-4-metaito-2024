import { createClient } from "./supabase/server";

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
