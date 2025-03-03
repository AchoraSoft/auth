import { supabase } from "../utils/supabaseClient";
import { SignInFormData } from "../schemas/auth";

export function useSignIn() {
  const signIn = async ({ email, password }: SignInFormData) => {
    if (!supabase) {
      return { success: false, error: "Supabase client is not available." };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Social provider sign-in
  const signInWithProvider = async (provider: "google" | "github") => {
    if (!supabase) {
      return { success: false, error: "Supabase client is not available." };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { signIn, signInWithProvider };
}