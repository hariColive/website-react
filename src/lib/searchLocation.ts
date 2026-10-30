// Maps the colive.com search URLs onto the API's LocationName:
//   /pg-in-bangalore, /men-pg-in-bangalore, /bangalore, /Bangalore?lat=..   -> the path itself
//   /bangalore/pg-in-whitefield, /bangalore/central/pg-in-koramangala       -> the path itself
//   /search?loc=Whitefield, Bangalore&lat=..&long=..&rad=..                 -> "Whitefield"
import { getFilterMaster, type SearchQuery } from "./propertySearch";

export type SearchLocation = {
  apiLocation: string;
  // Human-readable place, e.g. "Koramangala, Bangalore"
  label: string;
};

const SEGMENT = /^[a-z0-9-]+$/i;
const MAX_SEGMENTS = 3;

const titleCase = (value: string) =>
  value.replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (char) => char.toUpperCase());

// Returns null for paths that aren't city search pages, so the route can 404 them.
export async function locationFromPath(segments: string[]): Promise<SearchLocation | null> {
  const parts = segments.map(decodeURIComponent);
  if (parts.length > MAX_SEGMENTS || !parts.every((part) => SEGMENT.test(part))) return null;

  const citySlug = parts[0].toLowerCase().replace(/^((wo)?men-)?pg-in-/, "");
  const { cities } = await getFilterMaster();
  const city = cities.find((option) => option.slug === citySlug);
  if (!city) return null;

  const locality = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  if (locality && !locality.startsWith("pg-in-")) return null;

  return {
    apiLocation: parts.join("/"),
    label: locality ? `${titleCase(locality.slice("pg-in-".length))}, ${city.name}` : city.name,
  };
}

type ParamReader = { get(name: string): string | null };

export function locationFromQuery(params: ParamReader): SearchLocation | null {
  const loc = params.get("loc")?.trim();
  if (!loc) return null;

  return { apiLocation: loc.split(",")[0].trim().replace(/-/g, " "), label: titleCase(loc) };
}

// lat/long/rad come from the home page place search and apply to every search route.
export const coordinatesFromQuery = (params: ParamReader): Pick<SearchQuery, "latitude" | "longitude" | "distance"> => ({
  latitude: params.get("lat") ?? undefined,
  longitude: params.get("long") ?? undefined,
  distance: params.get("rad") ?? undefined,
});
