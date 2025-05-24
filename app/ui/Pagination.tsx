"use client";
import Link from "next/link";
import { PaginationProps } from "../lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Pagination({
  currentPage,
  totalPages,
  api,
  view,
  // pageLimit = 12,
}: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const router = useRouter();
  const [inputPage, setInputPage] = useState("");

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxPagesToShow = 5;
    const start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const end = start + maxPagesToShow - 1;

    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      router.push(`/collections/${api}/page/${page}?view=${view}`);
      setInputPage("");
    }
  };

  // Attempt at preserving pageLimit - Can't get working
  // const buildURL = (page: number) => {
  //   const params = new URLSearchParams();
  //   if (view) params.set("view", view);
  //   if (pageLimit) params.set("pageLimit", String(pageLimit));
  //   return `/collections/${api}/page/${page}?${params.toString()}`;
  // };

  return (
    <nav className="flex flex-col items-center gap-4 py-6">
      <ul className="inline-flex -space-x-px text-sm">
        {prevPage >= 1 && (
          <li>
            <Link
              href={`/collections/${api}/page/${prevPage}?view=${view}`}
              // href={buildURL(prevPage)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          </li>
        )}

        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center px-3 h-8 text-gray-400">
                …
              </span>
            ) : (
              <Link
                href={`/collections/${api}/page/${page}?view=${view}`}
                // href={buildURL(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
                  ${
                    page === currentPage
                      ? "text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {nextPage <= totalPages && (
          <li>
            <Link
              href={`/collections/${api}/page/${nextPage}?view=${view}`}
              // href={buildURL(nextPage)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          </li>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max={totalPages}
          placeholder="Page number"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="w-30 px-2 py-1 text-sm border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <button
          type="submit"
          className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go
        </button>
      </form>
    </nav>
  );
}
