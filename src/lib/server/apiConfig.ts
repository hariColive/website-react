
import "server-only";

export type ColiveEnv = "QA" | "LIVE";
export type ColiveService = "crm" | "web";

export const COLIVE_ENV: ColiveEnv =
  process.env.COLIVE_ENV?.trim().toUpperCase() === "LIVE"
    ? "LIVE"
    : "QA";

const BASE_URLS: Record<
  ColiveEnv,
  Record<ColiveService, string | undefined>
> = {
  QA: {
    crm: process.env.COLIVE_QA_API_URL,
    web:
      process.env.COLIVE_WEBSITE_API_BASE_URL ??
      process.env.COLIVE_QA_WEBSITE_API_BASE_URL ??
      process.env.COLIVE_QA_WEB_URL ??
      process.env.COLIVE_LIVE_WEBSITE_API_BASE_URL ??
      process.env.COLIVE_LIVE_WEB_URL ??
      "https://www.colive.com/",
  },
  LIVE: {
    crm:
      process.env.COLIVE_LIVE_API_URL ??
      "https://api.colive.com/web/live/",
    web:
      process.env.COLIVE_WEBSITE_API_BASE_URL ??
      process.env.COLIVE_LIVE_WEBSITE_API_BASE_URL ??
      process.env.COLIVE_LIVE_WEB_URL ??
      process.env.COLIVE_QA_WEBSITE_API_BASE_URL ??
      process.env.COLIVE_QA_WEB_URL ??
      "https://www.colive.com/",
  },
};

export function getBaseUrl(service: ColiveService) {
  const url = BASE_URLS[COLIVE_ENV][service];

  if (!url) {
    throw new Error(
      `No ${service} API URL configured for COLIVE_ENV=${COLIVE_ENV}; see .env.example`
    );
  }

  return url.endsWith("/") ? url : `${url}/`;
}
