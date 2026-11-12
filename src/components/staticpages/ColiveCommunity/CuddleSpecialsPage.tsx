"use client";

import { useState, type ReactNode } from "react";

type PackageImage = {
  webp: string;
  png: string;
};

const dateNightImages: PackageImage[] = [
  { webp: "/assets/images/home/couple-specials/DN_1.webp", png: "/assets/images/home/couple-specials/DN_1.png" },
  { webp: "/assets/images/home/couple-specials/DN_2.webp", png: "/assets/images/home/couple-specials/DN_2.png" },
  { webp: "/assets/images/home/couple-specials/DN_3.webp", png: "/assets/images/home/couple-specials/DN_3.png" },
  { webp: "/assets/images/home/couple-specials/DN_4.webp", png: "/assets/images/home/couple-specials/DN_4.png" },
];

const roomDecorImages: PackageImage[] = [
  { webp: "/assets/images/home/couple-specials/RP_1.webp", png: "/assets/images/home/couple-specials/RP_1.png" },
  { webp: "/assets/images/home/couple-specials/RP_2.webp", png: "/assets/images/home/couple-specials/RP_2.png" },
  { webp: "/assets/images/home/couple-specials/RP_3.webp", png: "/assets/images/home/couple-specials/RP_3.png" },
  { webp: "/assets/images/home/couple-specials/RP_4.webp", png: "/assets/images/home/couple-specials/RP_4.png" },
];

const dateNightInclusions = [
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
];

const roomDecorInclusions = [
  "Candles",
  "Balloons",
  "Petals",
  "Flower Bouquet",
  "Fairy Lights",
  "I Love You Banner",
  "Chocolates",
];

const terms = [
  "Items such as Led lights, Table & Chair Cloth, Wine glass. Banner will be collected back on the next day from the room",
  "Damage to any of these items will result in additional charges",
  "Colive is not responsible for food ordering or delivery. Residents have to take care of food for themselves",
  "Cutlery will also not be provided by Colive for any occasions",
  "Loud music inside the rooms is prohibited. Please play the music at a controlled volume and causes no disturbance to other residents",
  "Date night setup will be done inside the room only",
  "No special request or additions will be taken care of by Colive. If residents want to add anything extra, it will be entirely their responsibility",
  "For setup of Date night, resident has to inform the Community Manager atleast 2 days prior to make arrangements",
];

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-[calc(100%-100px)] max-[767px]:w-[calc(100%-50px)] ${className}`}>
      {children}
    </div>
  );
}

function Star({ number, mobile = false }: { number: number; mobile?: boolean }) {
  const positions: Record<number, string> = {
    1: "left-[-10px] top-[-40px] h-[26px] w-[26px]",
    2: "right-0 top-[-80px] h-[36px] w-[36px]",
    3: "right-[-42px] top-[20px] h-[26px] w-[26px]",
    4: "left-[-80px] top-[60px] h-[36px] w-[36px]",
    5: "left-[10px] top-[140px] h-[26px] w-[26px]",
    6: "right-[-40px] top-[120px] h-[36px] w-[36px]",
    7: "left-[150px] top-[10px] h-[26px] w-[26px]",
    8: "left-[210px] top-[26px] h-[26px] w-[26px]",
    9: "left-[270px] top-[10px] h-[26px] w-[26px]",
    10: "left-[322px] top-[26px] h-[26px] w-[26px]",
    11: "left-0 top-[80px] h-[26px] w-[26px]",
  };

  const isLarge = number === 2 || number === 4 || number === 6;
  const url = isLarge
    ? "/assets/images/home/couple-specials/star-icons2.png"
    : "/assets/images/home/couple-specials/star-icons.png";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bg-no-repeat ${positions[number]} ${mobile ? "block md:hidden" : "hidden md:block"}`}
      style={{ backgroundImage: `url("${url}")` }}
    />
  );
}

