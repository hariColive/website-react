import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const CATEGORIES = [
  {
    title: "Couple Suite",
    href: "/search?sharingtype=couple",
    image: "/images/home/coliving/couplesuite.jpg",
    description:
      "Spacious private rooms with a large bed, ensuite bath and a calm corner to call your own — perfect for couples or solo dwellers.",
  },
  {
    title: "Solo Rider",
    href: "/search?sharingtype=solo",
    image: "/images/home/coliving/solorider.jpg",
    description:
      "Twin beds, twin desks, twin lives — a sociable shared room for friends, colleagues or new connections looking to split rent without splitting comfort.",
  },
  {
    title: "Shared Adventure",
    href: "/search?sharingtype=shared",
    image: "/images/home/coliving/sharedAdventure.jpg",
    description:
      "The most affordable way into Colive — three beds, plenty of storage, and a community of housemates one door away.",
  },
];

export default function ColivingSection() {
  return (
    // Target of the hero's "Find your vibe" link
    <section id="categories" className="scroll-mt-(--header-h) bg-white px-4 py-16 md:px-15 md:py-20">
      <div className="mx-auto text-center">
        <h2 className="mb-2.5 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:mb-5 md:text-[clamp(2.5rem,6vw,4.5rem)]">
          Coliving for everyone
        </h2>

        <p className="mx-auto mb-10 max-w-162 text-lg leading-7 font-medium text-[#6a6161] md:mb-12">
          Whether you&apos;re staying for a week or a year, Colive is built for digital nomads, professionals, students,
          founders and everyone in between. From work to play, choose your own adventure across Bangalore, Mumbai &amp;
          Pune.
        </p>
      </div>

      <div className="mx-auto grid max-w-480 gap-10 md:grid-cols-3 md:gap-6">
        {CATEGORIES.map((category) => (
          <Link key={category.title} href={category.href} className="group block">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={category.image}
                alt={`${category.title} room at Colive`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-3.5 mb-2.5 flex items-center gap-4 font-head text-[22px] leading-tight tracking-[-0.01em] text-slate-900 md:text-[27px]">
              {category.title}
              <FaArrowRight
                aria-hidden="true"
                className="text-lg transition-transform duration-200 group-hover:translate-x-1 md:text-xl"
              />
            </h3>

            <p className="text-[17px] leading-normal text-gray-500">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
