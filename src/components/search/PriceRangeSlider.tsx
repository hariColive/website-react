"use client";

import { useState } from "react";

import { formatRupees, PRICE_RANGE } from "@/lib/searchFilters";

const MIN_GAP = PRICE_RANGE.step;

type PriceRangeSliderProps = {
  value: [number, number] | null;
  onCommit: (value: [number, number] | null) => void;
};

const thumbClass =
  "pointer-events-none absolute inset-x-0 top-0 h-4 w-full appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#111] [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(0,0,0,0.25)] " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#111]";

// Dual-handle Monthly Rent slider. Dragging only updates the local draft; the search runs when the handle is released.
export default function PriceRangeSlider({ value, onCommit }: PriceRangeSliderProps) {
  const [draft, setDraft] = useState<[number, number] | null>(null);
  const [min, max] = draft ?? value ?? [PRICE_RANGE.min, PRICE_RANGE.max];

  const update = (handle: "min" | "max", next: number) =>
    setDraft(handle === "min" ? [Math.min(next, max - MIN_GAP), max] : [min, Math.max(next, min + MIN_GAP)]);

  const commit = () => {
    if (!draft) return;
    const isFullRange = draft[0] <= PRICE_RANGE.min && draft[1] >= PRICE_RANGE.max;
    onCommit(isFullRange ? null : draft);
    setDraft(null);
  };

  const span = PRICE_RANGE.max - PRICE_RANGE.min;
  const left = ((min - PRICE_RANGE.min) / span) * 100;
  const right = ((max - PRICE_RANGE.min) / span) * 100;

  return (
    <>
      <p className="mb-3.5 text-sm font-bold text-[#111]">
        {formatRupees(min)} — {formatRupees(max)}
      </p>

      <div className="relative mx-1.5 mb-1 h-4">
        <div className="absolute inset-x-0 top-1.5 h-1 rounded-full bg-gray-200" />
        <div className="absolute top-1.5 h-1 rounded-full bg-[#111]" style={{ left: `${left}%`, width: `${right - left}%` }} />

        {(["min", "max"] as const).map((handle) => (
          <input
            key={handle}
            type="range"
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={PRICE_RANGE.step}
            value={handle === "min" ? min : max}
            aria-label={handle === "min" ? "Minimum monthly rent" : "Maximum monthly rent"}
            onChange={(event) => update(handle, Number(event.target.value))}
            onPointerUp={commit}
            onKeyUp={commit}
            onBlur={commit}
            className={thumbClass}
          />
        ))}
      </div>
    </>
  );
}
