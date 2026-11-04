import { getLocationHighlights } from "@/lib/propertySearch";

// Location highlights for one property card, loaded lazily by PropertyHighlights as cards scroll into view
// (one detail lookup per property is too slow to do for every result up front).
export async function GET(_request: Request, { params }: RouteContext<"/api/property-highlights/[link]">) {
  const { link } = await params;
  if (!/^[\w-]+$/.test(link)) return Response.json({ highlights: "" }, { status: 404 });

  const highlights = await getLocationHighlights(link);
  return Response.json({ highlights }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
