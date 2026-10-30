import Link from "next/link";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";

import KeywordSearch from "./KeywordSearch";

export default function SearchHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-360 px-4 pt-10 pb-8 sm:px-8 sm:pb-10 md:pt-14">
        <div className="max-w-3xl">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#111]">
            <FaArrowLeft aria-hidden="true" /> Back Home
          </Link>

          <h1 className="mb-6 font-head text-4xl leading-tight tracking-[-0.02em] text-[#111] sm:text-5xl">Find a 6-Star Home</h1>

          {/* Reads ?q= from the URL, so it renders once the request is known */}
          <Suspense fallback={<div className="h-14 rounded-full bg-white ring-1 ring-black/5" />}>
            <KeywordSearch />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
