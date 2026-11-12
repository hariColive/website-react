// Form endpoints the browser may submit through /api/forms/[api], with their request and response types.
// Safe to import from client components (no server-only code here).

// To add a form: add its name here, its backend path in src/lib/server/formEndpoints.ts and a submit function in formApi.ts
export type FormEndpoint = "leadCapture";

export const FORM_ENDPOINTS: readonly FormEndpoint[] = ["leadCapture"];

export const isFormEndpoint = (name: string): name is FormEndpoint =>
  (FORM_ENDPOINTS as readonly string[]).includes(name);

// Every form route answers with this JSON instead of a redirect
export interface FormResponse {
  success: boolean;
  message: string;
}

// Home page walkthrough form (legacy /api/Offers/LeadCapture)
export interface LeadCaptureRequest {
  name: string;
  phone: string;
  // gclid / utm_* values read from the page URL
  tracking: Record<string, string>;
}
