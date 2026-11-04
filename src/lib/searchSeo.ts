// SEO copy for the search pages (meta tags, H1, overview, FAQs, JSON-LD, hreflang),
// ported from the legacy colive.com search page. The copy lives in src/content/search-seo.
import type { Metadata } from "next";

import { searchSeoFiles } from "@/content/search-seo";

import type { SearchLocation } from "./searchLocation";

export type FaqGroup = {
  heading: string;
  // The rest sit behind "View more"
  initiallyVisible: number;
  // answer is trusted HTML from the content files
  items: { question: string; answer: string }[];
};

type SearchSeoFile = {
  title?: string;
  description?: string;
  h1?: string;
  // Trusted HTML; "more" sits behind "Read more"
  overview?: { intro: string; more: string };
  faqs?: FaqGroup[];
  jsonLd?: object[];
  hreflang?: { hreflang: string; href: string }[];
};

export type SearchSeo = Required<Pick<SearchSeoFile, "title" | "description" | "h1" | "faqs" | "jsonLd">> &
  Pick<SearchSeoFile, "overview" | "hreflang">;

const CITY_PLACEHOLDER = /\$strCity\$/g;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

async function loadFile(key: string): Promise<SearchSeoFile | null> {
  const load = searchSeoFiles[key as keyof typeof searchSeoFiles];
  return load ? ((await load()).default as SearchSeoFile) : null;
}

// Location-specific copy where the legacy site had it, the generic copy otherwise.
export async function getSearchSeo(location: SearchLocation): Promise<SearchSeo> {
  const [page, fallback] = await Promise.all([loadFile(location.seoKey), loadFile("default")]);
  const seo = { ...fallback, ...page } as SearchSeo;

  // The label can come from ?loc=, so it's escaped for wherever it lands
  const fill = (value: string, label: string) => value.replace(CITY_PLACEHOLDER, () => label);
  const text = (value: string) => fill(value, location.label);
  const html = (value: string) => fill(value, escapeHtml(location.label));

  return {
    ...seo,
    title: text(seo.title),
    description: text(seo.description),
    h1: text(seo.h1),
    overview: seo.overview && { intro: html(seo.overview.intro), more: html(seo.overview.more) },
    faqs: seo.faqs.map((group) => ({
      ...group,
      heading: text(group.heading),
      items: group.items.map((item) => ({ question: text(item.question), answer: html(item.answer) })),
    })),
    jsonLd: JSON.parse(fill(JSON.stringify(seo.jsonLd), JSON.stringify(location.label).slice(1, -1))),
  };
}

// "Koramangala, Bangalore" gets locality keywords, a city page gets city keywords
function keywords(label: string) {
  const [place, city] = label.split(", ");
  return city
    ? `pg in ${place}, PG for Boys in ${place}, PG for Couples in ${place}, PG for Male in ${place}, PG for Girls in ${place}, PG for Ladies in ${place}`
    : `pg in ${place}, PG for Boys ${place}, PG for Couples ${place}, PG for Girls ${place}, PG for Male ${place}, PG for Ladies ${place}`;
}

export async function searchMetadata(location: SearchLocation): Promise<Metadata> {
  const seo = await getSearchSeo(location);

  const languages: Record<string, { url: string }[]> = {};
  for (const { hreflang, href } of seo.hreflang ?? []) {
    const lang = hreflang === "x-default" ? hreflang : hreflang.replace(/-(\w+)$/, (_, region: string) => `-${region.toUpperCase()}`);
    // The legacy URLs end in "/", which this site redirects away from
    (languages[lang] ??= []).push({ url: href.replace(/\/$/, "") });
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: keywords(location.label),
    alternates: { canonical: location.canonical, languages },
  };
}
