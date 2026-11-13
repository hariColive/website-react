import "server-only";

import type { FormEndpoint } from "@/lib/forms/formTypes";
import { LEAD_PHONE_PATTERN } from "@/lib/leadCapture";

import type { ColiveService } from "./apiConfig";

type FormDestination = {
  method: "POST";
  service: ColiveService;
  path: string;
  encoding: "form" | "json";
  validate?: (payload: Record<string, string>) => string | null;
};

const contactEndpoint = {
  method: "POST",
  service: "crm",
  path: "CRMapi/PropertyCRM/ContactUsInsert",
} as const;

export const FORM_ENDPOINTS = {
  ContactUsInsert: contactEndpoint,
};

export const FORM_DESTINATIONS: Record<FormEndpoint, FormDestination> = {
  ContactUsInsert: {
    ...contactEndpoint,
    encoding: "json",
  },
  leadCapture: {
    method: "POST",
    service: "site",
    path: "api/Offers/LeadCapture",
    encoding: "form",
    validate: (payload) =>
      !payload.first_name?.trim() || !LEAD_PHONE_PATTERN.test(payload.customer_mobile?.trim() ?? "")
        ? "Please enter a valid name and WhatsApp number"
        : null,
  },
  walkthroughLead: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/LandingPageLeadInsert",
    encoding: "json",
    validate: (payload) =>
      !payload.first_name?.trim() || !LEAD_PHONE_PATTERN.test(payload.customer_mobile?.trim() ?? "")
        ? "Please enter a valid name and WhatsApp number"
        : null,
  },
};

export const isFormEndpoint = (name: string): name is FormEndpoint =>
  Object.hasOwn(FORM_DESTINATIONS, name);
