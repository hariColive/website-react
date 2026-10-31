import { Suspense } from "react";
import { notFound } from "next/navigation";

import SearchHeroSection from "@/components/common/properties/SearchHeroSection";
import PropertiesListing from "@/app/properties/PropertiesListing";
import { RENTAL_LOCATIONS } from "@/lib/rentalLocations";

async function RentalLocationContent({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const location = RENTAL_LOCATIONS[slug.join("/").toLowerCase()];

  if (!location) notFound();

  return (
    <>
      <SearchHeroSection location={location} />
      <PropertiesListing location={location} />
    </>
  );
}

export default function RentalLocationPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8f8f8] px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl text-gray-500">Loading properties...</div>
        </main>
      }
    >
      <RentalLocationContent params={params} />
    </Suspense>
  );
}
