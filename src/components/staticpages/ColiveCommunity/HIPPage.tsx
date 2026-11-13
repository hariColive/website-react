"use client";

import { useState, type FormEvent, type ReactNode } from "react";



const localities: Record<string, string[]> = {
  Bangalore: ["BTM Layout", "Bannerghatta Road", "Bellandur", "Central", "Devanahalli", "Electronic City", "Hebbal", "Jayanagar-JP nagar", "KR Puram", "Kanakapura Road", "Koramangala", "Mahadevapura", "Marathahalli", "Mysore road", "New Whitefield", "Sarjapur", "Silk Board", "Whitefield", "Yelahanka", "Yeshwanthpura", "Others"],
  Chennai: ["DLF", "KK nagar", "OMR", "Porur", "Velachery", "vadapalani", "Others"],
  Hyderabad: ["Financial District", "Gachibowli", "Gowlidoddi", "HITEC-City", "Kondapur", "Madhapur", "Others"],
  Pune: ["Akurdi", "Aundh", "Baner", "Bhosari", "Blue Ridge Town Pune", "Chinchwad", "Dapodi", "Hinjawadi", "Kalewadi", "Maan", "Marunji", "Megapolis", "Nigdi", "Pimple Gurav", "Pimple Saudagar", "Pimpri", "Rahatani", "Sangvi", "Sant Tukaram Nagar", "Tathawade", "Thergaon", "Wakad", "Others"],
};

const benefits = [
  ["WI-FI.png", "100 GB WI-FI", "grey"],
  ["Deposit.png", "1 Month Deposit", "pink"],
  ["NoLockin.png", "No Lock in", "grey"],
  ["Bill.png", "Bill to company", "pink"],
  ["Safety.png", "Safety & Security", "grey"],
  ["Datasecurity.png", "Data Security & Privacy", "pink"],
  ["Productivity.png", "Higher Productivity", "grey"],
  ["Higher.png", "Higher retention of employees", "pink"],
] as const;

const promises = [
  ["promise1", "Style", "Thoughtfully designed interiors"],
  ["promise2", "Safety", "24/7 Emergency Response Team"],
  ["promise3", "Smart", "SHONA (Smart Home Operating Networking Assistant)"],
  ["promise4", "Services", "Professional housekeeping and maintenance"],
  ["promise5", "Social", "Club Colive"],
  ["promise6", "Savings", "Low Deposits and Flexi-contracts"],
];

function SectionTitle({ children, accent }: { children: ReactNode; accent: ReactNode }) {
  return <div className="text-center"><h2 className="mb-[5%] text-[40px] font-semibold max-[768px]:mb-0 max-[768px]:text-[20px] max-[375px]:mb-[5%] max-[375px]:text-[18px]">{children} <span className="text-[#F2006C]">{accent}</span></h2></div>;
}

