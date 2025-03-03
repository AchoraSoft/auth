"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function WithAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check the user's authentication status
      const checkAuth = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          // Redirect to the sign-in page if the user is not authenticated
          router.push("/auth/signin");
        } else {
          // User is authenticated
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <p>Loading...</p>; // Or a loading spinner
    }

    return <Component {...props} />;
  };
}