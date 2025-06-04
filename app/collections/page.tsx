import React from "react";
import { fetchCollectionMainPage } from "../lib/endpoints";
import CollectionPage from "@/components/CollectionPage";

const artworkDisplayCount = 10;

export default async function Page() {
  const { ARTICArtworks, randomMETArtworks } = await fetchCollectionMainPage(
    artworkDisplayCount
  );

  const METDescriptions = [
    `The Metropolitan Museum of Art presents over 5,000 years of art from
          around the world for everyone to experience and enjoy. The Museum
          lives in two iconic sites in New York City—The Met Fifth Avenue and
          The Met Cloisters.`,
    `Since it was founded in 1870, The Met has always aspired to be more
          than a treasury of rare and beautiful objects. Every day, art comes
          alive in the Museum's galleries and through its exhibitions and
          events, revealing both new ideas and unexpected connections across
          time and across cultures.`,
  ];

  const ARTICDescriptions = [
    `Founded in 1879, the Art Institute of Chicago is one of the world's 
      major museums, housing an extraordinary collection of objects from across 
      places, cultures, and time. We are also a place of active learning for 
      all—dedicated to investigation, innovation, education, and dialogue—continually 
      aspiring to greater public service and civic engagement.`,
  ];

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-xl font-black">Collections</h1>
      <CollectionPage
        title="The Metropolitan Museum of Art"
        artwork={randomMETArtworks}
        href="/collections/MET/page/1?view=grid"
        descriptions={METDescriptions}
      />
      <CollectionPage
        title="The Art Institute of Chicago"
        artwork={ARTICArtworks}
        href="/collections/ARTIC/page/1?view=grid"
        descriptions={ARTICDescriptions}
      />
    </div>
  );
}
