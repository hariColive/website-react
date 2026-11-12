"use client";

import { FormEvent, useEffect, useState } from "react";

const pink = "#F2006C";
const asset = "/images/bst/";

type Tracking = {
  gclid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  utm_keyword: string;
};

const emptyTracking: Tracking = {
  gclid: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  utm_keyword: "",
};

function TrackingFields({ tracking }: { tracking: Tracking }) {
  return (
    <>
      {Object.entries(tracking).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} readOnly />
      ))}
      <input type="hidden" name="leadSource" value="Colive BST" />
      <input type="hidden" name="LandingPageId" value="64" />
      <input type="hidden" name="Mobile_Number_Validated" value="false" />
      <input type="hidden" name="redirectURL" value="/bst/?act=thankyou" />
    </>
  );
}

function EnquiryCard({ tracking }: { tracking: Tracking }) {
  const inputClass =
    "mb-5 h-[45px] w-full rounded-[3px] border border-[#ccc] bg-white px-3 py-[6px] text-base leading-6 text-[#212529] outline-none focus:border-0 focus:bg-[#F4F4F4]";

  return (
    <div className="w-full rounded-[10px] border border-[#ccc] bg-white max-[768px]:mt-[25px]">
      <div id="dvAarraPopup" className="popupformcenter">
        <form action="/api/Colive/SaveLeadDetails" method="post" id="popupform" name="popupform" className="popupform1">
          <div id="form-content" className="inputblock">
            <div className="form-title">
              <h2 className="mb-2 px-[2%] pt-[4%] pl-[4%] text-[23px] font-semibold leading-normal text-black max-[768px]:text-[18px]">
                Enquire <span className="text-[#F2006C]">Now </span>
              </h2>
            </div>
            <hr className="my-2 h-[3px] border-0 bg-black max-[768px]:h-px" />
            <div className="relative px-[4%]">
              <input className={inputClass} type="text" name="first_name" id="first_name" placeholder="Name*" required />
            </div>
            <div className="relative px-[4%]">
              <span className="absolute left-[25px] top-[25%] z-10 text-base">+91 | </span>
              <input className={`${inputClass} pl-[11%] max-[768px]:pl-[13%] min-[0px]:max-[375px]:pl-[17%]`} type="tel" name="customer_mobile" id="customer_mobile" pattern="[6789][0-9]{10}" placeholder="Mobile Number*" required />
            </div>
            <div className="relative px-[4%]">
              <input className={inputClass} type="email" name="customer_email" id="customer_email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" placeholder="Email" />
            </div>
            <div className="mt-4 px-[4%] text-center">
              <input className="h-[50px] w-full cursor-pointer rounded-[5px] border-0 bg-[#F2006C] py-[10px] text-center text-[18px] font-medium text-white" type="submit" value="Submit" name="submit" data-toggle="modal" />
              <TrackingFields tracking={tracking} />
            </div>
          </div>
          <p className="my-5 text-center text-base font-semibold text-black max-[768px]:text-[12px] max-[768px]:leading-[10px]">
            Need Assistance? Call at <a href="tel:7676000500" className="font-semibold text-[#F2006C]">7676 000 500 </a>
          </p>
        </form>
      </div>
    </div>
  );
}

