import Image from "next/image";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";

import type { PropertySummary } from "@/lib/propertySearch";
import { formatRupees } from "@/lib/searchFilters";

import PropertyHighlights from "./PropertyHighlights";

type PropertyCardProps = {
  property: PropertySummary;
  href: string;
  priority?: boolean;
};

// Search results card, matching GetPropertyCard (grid view) on colive.com.
export default function PropertyCard({ property, href, priority = false }: PropertyCardProps) {
  const place = `${property.locationName}, ${property.city}`;
  const hasDiscount = property.discountedPrice > 0;

  return (
    <Link
      href={href}
      className="group relative mt-5 flex flex-col border border-gray-200 bg-[#f2f0ec] text-[#111] transition-shadow hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)]"
    >
      <span
        title={place}
        className="absolute -top-5 left-1/2 z-10 max-w-[85%] -translate-x-1/2 truncate rounded-full bg-[#ececec] px-5 py-2.5 text-sm font-bold tracking-tight shadow-sm"
      >
        {place}
      </span>

      <div className="relative aspect-34/25 overflow-hidden bg-gray-200">
        {property.image && (
          <Image
            src={property.image}
            alt={property.name}
            fill
            preload={priority}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/70 to-transparent" />

        {property.trendingTag && (
          <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-[#fac917]">
            ⚡ {property.trendingTag}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 rounded-full bg-[#ff0000] px-3 py-1 text-xs font-bold text-white">Flash Sale</span>
        )}

        <h3 className="absolute inset-x-0 bottom-5 px-3.5 font-head text-2xl leading-tight text-white">{property.name}</h3>
      </div>

      <div className="relative flex flex-1 flex-col justify-end p-6">
        {/* Notch pointing up into the image */}
        <span aria-hidden="true" className="absolute -top-2 left-6 size-4 -rotate-45 bg-[#f2f0ec]" />

        <PropertyHighlights link={property.link} />

        {property.variantTag && (
          <span className="mb-3 self-start rounded-full border border-gray-300 px-3 py-0.5 text-xs font-semibold text-gray-600">
            {property.variantTag}
          </span>
        )}

        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="flex min-w-0 items-center gap-1.5 text-sm text-gray-600">
            <FaUsers aria-hidden="true" className="shrink-0 text-gray-400" />
            <span className="truncate">{place}</span>
          </p>

          <p className="text-base whitespace-nowrap">
            {hasDiscount && (
              <>
                <span className="text-xs text-gray-500">Starts from </span>
                <s className="mr-1.5 text-xs font-semibold text-[#ff0000]">{formatRupees(property.price)}</s>
              </>
            )}
            {formatRupees(property.discountedPrice || property.price)} <span className="text-sm text-gray-600">/mo</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
