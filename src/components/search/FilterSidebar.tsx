"use client";

import { useState, type ReactNode } from "react";
import { FaChevronDown, FaSlidersH } from "react-icons/fa";

import { RADIUS_OPTIONS, ROOM_TYPES, toSlug, type SearchFilters } from "@/lib/searchFilters";

import PriceRangeSlider from "./PriceRangeSlider";
import { useSearchFilters } from "./SearchFiltersProvider";

const EMPTY_FILTERS: SearchFilters = { sharingTypes: [], amenities: [], price: null, radius: 0 };

const pillClass = (active: boolean) =>
  `inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
    active ? "border-[#111] bg-[#111] text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
  }`;

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="mb-5 last:mb-0">
      <legend className="mb-3 text-[13px] font-medium tracking-[0.06em] text-gray-400">{label}</legend>
      {children}
    </fieldset>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-0.5 text-[13px] text-gray-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 shrink-0 cursor-pointer accent-[#111]" />
      {label}
    </label>
  );
}

export default function FilterSidebar({ amenities }: { amenities: { Id: number; Name: string }[] }) {
  const { filters, setFilters } = useSearchFilters();
  // Collapsed by default on mobile, where the panel would otherwise push the results below the fold
  const [open, setOpen] = useState(false);

  const update = (patch: Partial<SearchFilters>) => setFilters({ ...filters, ...patch });

  return (
    <div className="border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 md:px-4">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="search-filters"
          className="flex items-center gap-2 text-base font-bold text-[#111] md:pointer-events-none"
        >
          <FaSlidersH aria-hidden="true" className="text-sm text-gray-500" />
          Filters
          <FaChevronDown aria-hidden="true" className={`text-xs text-gray-400 transition-transform md:hidden ${open ? "rotate-180" : ""}`} />
        </button>

        <button
          type="button"
          onClick={() => setFilters(EMPTY_FILTERS)}
          className="cursor-pointer text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-[#111]"
        >
          Clear All
        </button>
      </div>

      <div id="search-filters" className={`px-3 py-3 md:block md:px-4 md:py-4 ${open ? "" : "hidden"}`}>
        <FilterGroup label="Room Type">
          <div className="flex flex-wrap gap-2">
            {ROOM_TYPES.map((type) => (
              <label key={type.slug}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={filters.sharingTypes.includes(type.slug)}
                  onChange={() => update({ sharingTypes: toggle(filters.sharingTypes, type.slug) })}
                />
                <span className={`${pillClass(filters.sharingTypes.includes(type.slug))} peer-focus-visible:ring-2 peer-focus-visible:ring-[#111]/30`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Monthly Rent">
          <PriceRangeSlider value={filters.price} onCommit={(price) => update({ price })} />
        </FilterGroup>

        <FilterGroup label="Location Radius">
          <div className="flex flex-wrap gap-2">
            {[...RADIUS_OPTIONS, 0].map((radius) => (
              <label key={radius}>
                <input
                  type="radio"
                  name="location-radius"
                  className="peer sr-only"
                  checked={filters.radius === radius}
                  onChange={() => update({ radius })}
                />
                <span className={`${pillClass(filters.radius === radius)} peer-focus-visible:ring-2 peer-focus-visible:ring-[#111]/30`}>
                  {radius ? `${radius} Km` : "Any"}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Amenities">
          <div className="flex max-h-50 flex-col gap-1 overflow-y-auto">
            <Checkbox label="Any" checked={filters.amenities.length === 0} onChange={() => update({ amenities: [] })} />
            {amenities.map((amenity) => {
              const slug = toSlug(amenity.Name);
              return (
                <Checkbox
                  key={amenity.Id}
                  label={amenity.Name}
                  checked={filters.amenities.includes(slug)}
                  onChange={() => update({ amenities: toggle(filters.amenities, slug) })}
                />
              );
            })}
          </div>
        </FilterGroup>
      </div>
    </div>
  );
}
