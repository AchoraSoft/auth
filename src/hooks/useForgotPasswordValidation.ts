import * as RHF from 'react-hook-form';
const { useForm } = RHF;
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas/auth";

export function useForgotPasswordValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema), // Integrate Zod validation
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}