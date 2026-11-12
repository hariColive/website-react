import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const INQUIRE_URL =
  "https://api.whatsapp.com/send/?phone=918050003274&text=Hi+Colive%21+I%27m+looking+for+a+rental+home&type=phone_number&app_absent=0";

export default function CorporateSection() {
  return (
    <section className="bg-[#b4e8d8] px-4 py-16 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-480 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-lg font-bold text-[#111]">Colive for Business</p>
          <hr aria-hidden="true" className="mt-6 mb-7 w-42 border-t border-[#333]" />

          <h2 className="mb-6 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] md:mb-8 md:text-[clamp(2.5rem,5vw,4rem)]">
            Corporate Serviced Apartments
          </h2>

          <p className="mb-10 max-w-110 text-lg leading-7 text-[#333] md:mb-14">
            Move-in-ready homes for teams, relocations and visiting professionals — fully furnished, serviced and
            amenity-rich. Common areas, housekeeping and hospitality handled, so your people just live and work.
          </p>

          <a
            href={INQUIRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 bg-black px-7 py-3.5 font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#222]"
          >
            Inquire <FaArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="relative aspect-5/4 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
          <Image
            src="/images/home/corporate/apartment.jpg"
            alt="Furnished Colive corporate serviced apartment with a work desk and bed"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
