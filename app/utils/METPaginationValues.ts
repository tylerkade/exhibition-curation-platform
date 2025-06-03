import { fetchMETIDs, fetchMETArtworkById } from "@/app/lib/endpoints";
import { APIObject, Filters } from "@/app/lib/definitions";

export async function MetPaginationValues(
  page: number,
  pageSize: number = 15,
  filters: Filters
): Promise<{
  artworks: APIObject[];
  totalPages: number;
  total: number;
}> {
  const { total, objectIDs } = await fetchMETIDs(filters);
  const totalPages = Math.ceil(total / pageSize);

  if (isNaN(page) || page < 1 || (totalPages > 0 && page > totalPages)) {
    throw new Error("Invalid page number.");
  }

  const start = (page - 1) * pageSize;
  const pageIds = objectIDs.slice(start, start + pageSize);

  const artworks = await Promise.all(
    pageIds.map(async (id: number) => {
      try {
        return await fetchMETArtworkById(id);
      } catch {
        console.warn(`Skipping invalid MET object ID: ${id}`);
        return null;
      }
    })
  );

  const validArtworks = artworks.filter(
    (artwork): artwork is APIObject => artwork != null
  );

  return { artworks: validArtworks, totalPages, total };
}
