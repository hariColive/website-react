"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState, type KeyboardEvent } from "react";

import type { Property } from "@/components/common/properties/PropertyCard";
import {
  getPropertySearchDetails,
  getSuggestions,
  type Suggestions,
} from "@/lib/coliveApi";

const MIN_QUERY_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 150;
const CITY_OPTIONS = [
  "Bengaluru",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Coimbatore",
  "Vellore",
  "Indore",
  "Lucknow",
  "Bhubaneswar",
  "Ahmedabad",
  "Chandigarh",
  "Dehradun",
];

type SearchOption =
  | {
      type: "place";
      key: string;
      location: string;
      title: string;
      subtitle: string;
    }
  | {
      type: "property";
      key: string;
      link: string;
      title: string;
      subtitle: string;
    }
  | {
      type: "local-property";
      key: string;
      propertyId: number;
      location: string;
      title: string;
      subtitle: string;
    };

function toOptions(suggestions: Suggestions | null): SearchOption[] {
  if (!suggestions) return [];

  return [
    ...(suggestions.GoogleSuggestions ?? []).map((place) => ({
      type: "place" as const,
      key: place.PlaceId,
      location: place.DisplayDetails[0]?.Description ?? place.Description,
      title: place.DisplayDetails[0]?.Description ?? place.Description,
      subtitle: place.DisplayDetails[0]?.SubDescription ?? "",
    })),
    ...(suggestions.PropertySuggestions ?? []).map((property) => ({
      type: "property" as const,
      key: property.PropertyLink,
      link: property.PropertyLink,
      title: property.LocationName,
      subtitle: property.Cluster,
    })),
  ];
}

function getLocalCityOptions(query: string): SearchOption[] {
  const normalizedQuery = query.toLowerCase();
  return CITY_OPTIONS.filter((city) => city.toLowerCase().includes(normalizedQuery)).map((city) => ({
    type: "place",
    key: `city-${city}`,
    location: city === "Bengaluru" ? "Bangalore" : city,
    title: city,
    subtitle: "City",
  }));
}

function getFallbackOptions(
  query: string,
  location: string,
  properties: Property[]
): SearchOption[] {
  const normalizedQuery = query.toLowerCase();
  const placeOptions: SearchOption[] = getLocalCityOptions(query);
  const propertyOptions: SearchOption[] = properties
    .filter((property) =>
      [property.PropertyName, property.LocationName, property.City].some(
        (value) => value?.toLowerCase().includes(normalizedQuery)
      )
    )
    .slice(0, 8)
    .flatMap((property): SearchOption[] =>
      property.PropertyID === undefined
        ? []
        : [
            {
              type: "local-property",
              key: `property-${property.PropertyID}`,
              propertyId: property.PropertyID,
              location: property.City || location,
              title: property.PropertyName || "Colive Property",
              subtitle: [property.LocationName, property.City]
                .filter(Boolean)
                .join(", "),
            },
          ]
    );

  return [...placeOptions, ...propertyOptions];
}

