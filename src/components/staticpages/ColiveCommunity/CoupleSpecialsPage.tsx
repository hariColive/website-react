"use client";

import { useState } from "react";

type PackageType = "dateNight" | "roomDecor";

const packages = {
  dateNight: {
    title: "Date Night Package",
    price: "₹ 1,599",
    oldPrice: "₹ 1,999",
    paymentUrl: "/payments?src=cuddle&pakge=3",
    offerImage: "/images/couple-specials/new-year-offer.png",
    images: [
      "/images/couple-specials/DN_1.png",
      "/images/couple-specials/DN_2.png",
      "/images/couple-specials/DN_3.png",
      "/images/couple-specials/DN_4.png",
    ],
    inclusions: [
      "Candles",
      "Balloons",
      "Petals",
      "Flower Bouquet",
      "Fairy Lights",
      "I Love You Banner",
      "Chocolates",
      "Gift Hamper",
      "Table Set up",
      "Wine",
    ],
  },
  roomDecor: {
    title: "Room Decor Package",
    price: "₹ 799",
    oldPrice: "₹ 999",
    paymentUrl: "/payments?src=cuddle&pakge=4",
    offerImage: "/images/couple-specials/new-year-offer2.png",
    images: [
      "/images/couple-specials/RP_1.png",
      "/images/couple-specials/RP_2.png",
      "/images/couple-specials/RP_3.png",
      "/images/couple-specials/RP_4.png",
    ],
    inclusions: [
      "Candles",
      "Balloons",
      "Petals",
      "Flower Bouquet",
      "Fairy Lights",
      "I Love You Banner",
      "Chocolates",
    ],
  },
} satisfies Record<PackageType, {
  title: string;
  price: string;
  oldPrice: string;
  paymentUrl: string;
  offerImage: string;
  images: string[];
  inclusions: string[];
}>;

