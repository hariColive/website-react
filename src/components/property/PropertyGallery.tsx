"use client";

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaImages, FaStar, FaTimes } from "react-icons/fa";
import { Md360 } from "react-icons/md";

import type { PropertyDetails } from "@/lib/propertyDetails";

import PropertyImage from "./PropertyImage";

type PropertyGalleryProps = Pick<PropertyDetails, "name" | "images" | "tourUrl" | "isGold">;

const GRID_SIZE = 5;

export default function PropertyGallery({ name, images, tourUrl, isGold }: PropertyGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const [main, ...rest] = images;
  const tiles = rest.slice(0, GRID_SIZE - 1);

  const count = images.length;
  const step = (delta: number) => setOpen((index) => (index === null ? index : (index + delta + count) % count));
  const isOpen = open !== null;

  // Keyboard navigation and scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (delta) setOpen((index) => (index === null ? index : (index + delta + count) % count));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, count]);

  if (!main) {
    return (
      <div className="relative aspect-3/2 overflow-hidden bg-gray-100">
        <PropertyImage alt={name} fill preload sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div>
          <div className="relative aspect-3/2 overflow-hidden bg-gray-100">
            <button type="button" onClick={() => setOpen(0)} className="absolute inset-0 cursor-zoom-in" aria-label="View photos">
              <PropertyImage src={main.thumb} alt={main.alt} fill preload sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </button>

            {isGold && (
              <span className="absolute top-0 right-6 flex h-24 w-20 flex-col items-center justify-center gap-1 bg-linear-to-b from-[#f5d76e] to-[#c9a227] text-[#5a4300] shadow-md">
                <FaStar aria-hidden="true" />
                <span className="text-xl">Gold</span>
              </span>
            )}

            {tourUrl && (
              <a
                href={tourUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-4 bottom-4 flex size-17 flex-col items-center justify-center rounded-full border-2 border-white/70 bg-black/75 text-xs font-medium text-white transition-colors hover:bg-black"
              >
                Explore
                <Md360 aria-hidden="true" className="text-xl" />
              </a>
            )}
          </div>
          <p className="mt-2 text-[15px] text-[#111]">Shot on location · {name}</p>
        </div>

        {tiles.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {tiles.map((image, index) => {
              const isLast = index === tiles.length - 1 && images.length > GRID_SIZE;
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setOpen(index + 1)}
                  className="relative aspect-3/2 cursor-zoom-in overflow-hidden bg-gray-100"
                >
                  <PropertyImage src={image.thumb} alt={image.alt} fill sizes="25vw" className="object-cover" />
                  {isLast && (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 text-base font-bold text-white">
                      <FaImages aria-hidden="true" className="text-2xl" />
                      View {images.length}+ Photos
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${name} photos`} className="fixed inset-0 z-100 flex items-center justify-center bg-black/90">
          <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 p-2 text-2xl text-white">
            <FaTimes aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 p-3 text-3xl text-white md:left-6 hover:cursor-pointer">
            <FaChevronLeft aria-hidden="true" />
          </button>

          <figure className="relative h-[75vh] w-[85vw]">
            <PropertyImage src={images[open].src} alt={images[open].alt} fill sizes="85vw" className="object-contain" />
            <figcaption className="absolute -bottom-9 w-full text-center text-sm text-white/80">
              {images[open].type} · {open + 1} / {images.length}
            </figcaption>
          </figure>

          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 p-3 text-3xl text-white md:right-6 hover:cursor-pointer">
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
