// Registry of every Colive backend endpoint the app may call. The /api/colive/[api] route only forwards names listed here.
// To add an API: add an entry, then a typed function in coliveApi.ts (browser) or a server lib.
import "server-only";

import type { ColiveEnv, ColiveService } from "./apiConfig";

type Endpoint = {
  method: "GET" | "POST";
  service: ColiveService;
  // One path for both environments, or one per environment when QA and LIVE differ
  path: string | Record<ColiveEnv, string>;
};

export const COLIVE_ENDPOINTS = {
  // Search results
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
     path: "CRMapi/PropertyCRM/GetFilterMasterDetails" },
  // Factsheet (property page) and the location highlights on search cards
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
  GetScheduleVisitDays: { method: "POST", service: "crm", path: "CRMapi/PropertyCRM/GetScheduleVisitDays" },
  // Home page place search
  GetSuggestionsBasedonSearch: { method: "POST", service: "crm", path: "CRMapi/PropertyCRM/GetSuggestionsBasedonSearch" },
  GetLocationDetailsByPlaceId: { method: "POST", service: "crm", path: "CRMapi/PropertyCRM/GetLocationDetailsByPlaceId" },
} satisfies Record<string, Endpoint>;

export type ColiveEndpoint = keyof typeof COLIVE_ENDPOINTS;

export const isColiveEndpoint = (name: string): name is ColiveEndpoint => Object.hasOwn(COLIVE_ENDPOINTS, name);

export const getEndpointPath = (endpoint: Endpoint, env: ColiveEnv) =>
  typeof endpoint.path === "string" ? endpoint.path : endpoint.path[env];
