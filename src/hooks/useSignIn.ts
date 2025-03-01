import { supabase } from "../utils/supabaseClient";
import { SignInFormData } from "../schemas/auth";

export function useSignIn() {
  const signIn = async ({ email, password }: SignInFormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { signIn };
}