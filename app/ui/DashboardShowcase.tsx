"use client";
import React from "react";
import { APIObject } from "../lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { removeArtworkFromExhibit } from "../lib/endpoints";
import { placeHolderBlurData } from "../utils/placeHolderBlurData";

export default function DashboardShowcase({
  art,
  exhibit_id,
  onRemove,
}: {
  art: APIObject;
  exhibit_id?: number;
  onRemove?: (objectID: number) => void;
}) {
  const handleRemove = async () => {
    const artwork_id = art.APIsource.slice(0, 1) + art.objectID;
    if (!exhibit_id) return;
    await removeArtworkFromExhibit(exhibit_id, artwork_id);

    if (onRemove) {
      onRemove(art.objectID);
      // This works, however there is a bug where if you use the browsers 'go back' button, then forward button, the artwork
      // appears in the exhibit again, but will disapear if the page is refreshed
    }
  };

  return (
    <div
      className="border border-gray-600 p-2 rounded bg-gray-700 shadow-lg 
      shadow-black/30 transition-transform duration-200 transform hover:scale-101 
      h-full flex flex-col justify-between"
    >
      <div aria-live="polite" aria-relevant="additions removals">
        <Link
          href={`/collections/${art.APIsource}/${
            art.APIsource.slice(0, 1) + art.objectID
          }`}
        >
          <h3
            className="font-medium text-md mb-2 text-center line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: art.title,
            }}
          ></h3>
          {art.primaryImageSmall || art.primaryImage ? (
            <div className="relative w-full h-[200px] mb-2">
              <Image
                src={art.primaryImageSmall || art.primaryImage}
                alt={`"${art.title}" by ${
                  art.artistDisplayName || "an unknown artist"
                }`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 200px"
                placeholder="blur"
                blurDataURL={`data:image/png;base64,${placeHolderBlurData}`}
              />
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-xs text-gray-500 text-center border rounded mb-2">
              No image available
            </div>
          )}
        </Link>
      </div>
      <div>
        <h3 className="font-medium text-sm mb-2 text-center line-clamp-2 italic">
          By {art.artistDisplayName || "Unknown"}
        </h3>
        <button
          onClick={handleRemove}
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 text-sm rounded mt-auto block 
        w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Remove from exhibit
        </button>
      </div>
    </div>
  );
}
