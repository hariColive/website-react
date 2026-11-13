import type { FormResponse } from "@/lib/forms/formTypes";
import { isFormEndpoint } from "@/lib/forms/formTypes";
import { getBaseUrl } from "@/lib/server/apiConfig";
import { FORM_DESTINATIONS } from "@/lib/server/formEndpoints";

const reply = (success: boolean, message: string, status = 200) =>
  Response.json({ success, message } satisfies FormResponse, { status });

function parseStatus(text: string) {
  try {
    return (JSON.parse(text) as { Status?: string }).Status;
  } catch {
    return undefined;
  }
}

// One JSON endpoint for every browser form: POST /api/forms/[api] with a flat { field: value } body.
// Forwards to the backend listed in formEndpoints.ts and always answers { success, message }, never a redirect,
// so the page stays put and shows the result itself.
export async function POST(request: Request, { params }: RouteContext<"/api/forms/[api]">) {
  const { api } = await params;
  if (!isFormEndpoint(api)) return reply(false, "Invalid form", 404);

  let payload: Record<string, string>;
  try {
    payload = (await request.json()) as Record<string, string>;
  } catch {
    return reply(false, "Invalid request body", 400);
  }

  const destination = FORM_DESTINATIONS[api];
  const invalid = destination.validate?.(payload);
  if (invalid) return reply(false, invalid, 400);

  try {
    const site = new URL(getBaseUrl(destination.service));
    const res = await fetch(new URL(destination.path, site), {
      method: "POST",
      headers: {
        "Content-Type":
          destination.encoding === "form" ? "application/x-www-form-urlencoded" : "application/json; charset=utf-8",
        // The legacy site only calls the CRM when the request carries its own origin, matched case-sensitively as
        // "origin: https://qa.colive.com" (ApiControllerBase.PostAPICall). Keep the key lowercase: fetch sends it as written.
        origin: site.origin,
      },
      body: destination.encoding === "form" ? new URLSearchParams(payload) : JSON.stringify(payload),
      // The legacy site answers a saved lead with a 302 to its thank-you page; read it instead of following it
      redirect: "manual",
    });

    if (res.status >= 300 && res.status < 400) return reply(true, "Submitted successfully");

    const text = await res.text();
    if (res.ok && parseStatus(text) === "success") return reply(true, "Submitted successfully");

    console.error(`Form ${api} failed: ${res.status} ${text.slice(0, 300)}`);
    return reply(false, "Submission failed", 502);
  } catch (error) {
    console.error(error);
    return reply(false, "Submission failed", 502);
  }
}
