import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  images: {
    // Property photos served by the Colive CMS; a few older properties still use the site's static assets
    remotePatterns: [
      new URL("https://www.colive.com/utility/files/**"),
      new URL("https://www.colive.com/utilities/files/**"),
      new URL("https://www.colive.com/assets/images/**"),
      new URL("https://www.colive.com/utility/files/**"),
      new URL("https://www.colive.com/utilities/files/**"),
      new URL("https://www.colive.com/assets/images/**"),

      // The QA API returns photos from the QA CMS
      new URL("https://qa.colive.com/utilities/files/**"),
      new URL("https://qa.colive.com/utility/files/**"),
      new URL("https://qa.colive.com/assets/images/**"),
    ],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
