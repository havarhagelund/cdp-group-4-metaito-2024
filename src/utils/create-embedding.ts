export async function CreateEmbedding(input: string) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    body: JSON.stringify({
      input: input,
      model: "text-embedding-3-small",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
  });
  const json = await new Response(response.body).json();
  const embedding = json.data[0].embedding;

  return embedding;
}
