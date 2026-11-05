import { fetchBackend } from "@/lib/server/coliveFetch";
import { FORM_ENDPOINTS, isFormEndpoint } from "@/lib/server/formEndpoints";

export async function POST(request: Request, { params }: RouteContext<"/api/forms/[api]">) {
  const { api } = await params;
  if (!isFormEndpoint(api) || FORM_ENDPOINTS[api].method !== request.method) {
    return Response.json({ Status: "failed", Message: "Invalid API", Data: null }, { status: 404 });
  }

  const response = await fetchBackend(FORM_ENDPOINTS[api], { body: await request.text() });
  return new Response(response.body, {
    status: response.status,
    headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
  });
}
