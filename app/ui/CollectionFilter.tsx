"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Department, Filters } from "../lib/definitions";

const CollectionFilter = ({
  filters,
  setFilters,
  fetchedDepartments,
  api,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  fetchedDepartments: Department[];
  api: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userHasChangedFilters, setUserHasChangedFilters] = useState(false);
  const [beginEra, setBeginEra] = useState<"AD" | "BC">("AD");
  const [endEra, setEndEra] = useState<"AD" | "BC">("AD");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Searching on the ARTIC API is quite limited

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserHasChangedFilters(true);
    const { name, value, type } = e.target;
    const key = name as keyof Filters;

    const newValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked.toString()
        : value;

    setFilters((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleSubmit = useCallback(() => {
    setUserHasChangedFilters(false);
    const current = new URLSearchParams(window.location.search);

    current.delete("departmentId");
    current.delete("hasImages");
    current.delete("searchField");
    current.delete("q");
    current.delete("dateBegin");
    current.delete("dateEnd");

    if (filters.departmentId) current.set("departmentId", filters.departmentId);
    if (filters.hasImages) current.set("hasImages", filters.hasImages);

    if (filters.searchField && filters.searchField !== "all") {
      current.set("searchField", filters.searchField);
    } else {
      current.delete("searchField");
    }

    if (filters.dateBegin) {
      const begin =
        beginEra === "BC" ? `-${filters.dateBegin}` : filters.dateBegin;
      current.set("dateBegin", begin.toString());
    }

    if (filters.dateEnd) {
      const end = endEra === "BC" ? `-${filters.dateEnd}` : filters.dateEnd;
      current.set("dateEnd", end.toString());
    }

    current.set("q", filters.q || "");

    const pathnameParts = window.location.pathname.split("/");
    const api = pathnameParts[2];
    const newUrl = `/collections/${api}/page/1?${current.toString()}`;

    router.push(newUrl);
  }, [filters, router, beginEra, endEra]);

  useEffect(() => {
    if (!userHasChangedFilters) return;
    const timeout = setTimeout(() => {
      handleSubmit();
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, handleSubmit, userHasChangedFilters]);

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mb-1"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
          <div className="pl-2">
            {isFilterOpen ? (
              <ChevronDownIcon height={24} />
            ) : (
              <ChevronUpIcon height={24} />
            )}
          </div>
        </button>
      </div>

      {isFilterOpen && (
        <div className="border rounded-md p-4 space-y-4 bg-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <label className="col-span-2">
              <fieldset className="mb-1">
                <legend className="sr-only">Search</legend>
                <div className="flex items-center gap-4">
                  <span>Search</span>
                  {api === "MET" && (
                    <>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="searchField"
                          value="all"
                          checked={filters.searchField === "all"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        All
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="searchField"
                          value="title"
                          checked={filters.searchField === "title"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        Title
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="searchField"
                          value="tags"
                          checked={filters.searchField === "tags"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        Tags
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="searchField"
                          value="artistOrCulture"
                          checked={filters.searchField === "artistOrCulture"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        Artist or Culture
                      </label>
                    </>
                  )}
                </div>
              </fieldset>
              <input
                name="q"
                value={filters.q}
                onChange={handleChange}
                className="w-full p-1 rounded border"
                placeholder="Enter search term"
              />
            </label>
            {api === "MET" && (
              <>
                <label>
                  Department
                  <select
                    name="departmentId"
                    value={filters.departmentId}
                    onChange={handleChange}
                    className="w-full p-1 rounded border bg-gray-700"
                  >
                    <option value="">Please select Department</option>
                    {fetchedDepartments.map((department) => (
                      <option
                        key={department.departmentId}
                        value={department.departmentId}
                      >
                        {department.displayName}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Has Images
                  <select
                    name="hasImages"
                    value={filters.hasImages}
                    onChange={handleChange}
                    className="w-full p-1 rounded border bg-gray-700"
                  >
                    <option value="">---</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </label>
                <label>
                  Begin Date
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="dateBegin"
                      value={filters.dateBegin}
                      onChange={handleChange}
                      className="w-full p-1 rounded border"
                      placeholder="Enter start date"
                      min="0"
                      step="1"
                    />
                    <select
                      value={beginEra}
                      onChange={(e) => {
                        setBeginEra(e.target.value as "AD" | "BC");
                        setUserHasChangedFilters(true);
                      }}
                      className="p-1 rounded border bg-gray-700"
                    >
                      <option value="AD">AD</option>
                      <option value="BC">BC</option>
                    </select>
                  </div>
                </label>

                <label>
                  End Date
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="dateEnd"
                      value={filters.dateEnd}
                      onChange={handleChange}
                      className="w-full p-1 rounded border"
                      placeholder="Enter end date"
                      min="0"
                      step="1"
                    />
                    <select
                      value={endEra}
                      onChange={(e) => {
                        setEndEra(e.target.value as "AD" | "BC");
                        setUserHasChangedFilters(true);
                      }}
                      className="p-1 rounded border bg-gray-700"
                    >
                      <option value="AD">AD</option>
                      <option value="BC">BC</option>
                    </select>
                  </div>
                </label>
              </>
            )}
            <p className="col-span-2 text-center italic text-gray-100 opacity-50">
              Note: Some artwork data provided by the API may be incorrect
              {api === "ARTIC" && (
                <p>The ARTIC api is limited to 100 pages when searching</p>
              )}
            </p>
            <div className="col-span-2 grid grid-cols-2">
              <div className="justify-self-start">
                <button
                  onClick={() => {
                    setFilters({
                      departmentId: "",
                      hasImages: "",
                      searchField: "all",
                      dateBegin: "",
                      dateEnd: "",
                      q: "",
                    });
                    const current = new URLSearchParams(
                      searchParams.toString()
                    );
                    current.delete("departmentId");
                    current.delete("hasImages");
                    current.delete("searchField");
                    current.delete("dateBegin");
                    current.delete("dateEnd");
                    current.delete("q");
                    setBeginEra("AD");
                    setEndEra("AD");
                    router.push(`?${current.toString()}`);
                  }}
                  className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Clear Filters
                </button>
              </div>
              <div className="justify-self-end">
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionFilter;
