"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

export function WithAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (status === "loading") return; // Wait for session to load
      if (!session) {
        router.push("/auth/signin"); // Redirect to sign-in page if not authenticated
      } else {
        setIsLoading(false);
      }
    }, [session, status, router]);

    if (isLoading) {
      return <p>Loading...</p>; // Or a loading spinner
    }

    return <Component {...props} />;
  };
}