function EnquiryForm() {
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ fname: "", mobileno: "", email: "", accommodation: "", corporatename: "" });
  const update = (key: keyof typeof form, value: string) => setForm((old) => ({ ...old, [key]: value }));
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.fname.trim() || !/^[6789]\d{9}$/.test(form.mobileno) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !city || !locality || !form.accommodation || !form.corporatename.trim()) {
      setStatus("");
      setError("Please complete all required fields with valid details.");
      return;
    }
    setError("");
    setStatus("Your details are valid. Connect the existing Colive lead API to submit this enquiry.");
  };
  return <div id="dvEnquiryNowForm" className="mb-4 mt-[7%] ml-[-1%] rounded-[10px] border border-[#AAAAAA] bg-white pb-[2%] shadow-none max-[768px]:mx-0 max-[768px]:mb-[-120%] max-[768px]:mt-[35%] max-[768px]:shadow-[0_4px_40px_#0000001A]">
    <form onSubmit={submit} noValidate className="block">
      <div className="px-5 pb-0 pt-4"><h3 className="pl-0 text-[22px] font-semibold max-[768px]:text-[18px]">Get personally <span className="text-[#F2006C]">connected with us.</span></h3></div>
      <hr className="mx-5 border border-black" />
      <div className="px-5 max-[768px]:px-3">
        <div className="mb-[4%]"><input aria-label="Name" value={form.fname} onChange={e=>update("fname",e.target.value)} placeholder="Name*" className="h-[45px] w-full rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px]" /></div>
        <div className="relative mb-[4%]"><span className="absolute bottom-3 left-[5px] border-r border-black pr-[7px] text-[14px]">+91</span><input aria-label="Mobile number" value={form.mobileno} onChange={e=>update("mobileno",e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="Mobile number*" type="tel" className="h-[45px] w-full rounded-[5px] border border-[#AAAAAA] bg-white pl-[12%] text-[14px] max-[768px]:pl-[14%] max-[375px]:pl-[16%]" /></div>
        <div className="mb-[4%]"><input aria-label="Email" type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="Email*" className="h-[45px] w-full rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px]" /></div>
        <div className="relative mb-[4%]"><select aria-label="Select City" value={city} onChange={e=>{setCity(e.target.value);setLocality("");}} className="h-[45px] w-full appearance-none rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px]"><option value="">Select City</option>{Object.keys(localities).map(c=><option key={c} value={c}>{c==="Bangalore"?"Bangalore":c}</option>)}</select><i className="fa fa-chevron-down pointer-events-none absolute right-[15px] top-[35%] text-[#616161]" /></div>
        <div className="relative mb-[4%]"><select aria-label="Select Location" value={locality} onChange={e=>setLocality(e.target.value)} className="h-[45px] w-full appearance-none rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px]"><option value="">Select Location</option>{(localities[city]||[]).map(x=><option key={x}>{x}</option>)}</select><i className="fa fa-chevron-down pointer-events-none absolute right-[15px] top-[35%] text-[#616161]" /></div>
        <div className="relative mb-[4%]"><select aria-label="Accommodation Type" value={form.accommodation} onChange={e=>update("accommodation",e.target.value)} className="h-[45px] w-full appearance-none rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px]"><option value="">Accommodation Type*</option>{["Private Room","Double sharing Studio","Triple sharing Studio","1 BHK","Couple sharing"].map(x=><option key={x}>{x}</option>)}</select><i className="fa fa-chevron-down pointer-events-none absolute right-[15px] top-[35%] text-[#616161]" /></div>
        <div className="mb-[4%]"><input aria-label="Corporate Name" value={form.corporatename} onChange={e=>update("corporatename",e.target.value)} placeholder="Corporate Name*" className="h-[45px] w-full rounded-[5px] border border-[#AAAAAA] bg-white px-3 text-[14px]" /></div>
        {error && <p role="alert" className="mb-3 text-sm text-red-600">{error}</p>}
        {status && <p role="status" className="mb-3 text-sm text-green-700">{status}</p>}
        <div className="mb-[4%] flex justify-center"><button type="submit" className="h-[45px] w-full cursor-pointer rounded-[5px] border border-[#F2006C] bg-[#F2006C] p-[5px] text-[18px] font-semibold text-white">Submit</button></div>
        <input type="hidden" name="leadSource" value="Colive HIP" /><input type="hidden" name="LandingPageId" value="61" /><input type="hidden" name="Mobile_Number_Validated" value="false" /><input type="hidden" name="IsOtpVerificationRequired" value="false" />
      </div>
    </form>
  </div>;
}

export default function HIPPage() {
  return <main className="relative overflow-x-hidden font-['Inter-Regular',Arial,sans-serif] text-black">
    {/* Replace these placeholders with the existing shared site header component. */}
    <div id="site-header" data-include="commonheader/header" className="header include" />
    <section className="section1">
      <div className="mt-[10%] bg-[url('/assets/images/hip/Banner-web.webp')] bg-[length:100%_100%] bg-no-repeat max-[768px]:mt-[50px] max-[768px]:bg-[url('/assets/images/hip/Banner-Mob.webp')] max-[768px]:bg-[length:100%_auto]">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-50px)]">
          <div className="grid grid-cols-12">
            <div className="col-span-8 flex flex-col justify-center max-[768px]:col-span-12 max-[768px]:px-0">
              <h1 className="text-[45px] font-semibold text-white max-[768px]:mt-[15%] max-[768px]:px-[1%] max-[768px]:text-center max-[768px]:text-[20px]">Welcome to Colive HIP-<br className="max-[768px]:hidden" /> Where Co-living meets<br className="max-[768px]:hidden" /> Co-Working</h1>
              <p className="py-[15px] pb-5 text-[20px] text-white max-[768px]:py-[10px] max-[768px]:text-center max-[768px]:text-[14px] max-[375px]:text-[13px]">Hybrid Integrated Pods Shaping the Neo-Gen <br className="max-[768px]:hidden" /> urban lifestyle</p>
              <a href="tel:+917676000500" className="inline-flex w-fit bg-[#F2006C] px-[35px] py-[14px] text-[20px] font-normal text-white max-[768px]:mx-auto max-[768px]:my-[15px] max-[768px]:rounded-[5px] max-[768px]:border-[1.5px] max-[768px]:border-[#F2006C] max-[768px]:px-[30px] max-[768px]:py-[11px] max-[768px]:text-[14px]">Call us 7676 000 500</a>
            </div>
            <div className="col-span-4 max-[768px]:col-span-12"><EnquiryForm /></div>
          </div>
        </div>
      </div>
    </section>

    <section className="my-[3%]">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-full">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-5 max-[768px]:col-span-12"><picture><source srcSet="/assets/images/hip/Introduction.webp" type="image/webp" /><img src="/assets/images/hip/Introduction.png" alt="introduction" className="h-auto w-full" /></picture></div>
          <div className="col-span-7 flex flex-col justify-center max-[768px]:col-span-12 max-[768px]:mx-auto max-[768px]:-mt-[5%] max-[768px]:w-[calc(100%-50px)] max-[768px]:rounded-[5px] max-[768px]:bg-white max-[768px]:px-4 max-[768px]:pb-[5%] max-[768px]:shadow-[0_4px_40px_rgba(0,0,0,0.10)]">
            <h2 className="pb-[3%] text-[40px] font-semibold max-[768px]:pb-2 max-[768px]:pt-3 max-[768px]:text-center max-[768px]:text-[20px]">HIP <span className="text-[#F2006C]">Introduction </span></h2>
            <p className="text-justify text-[20px] leading-[40px] max-[768px]:text-[13px] max-[768px]:leading-[22px]">Discover a revolution in urban living with Colive, India's leading rental accommodation provider. Our cutting-edge Colive Hybrid Integrated Pods offer a seamless blend of co-living and work-from-home spaces designed to elevate the lifestyles of modern professionals</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#F6F6F6] py-[2.5%] max-[768px]:bg-white max-[768px]:py-[4%]">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-50px)]">
        <SectionTitle accent="of HIP">Key benefits</SectionTitle>
        <div className="grid grid-cols-3 text-center">
          {[[ "Workstations.png","Integrated","Workstations"],["Internet.png","High Speed","Internet"],["Retreat.png","Peaceful","Retreat"]].map(([img,a,b])=><div key={img} className="text-center"><img src={`/assets/images/hip/${img}`} alt={a} className="mx-auto h-auto max-w-full max-[768px]:p-[10%]" /><p className="mt-5 text-[25px] font-medium max-[768px]:mt-[5px] max-[768px]:text-[12px] max-[768px]:font-normal"><>{a}<br />{b}</></p></div>)}
        </div>
      </div>
    </section>

    <section className="my-[3%]">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-full">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-5 max-[768px]:col-span-12"><picture><source srcSet="/assets/images/hip/Hybrid.webp" type="image/webp" /><img src="/assets/images/hip/Hybrid.png" alt="introduction" className="h-auto w-full" /></picture></div>
          <div className="col-span-7 flex flex-col justify-center max-[768px]:col-span-12 max-[768px]:mx-auto max-[768px]:-mt-[5%] max-[768px]:w-[calc(100%-50px)] max-[768px]:rounded-[5px] max-[768px]:bg-white max-[768px]:px-4 max-[768px]:pb-[5%] max-[768px]:shadow-[0_4px_40px_rgba(0,0,0,0.10)]">
            <h2 className="pb-[3%] text-[40px] font-semibold max-[768px]:pb-2 max-[768px]:pt-3 max-[768px]:text-center max-[768px]:text-[20px]">Colive Hybrid <span className="text-[#F2006C]"> Integrated Pods </span></h2>
            <ul className="list-disc pl-[25px]"><li className="text-justify text-[20px] leading-[40px] max-[768px]:text-[12px] max-[768px]:leading-[21px]">Explore our latest innovation, the premium Colive Hybrid Integrated Pods. Crafted to cater to the dynamic world of remote work, these spaces provide an ideal setting for individuals and partners alike to strike the perfect balance between work and personal life.</li><li className="text-justify text-[20px] leading-[40px] max-[768px]:text-[12px] max-[768px]:leading-[21px]">Each pod boasts meticulously designed workstations, high-speed internet, ergonomic seating, and a rejuvenation center for breaks</li></ul>
          </div>
        </div>
      </div>
    </section>

    <section className="my-[3%] bg-[#F6F6F6] max-[768px]:bg-white">
      <div className="grid grid-cols-12">
        <div className="col-span-7 flex flex-col justify-center max-[768px]:col-span-12"><div className="pl-[50px] max-[768px]:pl-[25px]"><h2 className="mb-[2%] mt-[3%] text-[40px] font-semibold max-[768px]:mb-0 max-[768px]:mt-[5%] max-[768px]:pb-0 max-[768px]:text-center max-[768px]:text-[20px]">Features and <span className="text-[#F2006C]">Amenities </span></h2><ul className="list-disc pl-5">{["Stylish and functional workstations with ergonomic seating","Dedicated work-from-home facilities","High-speed, reliable internet connectivity","Comfortable and private living spaces","Thoughtfully curated decor and furnishings","Dedicated meeting rooms, cafes, amenities store, and laundry zone"].map(x=><li key={x} className="text-[18px] leading-[50px] max-[768px]:mb-[10px] max-[768px]:text-[14px] max-[768px]:leading-6">{x}</li>)}</ul></div></div>
        <div className="col-span-5 p-0 max-[768px]:col-span-12"><picture className="max-[768px]:hidden"><source srcSet="/assets/images/hip/Amenities.webp" type="image/webp" /><img src="/assets/images/hip/Amenities.png" alt="Amenities" className="h-auto w-full" /></picture></div>
      </div>
    </section>

    <section className="py-2">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-30px)] max-[768px]:rounded-[5px] max-[768px]:bg-white max-[768px]:px-3 max-[768px]:pt-[5%] max-[768px]:shadow-[0_4px_40px_rgba(0,0,0,0.10)]">
        <SectionTitle accent={<><span>PaP</span><sup className="text-[13px] align-super">*</sup> with COLIVE</>}>Sign Up as a</SectionTitle>
        <div className="grid grid-cols-3 text-center max-[768px]:grid-cols-1">
          {[
            ["AmazingStays.png","Amazing Stays","Deliver branded corporate stays to your employees and wow them during times of recruitment or relocation"],
            ["LifeUpgrades.png","Life Upgrades","Let your employees receive tailor-made deals & offers suited to their lifestyle needs, as long as they're on your payroll."],
            ["RadiusControl.png","Radius Control","Keep your friends close, and your employees closer, in homes that are a stone's throw away from your office premises."],
          ].map(([img,title,desc])=><div key={title} className="px-3 text-center"><img src={`/assets/images/hip/${img}`} alt="PaP" className="mx-auto h-auto max-w-full" /><h3 className="mb-0 py-3 text-[22px] font-semibold max-[768px]:pt-[17px] max-[768px]:pb-[7px] max-[768px]:text-[16px]">{title}</h3><p className="px-5 text-base max-[768px]:px-0 max-[768px]:text-[13px]">{desc}</p></div>)}
          <p className="col-span-3 text-left text-sm max-[768px]:col-span-1"><sup>*</sup>Preferred accommodation Partner</p>
        </div>
      </div>
    </section>

    <section className="my-[3%]">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-50px)]">
        <SectionTitle accent="Corporate">Benefits for</SectionTitle>
        <div className="grid grid-cols-4 gap-4 max-[768px]:hidden">
          {benefits.map(([img,label,color],i)=><div key={img} className={`mb-[8%] rounded-[5px] border border-[#F0F0F0] p-[5%] text-center shadow-[0_4px_40px_rgba(0,0,0,0.05)] ${color==="grey"?"bg-[#E8E8E8]":"bg-[#FDE5F0]"}`}><img src={`/assets/images/hip/${img}`} alt="Benefits" className="mx-auto h-auto max-w-full" /><p className="mt-2 text-[18px] font-medium">{label}</p></div>)}
        </div>
        <div className="hidden text-center max-[768px]:block"><picture><source srcSet="/assets/images/hip/benefits.webp" type="image/webp" /><img src="/assets/images/hip/benefits.png" alt="floorplan" className="mx-auto h-auto max-w-full" /></picture></div>
      </div>
    </section>

    <section className="section8">
      <SectionTitle accent="Plans">Floor</SectionTitle>
      <div className="grid grid-cols-2 max-[768px]:grid-cols-1">{[1,2].map(n=><div key={n} className="text-center"><picture><source srcSet={`/assets/images/hip/floorplan${n}.webp`} type="image/webp" /><img src={`/assets/images/hip/floorplan${n}.png`} alt="floorplan" className="mx-auto h-auto max-w-full" /></picture></div>)}</div>
    </section>

    <section className="my-[3%]">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-50px)]">
        <SectionTitle accent="6s Promises">Our</SectionTitle>
        <div className="grid grid-cols-3 gap-5 max-[768px]:flex max-[768px]:snap-x max-[768px]:snap-mandatory max-[768px]:overflow-x-auto">
          {promises.map(([img,title,desc])=><div key={img} className="relative min-w-0 p-[10px] max-[768px]:w-[76%] max-[768px]:shrink-0 max-[768px]:snap-start max-[768px]:p-[14px]"><picture><source srcSet={`/assets/images/hip/${img}.webp`} type="image/webp" /><img src={`/assets/images/hip/${img}.png`} alt="floorplan" className="h-auto w-full" /></picture><div className="absolute bottom-[25px] z-[1] mx-[10%] w-[75%] rounded-[5px] border border-black bg-[rgba(0,0,0,0.80)] py-[5px] text-center"><h3 className="mb-0 text-[22px] font-semibold text-[#F2006C] max-[768px]:text-[16px]">{title}</h3><p className="mb-[5px] text-white max-[768px]:text-[12px]">{desc}</p></div></div>)}
        </div>
      </div>
    </section>

    <section className="my-[3%]">
      <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-50px)] max-[768px]:pb-[10%]">
        <div className="grid grid-cols-12 items-center">
          <div className="order-2 col-span-7 flex flex-col justify-center max-[768px]:col-span-12 max-[768px]:mb-[5%] max-[768px]:order-2"><h2 className="pb-[3%] text-[40px] font-semibold max-[768px]:px-[5%] max-[768px]:pt-[5%] max-[768px]:text-center max-[768px]:text-[20px]">About <span className="text-[#F2006C]">Colive </span></h2><p className="text-justify text-[20px] leading-[40px] max-[768px]:text-[13px] max-[768px]:leading-[22px]">Colive is at the forefront of redefining rental accommodation. With a vision to be the "Future of Living," we cater to the needs of urban migrants, offering smart, furnished, and managed flexible homes closer to workplaces and educational institutions. Our ethos is built on the principles of <span className="font-semibold text-[#F2006C]">6S - Style, Safety, Smart, Service, Savings, and Social.</span></p></div>
          <div className="order-1 col-span-5 text-center max-[768px]:col-span-12"><img src="/assets/images/aboutus/rents.png" alt="floorplan" className="mx-auto h-auto w-full max-[768px]:w-1/2" /></div>
        </div>
      </div>
    </section>
    {/* Replace this placeholder with the existing shared site footer component. */}
    <div id="site-footer" data-include="commonfooter/footer" className="footer include relative" />
    <div id="AjaxLoader" className="fixed inset-0 z-[10000000] hidden items-center justify-center bg-[#ffffffba]"><div className="relative flex h-[100px] w-[100px] items-center justify-center"><div className="relative flex h-[35px] w-[35px] justify-center rounded-full border-[6px] border-[#ef0075] border-t-transparent" /><div className="absolute h-[55px] w-[55px] animate-spin rounded-full border-[6px] border-[#ef0075] border-t-transparent" /></div></div>
  </main>;
}
