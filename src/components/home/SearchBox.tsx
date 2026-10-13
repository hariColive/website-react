"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { FaArrowRight, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

import { getPlaceSearchUrl, getSuggestions, type Suggestions } from "@/lib/coliveApi";

const MIN_QUERY_LENGTH = 3;

const cityChips = [
  { label: "Marathahalli", href: "/bangalore/pg-in-marathahalli" },
  { label: "Whitefield", href: "/bangalore/pg-in-whitefield" },
  { label: "Koramangala", href: "/bangalore/central/pg-in-koramangala" },
  { label: "Pune", href: "/pune" },
  { label: "Mumbai", href: "/pg-in-mumbai" },
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

export default function SearchBox() {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmed = query.trim();
  const showList = open && trimmed.length >= MIN_QUERY_LENGTH && options.length > 0;

  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      getSuggestions(trimmed, controller.signal)
        .then((data) => {
          setOptions(data ? toOptions(data) : []);
          setActiveIndex(-1);
        })
        .catch((error) => {
          if (!controller.signal.aborted) console.error(error);
        });
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  const submitFreeText = () => {
    if (trimmed) router.push(`/search?loc=${encodeURIComponent(trimmed)}`);
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
    } catch (error) {
      console.error(error);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (showList && activeIndex >= 0) selectOption(options[activeIndex]);
      else submitFreeText();
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (showList && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + options.length) % options.length);
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
            setQuery(event.target.value);
            setOpen(true);
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
          className={`absolute top-[calc(100%+10px)] right-0 left-0 z-20 max-h-80 overflow-y-auto rounded-[18px] border border-gray-200 bg-white p-2 text-left shadow-[0_12px_32px_rgba(0,0,0,0.1)] ${showList ? "" : "hidden"}`}
        >
          {options.map((option, index) => (
            <li
              key={option.key}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              title={`${option.title}, ${option.subtitle}`}
              // Prevent the input blur from closing the list before the click lands
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-[#111] ${index === activeIndex ? "bg-zinc-100" : ""}`}
            >
              {option.type === "property" && (
                <Image src="/images/home/building.svg" alt="" width={18} height={18} className="size-4.5 shrink-0" />
              )}
              <span className="min-w-0 flex-1 truncate">
                {option.type === "place" ? <b>{option.title}</b> : option.title}
                {option.type === "place" ? (
                  `, ${option.subtitle}`
                ) : (
                  <span className="ml-1.5 text-[12.5px] text-gray-400">{option.subtitle}</span>
                )}
              </span>
            </li>
          ))}
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
