import { Suspense } from "react";
import { redirect } from "next/navigation";

type LegacyPropertiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function RedirectLegacyProperties({
  searchParams,
}: LegacyPropertiesPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.set(key, value);
    }
  }

  const queryString = query.toString();
  return redirect(queryString ? `/search?${queryString}` : "/search");
}

export default function LegacyPropertiesPage({
  searchParams,
}: LegacyPropertiesPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8f8f8] px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl text-gray-500">
            Loading search...
          </div>
        </main>
      }
    >
      <RedirectLegacyProperties searchParams={searchParams} />
    </Suspense>
  );
}
