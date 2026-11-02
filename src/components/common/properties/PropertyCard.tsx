import type { PropertySearchResult } from "@/lib/coliveApi";

export type Property = PropertySearchResult & {
  Image?: string;
  ImageUrl?: string;
  PropertyImage?: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  const image = property.ImageUrl || property.PropertyImage || property.Image;
  const title = property.PropertyName || property.LocationName || "Colive Home";
  const location = [property.LocationName, property.City]
    .filter((value): value is string => Boolean(value))
    .join(", ");
  const content = (
    <>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="aspect-[19/14] w-full object-cover"
        />
      ) : (
        <div
          className="aspect-[19/14] bg-gray-100"
          aria-hidden="true"
        />
      )}
      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {location && <p className="text-sm text-gray-600">{location}</p>}
        {property.Price !== undefined && property.Price !== "" && (
          <p className="text-sm font-semibold text-gray-900">
            ₹{property.Price} / month
          </p>
        )}
        {property.Highlights && (
          <p className="line-clamp-2 text-sm text-gray-600">
            {property.Highlights}
          </p>
        )}
      </div>
    </>
  );

  return property.Link ? (
    <a
      href={property.Link}
      className="block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B001F]"
    >
      {content}
    </a>
  ) : (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm">
      {content}
    </article>
  );
}
