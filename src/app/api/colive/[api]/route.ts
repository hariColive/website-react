import {
  COLIVE_ENDPOINTS,
  isColiveEndpointName,
} from "@/lib/server/coliveEndpoints";
import { getColiveEndpointBaseUrl } from "@/lib/server/apiConfig";

type RouteContext = {
  params: Promise<{ api: string }>;
};

async function forwardRequest(
  request: Request,
  context: RouteContext,
  method: "GET" | "POST"
) {
  const { api } = await context.params;

  if (!isColiveEndpointName(api)) {
    return Response.json(
      { Status: "error", Message: "Unknown Colive API endpoint." },
      { status: 404 }
    );
  }

  const endpoint = COLIVE_ENDPOINTS[api];
  if (!endpoint.methods.some((allowedMethod) => allowedMethod === method)) {
    return Response.json(
      { Status: "error", Message: "Method not allowed for this endpoint." },
      {
        status: 405,
        headers: { Allow: endpoint.methods.join(", ") },
      }
    );
  }

  let url: URL;
  try {
    url = new URL(endpoint.path, getColiveEndpointBaseUrl(endpoint.service));
  } catch (error) {
    console.error("Colive API configuration error:", error);
    return Response.json(
      { Status: "error", Message: "Colive API is not configured." },
      { status: 500 }
    );
  }

  let body: string | undefined;
  if (method === "POST") {
    body = await request.text();
    try {
      JSON.parse(body);
    } catch {
      return Response.json(
        { Status: "error", Message: "Request body must be valid JSON." },
        { status: 400 }
      );
    }
  } else {
    url.search = new URL(request.url).search;
  }

  try {
    const upstream = await fetch(url, {
      method,
      headers:
        method === "POST"
          ? {
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json",
            }
          : { Accept: "application/json" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    const responseText = await upstream.text();

    const shouldReturnEmptyResult =
      (api === "GetSuggestionsBasedonSearchText" ||
        api === "GetDetailsByPlaceId") &&
      upstream.status === 403;

    if (shouldReturnEmptyResult) {
      return Response.json(
        { Status: "success", Message: "No suggestions available.", Data: null },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return new Response(responseText || null, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const timedOut =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    console.error(`Colive API request failed (${api}):`, error);

    return Response.json(
      {
        Status: "error",
        Message: timedOut
          ? "The Colive API request timed out."
          : "Unable to reach the Colive API.",
      },
      { status: timedOut ? 504 : 502 }
    );
  }
}

export function GET(request: Request, context: RouteContext) {
  return forwardRequest(request, context, "GET");
}

export function POST(request: Request, context: RouteContext) {
  return forwardRequest(request, context, "POST");
}
