import Image from "next/image";
import React from "react";
import { APIObject } from "../lib/definitions";
import { sanitiseHTML } from "../utils/sanitiseHTML";
import { placeHolderBlurData } from "../utils/placeHolderBlurData";

const ItemCard = ({ object }: { object: APIObject }) => {
  const setWidth = 512;

  const cleanTitle = sanitiseHTML(object.title);
  const cleanDescription = sanitiseHTML(object.ARTICDescription);

  const headingId = `artwork-title-${object.objectID}`;

  return (
    <article
      className="bg-gray-900 rounded-md shadow-md overflow-hidden pt-5"
      aria-labelledby={headingId}
    >
      <div className="justify-self-center bg-gray-200 p-2 rounded">
        <Image
          src={object.primaryImage || "/placeholder.png"}
          alt={
            object.primaryImage
              ? `${object.objectName} by ${
                  object.artistDisplayName || "Unknown Artist"
                }`
              : "Placeholder image for missing artwork"
          }
          width={object.ARTICWidth ?? setWidth}
          height={object.ARTICHeight ?? Math.round((setWidth * 3) / 4)}
          style={{
            height: "auto",
            width: "100%",
            maxWidth: `${object.ARTICWidth}px`,
          }}
          className="h-auto rounded"
          priority
          placeholder="blur"
          blurDataURL={`data:image/png;base64,${placeHolderBlurData}`}
        />
      </div>
      <div>
        <div className="p-4 space-y-2">
          <h1
            className="text-2xl font-semibold text-white line-clamp-2"
            dangerouslySetInnerHTML={{ __html: cleanTitle }}
            id={headingId}
          />
          {object.artistDisplayName ? (
            <p className="text-gray-400 text-sm">
              {object.artistDisplayName}
              {object.objectDate && <> — {object.objectDate}</>}
            </p>
          ) : (
            <p className="text-gray-400 text-sm">
              Unknown Artist
              {object.objectDate && <> — {object.objectDate}</>}
            </p>
          )}
          {object.medium && (
            <p className="text-sm text-gray-300 italic line-clamp-2">
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
          <p className="text-gray-400 text-sm">{object.dimensions}</p>
          {object.ARTICDescription && (
            <div
              className="text-m"
              dangerouslySetInnerHTML={{
                __html: cleanDescription,
              }}
            ></div>
          )}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-wrap gap-2 text-xs text-gray-300 mt-2 max-w-[70%]">
              {object.tags && object.tags.length > 0 ? (
                object.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={tag.term + index}
                    className="bg-gray-700 px-2 py-0.5 rounded-full"
                  >
                    {tag.term}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 italic">No tags</span>
              )}
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Department</p>
              <p className="text-sm text-white">
                {object.department || "Unknown Department"}
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex justify-between items-center border-t border-gray-800">
          <div className="text-xs text-gray-400">
            <p>Accession/Reference: {object.accessionNumber || "N/A"}</p>
            <p>{object.APIsource}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
