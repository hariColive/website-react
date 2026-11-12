"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import BstEnquiryFormCard from "@/components/common/BstEnquiryFormCard";

const IMG = "/images/educity/";

const amenities = [
  ["wifi.png", "24*7 WiFi"], ["Outdoor.png", "Outdoor arena"], ["Shuttle-bus.png", "Shuttle bus"],
  ["Meal.png", "2 Meals/day"], ["Library.png", "Library"], ["Conferenceroom.png", "Conference Room"], ["Boardroom.png", "Board Room"],
  ["reception.png", "Receptions"], ["Doublesharing.png", "Double sharing room"], ["Commonarea.png", "Common Area"],
  ["cafe.png", "Cafeteria"], ["kitchenset.png", "Kitchen"], ["Indoorarena.png", "Indoor arena"], ["Entatirement.png", "Entertainment arena"],
  ["fitness.png", "Fitness zones"], ["Study.png", "Study nooks"], ["Lab.png", "Laboratory"], ["Auditorim.png", "Auditoriums"], ["Quitezone.png", "Quite Zones"],
];

const floorPlans = [1, 2, 3, 4, 5, 6];
const seatTypes = [
  { seats: "30 Seater", rooms: "8 Rooms", capacity: "240 Capacity" },
  { seats: "50 Seater", rooms: "9 Rooms", capacity: "450 Capacity" },
  { seats: "60 Seater", rooms: "8 Rooms", capacity: "480 Capacity" },
  { seats: "80 Seater", rooms: "8 Rooms", capacity: "200 Capacity" },
];

function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`pb-2 text-[35px] font-semibold max-[768px]:text-[18px] ${className}`}>{children}</h2>;
}

function Picture({ name, alt, mobileName }: { name: string; alt: string; mobileName?: string }) {
  return (
    <picture>
      {mobileName && <source media="(max-width: 768px)" srcSet={`${IMG}${mobileName}`} />}
      <source srcSet={`${IMG}${name.replace(/\.png$/, ".webp")}`} type="image/webp" />
      <img src={`${IMG}${name}`} alt={alt} className="h-auto w-full object-contain" />
    </picture>
  );
}

