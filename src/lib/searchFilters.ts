// Search filter definitions and their URL encoding, shared by the server page and the client sidebar.
// Query keys follow colive.com: ?sharingtype=solo,couple&pricerange=7000,15000&amenities=ac,wi-fi
import type { PropertySummary } from "./propertySearch";

export const ROOM_TYPES = [
  { slug: "solo", label: "Solo", ids: "1" },
  { slug: "couple", label: "Couple", ids: "11" },
  { slug: "shared", label: "Shared", ids: "2,3,4,8,9" },
];

export const PRICE_RANGE = { min: 7000, max: 30000, step: 500 };

export const RADIUS_OPTIONS = [5, 10, 25];

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
];

export type SearchFilters = {
  sharingTypes: string[];
  amenities: string[];
  price: [number, number] | null;
  radius: number;
};

type ParamReader = { get(name: string): string | null };

const readList = (params: ParamReader, key: string) =>
  (params.get(key) ?? "").toLowerCase().split(",").map((value) => value.trim()).filter(Boolean);

export function parseFilters(params: ParamReader): SearchFilters {
  const [min, max] = (params.get("pricerange") ?? "").split(",").map(Number);
  const hasPrice = Number.isFinite(min) && Number.isFinite(max) && min > 0 && max >= min;
  const radius = Number(params.get("radius"));

  return {
    sharingTypes: readList(params, "sharingtype").filter((slug) => ROOM_TYPES.some((type) => type.slug === slug)),
    amenities: readList(params, "amenities"),
    // A full-width slider is the same as no rent filter
    price: hasPrice && (min > PRICE_RANGE.min || max < PRICE_RANGE.max) ? [min, max] : null,
    radius: RADIUS_OPTIONS.includes(radius) ? radius : 0,
  };
}

// Writes the filters into a copy of `params`, keeping unrelated keys (loc, lat, q, sort...).
export function withFilters(params: URLSearchParams, filters: SearchFilters) {
  const next = new URLSearchParams(params);
  const set = (key: string, value: string) => (value ? next.set(key, value) : next.delete(key));

  set("sharingtype", filters.sharingTypes.join(","));
  set("pricerange", filters.price ? filters.price.join(",") : "");
  set("radius", filters.radius ? String(filters.radius) : "");
  set("amenities", filters.amenities.join(","));
  return next;
}

export const toSearchParams = (record: Record<string, string | string[] | undefined>) =>
  new URLSearchParams(
    Object.entries(record).flatMap(([key, value]) => (value === undefined ? [] : [[key, [value].flat()[0]]])),
  );

export const toSlug = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "-");

// The price a card shows: the discounted price when there is one
export const displayPrice = (property: PropertySummary) => property.discountedPrice || property.price;

export const formatRupees =(value: number) => `₹${value.toLocaleString("en-IN")}`;

const toPathSegment = (value: string) => value.trim().replace(/\//g, "").replace(/\s+/g, "-");

// Mirrors GetPropertyCard on colive.com: /search links to /property/<link>, city pages to
// /<city>/pg-in-<locality>/<property-name>/<link>.
export function propertyHref(property: PropertySummary, pathname: string) {
  if (pathname === "/search") return `/property/${property.link}`.toLowerCase();

  const city = pathname.split("/")[1].replace(/^(wo)?men-/, "").replace(/^pg-in-/, "");
  const path = [city, `pg-in-${toPathSegment(property.locationName)}`, toPathSegment(property.name), property.link];
  return `/${path.join("/")}`.toLowerCase();
}
