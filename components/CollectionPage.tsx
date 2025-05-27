import Link from "next/link";
import React from "react";
import ViewMoreButton from "./ViewMoreButton";
import SmallItemCard from "@/app/ui/SmallItemCard";
import { APIObject } from "@/app/lib/definitions";

const CollectionPage = ({
  title,
  artwork,
  href,
}: {
  title: string;
  artwork: APIObject[];
  href: string;
}) => {
  return (
    <div>
      <h2 className="pl-2 text-lg font-bold border-b border-gray-800">
        {title}
      </h2>
      <ul>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 px-1">
          {artwork.map((art) => (
            <SmallItemCard key={art.objectID} art={art} />
          ))}
        </div>
      </ul>
      <Link href={href} className="justify-end flex pt-6">
        <ViewMoreButton />
      </Link>
    </div>
  );
};

export default CollectionPage;
