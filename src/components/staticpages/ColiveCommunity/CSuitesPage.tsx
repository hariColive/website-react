"use client";

import { useState, type FormEvent } from "react";

type Property = {
  id: string;
  name: string;
  city: "bengaluru" | "pune";
  location: string;
  images: string[];
  bookingUrl: string;
};

const properties: Property[] = [
  { id: "lotus-park", name: "Lotus Park", city: "bengaluru", location: "Marathahalli, Bengaluru", images: ["/assets/images/cSuites/property/Lotus park/1.jpg", "/assets/images/cSuites/property/Lotus park/2.jpg", "/assets/images/cSuites/property/Lotus park/3.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41646" },
  { id: "vj-grand-central", name: "VJ Grand Central", city: "pune", location: "Pimpri Chinchwad, Pune", images: ["/assets/images/cSuites/property/VJ Grand Central/1.jpg", "/assets/images/cSuites/property/VJ Grand Central/2.jpg", "/assets/images/cSuites/property/VJ Grand Central/3.jpg", "/assets/images/cSuites/property/VJ Grand Central/4.jpg", "/assets/images/cSuites/property/VJ Grand Central/5.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41647" },
  { id: "richfield", name: "Richfield", city: "bengaluru", location: "HSR Layout, Bengaluru", images: ["/assets/images/cSuites/property/Richfield/1.jpg", "/assets/images/cSuites/property/Richfield/2.jpg", "/assets/images/cSuites/property/Richfield/3.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41601" },
  { id: "gilbert", name: "Gilbert", city: "bengaluru", location: "Whitefield, Bengaluru", images: ["/assets/images/cSuites/property/Gilbert/1.jpg", "/assets/images/cSuites/property/Gilbert/2.jpg", "/assets/images/cSuites/property/Gilbert/3.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41649" },
  { id: "bren", name: "Bren", city: "bengaluru", location: "Bellandur, Bengaluru", images: ["/assets/images/cSuites/property/Bren/1.jpg", "/assets/images/cSuites/property/Bren/2.jpg", "/assets/images/cSuites/property/Bren/3.jpg", "/assets/images/cSuites/property/Bren/4.jpg", "/assets/images/cSuites/property/Bren/5.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41603" },
  { id: "gateway", name: "Gateway", city: "bengaluru", location: "KR Puram, Bengaluru", images: ["/assets/images/cSuites/property/Gateway/1.jpg", "/assets/images/cSuites/property/Gateway/2.jpg", "/assets/images/cSuites/property/Gateway/3.jpg", "/assets/images/cSuites/property/Gateway/4.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41586" },
  { id: "mclean", name: "Mclean", city: "bengaluru", location: "KR Puram, Bengaluru", images: ["/assets/images/cSuites/property/Mclean/1.jpg", "/assets/images/cSuites/property/Mclean/2.jpg", "/assets/images/cSuites/property/Mclean/3.jpg", "/assets/images/cSuites/property/Mclean/4.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41595" },
  { id: "shelton", name: "Shelton", city: "bengaluru", location: "Marathahalli, Bengaluru", images: ["/assets/images/cSuites/property/Shelton/1.png", "/assets/images/cSuites/property/Shelton/2.png", "/assets/images/cSuites/property/Shelton/3.png"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41644" },
  { id: "vj-town-center", name: "VJ Town Center", city: "pune", location: "Pimpri-Chinchwad, Pune", images: ["/assets/images/cSuites/property/VJ Town Center/1.jpg", "/assets/images/cSuites/property/VJ Town Center/2.jpg", "/assets/images/cSuites/property/VJ Town Center/3.jpg", "/assets/images/cSuites/property/VJ Town Center/4.jpg", "/assets/images/cSuites/property/VJ Town Center/5.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41648" },
  { id: "cardiff", name: "Cardiff", city: "bengaluru", location: "Doddanekkundi, Bengaluru", images: ["/assets/images/cSuites/property/Cardiff/4.jpg", "/assets/images/cSuites/property/Cardiff/8.jpg", "/assets/images/cSuites/property/Cardiff/9.jpg"], bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41608" },
];

function PropertyCard({ property, onEnquire }: { property: Property; onEnquire: (name: string) => void }) {
  const [imageIndex, setImageIndex] = useState(0);
  const changeImage = (direction: number) => setImageIndex((index) => (index + direction + property.images.length) % property.images.length);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[5px] bg-white shadow-[0_4px_18px_rgba(23,23,23,0.07)] transition duration-300 hover:shadow-[0_8px_24px_rgba(23,23,23,0.12)]">
      <div className="relative h-[220px] overflow-hidden">
        <a href={property.images[imageIndex]} target="_blank" rel="noreferrer" className="block h-full">
          <img src={property.images[imageIndex]} alt={property.name} loading="lazy" className="block h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]" />
        </a>
        {property.images.length > 1 && <>
          <button type="button" aria-label="Previous image" onClick={() => changeImage(-1)} className="absolute left-[10px] top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(23,23,23,0.35)] text-xl text-white opacity-0 transition hover:bg-[rgba(23,23,23,0.6)] group-hover:opacity-100">‹</button>
          <button type="button" aria-label="Next image" onClick={() => changeImage(1)} className="absolute right-[10px] top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(23,23,23,0.35)] text-xl text-white opacity-0 transition hover:bg-[rgba(23,23,23,0.6)] group-hover:opacity-100">›</button>
        </>}
        <span className="absolute bottom-[14px] left-[14px] rounded-full bg-[rgba(255,255,255,0.92)] px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur"><span className="text-[15px] font-bold text-[#171717]">₹ 2,500</span><span className="ml-[2px] text-xs text-[#8a8a8a]">/day</span></span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-[18px]">
        <h3 className="mb-1.5 text-[18px] font-bold text-[#171717]">{property.name}</h3>
        <p className="mb-[18px] flex items-center gap-1.5 text-[13px] text-[#8a8a8a]"><i className="fa-solid fa-location-dot text-xs text-[#2B001F]" />{property.location}</p>
        <div className="mt-auto flex gap-[10px]">
          <button type="button" onClick={() => onEnquire(property.name)} className="flex-1 cursor-pointer border-0 bg-[#2B001F] p-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">Enquire Now</button>
          <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex-1 border border-[#2B001F] bg-white p-3 text-center text-sm font-semibold text-[#2B001F] transition hover:-translate-y-0.5 hover:bg-[#2B001F] hover:text-[#FFF5CA]">Book Now</a>
        </div>
      </div>
    </article>
  );
}

export default function CSuitesPage() {
  const [activeCity, setActiveCity] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const visibleProperties = activeCity === "all" ? properties : properties.filter((property) => property.city === activeCity);
  const openEnquiry = (name: string) => { setSelectedProperty(name); setSubmitted(false); setIsModalOpen(true); };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const inputClass = "mb-4 block h-auto w-full rounded-none border border-[#e0e0e0] px-[10px] py-2 text-[15px] text-[#171717] outline-none focus:border-[#2B001F] focus:ring-0";

  return (
    <main className="w-full overflow-x-hidden font-[Aileron,Inter,sans-serif] text-[#171717]">
      {/* Replace placeholders with your shared Header and Footer components. */}

      <section className="mt-[10%] grid min-h-[calc(100vh-96px)] grid-cols-[63%_37%] gap-1 bg-black max-[991px]:mt-10 max-[991px]:min-h-0 max-[991px]:grid-cols-1">
        <div className="relative flex items-end bg-[#2B001F] bg-cover bg-center bg-no-repeat p-[60px] max-[991px]:min-h-[480px] max-[991px]:px-6 max-[991px]:py-10" style={{ backgroundImage: "url('/assets/images/cSuites/apartment.png')" }}>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.55)_100%)]" />
          <div className="relative z-[1] max-w-[620px] text-white">
            <h1 className="mb-6 text-[52px] font-bold leading-[1.08] max-[991px]:text-[38px]">Corporate Serviced Apartments</h1>
            <p className="mb-8 text-lg font-normal leading-[1.5] max-[991px]:text-[15px]">With flexible short-stays &nbsp;•&nbsp; WiFi &nbsp;•&nbsp; Meals&nbsp;•&nbsp; Security &nbsp;•&nbsp; Housekeeping</p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-1 max-[991px]:grid-cols-2 max-[991px]:grid-rows-none max-[575px]:grid-cols-1">
          <div className="relative bg-[#2B001F] bg-cover bg-center bg-no-repeat p-9 max-[991px]:min-h-[220px] max-[991px]:p-6" style={{ backgroundImage: "url('/assets/images/cSuites/workstation.png')" }}>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.55)_100%)]" />
            <div className="relative z-[1] max-w-[320px] text-white"><h3 className="mb-2 text-2xl font-bold leading-[1.25]"><span className="font-normal">(+)</span> In-room workstations</h3><p className="text-[15px] font-normal opacity-90">Designed for flow state work</p></div>
          </div>
          <div className="relative bg-[#2B001F] bg-cover bg-center bg-no-repeat p-9 max-[991px]:min-h-[220px] max-[991px]:p-6" style={{ backgroundImage: "url('/assets/images/cSuites/kitchen.png')" }}>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.55)_100%)]" />
            <div className="relative z-[1] max-w-[320px] text-white"><h3 className="mb-2 text-2xl font-bold leading-[1.25]"><span className="font-normal">(+)</span> In-room kitchenettes</h3><p className="text-[15px] font-normal opacity-90">For those small hunger pangs</p></div>
          </div>
        </div>
      </section>

      <section className="py-5 font-[Aileron,Inter,sans-serif]">
        <div className="container mx-auto w-full px-3">
          <ul className="mb-[15px] flex list-none flex-nowrap gap-[10px] overflow-x-auto border-b border-[#e0e0e0] p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[{ label: "All", value: "all" }, { label: "Bengaluru", value: "bengaluru" }, { label: "Pune", value: "pune" }].map((tab) => <li key={tab.value} className="shrink-0"><button type="button" onClick={() => setActiveCity(tab.value)} className={`whitespace-nowrap border-0 border-b-2 px-[22px] py-[10px] text-[15px] transition ${activeCity === tab.value ? "border-[#2B001F] font-bold text-[#2B001F]" : "border-transparent font-semibold text-[#55505a] hover:text-[#2B001F]"}`}>{tab.label}</button></li>)}
          </ul>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProperties.map((property) => <PropertyCard key={property.id} property={property} onEnquire={openEnquiry} />)}
          </div>
        </div>
      </section>


      {isModalOpen && <div className="fixed inset-0 z-[1050] flex items-center justify-center overflow-y-auto bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="csuitesEnquireModalLabel" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false); }}>
        <div className="relative w-full max-w-[500px] bg-white"><div className="relative p-9 max-[575px]:p-6">
          <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close" className="absolute right-5 top-5 border-0 bg-transparent p-0 text-[28px] leading-none text-[#171717]">&times;</button>
          {submitted ? <div className="py-8 text-center"><h2 className="mb-3 text-[32px] font-bold">Thank You!</h2><p className="text-[15px] text-[#6b6b6b]">Thank you for your enquiry. Our team will reach out to you soon.</p><button type="button" onClick={() => setIsModalOpen(false)} className="mt-6 w-full bg-[#2B001F] px-4 py-3 text-base font-semibold text-[#FFF5CA]">Close</button></div> : <>
            <h2 id="csuitesEnquireModalLabel" className="mb-2 text-[32px] font-bold text-[#171717]">Enquire <span className="text-[#2B001F]">Now</span></h2>
            <p className="mb-5 border-b border-[#e5e5e5] pb-5 text-[15px] text-[#6b6b6b]">Simply your stay, amplify your experience</p>
            <form onSubmit={handleSubmit}><input type="hidden" name="propertyName" value={selectedProperty} /><input type="text" name="fullName" placeholder="Full Name" required className={inputClass} /><input type="tel" name="phone" placeholder="Phone Number" maxLength={10} pattern="[6-9][0-9]{9}" required className={inputClass} /><input type="email" name="email" placeholder="E-mail Id" className={inputClass} /><button type="submit" className="w-full border-0 bg-[#2B001F] p-[14px] text-base font-semibold text-[#FFF5CA]">Submit</button></form>
          </>}
        </div></div>
      </div>}
    </main>
  );
}
