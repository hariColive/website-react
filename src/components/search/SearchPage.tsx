import type { Metadata } from "next";
import { Suspense, type ComponentProps } from "react";

import SearchHero from "./SearchHero";
import SearchResults from "./SearchResults";
import SearchResultsSkeleton from "./SearchResultsSkeleton";

// Shared by /search and the city routes (/pg-in-bangalore, /bangalore/pg-in-whitefield, ...)
export default function SearchPage(props: ComponentProps<typeof SearchResults>) {
  return (
    <>
      <SearchHero />

      <section id="search-results" className="scroll-mt-(--header-h) bg-white">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults {...props} />
        </Suspense>
      </section>
    </>
  );
}

export const searchMetadata = (place: string): Metadata => ({
  title: `PG Accommodation, Furnished Rooms for Rent in ${place} Near You: Colive`,
  description: `Find fully furnished, managed PG and co-living rooms in ${place} with Colive. Single, shared and couple rooms with no brokerage.`,
});
