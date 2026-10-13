import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import HeroVideo from "./HeroVideo";

const HERO_VIDEO_ID = "qp6OlZ-oVWY";

export default function HeroSection() {
  return (
    // Pulled up under the translucent sticky header so the video shows through it
    <section className="relative -mt-(--header-h) flex h-screen min-h-150 items-center overflow-hidden">
      <HeroVideo videoId={HERO_VIDEO_ID} poster="/images/home/hero-poster.jpg" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/28" />

      <div className="relative w-full pt-30 md:pt-[7%]">
        <div className="max-w-170 pl-[6%] text-white md:pl-[3%]">
          <p className="mb-4.5 text-sm font-medium tracking-[1.5px] md:text-lg md:tracking-[1px]">
            Welcome to Colive
          </p>

          <h1 className="mb-9 font-head text-[clamp(2.25rem,6.5vw,5rem)] leading-none tracking-[-0.025em]">
            Live with good <span className="block">food &amp; great</span> friends
          </h1>

          <Link
            href="#categories"
            className="inline-flex items-center gap-3.75 border-2 border-white/65 px-7 py-3 font-medium whitespace-nowrap transition-colors duration-200 hover:border-white hover:bg-white hover:text-slate-900"
          >
            Find your vibe <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
