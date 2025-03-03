# Next.js Supabase Auth Kit (This is a not the production ready version. It was made to have fun)

A reusable authentication package for Next.js applications using **Supabase**. This package provides components, hooks, and utilities for handling user authentication, including sign-in, sign-up, and password recovery.

---

## Features

- **Supabase Integration**: Built on top of Supabase for user authentication and management.
- **Zod Validation**: Form validation using Zod schemas for type safety and error handling.
- **Reusable Hooks**: Custom hooks for sign-in, sign-up, and forgot password functionality.
- **Protected Routes**: Higher-Order Component (HOC) to protect routes from unauthorized access.
- **Flexible Forms**: Use the provided `Auth` component or build your own forms with the validation hooks.

---

## Installation

Install the package using npm:

```bash
npm install nextjs-supabase-auth-kit
```

Or using yarn:

```bash
yarn add nextjs-supabase-auth-kit
```

---

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
```

### 2. Configure Auth.js

Create an API route for Auth.js in `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import { authConfig } from "nextjs-supabase-auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
```

---

## Usage

### 1. Use the `Auth` Component

The `Auth` component provides a ready-to-use form for sign-in, sign-up, and password recovery.

```tsx
import { Auth } from "nextjs-supabase-auth";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <Auth />
    </div>
  );
}
```

### 2. Use Custom Hooks

You can use the provided hooks to build your own forms.

#### Example: Sign-In Form

```tsx
"use client";

import { useSignIn } from "nextjs-supabase-auth";

