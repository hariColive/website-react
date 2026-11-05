import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";

import staticPageConfig from "@/lib/staticPageConfig";

export default function Page({ params }: PageProps<"/static/[...path]">) {
  return (
    <Suspense>
      <StaticPage params={params} />
    </Suspense>
  );
}

async function StaticPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  if (path.join("/") === "contact-us") redirect("/contactus");

  const PageComponent = staticPageConfig[path.join("/")];

  if (!PageComponent) notFound();

  return <PageComponent />;
}