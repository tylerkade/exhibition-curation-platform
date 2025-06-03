import React from "react";
import ArtworkPage from "@/components/ArtworkPage";
import { auth } from "@/auth";
import { fetchUserExhibits } from "@/app/lib/endpoints";
import Error from "@/app/ui/Error";

const apiSourceMap: Record<string, string> = {
  M: "MET",
  A: "ARTIC",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; api: string }>;
}) {
  const { id, api } = await params;
  const session = await auth();

  const apiSource = id.slice(0, 1);
  const artwork_id = id.slice(1);

  const expectedApi = apiSourceMap[apiSource];

  if (!expectedApi || api !== expectedApi) {
    return (
      <Error
        error={"invalid API path"}
        nav={"/collections"}
        buttonMessage="Back to Collections"
      />
    );
  }

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
