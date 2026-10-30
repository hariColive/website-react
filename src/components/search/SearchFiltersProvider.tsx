"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, use, useMemo, useOptimistic, useTransition, type ReactNode } from "react";

import { parseFilters, withFilters, type SearchFilters } from "@/lib/searchFilters";

type SearchFiltersContextValue = {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  isPending: boolean;
};

const SearchFiltersContext = createContext<SearchFiltersContextValue | null>(null);

export function useSearchFilters() {
  const context = use(SearchFiltersContext);
  if (!context) throw new Error("useSearchFilters must be used inside <SearchFiltersProvider>");
  return context;
}

// Filters live in the URL; changing one navigates so the server refetches the results.
// The optimistic copy keeps rapid clicks from reading a stale URL while that navigation is in flight.
export default function SearchFiltersProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlFilters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const [filters, setOptimisticFilters] = useOptimistic(urlFilters);
  const [isPending, startTransition] = useTransition();

  const value = useMemo(
    () => ({
      filters,
      isPending,
      setFilters: (next: SearchFilters) =>
        startTransition(() => {
          setOptimisticFilters(next);
          const query = withFilters(new URLSearchParams(searchParams), next).toString();
          router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
        }),
    }),
    [filters, isPending, pathname, router, searchParams, setOptimisticFilters],
  );

  return <SearchFiltersContext value={value}>{children}</SearchFiltersContext>;
}
