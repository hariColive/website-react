// Browser client for the Colive backend, through the /api/colive/[api] proxy route
// (the backend's CORS response sends a duplicate Access-Control-Allow-Origin, which browsers reject).
import type { FormEndpoint } from "@/lib/forms/formTypes";
import type { ColiveEndpoint } from "@/lib/server/coliveEndpoints";

export type ApiResponse<T> = { Status: string; Message: string; Data: T } | null;

// Unwraps the backend's { Status, Message, Data } envelope: Data on success, null otherwise.
export async function readApiData<T>(res: Response, endpoint: string): Promise<T | null> {
  if (!res.ok) throw new Error(`${endpoint} failed: ${res.status} (${res.url})`);

  const json = (await res.json()) as ApiResponse<T>;
  return json?.Status === "success" ? json.Data : null;
}

export async function apiGet<T>(endpoint: ColiveEndpoint, params?: Record<string, string>, signal?: AbortSignal) {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return readApiData<T>(await fetch(`/api/colive/${endpoint}${query}`, { signal }), endpoint);
}

export async function apiPost<T>(endpoint: ColiveEndpoint, payload: object = {}, signal?: AbortSignal) {
  const res = await fetch(`/api/colive/${endpoint}`, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return readApiData<T>(res, endpoint);
}

// Posts a form through /api/forms/[endpoint]. The route answers { success, message } JSON for both success and
// failure (including 4xx/5xx), so the body is returned as-is rather than thrown on a non-2xx status.
export async function apiPostForm<T>(endpoint: FormEndpoint, payload: Record<string, string>, signal?: AbortSignal) {
  const res = await fetch(`/api/forms/${endpoint}`, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return (await res.json()) as T;
}
