"use client";

import React, { useState, type FormEvent } from "react";
import { submitLeadCapture } from "@/lib/forms/formApi";
import type { LeadCaptureRequest } from "@/lib/forms/formTypes";
import { LEAD_PHONE_PATTERN, LEAD_TRACKING_KEYS } from "@/lib/leadCapture";

type EnquiryErrors = Partial<Record<"name" | "phone" | "email", string>>;

const properties = [
  { location: "Bellandur", href: "/bangalore/pg-in-bellandur/colive-1281-jasper/colive_ppm_57273", label: "View Colive Jasper details", image: "/images/newlylaunch/jasper-bellandur.png", alt: "Colive Jasper room in Bellandur", name: "Colive Jasper", place: "Bellandur, Bengaluru" },
  { location: "Yelahanka", href: "/bangalore/pg-in-yelahanka/colive-1284-lakeside-/colive_ppm_57336", label: "View Colive Lakeside details", image: "/images/newlylaunch/lakeside-yelahanka.png", alt: "Colive Lakeside room in Yelahanka", name: "Colive Lakeside", place: "Yelahanka, Bengaluru" },
  { location: "Yelahanka", href: "/bangalore/pg-in-central/colive-1307-midas/colive_ppm_57341", label: "View Colive Midas details", image: "/images/newlylaunch/midas-yelahanka.png", alt: "Colive Midas room in Yelahanka", name: "Colive Midas", place: "Yelahanka, Bengaluru" },
  { location: "Marathahalli", href: "https://flexibooking.stayflexi.com/?hotel_id=41595", label: "View Colive Maclean details", image: "/images/newlylaunch/maclean-marathahalli.png", alt: "Colive Maclean room in Marathahalli", name: "Colive Maclean", place: "Marathahalli, Bengaluru", lazy: true },
  { location: "Whitefield", href: "/bangalore/pg-in-mahadevapura/colive-1241-brampton/colive_ppm_57215", label: "View Colive Brampton details", image: "/images/newlylaunch/brampton-whitefield.png", alt: "Colive Brampton room in Whitefield", name: "Colive Brampton", place: "Whitefield, Bengaluru", lazy: true },
  { location: "Bellandur", href: "https://flexibooking.stayflexi.com/?hotel_id=41608", label: "View Colive Cardiff details", image: "/images/newlylaunch/cardiff-bellandur.png", alt: "Colive Cardiff room in Bellandur", name: "Colive Cardiff", place: "Bellandur, Bengaluru", lazy: true },
  { location: "Hyderabad", href: "/hyderabad/pg-in-hyderabad/colive-1247-diamond/colive_ppm_57241", label: "View Colive Diamond details", image: "/images/newlylaunch/diamond-hyderabad.png", alt: "Colive Diamond room in Hyderabad", name: "Colive Diamond", place: "Hyderabad, Hyderabad", lazy: true },
  { location: "Mahadevapura", href: "https://flexibooking.stayflexi.com/?hotel_id=41603", label: "View Colive Bren details", image: "/images/newlylaunch/bren-mahadevapura.png", alt: "Colive Bren room in Mahadevapura", name: "Colive Bren", place: "Mahadevapura, Bengaluru", lazy: true },
  { location: "Whitefield", href: "https://flexibooking.stayflexi.com/?hotel_id=41586", label: "View Colive Gateway details", image: "/images/newlylaunch/gateway-whitefield.png", alt: "Colive Gateway room in Whitefield", name: "Colive Gateway", place: "Whitefield, Bengaluru", lazy: true },
];

const filters = ["All Locations", "Bellandur", "Yelahanka", "Whitefield", "Marathahalli", "Mahadevapura", "Hyderabad"];

