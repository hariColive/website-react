import "server-only";

import type { FormEndpoint } from "@/lib/forms/formTypes";
import type { ColiveService } from "./apiConfig";

type Endpoint = {
  method: "GET" | "POST";
  service: ColiveService;
  path: string;
  url?: string;
};

export const FORM_ENDPOINTS = {
  ContactUsInsert: {
    method: "POST",
    service: "crm",
    path: "CRMapi/PropertyCRM/ContactUsInsert",
    url: process.env.COLIVE_CONTACT_API_URL,
  },
} satisfies Record<FormEndpoint, Endpoint>;

export const isFormEndpoint = (name: string): name is FormEndpoint =>
  Object.hasOwn(FORM_ENDPOINTS, name);