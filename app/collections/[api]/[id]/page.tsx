"use client";
import React from "react";
import { useParams } from "next/navigation";
import ArtworkPage from "@/components/ArtworkPage";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const apiSource = id.slice(0,1)

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <ArtworkPage apiSource={apiSource} artwork_id={id.slice(1)} />
    </div>
  );
};

export default Page;
