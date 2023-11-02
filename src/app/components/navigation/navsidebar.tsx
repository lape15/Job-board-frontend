"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Profile } from "./profile";
import { FaHome, FaEnvelope, FaHeadset } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const excluded = ["/signup", "/"];
const routes = [
  { name: "Dashboard", path: "/dasboard", icon: <FaHome /> },
  { name: "Messages", path: "/messages", icon: <FaEnvelope /> },
  { name: "Interviews", path: "/interviews", icon: <FaHeadset /> },
  { name: "Dashboard", path: "/dasboard", icon: <FaHome /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  if (excluded.includes(pathname)) return null;

  return (
    <div
      className={`w-72 bg-side-bg text-white h-screen  transition-all ease-in-out duration-300 p-3 px-4`}
    >
      <div className="flex justify-between">
        {/* <div className="text-2xl font-semibold text-black">User details</div> */}
        <Profile />
      </div>
      <nav>
        <ul>
          {routes.map((route, idx) => (
            <li
              className="p-2 hover:bg-white hover:opacity-25 cursor-pointer m-2 my-2.5 w-100"
              key={idx}
            >
              <Link
                href={route.path}
                className="flex gap-4 font-ubuntu text-gray-700 hover:text-black text-sm items-center py-1"
              >
                <span>{route.icon}</span>
                <span>{route.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
