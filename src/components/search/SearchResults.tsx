import { notFound } from "next/navigation";

import { getFilterMaster, searchProperties } from "@/lib/propertySearch";
import { parseFilters, ROOM_TYPES, toSearchParams, toSlug } from "@/lib/searchFilters";
import { coordinatesFromQuery, type SearchLocation } from "@/lib/searchLocation";

import FilterSidebar from "./FilterSidebar";
import NoProperties from "./NoProperties";
import PropertyGrid from "./PropertyGrid";
import SearchFiltersProvider from "./SearchFiltersProvider";

export const resultsLayoutClass =
  "mx-auto grid max-w-360 gap-5 px-4 pb-16 sm:px-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)]";

type SearchResultsProps = {
  location: Promise<SearchLocation | null>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchResults({ location, searchParams }: SearchResultsProps) {
  const [place, params] = await Promise.all([location, searchParams.then(toSearchParams)]);
  if (!place) notFound();

  const filters = parseFilters(params);
  const { amenities, cities } = await getFilterMaster();
  const { properties, similar } = await searchProperties({
    location: place.apiLocation,
    ...coordinatesFromQuery(params),
    ...(filters.radius ? { distance: String(filters.radius) } : {}),
    roomTypeIds: ROOM_TYPES.filter((type) => filters.sharingTypes.includes(type.slug)).map((type) => type.ids).join(","),
    amenityIds: amenities.filter((amenity) => filters.amenities.includes(toSlug(amenity.Name))).map((amenity) => amenity.Id).join(","),
    minPrice: filters.price?.[0],
    maxPrice: filters.price?.[1],
  });

  return (
    <SearchFiltersProvider>
      <div className={resultsLayoutClass}>
        <aside className="md:sticky md:top-[calc(var(--header-h)+1rem)] md:max-h-[calc(100vh-var(--header-h)-2rem)] md:self-start md:overflow-y-auto">
          <FilterSidebar amenities={amenities} />
        </aside>

        <PropertyGrid properties={properties} similar={similar} emptyState={<NoProperties cities={cities} />} />
      </div>
    </SearchFiltersProvider>
  );
}
