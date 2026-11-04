import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import type { PropertyDetails } from "@/lib/propertyDetails";

import SectionHeading from "./SectionHeading";

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) =>
        rating >= star ? (
          <FaStar key={star} aria-hidden="true" />
        ) : rating >= star - 0.5 ? (
          <FaStarHalfAlt key={star} aria-hidden="true" />
        ) : (
          <FaRegStar key={star} aria-hidden="true" />
        ),
      )}
    </span>
  );
}

type PropertyReviewsProps = Pick<PropertyDetails, "rating" | "reviewsCount" | "testimonials">;

export default function PropertyReviews({ rating, reviewsCount, testimonials }: PropertyReviewsProps) {
  if (!rating && testimonials.length === 0) return null;

  return (
    <section>
      <SectionHeading title="Reviews & ratings." />

      {/* Scrolls sideways like the carousel on colive.com */}
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {rating > 0 && (
          <div className="flex w-58 shrink-0 snap-start flex-col justify-center rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-5xl font-light text-[#111]">{rating.toFixed(1)}</p>
            <p className="mb-3 text-sm text-gray-600">out of 5</p>
            <Stars rating={rating} className="mb-3 text-[#111]" />
            {reviewsCount > 0 && <p className="text-sm text-gray-600">Based on {reviewsCount.toLocaleString("en-IN")} verified reviews</p>}
          </div>
        )}

        {testimonials.map((testimonial) => (
          <figure
            key={`${testimonial.name}-${testimonial.text.slice(0, 20)}`}
            className="flex w-76 shrink-0 snap-start flex-col rounded-xl border border-gray-200 p-3"
          >
            <Stars rating={testimonial.rating} className="mb-4 text-lg text-[#111]" />
            <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{testimonial.text}</blockquote>
            <figcaption className="text-sm font-medium text-[#111]">{testimonial.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
