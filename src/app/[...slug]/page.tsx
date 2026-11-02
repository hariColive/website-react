import type { Metadata } from "next";
import { Suspense } from "react";

import PropertyPage, { propertyMetadata } from "@/components/property/PropertyPage";
import SearchPage from "@/components/search/SearchPage";
import { locationFromPath } from "@/lib/searchLocation";
import { searchMetadata } from "@/lib/searchSeo";

// City search pages: /pg-in-bangalore, /men-pg-in-bangalore, /pune, /bangalore/pg-in-whitefield,
// /bangalore/central/pg-in-koramangala. Anything that isn't a known city 404s (see locationFromPath).
// Four segments are a property page, as linked from the search cards:
// /bangalore/pg-in-mahadevpura/colive-179-signature-towers/colive_179
const PROPERTY_SEGMENTS = 4;

const isPropertyPath = (slug: string[]) => slug.length === PROPERTY_SEGMENTS;

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (isPropertyPath(slug)) return propertyMetadata(slug[PROPERTY_SEGMENTS - 1]);

  const location = await locationFromPath(slug);
  return location ? searchMetadata(location) : {};
}

export default function Page({ params, searchParams }: PageProps<"/[...slug]">) {
  // Which page to render depends on the path, so it's decided inside Suspense once params resolve
  return (
    <Suspense>
      {params.then(({ slug }) =>
        isPropertyPath(slug) ? (
          <PropertyPage link={Promise.resolve(slug[PROPERTY_SEGMENTS - 1])} />
        ) : (
          <SearchPage location={locationFromPath(slug)} searchParams={searchParams} />
        ),
      )}
    </Suspense>
  );
}
