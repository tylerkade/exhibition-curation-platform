"use client";
import { MinusIcon, PlusIcon } from "@/components/svgs/SVGs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Department } from "../lib/definitions";
import { fetchDepartments } from "../lib/endpoints";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();

        setDepartments(departments);
      } catch (error) {
        console.error("Error fetching departments: ", error);
      }
    };

    getDepartments();
  }, []);

  return (
    <div className="flex">
      <div
        className={`bg-gray-800 text-white fixed h-screen transition-all duration-300 z-10 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="mt-4">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </div>
          <div className="mt-4">
            <button
              className="text-white py-2 px-4 rounded"
              onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
            >
              <div className="flex">
                Departments
                {isDepartmentsOpen ? <MinusIcon /> : <PlusIcon />}
              </div>
            </button>
            {isDepartmentsOpen && (
              <ul className="rounded shadow mt-2">
                {departments.map((department) => (
                  <li
                    key={department.departmentId}
                    className="px-4 py-2 hover:text-gray-100 cursor-pointer"
                  >
                    {department.displayName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-4">
            <Link href="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </div>
      <div className={`flex-1 p-4 ${isOpen ? "ml-64" : "ml-0"}`}>
        <div className="ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
