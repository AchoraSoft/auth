import { supabase } from "../utils/supabaseClient";
import { SignUpFormData } from "../schemas/auth";

export function useSignUp() {
  const signUp = async ({ email, password }: SignUpFormData) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { signUp };
}