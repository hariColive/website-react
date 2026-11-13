"use client";

import { Suspense, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const VIDEO_IDS = ["AB5iReR9hZ8", "jHkBpUAc41o", "sNyqOS4cgiA"];

const navButtonClass =
  "flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-[#111] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-105 md:size-13";

const videoFrameClass = "relative aspect-12/7 overflow-hidden rounded-xl bg-black";

function VibesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      rewind
      slidesPerView={1}
      speed={800}
      navigation={{ prevEl: ".vibes-prev", nextEl: ".vibes-next" }}
      pagination={{ el: ".vibes-pagination", clickable: true }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {VIDEO_IDS.map((id, index) => (
        <SwiperSlide key={id}>
          <div className={`${videoFrameClass} [&_iframe]:absolute [&_iframe]:inset-0`}>
            {index === activeIndex && (
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                title={`Colive Vibes TV video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function VibesTV() {
  return (
    <section aria-labelledby="vibes-tv-heading" className="bg-white px-4 py-16 md:px-15 md:py-20">
      <div className="mx-auto max-w-480">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mb-3.5 font-serif text-[13px] tracking-[0.3em] text-gray-400 uppercase">IRL Experience</p>
            <h2
              id="vibes-tv-heading"
              className="font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:text-[clamp(2.5rem,6vw,4.5rem)]"
            >
              Colive Vibes TV
            </h2>
          </div>

          <div className="flex shrink-0 gap-3 md:self-start md:pt-4">
            <button type="button" aria-label="Previous video" className={`vibes-prev ${navButtonClass}`}>
              <FiChevronLeft aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next video" className={`vibes-next ${navButtonClass}`}>
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-3 pb-7 shadow-[0_10px_60px_rgba(0,0,0,0.08)] md:mt-15 md:p-5 md:pb-9">
          <Suspense fallback={<div className={videoFrameClass} />}>
            <VibesSlider />
          </Suspense>

          <div className="vibes-pagination mt-7 flex min-h-2 justify-center gap-2 [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:bg-[#111]" />
        </div>
      </div>
    </section>
  );
}
