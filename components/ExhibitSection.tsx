"use client";
import React, { useState } from "react";
import ArtworkPage from "@/components/ArtworkPage";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function ExhibitSection({
  name,
  artworks,
  exhibit_id,
}: {
  name: string;
  artworks: string[];
  exhibit_id: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [savedArtworks, setSavedArtworks] = useState<string[]>(artworks);

  const visibleArtworks = expanded ? savedArtworks : savedArtworks.slice(0, 5);
  const isMore = savedArtworks.length > 5;

  return (
    <div className="space-y-2 rounded-md p-2 bg-gray-700">
      <h2 className="text-lg font-semibold">
        {name[0].toUpperCase() + name.slice(1)}
      </h2>
      {(!visibleArtworks || visibleArtworks.length === 0) && (
        <div className="h-32 flex items-center justify-center text-xl text-blue-600 underline">
          <Link href={`/collections`} className="hover:text-blue-500">
            Browse collections
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-1">
        {visibleArtworks &&
          visibleArtworks.length > 0 &&
          visibleArtworks.map((artworkID, index) => (
            <div key={index}>
              <ArtworkPage
                artwork_id={artworkID.slice(1)}
                apiSource={artworkID.slice(0, 1)}
                dashboard={true}
                exhibit_id={exhibit_id}
                onRemove={(id) =>
                  setSavedArtworks((prev) =>
                    prev.filter((a) => a.slice(1) !== String(id))
                  )
                }
              />
            </div>
          ))}

        {isMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="border border-gray-600 cursor-pointer rounded w-full h-[40px] flex items-center justify-center 
             hover:bg-gray-700 shadow-lg text-sm text-white shadow-black/30 transition-transform duration-200 
             transform hover:scale-101"
          >
            <span className="inline-flex items-center gap-1">
              {expanded ? "Show less" : "Show more"}
              <ChevronDownIcon
                width={24}
                className={`transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
