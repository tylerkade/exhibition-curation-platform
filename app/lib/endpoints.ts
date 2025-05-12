"use server";

import { APIObject } from "./definitions";

export async function fetchArtworkIDs(a: number, b: number) {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    );
    if (!response.ok) {
      throw new Error(`Error fetching artworks`);
    }
    const artworks = await response.json();
    return artworks.objectIDs.slice(a, b);
  } catch (error) {
    console.error(`Error fetching artworks`, error);
    throw new Error(`Error fetching artworks`);
  }
}

export async function fetchArtworkById(artwork_id: number): Promise<APIObject> {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artwork_id}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching artwork with ID: ${artwork_id}`);
    }
    const artwork = await response.json();
    return artwork;
  } catch (error) {
    console.error(`Error fetching artwork with ID: ${artwork_id}`, error);
    throw new Error(`Error fetching artwork with ID: ${artwork_id}`);
  }
}

export async function fetchDepartments() {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/departments`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      throw new Error(`Error fetching departments`);
    }
    const { departments } = await response.json();
    return departments;
  } catch (error) {
    console.error(`Error fetching departments`, error);
    throw new Error(`Error fetching departments`);
  }
}
