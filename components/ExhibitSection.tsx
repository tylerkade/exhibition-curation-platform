"use client";
import React, { useCallback, useRef, useState } from "react";
import ArtworkPage from "@/components/ArtworkPage";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CrossIcon } from "./svgs/SVGs";

export default function ExhibitSection({
  name,
  artworks,
  exhibit_id,
  handleDeleteExhibit,
  canDelete,
}: {
  name: string;
  artworks: { id: string; date_added: Date }[];
  exhibit_id: number;
  handleDeleteExhibit: (id: number) => void;
  canDelete: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [savedArtworks, setSavedArtworks] = useState(artworks);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flipOrder, setFlipOrder] = useState(false);

  savedArtworks.sort((a, b) => {
    const timeA = new Date(a.date_added).getTime();
    const timeB = new Date(b.date_added).getTime();
    return flipOrder ? timeA - timeB : timeB - timeA;
  });

  const visibleArtworks = expanded ? savedArtworks : savedArtworks.slice(0, 5);
  const isMore = savedArtworks.length > 5;

  const artworkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleRemove = useCallback((id: string, index: number) => {
    setSavedArtworks((prev) => prev.filter((a) => a.id.slice(1) !== id));

    setTimeout(() => {
      const nextRef =
        artworkRefs.current[index + 1] || artworkRefs.current[index - 1];
      nextRef?.focus();
    }, 0);
  }, []);

  const handleDeleteClick = async (exhibit_id: number) => {
    setIsDeleting(true);
    setTimeout(() => {
      try {
        handleDeleteExhibit(exhibit_id);
      } finally {
        setIsDeleting(false);
      }
    }, 500);
  };

  return (
    <div className="space-y-2 rounded-md p-2 bg-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isDeleting
            ? "Deleting..."
            : `${name[0].toUpperCase() + name.slice(1)}`}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFlipOrder((prev) => !prev)}
            className="cursor-pointer text-white underline-offset-2 underline"
            aria-label={`Sort ${name} exhibit by ${
              flipOrder ? "Oldest" : "Newest"
            }`}
          >
            Sort by {flipOrder ? "Oldest" : "Newest"}
          </button>
          {canDelete && (
            <button
              className={`cursor-pointer transition-colors ${
                isDeleting
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-red-400 hover:text-red-600"
              }`}
              onClick={() => handleDeleteClick(exhibit_id)}
              disabled={isDeleting}
              aria-label={`Delete ${name} exhibit`}
            >
              <CrossIcon />
            </button>
          )}
        </div>
      </div>
      {(!visibleArtworks || visibleArtworks.length === 0) && (
        <div
          className="h-32 flex items-center justify-center text-xl text-blue-400 underline"
          aria-label="Browse collections"
        >
          <Link href={`/collections`} className="hover:text-blue-600">
            Browse collections
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-1">
        {visibleArtworks.map((artwork, index) => {
          const id = artwork.id.slice(1);
          const apiSource = artwork.id.slice(0, 1);
          return (
            <div
              key={artwork.id}
              ref={(el) => {
                artworkRefs.current[index] = el;
              }}
              tabIndex={-1}
              className="outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              <ArtworkPage
                artwork_id={id}
                apiSource={apiSource}
                dashboard={true}
                exhibit_id={exhibit_id}
                onRemove={() => handleRemove(id, index)}
              />
            </div>
          );
        })}

        {isMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="border border-gray-600 cursor-pointer rounded w-full h-[40px] flex items-center justify-center 
             hover:bg-gray-700 shadow-lg text-sm text-white shadow-black/30 transition-transform duration-200 
             transform hover:scale-101"
            aria-expanded={expanded}
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
