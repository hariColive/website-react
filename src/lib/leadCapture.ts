// Shared by the walkthrough form and the leadCapture entry in src/lib/server/formEndpoints.ts. Same rule as colive.com: 7-15 digits,
// optionally with a leading + and spaces or dashes.
export const LEAD_PHONE_PATTERN = /^\+?[\d\s-]{7,15}$/;

// Read from the page URL on submit and posted as hidden fields
export const LEAD_TRACKING_KEYS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_keyword",
] as const;
