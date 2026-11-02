// Browser requests use the same-origin Route Handler, which proxies to Colive.
const PLATFORM_ID = 4;

type ApiResponse<T> = {
  Status?: string;
  Message?: string | null;
  Data?: T | null;
} | null;

async function post<T>(
  path: string,
  body: object,
  signal?: AbortSignal
): Promise<T | null> {
  const res = await fetch(`/api/colive/${encodeURIComponent(path)}`, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T>;
  if (!res.ok) {
    throw new Error(
      `${path} failed (${res.status}): ${json?.Message ?? res.statusText}`
    );
  }
  if (json?.Status?.toLowerCase() !== "success") {
    throw new Error(json?.Message || `${path} returned an unsuccessful response.`);
  }

  return json.Data ?? null;
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

export type PropertySearchResult = {
  PropertyID?: number;
  PropertyName?: string;
  LocationName?: string;
  City?: string;
  Link?: string;
  PropertyLink?: string;
  Description?: string;
  Highlights?: string;
  LocationHighlights?: string;
  LocationDescription?: string;
  Latitude?: number | string;
  Longitude?: number | string;
  Price?: number | string;
  RoomType?: string;
  RoomTypeName?: string;
  RoomSubType?: string;
};

type PropertySearchResponse = {
  Property?: PropertySearchResult[];
};

type FilterMasterResponse = {
  Filter?: {
    Amenities?: { Id: number; Name: string }[];
  };
};

type PropertyDetailsResponse = {
  Property?: PropertySearchResult[];
};

export type ReelsItem = {
  ReelsId?: number;
  FileName?: string;
  Description?: string;
  CategoryId?: number;
  IsPublish?: number;
  Image?: string;
  ReelsFile?: string;
  CategoryName?: string;
  LocationName?: string;
  LocationLink?: string;
};

export type ReelsResponse = {
  ReelsList?: ReelsItem[];
};

export type EventItem = {
  EventId?: number | string;
  EventCode?: string;
  EventName?: string;
  Title?: string;
  Description?: string;
  EventDescription?: string;
  Image?: string;
  EventImage?: string;
  EventDate?: string;
  EventTime?: string;
  Date?: string;
  Time?: string;
  StartDate?: string;
  EndDate?: string;
  Link?: string;
  EventUrl?: string;
  IsCompleted?: boolean | number;
};

export type EventListResponse = {
  EventList?: EventItem[];
  Data?: EventItem[] | { EventList?: EventItem[] };
};

export function getSuggestions(
  searchQuery: string,
  signal?: AbortSignal
): Promise<Suggestions | null> {
  return post<Suggestions>(
    "GetSuggestionsBasedonSearchText",
    {
      PropertyModelTypeId: 1,
      SearchQuery: searchQuery,
      CategoryId: 1,
      PlatFormId: PLATFORM_ID,
      IsGoolgeSuggestions: true,
    },
    signal
  );
}

export async function getPropertySearchDetails(
  searchQuery: string,
  amenityIds: Array<string | number> = [],
  signal?: AbortSignal
): Promise<PropertySearchResult[]> {
  const result = await post<PropertySearchResponse>(
    "GetPropertyDetails_V3_Web",
    {
      SearchQuery: searchQuery,
      CategoryId: 1,
      AmenityIds: amenityIds,
      PlatFormId: PLATFORM_ID,
    },
    signal
  );

  return result?.Property ?? [];
}

export function getFilterMasterDetails(
  signal?: AbortSignal
): Promise<FilterMasterResponse> {
  return post<FilterMasterResponse>(
    "GetFilterMasterDetails",
    { PlatFormId: PLATFORM_ID },
    signal
  ).then((result) => {
    if (!result) throw new Error("GetFilterMasterDetails returned no data.");
    return result;
  });
}

export async function fetchPropertyDetails(
  propertyLink: string,
  signal?: AbortSignal
): Promise<PropertyDetailsResponse> {
  const result = await post<PropertyDetailsResponse>(
    "GetPropertyDetailsByIdForWeb_V2",
    { PropertyLink: propertyLink, PlatFormId: PLATFORM_ID },
    signal
  );
  if (!result) {
    throw new Error("GetPropertyDetailsByIdForWeb_V2 returned no data.");
  }
  return result;
}

export async function getReelsDetails(
  categoryId: number = 0,
  signal?: AbortSignal
): Promise<ReelsItem[]> {
  const result = await post<ReelsResponse>(
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
  const result = await post<EventListResponse>(
    "GetEvents",
    {
      EventCode: eventCode,
      PlatFormId: PLATFORM_ID,
    },
    signal
  );

  if (!result) return [];

  const list = result.EventList ??
    (Array.isArray(result.Data) ? result.Data : result.Data?.EventList) ??
    [];

  return Array.isArray(list) ? list : [];
}

type PlaceDetails = {
  Types: string[];
  Coordinates: { Latitude: number; Longitude: number };
};

export function getPlaceDetails(description: string, signal?: AbortSignal) {
  return post<PlaceDetails>("GetDetailsByPlaceId", {
    Description: description,
    PlatFormId: PLATFORM_ID,
  }, signal);
}

export async function getPlaceCoordinates(
  description: string,
  signal?: AbortSignal
): Promise<PlaceDetails["Coordinates"] | null> {
  const details = await getPlaceDetails(description, signal);
  return details?.Coordinates ?? null;
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
