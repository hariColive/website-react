import { apiPost } from "@/lib/api/apiClient";
import type { Property } from "@/components/common/searchsection/SearchPropertyCard";

export type Amenity = {
  Id: number;
  Name: string;
  IsEnabled: boolean;
  IsChecked: boolean;
};

export type FilterMasterDetails = {
  Filter?: {
    Amenities?: Amenity[];
  };
};

export type GoogleSuggestion = {
  PlaceId: string;
  Description: string;
  DisplayDetails: Array<{
    Description: string;
    SubDescription: string;
  }>;
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

export type PropertyDetailsData = {
  Property?: Array<{
    PropertyID?: number;
    PropertyName?: string;
    LocationHighlights?: string;
    LocationDescription?: string;
    Link?: string;
  }>;
};

type SearchResponse = {
  Property?: Property[];
  Properties?: Property[];
  SimilarProperties?: Property[];
  TrendingProperties?: Property[];
  Data?: {
    Property?: Property[];
    SimilarProperties?: Property[];
    TrendingProperties?: Property[];
  } | Property[];
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

const PLATFORM_ID = 4;

export function getSuggestions(
  searchQuery: string,
  signal?: AbortSignal
): Promise<Suggestions | null> {
  return apiPost<Suggestions | null>(
    "GetSuggestionsBasedonSearchText",
    {
      PropertyModelTypeId: 1,
      SearchQuery: searchQuery,
      CategoryId: 1,
      PlatFormId: PLATFORM_ID,
      IsGoolgeSuggestions: true,
    },
    { signal, unwrapData: true, allowNull: true }
  );
}

type PlaceDetails = {
  Types: string[];
  Coordinates: {
    Latitude: number;
    Longitude: number;
  };
};

export async function getPlaceDetails(
  description: string,
  signal?: AbortSignal
): Promise<PlaceDetails | null> {
  return apiPost<PlaceDetails | null>(
    "GetDetailsByPlaceId",
    {
      Description: description,
      PlatFormId: PLATFORM_ID,
    },
    { signal, unwrapData: true, allowNull: true }
  );
}

export async function getPlaceCoordinates(
  description: string,
  signal?: AbortSignal
): Promise<PlaceDetails["Coordinates"] | null> {
  const details = await getPlaceDetails(description, signal);
  return details?.Coordinates ?? null;
}

const CITIES = [
  "Bengaluru",
  "Bangalore",
  "Chennai",
  "Vellore",
  "Coimbatore",
  "Hyderabad",
  "Pune",
];

export async function getPlaceSearchUrl(
  description: string
): Promise<string | null> {
  const details = await getPlaceDetails(description);
  if (!details) return null;

  const radius =
    details.Types.length > 1
      ? ({ locality: 1, sublocality_level_1: 2 } as Record<string, number>)[
          details.Types[0]
        ] ?? 0
      : 0;
  const location = description === "Bengaluru" ? "Bangalore" : description;
  const query = `lat=${details.Coordinates.Latitude}&long=${details.Coordinates.Longitude}&rad=${radius}&loc=${location
    .split(" ")
    .join("-")}`;

  return CITIES.includes(location) ? `/${location}?${query}` : `/search?${query}`;
}

function getColiveDate(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return `${day}-${months[now.getMonth()]}-${now.getFullYear()}`;
}

export async function getPropertySearchDetails(
  locationLink: string,
  amenityIds: Array<string | number> = [],
  signal?: AbortSignal
): Promise<Property[]> {
  const payload = {
    Date: getColiveDate(),
    LocationName: locationLink,
    AmenityIds: amenityIds.join(","),
    OfferId: 0,
    RoomTypeIds: "",
    PropertyVariantsIds: "",
    PropertyModelTypes: "1",
    RoomSubTypeIds: "",
    RoomClassIds: "",
    FurnishStatusIds: "",
    Latitude: "",
    Longitude: "",
    Distance: 0,
    RoomShareCategory: "",
    MinValue: 0,
    MaxValue: 0,
    PageSize: 200,
    PageIndex: 0,
    CustomerID: "",
  };

  const result = await apiPost<SearchResponse | Property[]>(
    "GetPropertyDetails_V3_Web",
    payload,
    { signal, unwrapData: true }
  );
  const wrapped = result as SearchResponse;
  const data = wrapped.Data;

  const mainProperties: Property[] = Array.isArray(result)
    ? result
    : Array.isArray(wrapped.Property)
      ? wrapped.Property
      : Array.isArray(wrapped.Properties)
        ? wrapped.Properties
        : Array.isArray(data)
          ? data
          : data?.Property ?? [];

  return mainProperties;
}

export async function getFilterMasterDetails(
  signal?: AbortSignal
): Promise<FilterMasterDetails> {
  return apiPost<FilterMasterDetails>(
    "GetFilterMasterDetails",
    {
      PlatFormId: PLATFORM_ID,
      PropertyModelTypeId: 1,
    },
    { signal, unwrapData: true }
  );
}

export async function fetchPropertyDetails(
  locationLink: string,
  signal?: AbortSignal
): Promise<PropertyDetailsData> {
  const result = await apiPost<unknown>(
    "GetPropertyDetailsByIdForWeb_V2",
    {
      LocationLink: locationLink,
      CustomerID: "",
    },
    { signal, unwrapData: true }
  );

  if (!result || typeof result !== "object") {
    throw new Error("The property details response is empty.");
  }

  const wrapped = result as {
    Property?: PropertyDetailsData["Property"];
    Data?: PropertyDetailsData;
  };

  if (Array.isArray(wrapped.Property)) {
    return { Property: wrapped.Property };
  }

  if (wrapped.Data?.Property) {
    return wrapped.Data;
  }

  return result as PropertyDetailsData;
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
    { signal, unwrapData: true }
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
    { signal, unwrapData: true }
  );

  if (!result) return [];

  const list =
    result.EventList ??
    (Array.isArray(result.Data) ? result.Data : result.Data?.EventList) ??
    [];

  return Array.isArray(list) ? list : [];
}
