
import "server-only";

import { readApiData } from "@/lib/api/apiClient";

import { COLIVE_ENV, getBaseUrl } from "./apiConfig";
import {
  COLIVE_ENDPOINTS,
  getEndpointPath,
  type ColiveEndpoint,
} from "./coliveEndpoints";

export function fetchColive(
  name: ColiveEndpoint,
  { body, search = "" }: { body?: string; search?: string } = {}
) {
  const endpoint = COLIVE_ENDPOINTS[name];
  const base = getBaseUrl(endpoint.service);
  const url = new URL(getEndpointPath(endpoint, COLIVE_ENV), base);

  url.search = search;

  return fetch(url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...(endpoint.service === "web" && {
        Origin: new URL(base).origin,
      }),
    },
    body: endpoint.method === "POST" ? body : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });
}

export async function colivePost<T>(
  name: ColiveEndpoint,
  payload: object
): Promise<T | null> {
  return readApiData<T>(
    await fetchColive(name, { body: JSON.stringify(payload) }),
    name
  );
}
