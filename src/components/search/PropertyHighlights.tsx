"use client";

import { useEffect, useRef, useState } from "react";
import { getPropertyLocationHighlights } from "@/lib/coliveApi";

// Shared across cards so re-rendered results (filters, sort) don't refetch what's already loaded
const requests = new Map<string, Promise<string>>();

function loadHighlights(link: string) {
  let request = requests.get(link);
  if (!request) {
    request = getPropertyLocationHighlights(link)
      .catch(() => {
        requests.delete(link);
        return "";
      });
    requests.set(link, request);
  }
  return request;
}

// Fetched only once the card is near the viewport, as on colive.com.
export default function PropertyHighlights({ link }: { link: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadHighlights(link).then((value) => active && setText(value));
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(element);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [link]);

  // Nothing to show for this property
  if (text === "") return null;

  return (
    <div ref={ref} className="mb-4 min-h-[3.2em] text-[15px] leading-[1.6] text-gray-500">
      {text === null ? (
        <div aria-hidden="true" className="animate-pulse space-y-2 pt-1">
          <div className="h-3 rounded bg-black/8" />
          <div className="h-3 w-3/4 rounded bg-black/8" />
        </div>
      ) : (
        <p className="line-clamp-2">{text}</p>
      )}
    </div>
  );
}
