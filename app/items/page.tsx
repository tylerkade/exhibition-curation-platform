import React from "react";
import { fetchArtworkById } from "../lib/endpoints";

import ItemCard from "../ui/ItemCard";

export default async function page() {
  let object = await fetchArtworkById(45734);

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <ItemCard object={object}/>
      
    </div>
  );
}
