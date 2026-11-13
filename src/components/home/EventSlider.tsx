"use client";

import Image from "next/image";
import { Suspense } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const SLIDES = Array.from({ length: 10 }, (_, i) => `/images/home/slider/Event${i + 1}.jpg`);

const navButtonClass =
  "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-[#111] shadow-md transition-transform duration-200 hover:scale-110 md:size-10";

function SlideImage({ src, index }: { src: string; index: number }) {
  return (
    <div className="relative aspect-10/7 overflow-hidden bg-gray-100">
      <Image
        src={src}
        alt={`Residents at a Colive community event ${index + 1}`}
        fill
        sizes="(min-width: 768px) 60vw, 87vw"
        className="object-cover"
      />
    </div>
  );
}

// Same width as the active slide at each breakpoint (slidesPerView 1.15 / 1.6)
function SlideFallback() {
  return (
    <div className="mx-auto w-[87%] md:w-[62.5%]">
      <SlideImage src={SLIDES[0]} index={0} />
    </div>
  );
}

export default function EventSlider() {
  return (
    <section aria-label="Life at Colive" className="bg-white px-4 pt-6 pb-16 md:px-10 md:pt-8 md:pb-20">
      <div className="relative mx-auto max-w-480">
        {/* Swiper reads the clock while rendering, which can't be prerendered; stream it in behind a static first slide */}
        <Suspense fallback={<SlideFallback />}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop
            centeredSlides
            slidesPerView={1.15}
            spaceBetween={12}
            breakpoints={{ 768: { slidesPerView: 1.6, spaceBetween: 16 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: ".event-slider-prev", nextEl: ".event-slider-next" }}
            pagination={{ el: ".event-slider-pagination", clickable: true }}
            // Neighbouring slides peek in, washed out, either side of the active one
            className="[&_.swiper-slide]:opacity-50 [&_.swiper-slide]:transition-opacity [&_.swiper-slide]:duration-500 [&_.swiper-slide-active]:opacity-100"
          >
            {SLIDES.map((src, i) => (
              <SwiperSlide key={src}>
                <SlideImage src={src} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Suspense>

        <button type="button" aria-label="Previous slide" className={`event-slider-prev left-2 ${navButtonClass}`}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next slide" className={`event-slider-next right-2 ${navButtonClass}`}>
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="event-slider-pagination mt-6 flex min-h-1.5 justify-center gap-1.5 [&_.swiper-pagination-bullet]:size-1.5 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:bg-[#111]" />
    </section>
  );
}
