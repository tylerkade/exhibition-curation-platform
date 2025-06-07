import React from "react";
import { auth } from "@/auth";
import { fetchUserByUsername, fetchUserExhibits } from "../lib/endpoints";
import ExhibitDashboard from "@/components/ExhibitDashboard";

export default async function Page() {
  const session = await auth();

  if (!session?.user.username) {
    throw new Error("User is not logged in");
  }

  const userData = await fetchUserByUsername(session.user.username);
  const exhibits = await fetchUserExhibits(userData.username);

  return <ExhibitDashboard userData={userData} exhibits={exhibits} />;
}
