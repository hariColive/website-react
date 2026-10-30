import type { PropertyDetails } from "@/lib/propertyDetails";

type PropertyOverviewProps = Pick<PropertyDetails, "description" | "highlights">;

export default function PropertyOverview({ description, highlights }: PropertyOverviewProps) {
  return (
    <section>
      <h2 className="mb-6 border-b border-gray-200 pb-6 text-3xl font-light tracking-tight text-[#111] md:text-4xl">
        A fully-managed home, shaped around comfort and city access.
      </h2>

      {description && <p className="mb-6 text-[17px] leading-[1.65] text-[#222]">{description}</p>}

      {highlights && (
        <>
          <h3 className="mb-3 text-3xl font-light tracking-tight text-[#111]">Location Highlights</h3>
          <p className="text-base leading-[1.75] text-[#222]">{highlights}</p>
        </>
      )}
    </section>
  );
}