function OfferCarousel({
  images,
  alt,
  mobile = false,
}: {
  images: PackageImage[];
  alt: string;
  mobile?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = images[activeIndex];

  const previous = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);
  const next = () => setActiveIndex((index) => (index + 1) % images.length);

  return (
    <div className={`hero-banner relative border-[5px] border-white ${mobile ? "block md:hidden" : "hidden md:block"} ${mobile ? "mt-0" : "md:-mt-[100px]"}`}>
      <picture>
        <source srcSet={current.webp} type="image/webp" />
        <source srcSet={current.png} type="image/png" />
        <img src={current.png} alt={alt} className="block h-auto w-full" />
      </picture>

      {mobile ? (
        <div className="flex w-full justify-center gap-2 py-3">
          {images.map((image, index) => (
            <button
              key={image.png}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`h-[8px] w-[8px] rounded-full border border-white ${activeIndex === index ? "bg-white" : "bg-transparent"}`}
            />
          ))}
        </div>
      ) : (
        <div className="absolute bottom-[15px] right-[15px] flex gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[rgb(0_0_0_/_45%)] text-[25px] leading-none text-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[rgb(0_0_0_/_45%)] text-[25px] leading-none text-white"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

function PriceDecoration({ image }: { image: string }) {
  return (
    <div className="price-star-section absolute bottom-[20px] right-[40px] hidden h-[120px] w-[120px] md:block">
      <Star number={1} />
      <Star number={2} />
      <Star number={3} />
      <picture>
        <source srcSet={image} type="image/png" />
        <img src={image} alt="Couple package offer" className="h-[120px] w-[120px] object-contain" />
      </picture>
      <Star number={4} />
      <Star number={5} />
      <Star number={6} />
    </div>
  );
}

function OfferContent({
  packageType,
  price,
  originalPrice,
  priceImage,
  images,
  inclusions,
  paymentUrl,
}: {
  packageType: "date" | "decor";
  price: string;
  originalPrice: string;
  priceImage: string;
  images: PackageImage[];
  inclusions: string[];
  paymentUrl: string;
}) {
  const alt = packageType === "date" ? "Date Night Package" : "Room Decor Package";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative">
        <Star number={7} mobile />
        <Star number={8} mobile />
        <Star number={9} mobile />
        <Star number={10} mobile />

        <picture className="block md:hidden">
          <source srcSet="/assets/images/home/couple-specials/new-year-offer-mob.png" type="image/png" />
          <img
            src="/assets/images/home/couple-specials/new-year-offer-mob.png"
            width={100}
            height={100}
            alt={alt}
            className="block h-auto w-full"
          />
        </picture>

        <h3 className="block py-[15px] pb-6 text-[19px] font-bold text-white md:hidden">
          {price} <span className="text-[16px] font-medium text-white">Per Couple <u className="decoration-line-through">{originalPrice}</u></span>
        </h3>

        <Star number={11} mobile />

        <OfferCarousel images={images} alt={alt} mobile />

        <div className="px-0">
          <h5 className="mb-[15px] mt-[25px] text-[22px] font-semibold text-black max-[767px]:text-[20px]">
            Inclusions
          </h5>
          <ul className="columns-2 pl-4">
            {inclusions.map((item) => (
              <li key={item} className="mb-[10px] text-[18px] text-white max-[767px]:text-[16px]">
                {item}
              </li>
            ))}
          </ul>

          <a
            href={paymentUrl}
            className="mt-5 mx-0 flex h-12 w-[200px] items-center justify-center gap-2 rounded-[5px] border border-black bg-black text-[20px] text-white no-underline max-[767px]:mx-auto max-[767px]:h-[44px] max-[767px]:w-[170px]"
          >
            <img src="/assets/images/home/couple-specials/heart-white.png" width={14} height={14} alt="Book Now" />
            Book Now
          </a>

          <div className="hidden">
            <p>{packageType === "date" ? "₹ 1,999" : "₹ 999"} <br /><span>Per couple</span></p>
          </div>
        </div>

        <PriceDecoration image={priceImage} />
      </div>

      <div>
        <OfferCarousel images={images} alt={alt} />
      </div>
    </div>
  );
}

export default function CuddleSpecialsPage() {
  const [activeTab, setActiveTab] = useState<"date" | "decor">("date");

  return (
    <main className="overflow-x-hidden bg-white font-[Inter,Arial,sans-serif] text-black">
      {/* Hero banner. Header and footer are intentionally not included. */}
      <section className="bg-[#F2006C] px-5 py-12 text-center text-white md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="mb-3 text-[42px] font-bold leading-tight max-[767px]:text-[30px]">
            Cuddle Specials
          </h1>
          <p className="mb-0 text-[20px] leading-[1.45] max-[767px]:text-[16px]">
            Love is in the air, and we’ve got something <br />
            special lined up just for you!
          </p>
        </div>
      </section>

      <section className="cuddlewrap">
        <div className="our-couple-specials relative z-0 mt-[3%] bg-[#F2006C] py-[3%] max-[767px]:mt-[10%] max-[767px]:py-[10%]">
          <Container>
            <h2 className="sectiontitle mb-5 mt-0 text-[35px] font-semibold text-white max-[767px]:mb-5 max-[767px]:text-[24px]">
              Our Couple Specials
            </h2>

            <div className="w-full">
              <div className="mb-5 flex w-[40%] flex-nowrap rounded-full border border-white max-[767px]:ml-[-2%] max-[767px]:w-[105%]">
                <button
                  id="one-tab"
                  type="button"
                  role="tab"
                  aria-controls="one"
                  aria-selected={activeTab === "date"}
                  onClick={() => setActiveTab("date")}
                  className={`w-1/2 rounded-full border-0 px-[7px] py-[14px] text-center text-[18px] font-medium leading-5 text-white no-underline max-[767px]:text-[14px] ${activeTab === "date" ? "bg-white font-semibold text-black" : "bg-transparent"}`}
                >
                  Date Night Package
                </button>
                <button
                  id="two-tab"
                  type="button"
                  role="tab"
                  aria-controls="two"
                  aria-selected={activeTab === "decor"}
                  onClick={() => setActiveTab("decor")}
                  className={`w-1/2 rounded-full border-0 px-[7px] py-[14px] text-center text-[18px] font-medium leading-5 text-white no-underline max-[767px]:text-[14px] ${activeTab === "decor" ? "bg-white font-semibold text-black" : "bg-transparent"}`}
                >
                  Room Decor Package
                </button>
              </div>

              {activeTab === "date" ? (
                <div id="one" role="tabpanel" aria-labelledby="one-tab">
                  <OfferContent
                    packageType="date"
                    price="₹ 1,599"
                    originalPrice="₹ 1,999"
                    priceImage="/assets/images/home/couple-specials/new-year-offer.png"
                    images={dateNightImages}
                    inclusions={dateNightInclusions}
                    paymentUrl="/payments?src=cuddle&pakge=3"
                  />
                </div>
              ) : (
                <div id="two" role="tabpanel" aria-labelledby="two-tab">
                  <OfferContent
                    packageType="decor"
                    price="₹ 799"
                    originalPrice="₹ 999"
                    priceImage="/assets/images/home/couple-specials/new-year-offer2.png"
                    images={roomDecorImages}
                    inclusions={roomDecorInclusions}
                    paymentUrl="/payments?src=cuddle&pakge=4"
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      </section>

      {/* Video */}
      <section className="mt-[3%] px-5 py-12 text-center">
        <h2 className="mb-6 text-[35px] font-bold max-[767px]:text-[26px]">
          Colive Cuddle
        </h2>
        <div className="ifremevideo mx-auto w-full max-w-[853px] overflow-hidden">
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/embed/NQRiE2z9Zwc?rel=0"
            title="The perfect Cuddle package for the perfect date night at Colive"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full border-0 max-[767px]:h-[300px]"
          />
        </div>
      </section>

      {/* Colive mobile app promotion */}
      <section className="section13 mt-[10%]">
        <div className="appwrap relative bg-[#F2006C]">
          <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center max-[767px]:w-[calc(100%-50px)] lg:grid-cols-12">
            <div className="colive-app relative order-2 lg:order-1 lg:col-span-5">
              <picture>
                <source srcSet="/images/couple-specials/section13/App.webp" type="image/webp" />
                <source srcSet="/images/couple-specials/section13/App.png" type="image/png" />
                <img
                  loading="lazy"
                  src="/images/couple-specials/section13/App.png"
                  alt="pg in Bangalore"
                  className="mx-auto block h-auto w-[250px] max-w-full lg:absolute lg:right-[10%] lg:top-[-32%] lg:w-[400px]"
                />
              </picture>
            </div>

            <div className="appblock order-1 py-[5%] text-center lg:col-span-6 lg:order-2 lg:text-left">
              <h5 className="mb-3 text-[28px] font-semibold text-white max-[767px]:text-[25px]">
                Managed living spaces for modern renter
              </h5>
              <p className="mb-0 pb-[2%] text-[25px] text-white max-[767px]:pb-[4%] max-[767px]:text-[15px]">
                Download the Colive mobile app.
              </p>
              <div className="userapps flex flex-wrap justify-center gap-5 lg:justify-start">
                <a href="https://play.google.com/store/apps/details?id=com.colivecustomerapp.android" target="_self">
                  <img
                    src="/images/couple-specials/section13/playstore.png"
                    alt="coliving pg in bangalore"
                    className="w-[150px] rounded-[30px] transition-opacity hover:opacity-80"
                  />
                </a>
                <a href="https://itunes.apple.com/in/app/colive/id1341694959?mt=8" target="_self">
                  <img
                    src="/images/couple-specials/section13/appstore.png"
                    alt="pg in Bangalore"
                    className="w-[150px] rounded-[30px] transition-opacity hover:opacity-80"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original hidden Terms & Conditions modal. The launch link is commented out in the supplied HTML. */}
      <div id="tandc" className="hidden" aria-hidden="true">
        <div className="tncmodal">
          <h5>Terms &amp; Conditions</h5>
          <ul className="list-disc space-y-3 pl-5">
            {terms.map((term) => <li key={term}>{term}</li>)}
          </ul>
        </div>
      </div>

      <div id="AjaxLoader" className="hidden" aria-hidden="true">
        <div className="CssLoaderAlign">
          <div className="Logo-loader" />
          <div className="logoloader" />
        </div>
      </div>
    </main>
  );
}
