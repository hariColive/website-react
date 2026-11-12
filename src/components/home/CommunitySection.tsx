import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CommunitySection() {
  return (
    <section className="bg-[#8effdf] px-4 py-20 text-center md:px-15 md:py-32">
      <div className="mx-auto max-w-200">
        <h2 className="mb-4 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:mb-6 md:text-[clamp(2.5rem,6vw,4.5rem)]">
          Join the community
        </h2>

        <p className="mb-10 text-lg leading-7 text-[#333] md:mb-12">
          A local community offering curated events, premium coworking spaces, lounges, gyms, indoor pools and rooftop
          nights — across Bangalore, Mumbai &amp; Pune.
        </p>

        <Link
          href="#"
          className="inline-flex items-center gap-3.5 bg-black px-7 py-3.5 font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#222]"
        >
          Become a member <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
