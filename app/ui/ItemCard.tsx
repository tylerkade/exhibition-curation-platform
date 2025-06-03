import Image from "next/image";
import React from "react";
import DOMPurify from "dompurify";
import { APIObject } from "../lib/definitions";

const ItemCard = ({ object }: { object: APIObject }) => {
  const setWidth = 512;

  const imageWidth =
    object.ARTICWidth && object.ARTICWidth < setWidth
      ? object.ARTICWidth
      : setWidth;

  const imageHeight =
    object.ARTICHeight && object.ARTICHeight < setWidth
      ? object.ARTICHeight
      : Math.round((imageWidth * 4) / 3);

  const cleanDescription = DOMPurify.sanitize(object.ARTICDescription || "", {
    ALLOWED_TAGS: ["p", "em", "strong", "ul", "li", "br"],
    ALLOWED_ATTR: [],
  });

  return (
    <div>
      <div className="justify-self-center">
        <Image
          src={object.primaryImage || "/placeholder.png"}
          alt={`image of ${object.objectName}`}
          width={imageWidth}
          height={imageHeight}
          sizes="100vw"
          className="h-auto"
          style={{ width: `${imageWidth}px` }}
          priority
        />
      </div>
      <div>
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-semibold text-white line-clamp-2">
            {object.title}
          </h2>
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
              <p className="text-sm text-white">{object.department}</p>
            </div>
          </div>
        </div>
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
