import type { ColiveEndpointDefinition } from "./coliveEndpoints";

type ColiveEnvironment = "QA" | "LIVE";
type ColiveService = ColiveEndpointDefinition["service"];

function getEnvironment(): ColiveEnvironment {
  const value = process.env.COLIVE_ENV?.trim().toUpperCase() || "LIVE";
  if (value !== "QA" && value !== "LIVE") {
    throw new Error("COLIVE_ENV must be either QA or LIVE.");
  }
  return value;
}

function normalizeBaseUrl(value: string | undefined, variable: string): string {
  if (!value?.trim()) {
    throw new Error(`${variable} must be configured.`);
  }

  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error(`${variable} must be a valid absolute URL.`);
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`${variable} must use HTTP or HTTPS.`);
  }

  if (url.username || url.password) {
    throw new Error(`${variable} must not contain credentials.`);
  }

  return url.toString().replace(/\/+$/, "");
}

export function getColiveEndpointBaseUrl(service: ColiveService): string {
  const environment = getEnvironment();

  if (service === "crm") {
    const variable =
      environment === "QA" ? "COLIVE_QA_API_URL" : "COLIVE_LIVE_API_URL";
    const configuredValue = process.env[variable];

    if (configuredValue) return normalizeBaseUrl(configuredValue, variable);
    if (environment === "LIVE") return "https://api.colive.com";
    throw new Error(`${variable} must be configured when COLIVE_ENV=QA.`);
  }

  const variable =
    environment === "QA"
      ? "COLIVE_QA_WEB_API_URL"
      : "COLIVE_LIVE_WEB_API_URL";
  const configuredValue = process.env[variable];

  if (configuredValue) return normalizeBaseUrl(configuredValue, variable);
  if (environment === "LIVE") return "https://www.colive.com";
  return "https://qa.colive.com";
}
