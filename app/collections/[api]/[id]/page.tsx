import React from "react";
import ArtworkPage from "@/components/ArtworkPage";
import { auth } from "@/auth";
import { fetchUserExhibits } from "@/app/lib/endpoints";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const apiSource = id.slice(0, 1);
  const artwork_id = id.slice(1);

  const exhibits = session?.user?.username
    ? await fetchUserExhibits(session.user.username)
    : null;

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <ArtworkPage
        artwork_id={artwork_id}
        apiSource={apiSource}
        exhibits={exhibits}
      />
    </div>
  );
}