function ApplyNowModal({ open, onClose, tracking }: { open: boolean; onClose: () => void; tracking: Tracking }) {
  if (!open) return null;
  const inputClass = "mb-5 h-[45px] w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 py-[6px] text-base leading-6 text-[#212529] outline-none";
  return (
    <div id="applynow" className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/50 px-4 pt-[10vh]" role="dialog" aria-modal="true" aria-labelledby="exampleModalLabel" onClick={onClose}>
      <div className="my-6 w-full max-w-[500px] overflow-hidden rounded-[10px] bg-white" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b-2 border-[#555] px-5 py-4">
          <h5 id="exampleModalLabel" className="m-0 text-[23px] font-semibold">Enquire <span className="text-[#F2006C]">Now</span></h5>
          <button type="button" onClick={onClose} aria-label="Close" className="text-3xl leading-none text-gray-600">×</button>
        </div>
        <div className="p-5">
          <form action="/api/Offers/LeadCapture" method="post" id="popupform-modal" name="popupform" className="popupform2">
            <div className="mb-2" />
            <div className="relative">
              <label htmlFor="modal_first_name" className="mb-2 block">Name<sup className="text-red-600">*</sup></label>
              <input className={inputClass} type="text" name="first_name" id="modal_first_name" required />
            </div>
            <div className="relative">
              <label htmlFor="modal_customer_mobile" className="mb-2 block">Mobile Number<sup className="text-red-600">*</sup></label>
              <span className="absolute left-[10px] top-[50%]">+91 | </span>
              <input className={`${inputClass} pl-[13%]`} type="tel" name="customer_mobile" id="modal_customer_mobile" pattern="[6789][0-9]{10}" required />
            </div>
            <div>
              <label htmlFor="modal_customer_email" className="mb-2 block">E-mail</label>
              <input className={inputClass} type="email" name="customer_email" id="modal_customer_email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" />
            </div>
            <div className="mb-4 mt-4 text-center">
              <input className="h-[50px] w-full cursor-pointer rounded-[3px] bg-[#F2006C] text-[18px] font-medium text-white" type="submit" value="Submit" name="submit" data-toggle="modal" />
              <TrackingFields tracking={tracking} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ThankYouModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="w-full max-w-[500px] rounded-[10px] border-t-[5px] border-[#F2006C] bg-white p-6 text-center" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="float-right text-2xl">×</button>
        <img className="mx-auto h-auto w-[100px]" alt="success" src="/assets/images/nirvana/modal/img2.png" />
        <h2 className="my-4 text-[40px] font-semibold">Thank You!</h2>
        <h6 className="mb-[22px] text-base font-medium leading-6 tracking-[1px] text-[#212529]">Our team will reach out to you soon with matching properties...</h6>
        <p className="font-semibold">Reach out to <span className="text-[#F2006C]">7676 000 500</span> to speak to our agent live</p>
      </div>
    </div>
  );
}

function Picture({ name, alt }: { name: string; alt: string }) {
  return <img src={`${asset}${name}.webp`} alt={alt} className="h-auto max-w-full" />;
}

export default function BstPage() {
  const [tracking, setTracking] = useState<Tracking>(emptyTracking);
  const [applyOpen, setApplyOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTracking({
      gclid: params.get("gclid") || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      utm_keyword: params.get("utm_keyword") || "",
    });
    if (params.get("act") === "thankyou?dt") setThankYouOpen(true);
  }, []);

  const openApply = () => setApplyOpen(true);

  return (
    <div className="relative overflow-x-hidden font-[Inter-Regular,Inter,sans-serif] text-[#212529]">
      {/* Replace these include placeholders with your existing Next.js Header and Footer components if available. */}
      <div className="header include" id="site-header" data-include="commonheader/header" />
      <main className="overflow-x-hidden">
        <section className="section1">
          <div className="min-h-[500px] bg-[url('/images/bst/Hero.webp')] bg-[length:100%_100%] bg-no-repeat pt-[10%] max-[768px]:mt-[50px] max-[768px]:min-h-[540px] max-[768px]:bg-[url('/images/bst/Hero-mobile.webp')] max-[768px]:bg-[length:100%_100%]">
            <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h1 className="pt-[10%] text-[40px] font-bold leading-[63px] text-white max-[768px]:pt-[60%] max-[768px]:px-[1%] max-[768px]:text-center max-[768px]:text-[20px] max-[768px]:leading-[25px]">
                    Empower Your Career Today with <br className="max-[768px]:hidden" />Bharat Skill Tech at EduCity!
                  </h1>
                  <p className="py-[0.5%] text-[20px] font-medium leading-[35px] text-white max-[768px]:py-[10px] max-[768px]:pb-[15px] max-[768px]:text-center max-[768px]:text-[12px] max-[768px]:leading-[18px]">
                    Experience a transformative 10-week journey with Bharat Skill Tech program, where learning meets comfort
                  </p>
                  <div className="flex gap-5 pb-[12%] pt-[2%] max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-[15px]">
                    <button type="button" onClick={openApply} className="rounded-[5px] bg-[#F2006C] px-[45px] py-[15px] text-[20px] font-normal leading-[26px] text-white max-[768px]:w-[80%] max-[768px]:px-[15px] max-[768px]:py-[10px] max-[768px]:text-[16px] max-[768px]:leading-5 min-[371px]:max-[395px]:px-[25px] max-[370px]:px-[18px]">Apply Now</button>
                    <a href="tel:7676000500" className="w-auto max-[768px]:w-[80%]"><button type="button" className="w-full rounded-[5px] border-2 border-[#F2006C] bg-transparent px-[45px] py-[15px] text-[20px] font-normal leading-[26px] text-[#F2006C] max-[768px]:px-[15px] max-[768px]:py-[10px] max-[768px]:text-[16px]">Call us <span className="font-semibold">7676 000 500</span></button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section2">
          <div className="mx-auto w-[calc(100%-100px)] py-[3%] max-[768px]:w-[calc(100%-32px)] max-[768px]:py-[5%]">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="hidden max-[768px]:block"><Picture name="BharatSkillTec" alt="Bharat Skill Tech" /></div>
                <div className="max-[768px]:hidden"><Picture name="BharatSkillTec" alt="Bharat Skill Tech" /></div>
              </div>
              <div className="flex flex-col justify-center lg:col-span-7">
                <div className="pl-[4%] max-[768px]:pl-0">
                  <h2 className="mb-0 pb-[4%] text-[40px] font-semibold max-[768px]:pb-[10px] max-[768px]:pt-4 max-[768px]:text-center max-[768px]:text-[20px]">What is Bharat Skill Tech</h2>
                  <p className="text-justify text-[18px] leading-7 max-[768px]:text-[12px] max-[768px]:leading-[21px]">
                    Bharat Skill Tech, an esteemed organization is dedicated to enhancing career opportunities through skill-based programs for India’s youth. Our mission is to equip individuals with the necessary expertise to thrive in today's dynamic job market.<br /><br />
                    Elevate your career prospects with our comprehensive skill-based short-term courses designed to equip you for success. Priced affordably at Rs 10,000, this program offers a gateway to a fulfilling career in the dynamic job market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F7F7] pb-2 max-[768px]:bg-[#F6F6F6] max-[768px]:pb-[5%]">
          <div className="mx-auto w-[calc(100%-100px)] pt-[3%] max-[768px]:w-[calc(100%-32px)]">
            <h2 className="pb-[4%] text-center text-[40px] font-semibold max-[768px]:py-[5%] max-[768px]:pb-[8%] max-[768px]:text-[20px]">What will you get in BST</h2>
            <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
              <Feature image="Educampus.png" alt="Educampus" title="Skill-Based Courses" text="Dive into specialized courses meticulously crafted to meet industry demands. Acquire practical skills that resonate with market needs, ensuring your readiness for the professional world." />
              <Feature image="shuttle.png" alt="shuttle" title="Shuttle Service" text="Seamlessly travel with our shuttle service, ensuring you reach your learning destination hassle-free." />
              <Feature image="double-bed.png" alt="double-bed" title="EduLive Campus Stay" text="Enjoy the luxury of free accommodation at the prestigious EduLive Campus, offering a comfortable and conducive learning environment." />
              <Feature image="certificate.png" alt="certificate" title="GRE (Guest relationship executive) Certification" text="Receive a recognized certification upon successful course completion, validating your expertise and enhancing your employability." />
              <Feature image="meals.png" alt="meals" title="Complimentary Meals" text="Delight in the convenience of free, delicious meals, taking care of your dietary needs during the program duration." />
              <Feature image="placement.png" alt="placement" title="Placement Assistance" text="Benefit from our dedicated support in securing placements, guiding you toward lucrative career opportunities." />
            </div>
          </div>
        </section>

        <section className="bg-[#F2006C]">
          <div className="mx-auto w-[calc(100%-100px)] py-[3%] max-[768px]:w-[calc(100%-32px)] max-[768px]:pb-0">
            <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
              <div className="order-2 lg:order-1 lg:col-span-8">
                <h2 className="mt-[2%] text-[40px] font-semibold leading-[55px] text-white max-[768px]:text-center max-[768px]:text-[20px] max-[768px]:leading-8">Become a certified Guest Relationship Executive and <span className="text-black">take charge of your <br className="max-[768px]:hidden" />career today!</span></h2>
                <p className="absolute mt-[2%] w-fit rounded-[10px] border border-white p-[10px] text-white max-[768px]:relative max-[768px]:mb-[8%] max-[768px]:mt-[2%] max-[768px]:p-[15px] max-[768px]:text-center">Eligibility: 10+, 12+ graduates, Minimum age to be 18+</p>
              </div>
              <div className="order-1 text-center lg:order-2 lg:col-span-4"><img src={`${asset}certificate2.png`} alt="certificate" className="mx-auto h-auto max-w-full max-[768px]:max-w-[100px]" /></div>
            </div>
          </div>
        </section>

        <section className="my-[3%] bg-[url('/images/bst/Curriculum.webp')] bg-no-repeat bg-[length:100%_100%] py-[3%] max-[768px]:my-0 max-[768px]:bg-[url('/images/bst/Curriculum.webp')] max-[768px]:bg-[length:100%_100%] max-[768px]:px-[2%] max-[768px]:py-[4%]">
          <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="py-[3%] text-[40px] font-semibold max-[768px]:text-[18px]">Curriculum Structure</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <ul className="list-disc pl-5">{["Effective Presentation Skills", "Developing Interpersonal Skills", "Creative and Critical Thinking", "People and Soft Skills", "Basic Reasoning and Aptitude"].map((item) => <li key={item} className="mb-[25px] text-[18px] leading-[30px] max-[768px]:mb-0 max-[768px]:text-[14px] max-[768px]:leading-9">{item}</li>)}</ul>
                  <ul className="list-disc pl-5">{["Behavioral Skills", "Time Management", "Interview Skills", "Job Placement Assistance"].map((item) => <li key={item} className="mb-[25px] text-[18px] leading-[30px] max-[768px]:mb-0 max-[768px]:text-[14px] max-[768px]:leading-9">{item}</li>)}</ul>
                </div>
              </div>
              <div className="hidden lg:col-span-5 lg:block"><Picture name="CurriculumStructure" alt="Curriculum Structure" /></div>
            </div>
          </div>
        </section>

        <section className="my-[4%] max-[768px]:my-[5%]">
          <div className="mx-auto w-[calc(100%-100px)] bg-[url('/images/bst/Campus.webp')] bg-[length:100%_100%] bg-no-repeat py-[3%] max-[768px]:w-[calc(100%-32px)] max-[768px]:bg-[url('/images/bst/Campusmobileview.webp')] max-[768px]:pb-[45%] max-[768px]:pl-[5%]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7" />
              <div className="flex flex-col justify-center lg:col-span-5">
                <h3 className="py-[3%] text-[40px] font-semibold text-white max-[768px]:text-[20px]">Campus Overview</h3>
                <ul className="list-disc pl-[5%] text-[22px] text-white max-[768px]:text-[12px] max-[768px]:leading-[22px]"><li className="mb-[15px] max-[768px]:mb-[5px]">Located in New whitefield</li><li className="mb-[15px] max-[768px]:mb-[5px]">Located in a 45 acres integrated township</li></ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-[4%] bg-[#1B1B1B] max-[768px]:m-0">
          <div className="relative mx-auto w-[calc(100%-100px)] pt-[3%] max-[768px]:w-[calc(100%-32px)]">
            <div className="grid grid-cols-1 items-center lg:grid-cols-12">
              <div className="order-2 flex flex-col justify-center pt-[3%] lg:col-span-8 lg:order-1">
                <h2 className="pb-[4%] text-[50px] text-white max-[768px]:text-center max-[768px]:text-[20px] max-[768px]:leading-8">Bharat Skill Tech program for <br />just <span className="text-[#F2006C]">Rs 10,000/- </span></h2>
                <div className="grid grid-cols-2">
                  <ul className="ml-5 list-disc text-[20px] text-white max-[768px]:text-[12px] max-[768px]:leading-[30px]">{["10 weeks", "Course certification", "Double sharing flats"].map((item) => <li key={item} className="mb-[15px] max-[768px]:mb-0">{item}</li>)}</ul>
                  <ul className="ml-5 list-disc text-[20px] text-white max-[768px]:text-[12px] max-[768px]:leading-[30px]">{["Secured gated community", "Breakfast & Dinner", "Shuttle service"].map((item) => <li key={item} className="mb-[15px] max-[768px]:mb-0">{item}</li>)}</ul>
                </div>
                <div className="my-[1%] mb-[5%] max-[768px]:my-5 max-[768px]:mb-[30px] max-[768px]:text-center">
                  <button type="button" onClick={openApply} className="rounded-[5px] bg-[#F2006C] px-[60px] py-[15px] text-[20px] font-normal leading-[26px] text-white max-[768px]:h-[50px] max-[768px]:w-[80%] max-[768px]:px-4 max-[768px]:text-[16px] max-[768px]:leading-5">Enquire Now</button>
                </div>
              </div>
              <div className="order-1 mt-[3%] text-center lg:col-span-4 lg:order-2"><img src={`${asset}BharatSkillTech.webp`} alt="Bharat Skill Tech" className="mx-auto mt-[5%] h-auto max-w-full max-[768px]:max-w-[160px]" /></div>
            </div>
          </div>
        </section>

        <section className="bg-[#F6F6F6] max-[768px]:px-0">
          <div className="mx-auto w-[calc(100%-100px)] py-[3%] max-[768px]:w-[calc(100%-32px)] max-[768px]:py-[5%]">
            <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
              <div className="order-1 flex flex-col justify-center lg:col-span-6">
                <h2 className="mb-0 pb-[1%] text-[30px] font-semibold leading-[60px] max-[768px]:text-center max-[768px]:leading-[50px]">Premium Lifestyle at EduCity</h2>
                <p className="mb-[10px] text-[18px] leading-8 max-[768px]:text-[14px] max-[768px]:leading-[22px]">Immerse yourself in a premium lifestyle at one of Bangalore's largest gated communities. Don't miss out on this chance to reshape your career Apply Now and be Job Ready!</p>
                <div className="mt-[4%] rounded-[20px] border border-[#F2006C] bg-[rgba(242,0,108,0.10)] px-[3%] pb-[1%] pt-[2%] max-[768px]:rounded-[5px] max-[768px]:px-5 max-[768px]:pb-[5px] max-[768px]:pt-[15px]">
                  <div className="grid grid-cols-2">
                    <ul className="pl-[6%]">
                      <li className="mb-3 flex items-center"><img src={`${asset}Properties.png`} alt="Properties" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-[20px] font-semibold max-[768px]:text-[12px]">150+ <span className="text-[15px] font-normal max-[768px]:text-[10px]">Properties</span></p></li>
                      <li className="mb-3 flex items-center"><img src={`${asset}Beds.png`} alt="Beds" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-[20px] font-semibold max-[768px]:text-[12px]">20,000+ <span className="text-[15px] font-normal max-[768px]:text-[10px]">Platinum Beds pipeline</span></p></li>
                    </ul>
                    <ul className="order-1 pl-[6%]">
                      <li className="mb-3 flex items-center"><img src={`${asset}Users.png`} alt="Users" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-[20px] font-semibold max-[768px]:text-[12px]">1 Mn+ <span className="text-[15px] font-normal max-[768px]:text-[10px]">Users</span></p></li>
                      <li className="mb-3 flex items-center"><img src={`${asset}Tenants.png`} alt="Beds" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-[20px] font-semibold max-[768px]:text-[12px]">18000+ <span className="text-[15px] font-normal max-[768px]:text-[10px]">Tenants</span></p></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hidden lg:col-span-1 lg:block" />
              <div className="order-2 lg:col-span-5"><EnquiryCard tracking={tracking} /></div>
            </div>
          </div>
        </section>
      </main>
      <div className="footer include" id="site-footer" data-include="commonfooter/footer" />
      <ApplyNowModal open={applyOpen} onClose={() => setApplyOpen(false)} tracking={tracking} />
      <ThankYouModal open={thankYouOpen} onClose={() => setThankYouOpen(false)} />
    </div>
  );
}

function Feature({ image, alt, title, text }: { image: string; alt: string; title: string; text: string }) {
  return (
    <div className="mb-[10%] grid grid-cols-1 items-start gap-3 lg:grid-cols-12">
      <div className="text-center lg:col-span-2"><img src={`${asset}${image}`} alt={alt} className="mx-auto h-auto max-w-full" /></div>
      <div className="lg:col-span-10">
        <h6 className="mb-[10px] mt-[10px] text-[20px] font-semibold max-[768px]:text-center max-[768px]:text-[16px]">{title}</h6>
        <p className="mx-auto text-base leading-[25px] max-[768px]:w-[90%] max-[768px]:text-center max-[768px]:text-[12px] max-[768px]:leading-5">{text}</p>
      </div>
    </div>
  );
}
