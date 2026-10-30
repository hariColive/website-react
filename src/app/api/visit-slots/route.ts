import type { NextRequest } from "next/server";

import { getVisitSlots } from "@/lib/propertyDetails";

// Visit time slots for one property and day, for the Schedule Visit form: /api/visit-slots?propertyId=30555&date=2026-10-30
export async function GET(request: NextRequest) {
  const propertyId = Number(request.nextUrl.searchParams.get("propertyId"));
  const date = request.nextUrl.searchParams.get("date") ?? "";
  if (!Number.isInteger(propertyId) || propertyId <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ slots: [] }, { status: 400 });
  }

  const slots = await getVisitSlots(propertyId, date);
  return Response.json({ slots });
}