export default function SearchHeroSection({
  location = "Bangalore",
}: {
  location?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const trimmedQuery = query.trim();
  const hasMinimumQuery = trimmedQuery.length >= MIN_QUERY_LENGTH;
  const localCityOptions = useMemo(
    () => getLocalCityOptions(trimmedQuery),
    [trimmedQuery]
  );
  const displayOptions = localCityOptions.length > 0 ? localCityOptions : options;
  const showList = open && hasMinimumQuery && displayOptions.length > 0;

  useEffect(() => {
    if (!hasMinimumQuery || localCityOptions.length > 0) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      setIsLoading(true);
      setSearchError(null);

      async function loadOptions() {
        try {
          const suggestions = await getSuggestions(
            trimmedQuery,
            controller.signal
          );
          if (controller.signal.aborted) return;

          const nextOptions = toOptions(suggestions);
          setOptions(nextOptions);
          setActiveIndex(-1);

          if (nextOptions.length === 0) {
            const properties = await getPropertySearchDetails(
              trimmedQuery,
              [],
              controller.signal
            );
            if (controller.signal.aborted) return;
            setOptions(getFallbackOptions(trimmedQuery, location, properties));
          }
        } catch (cause: unknown) {
          if (!controller.signal.aborted) {
            setSearchError(
              cause instanceof Error
                ? cause.message
                : "Unable to load search suggestions."
            );
            setOptions([]);
          }
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      }

      void loadOptions();
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [hasMinimumQuery, localCityOptions.length, location, trimmedQuery]);

  const submitFreeText = () => {
    if (!trimmedQuery) return;
    setOpen(false);
    router.push(`/properties?location=${encodeURIComponent(trimmedQuery)}`);
  };

  const submitSearch = () => {
    if (showList && activeIndex >= 0) {
      selectOption(displayOptions[activeIndex]);
      return;
    }

    const matchingProperty = displayOptions.find(
      (option) =>
        option.type === "local-property" &&
        option.title.toLowerCase() === trimmedQuery.toLowerCase()
    );
    if (matchingProperty) {
      selectOption(matchingProperty);
      return;
    }

    submitFreeText();
  };

  const selectOption = (option: SearchOption) => {
    setOpen(false);

    if (option.type === "property") {
      window.location.href = option.link;
      return;
    }

    if (option.type === "local-property") {
      router.push(
        `/properties?location=${encodeURIComponent(
          option.location
        )}&propertyId=${option.propertyId}`
      );
      return;
    }

    router.push(
      `/properties?location=${encodeURIComponent(option.location)}`
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (
      showList &&
      displayOptions.length > 0 &&
      (event.key === "ArrowDown" || event.key === "ArrowUp")
    ) {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex(
        (index) => (index + step + displayOptions.length) % displayOptions.length
      );
    }
  };

  return (
    <section
      id="searchHeroSection"
      className="bg-white px-[30px] pb-10 pt-[58px] md:px-[30px] md:pt-[58px]"
    >
      <div className="mt-0 max-w-[770px]">
        <h1 className="mb-5 text-[46px] font-black leading-none tracking-[-0.025em] text-black">
          Find a 6-Star Home
        </h1>

        <div className="relative">
          <div className="flex h-[58px] items-center gap-3 rounded-full border border-[#eeeeee] bg-white px-4">
            <i
              className="fa-solid fa-magnifying-glass pl-[2px] text-gray-400"
              aria-hidden="true"
            />

            <input
              type="text"
              id="txtKeywordSearch"
              role="combobox"
              aria-label="Search by property, location, or city"
              aria-autocomplete="list"
              aria-expanded={showList}
              aria-controls={listId}
              aria-activedescendant={
                showList && activeIndex >= 0
                  ? `${listId}-${activeIndex}`
                  : undefined
              }
              autoComplete="off"
              placeholder="Try property name, location name, city name..."
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                setQuery(nextValue);
                setOpen(true);
                if (nextValue.trim().length < MIN_QUERY_LENGTH) {
                  setOptions([]);
                  setIsLoading(false);
                  setSearchError(null);
                  setActiveIndex(-1);
                }
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 border-0 bg-transparent text-gray-700 outline-none placeholder:text-gray-400 focus:ring-0"
            />

            <button
              type="button"
              onClick={submitSearch}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white"
            >
              Search <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </div>

          {showList && (
            <ul
              id={listId}
              role="listbox"
              aria-label="Search suggestions"
              className="keywordSuggestions absolute left-0 right-0 top-[calc(100%+12px)] z-50 max-h-[360px] w-full overflow-y-auto rounded-[18px] border border-[#ececec] bg-white shadow-[0_12px_30px_rgba(17,17,17,0.08)]"
            >
              <li className="keyword-suggestions-heading border-b border-[#f1f1f1] px-4 py-3 text-[13px] font-semibold tracking-[0.02em] text-[#111111]">
                Popular Right Now
              </li>

              {isLoading && (
                <li className="px-4 py-3 text-sm text-gray-500" role="status">
                  Searching...
                </li>
              )}
              {!isLoading && searchError && (
                <li className="px-4 py-3 text-sm text-red-700" role="alert">
                  {searchError}
                </li>
              )}
              {!isLoading && !searchError && displayOptions.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-500">
                  No suggestions found. Press Search to try this text.
                </li>
              )}
              {displayOptions.map((option, index) => {
                const label = option.type === "property" ? "Property" : "Location";
                const isActive = index === activeIndex;

                return (
                  <li
                    key={`${option.type}-${option.key}`}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={isActive}
                    title={[option.title, option.subtitle].filter(Boolean).join(", ")}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`keyword-suggestion-item flex cursor-pointer items-center justify-between gap-3 border-b border-transparent px-4 py-3.5 text-[#111111] transition-colors duration-200 last:border-b-0 hover:bg-[#f5f5f5] ${
                      isActive ? "is-active bg-[#f5f5f5]" : ""
                    }`}
                  >
                    <div className="keyword-suggestion-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-[12px] text-[#4b5563]">
                      <i className="bi bi-house-door-fill" aria-hidden="true" />
                    </div>

                    <div className="keyword-suggestion-text min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-medium leading-5 text-[#111111]">
                        {option.title}
                      </span>
                      {option.subtitle && (
                        <span className="mt-0.5 block truncate text-[12px] leading-4 text-[#767676]">
                          {option.subtitle}
                        </span>
                      )}
                    </div>

                    <div className="keyword-suggestion-type shrink-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#666666]">
                      {label}
                    </div>
                    <span className="sr-only">{label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
