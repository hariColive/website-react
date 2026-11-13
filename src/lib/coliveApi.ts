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

export type ReelsItem = {
  ReelsId?: string | number;
  LocationLink?: string | null;
  Image?: string | null;
  ReelsFile?: string | null;
  FileName?: string | null;
  LocationName?: string | null;
};

type ReelsResponse = {
  ReelsList?: ReelsItem[] | null;
};

export type EventItem = {
  EventId?: string | number;
  EventCode?: string | null;
  Title?: string | null;
  EventName?: string | null;
  Description?: string | null;
  EventDescription?: string | null;
  Image?: string | null;
  EventImage?: string | null;
  EventDate?: string | null;
  Date?: string | null;
  StartDate?: string | null;
  EventTime?: string | null;
  Time?: string | null;
  Link?: string | null;
  EventUrl?: string | null;
};

type EventListResponse = {
  EventList?: EventItem[] | null;
  Data?: EventItem[] | { EventList?: EventItem[] | null } | null;
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

export async function getReelsDetails(
  categoryId: number = 0,
  signal?: AbortSignal
): Promise<ReelsItem[]> {
  const result = await apiPost<ReelsResponse>(
    "GetReelsDetails",
    {
      CategoryId: categoryId,
      PlatFormId: PLATFORM_ID,
    },
    signal
  );

  return result?.ReelsList ?? [];
}

export async function getEventsDetails(
  eventCode: string = "",
  signal?: AbortSignal
): Promise<EventItem[]> {
  const result = await apiPost<EventListResponse>(
    "GetEvents",
    {
      EventCode: eventCode,
      PlatFormId: PLATFORM_ID,
    },
    signal
  );

  if (!result) return [];

  const list =
    result.EventList ??
    (Array.isArray(result.Data) ? result.Data : result.Data?.EventList) ??
    [];

  return Array.isArray(list) ? list : [];
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
