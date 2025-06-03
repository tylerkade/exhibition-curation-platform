import { fetchARTICArtworks, fetchDepartments } from "@/app/lib/endpoints";
import { MetPaginationValues } from "@/app/utils/METPaginationValues";
import CollectionArtworks from "@/components/CollectionArtworks";
import { sanitiseSearchField } from "@/app/utils/validateSearchFields";
import Error from "@/app/ui/Error";

async function Page(props: {
  params: Promise<{ api: string; page: string }>;
  searchParams: Promise<{
    pageLimit?: number;
    departmentId?: string;
    searchField?: string;
    q?: string;
    hasImages?: string;
    dateBegin?: string;
    dateEnd?: string;
  }>;
}) {
  const { api, page } = await props.params;
  const {
    pageLimit,
    departmentId,
    q,
    hasImages,
    searchField,
    dateBegin,
    dateEnd,
  } = await props.searchParams;
  const pageNumber = parseInt(page, 10);

  let fetchedDepartments = [];

  if (api === "MET") {
    fetchedDepartments = await fetchDepartments();
  }

  const filters = {
    departmentId: departmentId || "",
    searchField: sanitiseSearchField(searchField),
    hasImages: hasImages || "",
    dateBegin: dateBegin || "",
    dateEnd: dateEnd || "",
    q: q || "",
  };

  console.log(filters.q);

  try {
    let artworks = [];
    let totalPages = 1;
    let totalResults = 0;

    switch (api) {
      case "MET": {
        const result = await MetPaginationValues(
          pageNumber,
          pageLimit,
          filters
        );
        artworks = result.artworks;
        totalPages = result.totalPages;
        totalResults = result.total;
        break;
      }
      case "ARTIC": {
        const result = await fetchARTICArtworks(pageNumber, pageLimit, filters);
        artworks = result.ARTICArtworks;
        // ARTIC api only allows pagination up to page 100 when searching - have
        // to artificially restrict
        totalPages = filters.q
          ? Math.min(result.pagination.total_pages, 100)
          : result.pagination.total_pages;
        totalResults = result.pagination.total;
        break;
      }
      default:
        return (
          <Error
            error={"Unknown collection"}
            nav={`/collections`}
            buttonMessage="Return to collections"
          />
        );
    }

    if (totalPages !== 0)
      if (pageNumber > totalPages || pageNumber < 1) {
        return (
          <Error
            error={`Invalid page number.`}
            nav={`/collections/${api}/page/1`}
            buttonMessage="Return to page 1"
          />
        );
      }

    return (
      <div>
        <CollectionArtworks
          artworks={artworks}
          pageNumber={pageNumber}
          totalPages={totalPages}
          api={api}
          fetchedDepartments={fetchedDepartments}
          totalResults={totalResults}
        />
      </div>
    );
  } catch (err) {
    return (
      <Error
        error={
          api === "ARTIC" && pageNumber > 100
            ? "You can only view up to page 100 while searching in the ARTIC collection. Please refine your search."
            : (err as Error)?.message || "An unexpected error occurred."
        }
        nav={`/collections/${api}/page/1`}
        buttonMessage="Return to page 1"
      />
    );
  }
}

export default Page;
