// Client for the Colive backend, reached through the /api/Colive rewrite in next.config.ts.
const PLATFORM_ID = 4;

type ApiResponse<T> = { Status: string; Message: string; Data: T } | null;

async function post<T>(path: string, body: object, signal?: AbortSignal): Promise<T | null> {
  const res = await fetch(`/api/Colive/${path}`, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);

  const json = (await res.json()) as ApiResponse<T>;
  return json?.Status === "success" ? json.Data : null;
}

export type GoogleSuggestion = {
  PlaceId: string;
  Description: string;
  DisplayDetails: { Description: string; SubDescription: string }[];
};

export type PropertySuggestion = {
  LocationName: string;
  Cluster: string;
  PropertyLink: string;
};

export type Suggestions = {
  GoogleSuggestions: GoogleSuggestion[];
  PropertySuggestions: PropertySuggestion[];
};

export function getSuggestions(searchQuery: string, signal?: AbortSignal) {
  return post<Suggestions>("GetSuggestionsBasedonSearchText", {
    PropertyModelTypeId: 1,
    SearchQuery: searchQuery,
    CategoryId: 1,
    PlatFormId: PLATFORM_ID,
    IsGoolgeSuggestions: true,
  }, signal);
}

type PlaceDetails = {
  Types: string[];
  Coordinates: { Latitude: number; Longitude: number };
};

export function getPlaceDetails(description: string) {
  return post<PlaceDetails>("GetDetailsByPlaceId", {
    Description: description,
    PlatFormId: PLATFORM_ID,
  });
}

const CITIES = ["Bengaluru", "Bangalore", "Chennai", "Vellore", "Coimbatore", "Hyderabad", "Pune"];

// Mirrors RedirectToSearch on colive.com: city pages for known cities, /search otherwise.
export async function getPlaceSearchUrl(description: string) {
  const details = await getPlaceDetails(description);
  if (!details) return null;

  const { Types, Coordinates } = details;
  const radius =
    Types.length > 1 ? ({ locality: 1, sublocality_level_1: 2 } as Record<string, number>)[Types[0]] ?? 0 : 0;
  const location = description === "Bengaluru" ? "Bangalore" : description;
  const query = `lat=${Coordinates.Latitude}&long=${Coordinates.Longitude}&rad=${radius}&loc=${location.split(" ").join("-")}`;

  return CITIES.includes(location) ? `/${location}?${query}` : `/search?${query}`;
}
