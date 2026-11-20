"use client";

import { useEffect, useState } from "react";

const trackingFields = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_keyword"];

const floorPlans = [
  ["floorplan1", "floorplan1"], ["floorplan2", "floorplan6"],
  ["floorplan3", "floorplan2"], ["floorplan4", "floorplan3"],
  ["floorplan5", "floorplan4"], ["floorplan6", "floorplan5"],
];

const amenities = [
  ["wifi.png", "wifi", "24*7 WiFi"],
  ["Outdoor.png", "Outdoor", "Outdoor arena"],
  ["Shuttle-bus.png", "Shuttle-bus", "Shuttle bus"],
  ["Meal.png", "Meal", "2 Meals/day"],
  ["Library.png", "Library", "Library"],
  ["Conferenceroom.png", "Conferenceroom", "Conference Room"],
  ["Boardroom.png", "Boardroom", "Board Room"],
  ["reception.png", "reception", "Receptions"],
  ["Doublesharing.png", "Doublesharing", "Double sharing room"],
  ["Commonarea.png", "Commonarea", "Common Area"],
  ["cafe.png", "cafe", "Cafeteria"],
  ["kitchenset.png", "kitchenset", "Kitchen"],
  ["Indoorarena.png", "Indoorarena", "Indoor arena"],
  ["Entatirement.png", "Entatirement", "Entertainment arena"],
  ["fitness.png", "fitness", "Fitness zones"],
  ["Study.png", "Study", "Study nooks"],
  ["Lab.png", "Lab", "Laboratory"],
  ["Auditorim.png", "Auditorim", "Auditoriums"],
  ["Quitezone.png", "Quitezone", "Quite Zones"],
];

const featureCards = [
  ["Educampus.png", "Educampus", "EduCampus", "The educational institute at the heart of EduCity,  a dynamic & transformative center of learning."],
  ["Discovery.png", "Discovery", "Discovery Hub", "Technologically advanced classrooms, collaboration spaces for a vibrant learning environment."],
  ["Discover.png", "Discover", "Discovery Plaza", "Vibrant & inviting arrival spaces, an informative outdoor gathering space."],
];

const packages = [
  { name: "Bronze", rooms: "3", price: "₹ 1,31,454", image: "Bronze.png", style: "bg-[#FAEAE2]" },
  { name: "Silver", rooms: "6", price: "₹ 2,79,211", image: "Silver.png", style: "bg-[#F0F0F1]" },
  { name: "Gold", rooms: "8", price: "₹ 3,57,388", image: "Gold.png", style: "bg-[#F3E4D3]" },
];

const seating = [
  ["30 Seater", "8 Rooms", "240 Capacity"],
  ["50 Seater", "9 Rooms", "450 Capacity"],
  ["60 Seater", "8 Rooms", "480 Capacity"],
  ["80 Seater", "8 Rooms", "200 Capacity"],
];

