"use client";
import React, { useEffect, useState } from "react";
import { fetchARTICArtwork, fetchMETArtworkById } from "@/app/lib/endpoints";
import ItemCard from "@/app/ui/ItemCard";
import { APIObject, ArtworkPageProps } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export default function ArtworkPage({
  artwork_id,
  apiSource,
}: ArtworkPageProps) {
  const [artwork, setArtwork] = useState<APIObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [inFavourites, setInFavourites] = useState(false);

  const handleClick = () => {
    setInFavourites((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let object: APIObject | null = null;

        switch (apiSource) {
          case "M": {
            object = await fetchMETArtworkById(Number(artwork_id));
            break;
          }
          case "A": {
            object = await fetchARTICArtwork(Number(artwork_id));
            break;
          }
          default:
            return notFound();
        }

        if (!object) {
          return notFound();
        }

        setArtwork(object);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artwork_id, apiSource]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center">
        <Link
          href={`/collections/${
            apiSource === "M" ? "MET" : apiSource === "A" ? "ARTIC" : ""
          }/page/1`}
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back
          </button>
        </Link>
        <button
          onClick={handleClick}
          className={`text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700`}
        >
          {!inFavourites ? (
            <StarOutline height={24} />
          ) : (
            <StarSolid height={24} />
          )}
        </button>
      </div>
      {!artwork ? notFound() : <ItemCard object={artwork} />}
    </div>
  );
}
