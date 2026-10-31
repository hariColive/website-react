import { Suspense } from "react";
import { redirect } from "next/navigation";
import SearchHeroSection from "@/components/common/properties/SearchHeroSection";
import PropertiesListing from "./PropertiesListing";
import { getRentalLocationPath } from "@/lib/rentalLocations";
type PropertiesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function PropertiesPageContent({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const locationValue = params.location;
  const location = Array.isArray(locationValue)
    ? locationValue[0]?.trim()
    : locationValue?.trim();
  const propertyIdValue = params.propertyId;
  const propertyIdText = Array.isArray(propertyIdValue)
    ? propertyIdValue[0]
    : propertyIdValue;
  const propertyId = propertyIdText ? Number(propertyIdText) : undefined;
  const selectedPropertyId =
    propertyId !== undefined && Number.isInteger(propertyId) && propertyId > 0
      ? propertyId
      : undefined;

  if (location && selectedPropertyId === undefined) {
    const rentalPath = getRentalLocationPath(location);
    if (rentalPath) redirect(rentalPath);
  }

  return (
    <>
      <SearchHeroSection location={location || "Bangalore"} />
      <PropertiesListing
        location={location || "Bangalore"}
        propertyId={selectedPropertyId}
      />
    </>
  );
}

export default function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8f8f8] px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl text-gray-500">Loading properties...</div>
        </main>
      }
    >
      <PropertiesPageContent searchParams={searchParams} />
    </Suspense>
  );
}
