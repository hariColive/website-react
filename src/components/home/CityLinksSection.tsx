import Link from "next/link";

type Area = { name: string; href: string; localities: { name: string; href: string }[] };
type City = { name: string; href: string; width: string; columns: string; areas: Area[] };

// Builds an area from its slug and its localities' slugs: area("whitefield", ...) -> /bangalore/pg-in-whitefield,
// /bangalore/whitefield/pg-in-aecs-layout. Same paths as colive.com (lowercased), served by src/app/[...slug].
function area(city: string, slug: string, name: string, localities: [slug: string, name: string][], href?: string): Area {
  return {
    name: `PG in ${name}`,
    href: href ?? `/${city}/pg-in-${slug}`,
    localities: localities.map(([localitySlug, localityName]) => ({
      name: `PG in ${localityName}`,
      href: `/${city}/${slug}/pg-in-${localitySlug}`,
    })),
  };
}

const CITIES: City[] = [
  {
    name: "PG in Bangalore",
    href: "/pg-in-bangalore",
    width: "w-full",
    columns: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7",
    areas: [
      area("bangalore", "whitefield", "Whitefield", [
        ["aecs-layout", "AECS Layout"],
        ["kundalahalli", "Kundalahalli"],
        ["varthur", "Varthur"],
        ["hope-farm", "Hope Farm"],
        ["itpl", "ITPL"],
        ["brookfield", "Brookefield"],
        ["shantiniketan", "Shantiniketan"],
        ["hoodi", "Hoodi"],
      ]),
      area("bangalore", "marathahalli", "Marathahalli", [
        ["munnekolala", "Munnekolala"],
        ["doddanekundi", "Doddannekundi"],
        ["mahadevapura", "Mahadevapura"],
        ["kr-puram", "KR Puram"],
        ["kadubeesanahalli", "Kadubeesanahalli"],
        ["thippasandra", "Thippasandra"],
        ["murugeshpalya", "Murugeshpalya"],
        ["hal-road", "HAL Road"],
        ["bagmane-tech-park", "Bagmane Tech Park"],
      ]),
      area("bangalore", "silk-board", "Silk Board", [
        ["electronic-city", "Electronic City"],
        ["bommanahalli", "Bommanahalli"],
        ["tavarekere", "Tavarekere"],
        ["axa-building", "Axa Building"],
        ["kudlu-gate", "Kudlu Gate"],
        ["bommasandra", "Bommasandra"],
        ["madiwala", "Madiwala"],
      ]),
      area("bangalore", "north", "North", [
        ["nagawara", "Nagawara"],
        ["hebbal", "Hebbal"],
        ["hennur-road", "Hennur Road"],
        ["hbr-layout", "HBR layout"],
        ["banaswadi", "Banaswadi"],
        ["manyata-tech-park", "Manyata Tech Park"],
        ["thanisandra", "Thanisandra"],
      ]),
      area("bangalore", "central", "Central", [
        ["koramangala", "Koramangala"],
        ["domlur", "Domlur"],
        ["indiranagar", "Indiranagar"],
        ["mg-road", "MG Road"],
        ["ejipura", "Ejipura"],
        ["vivek-nagar", "Vivek Nagar"],
        ["richmond-town", "Richmond Town"],
      ]),
      area("bangalore", "south", "South", [
        ["dairy-circle", "Dairy Circle"],
        ["bannerghatta-road", "Bannerghatta road"],
        ["jaya-nagar", "Jayanagar"],
        ["j-p-nagar", "J P Nagar"],
        ["wilson-garden", "Wilson Garden"],
        ["lal-bagh", "Lal bagh"],
        ["christ-college", "Christ college"],
        ["jain-college", "Jain College"],
        ["mysore-road", "Mysore Road"],
      ]),
      area("bangalore", "sarjapur", "Sarjapur", [
        ["bellandur", "Bellandur"],
        ["hsr-layout", "HSR Layout"],
        ["wipro", "Wipro"],
        ["ecospace", "Ecospace"],
        ["green-glen-layout", "Green Glen layout"],
        ["central-mall", "Central Mall"],
      ]),
    ],
  },
  {
    name: "PG in Hyderabad",
    href: "/pg-in-hyderabad",
    width: "w-full lg:w-[25%]",
    columns: "grid-cols-1",
    areas: [
      area("hyderabad", "gachibowli", "Gachibowli", [
        ["gowlidoddi", "Gowlidoddi"],
        ["wipro-circle", "Wipro Circle"],
        ["financial-district", "Financial District"],
      ]),
    ],
  },
  {
    name: "PG in Pune",
    href: "/pg-in-pune",
    width: "w-full lg:w-[30%]",
    columns: "grid-cols-1",
    areas: [
      // Pune's localities sit directly under the city on colive.com (/pune/pg-in-wakad), not under Hinjewadi
      {
        name: "PG in Hinjewadi",
        href: "/pune/pg-in-hinjewadi",
        localities: [
          { name: "PG in Tathawade", href: "/pune/pg-in-tathawade" },
          { name: "PG in Wakad", href: "/pune/pg-in-wakad" },
          { name: "PG in Pimpri Chinchwad", href: "/pune/pg-in-pimpri-chinchwad" },
        ],
      },
    ],
  },
];

export default function CityLinksSection() {
  return (
    <section aria-label="PG locations" className="bg-[#faf6f1] px-3 py-16 md:py-20 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-y-14 lg:flex-row lg:flex-wrap lg:gap-x-10">
        {CITIES.map((city) => (
          <div key={city.name} className={city.width}>
            <h2 className="mb-3 font-head text-2xl leading-none tracking-[-0.025em] text-[#171412] md:mb-5 md:text-[27px]">
              <Link href={city.href} prefetch={false}>
                {city.name}
              </Link>
            </h2>

            <div className={`grid gap-x-6 gap-y-9 ${city.columns}`}>
              {city.areas.map((cityArea) => (
                <div key={cityArea.name}>
                  <h3 className="mb-3 font-head text-[15px] leading-none tracking-[-0.025em] text-[#171412]">
                    <Link href={cityArea.href} prefetch={false}>
                      {cityArea.name}
                    </Link>
                  </h3>

                  <ul className="flex flex-col gap-2.5">
                    {cityArea.localities.map((locality) => (
                      <li key={locality.href} className="leading-normal">
                        <Link
                          href={locality.href}
                          prefetch={false}
                          className="text-[13.5px] text-[#5b6472] transition-colors duration-150 hover:text-[#171412]"
                        >
                          {locality.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
