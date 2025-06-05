"use client";
import Link from "next/link";
import React, { useState } from "react";
import { UserSignOut } from "@/app/lib/serverActions";
import { CrossIcon, ListIcon } from "@/components/svgs/SVGs";

type UserDetails = {
  name: string;
  username: string;
};

const Sidebar = ({ userDetails }: { userDetails: UserDetails | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = userDetails ?? { name: "", username: "" };

  return (
    <div className="flex">
      <div
        className={`bg-gray-800 text-white fixed h-screen transition-all duration-300 z-100 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center justify-between h-full py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="mt-4">
              <Link
                href="/"
                className="text-white hover:text-gray-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                Home
              </Link>
            </div>
            <div className="mt-4">
              <Link
                href="/collections"
                className="text-white hover:text-gray-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                Collections
              </Link>
            </div>
            <div className="mt-4">
              {userDetails ? (
                <Link
                  href="/dashboard"
                  className="text-white hover:text-gray-300"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {username}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Login
                </Link>
              )}
            </div>
            {userDetails && (
              <div className="mt-4">
                <form action={UserSignOut}>
                  <button
                    type="submit"
                    className="cursor-pointer text-white hover:text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Sign out
                  </button>
                </form>
              </div>
            )}
            <div className="mt-4">
              <Link
                href="/about"
                className="text-white hover:text-gray-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                About
              </Link>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-4">
            <p className="line-clamp-1">© 2025 Easy Exhibitions.</p>
            <p className="line-clamp-1">All Rights Reserved.</p>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 pt-4 pl-4 bg-gray-800 ${isOpen ? "ml-64" : "ml-0"}`}
      >
        <div
          className={`${
            isOpen ? "fixed top-4 left-65 z-100" : "fixed top-4 left-4 z-100"
          }`}
        >
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CrossIcon /> : <ListIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
