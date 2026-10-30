import type { Metadata } from "next";

import PropertyPage, { propertyMetadata } from "@/components/property/PropertyPage";

// /property/colive_179, as linked from /search results
export async function generateMetadata({ params }: PageProps<"/property/[link]">): Promise<Metadata> {
  return propertyMetadata((await params).link);
}

export default function Page({ params }: PageProps<"/property/[link]">) {
  return <PropertyPage link={params.then(({ link }) => link)} />;
}