function Star({
  className,
  second = false,
}: {
  className: string;
  second?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute block bg-no-repeat ${
        second
          ? "bg-[url('/images/couple-specials/star-icons2.png')]"
          : "bg-[url('/images/couple-specials/star-icons.png')]"
      } ${className}`}
    />
  );
}

function PackageCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const showPrevious = () => {
    setCurrentImage((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentImage((current) => (current + 1) % images.length);
  };

  return (
    <div className="relative w-full border-[5px] border-white">
      <div className="aspect-[1.536] w-full overflow-hidden bg-black">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`${title} ${index + 1}`}
            className={`h-full w-full object-cover ${
              index === currentImage ? "block" : "hidden"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-[22px] right-[15px] flex items-center gap-4">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous image"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-black/45 text-[30px] leading-none text-white hover:bg-black"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next image"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-black/45 text-[30px] leading-none text-white hover:bg-black"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function OfferDecoration({ image }: { image: string }) {
  return (
    <div className="pointer-events-none absolute bottom-5 right-10 hidden h-[120px] w-[120px] md:block">
      <Star className="-left-[10px] -top-10 h-[26px] w-[26px]" />
      <Star second className="-right-0 -top-20 h-[36px] w-[36px]" />
      <Star className="-right-[42px] top-5 h-[26px] w-[26px]" />
      <img
        src={image}
        alt="Couple package offer"
        className="h-[120px] w-[120px] object-contain"
      />
      <Star second className="-left-20 top-[60px] h-[36px] w-[36px]" />
      <Star className="left-[10px] top-[140px] h-[26px] w-[26px]" />
      <Star second className="-right-10 top-[120px] h-[36px] w-[36px]" />
    </div>
  );
}

export default function CoupleSpecialsPage() {
  const [activePackage, setActivePackage] = useState<PackageType>("dateNight");
  const selectedPackage = packages[activePackage];

  return (
    <main className="w-full overflow-hidden font-['Inter-Regular',Arial,sans-serif]">
      {/* Banner */}
      <section>
        <div className="mt-[0] bg-[url('/images/cuddle/cuddle-web.webp')] bg-cover bg-center bg-no-repeat py-[10%] max-[768px]:bg-[url('/images/cuddle/cuddle-mob.webp')] max-[768px]:py-[35%]">
          <h1 className="text-center text-[48px] font-semibold text-white max-[768px]:text-[22px]">
            Cuddle Specials
          </h1>
          <p className="text-center text-[30px] font-medium text-white max-[768px]:text-[16px]">
            Love is in the air, and we’ve got something <br />
            special lined up just for you!
          </p>
        </div>
      </section>

      <section className="relative bg-[#F2006C] py-[3%] max-[768px]:py-[10%]">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-50px)]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[25px]">
            {/* Left: package information */}
            <div className="relative min-w-0">
              <h1 className="mb-5 mt-0 text-[35px] font-semibold leading-[1.2] text-white max-[768px]:text-[28px]">
                Our Couple Specials
              </h1>

              <div
                role="tablist"
                aria-label="Couple packages"
                className="mb-5 flex w-[80%] flex-nowrap rounded-full border border-white min-[1200px]:w-[82%] max-[768px]:w-full"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePackage === "dateNight"}
                  onClick={() => setActivePackage("dateNight")}
                  className={`w-1/2 rounded-full border-0 px-[7px] py-[14px] text-center text-[14px] leading-5 ${
                    activePackage === "dateNight"
                      ? "bg-white font-semibold text-black"
                      : "bg-transparent font-medium text-white"
                  }`}
                >
                  Date Night Package
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePackage === "roomDecor"}
                  onClick={() => setActivePackage("roomDecor")}
                  className={`w-1/2 rounded-full border-0 px-[7px] py-[14px] text-center text-[14px] leading-5 ${
                    activePackage === "roomDecor"
                      ? "bg-white font-semibold text-black"
                      : "bg-transparent font-medium text-white"
                  }`}
                >
                  Room Decor Package
                </button>
              </div>

              <div className="relative">
                {/* Mobile offer artwork and price */}
                <div className="relative md:hidden">
                  <Star className="left-[150px] top-[10px] h-[26px] w-[26px]" />
                  <Star className="left-[210px] top-[26px] h-[26px] w-[26px]" />
                  <Star className="left-[270px] top-[10px] h-[26px] w-[26px]" />
                  <Star className="left-[322px] top-[26px] h-[26px] w-[26px]" />
                  <img
                    src="/images/couple-specials/new-year-offer.png"
                    alt={selectedPackage.title}
                    className="h-[100px] w-[100px] object-contain"
                  />
                  <h3 className="py-[15px] pb-6 text-[19px] font-bold text-white">
                    {selectedPackage.price}{" "}
                    <span className="text-[16px] font-medium text-white">
                      Per Couple{" "}
                      <u className="decoration-line-through">
                        {selectedPackage.oldPrice}
                      </u>
                    </span>
                  </h3>
                </div>

                <h2 className="mb-[15px] mt-[25px] text-[20px] font-semibold text-black min-[769px]:text-[22px]">
                  Inclusions
                </h2>

                <ul className="columns-2 pl-4">
                  {selectedPackage.inclusions.map((item) => (
                    <li
                      key={item}
                      className="mb-[10px] break-inside-avoid text-[16px] text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={selectedPackage.paymentUrl}
                  className="mt-5 inline-flex h-12 w-[200px] items-center justify-center gap-2 rounded-[5px] border border-black bg-black text-center text-[20px] text-white hover:border-black hover:bg-black max-[768px]:mx-auto max-[768px]:my-[10px] max-[768px]:h-[44px] max-[768px]:w-[170px]"
                >
                  <img
                    src="/images/couple-specials/heart-white.png"
                    width="14"
                    height="14"
                    alt="Book Now"
                  />
                  Book Now
                </a>

                <OfferDecoration image={selectedPackage.offerImage} />
              </div>
            </div>

            {/* Right: package image carousel */}
            <div className="min-w-0 pt-0 lg:pt-[9px]">
              <PackageCarousel
                key={activePackage}
                images={selectedPackage.images}
                title={selectedPackage.title}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Colive Cuddle video */}
      <section>
        <div className="w-full">
          <div className="videosection">
            <h2 className="p-[2%] text-center font-semibold text-4xl">
              Colive Cuddle
            </h2>
            <div className="text-center">
              <iframe
                width="853"
                height="480"
                src="https://www.youtube.com/embed/NQRiE2z9Zwc?rel=0"
                title="The perfect Cuddle package for the perfect date night at Colive"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="mx-auto h-[480px] w-[853px] max-[768px]:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* App download */}
      <section className="mt-[8%] max-[768px]:mt-0">
        <div className="relative bg-[#E9E9E9]">
          <div className="mx-auto flex w-[calc(100%-100px)] flex-wrap max-[768px]:w-[calc(100%-50px)]">
            <div className="relative w-full lg:w-[41.666667%] max-[768px]:order-2">
              <picture>
                <source
                  srcSet="/images/couple-specials/section13/App.webp"
                  type="image/webp"
                />
                <source
                  srcSet="/images/couple-specials/section13/App.png"
                  type="image/png"
                />
                <img
                  loading="lazy"
                  src="/images/couple-specials/section13/App.png"
                  alt="pg in Bangalore"
                  className="relative top-0 ml-[20%] h-auto w-[400px] max-w-full lg:absolute lg:-top-[40%] lg:right-[10%] lg:ml-0"
                />
              </picture>
            </div>

            <div className="w-full py-[5%] lg:w-1/2 max-[768px]:order-1 max-[768px]:ml-[10%]">
              <h5 className="mb-[15px] mt-[25px] text-[25px] font-semibold text-black min-[769px]:text-[28px]">
                Managed living spaces for modern renter
              </h5>
              <p className="pb-[2%] text-[25px] text-black max-[768px]:pb-[4%] max-[768px]:text-[15px]">
                Download the Colive mobile app.
              </p>
              <div className="flex gap-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.colivecustomerapp.android"
                  target="_self"
                >
                  <img
                    src="/images/couple-specials/section13/playstore.png"
                    alt="coliving pg in bangalore"
                    className="w-[150px] rounded-[30px]"
                  />
                </a>
                <a
                  href="https://itunes.apple.com/in/app/colive/id1341694959?mt=8"
                  target="_self"
                >
                  <img
                    src="/images/couple-specials/section13/appstore.png"
                    alt="pg in Bangalore"
                    className="w-[150px] rounded-[30px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
