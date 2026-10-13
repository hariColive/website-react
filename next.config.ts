import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Proxy the Colive backend so the browser calls it same-origin
  // (its CORS response sends a duplicate Access-Control-Allow-Origin, which browsers reject).
  rewrites() {
    return [
      {
        source: "/api/Colive/:path*",
        destination: `${process.env.COLIVE_API_BASE ?? "https://www.colive.com"}/api/Colive/:path*`,
      },
    ];
  },
};

export default nextConfig;
