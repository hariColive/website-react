import { Suspense, type ComponentProps } from "react";

import SearchHero from "./SearchHero";
import SearchResults from "./SearchResults";
import SearchResultsSkeleton from "./SearchResultsSkeleton";
import SearchSeoContent from "./SearchSeoContent";

// Shared by /search and the city routes (/pg-in-bangalore, /bangalore/pg-in-whitefield, ...)
// Meta tags come from searchMetadata in src/lib/searchSeo.ts
export default function SearchPage(props: ComponentProps<typeof SearchResults>) {
  return (
    <>
      <SearchHero location={props.location} />

      <section id="search-results" className="scroll-mt-(--header-h) bg-white">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults {...props} />
        </Suspense>
      </section>

      <Suspense>
        <SearchSeoContent location={props.location} />
      </Suspense>
    </>
  );
}
