"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState, type KeyboardEvent } from "react";
import { FaArrowRight, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

import {
  getPlaceSearchUrl,
  getPropertySearchDetails,
  getSuggestions,
  type Suggestions,
} from "@/lib/coliveApi";

const MIN_QUERY_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 150;

const cityChips = [
  {
    label: "Marathahalli",
    location: "Marathahalli",
    href: "/bangalore/pg-in-marathahalli",
  },
  {
    label: "Whitefield",
    location: "Whitefield",
    href: "/bangalore/pg-in-whitefield",
  },
  {
    label: "Koramangala",
    location: "Koramangala",
    href: "/bangalore/pg-in-koramangala",
  },
  { label: "Pune", location: "Pune", href: "/pg-in-pune" },
  { label: "Mumbai", location: "Mumbai", href: "/pg-in-mumbai" },
];

type Option =
  | { type: "place"; key: string; description: string; title: string; subtitle: string }
  | { type: "property"; key: string; link: string; title: string; subtitle: string };

const toOptions = ({ GoogleSuggestions, PropertySuggestions }: Suggestions): Option[] => [
  ...GoogleSuggestions.map((place): Option => ({
    type: "place",
    key: place.PlaceId,
    description: place.Description,
    title: place.DisplayDetails[0]?.Description ?? place.Description,
    subtitle: place.DisplayDetails[0]?.SubDescription ?? "",
  })),
  ...PropertySuggestions.map((property): Option => ({
    type: "property",
    key: property.PropertyLink,
    link: property.PropertyLink,
    title: property.LocationName,
    subtitle: property.Cluster,
  })),
];

function getLocalCityOptions(query: string): Option[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return cityChips
    .filter(({ label }) => label.toLowerCase().includes(normalized))
    .slice(0, 5)
    .map(({ label }) => ({
      type: "place",
      key: `city-${label}`,
      description: label,
      title: label,
      subtitle: "City",
    }));
}

export default function SearchBox() {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmed = query.trim();
  const localOptions = useMemo(() => getLocalCityOptions(trimmed), [trimmed]);
  const displayOptions = localOptions.length > 0 ? localOptions : options;
  const showList = open && trimmed.length >= MIN_QUERY_LENGTH && displayOptions.length > 0;

  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH || localOptions.length > 0) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      getSuggestions(trimmed, controller.signal)
        .then(async (data) => {
          if (controller.signal.aborted) return;

          const nextOptions = data ? toOptions(data) : [];
          if (nextOptions.length > 0) {
            setOptions(nextOptions);
            setActiveIndex(-1);
            return;
          }

          try {
            const properties = await getPropertySearchDetails(
              trimmed,
              [],
              controller.signal
            );
            if (controller.signal.aborted) return;

            const propertyOptions = properties
              .filter((property) => property.PropertyName || property.LocationName)
              .slice(0, 5)
              .map((property) => ({
                type: "property" as const,
                key: `property-${property.PropertyID ?? property.LocationName ?? property.PropertyName ?? trimmed}`,
                link: property.Link ?? `/search?location=${encodeURIComponent(property.City || trimmed)}`,
                title: property.PropertyName || property.LocationName || "Colive Property",
                subtitle: [property.LocationName, property.City]
                  .filter(Boolean)
                  .join(", "),
              }));

            setOptions(propertyOptions);
            setActiveIndex(-1);
          } catch (fallbackError: unknown) {
            if (!controller.signal.aborted) {
              console.error(fallbackError);
              setOptions([]);
            }
          }
        })
        .catch((error: unknown) => {
          if (!controller.signal.aborted) console.error(error);
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed, localOptions.length]);

  const submitFreeText = () => {
    if (trimmed) router.push(`/search?location=${encodeURIComponent(trimmed)}`);
  };

  const selectOption = async (option: Option) => {
    setOpen(false);
    if (option.type === "property") {
      window.location.href = option.link;
      return;
    }
    try {
      const url = await getPlaceSearchUrl(option.description);
      if (url) router.push(url);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (showList && activeIndex >= 0) selectOption(displayOptions[activeIndex]);
      else submitFreeText();
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (showList && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + displayOptions.length) % displayOptions.length);
    }
  };

  return (
    <>
      <div className="relative mx-auto flex max-w-180 items-center gap-3 rounded-full border border-gray-200 bg-white py-1.25 pr-2.5 pl-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] sm:py-2 sm:pr-2 sm:pl-6.5">
        <FaSearch aria-hidden="true" className="shrink-0 text-[15px] text-gray-400" />

        <input
          type="text"
          role="combobox"
          aria-label="Search Colive"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={showList && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          placeholder="Try Whitefield, Couple room, Meals, Gilbert..."
          value={query}
          onChange={(event) => {
            const nextValue = event.target.value;
            setQuery(nextValue);
            setOpen(true);
            if (nextValue.trim().length < MIN_QUERY_LENGTH) {
              setOptions([]);
              setActiveIndex(-1);
            }
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent py-2 text-[15.5px] text-[#111] outline-none placeholder:text-gray-400 sm:py-3.5"
        />

        <button
          type="button"
          onClick={submitFreeText}
          aria-label="Search"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111] text-[14.5px] font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#333] sm:size-auto sm:px-6.5 sm:py-3.5"
        >
          <span className="hidden sm:inline">Search</span>
          <FaArrowRight aria-hidden="true" />
        </button>

        <ul
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className={`keywordSuggestions absolute top-[calc(100%+12px)] right-0 left-0 z-50 max-h-[360px] overflow-y-auto rounded-[18px] border border-[#ececec] bg-white shadow-[0_12px_30px_rgba(17,17,17,0.08)] ${showList ? "" : "hidden"}`}
        >
          <li className="keyword-suggestions-heading border-b border-[#f1f1f1] px-4 py-3 text-[13px] font-semibold tracking-[0.02em] text-[#111111]">
            Popular Right Now
          </li>

          {displayOptions.map((option, index) => {
            const label = option.type === "property" ? "Property" : "Location";
            const isActive = index === activeIndex;

            return (
              <li
                key={option.key}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isActive}
                title={`${option.title}, ${option.subtitle}`}
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
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
        {cityChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => router.push(chip.href)}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-[12.5px] text-gray-700 transition-colors hover:border-[#111] hover:text-[#111] sm:px-4.5 sm:py-2.5 sm:text-[13.5px]"
          >
            <FaMapMarkerAlt aria-hidden="true" className="text-xs text-gray-400" />
            {chip.label}
          </button>
        ))}
      </div>
    </>
  );
}
