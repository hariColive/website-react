<<<<<<< HEAD

"use client";

import { useId, useState } from "react";

export type RoomFilter = "solo" | "couple" | "shared";
export type PropertySort = "default" | "price_desc" | "price_asc";

=======
"use client";

>>>>>>> origin/QA-master
export type AmenityOption = {
  id: string | number;
  name: string;
};

<<<<<<< HEAD
type PropertyFiltersProps = {
  variant: "desktop" | "mobile";
  roomTypes: RoomFilter[];
  minRent: number | undefined;
  maxRent: number | undefined;
  onRoomTypesChange: (values: RoomFilter[]) => void;
  onMinRentChange: (value: number | undefined) => void;
  onMaxRentChange: (value: number | undefined) => void;

  sort: PropertySort;
  onSortChange: (value: PropertySort) => void;

  radius: number;
  onRadiusChange: (value: number) => void;

  amenities?: AmenityOption[];
  amenitiesLoading?: boolean;
  amenitiesError?: string | null;
  selectedAmenities?: Array<string | number>;
  onAmenitiesChange?: (values: Array<string | number>) => void;

  onClearAll: () => void;
  onApplyFilters?: () => void;
};

const MIN_RENT = 7000;
const MAX_RENT = 30000;
const RENT_STEP = 500;

const roomOptions: Array<{ label: string; value: RoomFilter }> = [
  { label: "Solo", value: "solo" },
  { label: "Couple", value: "couple" },
  { label: "Shared", value: "shared" },
];

const sortOptions: Array<{
  label: string;
  value: PropertySort;
}> = [
  { label: "Default", value: "default" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Price: Low to High", value: "price_asc" },
];

function SortIcon({ type }: { type: "default" | "high" | "low" }) {
  if (type === "default") {
    return (
      <svg width="14" height="14" viewBox="0 0 344.329 344.329" aria-hidden="true">
        <path
          fill="#282C3F"
          d="M277.965 90h-50.8c-2.9-28-18-54-40.1-70h90.9c5.5 0 10-4.5 10-10s-4.5-10-10-10h-211.6c-5.5 0-10 4.5-10 10s4.5 10 10 10h60.6c41.2 0 75.2 31 80.1 70h-140.7c-5.5 0-10 4.5-10 10s4.5 10 10 10h140.7c-5 40.5-39.4 70.9-80.1 71h-60.5c-5.6.1-10.1 4.7-10 10.3 0 2.7 1.2 5.3 3.1 7.2l151.3 143.1c4 3.8 10.3 3.6 14.1-.4 3.8-4.1 3.6-10.4-.4-14.3L91.465 201h35.4c52.2 0 95.3-40 100.3-91h50.8c5.5 0 10-4.5 10-10S283.465 90 277.965 90z"
        />
      </svg>
    );
  }

  return type === "high" ? (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none">
        <path d="M0 0h24v24H0z" opacity=".05" />
        <path
          fill="#282C3F"
          d="M4 6.215h4.962v2.43H4.505L4.13 9.858h4.764a3.05 3.05 0 0 1-.827 1.539 2.99 2.99 0 0 1-2.022.895l-1.361-.003a.304.304 0 0 0-.214.519l6.717 6.779 1.697-.004-6.107-6.16a4.193 4.193 0 0 0 2.14-1.167 4.256 4.256 0 0 0 1.198-2.398h2.474l.376-1.215h-2.799v-2.43h3.496V5H4v1.215zm12.389 10.028h1.337l-1.337 1.354v-1.354zm-.818 3.309c.23.09.488.04.663-.127l3.312-3.326a.567.567 0 0 0 0-.828.627.627 0 0 0-.574-.152H16.39v-5.043a.571.571 0 0 0-.58-.585.587.587 0 0 0-.587.597v8.935c0 .237.12.439.35.529z"
        />
      </g>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none">
        <path d="M0 0h24v24H0z" opacity=".05" />
        <path
          fill="#282C3F"
          d="M4 6.136h4.637v2.272H4.472l-.351 1.135h4.45a2.855 2.855 0 0 1-.772 1.44c-.51.514-1.177.81-1.888.836H5.91l-1.272-.002c-.25-.001-.377.305-.2.484l6.276 6.338 1.586-.002-5.706-5.76a3.92 3.92 0 0 0 2-1.092 3.984 3.984 0 0 0 1.119-2.242h2.311l.352-1.135H9.76V6.136h3.267V5H4v1.136zm12.626.733l1.249 1.265h-1.25V6.869zm-1.09-1.333v8.35c0 .3.232.557.548.557a.534.534 0 0 0 .542-.547V9.184h2.414a.586.586 0 0 0 .537-.143.53.53 0 0 0-.001-.773L16.48 5.161a.585.585 0 0 0-.62-.12.508.508 0 0 0-.326.495z"
        />
      </g>
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" opacity=".05" />
        <path
          fill="#282C3F"
          d="M3.749 7.508a.75.75 0 0 1 0-1.5h3.138a2.247 2.247 0 0 1 4.243 0h9.121a.75.75 0 0 1 0 1.5h-9.126a2.248 2.248 0 0 1-4.232 0H3.749zm13.373 9h3.129a.75.75 0 0 1 0 1.5h-3.135a2.247 2.247 0 0 1-4.231 0H3.749a.75.75 0 0 1 0-1.5h9.13a2.248 2.248 0 0 1 4.243 0z"
        />
      </g>
    </svg>
  );
}

function SortByIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" opacity=".05" />
        <path
          fill="#282C3F"
          d="M7.445 7.48V5.672L5.665 7.48h1.78zm1.09-4.42c.304.12.465.39.465.706v16.437a.784.784 0 0 1-.783.797.762.762 0 0 1-.772-.781V8.982H4.003a.832.832 0 0 1-.765-.204.759.759 0 0 1 .002-1.105L7.652 3.23a.832.832 0 0 1 .882-.17zm8.02 15.269 1.78-1.81h-1.78v1.81zm4.207-3.107a.76.76 0 0 1-.002 1.106l-4.412 4.442a.832.832 0 0 1-.882.17c-.305-.12-.466-.39-.466-.706V3.797c0-.432.332-.797.783-.797.45 0 .772.35.772.781v11.237h3.442a.833.833 0 0 1 .765.204z"
        />
      </g>
    </svg>
  );
}

