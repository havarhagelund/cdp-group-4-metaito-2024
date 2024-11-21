import { createBrowserClient } from "@supabase/ssr";

/**
 * createClient - Creates a new Supabase client using the environment variables.
 *
 * @returns {SupabaseClient} - The new Supabase local client.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
