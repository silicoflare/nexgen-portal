"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthComponentProps = {
  auth?: string[]; // The roles that are allowed to access the component
};

export function withAuth<P extends object>(
  Component: React.ComponentType<P> & AuthComponentProps
) {
  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (
        status === "unauthenticated" ||
        (session &&
          Component.auth &&
          !Component.auth.includes(session.user.role))
      ) {
        router.push("/"); // Redirect to homepage if unauthorized
      }
    }, [status, router, session]);

    if (Component.auth && status === "loading") {
      return (
        <div className="flex flex-col w-screen h-screen justify-center items-center gap-2">
          Loading...
        </div>
      ); // Loading state while checking authentication
    }

    if (
      status === "unauthenticated" ||
      (session && Component.auth && !Component.auth.includes(session.user.role))
    ) {
      return null;
    }

    if (!Component.auth || session) {
      return <Component {...props} />; // Render the component if authenticated or if no auth is required
    }

    return null; // Render nothing if unauthorized (will trigger useEffect redirect)
  };
}
