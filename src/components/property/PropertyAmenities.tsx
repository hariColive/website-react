import type { PropertyDetails } from "@/lib/propertyDetails";

import SectionHeading from "./SectionHeading";

// Same order as colive.com; "Savings" (deposit terms) is covered by the rent summary instead.
const GROUP_ORDER = ["Style", "Service", "Social", "Safety", "Smart"];

export default function PropertyAmenities({ amenities }: Pick<PropertyDetails, "amenities">) {
  const groups = GROUP_ORDER.flatMap((name) => amenities.filter((group) => group.group === name && group.items.length > 0));
  if (groups.length === 0) return null;

  return (
    <section>
      <SectionHeading eyebrow="What's inside" title="Every detail, considered." />

      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.group}>
            <h3 className="mb-4 border-b border-gray-300 pb-4 text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
              {group.group}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-4 text-sm text-gray-700">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
