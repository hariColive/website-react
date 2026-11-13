// Form endpoints the browser may submit through /api/forms/[api], with their request and response types.
// Safe to import from client components (no server-only code here).

// To add a form: add its name here, its backend path in src/lib/server/formEndpoints.ts and a submit function in formApi.ts
export type FormEndpoint = "ContactUsInsert" | "leadCapture" | "walkthroughLead";

export const FORM_ENDPOINTS: readonly FormEndpoint[] = [
  "ContactUsInsert",
  "leadCapture",
  "walkthroughLead",
];

export const isFormEndpoint = (name: string): name is FormEndpoint =>
  (FORM_ENDPOINTS as readonly string[]).includes(name);

// Every form route answers with this JSON instead of a redirect
export interface FormResponse {
  success: boolean;
  message: string;
}

export type ContactFormRequest = {
  Name: string;
  Mobile: string;
  Email: string;
  Message: string;
  ContactusType: string;
  Source: "WebContactus";
};

export type ContactFormValues = {
  name: string;
  mobile: string;
  email: string;
  select: string;
  message: string;
};

export type FormApiResponse<T = unknown> = {
  Status: string;
  Message: string;
  Data?: T;
};

export interface WalkthroughLeadRequest {
  first_name: string;
  customer_mobile: string;
  [key: string]: string;
  leadSource: string;
  LandingPageId: string;
  Mobile_Number_Validated: string;
  redirectURL: string;
}

export type WalkthroughLeadResponse = FormResponse;

// Home page walkthrough form (legacy /api/Offers/LeadCapture)
export interface LeadCaptureRequest {
  name: string;
  phone: string;
  // gclid / utm_* values read from the page URL
  tracking: Record<string, string>;
}
