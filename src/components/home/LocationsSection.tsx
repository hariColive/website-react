import Link from "next/link";

// Same paths as colive.com; they're served by the city search route (src/app/[...slug])
const CITIES = [
  {
    name: "Bangalore",
    localities: [
      { name: "Whitefield", href: "/bangalore/pg-in-whitefield" },
      { name: "Mahadevpura", href: "/bangalore/marathahalli/pg-in-mahadevapura" },
      { name: "Koramangala", href: "/bangalore/central/pg-in-koramangala" },
      { name: "HSR Layout", href: "/bangalore/sarjapur/pg-in-hsr-layout" },
      { name: "Indiranagar", href: "/bangalore/central/pg-in-indiranagar" },
      { name: "Bangalore Central", href: "/bangalore/pg-in-central" },
      { name: "Marathahalli", href: "/bangalore/pg-in-marathahalli" },
      { name: "Sarjapur", href: "/bangalore/pg-in-sarjapur" },
    ],
  },
  {
    name: "Pune",
    localities: [
      { name: "Kharadi", href: "/pg-in-pune" },
      { name: "Hinjewadi", href: "/pune/pg-in-hinjewadi" },
      { name: "Baner", href: "/pg-in-pune" },
      { name: "Viman Nagar", href: "/pg-in-pune" },
    ],
  },
];

export default function LocationsSection() {
  return (
    <section aria-labelledby="locations-heading" className="bg-white px-4 py-20 md:px-15 md:py-28">
      <div className="text-center">
        <h2
          id="locations-heading"
          className="mb-2.5 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:mb-5 md:text-[clamp(2.5rem,6vw,4.5rem)]"
        >
          Discover our locations
        </h2>
        <p className="text-base text-gray-500">Choose a neighbourhood to learn what each Colive hub has to offer.</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-254 md:mt-20 md:grid-cols-2">
        {CITIES.map((city, i) => (
          <div
            key={city.name}
            className={`flex gap-8 py-5 md:gap-10 ${i > 0 ? "mt-6 border-t border-gray-200 pt-10 md:mt-0 md:border-t-0 md:border-l md:pt-5 md:pl-22" : ""}`}
          >
            {/* Reads bottom-to-top, like the reference site */}
            <h3 className="rotate-180 font-head text-4xl leading-none tracking-[-0.01em] text-[#111] [writing-mode:vertical-rl] md:text-5xl">
              {city.name}
            </h3>

            <ul className="grid h-fit grid-flow-col grid-rows-4 gap-x-8 gap-y-5.5 md:gap-x-14">
              {city.localities.map((locality) => (
                <li key={locality.name}>
                  <Link
                    href={locality.href}
                    className="text-base whitespace-nowrap text-[#111] underline decoration-[#111]/40 underline-offset-5 transition-colors hover:decoration-[#111]"
                  >
                    {locality.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
