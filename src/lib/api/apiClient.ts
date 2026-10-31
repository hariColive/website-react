type ApiEnvelope<T> = {
  Status?: string;
  Message?: string;
  Data?: T | null;
};

type RequestOptions = {
  signal?: AbortSignal;
  unwrapData?: boolean;
  allowNull?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function request<T>(
  endpoint: string,
  method: "GET" | "POST",
  options: RequestOptions = {},
  payload?: Record<string, unknown>
): Promise<T> {
  const query = new URLSearchParams();

  if (method === "GET" && options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined) query.set(key, String(value));
    }
  }

  const queryString = query.toString();
  const path = `/api/colive/${encodeURIComponent(endpoint)}`;
  const response = await fetch(`${path}${queryString ? `?${queryString}` : ""}`, {
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
  });
  const responseText = await response.text();

  let json: ApiEnvelope<T> | T | null;
  try {
    json = responseText ? (JSON.parse(responseText) as ApiEnvelope<T> | T) : null;
  } catch {
    throw new Error(
      `${endpoint} returned invalid JSON (HTTP ${response.status}).`
    );
  }

  if (!response.ok) {
    const message = isRecord(json) ? json.Message : undefined;
    throw new Error(
      (typeof message === "string" && message) ||
        `${endpoint} failed with HTTP ${response.status}.`
    );
  }

  if (json === null) {
    if (options.allowNull) return null as T;
    throw new Error(`${endpoint} returned an empty response.`);
  }

  const envelope = isRecord(json) ? json : undefined;
  if (
    typeof envelope?.Status === "string" &&
    !["success", "ok"].includes(envelope.Status.toLowerCase())
  ) {
    throw new Error(
      (typeof envelope.Message === "string" && envelope.Message) ||
        `${endpoint} was unsuccessful.`
    );
  }

  if (options.unwrapData && envelope && "Data" in envelope) {
    if (envelope.Data === undefined || envelope.Data === null) {
      if (options.allowNull) return null as T;
      throw new Error(`${endpoint} returned an empty response.`);
    }
    return envelope.Data as T;
  }

  if (options.unwrapData && options.allowNull) {
    return null as T;
  }

  return json as T;
}

export function apiGet<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  return request<T>(endpoint, "GET", options);
}

export function apiPost<T>(
  endpoint: string,
  payload: Record<string, unknown>,
  options: RequestOptions = {}
): Promise<T> {
  return request<T>(endpoint, "POST", options, payload);
}
