import type { PropertyDetails } from "@/lib/propertyDetails";

const cardClass = "rounded-2xl bg-gray-100 px-8 py-5 text-center";

// Coupons come from the property's Offers; the loyalty bonus is shown on every property (as on colive.com).
export default function CurrentOffers({ offers }: Pick<PropertyDetails, "offers">) {
  return (
    <section className="border-t border-gray-100 pt-8 text-center">
      <h2 className="mb-6 text-2xl font-normal text-[#111]">Current offers.</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {offers.map((offer) => (
          <div key={offer.code}>
            <p className="mb-2 text-[11px] tracking-[0.2em] text-gray-600 uppercase">Coupon Code</p>
            <p className={`${cardClass} text-xl font-semibold tracking-wider text-[#111]`}>{offer.code}</p>
            <p className="mt-3 max-w-60 text-sm text-gray-600">{offer.description}</p>
          </div>
        ))}

        <div>
          <p className="mb-2 text-[11px] tracking-[0.2em] text-gray-600 uppercase">Loyalty Bonus</p>
          <p className={`${cardClass} text-3xl font-light text-[#111]`}>₹1,000</p>
          <p className="mt-3 text-sm text-gray-600">Credits on completing 12 months</p>
        </div>
      </div>
    </section>
  );
}
