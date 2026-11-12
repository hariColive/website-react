// Which Colive backend the app talks to. This branch is pinned to QA: COLIVE_ENV is ignored and the live CRM API is never called.
import "server-only";

export type ColiveEnv = "QA" | "LIVE";

// "crm" is the CRM API (api.colive.com/web/<env>/CRMapi/...); "site" is the legacy website, which still handles
// form posts such as the home page lead form (/api/Offers/LeadCapture)
export type ColiveService = "crm" | "site";

 //export const COLIVE_ENV: ColiveEnv = "LIVE";
 export const COLIVE_ENV: ColiveEnv = "QA";

const BASE_URLS: Record<ColiveEnv, Record<ColiveService, string | undefined>> = {
  QA: {
    crm: process.env.COLIVE_QA_API_URL ?? "https://api.colive.com/web/qa/",
    site: process.env.COLIVE_QA_SITE_URL ?? "https://qa.colive.com/",
  },
  LIVE: {
    crm: process.env.COLIVE_LIVE_API_URL ?? "https://api.colive.com/web/live/",
    site: process.env.COLIVE_LIVE_SITE_URL ?? "https://www.colive.com/",
  },
};

// Base URL of a service in the active environment, always ending in "/" so endpoint paths resolve under it.
export function getBaseUrl(service: ColiveService) {
  const url = BASE_URLS[COLIVE_ENV][service];
  if (!url) throw new Error(`No ${service} API URL configured for ${COLIVE_ENV}; see .env.example`);
  return url.endsWith("/") ? url : `${url}/`;
}
