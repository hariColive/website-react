"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import type { FaqGroup } from "@/lib/searchSeo";

import { richTextClass } from "./richText";

function FaqList({ heading, initiallyVisible, items }: FaqGroup) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="mb-10 last:mb-0">
      {heading && <h2 className="mb-6 text-2xl font-normal tracking-tight text-[#111] md:text-[28px]">{heading}</h2>}

      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {items.map((item, index) => (
          // Answers stay in the HTML when collapsed, so crawlers still see them
          <details key={index} open={index === 0} hidden={!showAll && index >= initiallyVisible} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base text-[#111] [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">{item.question}</h3>
              <FaChevronDown aria-hidden="true" className="shrink-0 text-xs text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className={`${richTextClass} pb-4`} dangerouslySetInnerHTML={{ __html: item.answer }} />
          </details>
        ))}
      </div>

      {items.length > initiallyVisible && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-5 rounded-full border border-gray-300 px-5 py-2 text-sm text-[#111] transition-colors hover:border-[#111]"
        >
          {showAll ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}

export default function SeoFaqs({ groups }: { groups: FaqGroup[] }) {
  return groups.map((group, index) => <FaqList key={index} {...group} />);
}
