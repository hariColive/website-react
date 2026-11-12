
import "server-only";

import type { ColiveEnv, ColiveService } from "./apiConfig";

type Endpoint = {
  method: "GET" | "POST";
  service: ColiveService;
  path: string | Record<ColiveEnv, string>;
};

export const COLIVE_ENDPOINTS = {
  // Property search
  GetPropertyDetails: {
    method: "POST",
    service: "crm",
    path: {
      QA: "CRMapi/PropertyCRM/GetPropertyDetailsV3Web",
      LIVE: "CRMapi/PropertyCRM/GetPropertyDetails_V3_Web",
    },
  },

  GetFilterMasterDetails: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/GetFilterMasterDetails",
  },

  // Property factsheet
  GetPropertyDetailsByIdForWeb_V2: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/GetPropertyDetailsByIdForWeb_V2",
  },

  GetAvailableOccupancyTypeByPropertyId_Factsheet: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/GetAvailableOccupancyTypeByPropertyId_Factsheet",
  },

  GetScheduleVisitDays: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/GetScheduleVisitDays",
  },

  // Location suggestions
  GetSuggestionsBasedonSearchText: {
    method: "POST",
    service: "web",
    path: "api/Colive/GetSuggestionsBasedonSearchText",
  },

  GetDetailsByPlaceId: {
    method: "POST",
    service: "web",
    path: "api/Colive/GetDetailsByPlaceId",
  },

  // Community
  GetReelsDetails: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/GetReelsDetails",
  },

  GetEvents: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/EventListSelectAllAndById",
  },
} satisfies Record<string, Endpoint>;

export type ColiveEndpoint = keyof typeof COLIVE_ENDPOINTS;

export const isColiveEndpoint = (
  name: string
): name is ColiveEndpoint => Object.hasOwn(COLIVE_ENDPOINTS, name);

export const getEndpointPath = (
  endpoint: Endpoint,
  env: ColiveEnv
) => (typeof endpoint.path === "string" ? endpoint.path : endpoint.path[env]);
