import * as RHF from 'react-hook-form';
const { useForm } = RHF;
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "../schemas/auth";

export function useSignInValidation() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema), // Integrate Zod validation
  });

  return {
    register,
    handleSubmit,
    errors,
    clearErrors
  };
}