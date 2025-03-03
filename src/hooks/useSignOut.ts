import { supabase } from "../utils/supabaseClient";

export function useSignOut() {
  const signOut = async () => {
    if (!supabase) {
      return { success: false, error: "Supabase client is not available." };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { signOut };
}