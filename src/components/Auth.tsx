/** @jsxImportSource @emotion/react */
"use client";

import { useState } from "react";
import { useSignInValidation, useSignUpValidation, useForgotPasswordValidation } from "../hooks";
import { useSignIn, useSignUp, useForgotPassword } from "../hooks";
import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

// Define a type for additional styles
type AdditionalStyles = Interpolation<Theme>;

// Styled components
const Container = styled.div<{ styles?: AdditionalStyles }>`
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  min-width: 580px;
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
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${(props) => props.styles}
`;

const SocialButton = styled.button<{ styles?: AdditionalStyles }>`
  width: 100%;
  padding: 0.5rem;
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background-color: #f3f4f6;
  }
  cursor: pointer
  ${(props) => props.styles}
`;

// Props for custom labels
interface AuthProps {
  redirectUrl?: string;
  containerStyles?: AdditionalStyles;
  titleStyles?: AdditionalStyles;
  formStyles?: AdditionalStyles;
  labelStyles?: AdditionalStyles;
  inputStyles?: AdditionalStyles;
  errorMessageStyles?: AdditionalStyles;
  buttonStyles?: AdditionalStyles;
  modeButtonStyles?: AdditionalStyles;

  // Customizable text labels
  labels?: {
    signInTitle?: string;
    signUpTitle?: string;
    forgotPasswordTitle?: string;
    emailLabel?: string;
    passwordLabel?: string;
    confirmPasswordLabel?: string;
    signInButton?: string;
    signUpButton?: string;
    forgotPasswordButton?: string;
    createAccount?: string;
    alreadyHaveAccount?: string;
    forgotPasswordPrompt?: string;
    backToSignIn?: string;
    errorMessageGeneric?: string;
  };
  // Social providers configuration
  socialProviders?: {
      google?: boolean;
      github?: boolean;
    // Add more providers as needed
  };
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
  labels = {}, // Default to an empty object if no labels are provided
  socialProviders = {google: true}
}: AuthProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  // Validation hooks
  const signInValidation = useSignInValidation();
  const signUpValidation = useSignUpValidation();
  const forgotPasswordValidation = useForgotPasswordValidation();

  // Supabase hooks
  const { signIn, signInWithProvider } = useSignIn();
  const { signUp } = useSignUp();
  const { forgotPassword } = useForgotPassword();

  const { register, handleSubmit, errors, clearErrors }: any =
    mode === "signin" ? signInValidation : mode === "signup" ? signUpValidation : forgotPasswordValidation;

     // Handle social provider sign-in
     const handleSocialSignIn = async (provider: "google" | "github") => {
      const result = await signInWithProvider(provider);
    
      if (result.success) {
        router.push(redirectUrl);
      } else {
        setFormError(result.error || "Failed to sign in with social provider.");
      }
    };
  const onSubmit = async (data: any) => {
    setFormError(null);

    try {
      if (mode === "signin") {
        const result = await signIn({ email: data.email, password: data.password });
        if (result.success) {
          router.push(redirectUrl);
        } else {
          setFormError(result.error || labels.errorMessageGeneric || "Invalid login credentials.");
        }
      } else if (mode === "signup") {
        const result = await signUp({ email: data.email, password: data.password });
        if (result.success) {
          router.push(redirectUrl);
        } else {
          setFormError(result.error || labels.errorMessageGeneric || "Signup failed. Please try again.");
        }
      } else if (mode === "forgot") {
        const result = await forgotPassword({ email: data.email });
        if (result.success) {
          setMode("signin");
        } else {
          setFormError(result.error || labels.errorMessageGeneric || "Failed to reset password.");
        }
      }
    } catch (error) {
      setFormError(labels.errorMessageGeneric || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container styles={containerStyles} suppressHydrationWarning>
      <Title styles={titleStyles}>
        {mode === "signin"
          ? labels.signInTitle || "Sign In"
          : mode === "signup"
          ? labels.signUpTitle || "Sign Up"
          : labels.forgotPasswordTitle || "Forgot Password"}
      </Title>

      {formError && <ErrorMessage styles={errorMessageStyles}>{formError}</ErrorMessage>}

      <Form onSubmit={handleSubmit(onSubmit)} styles={formStyles}>
        <div>
          <Label styles={labelStyles}>{labels.emailLabel || "Email"}</Label>
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
            <Label styles={labelStyles}>{labels.passwordLabel || "Password"}</Label>
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

        <Button type="submit" styles={buttonStyles}>
          {mode === "signin"
            ? labels.signInButton || "Sign In"
            : mode === "signup"
            ? labels.signUpButton || "Sign Up"
            : labels.forgotPasswordButton || "Reset Password"}
        </Button>
      </Form>

       {/* Social Providers */}
       {(socialProviders.google) && (
        <div
          css={css`
            margin-top: 1rem;
            text-align: center;
          `}
        >
          <p
            css={css`
              margin-bottom: 1rem;
              color: #6b7280;
            `}
          >
            Or continue with
          </p>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            `}
          >
            {socialProviders.google && (
              <SocialButton onClick={() => handleSocialSignIn("google")}>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  css={css`
                    width: 1rem;
                    height: 1rem;
                  `}
                />
                Google
              </SocialButton>
            )}
            {socialProviders.github && (
              <SocialButton onClick={() => handleSocialSignIn("github")}>
                <img
                  src="https://github.com/favicon.ico"
                  alt="GitHub"
                  css={css`
                    width: 1rem;
                    height: 1rem;
                  `}
                />
                GitHub
              </SocialButton>
            )}
          </div>
        </div>
      )}

      <div
        css={css`
          margin-top: 1rem;
          text-align: center;
        `}
      >
        {
        mode === "signin" ? (
          <>
            <ModeButton onClick={() => setMode("signup")} styles={modeButtonStyles}>
              {labels.createAccount || "Create an account"}
            </ModeButton>
            <br />
            <ModeButton onClick={() => setMode("forgot")} styles={modeButtonStyles}>
              {labels.forgotPasswordPrompt || "Forgot password?"}
            </ModeButton>
          </>
        ) : mode === "signup" ? (
          <ModeButton onClick={() => setMode("signin")} styles={modeButtonStyles}>
            {labels.alreadyHaveAccount || "Already have an account? Sign In"}
          </ModeButton>
        ) : (
          // Forgot password mode
          <ModeButton onClick={() => setMode("signin")} styles={modeButtonStyles}>
            {labels.backToSignIn || "Back to Sign In"}
          </ModeButton>
          )
        }
      </div>
    </Container>
  );
}
