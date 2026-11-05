import { fetchBackend } from "@/lib/server/coliveFetch";
import { FORM_ENDPOINTS } from "@/lib/server/formEndpoints";

export async function POST(request: Request) {
  const response = await fetchBackend(FORM_ENDPOINTS.ContactUsInsert, {
    body: await request.text(),
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}
