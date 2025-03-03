import { createClient } from "@supabase/supabase-js";

// Check if the code is running in the browser
const isBrowser = typeof window !== "undefined";

// Initialize Supabase client only in the browser
let supabase: ReturnType<typeof createClient> | null = null;

if (isBrowser) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or key is missing in environment variables.");
  }

  console.log("Supabase URL:", supabaseUrl); // Debugging
  console.log("Supabase Anon Key:", supabaseAnonKey); // Debugging

  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the Supabase client
export { supabase };