function RentRangeControl({
  minRent,
  maxRent,
  onMinRentChange,
  onMaxRentChange,
}: {
  minRent: number | undefined;
  maxRent: number | undefined;
  onMinRentChange: (value: number | undefined) => void;
  onMaxRentChange: (value: number | undefined) => void;
}) {
  const minValue = Math.min(
    Math.max(minRent ?? MIN_RENT, MIN_RENT),
    MAX_RENT
  );
  const maxValue = Math.min(
    Math.max(maxRent ?? MAX_RENT, minValue),
    MAX_RENT
  );
  const range = MAX_RENT - MIN_RENT;

  const fillStyle = {
    left: `${((minValue - MIN_RENT) / range) * 100}%`,
    right: `${((MAX_RENT - maxValue) / range) * 100}%`,
  };

  const inputClasses =
    "pointer-events-none absolute inset-x-0 top-0 m-0 h-4 w-full appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black [-webkit-appearance:none] [&::-webkit-slider-runnable-track]:h-4 [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:h-4 [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#111111] [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.25)] [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#111111] [&::-moz-range-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.25)]";

  const changeMin = (value: number) => {
    const next = Math.min(value, maxValue);
    onMinRentChange(next === MIN_RENT ? undefined : next);
  };

  const changeMax = (value: number) => {
    const next = Math.max(value, minValue);
    onMaxRentChange(next === MAX_RENT ? undefined : next);
  };

  return (
    <>
      <div className="mb-[14px] text-sm font-bold text-[#111111]">
        ₹{minValue.toLocaleString("en-IN")} — ₹
        {maxValue.toLocaleString("en-IN")}
      </div>

      <div className="relative mx-[6px] mb-1 h-4">
        <div className="absolute inset-x-0 top-[6px] h-1 rounded-full bg-[#e5e7eb]" />
        <div
          className="absolute top-[6px] h-1 rounded-full bg-[#111111]"
          style={fillStyle}
        />
        <input
          type="range"
          min={MIN_RENT}
          max={MAX_RENT}
          step={RENT_STEP}
          value={minValue}
          onChange={(event) => changeMin(Number(event.currentTarget.value))}
          className={inputClasses}
          aria-label="Minimum monthly rent"
        />
        <input
          type="range"
          min={MIN_RENT}
          max={MAX_RENT}
          step={RENT_STEP}
          value={maxValue}
          onChange={(event) => changeMax(Number(event.currentTarget.value))}
          className={inputClasses}
          aria-label="Maximum monthly rent"
        />
      </div>
    </>
  );
=======
export type RoomFilter = "solo" | "shared" | "couple";
export type PropertySort = "default" | "price_asc" | "price_desc";

type PropertyFiltersProps = {
  variant: "mobile" | "desktop";
  roomTypes: RoomFilter[];
  minRent: number | undefined;
  maxRent: number | undefined;
  onRoomTypesChange: (value: RoomFilter[]) => void;
  onMinRentChange: (value: number | undefined) => void;
  onMaxRentChange: (value: number | undefined) => void;
  sort: PropertySort;
  onSortChange: (value: PropertySort) => void;
  radius: number;
  onRadiusChange: (value: number) => void;
  amenities: AmenityOption[];
  amenitiesLoading?: boolean;
  amenitiesError?: string | null;
  selectedAmenities?: Array<string | number>;
  onAmenitiesChange?: (value: Array<string | number>) => void;
  onClearAll?: () => void;
  onApplyFilters?: () => void;
};

const ROOM_OPTIONS: { value: RoomFilter; label: string }[] = [
  { value: "solo", label: "Private room" },
  { value: "shared", label: "Shared room" },
  { value: "couple", label: "Couple room" },
];

function updateRoomTypes(
  current: RoomFilter[],
  value: RoomFilter,
  checked: boolean
): RoomFilter[] {
  return checked
    ? [...current, value]
    : current.filter((roomType) => roomType !== value);
>>>>>>> origin/QA-master
}

export default function PropertyFilters({
  variant,
  roomTypes,
  minRent,
  maxRent,
  onRoomTypesChange,
  onMinRentChange,
  onMaxRentChange,
  sort,
  onSortChange,
  radius,
  onRadiusChange,
<<<<<<< HEAD
  amenities = [],
  amenitiesLoading = false,
  amenitiesError = null,
=======
  amenities,
  amenitiesLoading = false,
  amenitiesError,
>>>>>>> origin/QA-master
  selectedAmenities = [],
  onAmenitiesChange,
  onClearAll,
  onApplyFilters,
}: PropertyFiltersProps) {
<<<<<<< HEAD
  const [mobilePanel, setMobilePanel] = useState<"filter" | "sort" | null>(
    null
  );
  const id = useId();

  const toggleRoom = (value: RoomFilter, checked: boolean) => {
    onRoomTypesChange(
      checked
        ? [...roomTypes, value]
        : roomTypes.filter((item) => item !== value)
    );
  };

  const toggleAmenity = (value: string | number, checked: boolean) => {
    if (!onAmenitiesChange) return;

    onAmenitiesChange(
      checked
        ? [...selectedAmenities, value]
        : selectedAmenities.filter((item) => item !== value)
    );
  };

  const filterFields = (
    <div className="space-y-5 px-3 py-4 md:px-4">
      <fieldset>
        <legend className="mb-3 block text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
          Room Type
        </legend>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((room) => (
            <label key={room.value} className="cursor-pointer">
              <input
                type="checkbox"
                name={`${id}-room-type`}
                value={room.value}
                className="peer sr-only"
                checked={roomTypes.includes(room.value)}
                onChange={(event) =>
                  toggleRoom(room.value, event.currentTarget.checked)
                }
              />
              <span className="inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] transition-colors peer-checked:border-[#111111] peer-checked:bg-[#111111] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black">
                {room.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 block text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
          Monthly Rent
        </legend>
        <RentRangeControl
          minRent={minRent}
          maxRent={maxRent}
          onMinRentChange={onMinRentChange}
          onMaxRentChange={onMaxRentChange}
        />
      </fieldset>

      <fieldset>
        <legend className="mb-3 block text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
          Location Radius
        </legend>
        <div className="flex flex-wrap gap-2">
          {[5, 10, 25, 0].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onRadiusChange(value)}
              aria-pressed={radius === value}
              className={`inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                radius === value
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#cbd5e1]"
              }`}
            >
              {value === 0 ? "Any" : `${value} km`}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 block text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
          Amenities
        </legend>
        <div className="flex max-h-[200px] flex-col gap-1 overflow-y-scroll">
          {amenities.map((amenity) => (
            <label
              key={amenity.id}
              className="flex cursor-pointer items-center gap-2 py-1 text-[13px] text-[#374151]"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity.id)}
                onChange={(event) =>
                  toggleAmenity(amenity.id, event.currentTarget.checked)
                }
                className="h-4 w-4 cursor-pointer rounded border-[#d1d5db] accent-[#111111]"
              />
              <span>{amenity.name}</span>
            </label>
          ))}
          {amenitiesLoading && (
            <p className="text-xs text-gray-500">Loading amenities...</p>
          )}
          {amenitiesError && (
            <p className="text-xs text-red-700" role="alert">
              {amenitiesError}
            </p>
          )}
          {!amenitiesLoading && !amenitiesError && amenities.length === 0 && (
            <p className="text-xs text-gray-400">
              No amenity options have been supplied.
            </p>
          )}
        </div>
      </fieldset>
    </div>
  );

  if (variant === "desktop") {
    return (
      <aside
        id="search-property-filter"
        className="hidden h-fit w-full border border-[#eeeeee] rounded-lg bg-white min-[769px]:block"
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#e0e6ed] px-[15px] pb-[10px] pt-[14px]">
          <h3 className="m-0 flex items-center gap-2 text-base font-bold text-[#111111]">
            <span aria-hidden="true">
              <SlidersIcon />
            </span>
            Filters
          </h3>
          <button
            type="button"
            onClick={onClearAll}
            className="cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-[#6b7280] underline decoration-1 underline-offset-2 hover:text-[#111111]"
          >
            Clear All
          </button>
        </div>
        {filterFields}
      </aside>
    );
  }

  return (
    <section className="w-full min-[769px]:hidden">
      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          id="mobileSorting"
          onClick={() =>
            setMobilePanel((current) => (current === "sort" ? null : "sort"))
          }
          aria-expanded={mobilePanel === "sort"}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#e5e7eb] bg-white px-3 text-sm font-medium text-[#282C3F]"
        >
          <SortByIcon />
          Sort By
        </button>

        <button
          type="button"
          id="mobileFitlerby"
          onClick={() =>
            setMobilePanel((current) =>
              current === "filter" ? null : "filter"
            )
          }
          aria-expanded={mobilePanel === "filter"}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#e5e7eb] bg-white px-3 text-sm font-medium text-[#282C3F]"
        >
          <SlidersIcon />
          Filter
        </button>
      </div>

      {mobilePanel === "filter" && (
        <div className="mt-3 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
            <h3 className="text-base font-bold text-[#111111]">Filters</h3>
            <button
              type="button"
              onClick={() => setMobilePanel(null)}
              aria-label="Close filters"
              className="text-xl leading-none text-[#282C3F]"
            >
              ×
            </button>
          </div>
          {filterFields}
          <div className="flex items-center justify-between border-t border-[#e5e7eb] px-4 py-3">
            <button
              type="button"
              onClick={onClearAll}
              className="pt-[6px] text-sm font-medium text-[#282C3F] underline underline-offset-2"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => {
                onApplyFilters?.();
                setMobilePanel(null);
              }}
              className="border-0 bg-transparent px-2 py-2 text-sm font-semibold text-[#ef0075]"
            >
              Show Properties
            </button>
          </div>
        </div>
      )}

      {mobilePanel === "sort" && (
        <div className="property_rightview mt-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="SortTitle text-sm font-semibold text-[#282C3F]">
              Sort by:{" "}
              <span>
                {sortOptions.find((option) => option.value === sort)?.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobilePanel(null)}
              aria-label="Close sorting"
              className="text-xl leading-none text-[#282C3F]"
            >
              ×
            </button>
          </div>

          <ul className="sort-list m-0 list-none border-t border-[#d6d6d6] p-0 pt-3">
            {sortOptions.map((option) => {
              const iconType =
                option.value === "default"
                  ? "default"
                  : option.value === "price_desc"
                    ? "high"
                    : "low";

              return (
                <li key={option.value} className="py-2">
                  <label className="sort-label flex cursor-pointer items-center gap-3 text-sm text-[#282C3F]">
                    <input
                      type="radio"
                      name={`${id}-property-sort`}
                      value={option.value}
                      checked={sort === option.value}
                      onChange={() => {
                        onSortChange(option.value);
                        setMobilePanel(null);
                      }}
                      className="accent-[#ef0075]"
                    />
                    <SortIcon type={iconType} />
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
=======
  const toggleAmenity = (id: string | number, checked: boolean) => {
    if (!onAmenitiesChange) return;
    onAmenitiesChange(
      checked
        ? [...selectedAmenities, id]
        : selectedAmenities.filter((selectedId) => selectedId !== id)
    );
  };

  return (
    <aside
      className={`h-fit rounded-xl border border-gray-200 bg-white p-4 ${
        variant === "mobile" ? "w-full" : "w-full"
      }`}
      aria-label="Property filters"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-medium text-[#2B001F] underline"
          >
            Clear all
          </button>
        )}
      </div>

      <fieldset className="border-b border-gray-100 pb-4">
        <legend className="mb-2 text-sm font-semibold text-gray-800">
          Room type
        </legend>
        <div className="space-y-2">
          {ROOM_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={roomTypes.includes(value)}
                onChange={(event) =>
                  onRoomTypesChange(
                    updateRoomTypes(roomTypes, value, event.target.checked)
                  )
                }
                className="accent-[#2B001F]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-b border-gray-100 py-4">
        <legend className="mb-2 text-sm font-semibold text-gray-800">
          Monthly rent
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-gray-600">
            Minimum
            <input
              type="number"
              min="0"
              value={minRent ?? ""}
              onChange={(event) =>
                onMinRentChange(
                  event.target.value === "" ? undefined : Number(event.target.value)
                )
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm text-gray-900"
            />
          </label>
          <label className="text-xs text-gray-600">
            Maximum
            <input
              type="number"
              min="0"
              value={maxRent ?? ""}
              onChange={(event) =>
                onMaxRentChange(
                  event.target.value === "" ? undefined : Number(event.target.value)
                )
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm text-gray-900"
            />
          </label>
        </div>
      </fieldset>

      <label className="block border-b border-gray-100 py-4 text-sm font-semibold text-gray-800">
        Sort by price
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as PropertySort)}
          className="mt-2 w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-normal text-gray-900"
        >
          <option value="default">Recommended</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </label>

      <label className="block border-b border-gray-100 py-4 text-sm font-semibold text-gray-800">
        Distance
        <select
          value={radius}
          onChange={(event) => onRadiusChange(Number(event.target.value))}
          className="mt-2 w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-normal text-gray-900"
        >
          <option value={0}>Any distance</option>
          <option value={1}>Within 1 km</option>
          <option value={3}>Within 3 km</option>
          <option value={5}>Within 5 km</option>
          <option value={10}>Within 10 km</option>
        </select>
      </label>

      <fieldset className="pt-4">
        <legend className="mb-2 text-sm font-semibold text-gray-800">
          Amenities
        </legend>
        {amenitiesLoading ? (
          <p className="text-sm text-gray-500">Loading amenities…</p>
        ) : amenitiesError ? (
          <p className="text-sm text-red-700" role="alert">
            {amenitiesError}
          </p>
        ) : amenities.length > 0 ? (
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {amenities.map(({ id, name }) => (
              <label key={id} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(id)}
                  onChange={(event) => toggleAmenity(id, event.target.checked)}
                  className="accent-[#2B001F]"
                />
                {name}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No amenities available.</p>
        )}
      </fieldset>

      {variant === "mobile" && onApplyFilters && (
        <button
          type="button"
          onClick={onApplyFilters}
          className="mt-4 w-full rounded-lg bg-[#2B001F] px-4 py-3 text-sm font-semibold text-white"
        >
          Apply filters
        </button>
      )}
    </aside>
>>>>>>> origin/QA-master
  );
}
