"use client";

import { useEffect } from "react";

export default function SearchError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="mb-3 text-2xl font-bold text-[#111]">We couldn&rsquo;t load homes right now</h1>
      <p className="mb-6 text-gray-500">Please check your connection and try again.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="cursor-pointer rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white hover:bg-[#333]"
      >
        Try again
      </button>
    </div>
  );
}
