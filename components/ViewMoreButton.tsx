import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";

function ViewMoreButton() {
  return (
    <button className="flex items-center space-x-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <span>View More</span>
      <ArrowRightIcon height={16} />
    </button>
  );
}

export default ViewMoreButton;
