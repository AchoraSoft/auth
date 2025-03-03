import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp, useForgotPassword } from "../hooks";

// Define types for components and styles
interface AuthShadCDNProps {
  components: {
    container: React.ElementType;
    title: React.ElementType;
    form: React.ElementType;
    label: React.ElementType;
    input: React.ElementType;
    button: React.ElementType | { item: React.ElementType; title: string };
    modeButton: React.ElementType;
    socialButton: React.ElementType;
    errorMessage: React.ElementType;
    link: React.ElementType;
  };
  styles?: {
    container?: string;
    title?: string;
    form?: string;
    label?: string;
    input?: string;
    button?: string;
    modeButton?: string;
    socialButton?: string;
    errorMessage?: string;
    link?: string;
  };
  icons?: {
    google?: React.ReactNode;
    github?: React.ReactNode;
  };
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
  };
  socialProviders?: {
    google?: boolean;
    github?: boolean;
  };
}

export function AuthShadCDN({
  components,
  styles = {},
  icons = {},
  labels = {},
  socialProviders = { google: true, github: true },
}: AuthShadCDNProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const router = useRouter();

  const { signIn, signInWithProvider } = useSignIn();
  const { signUp } = useSignUp();
  const { forgotPassword } = useForgotPassword();

  const validateForm = () => {
    let newErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (mode !== "forgot" && !formData.password) newErrors.password = "Password is required";
    if (mode === "signup" && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    let result;
    if (mode === "signin") {
      result = await signIn({ email: formData.email, password: formData.password });
    } else if (mode === "signup") {
      result = await signUp({ email: formData.email, password: formData.password });
    } else {
      result = await forgotPassword({ email: formData.email });
    }

    if (!result.success) {
      setErrors({ email: result.error || "Authentication failed" });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <components.container className={styles.container}>
      <components.title className={styles.title}>
        {mode === "signin"
          ? labels.signInTitle || "Sign In"
          : mode === "signup"
          ? labels.signUpTitle || "Sign Up"
          : labels.forgotPasswordTitle || "Forgot Password"}
      </components.title>

      <components.form onSubmit={handleSubmit} className={styles.form}>
        {/* Email Input */}
        <div>
          <components.label className={styles.label}>{labels.emailLabel || "Email"}</components.label>
          <components.input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={styles.input}
          />
          {errors.email && <components.errorMessage className={styles.errorMessage}>{errors.email}</components.errorMessage>}
        </div>

        {/* Password Input (if not forgot password mode) */}
        {mode !== "forgot" && (
          <div>
            <components.label className={styles.label}>{labels.passwordLabel || "Password"}</components.label>
            <components.input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={styles.input}
            />
            {errors.password && <components.errorMessage className={styles.errorMessage}>{errors.password}</components.errorMessage>}
          </div>
        )}

        {/* Confirm Password (for Sign Up) */}
        {mode === "signup" && (
          <div>
            <components.label className={styles.label}>{labels.confirmPasswordLabel || "Confirm Password"}</components.label>
            <components.input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={styles.input}
            />
            {errors.confirmPassword && (
              <components.errorMessage className={styles.errorMessage}>{errors.confirmPassword}</components.errorMessage>
            )}
          </div>
        )}

        {/* Submit Button */}
        {typeof components.button === "object" ? (
          <components.button.item className={styles.button}>{components.button.title}</components.button.item>
        ) : (
          <components.button className={styles.button}>
            {mode === "signin"
              ? labels.signInButton || "Sign In"
              : mode === "signup"
              ? labels.signUpButton || "Sign Up"
              : labels.forgotPasswordButton || "Reset Password"}
          </components.button>
        )}
      </components.form>

      {/* Social Sign In */}
      {socialProviders && (
        <div className="mt-4">
          <p className="text-gray-600 text-center">Or continue with</p>
          <div className="flex flex-col gap-2 mt-2">
            {socialProviders.google && (
              <components.socialButton className={styles.socialButton} onClick={() => signInWithProvider("google")}>
                {icons.google || <span>🔵</span>} Google
              </components.socialButton>
            )}
            {socialProviders.github && (
              <components.socialButton className={styles.socialButton} onClick={() => signInWithProvider("github")}>
                {icons.github || <span>🐙</span>} GitHub
              </components.socialButton>
            )}
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="mt-4 text-center">
        {mode === "signin" ? (
          <>
            <components.link className={`${styles.link} cursor-pointer`} onClick={() => setMode("signup")}>
              {labels.createAccount || "Create an account"}
            </components.link>
            <br />
            <components.link className={`${styles.link} cursor-pointer`} onClick={() => setMode("forgot")}>
              {labels.forgotPasswordPrompt || "Forgot password?"}
            </components.link>
          </>
        ) : (
          <components.link className={`${styles.link} cursor-pointer`} onClick={() => setMode("signin")}>
            {mode === "signup" ? labels.alreadyHaveAccount || "Already have an account?" : labels.backToSignIn || "Back to Sign In"}
          </components.link>
        )}
      </div>
    </components.container>
  );
}
