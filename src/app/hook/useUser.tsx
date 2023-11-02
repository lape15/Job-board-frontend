"use client";
import { getProfile } from "@/api/profile";
import { useEffect, useState } from "react";

export const useGetUserProfile = () => {
  const [profile, setProfile] = useState<null | any>(null);
  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
  }, []);

  return profile;
};
