"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const embedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&cc_load_policy=0&rel=0&modestbranding=1&playsinline=1`;

// The poster paints immediately; the autoplaying iframe is only mounted after the
// page has finished loading so it never competes with critical rendering.
export default function HeroVideo({ videoId, poster }: { videoId: string; poster: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const load = () => {
      timer = setTimeout(() => setShowVideo(true), 500);
    };

    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", load);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {!showVideo && (
        <Image src={poster} alt="" fill preload sizes="100vw" className="object-cover" />
      )}
      {showVideo && (
        <iframe
          src={embedUrl(videoId)}
          title="Colive"
          tabIndex={-1}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="pointer-events-none absolute top-1/2 left-1/2 h-full min-h-[56.25vw] w-[177.78vh] min-w-full -translate-1/2 border-0"
        />
      )}
    </div>
  );
}
