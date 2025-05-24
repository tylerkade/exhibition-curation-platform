import Link from "next/link";
import React from "react";
import { fetchCollectionMainPage } from "../lib/endpoints";
import SmallItemCard from "../ui/SmallItemCard";

const artworkDisplayCount = 10;

export default async function Page() {
  const { ARTICArtworks, randomMETArtworks } = await fetchCollectionMainPage(
    artworkDisplayCount
  );

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <h1>Collections</h1>
      <h2>MET</h2>
      <ul className="">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 px-1">
          {randomMETArtworks.map((art) => (
            <SmallItemCard key={art.objectID} art={art} />
          ))}
        </div>
      </ul>
      <Link
        href={`/collections/MET/page/1?view=grid`}
        className="justify-end flex"
      >
        View More {`>>>`}
      </Link>
      <h2>ARTIC</h2>
      <ul className="">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 px-1">
          {ARTICArtworks.map((artwork) => (
            <SmallItemCard key={artwork.objectID} art={artwork} />
          ))}
        </div>
      </ul>
      <Link
        href={`/collections/ARTIC/page/1?view=grid`}
        className="justify-end flex"
      >
        View More {`>>>`}
      </Link>
    </div>
  );
}
