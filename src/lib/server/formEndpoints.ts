// Backend destination of every form the /api/forms/[api] route forwards.
import "server-only";

import type { FormEndpoint } from "@/lib/forms/formTypes";
import { LEAD_PHONE_PATTERN } from "@/lib/leadCapture";

import type { ColiveService } from "./apiConfig";

type FormDestination = {
  service: ColiveService;
  path: string;
  // "form" posts application/x-www-form-urlencoded (legacy site controllers); "json" posts the payload as JSON
  encoding: "form" | "json";
  // Server-side recheck of the browser validation; returns an error message, or null when the payload is valid
  validate?: (payload: Record<string, string>) => string | null;
};

export const FORM_DESTINATIONS: Record<FormEndpoint, FormDestination> = {
  leadCapture: {
    service: "site",
    path: "api/Offers/LeadCapture",
    encoding: "form",
    validate: (payload) =>
      !payload.first_name?.trim() || !LEAD_PHONE_PATTERN.test(payload.customer_mobile?.trim() ?? "")
        ? "Please enter a valid name and WhatsApp number"
        : null,
  },
};
