"use client";
import Link from "next/link";
import Image from "next/image";
import { SmallItemCardProps } from "../lib/definitions";
import { placeHolderBlurData } from "../utils/placeHolderBlurData";

export default function SmallItemCard({ art, view }: SmallItemCardProps) {
  const href = `/collections/${art.APIsource}/${art.APIsource[0]}${art.objectID}`;

  if (view === "list") {
    return (
      <div
        className="border border-gray-600 p-2 bg-gray-700 rounded 
      transition-transform duration-200 transform hover:scale-101"
      >
        <Link href={href}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <h2
              className="text-m"
              dangerouslySetInnerHTML={{
                __html: art.title,
              }}
            ></h2>
            <h3 className="text-sm">
              {art.artistDisplayName ? art.artistDisplayName : "Unknown"}
            </h3>
            <h3 className="hidden md:block text-sm">
              {art.department && art.department.length > 0
                ? art.department
                : "Unspecified"}
            </h3>
            <h3 className="hidden md:block text-sm">
              {art.culture && art.culture.length > 0
                ? art.culture
                : "Unspecified"}
            </h3>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <Link
      href={href}
      className="border border-gray-600 p-2 rounded bg-gray-700 shadow-lg 
      shadow-black/30 transition-transform duration-200 transform hover:scale-101 
      flex flex-col justify-between h-full"
    >
      <h2
        className="text-m mb-2 text-center line-clamp-2 font-bold"
        dangerouslySetInnerHTML={{
          __html: art.title,
        }}
      ></h2>
      {art.primaryImageSmall || art.primaryImage ? (
        <div className="relative w-full h-[200px] mb-2">
          <Image
            src={art.primaryImageSmall || art.primaryImage}
            alt={`"${art.title}" by ${art.artistDisplayName || "an unknown artist"}`}
            fill
            className="object-contain rounded"
            sizes="(max-width: 768px) 100vw, 200px"
            priority
            placeholder="blur"
            blurDataURL={`data:image/png;base64,${placeHolderBlurData}`}
          />
        </div>
      ) : (
        <div
          className="h-[200px] flex items-center justify-center text-xs 
        text-gray-400 text-center border rounded mb-2"
          role="img"
          aria-label="No image available"
        >
          No image available
        </div>
      )}
      <div
        className="space-y-4 text-sm md:text-base leading-relaxed 
        text-gray-200 pt-4 text-center"
      >
        {view === "grid" && (
          <h3 className="italic">
            By {art.artistDisplayName || "Unknown"}
            {art.objectDate && ` — ${art.objectDate}`}
          </h3>
        )}
      </div>
    </Link>
  );
}
