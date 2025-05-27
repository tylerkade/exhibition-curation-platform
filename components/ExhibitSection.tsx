"use client";
import React, { useState } from "react";
import ArtworkPage from "@/components/ArtworkPage";
import Link from "next/link";

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
    <div className="space-y-2 rounded-md p-2">
      <h2 className="text-lg font-semibold">{name}</h2>
      {(!visibleArtworks || visibleArtworks.length === 0) && (
        <div className="text-center text-xl text-blue-700">
          <Link href={`/collections`}>Browse collections</Link>
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
            className="cursor-pointer border rounded p-4 hover:bg-gray-700 text-center text-sm"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}
