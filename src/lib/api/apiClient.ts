// Browser client for the Colive backend, through the /api/colive/[api] proxy route
// (the backend's CORS response sends a duplicate Access-Control-Allow-Origin, which browsers reject).
import type { ColiveEndpoint } from "@/lib/server/coliveEndpoints";
import type { FormEndpoint } from "@/lib/forms/formTypes";

export type ApiResponse<T> = { Status: string; Message: string; Data: T } | null;

export async function readApiResponse<T>(res: Response, endpoint: string): Promise<T> {
  if (!res.ok) throw new Error(`${endpoint} failed: ${res.status} (${res.url})`);
  return (await res.json()) as T;
}

// Unwraps the backend's { Status, Message, Data } envelope: Data on success, null otherwise.
export async function readApiData<T>(res: Response, endpoint: string): Promise<T | null> {
  const json = await readApiResponse<ApiResponse<T>>(res, endpoint);
  return json?.Status === "success" ? json.Data : null;
}

async function postJson(url: string, payload: object, signal?: AbortSignal) {
  return fetch(url, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
}

export async function apiGet<T>(endpoint: ColiveEndpoint, params?: Record<string, string>, signal?: AbortSignal) {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return readApiData<T>(await fetch(`/api/colive/${endpoint}${query}`, { signal }), endpoint);
}

export async function apiPost<T>(endpoint: ColiveEndpoint, payload: object = {}, signal?: AbortSignal) {
  const res = await postJson(`/api/colive/${endpoint}`, payload, signal);
  return readApiData<T>(res, endpoint);
}

// Posts a form through /api/forms/[endpoint]. The route answers { success, message } JSON for both success and
// failure (including 4xx/5xx), so the body is returned as-is rather than thrown on a non-2xx status.
export async function apiPostForm<T>(endpoint: FormEndpoint, payload: object, signal?: AbortSignal) {
  const url = endpoint === "ContactUsInsert" ? "/api/contact" : `/api/forms/${endpoint}`;
  const res = await fetch(url, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return (await res.json()) as T;
}
