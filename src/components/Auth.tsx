/** @jsxImportSource @emotion/react */
"use client";

import { useState } from "react";
import { useSignInValidation, useSignUpValidation, useForgotPasswordValidation } from "../hooks";
import { useSignIn, useSignUp, useForgotPassword } from "../hooks"; // Add the Supabase hooks
import { signIn } from "next-auth/react";
import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";

// Define a type for additional styles
type AdditionalStyles = Interpolation<Theme>;

// Styled components with additional styles prop
const Container = styled.div<{ styles?: AdditionalStyles }>`
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  ${(props) => props.styles}
`;

const Title = styled.h1<{ styles?: AdditionalStyles }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  ${(props) => props.styles}
`;

const Form = styled.form<{ styles?: AdditionalStyles }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${(props) => props.styles}
`;

const Label = styled.label<{ styles?: AdditionalStyles }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  ${(props) => props.styles}
`;

const Input = styled.input<{ hasError: boolean; styles?: AdditionalStyles }>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  ${(props) => props.styles}
`;

const ErrorMessage = styled.span<{ styles?: AdditionalStyles }>`
  color: #ef4444;
  font-size: 0.75rem;
  ${(props) => props.styles}
`;

const Button = styled.button<{ styles?: AdditionalStyles }>`
  width: 100%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  &:hover {
    background-color: #2563eb;
  }
  ${(props) => props.styles}
`;

const ModeButton = styled.button<{ styles?: AdditionalStyles }>`
  color: #3b82f6;
  &:hover {
    text-decoration: underline;
  }
  ${(props) => props.styles}
`;

// Props for the Auth component
interface AuthProps {
  redirectUrl?: string; // Optional redirect URL
  containerStyles?: AdditionalStyles; // Additional styles for Container
  titleStyles?: AdditionalStyles; // Additional styles for Title
  formStyles?: AdditionalStyles; // Additional styles for Form
  labelStyles?: AdditionalStyles; // Additional styles for Label
  inputStyles?: AdditionalStyles; // Additional styles for Input
  errorMessageStyles?: AdditionalStyles; // Additional styles for ErrorMessage
  buttonStyles?: AdditionalStyles; // Additional styles for Button
  modeButtonStyles?: AdditionalStyles; // Additional styles for ModeButton
}

export function Auth({
  redirectUrl = "/dashboard",
  containerStyles,
  titleStyles,
  formStyles,
  labelStyles,
  inputStyles,
  errorMessageStyles,
  buttonStyles,
  modeButtonStyles,
}: AuthProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");

  // Use the appropriate validation hook based on the mode
  const signInValidation = useSignInValidation();
  const signUpValidation = useSignUpValidation();
  const forgotPasswordValidation = useForgotPasswordValidation();

  // Use the Supabase hooks
  const { signIn: signInWithSupabase } = useSignIn();
  const { signUp: signUpWithSupabase } = useSignUp();
  const { forgotPassword: forgotPasswordWithSupabase } = useForgotPassword();

  const { register, handleSubmit, errors }: any =
    mode === "signin"
      ? signInValidation
      : mode === "signup"
      ? signUpValidation
      : forgotPasswordValidation;

  const onSubmit = async (data: any) => {
    if (mode === "signin") {
      const result = await signInWithSupabase({ email: data.email, password: data.password });
      if (result.success) {
        alert("Signed in successfully!");
        window.location.href = redirectUrl; // Use the configurable redirect URL
      } else {
        alert(result.error);
      }
    } else if (mode === "signup") {
      const result = await signUpWithSupabase({ email: data.email, password: data.password });
      if (result.success) {
        alert("Signed up successfully!");
      } else {
        alert(result.error);
      }
    } else if (mode === "forgot") {
      const result = await forgotPasswordWithSupabase({ email: data.email });
      if (result.success) {
        alert("Password reset email sent!");
      } else {
        alert(result.error);
      }
    }
  };

  const changeMode = (newMode: "signin" | "signup" | "forgot") => {
    setMode(newMode);
  };

  return (
    <Container styles={containerStyles}>
      <Title styles={titleStyles}>
        {mode === "signin" ? "Sign In" : mode === "signup" ? "Sign Up" : "Forgot Password"}
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)} styles={formStyles}>
        <div>
          <Label styles={labelStyles}>Email</Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            hasError={!!errors.email}
            styles={inputStyles}
          />
          {errors.email && <ErrorMessage styles={errorMessageStyles}>{errors.email.message}</ErrorMessage>}
        </div>

        {mode !== "forgot" && (
          <div>
            <Label styles={labelStyles}>Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              hasError={!!errors.password}
              styles={inputStyles}
            />
            {errors.password && <ErrorMessage styles={errorMessageStyles}>{errors.password.message}</ErrorMessage>}
          </div>
        )}

        {mode === "signup" && (
          <div>
            <Label styles={labelStyles}>Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              hasError={!!errors.confirmPassword}
              styles={inputStyles}
            />
            {errors.confirmPassword && (
              <ErrorMessage styles={errorMessageStyles}>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </div>
        )}

        <Button type="submit" styles={buttonStyles}>
          {mode === "signin" ? "Sign In" : mode === "signup" ? "Sign Up" : "Reset Password"}
        </Button>
      </Form>

      <div
        css={css`
          margin-top: 1rem;
          text-align: center;
        `}
      >
        {mode === "signin" && (
          <>
            <ModeButton onClick={() => changeMode("signup")} styles={modeButtonStyles}>
              Create an account
            </ModeButton>
            <br />
            <ModeButton onClick={() => changeMode("forgot")} styles={modeButtonStyles}>
              Forgot password?
            </ModeButton>
          </>
        )}
        {mode === "signup" && (
          <ModeButton onClick={() => changeMode("signin")} styles={modeButtonStyles}>
            Already have an account? Sign In
          </ModeButton>
        )}
        {mode === "forgot" && (
          <ModeButton onClick={() => changeMode("signin")} styles={modeButtonStyles}>
            Back to Sign In
          </ModeButton>
        )}
      </div>
    </Container>
  );
}