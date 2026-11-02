<<<<<<< HEAD
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
=======
type ColiveService = "crm" | "web";

const DEFAULT_BASE_URLS: Record<ColiveService, string> = {
  crm: "https://api.colive.com",
  web: "https://www.colive.com",
};

export function getColiveEndpointBaseUrl(service: ColiveService): string {
  const configuredUrl =
    service === "crm"
      ? process.env.COLIVE_LIVE_API_URL
      : process.env.COLIVE_LIVE_WEB_API_URL;
  const baseUrl = configuredUrl || DEFAULT_BASE_URLS[service];

  try {
    const parsedUrl = new URL(baseUrl);
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      throw new Error("Unsupported protocol");
    }
    return parsedUrl.origin;
  } catch {
    throw new Error(`Invalid Colive ${service} API base URL.`);
  }
>>>>>>> origin/QA-master
}
