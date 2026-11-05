// Calls registered endpoints on the active (QA/LIVE) backend. Used by the /api/colive/[api] proxy and by
// server code (search, factsheet), which calls the backend directly rather than through its own HTTP route.
import "server-only";

import { readApiData } from "@/lib/api/apiClient";

import { COLIVE_ENV, getBaseUrl } from "./apiConfig";
import { COLIVE_ENDPOINTS, getEndpointPath, type ColiveEndpoint } from "./coliveEndpoints";

type BackendEndpoint = {
  method: "GET" | "POST";
  service: "crm";
  path: string;
  url?: string;
};

export function fetchBackend(
  endpoint: BackendEndpoint,
  { body, search = "" }: { body?: string; search?: string } = {},
) {
  const url = endpoint.url
    ? new URL(endpoint.url)
    : new URL(endpoint.path, getBaseUrl(endpoint.service));
  url.search = search;

  return fetch(url, {
    method: endpoint.method,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: endpoint.method === "POST" ? body : undefined,
  });
}

export function fetchColive(name: ColiveEndpoint, { body, search = "" }: { body?: string; search?: string } = {}) {
  const endpoint = COLIVE_ENDPOINTS[name];
  return fetchBackend(
    { ...endpoint, path: getEndpointPath(endpoint, COLIVE_ENV) },
    { body, search },
  );
}

export async function colivePost<T>(name: ColiveEndpoint, payload: object): Promise<T | null> {
  return readApiData<T>(await fetchColive(name, { body: JSON.stringify(payload) }), name);
}
