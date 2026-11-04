import Link from "next/link";
import { FaBuilding } from "react-icons/fa";

import type { CityOption } from "@/lib/propertySearch";

export default function NoProperties({ cities }: { cities: CityOption[] }) {
  return (
    <div className="px-4 py-14 text-center">
      <FaBuilding aria-hidden="true" className="mx-auto mb-5 text-6xl text-gray-300" />
      <h3 className="mb-2 text-2xl font-bold text-[#111]">No Properties Found</h3>
      <p className="mb-6 text-gray-500">
        We couldn&rsquo;t find any properties for your search location.
        <br />
        Try out our other locations:
      </p>

      <ul className="flex flex-wrap justify-center gap-2">
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/pg-in-${city.slug}`}
              className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] text-gray-700 transition-colors hover:border-[#111] hover:text-[#111]"
            >
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
