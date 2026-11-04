"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { SORT_OPTIONS } from "@/lib/searchFilters";

// Sorting reorders the already-fetched results, so it only updates the URL (no server round trip).
export default function SortSelect({ value }: { value: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (sort === "default") params.delete("sort");
    else params.set("sort", sort);
    const query = params.toString();
    window.history.pushState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  return (
    <label className="flex items-center gap-2 text-sm text-gray-500">
      Sort by
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-[#111] outline-none focus-visible:border-[#111]"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