export default function EduCityPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_keyword"];
    const values: Record<string, string> = {};
    keys.forEach((key) => { values[key] = params.get(key) || ""; });
    setTracking(values);
    if (params.get("act") === "thankyou?dt") setThankYouOpen(true);
  }, []);

  const submitApplyForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    if (!name.trim()) { setFormError("Please enter the Name"); return; }
    if (!/^[0-9]{10}$/.test(mobile)) { setFormError("Please enter valid number"); return; }
    setSubmitting(true);
    const payload = new FormData();
    payload.append("first_name", name.trim());
    payload.append("customer_mobile", mobile);
    payload.append("customer_email", email);
    Object.entries(tracking).forEach(([key, value]) => payload.append(key, value));
    payload.append("leadSource", "Colive Educity");
    payload.append("LandingPageId", "63");
    payload.append("Mobile_Number_Validated", "false");
    payload.append("redirectURL", "/educity/?act=thankyou");
    try {
      const response = await fetch("/api/Offers/LeadCapture", { method: "POST", body: payload });
      if (!response.ok) throw new Error("Unable to submit your enquiry. Please try again.");
      setApplyOpen(false);
      setThankYouOpen(true);
      setName(""); setMobile(""); setEmail("");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to submit your enquiry. Please try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="w-full overflow-x-hidden font-[Inter-Regular,Inter,sans-serif] text-[#212529]">
      {/* Replace these include placeholders with your existing shared Header and Footer components if already available. */}
      <div id="site-header" data-include="commonheader/header" />
      <main className="w-full overflow-x-hidden">
        {/* Hero */}
        <section className="mt-[10%] bg-[url('/images/educity/HeroBanner.webp')] bg-[length:100%_100%] bg-no-repeat max-[768px]:mt-[50px] max-[768px]:bg-[url('/images/educity/HeroBanner-Mob.webp')] max-[768px]:bg-[length:100%_auto]">
          <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
            <h1 className="pt-[7%] text-[65px] font-bold leading-tight text-white max-[768px]:px-[5%] max-[768px]:pt-[70%] max-[768px]:text-center max-[768px]:text-[35px] max-[768px]:leading-[49px]">Blooming In <span className="max-[768px]:block">New<br className="max-[768px]:hidden" /> Whitefield</span></h1>
            <p className="py-[0.5%] pb-[1%] text-[25px] font-medium text-white max-[768px]:px-0 max-[768px]:py-[10px] max-[768px]:pb-[15px] max-[768px]:text-center max-[768px]:text-[18px]">Embrace the allure of New Bengaluru</p>
            <div className="flex gap-5 pt-[2%] pb-[10%] max-[768px]:justify-center max-[768px]:gap-3">
              <button type="button" onClick={() => setApplyOpen(true)} className="rounded-[5px] bg-[#F2006C] px-[45px] py-[15px] text-[20px] leading-[26px] text-white max-[768px]:px-10 max-[768px]:py-3 max-[768px]:text-[14px] max-[395px]:px-[25px] max-[370px]:px-[18px]">Apply Now</button>
              <a href="tel:8073866678" className="rounded-[5px] border-2 border-[#F2006C] bg-transparent px-[45px] py-[13px] text-[20px] text-[#F2006C] max-[768px]:px-[15px] max-[768px]:py-[10px] max-[768px]:text-[14px]">Call: 80738 66678</a>
            </div>
          </div>
        </section>

        {/* About EduCity */}
        <section className="py-[3%]">
          <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center gap-8 lg:grid-cols-[5fr_7fr] max-[768px]:w-[calc(100%-32px)]">
            <Picture name="about.png" alt="About EduCity" />
            <div className="pl-[4%] max-[768px]:pl-0">
              <SectionTitle>About EduCity</SectionTitle>
              <p className="text-[18px] leading-7 text-justify max-[768px]:text-[14px] max-[768px]:leading-[22px]">EduCity is not just a university but a holistic ecosystem designed to provide a seamless educational experience for students, fostering both intellectual growth &amp; personal well-being.<br /><br />EduCampus, the educational institute at the heart of Educity, is a dynamic and transformative center of learning, includes state-of-the-art classrooms and collaborative spaces</p>
            </div>
          </div>
        </section>

        {/* EduCity features */}
        <section className="bg-[#F6F6F6] py-[3%] max-[768px]:pb-[5%]">
          <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
            <SectionTitle className="text-center max-[768px]:py-[5%]">EduCity</SectionTitle>
            <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3">
              {[
                ["Educampus.png", "EduCampus", "The educational institute at the heart of EduCity, a dynamic & transformative center of learning."],
                ["Discovery.png", "Discovery Hub", "Technologically advanced classrooms, collaboration spaces for a vibrant learning environment."],
                ["Discover.png", "Discovery Plaza", "Vibrant & inviting arrival spaces, an informative outdoor gathering space."],
              ].map(([image, title, description]) => (
                <div key={title} className="max-[768px]:mt-5">
                  <img src={`${IMG}${image}`} alt={title} className="mx-auto h-auto max-w-full" />
                  <h3 className="pt-[15px] text-[18px] font-semibold max-[768px]:mb-[10px]">{title}</h3>
                  <p className="mx-auto w-4/5 text-[16px] leading-[25px] max-[768px]:w-[90%] max-[768px]:text-[14px] max-[768px]:leading-[22px]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EduLive */}
        <section className="py-[3%]">
          <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center gap-8 lg:grid-cols-[7fr_5fr] max-[768px]:w-[calc(100%-32px)]">
            <div className="order-2 lg:order-1">
              <SectionTitle>EDULIVE - The Residences</SectionTitle>
              <h3 className="pb-[10px] text-[25px] font-medium leading-[35px] max-[768px]:pt-5 max-[768px]:text-[16px] max-[768px]:leading-[22px]">Your Gateway to Student Life at EduCity</h3>
              <p className="text-justify text-[18px] leading-7 max-[768px]:text-[14px] max-[768px]:leading-[22px]">EduLive, the student housing wing of EduCity is more than just a place to rest, it's a vibrant community with modern amenities, spacious accommodation, security and a strong focus on student well-being</p>
            </div>
            <div className="order-1 lg:order-2"><Picture name="residence.png" alt="EduLive residences" /></div>
          </div>
        </section>

        {/* EduLearn */}
        <section className="py-[3%]">
          <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center gap-8 lg:grid-cols-[5fr_7fr] max-[768px]:w-[calc(100%-32px)]">
            <Picture name="learningspaces.png" mobileName="Learningspaces-mobile.png" alt="EduLearn learning spaces" />
            <div>
              <SectionTitle>EduLearn - The Learning Spaces</SectionTitle>
              <h3 className="pb-[10px] text-[25px] font-medium leading-[35px] max-[768px]:pt-5 max-[768px]:text-[16px] max-[768px]:leading-[22px]">Pathways to Brilliance: Connect, Explore, Excel</h3>
              <p className="text-justify text-[18px] leading-7 max-[768px]:text-[14px] max-[768px]:leading-[22px]">EduLearn, the educational heart of EduCity, redefines the traditional learning experience by providing an immersive &amp; dynamic environment that extends far beyond the confines of traditional classrooms<br /><br />With cutting-edge spaces like the Debate Square, Amphitheatre, Interaction Pods, Atrium, Library, &amp; Interaction Corridor, EduLearn encourages students &amp; faculty alike to engage, explore, &amp; collaborate.</p>
            </div>
          </div>
        </section>

        {/* Floor plans */}
        <section className="mt-[3%] pt-[2%] max-[768px]:mt-[8%]">
          <SectionTitle className="text-center">Floor Plans</SectionTitle>
          <div className="mx-auto w-4/5 overflow-x-auto px-[5%]">
            <div className="flex snap-x snap-mandatory gap-4">
              {floorPlans.map((number) => <div key={number} className="min-w-full snap-center"><Picture name={`floorplan${number}.png`} alt={`Floor plan ${number}`} /></div>)}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="mb-[4%] mt-8">
          <div className="pb-5"><SectionTitle className="text-center">Amenities</SectionTitle></div>
          {[amenities.slice(0, 7), amenities.slice(7, 14), amenities.slice(14)].map((row, index) => (
            <div key={index} className={`py-[3%] max-[768px]:py-[5%] ${index === 1 ? "bg-white" : "bg-[#F9F9F9]"}`}>
              <div className="mx-auto flex w-[calc(100%-100px)] flex-wrap justify-center max-[768px]:w-[calc(100%-15px)]">
                {row.map(([image, label]) => <div key={label} className="w-[14.28%] px-2 text-center max-[768px]:w-1/3 max-[768px]:pb-5"><img src={`${IMG}${image}`} alt={label} className="mx-auto h-auto max-w-full" /><p className="pt-[10px] text-[14px]">{label}</p></div>)}
              </div>
            </div>
          ))}
        </section>

        {/* Location perks */}
        <section className="mb-[4%]">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr]">
            <div className="lg:pr-0"><Picture name="Location.png" alt="EduCity location" /></div>
            <div className="flex flex-col justify-center bg-[#F6F6F6] py-8">
              <div className="locationblock">
                <SectionTitle className="pl-8 max-[768px]:mb-0 max-[768px]:pt-[10px] max-[768px]:pl-0 max-[768px]:text-center">Location Perks</SectionTitle>
                <ul className="pl-[6%] max-[768px]:py-[5%]">
                  {[["Metro.png", "20 Min from KR Puram metro station"], ["Train.png", "20 Min from Railway station"], ["Airport.png", "20 Min from Airport"], ["Busstation.png", "20 Min from Bus terminal"]].map(([icon, label]) => <li key={label} className="flex items-center"><img src={`${IMG}${icon}`} alt="" className="w-auto max-w-[38px] max-[768px]:w-[30px]" /><p className="mb-0 ml-[15px] text-[22px] leading-[80px] max-[768px]:text-[14px] max-[768px]:leading-[50px]">{label}</p></li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Package details */}
        <section className="mb-[4%] max-[768px]:my-[8%]">
          <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
            <SectionTitle className="text-center">Package Details</SectionTitle>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {[
                { title: "Bronze", rooms: "3", price: "₹ 1,31,454", image: "Bronze.png", color: "#FAEAE2" },
                { title: "Silver", rooms: "6", price: "₹ 2,79,211", image: "Silver.png", color: "#F0F0F1" },
                { title: "Gold", rooms: "8", price: "₹ 3,57,388", image: "Gold.png", color: "#F3E4D3" },
              ].map((item) => <div key={item.title} className="rounded-[5px] p-[15px]" style={{ backgroundColor: item.color }}><div className="flex items-center"><div className="w-2/3"><h3 className="text-[25px] font-semibold max-[768px]:text-[16px]">{item.title}</h3><p className="py-[10px] text-[20px] max-[768px]:text-[14px]">No of class rooms: {item.rooms}</p><h4 className="text-[20px] font-semibold max-[768px]:text-[16px]">{item.price}</h4></div><div className="w-1/3 text-right"><img src={`${IMG}${item.image}`} alt={item.title} className="ml-auto h-auto max-w-full max-[768px]:max-w-[66px]" /></div></div></div>)}
            </div>
          </div>
        </section>

        {/* Seating package */}
        <section className="bg-[#F6F6F6]">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr]">
            <div className="order-2 mx-auto w-[calc(100%-100px)] py-[3%] lg:order-1 max-[768px]:w-[calc(100%-32px)]">
              <SectionTitle className="py-2">The perfect package for every need</SectionTitle>
              <p className="mb-5 leading-[25px] max-[768px]:pb-5 max-[768px]:text-justify max-[768px]:text-[14px] max-[768px]:leading-[22px]">With EDUCITY, you can choose from a variety of seating options to accommodate your requirements. We offer rooms with 30 seats, 50 seats, 60 seats, and 80 seats giving you the flexibility to choose the perfect environment for your educational needs.</p>
              <div className="flex gap-10 text-center"><div className="w-1/2 lg:w-1/3"><h3 className="text-[30px] font-semibold max-[768px]:text-[16px] max-[768px]:leading-[25px]">1,678</h3><p className="max-[768px]:text-[12px]">Total physical seats</p></div><div className="w-1/2 lg:w-1/3"><h3 className="text-[30px] font-semibold max-[768px]:text-[16px] max-[768px]:leading-[25px]">3,356</h3><p className="max-[768px]:text-[12px]">Total usable seats</p></div></div>
            </div>
            <div className="order-1 lg:order-2"><Picture name="perfect-package.png" mobileName="perfect-package-mob.png" alt="Perfect package" /></div>
          </div>
        </section>

        {/* Seater capacity */}
        <section className="my-[3%]">
          <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
            <SectionTitle className="mb-[3%] text-center max-[768px]:mt-[6%]">Seater capacity</SectionTitle>
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {seatTypes.map((seat) => <div key={seat.seats} className="mb-5 border-t-[5px] border-[#F2006C] px-[7%] py-[10%] shadow-[0_4px_40px_0_#0000001A] lg:px-[15%]"><ul className="space-y-4"><li className="flex items-center gap-3"><img src={`${IMG}seats.png`} alt="" className="h-5 w-5 lg:h-[30px] lg:w-[30px]" /><p className="mb-0 text-sm">{seat.seats}</p></li><li className="flex items-center gap-3"><img src={`${IMG}Rooms.png`} alt="" className="h-5 w-5 lg:h-[30px] lg:w-[30px]" /><p className="mb-0 text-sm">{seat.rooms}</p></li><li className="flex items-center gap-3"><img src={`${IMG}Capacity.png`} alt="" className="h-5 w-5 lg:h-[30px] lg:w-[30px]" /><p className="mb-0 text-sm">{seat.capacity}</p></li></ul></div>)}
            </div>
          </div>
        </section>

        {/* About Colive */}
        <section className="bg-[#F6F6F6] py-[3%] max-[768px]:px-0 max-[768px]:py-[5%]">
          <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center gap-8 lg:grid-cols-[8fr_4fr] max-[768px]:w-[calc(100%-32px)]">
            <div className="order-2 lg:order-1">
              <SectionTitle className="max-[768px]:py-[5%] max-[768px]:text-center">About Colive</SectionTitle>
              <p className="text-[16px] leading-7 max-[768px]:text-[14px] max-[768px]:leading-[22px]">As Bangalore's largest &amp; India's leading Coliving player, Colive with a vision of being the "Future of Living" is reshaping the way working professionals &amp; students live in urban cities. Colive offers smart, furnished &amp; managed flexible homes closer to workplaces &amp; colleges to the urban migrant population. Colive homes are built on the principles of 6S - Style, Safety, Smart, Service, Savings &amp; Social<br /><br />Colive's rentX rental exchange is a next-gen consumer-internet platform that offers data-driven rental trends &amp; an AI- enabled smart search engine for rental homes ensuring yield-optimized digital transactions &amp; negotiations on the marketplace.</p>
              <div className="mt-[4%] rounded-[20px] border border-[#F2006C] bg-[rgba(242,0,108,0.10)] px-[3%] py-[2%] max-[768px]:rounded-[5px] max-[768px]:px-5 max-[768px]:py-[15px]">
                <div className="grid grid-cols-2 gap-4">
                  <ul className="space-y-3"><li className="flex items-center gap-2"><img src={`${IMG}Properties.png`} alt="" className="h-[22px] w-[22px]" /><p className="mb-0 text-[25px] font-semibold max-[768px]:text-[12px]">150+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Properties</span></p></li><li className="flex items-center gap-2"><img src={`${IMG}Beds.png`} alt="" className="h-[22px] w-[22px]" /><p className="mb-0 text-[25px] font-semibold max-[768px]:text-[12px]">20,000+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Platinum Beds pipeline</span></p></li></ul>
                  <ul className="space-y-3"><li className="flex items-center gap-2"><img src={`${IMG}users.png`} alt="" className="h-[22px] w-[22px]" /><p className="mb-0 text-[25px] font-semibold max-[768px]:text-[12px]">1 Mn+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Users</span></p></li><li className="flex items-center gap-2"><img src={`${IMG}Tenants.png`} alt="" className="h-[22px] w-[22px]" /><p className="mb-0 text-[25px] font-semibold max-[768px]:text-[12px]">18000+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Tenants</span></p></li></ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2"><img src="/images/aboutus/rents.png" alt="About Colive" className="h-auto w-full" /></div>
          </div>
        </section>

        {/* About developer */}
        <section className="my-[3%]">
          <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center gap-8 lg:grid-cols-[9fr_3fr] max-[768px]:w-[calc(100%-32px)]">
            <div className="order-2 lg:order-1">
              <SectionTitle className="max-[768px]:py-[5%] max-[768px]:text-center">About the Developer</SectionTitle>
              <p className="w-4/5 pb-5 text-[16px] leading-[25px] max-[768px]:w-full max-[768px]:text-[14px] max-[768px]:leading-[22px]">BCD Group, one of the largest realty conglomerates in the subcontinent, carries a rich heritage of over seven decades. With a presence across seven countries, we specialize in construction, development, engineering, funding, &amp; consultancy</p>
              <div className="font-semibold leading-7 text-[#F2006C] max-[768px]:text-[14px]"><p><a href="tel:8073866678">Call: 80738 66678</a></p><p><a href="mailto:educity@bcdindia.com">E-mail - educity@bcdindia.com</a></p></div>
            </div>
            <div className="order-1 lg:order-2"><Picture name="BCD.png" mobileName="BCDmobview.png" alt="BCD Group" /></div>
          </div>
        </section>

        {/* Enquiry form card component */}
        <section className="bg-[#F2006C] px-4 pb-[2.5%] max-[768px]:pb-[5%]">
          <h2 className="py-[2%] text-center text-[35px] text-white max-[768px]:py-[5%] max-[768px]:text-[18px]">Enquire Now</h2>
          <div className="mx-auto w-full max-w-[1100px]"><BstEnquiryFormCard /></div>
        </section>
      </main>
      <div id="site-footer" data-include="commonfooter/footer" />

      {/* Apply Now modal */}
      {applyOpen && <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="educity-apply-title" onClick={(event) => { if (event.target === event.currentTarget) setApplyOpen(false); }}>
        <div className="w-full max-w-[500px] overflow-hidden rounded-[10px] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b-2 border-[#555] px-6 py-5"><h2 id="educity-apply-title" className="text-[23px] font-semibold">Enquire <span className="text-[#F2006C]">Now</span></h2><button type="button" aria-label="Close" onClick={() => setApplyOpen(false)} className="text-3xl leading-none text-gray-600">×</button></div>
          <form onSubmit={submitApplyForm} className="space-y-4 p-6">
            <div><label className="mb-1 block text-sm">Name<sup className="text-red-600">*</sup></label><input value={name} onChange={(event) => setName(event.target.value)} type="text" name="first_name" className="mb-1 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 outline-none focus:ring-1 focus:ring-[#F2006C]" /></div>
            <div><label className="mb-1 block text-sm">Mobile Number<sup className="text-red-600">*</sup></label><div className="relative"><span className="absolute left-[10px] top-1/2 -translate-y-1/2">+91 |</span><input value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))} type="tel" name="customer_mobile" pattern="[6789][0-9]{9}" className="mb-1 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] pl-[65px] pr-3 outline-none focus:ring-1 focus:ring-[#F2006C]" /></div></div>
            <div><label className="mb-1 block text-sm">E-mail</label><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="customer_email" className="mb-1 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 outline-none focus:ring-1 focus:ring-[#F2006C]" /></div>
            {Object.entries(tracking).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
            <input type="hidden" name="leadSource" value="Colive Educity" /><input type="hidden" name="LandingPageId" value="63" /><input type="hidden" name="Mobile_Number_Validated" value="false" /><input type="hidden" name="redirectURL" value="/educity/?act=thankyou" />
            {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
            <div className="pt-2 text-center"><button disabled={submitting} type="submit" className="w-full rounded-[3px] bg-[#F2006C] px-6 py-3 text-[18px] font-medium text-white disabled:opacity-60">{submitting ? "Submitting..." : "Submit"}</button></div>
          </form>
        </div>
      </div>}

      {/* Thank-you modal */}
      {thankYouOpen && <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true" aria-labelledby="educity-thankyou-title"><div className="w-full max-w-[500px] rounded-[10px] border-t-[5px] border-[#F2006C] bg-white p-8 text-center shadow-2xl"><button type="button" onClick={() => setThankYouOpen(false)} aria-label="Close" className="float-right text-2xl">×</button><img src="/images/nirvana/modal/img2.png" width="100" alt="Success" className="mx-auto mt-5" /><h2 id="educity-thankyou-title" className="my-4 text-[42px] font-semibold">Thank You!</h2><h3 className="mb-5 text-base font-medium leading-6 tracking-wide">Our team will reach out to you soon with matching properties...</h3><p className="font-semibold">Reach out to <span className="text-[#F2006C]">7676 000 500</span> to speak to our agent live</p></div></div>}
    </div>
  );
}
