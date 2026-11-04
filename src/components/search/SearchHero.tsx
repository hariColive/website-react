import Link from "next/link";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { getSearchSeo } from "@/lib/searchSeo";
import type { SearchLocation } from "@/lib/searchLocation";

import KeywordSearch from "./KeywordSearch";

const headingClass = "mb-6 font-head text-3xl leading-tight tracking-[-0.02em] text-[#111] sm:text-4xl";

// The location's H1 from the SEO copy, e.g. "Best PGs In Bangalore - PG Rooms/Stays In Bangalore"
async function Heading({ location }: { location: Promise<SearchLocation | null> }) {
  const place = await location;
  const h1 = place ? (await getSearchSeo(place)).h1 : "Find a 6-Star Home";
  return <h1 className={headingClass}>{h1}</h1>;
}

export default function SearchHero({ location }: { location: Promise<SearchLocation | null> }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-360 px-4 pt-10 pb-8 sm:px-8 sm:pb-10 md:pt-14">
        <div className="max-w-3xl">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#111]">
            <FaArrowLeft aria-hidden="true" /> Back Home
          </Link>

          <p className="mb-2 text-[11px] tracking-[0.2em] text-gray-500 uppercase">Find a 6-Star Home</p>
          <Suspense fallback={<div className={`${headingClass} h-10 w-2/3 rounded bg-gray-100`} />}>
            <Heading location={location} />
          </Suspense>

          {/* Reads ?q= from the URL, so it renders once the request is known */}
          <Suspense fallback={<div className="h-14 rounded-full bg-white ring-1 ring-black/5" />}>
            <KeywordSearch />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
