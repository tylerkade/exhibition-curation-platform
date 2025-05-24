"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/app/ui/Pagination";
import SmallItemCard from "@/app/ui/SmallItemCard";
import { APIObject } from "@/app/lib/definitions";
import ViewToggle from "@/app/ui/ViewToggle";
// import CollectionFilter from "@/app/ui/CollectionFilter";
import Link from "next/link";
// import PageLimit from "@/app/ui/PageLimit";

interface CollectionArtworksProps {
  artworks: APIObject[];
  pageNumber: number;
  totalPages: number;
  api: string;
}

export default function CollectionArtworks({
  artworks,
  pageNumber,
  totalPages,
  api,
}: CollectionArtworksProps) {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [view, setView] = useState<"grid" | "list">(
    viewParam === "list" ? "list" : "grid"
  );

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);
    current.set("view", view);
    const newUrl = `${window.location.pathname}?${current.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [view]);

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6 min-h-screen">
      <h1 className="text-xl font-semibold">{api} Collection</h1>
      <Link href="/collections">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Return to collections
        </button>
      </Link>
      <div className="justify-end flex gap-3">
        <ViewToggle view={view} setView={setView} />
        {/* {api === "ARTIC" ? <PageLimit /> : <></>} */}
        {/* Cannot get working for MET api - can't get same pageLimit value to persist 
        with pagination on ARTIC api*/}
      </div>
      <div className="text-white flex items-start justify-center">
        {/* <CollectionFilter /> */}
      </div>
      <div
        className={
          view === "grid"
            ? `grid grid-cols-2 md:grid-cols-3 gap-4 pt-4`
            : "pt-4"
        }
      >
        {view === "list" ? (
          <div className="grid grid-cols-2 md:grid-cols-4">
            <h3>Title</h3>
            <h3>Author</h3>
            <h3 className="hidden md:block">Department</h3>
            <h3 className="hidden md:block">Culture</h3>
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
      />
    </div>
  );
}
