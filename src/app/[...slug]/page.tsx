
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import PropertyPage, {
  propertyMetadata,
} from "@/components/property/PropertyPage";
import SearchPage from "@/components/search/SearchPage";
import SearchHeroSection from "@/components/common/searchsection/SearchHeroSection";
import SearchListing from "@/app/search/SearchListing";

import { locationFromPath } from "@/lib/searchLocation";
import { searchMetadata } from "@/lib/searchSeo";
import { RENTAL_LOCATIONS } from "@/lib/rentalLocations";

const PROPERTY_SEGMENTS = 4;

const isPropertyPath = (slug: string[]) =>
  slug.length === PROPERTY_SEGMENTS;

function getRentalLocation(slug: string[]) {
  return RENTAL_LOCATIONS[slug.join("/").toLowerCase()];
}

export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;

  if (isPropertyPath(slug)) {
    return propertyMetadata(slug[PROPERTY_SEGMENTS - 1]);
  }

  const location = await locationFromPath(slug);

  if (location) {
    return searchMetadata(location);
  }

  return {};
}

async function PageContent({
  params,
  searchParams,
}: PageProps<"/[...slug]">) {
  const { slug } = await params;

  // 1. Individual property pages
  if (isPropertyPath(slug)) {
    return (
      <PropertyPage
        link={Promise.resolve(slug[PROPERTY_SEGMENTS - 1])}
      />
    );
  }

  // 2. City and SEO search pages
  const searchLocation = await locationFromPath(slug);

  if (searchLocation) {
    return (
      <SearchPage
        location={Promise.resolve(searchLocation)}
        searchParams={searchParams}
      />
    );
  }

  // 3. Existing rental-location pages
  const rentalLocation = getRentalLocation(slug);

  if (rentalLocation) {
    return (
      <>
        <SearchHeroSection location={rentalLocation} />
        <SearchListing location={rentalLocation} />
      </>
    );
  }

  // 4. Unknown URLs
  notFound();
}

function PageFallback() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl text-gray-500">
        Loading properties...
      </div>
    </main>
  );
}

export default function Page(props: PageProps<"/[...slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageContent {...props} />
    </Suspense>
  );
}
