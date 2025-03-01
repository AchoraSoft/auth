import * as RHF from 'react-hook-form';
const { useForm } = RHF;
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "../schemas/auth";

export function useSignUpValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), // Integrate Zod validation
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}