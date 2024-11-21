## How does the Form work?

This is a summary of how the AI Form works, and its implementation details.

### What is the AI Form?
The AI Form is the other main part of the application. This Form works as a way to get the correct splat given a set of answers. Some of the questions are predefined, but others are generated based on the earlier answers. It uses embedding functions to create and match embeddings in our database to retreieve the best Splat for you.

It has a few key features:
- A set of predefined questions
- Specific questions based on earlier answers
- An AI that matches your answers to the best splat for you
- A way to get the splat from the database

### How Does It Work Internally?
The implementation is pretty straight forward. We use OpenAI's API twice, once for the generated questions based on prompt engineering, and for creating embeddings to match with our templates of Splats in the Supabase database.


