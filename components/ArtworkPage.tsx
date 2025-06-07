"use client";
import React, { useEffect, useState } from "react";
import {
  addArtworkToExhibit,
  fetchARTICArtworkById,
  fetchMETArtworkById,
  removeArtworkFromExhibit,
} from "@/app/lib/endpoints";
import ItemCard from "@/app/ui/ItemCard";
import { APIObject, ArtworkPageProps } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import DashboardShowcase from "@/app/ui/DashboardShowcase";

export default function ArtworkPage({
  artwork_id,
  apiSource,
  dashboard,
  exhibit_id,
  onRemove,
  exhibits,
}: ArtworkPageProps) {
  const [artwork, setArtwork] = useState<APIObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const [addingToExhibit, setAddingToExhibit] = useState<number | null>(null);

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
            object = await fetchARTICArtworkById(Number(artwork_id));
            break;
          }
          default:
            return notFound();
        }

        if (!object) return notFound();

        setArtwork(object);

        if (exhibits) {
          const fullArtworkId = apiSource + object.objectID;
          const isInAnyExhibit = exhibits.some((exhibit) => {
            return exhibit.artworks.includes(fullArtworkId);
          });
          setIsFavourited(isInAnyExhibit);
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artwork_id, apiSource, exhibits]);

  const handleToggleFavourite = async (selectedExhibitId?: number) => {
    if (!exhibits) {
      window.alert(
        "You must be logged in to add this artwork to a custom exhibition."
      );
      return;
    }
    if (!artwork) return;
    const fullArtworkId = apiSource + artwork.objectID;

    if (isFavourited) {
      const targetExhibitId =
        exhibit_id ||
        exhibits?.find((ex) => ex.artworks.includes(fullArtworkId))?.exhibit_id;

      if (!targetExhibitId) {
        console.warn("Error: This artwork isn't in any of your exhibits.");
        return;
      }

      try {
        await removeArtworkFromExhibit(targetExhibitId, fullArtworkId);
        setIsFavourited(false);
        setShowDropdown(false);
        if (onRemove) {
          onRemove(artwork.objectID);
        }
      } catch (error) {
        console.error("Failed to remove artwork from favourites", error);
      }
    } else if (selectedExhibitId) {
      try {
        setAddingToExhibit(selectedExhibitId);
        await addArtworkToExhibit(selectedExhibitId, fullArtworkId);
        setIsFavourited(true);
        setShowDropdown(false);
      } catch (err) {
        console.error("Failed to add artwork to exhibit:", err);
      } finally {
        setAddingToExhibit(null);
      }
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  const handleClick = () => {
    setLoading(true);
  };

  if (loading)
    return (
      <p className="text-center" aria-live="polite">
        Loading...
      </p>
    );

  return (
    <>
      {!dashboard ? (
        <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
          <div className="flex justify-between items-center">
            <Link
              href={`/collections/${
                apiSource === "M" ? "MET" : apiSource === "A" ? "ARTIC" : ""
              }/page/1`}
              onClick={handleClick}
              className="cursor-pointer bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              aria-label="Return to collection"
            >
              Return to collection
            </Link>
            <div className="relative inline-block">
              <button
                onClick={() => handleToggleFavourite()}
                className="cursor-pointer bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                aria-expanded={showDropdown}
                aria-controls="exhibit-dropdown"
                aria-label={
                  isFavourited ? "Remove from favourites" : "Add to favourites"
                }
              >
                {isFavourited ? (
                  <StarSolid height={24} aria-hidden="true" />
                ) : (
                  <StarOutline height={24} aria-hidden="true" />
                )}
              </button>

              {!isFavourited && showDropdown && exhibits && (
                <div
                  className="absolute right-0 top-full mt-2 z-10 bg-blue-600 rounded shadow-lg w-48"
                  role="menu"
                  aria-label="Select exhibit"
                  id="exhibit-dropdown"
                >
                  {exhibits.map((exhibit) => (
                    <button
                      key={exhibit.exhibit_id}
                      onClick={() => handleToggleFavourite(exhibit.exhibit_id)}
                      className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-blue-700 text-sm"
                      disabled={addingToExhibit === exhibit.exhibit_id}
                      role="menuitem"
                      aria-label={`Select the ${exhibit.name} exhibit`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setShowDropdown(false);
                      }}
                    >
                      {addingToExhibit === exhibit.exhibit_id
                        ? "Adding..."
                        : exhibit.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {!artwork ? notFound() : <ItemCard object={artwork} />}
        </div>
      ) : (
        <>
          {!artwork ? (
            notFound()
          ) : (
            <DashboardShowcase
              art={artwork}
              exhibit_id={exhibit_id}
              onRemove={onRemove}
            />
          )}
        </>
      )}
    </>
  );
}
