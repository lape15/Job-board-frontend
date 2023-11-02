"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCredentials } from "@/utils/helper";

type Auth = {
  user?: any;
  token: string | null;
};

export function useAuth(redirect = "/") {
  const router = useRouter();

  useEffect(() => {
    const credentials: Auth | undefined = getCredentials();
    const user = credentials ? credentials.user : null;
    const token = credentials ? credentials.token : null;
    if (!user || !token) {
      router.push(redirect);
    }
  }, [router, redirect]);

  return <p>Redirecting...</p>;
}
