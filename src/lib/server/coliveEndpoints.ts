export type ColiveEndpointDefinition = {
  path: string;
  service: "crm" | "web";
  methods: readonly ("GET" | "POST")[];
};

export const COLIVE_ENDPOINTS = {
  GetFilterMasterDetails: {
    path: "/web/live/CRMapi/PropertyCRM/GetFilterMasterDetails",
    service: "crm",
    methods: ["POST"],
  },
  GetPropertyDetails_V3_Web: {
    path: "/web/live/CRMapi/PropertyCRM/GetPropertyDetails_V3_Web",
    service: "crm",
    methods: ["POST"],
  },
  GetPropertyDetailsByIdForWeb_V2: {
    path: "/web/live/CRMapi/PropertyCRM/GetPropertyDetailsByIdForWeb_V2",
    service: "crm",
    methods: ["POST"],
  },
  GetSuggestionsBasedonSearchText: {
    path: "/web/live/CRMapi/PropertyCRM/GetSuggestionsBasedonSearch",
    service: "crm",
    methods: ["POST"],
  },
  GetReelsDetails: {
    path: "/web/live/CRMapi/PropertyCRM/GetReelsDetails",
    service: "crm",
    methods: ["POST"],
  },
  GetEvents: {
    path: "/web/live/CRMapi/PropertyCRM/EventListSelectAllAndById",
    service: "crm",
    methods: ["POST"],
  },
  GetDetailsByPlaceId: {
    path: "/api/Colive/GetDetailsByPlaceId",
    service: "web",
    methods: ["POST"],
  },
} as const satisfies Record<string, ColiveEndpointDefinition>;

export type ColiveEndpointName = keyof typeof COLIVE_ENDPOINTS;

export function isColiveEndpointName(
  name: string
): name is ColiveEndpointName {
  return Object.prototype.hasOwnProperty.call(COLIVE_ENDPOINTS, name);
}