function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [tracking, setTracking] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const values: Record<string, string> = {};
    trackingFields.forEach((field) => { values[field] = params.get(field) ?? ""; });
    setTracking(values);
  }, []);

  return (
    <div className="fixed inset-0 z-[1055] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="educity-enquire-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="my-auto w-full max-w-[500px] overflow-hidden rounded-[10px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b-2 border-[#555] px-6 py-5">
          <h5 id="educity-enquire-title" className="text-[23px] font-semibold">Enquire <span className="text-[#F2006C]">Now</span></h5>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center text-3xl leading-none text-gray-600">×</button>
        </div>
        <div className="px-6 py-6">
          <div id="dvAarraPopup" className="w-full">
            <form action="/api/Offers/LeadCapture" method="post" id="popupform" name="popupform" className="w-full">
              <div id="form-content">
                <div className="mb-4" />
                <div className="relative mb-5">
                  <label htmlFor="first_name" className="mb-2 block text-sm">Name<sup className="text-red-600">*</sup></label>
                  <input className="mb-5 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 outline-none focus:ring-2 focus:ring-[#F2006C]/30" type="text" name="first_name" id="first_name" required />
                </div>
                <div className="relative mb-5">
                  <label htmlFor="customer_mobile" className="mb-2 block text-sm">Mobile Number<sup className="text-red-600">*</sup></label>
                  <span className="absolute left-[10px] top-1/2 text-sm">+91 |</span>
                  <input className="mb-5 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] pl-[13%] pr-3 outline-none focus:ring-2 focus:ring-[#F2006C]/30" type="tel" name="customer_mobile" id="customer_mobile" pattern="[6789][0-9]{10}" required />
                </div>
                <div className="relative mb-5">
                  <label htmlFor="customer_email" className="mb-2 block text-sm">E-mail</label>
                  <input className="mb-5 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 outline-none focus:ring-2 focus:ring-[#F2006C]/30" type="email" name="customer_email" id="customer_email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}" />
                </div>
                <div className="mt-4 mb-4 text-center">
                  <input className="w-full cursor-pointer rounded-[3px] bg-[#F2006C] py-3 text-lg font-medium text-white" type="submit" value="Submit" name="submit" />
                  {trackingFields.map((field) => <input key={field} type="hidden" name={field} id={field} value={tracking[field] ?? ""} readOnly />)}
                  <input type="hidden" name="leadSource" id="leadSource" value="Colive Educity" />
                  <input type="hidden" name="LandingPageId" id="LandingPageId" value="63" />
                  <input type="hidden" name="Mobile_Number_Validated" id="Mobile_Number_Validated" value="false" />
                  <input type="hidden" name="redirectURL" id="redirectURL" value="/educity/?act=thankyou" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThankYouModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[1060] flex items-center justify-center bg-black/50 px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="educity-thankyou-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-[500px] rounded-[5px_5px_10px_5px] border-t-[5px] border-[#F2006C] bg-white px-6 pb-8 shadow-xl">
        <div className="flex justify-end pt-2"><button type="button" onClick={onClose} aria-label="Close" className="mr-[10px] mt-[10px] text-3xl leading-none text-gray-600">×</button></div>
        <div id="form-content">
          <div className="py-3 text-center">
            <img className="mx-auto h-auto w-[100px]" width="100" alt="success" src="/images/modal/img2.png" />
            <h2 id="educity-thankyou-title" className="text-[60px] font-semibold leading-[90px]">Thank You!</h2>
          </div>
          <div className="text-center">
            <h6 className="mb-[22px] text-base leading-[1.5] font-medium tracking-[1px] text-[#212529]">Our team will reach out to you soon with matching properties...</h6>
            <p className="font-semibold">Reach out to <span className="text-[#F2006C]">7676 000 500</span> to speak to our agent live</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EducityPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);

  const showPreviousFloorPlan = () => {
    setActiveFloorPlan((current) =>
      current === 0 ? floorPlans.length - 1 : current - 1
    );
  };

  const showNextFloorPlan = () => {
    setActiveFloorPlan((current) =>
      current === floorPlans.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("act")?.startsWith("thankyou")) setThankYouOpen(true);
  }, []);

  return (
    <main className="-mt-[8%] overflow-x-hidden font-['Inter-Regular'] text-[#212529]">
      {/* Hero */}
      <section className="section1">
        <div className="mt-[50px] bg-[url('/images/educity/HeroBanner-Mob.webp')] bg-[length:100%_100%] bg-no-repeat md:mt-[10%] md:bg-[url('/images/educity/HeroBanner.webp')]">
          <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
            <div className="banner-content">
              <h1 className="px-[5%] pt-[70%] text-center text-[35px] leading-[49px] font-bold text-white md:px-0 md:pt-[7%] md:text-left md:text-[65px] md:leading-tight">
                Blooming In <span className="block md:inline">New<br className="hidden md:block" /> Whitefield</span>
              </h1>
              <p className="py-[10px] text-center text-lg font-medium text-white md:py-[0.5%_0_1%] md:text-left md:text-[25px]">Embrace the allure of New Bengaluru</p>
              <div className="flex flex-wrap justify-center gap-3 pt-[2%] pb-[10%] md:justify-start md:gap-5">
                <button type="button" onClick={() => setApplyOpen(true)} className="rounded-[5px] bg-[#F2006C] px-10 py-3 text-sm leading-[26px] text-white hover:text-white md:px-[45px] md:py-[15px] md:text-xl">Apply Now</button>
                <a href="tel:8073866678" className="rounded-[5px] border-2 border-[#F2006C] bg-transparent px-6 py-3 text-sm text-[#F2006C] md:px-[45px] md:py-[15px] md:text-xl">Call: 80738 66678</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About EduCity */}
      <section className="py-[3%]">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <picture><source srcSet="/images/educity/about.webp" type="image/webp" /><source srcSet="/images/educity/about.png" type="image/png" /><img src="/images/educity/about.png" alt="LPG" className="w-full" /></picture>
            </div>
            <div className="flex flex-col justify-center lg:col-span-7 lg:pl-[4%]">
              <div className="about-educity">
                <h2 className="pb-[10px] pt-4 text-lg font-semibold md:pb-[2%] md:pt-0 md:text-[35px]">About EduCity</h2>
                <p className="text-justify text-sm leading-[22px] md:text-lg md:leading-7">
                  EduCity is not just a university but a holistic ecosystem designed to provide a seamless educational experience for students, fostering both intellectual growth &amp; personal well-being.<br /><br />
                  EduCampus, the educational institute at the heart of Educity, is a dynamic and transformative center of learning, includes state-of-the-art classrooms and collaborative spaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EduCity cards */}
      <section className="bg-[#F6F6F6] pb-[5%]">
        <div className="mx-auto w-[calc(100%-32px)] py-[5%] md:w-[calc(100%-100px)] md:py-[3%]">
          <h2 className="pb-[8%] text-center text-lg font-semibold md:pb-[2%] md:text-[35px]">EduCity</h2>
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-6">
            {featureCards.map(([image, alt, title, description], index) => (
              <div key={title} className={`text-center ${index > 0 ? "md:mt-0" : ""}`}>
                <img src={`/images/educity/${image}`} alt={alt} className="mx-auto max-w-full" />
                <h6 className="mt-[15px] mb-[10px] text-base font-semibold md:text-lg">{title}</h6>
                <p className="mx-auto w-[90%] text-sm leading-[22px] md:w-4/5 md:text-base md:leading-[25px]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDULIVE - The Residences */}
      <section className="py-[3%]">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-7">
              <div className="Edulive">
                <h2 className="pt-5 pb-[2%] text-lg font-semibold md:pt-0 md:text-[35px]">EDULIVE - The Residences</h2>
                <h6 className="pb-2 text-base leading-[22px] font-medium md:pb-[10px] md:text-[25px] md:leading-[35px]">Your Gateway to Student Life at EduCity</h6>
                <p className="text-justify text-sm leading-[22px] md:text-lg md:leading-7">EduLive, the student housing wing of EduCity is more than just a place to rest, it's a vibrant community with modern amenities, spacious accommodation, security and a strong focus on student well-being</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <picture><source srcSet="/images/educity/residence.webp" type="image/webp" /><source srcSet="/images/educity/residence.png" type="image/png" /><img src="/images/educity/residence.png" alt="LPG" className="w-full" /></picture>
            </div>
          </div>
        </div>
      </section>

      {/* EduLearn */}
      <section className="py-[3%]">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <picture className="hidden md:block"><source srcSet="/images/educity/learningspaces.webp" type="image/webp" /><source srcSet="/images/educity/learningspaces.png" type="image/png" /><img src="/images/educity/learningspaces.png" alt="LPG" className="w-full" /></picture>
              <picture className="block md:hidden"><source srcSet="/images/educity/Learningspaces-mobile.webp" type="image/webp" /><source srcSet="/images/educity/Learningspaces-mobile.png" type="image/png" /><img src="/images/educity/Learningspaces-mobile.png" alt="LPG" className="w-full" /></picture>
            </div>
            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="Edulive">
                <h2 className="pt-5 pb-[2%] text-lg font-semibold md:pt-0 md:text-[35px]">EduLearn - The Learning Spaces</h2>
                <h6 className="pb-2 text-base leading-[22px] font-medium md:pb-[10px] md:text-[25px] md:leading-[35px]">Pathways to Brilliance: Connect, Explore, Excel</h6>
                <p className="text-justify text-sm leading-[22px] md:text-lg md:leading-7">
                  EduLearn, the educational heart of EduCity, redefines the traditional learning experience by providing an immersive &amp; dynamic environment that extends far beyond the confines of traditional classrooms <br /><br />
                  With cutting-edge spaces like the Debate Square, Amphitheatre, Interaction Pods, Atrium, Library, &amp; Interaction Corridor, EduLearn encourages students &amp; faculty alike to engage, explore, &amp; collaborate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      <section className="section5 mt-[8%] md:mt-[3%]">
        <div className="floorplansection py-[3%]">
          <h2 className="sectiontitle pb-[2%] text-center text-lg font-semibold md:text-[35px]">
            Floor Plans
          </h2>

          <div className="carousel-wrap relative mx-auto w-[80%] px-[5%] max-[768px]:mt-[3%]">
            {/* Carousel viewport */}
            <div className="overflow-hidden">
              <div
                className="flex gap-[10px] transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(calc(-${activeFloorPlan} * (100% + 10px)))`,
                }}
              >
                {floorPlans.map(([file, alt], index) => (
                  <div
                    key={`${file}-${index}`}
                    className="item relative z-[100] min-w-0 flex-[0_0_100%] [backface-visibility:hidden]"
                  >
                    <picture>
                      <source srcSet={`/images/educity/${file}.webp`} type="image/webp" />
                      <source srcSet={`/images/educity/${file}.png`} type="image/png" />
                      <img
                        src={`/images/educity/${file}.png`}
                        alt={alt}
                        className="block h-auto w-full"
                      />
                    </picture>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop navigation arrows */}
            <div className="max-[768px]:hidden">
              <button
                type="button"
                onClick={showPreviousFloorPlan}
                aria-label="Previous floor plan"
                className="owl-prev absolute left-[-7%] top-[40%] z-10 -translate-y-1/2 text-[#cdcbcd] hover:text-black"
              >
                <svg viewBox="0 0 24 24" className="h-[52px] w-[52px]" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1.7 14.3L9.4 12l4.3-4.3 1.4 1.4-2.9 2.9 2.9 2.9-1.4 1.4Z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={showNextFloorPlan}
                aria-label="Next floor plan"
                className="owl-next absolute right-[-7%] top-[40%] z-10 -translate-y-1/2 text-[#cdcbcd] hover:text-black"
              >
                <svg viewBox="0 0 24 24" className="h-[52px] w-[52px]" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.7 14.3-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4 4.3 4.3-4.3 4.3Z" />
                </svg>
              </button>
            </div>

            {/* Navigation dots */}
            <div className="owl-dots mb-[10%] flex justify-center gap-[6px] pt-[15px] text-center md:mb-0">
              {floorPlans.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveFloorPlan(index)}
                  aria-label={`Go to floor plan ${index + 1}`}
                  aria-current={activeFloorPlan === index ? "true" : undefined}
                  className={`h-[15px] w-[15px] rounded-full border border-black ${
                    activeFloorPlan === index ? "bg-black" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="my-0 mb-[4%] md:my-0">
        <div className="py-[3%]">
          <h2 className="pb-5 text-center text-lg font-semibold md:pb-[2%] md:text-[35px]">Amenities</h2>
          {[amenities.slice(0, 7), amenities.slice(7, 14), amenities.slice(14)].map((group, i) => (
            <div key={i} className={`py-[5%] md:py-[3%] ${i % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"}`}>
              <div className="mx-auto flex w-[calc(100%-15px)] flex-wrap md:w-[calc(100%-100px)]">
                {group.map(([image, alt, label]) => (
                  <div key={image} className="w-1/3 pb-5 text-center md:w-[14.28%]">
                    <img src={`/images/educity/${image}`} alt={alt} className="mx-auto max-w-full" />
                    <p className="pt-[10px] text-xs md:text-base">{label === "Conference Room" ? <>Conference <br />Room</> : label === "Double sharing room" ? <>Double sharing<br />room</> : label === "Entertainment arena" ? <>Entertainment <br />arena</> : label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Perks */}
      <section className="mb-[4%]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <picture><source srcSet="/images/educity/Location.webp" type="image/webp" /><source srcSet="/images/educity/Location.png" type="image/png" /><img src="/images/educity/Location.png" alt="Location" className="w-full" /></picture>
          </div>
          <div className="flex flex-col justify-center bg-[#F6F6F6] py-[5%] lg:col-span-5">
            <div className="locationblock">
              <h2 className="mb-0 pt-[10px] text-center text-lg font-semibold md:pl-8 md:text-left md:text-[35px]">Location Perks</h2>
              <ul className="pl-[6%]">
                {[
                  ["Metro.png", "Metro", "20 Min from KR Puram metro station"],
                  ["Train.png", "Train", "20 Min from Railway station"],
                  ["Airport.png", "Airport", "20 Min from Airport"],
                  ["Busstation.png", "Busstation", "20 Min from Bus terminal"],
                ].map(([image, alt, text]) => (
                  <li key={image} className="flex items-center">
                    <img src={`/images/educity/${image}`} alt={alt} className="w-[30px] md:w-auto" />
                    <p className="mb-0 ml-[15px] text-sm leading-[50px] md:text-[22px] md:leading-[80px]">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="mb-[8%] md:mb-[4%]">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <h2 className="pb-5 text-center text-lg font-semibold md:pb-[3%] md:text-[35px]">Package Details</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <div key={item.name} className={`${item.style} rounded-[5px] p-[15px]`}>
                <div className="grid grid-cols-[2fr_1fr] items-center">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-base font-semibold md:text-[25px]">{item.name}</h2>
                    <p className="py-[10px] text-sm font-normal md:text-xl">No of class rooms: {item.rooms}</p>
                    <h4 className="text-base font-semibold md:text-xl">{item.price}</h4>
                  </div>
                  <div className="flex justify-end"><img src={`/images/educity/${item.image}`} alt={item.name} className="max-w-[66px] md:max-w-full" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect package */}
      <section className="bg-[#F6F6F6]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="order-2 mx-auto w-[calc(100%-32px)] py-[3%] lg:order-1 lg:col-span-7 lg:w-[calc(100%-100px)]">
            <div className="perfect-package">
              <h2 className="py-[15px] text-lg font-semibold md:py-0 md:text-[35px]">The perfect package for every need</h2>
              <p className="mb-5 pb-5 text-justify text-sm leading-[22px] md:pb-0 md:text-base md:leading-[25px]">With EDUCITY, you can choose from a variety of seating options to accommodate your requirements. We offer rooms with 30 seats, 50 seats, 60 seats, and 80 seats giving you the flexibility to choose the perfect environment for your educational needs.</p>
              <div className="grid grid-cols-2 md:grid-cols-[25%_16.6667%_33.3333%]">
                <div className="text-center"><h3 className="text-base leading-[25px] font-semibold md:text-[30px]">1,678</h3><p className="mb-5">Total physical seats</p></div>
                <div className="hidden md:block" />
                <div className="text-center"><h3 className="text-base leading-[25px] font-semibold md:text-[30px]">3,356</h3><p className="mb-5">Total usable seats</p></div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <picture className="hidden h-full md:block"><source srcSet="/images/educity/perfect-package.webp" type="image/webp" /><source srcSet="/images/educity/perfect-package.png" type="image/png" /><img src="/images/educity/perfect-package.png" alt="perfect-package" className="h-full w-full object-cover" /></picture>
            <picture className="block md:hidden"><source srcSet="/images/educity/perfect-package-mob.webp" type="image/webp" /><source srcSet="/images/educity/perfect-package-mob.png" type="image/png" /><img src="/images/educity/perfect-package-mob.png" alt="perfect-package-mob" className="w-full" /></picture>
          </div>
        </div>
      </section>

      {/* Seater capacity */}
      <section className="my-[3%]">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <h2 className="mt-[6%] mb-[3%] pb-[3%] text-center text-lg font-semibold md:mt-0 md:text-[35px]">Seater capacity</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {seating.map((group, i) => (
              <div key={group[0]} className="mb-5 border-t-[5px] border-[#F2006C] shadow-[0_4px_40px_0_#0000001A]">
                <ul className="px-[7%] py-[10%] md:px-[15%]">
                  {group.map((label, j) => (
                    <li key={label} className="flex items-center pb-[10%] md:pb-[5%]">
                      <img src={`/images/educity/${["seats.png", "Rooms.png", "Capacity.png"][j]}`} alt={["seater", "Rooms", "Capacity"][j]} className="h-5 w-5 md:h-[30px] md:w-[30px]" />
                      <p className="mb-0 pl-[8%] text-xs md:text-base">{label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Colive */}
      <section className="bg-[#F6F6F6] py-[5%] md:py-0">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)] md:py-[3%]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-8">
              <h2 className="py-[5%] text-center text-lg font-semibold md:py-0 md:text-left md:text-[35px]">About Colive</h2>
              <p className="text-sm leading-[22px] md:text-base md:leading-[25px]">
                As Bangalore's largest &amp; India's leading Coliving player, Colive with a vision of being the "Future of Living" is reshaping the way working professionals &amp; students live in urban cities. Colive offers smart, furnished &amp; managed flexible homes closer to workplaces &amp; colleges to the urban migrant population. Colive homes are built on the principles of 6S - Style, Safety, Smart, Service, Savings &amp; Social<br /><br />Colive's rentX rental exchange is a next-gen consumer-internet platform that offers data-driven rental trends &amp; an AI- enabled smart search engine for rental homes ensuring yield-optimized digital transactions &amp; negotiations on the marketplace.
              </p>
              <div className="mt-[4%] rounded-[5px] border border-[#F2006C] bg-[rgba(242,0,108,0.10)] px-5 py-[15px] md:rounded-[20px] md:py-[2%]">
                <div className="grid grid-cols-2">
                  <ul>
                    <li className="mb-3 flex items-center"><img src="/images/educity/Properties.png" alt="Properties" className="h-[22px] w-[22px]" /><p className="mb-0 pl-[5px] text-xs font-semibold md:text-[25px]">150+ <span className="block text-[10px] font-normal md:text-[15px]">Properties</span></p></li>
                    <li className="mb-3 flex items-center"><img src="/images/educity/Beds.png" alt="Beds" className="h-[22px] w-[22px]" /><p className="mb-0 pl-[5px] text-xs font-semibold md:text-[25px]">20,000+ <span className="block text-[10px] font-normal md:text-[15px]">Platinum Beds pipeline</span></p></li>
                  </ul>
                  <ul>
                    <li className="mb-3 flex items-center"><img src="/images/educity/users.png" alt="users" className="h-[22px] w-[22px]" /><p className="mb-0 pl-[5px] text-xs font-semibold md:text-[25px]">1 Mn+ <span className="block text-[10px] font-normal md:text-[15px]">Users</span></p></li>
                    <li className="mb-3 flex items-center"><img src="/images/educity/Tenants.png" alt="Beds" className="h-[22px] w-[22px]" /><p className="mb-0 pl-[5px] text-xs font-semibold md:text-[25px]">18000+ <span className="block text-[10px] font-normal md:text-[15px]">Tenants</span></p></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-4"><img src="/images/aboutus/rents.png" alt="about" className="w-full" /></div>
          </div>
        </div>
      </section>

      {/* About the Developer */}
      <section className="my-[3%]">
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-9">
              <h2 className="py-[5%] text-center text-lg font-semibold md:py-0 md:text-left md:text-[35px]">About the Developer</h2>
              <p className="mb-[10px] w-full pb-5 text-sm leading-[22px] md:w-4/5 md:text-base md:leading-[25px]">BCD Group, one of the largest realty conglomerates in the subcontinent, carries a rich heritage of over seven decades. With a presence across seven countries, we specialize in construction, development, engineering, funding, &amp; consultancy</p>
              <div className="contact">
                <p className="mb-0"><a href="tel:8073866678" className="text-sm leading-[25px] font-semibold text-[#F2006C] md:text-base md:leading-7">Call: 80738 66678</a></p>
                <p className="mb-0"><a href="mailto:educity@bcdindia.com" className="text-sm leading-[25px] font-semibold text-[#F2006C] md:text-base md:leading-7">E-mail - educity@bcdindia.com</a></p>
              </div>
            </div>
            <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-3">
              <picture className="hidden md:block"><source srcSet="/images/educity/BCD.webp" type="image/webp" /><source srcSet="/images/educity/BCD.png" type="image/png" /><img src="/images/educity/BCD.png" alt="BCD" className="max-w-full" /></picture>
              <picture className="block md:hidden"><source srcSet="/images/educity/BCDmobview.webp" type="image/webp" /><source srcSet="/images/educity/BCDmobview.png" type="image/png" /><img src="/images/educity/BCDmobview.png" alt="BCD" className="w-full" /></picture>
            </div>
          </div>
        </div>
      </section>

      {/* Enquire Now */}
      <section className="bg-[#F2006C] pb-[5%] md:pb-0">
        <h2 className="py-[5%] text-center text-[35px] text-white md:py-[2%]">Enquire Now</h2>
        <div className="mx-auto w-[calc(100%-32px)] md:w-[calc(100%-100px)]">
          <div className="enquire">
            <form action="/api/Offers/LeadCapture" method="post" id="popupform" name="popupform">
              <div id="form-content" className="mx-auto w-full md:w-[85%]">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div><div className="relative"><input className="h-[45px] w-full rounded-[3px] border-0 bg-white px-3 outline-none" type="text" name="first_name" id="first_name" placeholder="Name*" required /></div></div>
                  <div><div className="relative"><input className="h-[45px] w-full rounded-[3px] border-0 bg-white px-3 outline-none" type="tel" name="customer_mobile" id="customer_mobile" pattern="[6789][0-9]{10}" placeholder="+91 | Phone Number" required /></div></div>
                  <div><div className="relative"><input className="h-[45px] w-full rounded-[3px] border-0 bg-white px-3 outline-none" type="email" name="customer_email" id="customer_email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}" placeholder="Email" /></div></div>
                </div>
                <div className="text-center">
                  <input className="my-[1%] mb-[2.5%] cursor-pointer rounded-[5px] bg-black px-[30px] py-[10px] font-medium text-white" type="submit" value="Submit" name="submit" />
                  {trackingFields.map((field) => <input key={field} type="hidden" name={field} id={field} value="" />)}
                  <input type="hidden" name="leadSource" id="leadSource" value="Colive Educity" />
                  <input type="hidden" name="LandingPageId" id="LandingPageId" value="63" />
                  <input type="hidden" name="Mobile_Number_Validated" id="Mobile_Number_Validated" value="false" />
                  <input type="hidden" name="redirectURL" id="redirectURL" value="/educity/?act=thankyou" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {applyOpen && <EnquiryModal onClose={() => setApplyOpen(false)} />}
      {thankYouOpen && <ThankYouModal onClose={() => setThankYouOpen(false)} />}
    </main>
  );
}
