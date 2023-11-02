"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import hero from "../../../../public/default_Image.jpeg";

export const Profile = () => {
  return (
    <div className="flex p-2 w-full gap-1">
      <div className="w-1/4">
        <Image
          src={hero}
          width={50}
          height={50}
          alt="Picture of the author"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-0.5 w-1/2">
        <p className="text-gray-700  text-sm">Welcome back</p>
        <p className="font-bold text-black text-base font-ubuntu">Jane Doe</p>
      </div>
      <div className="flex  justify-between items-center gap-0.5 w-1/4">
        <div className="bg-red-800 rounded-full flex justify-center text-black w-6 h-6">
          5
        </div>
        <Link className="text-black" href="/settings" title="Settings">
          <FiSettings />
        </Link>
      </div>
    </div>
  );
};
