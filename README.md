This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Colive API configuration

Colive requests use the server-side allowlisted proxy at `/api/colive/[api]`.
Set `COLIVE_ENV` to `QA` or `LIVE`; CRM and website-service origins are kept
separate because the existing APIs use different hosts.

Configure these values in `.env.local` or the deployment environment:

| Variable | Purpose |
| --- | --- |
| `COLIVE_ENV` | Selects `QA` or `LIVE` (defaults to `LIVE`). |
| `COLIVE_QA_API_URL` | Required CRM origin when `COLIVE_ENV=QA`. |
| `COLIVE_QA_WEB_API_URL` | Optional QA website-service origin; defaults to `https://qa.colive.com`. |
| `COLIVE_LIVE_API_URL` | Optional LIVE CRM origin; defaults to `https://api.colive.com`. |
| `COLIVE_LIVE_WEB_API_URL` | Optional LIVE website-service origin; defaults to `https://www.colive.com`. |

The QA CRM origin is `https://api.colive.com`; CRM requests use `/web/qa/...`
when `COLIVE_ENV=QA` and `/web/live/...` when `COLIVE_ENV=LIVE`. The QA
website-service base is `https://qa.colive.com`; its endpoint paths append
`/api/Colive/...`. These variables are read by the server route and are not
exposed to browser code.

To add an API, register its approved path and supported method in
`src/lib/server/coliveEndpoints.ts`, add its types and API-specific function in
`src/lib/coliveApi.ts`, then use that function from the consuming component.
Existing Colive functions use the shared client in `src/lib/api/apiClient.ts`.
The registry only permits known endpoint names; do not pass upstream URLs from
the browser.
