import React from "react";
import SmallItemCard from "@/app/ui/SmallItemCard";
import { APIObject } from "@/app/lib/definitions";
import { CollectionsButton } from "@/app/ui/CollectionsButton";

const CollectionPage = ({
  title,
  artwork,
  href,
  descriptions,
}: {
  title: string;
  artwork: APIObject[];
  href: string;
  descriptions: string[];
}) => {
  return (
    <div className="bg-gray-700 rounded p-4">
      <h2 className="pl-2 text-lg font-bold border-b border-gray-300">
        {title}
      </h2>
      <ul>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 px-1">
          {artwork.map((art) => (
            <SmallItemCard key={art.objectID} art={art} />
          ))}
        </div>
      </ul>
      <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-200 pt-4">
        {descriptions.map((description, index) => (
          <p key={index}>{description}</p>
        ))}
      </div>
      <div className="justify-end flex pt-6">
        <CollectionsButton
          btnMsg="View more"
          nav={href}
          customCSS="flex items-center space-x-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
  );
};

export default CollectionPage;
