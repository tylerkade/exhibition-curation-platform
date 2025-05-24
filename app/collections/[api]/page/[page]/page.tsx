import { fetchARTICArtworks } from "@/app/lib/endpoints";
import { MetPaginationValues } from "@/app/utils/METPaginationValues";
import CollectionArtworks from "@/components/CollectionArtworks";
import Error from "@/app/ui/Error";

async function Page(props: {
  params: Promise<{ api: string; page: string }>;
  searchParams: Promise<{ pageLimit: number }>;
}) {
  const { api, page } = await props.params;
  const { pageLimit } = await props.searchParams;
  const pageNumber = parseInt(page, 10);

  try {
    let artworks = [];
    let totalPages = 1;

    switch (api) {
      case "MET": {
        const result = await MetPaginationValues(pageNumber, pageLimit);
        artworks = result.artworks;
        totalPages = result.totalPages;
        break;
      }
      case "ARTIC": {
        const result = await fetchARTICArtworks(pageNumber, pageLimit);
        artworks = result.ARTICArtworks;
        totalPages = result.pagination.total_pages;
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

    return (
      <CollectionArtworks
        artworks={artworks}
        pageNumber={pageNumber}
        totalPages={totalPages}
        api={api}
      />
    );
  } catch (err) {
    return (
      <Error
        error={(err as Error).message}
        nav={`/collections`}
        buttonMessage="Return to collections"
      />
    );
  }
}

export default Page;