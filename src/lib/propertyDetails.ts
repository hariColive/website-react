// Server-side client for the property (factsheet) page, on the same CRM API as the search page.
import { cacheLife } from "next/cache";

import { formatApiDate, htmlToText } from "./propertySearch";
import { toSlug } from "./searchFilters";
import { colivePost } from "./server/coliveFetch";

type ApiImage = { ImageType: string; Image: string; DetailedImage: string; ImageAltText: string };

type ApiTestimonial = { CustomerName: string; Description: string; Rating: number; Image: string };

type ApiAmenityGroup = { UtilityType: string; Utility: { AmenityId: number; AmenityName: string }[] };

type ApiProperty = {
  PropertyID: number;
  PropertyName: string;
  SubLocation: string;
  City: string;
  Landmark: string;
  Latitude: string;
  Longitude: string;
  LocationDescription: string;
  LocationHighlights: string;
  URL360Deg: string | null;
  PropertyRating: number;
  CustomerReviewsCount: number;
  IsColiveNeo: boolean;
  Images: ApiImage[];
  Testimonials: ApiTestimonial[];
  Amenities: ApiAmenityGroup[];
  Offers: { CouponCode: string; Description: string }[];
  FoodMenu: { FoodMenu: string }[];
};

type ApiOccupancy = {
  RoomTypeId: number;
  RoomType: string;
  BookingPlan: { PlanName: string; FinalAmount: number }[];
};

export type PropertyDetails = {
  id: number;
  link: string;
  name: string;
  locality: string;
  city: string;
  citySlug: string;
  address: string;
  mapUrl: string;
  description: string;
  highlights: string;
  tourUrl: string;
  rating: number;
  reviewsCount: number;
  // colive.com shows a "Gold" ribbon on these properties
  isGold: boolean;
  images: { src: string; thumb: string; alt: string; type: string }[];
  testimonials: { name: string; text: string; rating: number }[];
  amenities: { group: string; items: string[] }[];
  offers: { code: string; description: string }[];
  hasFood: boolean;
};

export type RoomPlan = {
  roomTypeId: number;
  label: string;
  occupancy: string;
  plans: { name: string; amount: number }[];
};

export type VisitSlot = { id: number; time: string };

// Hard-coded on colive.com too (GetGoldTag in custom.js)
const GOLD_PROPERTY_IDS = [30555, 31058, 31109, 53286, 53339, 53736, 53741, 53767];

// Links look like Colive_179 or Colive_PPM_57347; anything else would only time out on the API.
export const isPropertyLink = (link: string) => /^[a-z0-9]+(_[a-z0-9]+)+$/i.test(link);

const toDetails = (property: ApiProperty, link: string): PropertyDetails => ({
  id: property.PropertyID,
  link,
  name: property.PropertyName.trim(),
  locality: property.SubLocation.trim(),
  city: property.City.trim(),
  citySlug: toSlug(property.City),
  address: `${property.Landmark.trim().replace(/\s+,/g, ",")}, ${property.City.trim()}`,
  mapUrl: `https://maps.google.com/maps?q=${property.Latitude},${property.Longitude}`,
  description: htmlToText(property.LocationDescription ?? ""),
  highlights: htmlToText(property.LocationHighlights ?? ""),
  tourUrl: property.URL360Deg ?? "",
  rating: property.PropertyRating,
  reviewsCount: property.CustomerReviewsCount,
  isGold: !property.IsColiveNeo && GOLD_PROPERTY_IDS.includes(property.PropertyID),
  images: property.Images.map((image) => ({
    src: image.Image,
    thumb: image.DetailedImage,
    alt: image.ImageAltText || property.PropertyName,
    type: image.ImageType,
  })),
  testimonials: property.Testimonials.map((testimonial) => ({
    name: testimonial.CustomerName.trim(),
    text: testimonial.Description.trim(),
    rating: testimonial.Rating,
  })),
  amenities: property.Amenities.map((group) => ({
    group: group.UtilityType,
    items: group.Utility.map((amenity) => amenity.AmenityName.trim()),
  })),
  offers: property.Offers.map((offer) => ({ code: offer.CouponCode, description: offer.Description })),
  hasFood: property.FoodMenu.length > 0,
});

export async function getPropertyDetails(link: string): Promise<PropertyDetails | null> {
  "use cache";
  cacheLife("hours");

  if (!isPropertyLink(link)) return null;
  const data = await colivePost<{ Property: ApiProperty[] }>("GetPropertyDetailsByIdForWeb_V2", { LocationLink: link, CustomerID: "" });
  const property = data?.Property[0];
  return property ? toDetails(property, link) : null;
}

// Mirrors BindPropertyAvailability_Factsheet on colive.com
const ROOM_LABELS: Record<number, string> = { 3: "Triple", 11: "Couple Stay", 12: "Solo Rider" };
const FULL_ROOM_TYPES = [11, 12];

export async function getRoomPlans(propertyId: number): Promise<RoomPlan[]> {
  "use cache";
  cacheLife("minutes");

  const data = await colivePost<ApiOccupancy[]>("GetAvailableOccupancyTypeByPropertyId_Factsheet", { PropertyID: propertyId });
  return (data ?? []).map((room) => ({
    roomTypeId: room.RoomTypeId,
    label: ROOM_LABELS[room.RoomTypeId] ?? room.RoomType,
    occupancy: FULL_ROOM_TYPES.includes(room.RoomTypeId) ? "Full Room" : "Shared Room",
    plans: room.BookingPlan.map((plan) => ({ name: plan.PlanName, amount: plan.FinalAmount })),
  }));
}

// `date` is an ISO day (2026-10-30); the API wants 30-Oct-2026.
export async function getVisitSlots(propertyId: number, date: string): Promise<VisitSlot[]> {
  "use cache";
  cacheLife("minutes");

  const [year, month, day] = date.split("-").map(Number);
  const data = await colivePost<{ TimeId: number; TimeString: string }[]>("GetScheduleVisitDays", {
    Date: formatApiDate(new Date(year, month - 1, day)),
    PropertyID: propertyId,
  });
  return (data ?? []).map((slot) => ({ id: slot.TimeId, time: slot.TimeString }));
}
