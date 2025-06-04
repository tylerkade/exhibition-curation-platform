"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CollectionsButton({
  btnMsg,
  nav,
  customCSS,
}: {
  btnMsg: string;
  nav: string;
  customCSS?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(nav);
  };

  const baseClass =
    "flex items-center space-x-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition";
  const loadingClass = loading ? " opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${customCSS || baseClass}${loadingClass}`}
    >
      <span>{loading ? "Loading..." : btnMsg}</span>
      {!loading && btnMsg === "View more" && <ArrowRightIcon height={16} />}
    </button>
  );
}
