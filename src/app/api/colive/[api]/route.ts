
import {
  COLIVE_ENDPOINTS,
  isColiveEndpoint,
} from "@/lib/server/coliveEndpoints";
import { fetchColive } from "@/lib/server/coliveFetch";

type RouteContext = {
  params: Promise<{ api: string }>;
};

async function forwardRequest(
  request: Request,
  context: RouteContext
) {
  const { api } = await context.params;

  if (!isColiveEndpoint(api)) {
    return Response.json(
      {
        Status: "error",
        Message: "Unknown Colive API endpoint.",
        Data: null,
      },
      { status: 404 }
    );
  }

  if (COLIVE_ENDPOINTS[api].method !== "POST") {
    return Response.json(
      {
        Status: "error",
        Message: "Method not allowed for this endpoint.",
        Data: null,
      },
      { status: 405 }
    );
  }

  const body = await request.text();

  try {
    JSON.parse(body);
  } catch {
    return Response.json(
      {
        Status: "error",
        Message: "Request body must be valid JSON.",
        Data: null,
      },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetchColive(api, { body });

    if (
      (api === "GetSuggestionsBasedonSearchText" ||
        api === "GetDetailsByPlaceId") &&
      upstream.status === 403
    ) {
      return Response.json(
        {
          Status: "success",
          Message: "No suggestions available.",
          Data: null,
        },
        {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const responseText = await upstream.text();

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
        Data: null,
      },
      { status: timedOut ? 504 : 502 }
    );
  }
}

export function POST(request: Request, context: RouteContext) {
  return forwardRequest(request, context);
}
