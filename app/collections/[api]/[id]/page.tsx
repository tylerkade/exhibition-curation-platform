import React from "react";
import ArtworkPage from "@/components/ArtworkPage";
import { auth } from "@/auth";
import { fetchUserExhibits } from "@/app/lib/endpoints";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = await params; // 'await has no effect here' - (VSC), but it prevents the async access
  // error (think this is a quirk of Next.js + Typescript)
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
