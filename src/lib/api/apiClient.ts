
import type { ColiveEndpoint } from "@/lib/server/coliveEndpoints";

type ApiEnvelope<T> = {
  Status?: string;
  Message?: string;
  Data?: T | null;
};

export type RequestOptions = {
  signal?: AbortSignal;
  unwrapData?: boolean;
  allowNull?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Used by browser and server-side API clients.
export async function readApiData<T>(
  response: Response,
  endpoint: string
): Promise<T | null> {
  const responseText = await response.text();

  let json: unknown;

  try {
    json = responseText ? JSON.parse(responseText) : null;
  } catch {
    throw new Error(`${endpoint} returned invalid JSON (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    const message = isRecord(json) ? json.Message : undefined;
    throw new Error(
      (typeof message === "string" && message) ||
        `${endpoint} failed with HTTP ${response.status}.`
    );
  }

  if (json === null) return null;

  const envelope = isRecord(json) ? json : undefined;

  if (
    typeof envelope?.Status === "string" &&
    !["success", "ok"].includes(envelope.Status.toLowerCase())
  ) {
    return null;
  }

  if (envelope && "Data" in envelope) {
    return (envelope.Data ?? null) as T | null;
  }

  return json as T;
}

async function request<T>(
  endpoint: ColiveEndpoint,
  method: "GET" | "POST",
  options: RequestOptions = {},
  payload?: object
): Promise<T | null> {
  const query = new URLSearchParams();

  if (method === "GET" && options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined) query.set(key, String(value));
    }
  }

  const queryString = query.toString();
  const path = `/api/colive/${encodeURIComponent(endpoint)}`;

  const response = await fetch(
    `${path}${queryString ? `?${queryString}` : ""}`,
    {
      method,
      headers:
        method === "POST"
          ? {
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json",
            }
          : { Accept: "application/json" },
      body: method === "POST" ? JSON.stringify(payload ?? {}) : undefined,
      signal: options.signal,
      cache: "no-store",
    }
  );

  const result = await readApiData<T>(response, endpoint);

  if (result === null && !options.allowNull) {
    throw new Error(`${endpoint} returned no data.`);
  }

  return result;
}

// Supports both Dev-Hari's signal argument and the existing options argument.
export function apiGet<T>(
  endpoint: ColiveEndpoint,
  optionsOrParams: RequestOptions | Record<string, string> = {},
  signal?: AbortSignal
): Promise<T | null> {
  const options: RequestOptions =
    signal || "signal" in optionsOrParams || "query" in optionsOrParams
      ? { ...(optionsOrParams as RequestOptions), signal }
      : { query: optionsOrParams as Record<string, string> };

  return request<T>(endpoint, "GET", options);
}

export function apiPost<T>(
  endpoint: ColiveEndpoint,
  payload: object = {},
  optionsOrSignal: RequestOptions | AbortSignal = {}
): Promise<T | null> {
  const options: RequestOptions =
    typeof AbortSignal !== "undefined" &&
    optionsOrSignal instanceof AbortSignal
      ? { signal: optionsOrSignal }
      : (optionsOrSignal as RequestOptions);

  return request<T>(endpoint, "POST", options, payload);
}
