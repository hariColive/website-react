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
}
