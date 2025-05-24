import Image from "next/image";
import React from "react";
import { APIObject } from "../lib/definitions";

const ItemCard = ({ object }: { object: APIObject }) => {
  return (
    <div>
      <div className="justify-self-center">
        <Image
          src={object.primaryImage || "/placeholder.png"}
          alt={`image of ${object.objectName}`}
          width="0"
          height="0"
          sizes="100vw"
          className="w-[512px] h-auto"
          priority
        ></Image>
      </div>
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-white line-clamp-2">
          {object.title}
        </h2>
        {object.artistDisplayName && (
          <p className="text-gray-400 text-sm">
            {object.artistDisplayName}
            {object.objectDate && <> — {object.objectDate}</>}
          </p>
        )}
        {object.medium && (
          <p className="text-sm text-gray-300 italic truncate">
            {object.medium}
          </p>
        )}
        {(object.city || object.country) && (
          <p className="text-sm text-gray-400">
            {object.city ? `${object.city}, ` : ""}
            {object.country}
          </p>
        )}
        {object.reign && (
          <p className="text-gray-400 text-sm">{object.reign}</p>
        )}
        {object.tags && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-300 mt-2">
            {object.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.term}
                className="bg-gray-700 px-2 py-0.5 rounded-full"
              >
                {tag.term}
              </span>
            ))}
          </div>
        )}

        <div className="px-4 py-3 flex justify-between items-center border-t border-gray-800">
          <span className="text-xs text-gray-500">
            <p>Accession/Reference: {object.accessionNumber || "N/A"}</p>
            <p>{object.APIsource}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
