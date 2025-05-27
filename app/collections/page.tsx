import React from "react";
import { fetchCollectionMainPage } from "../lib/endpoints";
import CollectionPage from "@/components/CollectionPage";

const artworkDisplayCount = 10;

export default async function Page() {
  const { ARTICArtworks, randomMETArtworks } = await fetchCollectionMainPage(
    artworkDisplayCount
  );

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-xl font-black">Collections</h1>
      <CollectionPage
        title="MET"
        artwork={randomMETArtworks}
        href="/collections/MET/page/1?view=grid"
      />
      <CollectionPage
        title="ARTIC"
        artwork={ARTICArtworks}
        href="/collections/ARTIC/page/1?view=grid"
      />
    </div>
  );
}
