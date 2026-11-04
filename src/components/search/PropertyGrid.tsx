"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import type { PropertySummary } from "@/lib/propertySearch";
import { displayPrice, propertyHref } from "@/lib/searchFilters";

import PropertyCard from "./PropertyCard";
import { useSearchFilters } from "./SearchFiltersProvider";
import SortSelect from "./SortSelect";

const PAGE_SIZE = 12;

const gridClass = "grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2";

const searchText = (property: PropertySummary) =>
  `${property.name} ${property.locationName} ${property.city} ${displayPrice(property)}`.toLowerCase();

// Keyword search narrows the fetched results client-side (as on colive.com), name matches first.
function filterByKeyword(properties: PropertySummary[], keyword: string) {
  if (!keyword) return properties;
  const matchesName = (property: PropertySummary) => property.name.toLowerCase().includes(keyword);
  return properties
    .filter((property) => searchText(property).includes(keyword))
    .sort((a, b) => Number(matchesName(b)) - Number(matchesName(a)));
}

function sortByPrice(properties: PropertySummary[], sort: string) {
  if (sort !== "price-asc" && sort !== "price-desc") return properties;
  const direction = sort === "price-asc" ? 1 : -1;
  return [...properties].sort((a, b) => (displayPrice(a) - displayPrice(b)) * direction);
}

type PropertyGridProps = {
  properties: PropertySummary[];
  similar: PropertySummary[];
  // Shown when the search itself returned nothing
  emptyState: ReactNode;
};

export default function PropertyGrid({ properties, similar, emptyState }: PropertyGridProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPending } = useSearchFilters();
  const keyword = (searchParams.get("q") ?? "").trim().toLowerCase();
  const sort = searchParams.get("sort") ?? "default";
  const [limit, setLimit] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => sortByPrice(filterByKeyword(properties, keyword), sort), [properties, keyword, sort]);
  const hasMore = visible.length > limit;

  // Render the next page of cards as the end of the list scrolls into view. Re-observing after
  // each page makes the observer fire again if the sentinel is still on screen.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setLimit((value) => value + PAGE_SIZE),
      { rootMargin: "400px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, limit]);

  const clearKeyword = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className={`transition-opacity ${isPending ? "pointer-events-none opacity-50" : ""}`} aria-busy={isPending}>
      <div className="mb-1 flex items-center justify-between gap-3">
        <h2 className="text-base text-[#111]">
          {visible.length} {visible.length === 1 ? "Home" : "Homes"}
        </h2>
        {properties.length > 0 && <SortSelect value={sort} />}
      </div>

      {properties.length === 0 ? (
        emptyState
      ) : visible.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <p className="mb-4">No homes match &ldquo;{keyword}&rdquo;.</p>
          <button
            type="button"
            onClick={clearKeyword}
            className="cursor-pointer rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#333]"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <div className={gridClass}>
            {visible.slice(0, limit).map((property, index) => (
              <PropertyCard key={property.id} property={property} href={propertyHref(property, pathname)} priority={index < 2} />
            ))}
          </div>
          {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-px" />}
        </>
      )}

      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-1 text-2xl font-bold text-[#111]">Similar Properties</h2>
          <div className={gridClass}>
            {similar.map((property) => (
              <PropertyCard key={property.id} property={property} href={propertyHref(property, pathname)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
