"use client";

import React from "react";

declare global {
  interface Window {
    SubmitEnquiryNowForm?: (
      formId: string,
      modalId: string,
      containerId: string
    ) => void;
    disableOption1?: () => void;
  }
}

const vasAssets = "/images/VAS";

const snackItems = [
  {
    image: "Ethnic-Snax",
    title: "Ethnic Snax",
    description:
      "Explore a wide variety of dry snacks made with fine, natural ingredients for a healthy, wealthy and wise binge-session brought to you by Rusingo,",
    price: "Rs. 50/-",
  },
  {
    image: "Desserts",
    title: "Desserts",
    description:
      "Exquisite chocolates made with real, authentic and high quality ingredients by master chocolatiers in the world. Our masterpieces create those perfect moments of delight each time, every time",
    price: "Rs. 50/-",
  },
  {
    image: "Tipplr",
    title: "Tipplr Food Delivery",
    description:
      "Binge on your favourite snacks, meals or cheat day specials at Colive with our official food delivery partner, Tipplr! Order meals right to your doorstep, just scan the QR code on your bedside, it’s as simple as that.",
  },
];

const storeItems = [
  {
    image: "Cosmetics",
    title: "Cosmetics",
    description: (
      <>
        Vaadi Herbals - 100% organic skin &amp; hair care premium products, at
        reasonable prices. Products are effective for the purpose they are built
        for
        <br />
        Timeless - Made with natural and cruelty free ingredients,
        dermatologically tested for all skin types under reasonable prices
      </>
    ),
    price: "Rs. 550/-",
    prefix: "starting at just",
  },
  {
    image: "Clothing",
    title: "Clothing",
    description:
      "Grab exclusive Fabwear collection, 100% cotton, round & collar neck T-shirt for Men",
    price: "Rs. 799/-",
    prefix: "starting at just",
  },
  {
    image: "Laundry-Zone",
    title: "Laundry Zone",
    description:
      "Pick and drop your laundry at our very own, Colive Laundry Zone! Get freshly washed, ironed and folded clothes delivered to you in just 24 hours",
    price: "Rs. 70/-",
    prefix: "starting at just",
    suffix: " per kg",
  },
];

const inputClass =
  "mx-auto h-[45px] w-full rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px] text-black outline-none placeholder:text-[#666] focus:border-[#777]";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="my-[2%] text-[40px] font-bold leading-[1.25] text-black max-[767px]:my-[4%] max-[767px]:text-[25px] max-[767px]:leading-[35px]">
        {children}
      </h2>
    </div>
  );
}

