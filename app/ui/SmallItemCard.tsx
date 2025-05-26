"use client";
import Link from "next/link";
import Image from "next/image";
import { APIObject } from "../lib/definitions";

type SmallItemCardProps = {
  art: APIObject;
  view?: "grid" | "list";
};

export default function SmallItemCard({ art, view }: SmallItemCardProps) {
  if (view === "list") {
    return (
      <div className="border p-2 rounded">
        <Link
          href={`/collections/${art.APIsource}/${
            art.APIsource.slice(0, 1) + art.objectID
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <h3 className="font-medium text-sm">{art.title}</h3>
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
    <div className="border p-2 rounded">
      <Link
        href={`/collections/${art.APIsource}/${
          art.APIsource.slice(0, 1) + art.objectID
        }`}
      >
        <h3 className="font-medium text-sm mb-2 text-center line-clamp-2">
          {art.title}
        </h3>
        {art.primaryImageSmall || art.primaryImage ? (
          <div className="relative w-full h-[200px] mb-2">
            <Image
              src={art.primaryImageSmall || art.primaryImage}
              alt={art.title || "Artwork"}
              fill
              className="object-contain rounded"
              sizes="(max-width: 768px) 100vw, 200px"
              priority
            />
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-xs text-gray-500 text-center border rounded mb-2">
            No image available
          </div>
        )}
      </Link>
    </div>
  );
}
