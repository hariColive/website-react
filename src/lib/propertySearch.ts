// Server-side client for the Colive CRM property API. Results are cached per search with `use cache`,
// so the same city/filter combination isn't refetched on every request.
import { cacheLife } from "next/cache";

import { displayPrice, toSlug } from "./searchFilters";

const API_BASE = process.env.COLIVE_CRM_API_BASE ?? "https://api.colive.com/web/live/CRMapi/PropertyCRM";

type ApiResponse<T> = { Status: string; Message: string; Data: T } | null;

export async function post<T>(path: string, body: object): Promise<T | null> {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);

  const json = (await res.json()) as ApiResponse<T>;
  return json?.Status === "success" ? json.Data : null;
}

type ApiProperty = {
  PropertyID: number;
  PropertyName: string;
  LocationName: string;
  City: string;
  Link: string;
  Price: number;
  DiscountedPrice: number;
  ImageName: string;
  TileImageName: string;
  TrendingTagDisplay: boolean;
  TrendingTagName: string;
  PropertyVariantsTypeId: number;
  PropertyVariantTagName: string;
};

type ApiFilterOption = { Id: number; Name: string };

type ApiLocation = { ParentMenuId: number; Menu: string; IsMenuEnabled: boolean };

// Only the fields the search cards need, so the client payload stays small.
export type PropertySummary = {
  id: number;
  name: string;
  link: string;
  locationName: string;
  city: string;
  price: number;
  discountedPrice: number;
  image: string;
  trendingTag: string;
  variantTag: string;
};

export type CityOption = { name: string; slug: string };

export type FilterMaster = { amenities: ApiFilterOption[]; cities: CityOption[] };

export type SearchQuery = {
  location: string;
  latitude?: string;
  longitude?: string;
  distance?: string;
  roomTypeIds?: string;
  amenityIds?: string;
  minPrice?: number;
  maxPrice?: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// The API expects dates like "29-Oct-2026" (formatDate on colive.com).
export const formatApiDate =(date: Date) => `${date.getDate()}-${MONTHS[date.getMonth()]}-${date.getFullYear()}`;

const toRequest = (query: SearchQuery) => ({
  Date: formatApiDate(new Date()),
  LocationName: query.location,
  OfferId: 0,
  RoomTypeIds: query.roomTypeIds ?? "",
  PropertyVariantsIds: "",
  PropertyModelTypes: "1",
  RoomSubTypeIds: "",
  RoomClassIds: "",
  FurnishStatusIds: "",
  AmenityIds: query.amenityIds ?? "",
  Latitude: query.latitude ?? "",
  Longitude: query.longitude ?? "",
  Distance: query.distance ?? "",
  RoomShareCategory: "",
  MinValue: query.minPrice?.toString() ?? "",
  MaxValue: query.maxPrice?.toString() ?? "",
  CustomerID: "",
});

const toSummary = (property: ApiProperty): PropertySummary => ({
  id: property.PropertyID,
  name: property.PropertyName.trim(),
  link: property.Link,
  locationName: property.LocationName.trim(),
  city: property.City.trim(),
  price: property.Price,
  discountedPrice: property.DiscountedPrice,
  image: property.ImageName || property.TileImageName,
  trendingTag: property.TrendingTagDisplay ? property.TrendingTagName : "",
  variantTag: property.PropertyVariantTagName.trim(),
});

export async function searchProperties(query: SearchQuery) {
  "use cache";
  cacheLife("minutes");

  const data = await post<{ Property: ApiProperty[]; SimilarProperties: ApiProperty[] }>(
    "GetPropertyDetails_V3_Web",
    toRequest(query),
  );
  const properties = (data?.Property ?? []).map(toSummary);
  const { minPrice, maxPrice } = query;

  return {
    // The API doesn't reliably honour MinValue/MaxValue against the card price, so enforce it here (as colive.com does).
    properties:
      minPrice === undefined || maxPrice === undefined
        ? properties
        : properties.filter((property) => displayPrice(property) >= minPrice && displayPrice(property) <= maxPrice),
    similar: (data?.SimilarProperties ?? []).map(toSummary),
  };
}

const ENTITIES: Record<string, string> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", rsquo: "’", lsquo: "‘", ndash: "–", mdash: "—" };

// LocationHighlights is CMS rich text (often pasted from Word, with inline styles); the cards only need the words.
export const htmlToText = (html: string) =>
  html
    // Inline tags join their text (EMC<sup>2</sup> -> EMC2); block tags separate words
    .replace(/<\/?(span|sup|sub|b|strong|i|em|u|a|font)\b[^>]*>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (entity, code: string) => {
      if (code[0] !== "#") return ENTITIES[code.toLowerCase()] ?? entity;
      return String.fromCodePoint(code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : Number(code.slice(1)));
    })
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

export async function getLocationHighlights(link: string) {
  "use cache";
  cacheLife("days");

  const data = await post<{ Property: { LocationHighlights: string | null }[] }>("GetPropertyDetailsByIdForWeb_V2", {
    LocationLink: link,
    CustomerID: "",
  });
  return htmlToText(data?.Property[0]?.LocationHighlights ?? "");
}

export async function getFilterMaster(): Promise<FilterMaster> {
  "use cache";
  cacheLife("hours");

  const data = await post<{ Filter: { Amenities: ApiFilterOption[]; Locations: ApiLocation[] } }>(
    "GetFilterMasterDetails",
    toRequest({ location: "" }),
  );
  if (!data) throw new Error("GetFilterMasterDetails returned no data");

  return {
    // Id 0 is the API's "Any" sentinel; the sidebar renders its own.
    amenities: data.Filter.Amenities.filter((amenity) => amenity.Id !== 0),
    cities: data.Filter.Locations.filter((city) => city.ParentMenuId === 0 && city.IsMenuEnabled).map((city) => ({
      name: city.Menu,
      slug: toSlug(city.Menu),
    })),
  };
}
