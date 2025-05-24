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
              {art.constituents &&
              art.constituents.length > 0 &&
              art.constituents[0].name
                ? art.constituents[0].name
                : "Unknown"}
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
        <h3 className="font-medium text-sm mb-1 text-center">{art.title}</h3>
        {art.primaryImageSmall || art.primaryImage ? (
          <Image
            src={art.primaryImageSmall || art.primaryImage}
            alt={art.title || "Artwork"}
            width={300}
            height={300}
            className="object-cover justify-self-center"
            priority
            style={{
              height: "200px",
              width: "auto",
            }}
          />
        ) : (
          <p className="text-xs text-gray-500 text-center align-middle">
            No image available
          </p>
        )}
      </Link>
    </div>
  );
}
