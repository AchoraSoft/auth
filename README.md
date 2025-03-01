# Next.js Supabase Auth Kit

A reusable authentication package for Next.js applications using **Supabase** and **Auth.js** (formerly NextAuth.js). This package provides components, hooks, and utilities for handling user authentication, including sign-in, sign-up, and password recovery.

---

## Features

- **Supabase Integration**: Built on top of Supabase for user authentication and management.
- **Auth.js Support**: Seamless integration with Auth.js for session management and social login.
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

---

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