export function SignInForm() {
  const { signIn } = useSignIn();

  const handleSubmit = async (email: string, password: string) => {
    const result = await signIn({ email, password });
    if (result.success) {
      alert("Signed in successfully!");
    } else {
      alert(result.error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit("user@example.com", "password");
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  );
}
```

Here's a **README section** that explains how to use the `AuthShadCDN` component:  

---

# **AuthShadCDN - Customizable Authentication Component**  

`AuthShadCDN` is a fully configurable authentication component built with **ShadCN UI**, supporting **Supabase authentication**. You can easily customize its layout, styling, labels, and icons.

---

## **📦 Installation**  

Ensure you have the required dependencies installed:  

```sh
npm install @supabase/supabase-js
npm install lucide-react
```

---

## **🚀 Usage Example**  

### **1️⃣ Import Required Components**
```tsx
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Github, Google } from "lucide-react";
import { AuthShadCDN } from "@/components/AuthShadCDN";
```

### **2️⃣ Use `AuthShadCDN` in a Page**
```tsx
export default function AuthPage() {
  return (
    <AuthShadCDN
      components={{
        container: Card,
        title: "h2",
        form: "form",
        label: Label,
        input: Input,
        button: {
          item: Button,
          title: "Submit",
        },
        modeButton: Button,
        socialButton: Button,
        errorMessage: "p",
        link: "a",
      }}
      styles={{
        container: "p-6 max-w-md mx-auto shadow-lg rounded-lg",
        title: "text-2xl font-bold text-center mb-4",
        form: "space-y-4",
        label: "text-gray-700 text-sm font-medium",
        input: "border rounded-md p-2 w-full",
        button: "w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600",
        modeButton: "mt-2 text-blue-500 hover:underline",
        socialButton: "w-full flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100",
        errorMessage: "text-red-500 text-sm mt-1 flex items-center gap-1",
        link: "text-blue-500 hover:underline cursor-pointer",
      }}
      icons={{
        google: <Google size={18} />,
        github: <Github size={18} />,
      }}
      labels={{
        signInTitle: "Sign In to Your Account",
        signUpTitle: "Create a New Account",
        forgotPasswordTitle: "Reset Your Password",
        emailLabel: "Your Email",
        passwordLabel: "Your Password",
        confirmPasswordLabel: "Confirm Password",
        signInButton: "Sign In",
        signUpButton: "Sign Up",
        forgotPasswordButton: "Reset Password",
        createAccount: "Don't have an account? Sign up",
        alreadyHaveAccount: "Already have an account? Sign in",
        forgotPasswordPrompt: "Forgot your password?",
        backToSignIn: "Back to Sign In",
      }}
      socialProviders={{
        google: true,
        github: true,
      }}
    />
  );
}
```

---

## **🛠 Configuration Options**  

### **1️⃣ `components` (Custom UI Elements)**
You can use any UI component for form elements:
```tsx
components={{
  container: Card,          // Wrapper component
  title: "h2",              // Title element
  form: "form",             // Form tag
  label: Label,             // Label component
  input: Input,             // Input component
  button: {                 // Submit button
    item: Button,
    title: "Submit",
  },
  modeButton: Button,       // Switch between sign-in & sign-up
  socialButton: Button,     // Social login button
  errorMessage: "p",        // Error message tag
  link: "a",                // Link for navigation
}}
```

### **2️⃣ `styles` (Tailwind or CSS Classes)**
Define CSS styles as a string:
```tsx
styles={{
  container: "p-6 max-w-md mx-auto shadow-lg rounded-lg",
  title: "text-2xl font-bold text-center mb-4",
  button: "w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600",
  errorMessage: "text-red-500 text-sm mt-1 flex items-center gap-1",
  link: "text-blue-500 hover:underline cursor-pointer",
}}
```

### **3️⃣ `labels` (Custom Text)**
Override default button & form text:
```tsx
labels={{
  signInTitle: "Sign In to Your Account",
  signUpTitle: "Create a New Account",
  emailLabel: "Your Email",
  passwordLabel: "Your Password",
}}
```

### **4️⃣ `icons` (Social Login Icons)**
Use any React icon components:
```tsx
icons={{
  google: <Google size={18} />,
  github: <Github size={18} />,
}}
```

### **5️⃣ `socialProviders` (Enable Social Logins)**
Choose which social logins to enable:
```tsx
socialProviders={{
  google: true,
  github: true,
}}
```

---

## **🌟 Features**
✅ **Fully customizable UI** (ShadCN, Tailwind, or any component library)  
✅ **Supabase authentication** (Email/password & social login)  
✅ **Error handling** (Inline messages for input fields)  
✅ **Accessibility** (ARIA support, keyboard-friendly)  
✅ **Custom styling & icons**  


---

Now, your `AuthShadCDN` component is **documented and easy to use!** 🚀

### 3. Protect Routes

Use the `WithAuth` HOC to protect routes from unauthorized access.

```tsx
import { WithAuth } from "nextjs-supabase-auth";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default WithAuth(Dashboard);
```

---

## API Reference

### Components

- **`Auth`**: A reusable component for sign-in, sign-up, and password recovery forms.

### Hooks

- **`useSignIn`**: Hook for handling sign-in logic.
- **`useSignUp`**: Hook for handling sign-up logic.
- **`useForgotPassword`**: Hook for handling password recovery logic.

### HOC

- **`WithAuth`**: Higher-Order Component to protect routes from unauthorized access.

### Schemas

- **`signInSchema`**: Zod schema for sign-in form validation.
- **`signUpSchema`**: Zod schema for sign-up form validation.
- **`forgotPasswordSchema`**: Zod schema for forgot password form validation.



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-repo/nextjs-supabase-auth/issues) on GitHub.

---

## Acknowledgments

- [Supabase](https://supabase.io) for providing the backend infrastructure.
- [Auth.js](https://authjs.dev) for session management and social login support.
- [Zod](https://zod.dev) for schema validation.
```

---

### **Key Sections**

1. **Features**: Highlights the key features of the package.
2. **Installation**: Provides instructions for installing the package.
3. **Setup**: Guides users on setting up environment variables and configuring Auth.js.
4. **Usage**: Demonstrates how to use the `Auth` component, custom hooks, and the `WithAuth` HOC.
5. **API Reference**: Lists the components, hooks, and schemas provided by the package.
6. **Contributing**: Explains how to contribute to the project.
7. **License**: Specifies the license for the project.
8. **Support**: Provides information on how to get support.
9. **Acknowledgments**: Credits the tools and libraries used in the project.

---

### **Next Steps**

1. Replace `your-repo` in the **Support** section with the actual GitHub repository URL.
2. Add a `LICENSE` file to your project if it doesn’t already exist.
3. Publish the package to npm and update the installation instructions with the correct package name.

Happy Coding! 🚀