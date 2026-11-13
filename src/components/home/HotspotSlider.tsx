"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type Hotspot = {
  name: string;
  tag: string;
  description: string;
  city: string;
  image: string;
  href: string;
  // Property pages open in a new tab unless set to "_self"
  target?: "_blank" | "_self";
};

const HOTSPOTS: Hotspot[] = [
  {
    name: "Gilbert",
    tag: "Coliving",
    description:
      "Colive Gilbert offers fully furnished rooms with modern interiors, high-speed WiFi, and dedicated workspaces that make it easy to...",
    city: "Bangalore",
    image: "/images/home/hotspot/gilbert.jpg",
    href: "/bangalore/pg-in-whitefield/colive-1256-gilbert/colive_ppm_57258",
  },
  {
    name: "Lakeside",
    tag: "Premium twin-tower coliving",
    description:
      "Perfectly situated in the serene hub of Yelahanka, Colive Lakeside offers effortless connectivity to Manyata Tech Park...",
    city: "Bangalore",
    image: "/images/home/hotspot/lakeside.png",
    href: "/bangalore/pg-in-yelahanka/colive-1284-lakeside-/colive_ppm_57336",
  },
  {
    name: "The Hang",
    tag: "A hub for builders, founders & creators",
    description:
      "Perfectly positioned in the heart of Bangalore's IT corridor, Colive Gateway offers unmatched proximity to major tech...",
    city: "Bangalore",
    image: "/images/home/hotspot/the-hang.jpg",
    href: "/bangalore/pg-in-krpuram/colive-1314-gateway/colive_ppm_57344",
  },
  {
    name: "Signature Towers",
    tag: "Premium twin-tower coliving",
    description:
      "With thoughtfully personalized & crafted luxury Colive Signature Towers Prime Plus combines - urban design sensibilities...",
    city: "Bangalore",
    image: "/images/home/hotspot/signature-towers.jpg",
    href: "/bangalore/pg-in-mahadevapura/colive-179-signature-towers/colive_179",
  },
];

const navButtonClass =
  "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-2xl text-white transition-transform duration-200 hover:scale-105 md:size-13";

// Matches the Swiper breakpoints below so the fallback doesn't jump when the slider takes over
const fallbackCardClass = "w-[87%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc((100%-80px)/3)]";

function HotspotCard({ hotspot }: { hotspot: Hotspot }) {
  return (
    // Top padding leaves room for the tag, which sits across the image's top edge
    <article className="flex h-full flex-col pt-6">
      <div className="relative aspect-video">
        <Image
          src={hotspot.image}
          alt={`Colive ${hotspot.name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 87vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent to-50%" />

        <span className="absolute top-0 left-1/2 max-w-[90%] -translate-x-1/2 -translate-y-1/2 truncate rounded-full bg-[#ececec] px-5 py-2.5 text-[15px] leading-tight font-semibold text-[#111]">
          {hotspot.tag}
        </span>

        <h3 className="absolute right-6 bottom-5 left-6 font-head text-3xl leading-none tracking-[-0.02em] text-white md:text-4xl">
          {hotspot.name}
        </h3>

        {/* Small notch pointing up from the card body into the image */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-6 border-x-8 border-b-8 border-x-transparent border-b-[#f0eee9]"
        />
      </div>

      <div className="flex flex-1 flex-col bg-[#f0eee9] px-6 pt-7 pb-6">
        <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-[#333]">{hotspot.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-[15px] text-[#333]">
            <FiUsers aria-hidden="true" />
            {hotspot.city}
          </span>

          <Link
            href={hotspot.href}
            target={hotspot.target ?? "_blank"}
            rel={hotspot.target === "_self" ? undefined : "noopener noreferrer"}
            aria-label={`Learn more about Colive ${hotspot.name}`}
            className="border border-[#ddd] px-6 py-2.5 text-[15px] whitespace-nowrap text-[#111] transition-colors duration-200 hover:border-[#111] hover:bg-[#111] hover:text-white"
          >
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}

function HotspotFallback() {
  return (
    <div className="flex gap-4 overflow-hidden sm:gap-6 lg:gap-10">
      {HOTSPOTS.slice(0, 3).map((hotspot) => (
        <div key={hotspot.name} className={fallbackCardClass}>
          <HotspotCard hotspot={hotspot} />
        </div>
      ))}
    </div>
  );
}

export default function HotspotSlider() {
  return (
    <section aria-labelledby="hotspots-heading" className="overflow-hidden bg-white py-20 md:py-28">
      <div className="px-4 text-center">
        <h2
          id="hotspots-heading"
          className="mb-2.5 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:mb-5 md:text-[clamp(2.5rem,6vw,4.5rem)]"
        >
          Latest Coliving Hotspots
        </h2>

        <p className="mx-auto mb-10 max-w-170 text-lg leading-7 text-[#444] md:mb-12">
          From the lanes of Whitefield to the buzz of Koramangala, choose your favourite place to live, work and play
          at our newest Colive hubs.
        </p>
      </div>

      <div className="relative">
        {/* Swiper reads the clock while rendering, which can't be prerendered; stream it in behind static cards */}
        <Suspense fallback={<HotspotFallback />}>
          <Swiper
            modules={[Navigation, Pagination]}
            loop
            slidesPerView={1.15}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            navigation={{ prevEl: ".hotspot-prev", nextEl: ".hotspot-next" }}
            pagination={{ el: ".hotspot-pagination", clickable: true }}
            className="[&_.swiper-slide]:h-auto"
          >
            {HOTSPOTS.map((hotspot) => (
              <SwiperSlide key={hotspot.name}>
                <HotspotCard hotspot={hotspot} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Suspense>

        <button type="button" aria-label="Previous property" className={`hotspot-prev left-4 md:left-18 ${navButtonClass}`}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next property" className={`hotspot-next right-4 md:right-18 ${navButtonClass}`}>
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="hotspot-pagination mt-12 flex min-h-1.5 justify-center gap-1.5 md:mt-16 [&_.swiper-pagination-bullet]:size-1.5 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:bg-[#111]" />
    </section>
  );
}
