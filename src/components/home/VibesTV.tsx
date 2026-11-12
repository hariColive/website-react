"use client";

import { Suspense, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const VIDEO_IDS = ["AB5iReR9hZ8", "jHkBpUAc41o", "sNyqOS4cgiA"];

// Just the parts of the YouTube IFrame API this section uses
type YTPlayer = { playVideo(): void; pauseVideo(): void; seekTo(seconds: number, allowSeekAhead: boolean): void; destroy(): void };
type YTNamespace = {
  Player: new (el: HTMLElement, options: object) => YTPlayer;
  PlayerState: { ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youTubeApi: Promise<YTNamespace> | null = null;

function loadYouTubeApi() {
  youTubeApi ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return youTubeApi;
}

const navButtonClass =
  "flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-[#111] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-105 md:size-13";

const videoFrameClass = "relative aspect-12/7 overflow-hidden rounded-xl bg-black";

// Each video advances the slider when it ends; changing slide restarts the active video and pauses the rest
function VibesSlider() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playersRef = useRef<YTPlayer[]>([]);

  useEffect(() => {
    let cancelled = false;
    const containers = containerRefs.current;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;

      playersRef.current = containers.map((container, i) => {
        // The API swaps its target for an iframe, so give it a node React doesn't own
        const target = document.createElement("div");
        container!.appendChild(target);

        return new YT.Player(target, {
          videoId: VIDEO_IDS[i],
          width: "100%",
          height: "100%",
          playerVars: { autoplay: i === 0 ? 1 : 0, mute: 1, controls: 1, modestbranding: 1, rel: 0, playsinline: 1 },
          events: {
            onStateChange: (event: { data: number }) => {
              if (event.data === YT.PlayerState.ENDED) swiperRef.current?.slideNext();
            },
          },
        });
      });
    });

    return () => {
      cancelled = true;
      playersRef.current.forEach((player) => player.destroy());
      playersRef.current = [];
      containers.forEach((container) => container?.replaceChildren());
    };
  }, []);

  const playActive = (swiper: SwiperInstance) => {
    playersRef.current.forEach((player, i) => {
      if (!player.pauseVideo) return;
      if (i === swiper.activeIndex) {
        // Restart from 0 so a previously finished video doesn't sit on its end screen
        player.seekTo(0, true);
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      rewind
      slidesPerView={1}
      speed={800}
      navigation={{ prevEl: ".vibes-prev", nextEl: ".vibes-next" }}
      pagination={{ el: ".vibes-pagination", clickable: true }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChangeTransitionEnd={playActive}
    >
      {VIDEO_IDS.map((id, i) => (
        <SwiperSlide key={id}>
          <div
            ref={(el) => {
              containerRefs.current[i] = el;
            }}
            className={`${videoFrameClass} [&_iframe]:absolute [&_iframe]:inset-0`}
          />
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
          {/* Swiper reads the clock while rendering, which can't be prerendered; stream it in behind an empty frame */}
          <Suspense fallback={<div className={videoFrameClass} />}>
            <VibesSlider />
          </Suspense>

          <div className="vibes-pagination mt-7 flex min-h-2 justify-center gap-2 [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:bg-[#111]" />
        </div>
      </div>
    </section>
  );
}