function SnackCard({
  item,
}: {
  item: (typeof snackItems)[number];
}) {
  return (
    <div className="w-full p-[15px] max-[767px]:px-3">
      <article className="h-full overflow-hidden rounded-[5px] bg-white shadow-[0_4px_20px_0_#0000001A]">
        <picture>
          <source srcSet={`${vasAssets}/${item.image}.webp`} type="image/webp" />
          <source srcSet={`${vasAssets}/${item.image}.webp`} type="image/png" />
          <img
            src={`${vasAssets}/${item.image}.png`}
            alt={item.image}
            className="block h-auto w-full"
          />
        </picture>
        <div className="relative min-h-[180px] rounded-[5px] p-[10px] max-[767px]:min-h-[210px] max-[767px]:bg-white">
          <div className="pb-1">
            <h5 className="pb-1 text-[20px] font-semibold leading-7 text-black max-[767px]:text-[18px] max-[767px]:leading-[25px]">
              {item.title}
            </h5>
          </div>
          <div>
            <p className="text-[15px] leading-[22px] text-black max-[767px]:text-justify max-[767px]:text-[12px] max-[767px]:leading-5">
              {item.description}
            </p>
          </div>
          {"price" in item && item.price && (
            <div className="absolute bottom-[10px] left-[10px] max-[767px]:static max-[767px]:pt-[10px]">
              <p className="text-[14px] text-black max-[767px]:text-[12px]">
                <span className="text-[20px] max-[767px]:text-[18px]">
                  {item.price}
                </span>
                Only
              </p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

function StoreCard({
  item,
}: {
  item: (typeof storeItems)[number];
}) {
  return (
    <div className="w-full p-[15px] max-[767px]:px-3">
      <article className="h-full overflow-hidden rounded-[5px] bg-white shadow-[0_4px_20px_0_#0000001A]">
        <picture>
          {item.image !== "Laundry-Zone" && (
            <>
              <source
                srcSet={`${vasAssets}/${item.image}.webp`}
                type="image/webp"
              />
              <source
                srcSet={`${vasAssets}/${item.image}.webp`}
                type="image/png"
              />
            </>
          )}
          <img
            src={`${vasAssets}/${item.image}.png`}
            alt={item.image}
            className="block h-auto w-full"
          />
        </picture>
        <div className="relative min-h-[220px] p-[10px] max-[767px]:min-h-[255px] max-[767px]:rounded-[5px] max-[767px]:border max-[767px]:border-[#E8E8E8] max-[767px]:bg-white">
          <div className="pb-1">
            <h5 className="pb-1 text-[20px] font-semibold leading-7 text-black max-[767px]:text-[18px] max-[767px]:leading-[25px]">
              {item.title}
            </h5>
          </div>
          <div>
            <p className="text-[15px] leading-[22px] text-black max-[767px]:text-justify max-[767px]:text-[12px] max-[767px]:leading-5">
              {item.description}
            </p>
          </div>
          <div className="absolute bottom-[10px] left-[10px] max-[767px]:bottom-[10px]">
            <p className="text-[14px] text-black max-[767px]:text-[12px]">
              {item.prefix}{" "}
              <span className="text-[20px] max-[767px]:text-[18px]">
                {item.price}
              </span>
              {item.suffix}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function EnquiryForm() {
  const handleSubmit = () => {
    window.SubmitEnquiryNowForm?.(
      "enquiryNowForm",
      "thankyouModal",
      "dvEnquiryNowForm"
    );
  };

  const selectClass = `${inputClass} appearance-none pr-10`;

  return (
    <div
      id="dvEnquiryNowForm"
      className="homepage-form w-full bg-white px-0 pb-[2%] lg:mt-[9px] lg:mb-0 lg:ml-[-1%]"
    >
      <div className="enquireforms bg-white">
        <form
          method="post"
          id="enquiryNowForm"
          name="enquiryNowForm"
          className="enquiryNowForm block"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <div className="border-0 pb-0 pl-0 pt-4">
            <h3
              id="enquireExampleModalLabel"
              className="mb-0 px-5 pb-[15px] text-[22px] font-semibold text-black max-[767px]:pl-0 max-[767px]:text-[18px]"
            >
              Get personally{" "}
              <span className="text-[#F2006C]">connected with us.</span>
            </h3>
          </div>

          <div id="form-content" className="px-5 max-[767px]:px-[5px]">
            <div className="relative mb-[4%]">
              <input
                className={inputClass}
                type="text"
                name="fname"
                id="fname"
                placeholder="Name*"
              />
            </div>

            <div className="relative mb-[4%]">
              <span className="absolute bottom-3 left-[5px] z-10 border-r border-black pr-[7px] text-[14px] text-black">
                +91
              </span>
              <input
                className={`${inputClass} !pl-[13%] max-[767px]:!pl-[15%]`}
                type="tel"
                name="mobileno"
                id="mobileno"
                pattern="[6789][0-9]{9}"
                maxLength={10}
                placeholder="Mobile number*"
              />
            </div>

            <div className="relative mb-[4%]">
              <input
                className={inputClass}
                type="email"
                name="email"
                id="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}"
                placeholder="Email*"
              />
            </div>

            <div className="relative mb-[4%]">
              <select
                name="city"
                id="city"
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select City
                </option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="pointer-events-none absolute right-[15px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#616161]"
                fill="none"
              >
                <path d="m2.5 5.5 5.5 5 5.5-5" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </div>

            <div className="relative mb-[4%]">
              <select
                className={selectClass}
                name="locality"
                id="locality"
                defaultValue=""
              >
                <option value="">Select Location </option>
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="pointer-events-none absolute right-[15px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#616161]"
                fill="none"
              >
                <path d="m2.5 5.5 5.5 5 5.5-5" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </div>

            <div className="relative mb-[4%]">
              <select
                name="accommodation"
                id="accommodation"
                className={selectClass}
                defaultValue=""
                onChange={() => window.disableOption1?.()}
              >
                <option value="" disabled>
                  Accommodation Type*
                </option>
                <option value="Private Room">Private Room</option>
                <option value="Double sharing Studio">Double sharing Studio</option>
                <option value="Triple sharing Studio">Triple sharing Studio</option>
                <option value="1 BHK">1 BHK</option>
                <option value="Couple sharing">Couple sharing</option>
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="pointer-events-none absolute right-[15px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#616161]"
                fill="none"
              >
                <path d="m2.5 5.5 5.5 5 5.5-5" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </div>

            <div className="mb-[4%] flex items-center justify-center">
              <input
                className="h-[45px] w-full cursor-pointer rounded-[5px] border border-[#F2006C] bg-[#F2006C] p-[5px] text-[18px] font-semibold text-white"
                type="button"
                value="Submit"
                name="submit"
                onClick={handleSubmit}
              />
              <input type="hidden" name="gclid" id="gclid" />
              <input type="hidden" name="utm_source" id="utm_source" />
              <input type="hidden" name="utm_medium" id="utm_medium" />
              <input type="hidden" name="utm_campaign" id="utm_campaign" />
              <input type="hidden" name="utm_content" id="utm_content" />
              <input type="hidden" name="utm_term" id="utm_term" />
              <input type="hidden" name="utm_keyword" id="utm_keyword" />
              <input type="hidden" name="leadSource" id="leadSource" value="Colive VAS" />
              <input type="hidden" name="LandingPageId" id="LandingPageId" value="62" />
              <input
                type="hidden"
                name="Mobile_Number_Validated"
                id="Mobile_Number_Validated"
                value="false"
              />
              <input
                type="hidden"
                name="IsOtpVerificationRequired"
                id="IsOtpVerificationRequired"
                value="false"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="reach-us text-center">
        <p className="text-center text-black">
          Need Assistance? Call at{" "}
          <a
            href="tel:+917676000500"
            className="font-bold text-[#F2006C] underline"
          >
            7676 000 500
          </a>
        </p>
      </div>
    </div>
  );
}

export default function VasPage() {
  return (
    <main className="w-full font-['Inter-Regular',Arial,sans-serif] text-black">
      {/* Hero section */}
      <section className="section1">
        <div className="mt-[10%] bg-[url('/images/VAS/Banner.webp')] bg-[length:100%_100%] bg-no-repeat max-[767px]:mt-[70px] max-[767px]:bg-[url('/images/VAS/Banner-mob.webp')]">
          <div className="mx-auto w-[calc(100%-100px)] max-[767px]:w-[calc(100%-32px)]">
            <h1 className="py-[5%] text-center text-[40px] font-semibold leading-[56px] text-white max-[767px]:pt-[10%] max-[767px]:pb-[5%] max-[767px]:text-[23px] max-[767px]:leading-8 min-[768px]:text-[40px] min-[768px]:leading-[56px] max-[375px]:pt-[13%] max-[375px]:text-[21px] max-[375px]:leading-[30px]">
              &quot;Colive&apos;s new triad of delight: Sip, Snack, and Shop to
              <br />
              redefine your living experience!&quot;
            </h1>

            <div className="flex flex-wrap justify-center pb-[5%] max-[767px]:px-[8%] max-[767px]:pb-[10%] max-[767px]:pt-[8%]">
              <div className="w-1/3 px-[3%] max-[767px]:mb-[5%] max-[767px]:w-full max-[767px]:px-[15%]">
                <a href="#store@colive" className="block text-[25px] max-[767px]:text-[18px]">
                  <div className="flex items-center justify-center rounded-[5px] border-0 bg-[#F2006C] text-white">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 border-0 bg-transparent p-[10px] text-white"
                    >
                      <img
                        src="/images/VAS/cafe.png"
                        alt="cafe"
                        className="h-auto w-auto max-w-full max-[767px]:w-[25px]"
                      />
                      Cafe@Colive
                    </button>
                  </div>
                </a>
              </div>

              <div className="w-1/3 px-[3%] max-[767px]:mb-[5%] max-[767px]:w-full max-[767px]:px-[15%]">
                <a href="#snack@colive" className="block text-[25px] max-[767px]:text-[18px]">
                  <div className="flex items-center justify-center rounded-[5px] border-0 bg-[#F2006C] text-white">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 border-0 bg-transparent p-[10px] text-white"
                    >
                      <img
                        src="/images/VAS/snack.png"
                        alt="cafe"
                        className="h-auto w-auto max-w-full max-[767px]:w-[25px]"
                      />
                      Snack@Colive
                    </button>
                  </div>
                </a>
              </div>

              <div className="w-1/3 px-[3%] max-[767px]:mb-[5%] max-[767px]:w-full max-[767px]:px-[15%]">
                <a href="#store@colive" className="block text-[25px] max-[767px]:text-[18px]">
                  <div className="flex items-center justify-center rounded-[5px] border-0 bg-[#F2006C] text-white">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 border-0 bg-transparent p-[10px] text-white"
                    >
                      <img
                        src="/images/VAS/store.png"
                        alt="cafe"
                        className="h-auto w-auto max-w-full max-[767px]:w-[25px]"
                      />
                      Store@Colive
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cafe section */}
      <section id="cafe@colive" className="section2 vassection">
        <div className="cafewrap">
          <SectionTitle>Cafe @ Colive</SectionTitle>

          <div className="hidden md:block">
            <picture>
              <source
                srcSet={`${vasAssets}/Cafe@C.webp`}
                type="image/webp"
              />
              <source
                srcSet={`${vasAssets}/Cafe@C.webp`}
                type="image/png"
              />
              <img
                src={`${vasAssets}/Cafe@C.png`}
                alt="Cafe"
                className="block h-auto w-full"
              />
            </picture>
          </div>

          <div className="block md:hidden">
            <picture>
              <source
                srcSet={`${vasAssets}/cafemobview.webp`}
                type="image/webp"
              />
              <source
                srcSet={`${vasAssets}/cafemobview.webp`}
                type="image/png"
              />
              <img
                src={`${vasAssets}/cafemobview.png`}
                alt="Cafe"
                className="block h-auto w-full"
              />
            </picture>
          </div>

          <SectionTitle>Live Counter</SectionTitle>
          <h6 className="px-[5%] text-center text-[25px] leading-[35px] text-black max-[767px]:text-[14px] max-[767px]:leading-[19px]">
            Indulge in delicious chinese wok cuisines at The{" "}
            <a href="/" className="cursor-pointer text-black">
              Colive
            </a>{" "}
            Cafe. Explore a <br className="max-[767px]:hidden" /> wide range of
            Veg/Non-veg noodles and fried rice
          </h6>

          <div className="mx-auto mt-4 grid w-[calc(100%-100px)] grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3 max-[767px]:w-[calc(100%-32px)]">
            {[
              {
                image: "Rice-veg",
                alt: "Rice veg",
                title: "Rice- Veg",
                description:
                  "Schezwan Fried Rice, Chilly Mushroom Fried Rice, Exotic Vegetable Fried Rice, Zucchini & Mushroom Fried Rice, Burnt Garlic Fried Rice, Herbed Fried Rice, Peri Peri Fried Rice, Chilly gobi Fried Rice",
              },
              {
                image: "Rice-nonveg",
                alt: "Rice-nonveg",
                title: "Rice- Non Veg",
                description:
                  "Schezwan Chicken Fried Rice,Schezwan Egg Fried Rice, Chinese Egg Fried Rice,Chinese Fried Rice",
              },
              {
                image: "Vegnoodles",
                alt: "Vegnoodles",
                title: "Noodles Veg",
                description:
                  "Veg-Veg Schezwan Noodles,Mexican Veg Noodles,Honey Chilli Noodles, Broccoli Zucchini Noodles,Exotic veg fried Noodles,Chow Mein Noodles,Paneer Fried Noodles",
              },
              {
                image: "Nonvegnoodles",
                alt: "Nonvegnoodles",
                title: "Noodles- Non Veg",
                description:
                  "Chicken Sausage Fried Noodles,Chicken Schezwan Noodles,Chicken Sesame Noodles,Chicken Fried Noodles",
              },
              {
                image: "Coffee-Machine",
                alt: "Coffee-Machine",
                title: "Cherise Coffee Vending Machine",
                description:
                  "Grab your choice of hot, piping beverages at the Cherise vending machine",
              },
              {
                image: "Food-Vending-Machine",
                alt: "Food-Vending-Machine",
                title: "Daalchini Food Vending Machine",
                description:
                  "For the days that go by in a haste, relish select dishes cooked fresh and brought to you by Daalchini to your doorstep",
              },
              {
                image: "Big-Basket",
                alt: "Big-Basket",
                title: "Big Basket Daily Groceries & Dairy Services",
                description:
                  "Your daily necessities and ultimate night cravings now made simpler with Big basket at Colive. Buy dairy, sweet or savory items by just scanning the QR code.",
              },
            ].map((item) => (
              <div key={item.image} className="mt-4 w-full p-[15px]">
                <article className="overflow-hidden rounded-[5px] border border-[#E8E8E8] shadow-[0_4px_40px_0_#0000001A]">
                  <picture>
                    <source
                      srcSet={`${vasAssets}/${item.image}.webp`}
                      type="image/webp"
                    />
                    <source
                      srcSet={`${vasAssets}/${item.image}.webp`}
                      type="image/png"
                    />
                    <img
                      src={`${vasAssets}/${item.image}.png`}
                      alt={item.alt}
                      className="block h-auto w-full"
                    />
                  </picture>
                  <div className="relative min-h-[180px] rounded-[5px] p-[10px] max-[767px]:min-h-0">
                    <h5 className="pb-1 text-[20px] font-semibold leading-7 text-black max-[767px]:text-[18px] max-[767px]:leading-[25px]">
                      {item.title}
                    </h5>
                    <p className="text-[15px] leading-[22px] text-black max-[767px]:text-justify max-[767px]:text-[12px] max-[767px]:leading-5">
                      {item.description}
                    </p>
                    <div className="absolute bottom-[10px] left-[10px] max-[767px]:static max-[767px]:pt-[10px]">
                      <p className="text-[14px] text-black max-[767px]:text-[12px]">
                        starting at just{" "}
                        <span className="text-[20px] max-[767px]:text-[18px]">
                          Rs. 99/-
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snack section */}
      <section
        id="snack@colive"
        className="section3 vassection pb-0 pt-0 max-[767px]:pb-[5%] max-[767px]:pt-[2%]"
      >
        <div className="mx-auto w-[calc(100%-100px)] max-[767px]:w-[calc(100%-32px)]">
          <SectionTitle>Snack @ Colive</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {snackItems.map((item) => (
              <SnackCard key={item.image} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Store section */}
      <section
        id="store@colive"
        className="section4 vassection pb-0 max-[767px]:pb-[5%]"
      >
        <div className="mx-auto w-[calc(100%-100px)] max-[767px]:w-[calc(100%-32px)]">
          <SectionTitle>Store @ Colive</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {storeItems.map((item) => (
              <StoreCard key={item.image} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form section */}
      <section className="section5 relative mt-0 bg-[rgba(170,170,170,0.1)] max-[767px]:mb-[-74px] max-[767px]:mt-0 max-[767px]:pb-[10%]">
        <div className="mx-auto w-[calc(100%-100px)] max-[767px]:w-[calc(100%-32px)]">
          <div className="grid grid-cols-1 items-start lg:grid-cols-12">
            <div className="w-full lg:col-span-7">
              <div className="!grid !grid-cols-1 !items-start lg:!grid-cols-[48.5%_51.5%]">
                <picture className="!block !w-full !min-w-0">
                  <source
                    srcSet="/images/VAS/section14/form.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="/images/VAS/section14/form.png"
                    type="image/png"
                  />
                  <img
                    loading="lazy"
                    src="/images/VAS/section14/form.png"
                    alt="Chennai"
                    className="!relative !left-0 !top-0 !block !h-auto !w-[110%] !max-w-none !object-contain !object-left"
                  />
                </picture>

                <div className="!relative !z-10 !w-full !min-w-0 !px-3 !pt-[13%] lg:!px-0">
                  <div className="!flex !items-center !gap-2">
                    <h3 className="!m-0 !whitespace-nowrap !text-[40px] !font-semibold !leading-[1.2] !text-[#172B45] max-[767px]:!text-[22px]">
                      Get in touch
                    </h3>
                    <img
                      loading="lazy"
                      src="/images/VAS/section14/sent.png"
                      alt="sent"
                      className="!mt-0 !w-[50px] !shrink-0 max-[767px]:!w-[30px]"
                    />
                  </div>
                  <p className="!mb-3 !mt-3 !text-[22px] !leading-normal !text-[#172B45] max-[767px]:!text-[12px]">
                    Our best homes are selling fast!
                  </p>
                  <p className="!mb-3 !mt-0 !text-[22px] !leading-normal !text-[#172B45] max-[767px]:!text-[12px]">
                    Get personally connected with us.
                  </p>
                  <img
                    loading="lazy"
                    src="/images/VAS/section14/arrow.png"
                    alt="getintouch"
                    className="!mt-0 !w-[100px] max-[767px]:!mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="hidden lg:col-span-1 lg:block" />
            <div className="enquire-form w-full lg:col-span-4">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
