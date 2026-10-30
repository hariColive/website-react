import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getPropertyDetails, getRoomPlans, type PropertyDetails } from "@/lib/propertyDetails";
import { toSlug } from "@/lib/searchFilters";

import BookingPanel from "./BookingPanel";
import BookingPlans from "./BookingPlans";
import CurrentOffers from "./CurrentOffers";
import FoodMenu from "./FoodMenu";
import PropertyAmenities from "./PropertyAmenities";
import PropertyFeatures from "./PropertyFeatures";
import PropertyGallery from "./PropertyGallery";
import PropertyHeader from "./PropertyHeader";
import PropertyOverview from "./PropertyOverview";
import PropertyReviews from "./PropertyReviews";
import PropertySkeleton from "./PropertySkeleton";
import RentSummary from "./RentSummary";

// Same target as the Book Now button on colive.com's property page (property.js)
const bookNowUrl = (property: PropertyDetails) =>
  `https://www.colive.com/booknow?L=${encodeURIComponent(property.link)}&Ln=${encodeURIComponent(toSlug(property.name))}`;

async function RoomsAndOffers({ property }: { property: PropertyDetails }) {
  const rooms = await getRoomPlans(property.id);
  return (
    <>
      <BookingPlans rooms={rooms} />
      <CurrentOffers offers={property.offers} />
    </>
  );
}

async function PropertyContent({ link }: { link: Promise<string> }) {
  const property = await getPropertyDetails(await link);
  if (!property) notFound();

  return (
    <div className="mx-auto max-w-360 px-4 pt-8 pb-16 sm:px-8">
      <PropertyHeader {...property} />
      <PropertyGallery name={property.name} images={property.images} tourUrl={property.tourUrl} isGold={property.isGold} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_436px] lg:gap-6">
        <aside className="lg:order-2">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
            <BookingPanel propertyId={property.id} propertyName={property.name} bookNowUrl={bookNowUrl(property)} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-12 lg:order-1">
          <PropertyOverview description={property.description} highlights={property.highlights} />
          <PropertyFeatures />
          <PropertyReviews rating={property.rating} reviewsCount={property.reviewsCount} testimonials={property.testimonials} />
          {/* Room prices come from a second API call, so they stream in without holding up the rest of the page */}
          <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-gray-50" aria-label="Loading rooms" />}>
            <RoomsAndOffers property={property} />
          </Suspense>
          <PropertyAmenities amenities={property.amenities} />
          {property.hasFood && <FoodMenu />}
          <RentSummary />
        </div>
      </div>
    </div>
  );
}

// Shared by /property/<link> and /<city>/pg-in-<locality>/<property-name>/<link>
export default function PropertyPage({ link }: { link: Promise<string> }) {
  return (
    <Suspense fallback={<PropertySkeleton />}>
      <PropertyContent link={link} />
    </Suspense>
  );
}

export async function propertyMetadata(link: string): Promise<Metadata> {
  const property = await getPropertyDetails(link);
  if (!property) return {};

  return {
    title: `${property.name} | PG in ${property.locality}, ${property.city} | Colive`,
    description: property.description.slice(0, 160),
    openGraph: { images: property.images.slice(0, 1).map((image) => image.thumb) },
  };
}
