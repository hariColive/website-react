// Typed Colive API functions for client components, called through apiClient and the /api/colive/[api] route.
import { apiPost } from "./api/apiClient";

const PLATFORM_ID = 4;

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
  return apiPost<Suggestions>("GetSuggestionsBasedonSearch", {
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
  return apiPost<PlaceDetails>("GetLocationDetailsByPlaceId", {
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
