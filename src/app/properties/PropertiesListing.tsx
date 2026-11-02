
"use client";

import { useEffect, useRef, useState } from "react";

import PropertyCard, {
  type Property,
} from "@/components/common/properties/PropertyCard";
import PropertyFilters, {
  type AmenityOption,
  type RoomFilter,
  type PropertySort,
} from "@/components/common/properties/PropertyFilters";
import PropertyLoader from "@/components/common/properties/PropertyLoader";
import {
  getPropertySearchDetails,
  getFilterMasterDetails,
  fetchPropertyDetails,
  getPlaceCoordinates,
} from "@/lib/coliveApi";

const PAGE_SIZE = 9;

type PropertyWithDescription = Property & {
  Highlights?: string;
  LocationHighlights?: string;
  LocationDescription?: string;
};

function withFallbackDescription(
  property: PropertyWithDescription
): PropertyWithDescription {
  return {
    ...property,
    Highlights:
      property.LocationHighlights ||
      property.LocationDescription ||
      property.Highlights ||
      property.Description ||
      "",
  };
}

function getRoomCategory(property: Property): RoomFilter | null {
  const roomType = `${property.RoomType ?? ""} ${property.RoomTypeName ?? ""} ${
    property.RoomSubType ?? ""
  }`.toLowerCase();

  if (roomType.includes("couple")) return "couple";
  if (
    roomType.includes("solo") ||
    roomType.includes("single") ||
    roomType.includes("private")
  ) {
    return "solo";
  }
  if (
    roomType.includes("shared") ||
    roomType.includes("twin") ||
    roomType.includes("triple") ||
    roomType.includes("quad") ||
    roomType.includes("3s")
  ) {
    return "shared";
  }

  return null;
}

function getRent(property: Property): number | null {
  if (property.Price === undefined || property.Price === "") return null;
  const rent = Number(property.Price);
  return Number.isFinite(rent) ? rent : null;
}

function parseCoordinate(
  value: number | string | undefined,
  minimum: number,
  maximum: number
): number | null {
  if (typeof value === "string" && value.trim() === "") return null;
  if (value === undefined) return null;

  const coordinate = Number(value);
  return Number.isFinite(coordinate) &&
    coordinate >= minimum &&
    coordinate <= maximum
    ? coordinate
    : null;
}

function getPropertyCoordinates(
  property: Property
): { latitude: number; longitude: number } | null {
  const latitude = parseCoordinate(property.Latitude, -90, 90);
  const longitude = parseCoordinate(property.Longitude, -180, 180);

  return latitude === null || longitude === null
    ? null
    : { latitude, longitude };
}

function getDistanceInKilometers(
  first: { latitude: number; longitude: number },
  second: { latitude: number; longitude: number }
): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDifference = radians(second.latitude - first.latitude);
  const longitudeDifference = radians(second.longitude - first.longitude);
  const firstLatitude = radians(first.latitude);
  const secondLatitude = radians(second.latitude);
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;
  const clampedHaversine = Math.min(1, Math.max(0, haversine));
  const centralAngle =
    2 *
    Math.atan2(
      Math.sqrt(clampedHaversine),
      Math.sqrt(1 - clampedHaversine)
    );

  return 6371 * centralAngle;
}

function PropertySkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm"
      aria-hidden="true"
    >
      <div className="aspect-[19/14] bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function PropertiesListing({
  location = "Bangalore",
  propertyId,
}: {
  location?: string;
  propertyId?: number;
}) {
  const [properties, setProperties] = useState<
    PropertyWithDescription[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amenityOptions, setAmenityOptions] = useState<AmenityOption[]>([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(true);
  const [amenitiesError, setAmenitiesError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [retryCount, setRetryCount] = useState(0);
  const [roomTypes, setRoomTypes] = useState<RoomFilter[]>([]);
  const [minRent, setMinRent] = useState<number>();
  const [maxRent, setMaxRent] = useState<number>();
  const requestedDetails = useRef(new Set<number>());
  const [propertySort, setPropertySort] = useState<PropertySort>("default");
  const [radius, setRadius] = useState(0);
  const [radiusCenter, setRadiusCenter] = useState<{
    location: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [radiusCenterError, setRadiusCenterError] = useState<{
    location: string;
    message: string;
  } | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<
    Array<string | number>
  >([]);

  const isRadiusActive = radius > 0;
  const radiusCoordinatesError =
    radiusCenterError?.location === location
      ? radiusCenterError.message
      : null;
  const radiusCoordinatesLoading =
    isRadiusActive &&
    radiusCenter?.location !== location &&
    radiusCoordinatesError === null;

  const updateSelectedAmenities = (next: Array<string | number>) => {
    setSelectedAmenities(next);
    setVisibleCount(PAGE_SIZE);
  };

  const updateRadius = (next: number) => {
    setRadius(next);
    setVisibleCount(PAGE_SIZE);
    setRadiusCenterError(null);
  };

  useEffect(() => {
    if (!isRadiusActive) return;

    if (radiusCenterError?.location === location) return;
    if (radiusCenter?.location === location) return;

    const controller = new AbortController();

    async function loadRadiusCenter() {
      try {
        const coordinates = await getPlaceCoordinates(
          location,
          controller.signal
        );
        if (controller.signal.aborted) return;

        const latitude = parseCoordinate(
          coordinates?.Latitude,
          -90,
          90
        );
        const longitude = parseCoordinate(
          coordinates?.Longitude,
          -180,
          180
        );

        if (latitude === null || longitude === null) {
          setRadiusCenter(null);
          setRadiusCenterError({
            location,
            message: "Could not determine the searched location coordinates.",
          });
          return;
        }

        setRadiusCenter({ location, latitude, longitude });
      } catch (cause: unknown) {
        if (!controller.signal.aborted) {
          setRadiusCenter(null);
          setRadiusCenterError({
            location,
            message:
              cause instanceof Error
                ? cause.message
                : "Unable to determine the searched location coordinates.",
          });
        }
      }
    }

    void loadRadiusCenter();
    return () => controller.abort();
  }, [
    isRadiusActive,
    location,
    radiusCenter?.location,
    radiusCenterError?.location,
  ]);

  useEffect(() => {
  const controller = new AbortController();

  async function loadAmenities() {
    setAmenitiesLoading(true);
    setAmenitiesError(null);

    try {
      const filterMaster = await getFilterMasterDetails(controller.signal);
      const options = (filterMaster.Filter?.Amenities ?? [])
        .filter(
          (amenity) =>
            amenity.Id !== 0 && amenity.Name.trim().toLowerCase() !== "any"
        )
        .map((amenity) => ({
          id: amenity.Id,
          name: amenity.Name,
        }));

      if (!controller.signal.aborted) {
        setAmenityOptions(options);
      }
    } catch (cause: unknown) {
      if (!controller.signal.aborted) {
        setAmenitiesError(
          cause instanceof Error
            ? cause.message
            : "Unable to load amenity options."
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setAmenitiesLoading(false);
      }
    }
  }

  void loadAmenities();
  return () => controller.abort();
}, []);

useEffect(() => {
    const controller = new AbortController();

    async function loadProperties() {
      setIsLoading(true);
      setError(null);
      setProperties([]);
      setVisibleCount(PAGE_SIZE);
      requestedDetails.current.clear();

      try {
        const searchResults = await getPropertySearchDetails(
          location,
          selectedAmenities,
          controller.signal
        );

        if (controller.signal.aborted) return;
        setProperties(searchResults.map(withFallbackDescription));
      } catch (cause: unknown) {
        if (!controller.signal.aborted) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Unable to load properties. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProperties();

    return () => controller.abort();
  }, [location, retryCount, selectedAmenities]);

  useEffect(() => {
    if (isLoading || properties.length === 0) return;

    const controller = new AbortController();
    const requestedDetailsForEffect = requestedDetails.current;
    let completed = false;
    const targets = properties
      .slice(0, visibleCount)
      .map((property, index) => ({ property, index }))
      .filter(({ property, index }) => {
        if (!property.Link || requestedDetailsForEffect.has(index)) return false;
        requestedDetailsForEffect.add(index);
        return true;
      });

    async function enrichVisibleProperties() {
      let nextTarget = 0;
      const updates = new Map<number, PropertyWithDescription>();

      async function worker() {
        while (!controller.signal.aborted && nextTarget < targets.length) {
          const target = targets[nextTarget++];
          const property = target.property;
          const locationLink = property.Link;

          if (!locationLink) continue;

          try {
            const details = await fetchPropertyDetails(
              locationLink,
              controller.signal
            );
            const detailProperty =
              details.Property?.find(
                (item) => item.PropertyID === property.PropertyID
              ) ?? details.Property?.[0];
            const locationHighlights =
              detailProperty?.LocationHighlights ||
              property.LocationHighlights ||
              "";
            const locationDescription =
              detailProperty?.LocationDescription ||
              property.LocationDescription ||
              "";

            updates.set(
              target.index,
              withFallbackDescription({
                ...property,
                LocationHighlights: locationHighlights,
                LocationDescription: locationDescription,
                Highlights:
                  locationHighlights ||
                  locationDescription ||
                  property.Highlights ||
                  property.Description ||
                  "",
              })
            );
          } catch (cause: unknown) {
            if (
              cause instanceof Error &&
              cause.name === "AbortError"
            ) {
              return;
            }

            requestedDetailsForEffect.delete(target.index);
            console.warn(
              `Could not load optional details for ${property.PropertyName || "a property"}; showing search result data.`,
              cause
            );
          }
        }
      }

<<<<<<< HEAD
      await Promise.all(
        Array.from(
          { length: Math.min(3, targets.length) },
          () => worker()
        )
=======
      const detailConcurrency = Math.min(2, Math.max(1, targets.length));

      await Promise.all(
        Array.from({ length: detailConcurrency }, () => worker())
>>>>>>> origin/QA-master
      );

      completed = true;
      if (controller.signal.aborted) return;

      if (updates.size === 0) return;

      setProperties((current) =>
        current.map((property, index) => updates.get(index) ?? property)
      );
    }

    void enrichVisibleProperties();

    return () => {
      controller.abort();
      if (!completed) {
        targets.forEach(({ index }) =>
          requestedDetailsForEffect.delete(index)
        );
      }
    };
  }, [isLoading, properties, visibleCount]);

 const radiusFilteredProperties =
   radius === 0
     ? properties
     : radiusCenter?.location === location
       ? properties.filter((property) => {
           const coordinates = getPropertyCoordinates(property);
           return (
             coordinates !== null &&
             getDistanceInKilometers(radiusCenter, coordinates) <= radius
           );
         })
       : [];

 const filteredProperties = radiusFilteredProperties.filter((property) => {
  if (propertyId !== undefined && property.PropertyID !== propertyId) {
    return false;
  }

  const category = getRoomCategory(property);
  const rent = getRent(property);

  if (
    roomTypes.length > 0 &&
    (!category || !roomTypes.includes(category))
  ) {
    return false;
  }

  if (
    (minRent !== undefined || maxRent !== undefined) &&
    rent === null
  ) {
    return false;
  }

  if (minRent !== undefined && rent !== null && rent < minRent) {
    return false;
  }

  if (maxRent !== undefined && rent !== null && rent > maxRent) {
    return false;
  }

  return true;
});

const sortedProperties = [...filteredProperties].sort((a, b) => {
  const priceA = getRent(a);
  const priceB = getRent(b);

  if (priceA === null && priceB === null) return 0;
  if (priceA === null) return 1;
  if (priceB === null) return -1;

  if (propertySort === "price_desc") return priceB - priceA;
  if (propertySort === "price_asc") return priceA - priceB;

  return 0;
});

const visibleProperties = sortedProperties.slice(0, visibleCount);
  return (
<main className="min-h-screen bg-white px-[33px] pb-10 pt-[30px] max-[768px]:px-4 max-[768px]:pt-5">
{(isLoading || radiusCoordinatesLoading) && <PropertyLoader />}
<div className="w-full">
    {/* Mobile filters and sorting */}
    <div className="mb-5 min-[769px]:hidden">
      <PropertyFilters
        variant="mobile"
        roomTypes={roomTypes}
        minRent={minRent}
        maxRent={maxRent}
        onRoomTypesChange={(next) => {
          setRoomTypes(next);
          setVisibleCount(PAGE_SIZE);
        }}
        onMinRentChange={(next) => {
          setMinRent(next);
          setVisibleCount(PAGE_SIZE);
        }}
        onMaxRentChange={(next) => {
          setMaxRent(next);
          setVisibleCount(PAGE_SIZE);
        }}
        sort={propertySort}
        onSortChange={setPropertySort}
        radius={radius}
        onRadiusChange={updateRadius}
        amenities={amenityOptions}
        amenitiesLoading={amenitiesLoading}
        amenitiesError={amenitiesError}
        selectedAmenities={selectedAmenities}
        onAmenitiesChange={updateSelectedAmenities}
        onClearAll={() => {
          setRoomTypes([]);
          setMinRent(undefined);
          setMaxRent(undefined);
          updateRadius(0);
          setSelectedAmenities([]);
          setPropertySort("default");
          setVisibleCount(PAGE_SIZE);
        }}
        onApplyFilters={() => setVisibleCount(PAGE_SIZE)}
      />
    </div>

    <div className="hidden h-fit w-full grid-cols-1 gap-y-8 rounded-lg bg-white min-[769px]:grid min-[769px]:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] min-[769px]:gap-x-[30px]">
      {/* Desktop filter sidebar */}
      <PropertyFilters
        variant="desktop"
        roomTypes={roomTypes}
        minRent={minRent}
        maxRent={maxRent}
        amenities={amenityOptions}
        onRoomTypesChange={(next) => {
          setRoomTypes(next);
          setVisibleCount(PAGE_SIZE);
        }}
        onMinRentChange={(next) => {
          setMinRent(next);
          setVisibleCount(PAGE_SIZE);
        }}
        onMaxRentChange={(next) => {
          setMaxRent(next);
          setVisibleCount(PAGE_SIZE);
        }}
        sort={propertySort}
        onSortChange={setPropertySort}
        radius={radius}
        onRadiusChange={updateRadius}
        amenitiesLoading={amenitiesLoading}
        amenitiesError={amenitiesError}
        selectedAmenities={selectedAmenities}
        onAmenitiesChange={updateSelectedAmenities}
        onClearAll={() => {
          setRoomTypes([]);
          setMinRent(undefined);
          setMaxRent(undefined);
          updateRadius(0);
          setSelectedAmenities([]);
          setPropertySort("default");
          setVisibleCount(PAGE_SIZE);
        }}
      />

      {/* Existing property results */}
      <div className="min-w-0">
        {isLoading ? (
          <section
            className="grid grid-cols-1 gap-x-[30px] gap-y-8 sm:grid-cols-2"
            aria-label="Loading properties"
            aria-busy="true"
          >
            {Array.from({ length: PAGE_SIZE }, (_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </section>
        ) : error ? (
          <div
            className="rounded-xl border border-red-200 bg-white p-6 text-center"
            role="alert"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              We couldn&apos;t load the properties
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-lg bg-[#2B001F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#450032]"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-[16px] leading-[23px] text-[#111111]">
              {filteredProperties.length} Homes
            </div>

            {radiusCoordinatesError ? (
              <div
                className="rounded-xl border border-red-200 bg-white p-6 text-center"
                role="alert"
              >
                <p className="text-sm text-red-700">
                  {radiusCoordinatesError}
                </p>
              </div>
            ) : visibleProperties.length > 0 ? (
              <>
                <section
                  className="grid grid-cols-1 gap-x-[30px] gap-y-8 sm:grid-cols-2"
                  aria-label="Available properties"
                >
                  {visibleProperties.map((property, index) => (
                    <div
                      key={property.PropertyID ?? property.Link ?? index}
                      className="min-w-0"
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </section>

                {visibleCount < sortedProperties.length && (
                  <div className="mt-10 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((count) =>
                          Math.min(
                            count + PAGE_SIZE,
                            sortedProperties.length
                          )
                        )
                      }
                      className="rounded-lg border border-[#2B001F] px-6 py-3 font-semibold text-[#2B001F] transition hover:bg-[#2B001F] hover:text-white"
                    >
                      Load more properties
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl bg-white px-6 py-12 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  No properties found
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Try changing or clearing the selected filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
</main>
  );
}
