"use client";
import React, { useEffect, useState } from "react";
import { fetchDepartments } from "./lib/endpoints";
import Link from "next/link";
import { Department } from "./lib/definitions";

const page = () => {
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
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <h1>Main</h1>
      <Link href="/items">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          items
        </button>
      </Link>
      <ul className="space-y-2">
        {departments.map((department) => (
          <li
            key={department.departmentId}
            className="p-2 border rounded hover:bg-gray-100 transition"
          >
            {department.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
