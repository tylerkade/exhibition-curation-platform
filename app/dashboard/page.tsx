import React from "react";
import { auth } from "@/auth";
import { fetchUserByUsername, fetchUserExhibits } from "../lib/endpoints";
import ExhibitSection from "@/components/ExhibitSection";

export default async function Page() {
  const session = await auth();

  if (!session?.user.username) {
    throw new Error("User is not logged in");
  }

  const userData = await fetchUserByUsername(session.user.username);
  const exhibits = await fetchUserExhibits(userData.username);

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="pl-2 text-xl font-black">Hello {userData.name}</h1>
      <h2 className="pl-2 text-lg font-bold border-b border-gray-800">
        Your Exhibits
      </h2>

      {exhibits.map((exhibit) => (
        <ExhibitSection
          key={exhibit.name}
          name={exhibit.name}
          artworks={exhibit.artworks}
          exhibit_id={exhibit.exhibit_id}
        />
      ))}
    </div>
  );
}
