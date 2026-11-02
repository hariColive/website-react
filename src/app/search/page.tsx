import type { Metadata } from "next";

import SearchPage from "@/components/search/SearchPage";
import { toSearchParams } from "@/lib/searchFilters";
import { locationFromQuery } from "@/lib/searchLocation";
import { searchMetadata } from "@/lib/searchSeo";

// /search?loc=Whitefield, Bangalore&lat=..&long=..&rad=.. (from the home page search box)
export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const location = locationFromQuery(toSearchParams(await searchParams));
  return location ? searchMetadata(location) : {};
}

export default function Page({ searchParams }: PageProps<"/search">) {
  const location = searchParams.then((params) => locationFromQuery(toSearchParams(params)));
  return <SearchPage location={location} searchParams={searchParams} />;
}
