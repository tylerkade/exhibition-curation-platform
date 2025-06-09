"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { UserSignOut } from "@/app/lib/serverActions";
import { CrossIcon, ListIcon } from "@/components/svgs/SVGs";
import { UserDetails } from "../lib/definitions";

const Sidebar = ({ userDetails }: { userDetails: UserDetails | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = userDetails ?? { name: "", username: "" };
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      if (!isOpen) {
        if (sidebar.contains(document.activeElement)) {
          (document.activeElement as HTMLElement)?.blur();
        }

        sidebar.setAttribute("inert", "");
      } else {
        sidebar.removeAttribute("inert");
        const firstLink = sidebar.querySelector("a");
        (firstLink as HTMLElement)?.focus();
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <nav className="flex" id="sidebar" aria-label="Main navigation">
      <main className={`flex-1 pl-4 bg-gray-800 ${isOpen ? "ml-64" : "ml-0"}`}>
        <div
          className={`${
            isOpen ? "fixed top-4 left-65 z-100" : "fixed top-4 left-4 z-110"
          }`}
        >
          <button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <CrossIcon /> : <ListIcon />}
          </button>
        </div>
      </main>
      <div
        className={`bg-gray-800 text-white fixed h-screen transition-all duration-300 z-100 ease-in-out ${
          isOpen ? "w-64 opacity-100" : "w-0 overflow-hidden opacity-0"
        }`}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby="sidebar-title"
        aria-hidden={!isOpen}
        ref={sidebarRef}
      >
        <h2 id="sidebar-title" className="sr-only">
          Sidebar menu
        </h2>
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
          <ul className="text-center">
            <li>
              <a
                href="https://github.com/tylerkade/exhibition-curation-platform"
                className="mr-4 hover:underline md:mr-6"
              >
                Github
              </a>
            </li>
            <li className="text-xs text-gray-400 mt-4">
              <p className="line-clamp-1">© 2025 Easy Exhibitions.</p>
              <p className="line-clamp-1">All Rights Reserved.</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
