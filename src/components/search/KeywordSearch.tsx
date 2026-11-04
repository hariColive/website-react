"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";

// Narrows the listed homes by property, location or city name via ?q= (filtered client-side by PropertyGrid).
export default function KeywordSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlKeyword = searchParams.get("q") ?? "";
  const [keyword, setKeyword] = useState(urlKeyword);

  // Keep the input in step with the URL when it changes elsewhere (back button, "Clear search")
  const [syncedKeyword, setSyncedKeyword] = useState(urlKeyword);
  if (urlKeyword !== syncedKeyword) {
    setSyncedKeyword(urlKeyword);
    setKeyword(urlKeyword);
  }

  useEffect(() => {
    const trimmed = keyword.trim();
    if (trimmed === urlKeyword) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      const query = params.toString();
      window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    }, 200);
    return () => clearTimeout(timer);
  }, [keyword, urlKeyword, pathname, searchParams]);

  const showResults = () => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" });

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        showResults();
      }}
      className="flex items-center gap-3 rounded-full bg-white p-2 pl-5 ring-1 ring-black/5"
    >
      <FaSearch aria-hidden="true" className="shrink-0 text-gray-400" />
      <input
        type="search"
        aria-label="Search homes"
        autoComplete="off"
        placeholder="Try property name, location name, city name..."
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="min-w-0 flex-1 bg-transparent py-2 text-gray-700 outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-black px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#333] md:px-4 md:py-2.5"
      >
        Search <FaArrowRight aria-hidden="true" />
      </button>
    </form>
  );
}
