// Which Colive backend the app talks to. COLIVE_ENV=LIVE in .env.local selects the live APIs; anything else is QA.
// Only the selected environment is ever called.
import "server-only";

export type ColiveEnv = "QA" | "LIVE";

// "crm" is the CRM API (api.colive.com/web/<env>/CRMapi/...); "web" is the website's own API (www.colive.com/api/Colive/...).
export type ColiveService = "crm" | "web";

export const COLIVE_ENV: ColiveEnv = process.env.COLIVE_ENV?.trim().toUpperCase() === "LIVE" ? "LIVE" : "QA";

const BASE_URLS: Record<ColiveEnv, Record<ColiveService, string | undefined>> = {
  QA: {
    crm: process.env.COLIVE_QA_API_URL,
    // There is no QA website API yet, so QA shares the live one unless one is configured
    web: process.env.COLIVE_QA_WEB_URL ?? process.env.COLIVE_LIVE_WEB_URL ?? "https://www.colive.com/",
  },
  LIVE: {
    crm: process.env.COLIVE_LIVE_API_URL ?? "https://api.colive.com/web/live/",
    web: process.env.COLIVE_LIVE_WEB_URL ?? "https://www.colive.com/",
  },
};

// Base URL of a service in the active environment, always ending in "/" so endpoint paths resolve under it.
export function getBaseUrl(service: ColiveService) {
  const url = BASE_URLS[COLIVE_ENV][service];
  if (!url) throw new Error(`No ${service} API URL configured for COLIVE_ENV=${COLIVE_ENV}; see .env.example`);
  return url.endsWith("/") ? url : `${url}/`;
}
