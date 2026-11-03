import { COLIVE_ENDPOINTS, isColiveEndpoint } from "@/lib/server/coliveEndpoints";
import { fetchColive } from "@/lib/server/coliveFetch";

// One proxy for browser calls to any registered Colive API: POST /api/colive/GetSuggestionsBasedonSearchText.
// Forwards to QA or LIVE per COLIVE_ENV; unregistered names (or the wrong method) get a 404.
async function forward(request: Request, api: string) {
  if (!isColiveEndpoint(api) || COLIVE_ENDPOINTS[api].method !== request.method) {
    return Response.json({ Status: "failed", Message: "Invalid API", Data: null }, { status: 404 });
  }

  const res = await fetchColive(api, { search: new URL(request.url).search, body: await request.text() });
  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function GET(request: Request, { params }: RouteContext<"/api/colive/[api]">) {
  return forward(request, (await params).api);
}

export async function POST(request: Request, { params }: RouteContext<"/api/colive/[api]">) {
  return forward(request, (await params).api);
}
