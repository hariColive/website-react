import { resultsLayoutClass } from "./SearchResults";

export default function SearchResultsSkeleton() {
  return (
    <div className={resultsLayoutClass} aria-busy="true" aria-label="Loading homes">
      <div className="hidden h-120 animate-pulse border border-gray-200 bg-gray-50 md:block" />
      <div className="md:hidden h-13 animate-pulse border border-gray-200 bg-gray-50" />

      <div>
        <div className="mb-1 h-6 w-24 animate-pulse rounded bg-gray-100" />
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="mt-5 animate-pulse border border-gray-200 bg-[#f2f0ec]">
              <div className="aspect-34/25 bg-gray-200" />
              <div className="h-19" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
