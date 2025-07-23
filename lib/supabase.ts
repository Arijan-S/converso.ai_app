import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    async accessToken() {
      try {
        return (await auth()).getToken();
      } catch (error) {
        console.error("Error getting auth token:", error);
        return null;
      }
    },
  });
};
