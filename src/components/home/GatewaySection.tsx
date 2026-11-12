import { FaArrowRight } from "react-icons/fa";

const HANG_URL = "https://my.colive.com/gateway";

export default function GatewaySection() {
  return (
    <section className="bg-[#e6d3b3] px-4 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-480 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-lg font-bold text-[#111]">Colive Social Hub</p>
          <hr aria-hidden="true" className="mt-6 mb-7 w-42 border-t border-[#333]" />

          <h2 className="mb-6 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] md:mb-8 md:text-[clamp(2.5rem,5vw,4rem)]">
            Welcome to Gateway at Whitefield
          </h2>

          <p className="mb-10 max-w-110 text-lg leading-7 text-[#333] md:mb-14">
            An ultra #iykyk destination for web 3.0 era founders, crypto builders, fitness freaks, musicians, performing
            artists &amp; cracked extroverts. Weekend jams, curated mixers, hackathons &amp; much more.
          </p>

          <a
            href={HANG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 bg-black px-7 py-3.5 font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#222]"
          >
            What is The Hang <FaArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="relative aspect-11/10 overflow-hidden bg-black">
          {/* Muted + playsInline is what lets browsers (incl. iOS Safari) autoplay it */}
          <video
            poster="/images/home/hotspot/the-hang.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Residents watching a match at The Hang, Gateway Whitefield"
            className="absolute inset-0 size-full object-cover"
          >
            <source src="https://my.colive.com/video/the-hang.webm" type="video/webm" />
            <source src="https://my.colive.com/video/the-hang.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
