"use client";

import { useState } from "react";

import { richTextClass } from "./richText";

type SeoOverviewProps = { intro: string; more: string };

// The full copy is always in the HTML for crawlers; "Read more" only reveals it.
export default function SeoOverview({ intro, more }: SeoOverviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className={richTextClass} dangerouslySetInnerHTML={{ __html: intro }} />
      {more && (
        <>
          <div className={richTextClass} hidden={!expanded} dangerouslySetInnerHTML={{ __html: more }} />
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 text-sm font-medium text-[#111] underline underline-offset-4 hover:text-gray-600"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </>
      )}
    </div>
  );
}