const benefits = [
  { number: "01", title: "Lifestyle", copy: "Weekend parties, community games and sports that keep every week moving.", color: "bg-[hsl(26,100%,55%)]", icon: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/></> },
  { number: "02", title: "Laundry", copy: "Laundry and turndown servicing built into life at Colive homes.", color: "bg-[hsl(220,100%,72%)]", icon: <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/> },
  { number: "03", title: "Live Food", copy: "Fresh, tasty food prepared live in front of you, every day.", color: "bg-[hsl(51,96%,60%)]", icon: <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/> },
  { number: "04", title: "Local Transit", copy: "Free office and college bus drops, running morning and evening.", color: "bg-[hsl(130,50%,67%)]", icon: <><path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></> },
  { number: "05", title: "Luxury Duvet", copy: "A plush winter-ready duvet included for every new move-in.", color: "bg-[hsl(350,100%,76%)]", icon: <><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 12h19M12 5v14M6.5 9v6M17.5 9v6"/></> },
];

const LaunchPage = () => {
  const [activeFilter, setActiveFilter] = useState("All Locations");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const shownProperties = activeFilter === "All Locations" ? properties : properties.filter((property) => property.location === activeFilter);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const form = new FormData(event.currentTarget);
    const name = String(form.get("first_name") ?? "").trim();
    const phone = String(form.get("customer_mobile") ?? "").trim();
    const email = String(form.get("customer_email") ?? "").trim();
    const nextErrors: EnquiryErrors = {};

    if (!name) nextErrors.name = "Please enter your name";
    if (!phone) nextErrors.phone = "Please enter your WhatsApp number";
    else if (!LEAD_PHONE_PATTERN.test(phone)) nextErrors.phone = "Enter a valid WhatsApp number";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address";

    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    const query = new URLSearchParams(window.location.search);
    const tracking = Object.fromEntries(LEAD_TRACKING_KEYS.map((key) => [key, query.get(key) ?? ""]));
    const payload: LeadCaptureRequest = {
      name,
      phone,
      email,
      tracking,
      leadSource: "Colive Newlaunch",
      redirectURL: "/newlaunch/?act=thankyou",
    };

    setSubmitting(true);
    try {
      const response = await submitLeadCapture(payload);
      if (response.success) setSubmitted(true);
      else setSubmitError(response.message || "Something went wrong. Please try again.");
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const clearIfValid = (field: keyof EnquiryErrors, valid: boolean) => {
    if (valid && errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <main className="-mt-[7%] text-[hsl(0,0%,6%)]">
      <style>{`
        @keyframes nl-spin { to { transform: rotate(360deg); } }
        @keyframes nl-pulse { 50% { opacity: .5; } }
        @keyframes nl-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .nl-spin { animation: nl-spin 30s linear infinite; }
        .nl-pulse { animation: nl-pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
        .nl-fade { animation: nl-fade-up .7s ease-out both; }
        .nl-card-enter { animation: nl-fade-up .4s ease-out both; }
        .nl-property-image { transition: transform .7s ease; }
        .nl-property-link:hover .nl-property-image { transform: scale(1.05); }
        .nl-tile { transition: transform .3s ease; }
        .nl-tile:hover { transform: translateY(-8px); }
        .nl-property-link:hover .nl-property-arrow { border-color: hsl(0,0%,6%); background: hsl(0,0%,6%); color: #fff; }
        .nl-enq-input:-webkit-autofill { -webkit-text-fill-color: #fff; box-shadow: 0 0 0 1000px hsl(0,0%,6%) inset; caret-color: #fff; }
        @media (prefers-reduced-motion: reduce) { .nl-spin,.nl-pulse,.nl-fade,.nl-card-enter,.nl-property-image,.nl-tile { animation:none!important; transition:none!important; } .nl-tile:hover { transform:none!important; } }
      `}</style>

      {/* Hero */}
      <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-[hsl(48,100%,90%)] px-[clamp(20px,3.2vw,60px)] pt-32 pb-14 font-['DM_Sans',system-ui,sans-serif] text-[hsl(0,0%,6%)] max-[575.98px]:min-h-[72vh] max-[575.98px]:pt-24 max-[575.98px]:pb-14 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(hsla(0,0%,6%,.09)_1px,transparent_1px),linear-gradient(90deg,hsla(0,0%,6%,.09)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div aria-hidden="true" className="nl-spin pointer-events-none absolute top-20 right-[-10rem] size-96 rounded-full border-[70px] border-[hsl(26,100%,55%)] md:right-[5%] md:size-[34rem]" />
        <div className="nl-fade relative z-[1] w-full">
          <p className="mb-6 flex items-center gap-3 text-base font-semibold max-[575.98px]:text-sm"><span className="nl-pulse size-[10px] shrink-0 rounded-full bg-[hsl(26,100%,55%)]" />Fresh Addresses. First Access.</p>
          <h1 className="nl-fade m-0 max-w-[11.5em] font-['Archivo_Black','Archivo',sans-serif] text-[clamp(3.1rem,8.6vw,8rem)] leading-none font-black tracking-[-.025em]">Newly Launched Coliving Homes</h1>
          <div className="nl-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href="#homes" className="inline-flex h-14 items-center gap-[.6rem] bg-[hsl(0,0%,6%)] px-7 text-base font-medium text-white no-underline transition-colors duration-200 hover:bg-[hsl(26,100%,55%)] hover:text-[hsl(0,0%,6%)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[hsl(0,0%,6%)]">Explore New Homes<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></a>
            <p className="m-0 max-w-[28rem] text-[1.05rem] leading-[1.6] text-[hsla(0,0%,6%,.65)] max-[575.98px]:text-[.95rem]">Nine new ways to live better across Bengaluru and Hyderabad.</p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="homes" className="scroll-mt-20 bg-white px-[clamp(20px,3.2vw,60px)] py-20 font-['DM_Sans',system-ui,sans-serif] text-[hsl(0,0%,6%)] md:py-28">
        <div className="mb-12 flex flex-col gap-7 min-[992px]:flex-row min-[992px]:items-end min-[992px]:justify-between">
            <div>
            <p className="mb-4 text-sm font-semibold text-[hsl(0,0%,40%)]">Now Opening</p>
            <h2 className="m-0 font-['Archivo_Black','Archivo',sans-serif] text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-black tracking-[-.025em]">
                Pick Your Neighbourhood</h2>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] min-[992px]:max-w-[55%]" role="tablist" aria-label="Filter properties by location">
            {filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} aria-controls="nl-loc-grid" onClick={() => setActiveFilter(filter)} className={`h-11 shrink-0 cursor-pointer rounded-full border px-5 font-['DM_Sans',system-ui,sans-serif] text-[.95rem] font-medium whitespace-nowrap transition-colors duration-200 hover:bg-[hsl(0,0%,96%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(26,100%,55%)] ${activeFilter === filter ? "border-[hsl(0,0%,6%)] bg-[hsl(0,0%,6%)] text-white hover:bg-[hsl(0,0%,6%)]" : "border-[hsl(0,0%,88%)] bg-white text-[hsl(0,0%,6%)]"}`}>{filter}</button>)}
          </div>
        </div>
        <div id="nl-loc-grid" className="grid grid-cols-1 gap-6 min-[576px]:grid-cols-2 min-[992px]:grid-cols-3 min-[992px]:gap-7" role="tabpanel">
          {shownProperties.map((property) => <article key={property.name} className="nl-card-enter overflow-hidden border border-[hsl(0,0%,88%)] bg-white">
            <a href={property.href} target="_blank" rel="noopener noreferrer" aria-label={property.label} className="nl-property-link block text-inherit no-underline hover:text-inherit focus:text-inherit">
              <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(0,0%,95%)]">
              <img src={property.image} alt={property.alt} loading={property.lazy ? "lazy" : "eager"} className="nl-property-image block size-full object-cover"/>
              <span className="absolute top-4 left-4 rounded-full bg-[hsla(0,0%,100%,.9)] px-3 py-1.5 text-[.8rem] leading-[1.2] font-semibold backdrop-blur-[8px]">New Launch</span>
              </div>
              <div className="flex items-end justify-between gap-4 px-6 pt-5 pb-6">
                <div>
                <h3 className="m-0 font-['Archivo_Black','Archivo',sans-serif] text-[1.35rem] leading-[1.2] font-black tracking-[-.01em]">{property.name}</h3>
                <p className="mt-[.35rem] mb-0 text-[.95rem] text-[hsl(0,0%,40%)]">{property.place}</p>
                </div>
                <span className="nl-property-arrow flex size-11 shrink-0 items-center justify-center rounded-full border border-[hsl(0,0%,88%)] transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7"/>
                        <path d="M7 7h10v10"/>
                    </svg>
                </span>
                    </div>
            </a>
          </article>)}
        </div>
      </section>

      {/* 5Ls of City Life */}
      <section className="bg-[hsl(0,0%,6%)] px-[clamp(20px,3.2vw,60px)] py-20 font-['DM_Sans',system-ui,sans-serif] text-white md:py-28">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
                <p className="mb-4 text-[.95rem] font-semibold text-[hsl(26,100%,55%)]">The 5Ls Of City Life</p>
                <h2 className="m-0 max-w-[10em] font-['Archivo_Black','Archivo',sans-serif] text-[clamp(2.25rem,5.5vw,5.75rem)] leading-none font-black tracking-[-.025em] text-white">Everything That Makes City Life Click</h2>
            </div>
            <p className="m-0 max-w-[32rem] text-[1.05rem] leading-[1.65] text-[hsla(0,0%,100%,.6)] md:justify-self-end">A complete urban living system,
                designed around the things you need every
                day and the experiences you want every week.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 min-[576px]:grid-cols-2 min-[992px]:grid-cols-5 min-[992px]:gap-[1.1rem]">
          {benefits.map((benefit) => <article key={benefit.number} className={`nl-tile flex min-h-72 flex-col justify-between p-6 text-[hsl(0,0%,6%)] min-[992px]:min-h-[25rem] min-[992px]:p-[1.9rem] ${benefit.color}`}>
            <div className="flex items-center justify-between">
                <span className="text-[.95rem] font-semibold">{benefit.number}</span>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{benefit.icon}</svg>
            </div>
                <div>
                    <h3 className="m-0 font-['Archivo_Black','Archivo',sans-serif] text-[clamp(1.75rem,2.4vw,2.5rem)] leading-[1.15] font-black tracking-[-.01em] text-[hsl(0,0%,6%)]">{benefit.title}</h3><p className="mt-4 mb-0 text-base leading-[1.7] text-[hsla(0,0%,6%,.7)]">{benefit.copy}</p></div></article>)}
                </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="grid scroll-mt-20 gap-12 border-t border-[hsla(0,0%,100%,.08)] bg-[hsl(0,0%,6%)] px-[clamp(20px,3.2vw,60px)] py-20 font-['DM_Sans',system-ui,sans-serif] text-white md:py-28 min-[992px]:grid-cols-[.85fr_1.15fr] min-[992px]:items-end min-[992px]:gap-16">
        <div><p className="mb-5 text-[.95rem] font-semibold text-[hsl(51,96%,60%)]">Find Your New Home</p>
        <h2 className="m-0 max-w-[8.5em] font-['Archivo_Black','Archivo',sans-serif] text-[clamp(2.2rem,5vw,4.8rem)] leading-none font-black tracking-[-.025em] text-white">Be First Through The Door</h2>
        <p className="mt-6 mb-0 max-w-[30rem] text-[1.05rem] leading-[1.65] text-[hsla(0,0%,100%,.65)]">Tell us where you want to live. Our team will match you with the newest Colive homes and current availability.</p></div>
        <div>
          {submitted ? (
            <div className="flex min-h-64 flex-col items-center justify-center border border-[hsla(0,0%,100%,.15)] bg-[hsla(0,0%,100%,.05)] p-8 text-center" role="status">
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-[hsl(130,50%,67%)] text-[hsl(0,0%,6%)]" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <h3 className="m-0 font-['Archivo_Black','Archivo',sans-serif] text-[1.6rem] font-black text-white">Inquiry Received</h3>
              <p className="mt-3 mb-0 text-[1.05rem] text-[hsla(0,0%,100%,.6)]">A Colive advisor will connect with you shortly.</p>
            </div>
          ) : (
          <>
          {submitError && <p className="m-0 text-sm text-[hsl(0,90%,72%)]" role="alert">{submitError}</p>}
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-px bg-[hsla(0,0%,100%,.15)] min-[576px]:grid-cols-2" id="walkthroughForm" noValidate>
            <label className="m-0 block cursor-text bg-[hsl(0,0%,6%)] p-5 min-[576px]:col-span-2">
                <span className="sr-only">Full Name</span>
                <input type="text" className="nl-enq-input block w-full border-0 bg-transparent py-3 text-[1.05rem] text-white outline-none placeholder:text-[hsla(0,0%,100%,.4)] focus:shadow-[inset_0_-2px_0_hsl(51,96%,60%)]" id="first_name" name="first_name" maxLength={100} placeholder="Full Name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "wt-name-error" : undefined} onChange={(event) => clearIfValid("name", Boolean(event.target.value.trim()))}/>
                {errors.name && <span className="block text-[.85rem] text-[hsl(0,90%,72%)]" id="wt-name-error">{errors.name}</span>}</label>
            <label className="m-0 block cursor-text bg-[hsl(0,0%,6%)] p-5">
                <span className="sr-only">WhatsApp Number</span>
                <input type="tel" className="nl-enq-input block w-full border-0 bg-transparent py-3 text-[1.05rem] text-white outline-none placeholder:text-[hsla(0,0%,100%,.4)] focus:shadow-[inset_0_-2px_0_hsl(51,96%,60%)]" id="customer_mobile" name="customer_mobile" maxLength={16} inputMode="tel" placeholder="WhatsApp Number" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "wt-phone-error" : undefined} onChange={(event) => clearIfValid("phone", LEAD_PHONE_PATTERN.test(event.target.value.trim()))}/>
                {errors.phone && <span className="block text-[.85rem] text-[hsl(0,90%,72%)]" id="wt-phone-error">{errors.phone}</span>}</label>
            <label className="m-0 block cursor-text bg-[hsl(0,0%,6%)] p-5">
                <span className="sr-only">Email Address</span>
                <input type="email" className="nl-enq-input block w-full border-0 bg-transparent py-3 text-[1.05rem] text-white outline-none placeholder:text-[hsla(0,0%,100%,.4)] focus:shadow-[inset_0_-2px_0_hsl(51,96%,60%)]" id="customer_email" name="customer_email" maxLength={255} placeholder="Email Address" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "wt-email-error" : undefined} onChange={(event) => clearIfValid("email", !event.target.value.trim() || /^\S+@\S+\.\S+$/.test(event.target.value.trim()))}/>
                {errors.email && <span className="block text-[.85rem] text-[hsl(0,90%,72%)]" id="wt-email-error">{errors.email}</span>}</label>
            <button type="submit" disabled={submitting} aria-busy={submitting} className="flex h-16 items-center justify-center gap-[.6rem] border-0 rounded-none bg-[hsl(26,100%,55%)] text-[1.05rem] font-medium text-[hsl(0,0%,6%)] transition-colors duration-200 hover:bg-[hsl(51,96%,60%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70 min-[576px]:col-span-2">
                <span className="nl-enq__btn-label">{submitting ? "Submitting..." : "Send Inquiry"}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
          </form>
          <p className="mt-4 mb-0 text-[.85rem] text-[hsla(0,0%,100%,.45)]" id="wt-disclaimer">
            By submitting you agree to be contacted on WhatsApp by Colive.</p>
          </>
          )}
        </div>
      </section>
    </main>
  );
};

export default LaunchPage;
