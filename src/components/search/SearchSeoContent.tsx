import { getSearchSeo } from "@/lib/searchSeo";
import type { SearchLocation } from "@/lib/searchLocation";

import SeoFaqs from "./SeoFaqs";
import SeoOverview from "./SeoOverview";

// Overview, FAQs and structured data under the search results
export default async function SearchSeoContent({ location }: { location: Promise<SearchLocation | null> }) {
  const place = await location;
  if (!place) return null;

  const { overview, faqs, jsonLd } = await getSearchSeo(place);

  return (
    <section className="border-t border-gray-100 bg-white">
      {jsonLd.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Escaping "<" keeps the copy from closing the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}

      <div className="mx-auto px-4 py-14 sm:px-8">
        {overview && (
          <div className="mb-14">
            <SeoOverview {...overview} />
          </div>
        )}
        <SeoFaqs groups={faqs} />
      </div>
    </section>
  );
}
