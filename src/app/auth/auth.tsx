"use client";
import React from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { getCredentials } from "@/utils/helper";

type Auth = {
  user?: any;
  token: string | null;
};

export function IsAuth<T extends React.HTMLProps<any>>(
  Component: React.ComponentType<T>
) {
  const AuthComponent = (props: T) => {
    const loading = false;
    const router = useRouter();
    const credentials: Auth | undefined = getCredentials();
    if (credentials) {
      const { user, token } = credentials;
      console.log({ user });
      if (loading) {
        return <div>Loading...</div>;
      }

      if (user || !token) {
        router.push("/login");
      }

      return (
        <>
          <Component {...props} />
        </>
      );
    }
  };

  // Set the display name for your HOC
  AuthComponent.displayName = `IsAuth(${
    Component.displayName || Component.name
  })`;

  return AuthComponent;
}
