"use server";
import { mapARTICToMETData } from "../utils/ARTICFunctions";
import { getRandomAmount } from "../utils/randomSelection";
import { APIObject, ARTICResponse } from "./definitions";

export async function fetchCollectionMainPage(amount: number) {
  const METResponse = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects`
  );
  if (!METResponse.ok) {
    throw new Error(`Error fetching artwork IDs`);
  }

  const { objectIDs } = await METResponse.json();
  let { ARTICArtworks } = await fetchARTICArtworks();

  // I could try and make this fetch random artworks too later
  ARTICArtworks = ARTICArtworks.slice(0, amount);

  const randomMETArtworksIDs = getRandomAmount(objectIDs, amount);
  const randomMETArtworks = await Promise.all(
    randomMETArtworksIDs.map(async (id) => {
      return await fetchMETArtworkById(id);
    })
  );

  return { ARTICArtworks, randomMETArtworks };
}

// let cachedMETIDs: number[] | null = null;

export async function fetchMETIDs(): Promise<{
  // limit = 1000
  total: number;
  objectIDs: number[];
}> {
  // My attempt at caching a chunk of the data from the MET api (gives 50k ids by default)
  // if (cachedMETIDs) {
  //   console.log("This is cached")
  //   console.log(cachedMETIDs)
  //   return {
  //     total: cachedMETIDs.length,
  //     objectIDs: cachedMETIDs.slice(0, limit),
  //   };
  // }
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects`
  );
  if (!response.ok) {
    throw new Error(`Error fetching artwork IDs`);
  }

  const { total, objectIDs } = await response.json();

  const sortedObjectIDs = objectIDs.sort((a: number, b: number) => a - b);
  // const limited = sortedObjectIDs.slice(0, limit)

  // cachedMETIDs = limited;

  // console.log(cachedMETIDs, "Cached")

  return {
    // total: limited.length,
    // objectIDs: limited
    total,
    objectIDs: sortedObjectIDs,
  };
}

export async function fetchMETArtworkById(
  artwork_id: number
): Promise<APIObject> {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artwork_id}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching artwork with ID: ${artwork_id}`);
    }
    const artwork = await response.json();
    artwork.APIsource = "MET";

    return artwork;
  } catch (error) {
    console.error(`Error fetching artwork with ID: ${artwork_id}`, error);
    throw new Error(`Error fetching artwork with ID: ${artwork_id}`);
  }
}

export async function fetchARTICArtworks(page: number = 1, limit: number = 12) {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching artwork IDs`);
  }
  const APIResponse: ARTICResponse = await response.json();

  const { pagination, data, config } = APIResponse;

  const ARTICArtworks = data.map((artwork) => {
    return mapARTICToMETData(artwork, config);
  });
  return { ARTICArtworks, pagination };
}

export async function fetchARTICArtwork(id: number) {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching artwork data`);
  }

  const { data, config } = await response.json();
  return mapARTICToMETData(data, config);
}

export async function fetchArtworksBySearch(search_term: string) {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?${search_term}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching artwork`);
    }
    const { total, objectIDs } = await response.json();
    return { total, objectIDs };
  } catch (error) {
    console.error(`Error fetching artwork`, error);
    throw new Error(`Error fetching artwork`);
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
