"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/app/ui/Pagination";
import SmallItemCard from "@/app/ui/SmallItemCard";
import { APIObject, Department, Filters } from "@/app/lib/definitions";
import ViewToggle from "@/app/ui/ViewToggle";
import CollectionFilter from "@/app/ui/CollectionFilter";
// import PageLimit from "@/app/ui/PageLimit";
import { sanitiseSearchField } from "@/app/utils/validateSearchFields";
import { CollectionsButton } from "@/app/ui/CollectionsButton";

interface CollectionArtworksProps {
  artworks: APIObject[];
  pageNumber: number;
  totalPages: number;
  api: string;
  fetchedDepartments: Department[];
  totalResults: number;
}

export default function CollectionArtworks({
  artworks,
  pageNumber,
  totalPages,
  api,
  fetchedDepartments,
  totalResults,
}: CollectionArtworksProps) {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [view, setView] = useState<"grid" | "list">(
    viewParam === "list" ? "list" : "grid"
  );

  const [filters, setFilters] = useState<Filters>({
    departmentId: searchParams.get("departmentId") || "",
    searchField: sanitiseSearchField(searchParams.get("searchField")),
    hasImages: searchParams.get("hasImages") || "",
    dateBegin: searchParams.get("dateBegin") || "",
    dateEnd: searchParams.get("dateEnd") || "",
    q: searchParams.get("q") || "",
  });

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);
    current.set("view", view);
    const newUrl = `${window.location.pathname}?${current.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [view]);

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6 min-h-screen">
      <div className="flex justify-between gap-3">
        <h1 className="text-xl font-semibold">
          {api === "MET"
            ? "The Metropolitan Museum of Art"
            : api === "ARTIC"
            ? "The Art Institute of Chicago"
            : api}{" "}
          Collection
        </h1>
        <CollectionsButton btnMsg="Return to collections" nav="/collections" />
      </div>
      <div className="justify-end flex gap-3">
        <ViewToggle view={view} setView={setView} />
        {/* {api === "ARTIC" ? <PageLimit /> : <></>} */}
        {/* Cannot get working for MET api - can't get same pageLimit value to persist 
        with pagination on ARTIC api*/}
      </div>
      <div className="text-white flex items-start justify-center">
        <CollectionFilter
          filters={filters}
          setFilters={setFilters}
          fetchedDepartments={fetchedDepartments}
          api={api}
        />
      </div>
      <div>{totalResults} Results</div>
      {artworks.length === 0 && (
        <div className="text-center text-white">No artworks found.</div>
      )}
      <div
        className={
          view === "grid"
            ? `grid grid-cols-2 md:grid-cols-3 gap-4 pt-4`
            : "pt-4"
        }
      >
        {view === "list" && artworks.length !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4">
            <h2>Title</h2>
            <h2>Author</h2>
            <h2 className="hidden md:block">Department</h2>
            <h2 className="hidden md:block">Culture</h2>
          </div>
        ) : (
          <></>
        )}
        {artworks.map((art) => (
          <SmallItemCard key={art.objectID} art={art} view={view} />
        ))}
      </div>
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        api={api}
        view={view}
        filters={filters}
      />
    </div>
  );
}
