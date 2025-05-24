import { fetchMETIDs, fetchMETArtworkById } from "@/app/lib/endpoints";
import { APIObject } from "@/app/lib/definitions";

export async function MetPaginationValues(
  page: number,
  pageSize: number = 12
): Promise<{
  artworks: APIObject[];
  totalPages: number;
}> {
  const { total, objectIDs } = await fetchMETIDs();
  const totalPages = Math.ceil(total / pageSize);

  if (isNaN(page) || page < 1 || page > totalPages) {
    throw new Error("Invalid page number.");
  }

  const start = (page - 1) * pageSize;
  const pageIds = objectIDs.slice(start, start + pageSize);

  const artworks = await Promise.all(pageIds.map(fetchMETArtworkById));

  return { artworks, totalPages };
}
