"use client";
import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import { ViewToggleProps } from "../lib/definitions";

export default function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={() => setView(view === "grid" ? "list" : "grid")}
        className="cursor-pointer flex items-center gap-2 px-3 py-1 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {view === "grid" ? (
          <span className="flex items-center gap-2">
            <ListBulletIcon className="w-4 h-4" />
            List view
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <TableCellsIcon className="w-4 h-4" />
            Grid view
          </span>
        )}
      </button>
    </div>
  );
}
