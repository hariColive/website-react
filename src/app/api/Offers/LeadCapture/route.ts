import { getBaseUrl } from "@/lib/server/apiConfig";
import { LEAD_PHONE_PATTERN } from "@/lib/leadCapture";

function parseStatus(text: string) {
  try {
    return (JSON.parse(text) as { Status?: string }).Status;
  } catch {
    return undefined;
  }
}

// Same shape as the legacy redirect: /?act=thankyou?dt=20261106114931&name=Hari (the form reads act's "thankyou" prefix)
function thankYouPath(name: string) {
  const dt = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  return `/?act=thankyou?dt=${dt}&${new URLSearchParams({ name })}`;
}

// Native form post from the home page walkthrough form (same path and fields as colive.com). The legacy site
// saves the lead and redirects to /?act=thankyou?dt=...&name=...; we forward that redirect to our own origin.
export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("first_name") ?? "").trim();
  const phone = String(form.get("customer_mobile") ?? "").trim();
  const failed = () => Response.redirect(new URL("/?act=leaderror#walkthrough", request.url), 303);

  if (!name || !LEAD_PHONE_PATTERN.test(phone)) return failed();

  const body = new URLSearchParams();
  form.forEach((value, key) => {
    if (typeof value === "string") body.append(key, value);
  });

  try {
    const site = new URL(getBaseUrl("site"));
    const res = await fetch(new URL("api/Offers/LeadCapture", site), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // The legacy API only calls the CRM when the request carries its own origin, matched case-sensitively as
        // "origin: https://qa.colive.com" (ApiControllerBase.PostAPICall). Keep the key lowercase: fetch sends it as written.
        origin: site.origin,
      },
      body,
      redirect: "manual",
    });

    const location = res.headers.get("Location");
    if (res.status >= 300 && res.status < 400 && location) {
      // Keep only the path and query, so the redirect can't send the visitor to another host
      const target = new URL(location, getBaseUrl("site"));
      return Response.redirect(new URL(`${target.pathname}${target.search}#walkthrough`, request.url), 303);
    }

    // The API can also answer with its { Status, Message } envelope instead of redirecting
    const text = await res.text();
    if (res.ok && parseStatus(text) === "success") {
      return Response.redirect(new URL(`${thankYouPath(name)}#walkthrough`, request.url), 303);
    }

    console.error(`LeadCapture failed: ${res.status} ${text.slice(0, 300)}`);
    return failed();
  } catch (error) {
    console.error(error);
    return failed();
  }
}
