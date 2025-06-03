"use server";
import { sql } from "@vercel/postgres";
import { formatQ, mapARTICToMETData } from "../utils/ARTICFunctions";
import { getRandomAmount } from "../utils/randomSelection";
import {
  APIObject,
  ARTICArtwork,
  ARTICPagination,
  ARTICSearchResponse,
  Filters,
  User,
} from "./definitions";

// Database

export async function fetchUsers() {
  try {
    const data = await sql`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error("error fetching users", error);
    throw new Error("error fetching users");
  }
}

export async function fetchUserByUsername(username: string | undefined) {
  try {
    const data = await sql<User>`SELECT * FROM users 
    WHERE username = ${username}`;
    return data.rows[0];
  } catch (error) {
    console.error("error fetching user", error);
    throw new Error("error fetching user");
  }
}

export async function fetchUserExhibits(username: string) {
  try {
    const data = await sql`
      SELECT e.id AS exhibit_id, e.name AS exhibit_name, ea.artwork_id 
      FROM users u
      JOIN exhibits e ON u.user_id = e.user_id
      LEFT JOIN exhibit_artworks ea ON e.id = ea.exhibit_id
      WHERE u.username = ${username}
      ORDER BY e.id;
    `;

    const exhibits: {
      exhibit_id: number;
      name: string;
      artworks: string[];
    }[] = [];

    for (const row of data.rows) {
      const { exhibit_id, exhibit_name, artwork_id } = row;

      let exhibit = exhibits.find((e) => e.name === exhibit_name);

      if (!exhibit) {
        exhibit = { exhibit_id: exhibit_id, name: exhibit_name, artworks: [] };
        exhibits.push(exhibit);
      }
      if (artwork_id) {
        exhibit.artworks.push(artwork_id);
      }
    }

    return exhibits;
  } catch (error) {
    console.error("error fetching users exhibits", error);
    throw new Error("error fetching users exhibits");
  }
}

export async function addArtworkToExhibit(
  exhibit_id: number,
  artwork_id: string
) {
  try {
    const data = await sql`
    INSERT INTO exhibit_artworks
    VALUES (${exhibit_id}, ${artwork_id})
    ON CONFLICT DO NOTHING;
    `;
    return data.rowCount;
  } catch (error) {
    console.error("error adding artwork to exhibit", error);
    throw new Error("error adding artwork to exhibit");
  }
}

export async function removeArtworkFromExhibit(
  exhibit_id: number,
  artwork_id: string
) {
  try {
    await sql`
    DELETE FROM exhibit_artworks
    WHERE exhibit_id = ${exhibit_id} AND artwork_id = ${artwork_id};
    `;
  } catch (error) {
    console.error("error removing artwork from exhibit", error);
    throw new Error("error removing artwork from exhibit");
  }
}

// API calls

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

// MET API calls

export async function fetchMETIDs(filters: Filters): Promise<{
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

  const formattedQ = formatQ(filters.q ?? "");

  const query = new URLSearchParams({
    ...(filters.departmentId && { departmentId: filters.departmentId }),
    ...(filters.searchField === "title" && { title: "true" }),
    ...(filters.searchField === "tags" && { tags: "true" }),
    ...(filters.searchField === "artistOrCulture" && {
      artistOrCulture: "true",
    }),
    ...(filters.hasImages !== "" && { hasImages: filters.hasImages }),
    ...(filters.dateBegin && { dateBegin: filters.dateBegin.toString() }),
    ...(filters.dateEnd && { dateEnd: filters.dateEnd.toString() }),
    q: formattedQ.trim() === "" ? '""' : formattedQ,
  });

  let response: Response;
  const newQuery = query.toString();

  if (
    filters.q ||
    filters.departmentId ||
    filters.searchField !== "all" ||
    filters.hasImages ||
    filters.dateBegin ||
    filters.dateEnd
  ) {
    response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?${newQuery}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching searched artwork IDs`);
    }
  } else {
    response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    );
    if (!response.ok) {
      throw new Error(`Error fetching artwork IDs`);
    }
  }

  const { total, objectIDs } = await response.json();
  if (!objectIDs || total === 0) {
    return { total: 0, objectIDs: [] };
  }

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
    // Fetching IDs is supposed to get you valid IDs that exists (i.e. has an artwork), and
    // normally if an ID does not exist and you try to fetch it, it returns
    // {"message": "Not a valid object"}, However, there are some IDs that do exist, but
    // return {"message": "ObjectID not found"} despite being "valid IDs" - therefore 'total'
    // will always be off without validating each and every artwork before displaying it
    // (which isn't feasible)
    const artwork = await response.json();
    artwork.APIsource = "MET";

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

// ARTIC API calls
export async function fetchARTICArtworks(
  page: number = 1,
  limit: number = 10,
  filters: Filters = {}
) {
  const formattedQ = formatQ(filters.q ?? "");
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    q: formattedQ,
  });

  // ARTIC doesn't have an in-depth search endpoint

  let response: Response;
  let artworkIDs: number[] = [];
  let pagination: ARTICPagination;

  if (filters.q) {
    console.log(`https://api.artic.edu/api/v1/artworks/search?${query.toString()}`)
    response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?${query.toString()}`
    );
    if (!response.ok) throw new Error(`Error searching ARTIC artworks`);

    const { data, pagination: pag } = await response.json();
    artworkIDs = data.map((art: ARTICSearchResponse) => art.id);
    pagination = pag;
  } else {
    response = await fetch(
      `https://api.artic.edu/api/v1/artworks?${query.toString()}`
    );
    if (!response.ok) throw new Error(`Error fetching ARTIC artworks`);

    const { data, pagination: pag, config } = await response.json();

    const ARTICArtworks = data.map((artwork: ARTICArtwork) =>
      mapARTICToMETData(artwork, config)
    );

    return {
      total: pag.total,
      ARTICArtworks,
      pagination: pag,
    };
  }

  const fullArtworks = await Promise.all(
    artworkIDs.map(async (id) => {
      const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
      if (!res.ok) return null;
      const { data, config } = await res.json();
      return mapARTICToMETData(data, config);
    })
  );

  const validArtworks = fullArtworks.filter(Boolean) as APIObject[];

  return {
    total: pagination.total,
    ARTICArtworks: validArtworks,
    pagination,
  };
}

export async function fetchARTICArtworkById(id: number) {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching artwork data`);
  }

  const { data, config } = await response.json();
  return mapARTICToMETData(data, config);
}
