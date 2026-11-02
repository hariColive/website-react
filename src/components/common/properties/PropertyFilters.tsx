"use client";

export type AmenityOption = {
  id: string | number;
  name: string;
};

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
  amenities,
  amenitiesLoading = false,
  amenitiesError,
  selectedAmenities = [],
  onAmenitiesChange,
  onClearAll,
  onApplyFilters,
}: PropertyFiltersProps) {
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
  );
}
