import { supabase } from "../utils/supabaseClient";
import { ForgotPasswordFormData } from "../schemas/auth";

export function useForgotPassword() {
  const forgotPassword = async ({ email }: ForgotPasswordFormData) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { forgotPassword };
}