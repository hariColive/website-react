import "server-only";

import type { FormEndpoint } from "@/lib/forms/formTypes";
import { LEAD_PHONE_PATTERN } from "@/lib/leadCapture";

import type { ColiveService } from "./apiConfig";

type FormDestination = {
  method: "POST";
  service: ColiveService;
  path: string;
  encoding: "form" | "json";
  validate?: (payload: Record<string, unknown>) => string | null;
};

const contactEndpoint = {
  method: "POST",
  service: "crm",
  path: "CRMapi/PropertyCRM/ContactUsInsert",
} as const;

export const FORM_ENDPOINTS = {
  ContactUsInsert: contactEndpoint,
};

export const FORM_DESTINATIONS = {
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
      typeof payload.first_name !== "string" ||
      !payload.first_name.trim() ||
      typeof payload.customer_mobile !== "string" ||
      !LEAD_PHONE_PATTERN.test(payload.customer_mobile.trim())
        ? "Please enter a valid name and WhatsApp number"
        : null,
  },
  walkthroughLead: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/LandingPageLeadInsert",
    encoding: "json",
    validate: (payload) =>
      typeof payload.first_name !== "string" ||
      !payload.first_name.trim() ||
      typeof payload.customer_mobile !== "string" ||
      !LEAD_PHONE_PATTERN.test(payload.customer_mobile.trim())
        ? "Please enter a valid name and WhatsApp number"
        : null,
  },
  ScheduleVisitsInsert: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/ScheduleVisitsInsert",
    encoding: "json",
    validate: (payload) =>
      typeof payload.Name !== "string" ||
      !payload.Name.trim() ||
      typeof payload.Phone !== "string" ||
      !/^[6-9]\d{9}$/.test(payload.Phone.trim()) ||
      typeof payload.Email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(payload.Email.trim()) ||
      typeof payload.LocationId !== "string" ||
      !/^[1-9]\d*$/.test(payload.LocationId) ||
      typeof payload.TimeId !== "number" ||
      !Number.isInteger(payload.TimeId) ||
      payload.TimeId <= 0 ||
      typeof payload.PickupDate !== "string" ||
      !/^\d{1,2}-[A-Za-z]{3}-\d{4}$/.test(payload.PickupDate)
        ? "Please provide valid visit details"
        : null,
  },
} satisfies Record<FormEndpoint, FormDestination>;

export const isFormEndpoint = (name: string): name is FormEndpoint =>
  Object.hasOwn(FORM_DESTINATIONS, name);
