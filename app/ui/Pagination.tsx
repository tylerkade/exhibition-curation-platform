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
  filters,
}: // pageLimit = 12,
PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const router = useRouter();
  const [inputPage, setInputPage] = useState("");

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxPagesToShow = totalPages < 5 ? totalPages : 5;
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      router.push(buildURL(page));
      setInputPage("");
    }
  };

  const buildURL = (page: number) => {
    const params = new URLSearchParams();
    if (view) params.set("view", view);
    if (filters?.departmentId) params.set("departmentId", filters.departmentId);
    if (filters?.searchField && filters.searchField != "all")
      params.set("searchField", filters.searchField);
    if (filters?.hasImages) params.set("hasImages", filters.hasImages);
    if (filters?.dateBegin) params.set("dateBegin", filters.dateBegin);
    if (filters?.dateEnd) params.set("dateEnd", filters.dateEnd);
    // if (pageLimit) params.set("pageLimit", String(pageLimit));
    if (filters?.q) params.set("q", filters.q);
    return `/collections/${api}/page/${page}?${params.toString()}`;
  };

  if (totalPages === 0) return <></>;
  else
    return (
      <nav className="flex flex-col items-center gap-4 py-6">
        <ul className="inline-flex -space-x-px text-sm">
          {prevPage >= 1 && (
            <li>
              <Link
                href={buildURL(prevPage)}
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
                  href={buildURL(page)}
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
                href={buildURL(nextPage)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Link>
            </li>
          )}
        </ul>
        {totalPages > 1 ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <label htmlFor="page" className="sr-only">
              Page number
            </label>
            <input
              id="page"
              type="number"
              name="page"
              min="1"
              max={totalPages}
              placeholder="Page number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-30 px-2 py-1 text-sm border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <button
              type="submit"
              className="cursor-pointer text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go
            </button>
          </form>
        ) : (
          <></>
        )}
      </nav>
    );
}
