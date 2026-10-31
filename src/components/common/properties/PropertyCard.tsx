
"use client";

export type Property = {
  PropertyID?: number;
  PropertyName?: string;
  LocationName?: string;
  City?: string;
  Price?: number | string;
  Latitude?: number | string;
  Longitude?: number | string;
  RoomType?: string;
  RoomSubType?: string;
  RoomTypeName?: string;
  ImageName?: string;
  Image?: string;
  Link?: string;
  PropertyType?: string;
  LocationHighlights?: string;
  LocationDescription?: string;
  Highlights?: string;
  Description?: string;
};

type PropertyCardProps = {
  property: Property;
};

function getDescription(property: Property): string {
  return (
    property.Highlights ||
    property.LocationHighlights ||
    property.LocationDescription ||
    property.Description ||
    ""
  );
}

function getImage(property: Property): string {
  const image = property.Image || property.ImageName;

  if (image && (/^https?:\/\//i.test(image) || image.startsWith("/"))) {
    return image;
  }

  return "/images/property-placeholder.jpg";
}

function formatPrice(price?: number | string): string {
  if (price === undefined || price === null || price === "") {
    return "Price on request";
  }

  const numericPrice = Number(price);

  return Number.isFinite(numericPrice)
    ? `₹${numericPrice.toLocaleString("en-IN")} /mo`
    : `₹${price} /mo`;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const description = getDescription(property);
  const image = getImage(property);

  const location = [
    property.LocationName,
    property.City || "Bangalore",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="relative mt-5 overflow-visible border border-[#c9c6c2] bg-[#f2f0ec]">
      {/* Location pill */}
      <div
        title={property.LocationName || "Location"}
        className="absolute -top-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#ececec] px-6 py-3 text-center text-sm font-bold tracking-tight text-[#111111] shadow-sm"
      >
        {location || "Bangalore"}
      </div>

      {/* Property image and overlaid name */}
      <div className="relative aspect-[19/14] overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={property.PropertyName || "Colive property"}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/property-placeholder.jpg";
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 to-transparent" />

        <h2 className="absolute bottom-5 left-0 right-0 px-[14px] font-black text-[24px] leading-[1.2] tracking-[0.5px] text-white [font-family:var(--font-archivo-black),Archivo,sans-serif] [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          {property.PropertyName || "Colive Property"}
        </h2>
      </div>

      {/* Description and property metadata */}
      <div className="relative flex min-h-[150px] flex-col bg-[#f2f0ec] p-6">
        {/* Small rotated square, matching the original card */}
        <div className="absolute -top-[4%] h-4 w-4 rotate-[-45deg] bg-[#f2f0ec]" />

        {/* Two-line description with ellipsis */}
        <div
          className="mt-1.5 mb-5 line-clamp-2 min-h-[2.8em] w-full overflow-hidden text-[15px] font-normal leading-[1.6] text-[#6b7280] [&_*]:!mb-5 [&_*]:!font-sans [&_*]:!text-[15px] [&_*]:!font-normal [&_*]:!not-italic [&_*]:!leading-[1.6] [&_*]:!text-[#6b7280]"
          dangerouslySetInnerHTML={{
            __html: description || "Property description unavailable.",
          }}
        />

        {/* Location and monthly price */}
        <div className="mt-auto flex w-full flex-wrap items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1 text-sm text-[#4b5563]">
            <i
              className="bi bi-people-fill shrink-0 text-[#9ca3af]"
              aria-hidden="true"
            />
            <span className="truncate">{location || "Bangalore"}</span>
          </div>

          <p className="shrink-0 text-sm font-medium text-black">
            {formatPrice(property.Price)}
          </p>
        </div>
      </div>
    </article>
  );
}
