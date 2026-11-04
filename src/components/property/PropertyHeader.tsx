import Link from "next/link";
import { FaMagic, FaMapMarkerAlt } from "react-icons/fa";

import type { PropertyDetails } from "@/lib/propertyDetails";

type PropertyHeaderProps = Pick<PropertyDetails, "name" | "city" | "citySlug" | "address" | "mapUrl">;

export default function PropertyHeader({ name, city, citySlug, address, mapUrl }: PropertyHeaderProps) {
  return (
    <header className="mb-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs tracking-[0.12em] text-gray-500 uppercase">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[#111]">Home</Link>
          </li>
          <li aria-hidden="true">&gt;</li>
          <li>
            <Link href={`/pg-in-${citySlug}`} className="hover:text-[#111]">{city}</Link>
          </li>
          <li aria-hidden="true">&gt;</li>
          <li aria-current="page" className="text-[#111]">{name}</li>
        </ol>
      </nav>

      <h1 className="mb-4 text-4xl font-medium tracking-tight text-[#111] md:text-6xl">{name}</h1>

      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[17px] text-[#111]">
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
          <FaMapMarkerAlt aria-hidden="true" />
          {address}
        </a>
        <span className="inline-flex items-center gap-2">
          <FaMagic aria-hidden="true" />
          Managed stay · Verified
        </span>
      </p>
    </header>
  );
}
