"use client";
import React, { useState } from "react";
import ExhibitSection from "@/components/ExhibitSection";
import { Exhibit } from "@/app/lib/definitions";
import { createExhibit, deleteExhibit } from "@/app/lib/endpoints";
import profanityFilter from "@/app/utils/profanityFilter";

export default function ExhibitDashboard({
  userData,
  exhibits: initialExhibits,
}: {
  userData: { user_id: number; name: string; username: string };
  exhibits: Exhibit[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [newExhibitName, setNewExhibitName] = useState("");
  const [exhibits, setExhibits] = useState(initialExhibits);

  const handleCreateExhibit = async () => {
    if (!newExhibitName.trim()) return;

    if (profanityFilter.isProfane(newExhibitName)) {
      alert("Please avoid using inappropriate language in exhibit names.");
      return;
    }

    try {
      const created = await createExhibit(
        userData.user_id,
        newExhibitName.trim()
      );

      const newExhibit: Exhibit = {
        exhibit_id: created.id,
        name: created.name,
        artworks: [],
      };

      setExhibits((prev) => [...prev, newExhibit]);
      setNewExhibitName("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create exhibit", error);
    }
  };

  const handleDeleteExhibit = async (id: number) => {
    try {
      await deleteExhibit(id);
      setExhibits((prev) => prev.filter((ex) => ex.exhibit_id !== id));
    } catch (error) {
      console.error("Failed to delete exhibit", error);
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto min-h-screen bg-gray-900">
      <div className="p-4 flex flex-col space-y-4 bg-gray-800 rounded-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-xl font-black text-white text-center sm:text-left">
            Hello {userData.name}
          </h1>
          <button
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "Create Exhibit"}
          </button>
        </div>

        {showForm && (
          <div className="flex flex-col w-full space-y-1">
            <label
              htmlFor="new-exhibit-name"
              className="text-sm text-white mb-1"
            >
              Exhibit Name
            </label>
            <div className="flex space-x-2 items-center">
              <input
                id="new-exhibit-name"
                type="text"
                value={newExhibitName}
                onChange={(e) => setNewExhibitName(e.target.value)}
                placeholder="Enter exhibit name"
                className="p-2 rounded w-full text-white border border-gray-60 
                bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateExhibit}
                className="cursor-pointer bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <h2 className="pl-2 text-lg font-bold text-white border-b border-gray-700">
        Your Exhibits
      </h2>

      {exhibits.map((exhibit, index) => (
        <ExhibitSection
          key={exhibit.exhibit_id}
          name={exhibit.name}
          artworks={exhibit.artworks}
          exhibit_id={exhibit.exhibit_id}
          handleDeleteExhibit={handleDeleteExhibit}
          canDelete={index !== 0}
        />
      ))}
    </div>
  );
}
