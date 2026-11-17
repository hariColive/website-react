"use client";

import React, { useEffect, useState } from "react";

const BSTPage = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsThankYouModalOpen(params.get("act") === "thankyou");
  }, []);

  return (
    <main className="overflow-x-hidden font-['Inter-Regular',sans-serif] text-[#212529]">
      {/* Hero */}
      <section className="mt-[10%] bg-[url('/images/bst/Hero.webp')] bg-[length:100%_100%] bg-no-repeat max-[768px]:mt-[50px] max-[768px]:bg-[url('/images/bst/Hero-mobile.webp')]">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="pt-[10%] text-[40px] font-bold leading-[63px] text-white max-[768px]:px-[1%] max-[768px]:pt-[60%] max-[768px]:text-center max-[768px]:text-xl max-[768px]:leading-[25px]">
                Empower Your Career Today with <br />Bharat Skill Tech at EduCity!
              </h1>
              <p className="py-[0.5%] text-xl font-medium leading-[35px] text-white max-[768px]:py-[10px] max-[768px]:pb-[15px] max-[768px]:text-center max-[768px]:text-xs max-[768px]:leading-[18px]">
                Experience a transformative 10-week journey with Bharat Skill Tech program, where learning meets comfort
              </p>
              <div className="flex gap-5 pb-[12%] pt-[2%] max-[768px]:flex-col max-[768px]:gap-[15px]">
                <button type="button" onClick={() => setIsApplyModalOpen(true)} className="rounded-[5px] bg-[#F2006C] px-[45px] py-[15px] text-xl leading-[26px] text-white max-[768px]:mx-auto max-[768px]:w-4/5 max-[768px]:px-10 max-[768px]:py-3 max-[768px]:text-base">Apply Now</button>
                <a href="tel:7676000500" className="max-[768px]:mx-auto max-[768px]:w-4/5"><button type="button" className="w-full rounded-[5px] border-2 border-[#F2006C] bg-transparent px-[45px] py-[15px] text-xl leading-[26px] text-[#F2006C] max-[768px]:px-4 max-[768px]:py-[10px] max-[768px]:text-base">Call us <span className="font-semibold">7676 000 500</span></button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Bharat Skill Tech */}
      <section className="py-[3%]">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <picture><source srcSet="/images/bst/BharatSkillTec.webp" type="image/webp" /><source srcSet="/images/bst/BharatSkillTec.png" type="image/png" /><img src="/images/bst/BharatSkillTec.png" alt="LPG" className="h-auto max-w-full" /></picture>
            </div>
            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="pl-[4%] max-[768px]:pl-0">
                <h2 className="pb-[2%] text-[35px] font-semibold max-[768px]:pt-4 max-[768px]:text-center max-[768px]:text-xl">What is Bharat Skill Tech</h2>
                <p className="text-lg leading-7 text-justify max-[768px]:text-xs max-[768px]:leading-[21px]">Bharat Skill Tech, an esteemed organization is dedicated to enhancing career opportunities through skill-based programs for India’s youth. Our mission is to equip individuals with the necessary expertise to thrive in today's dynamic job market.<br /><br />Elevate your career prospects with our comprehensive skill-based short-term courses designed to equip you for success. Priced affordably at Rs 10,000, this program offers a gateway to a fulfilling career in the dynamic job market.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BST Benefits */}
      <section className="bg-[#F7F7F7] pb-[3%]">
        <div className="mx-auto w-[calc(100%-100px)] pt-[3%] max-[768px]:w-[calc(100%-32px)] max-[768px]:pb-[5%]">
          <h2 className="pb-[4%] text-center text-[40px] font-semibold max-[768px]:py-[5%] max-[768px]:text-xl">What will you get in BST</h2>
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
            {[
              ["Educampus.png","Educampus","Skill-Based Courses","Dive into specialized courses meticulously crafted to meet industry demands. Acquire practical skills that resonate with market needs, ensuring your readiness for the professional world."],
              ["shuttle.png","shuttle","Shuttle Service","Seamlessly travel with our shuttle service, ensuring you reach your learning destination hassle-free."],
              ["double-bed.png","double-bed","EduLive Campus Stay","Enjoy the luxury of free accommodation at the prestigious EduLive Campus, offering a comfortable and conducive learning environment."],
              ["certificate.png","certificate","GRE (Guest relationship executive) Certification","Receive a recognized certification upon successful course completion, validating your expertise and enhancing your employability."],
              ["meals.png","meals","Complimentary Meals","Delight in the convenience of free, delicious meals, taking care of your dietary needs during the program duration."],
              ["placement.png","placement","Placement Assistance","Benefit from our dedicated support in securing placements, guiding you toward lucrative career opportunities."]
            ].map(([image,alt,title,description]) => (
              <div key={title} className="mb-[5%] grid grid-cols-1 items-start gap-4 md:grid-cols-[16.6667%_1fr]">
                <div className="text-center"><img src={`/images/bst/${image}`} alt={alt} className="inline-block h-auto max-w-full" /></div>
                <div><h3 className="mb-[10px] text-xl font-semibold max-[768px]:mt-[10px] max-[768px]:text-center max-[768px]:text-base">{title}</h3><p className="m-0 text-base leading-[25px] max-[768px]:mx-auto max-[768px]:w-[90%] max-[768px]:text-center max-[768px]:text-xs max-[768px]:leading-5">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="bg-[#F2006C]">
        <div className="mx-auto w-[calc(100%-100px)] py-[3%] max-[768px]:w-[calc(100%-32px)] max-[768px]:pb-0">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-8">
              <h2 className="mt-[2%] text-[40px] font-semibold leading-[55px] text-white max-[768px]:text-center max-[768px]:text-xl max-[768px]:leading-8">Become a certified Guest Relationship Executive and <span className="text-black">take charge of your <br className="max-[768px]:hidden" />career today!</span></h2>
              <p className="relative mt-[2%] inline-block rounded-[10px] border border-white p-[10px] text-white max-[768px]:mb-[8%] max-[768px]:w-full max-[768px]:p-[15px] max-[768px]:text-center">Eligibility: 10+, 12+ graduates, Minimum age to be 18+</p>
            </div>
            <div className="order-1 text-center lg:order-2 lg:col-span-4"><img src="/images/bst/certificate2.png" alt="certificate" className="inline-block max-w-full max-[768px]:max-w-[100px]" /></div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="my-[3%] max-[768px]:mt-0 max-[768px]:bg-[url('/images/bst/Curriculum.webp')] max-[768px]:bg-[length:100%_auto] max-[768px]:bg-no-repeat max-[768px]:px-[2%] max-[768px]:py-[4%]">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-full">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="py-[3%] text-[40px] font-semibold max-[768px]:text-xl">Curriculum Structure</h2>
              <div className="grid grid-cols-2 gap-4">
                <ul className="list-disc pl-5">{["Effective Presentation Skills","Developing Interpersonal Skills","Creative and Critical Thinking","People and Soft Skills","Basic Reasoning and Aptitude"].map(x=><li key={x} className="mb-[25px] text-lg leading-[30px] max-[768px]:mb-0 max-[768px]:text-sm max-[768px]:leading-9">{x}</li>)}</ul>
                <ul className="list-disc pl-5">{["Behavioral Skills","Time Management","Interview Skills","Job Placement Assistance"].map(x=><li key={x} className="mb-[25px] text-lg leading-[30px] max-[768px]:mb-0 max-[768px]:text-sm max-[768px]:leading-9">{x}</li>)}</ul>
              </div>
            </div>
            <div className="hidden lg:col-span-5 lg:block"><picture><source srcSet="/images/bst/CurriculumStructure.webp" type="image/webp" /><source srcSet="/images/bst/CurriculumStructure.png" type="image/png" /><img src="/images/bst/CurriculumStructure.png" alt="CurriculumStructure" className="h-auto max-w-full" /></picture></div>
          </div>
        </div>
      </section>

      {/* Campus */}
      <section className="mb-[4%]">
        <div className="mx-auto grid w-[calc(100%-100px)] grid-cols-1 items-center bg-[url('/images/bst/Campus.webp')] bg-[length:100%_100%] bg-no-repeat px-[5%] py-[3%] lg:grid-cols-12 max-[768px]:w-full max-[768px]:bg-[url('/images/bst/Campusmobileview.webp')] max-[768px]:pb-[45%]">
          <div className="lg:col-span-7" />
          <div className="flex flex-col justify-center lg:col-span-5"><h3 className="py-[3%] text-[40px] font-semibold text-white max-[768px]:text-xl">Campus Overview</h3><ul className="list-disc pl-[5%] text-white"><li className="mb-[15px] text-[22px] max-[768px]:mb-[5px] max-[768px]:text-xs max-[768px]:leading-[22px]">Located in New whitefield</li><li className="mb-[15px] text-[22px] max-[768px]:mb-[5px] max-[768px]:text-xs max-[768px]:leading-[22px]">Located in a 45 acres integrated township</li></ul></div>
        </div>
      </section>

      {/* Program details */}
      <section className="mb-[4%] bg-[#1B1B1B]">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="order-2 relative pt-[3%] lg:col-span-8 lg:order-1">
              <h2 className="text-[50px] text-white max-[768px]:text-center max-[768px]:text-xl max-[768px]:leading-8">Bharat Skill Tech program for <br />just <span className="text-[#F2006C]">Rs 10,000/- </span></h2>
              <div className="grid grid-cols-2"><ul className="ml-5 list-disc text-xl text-white max-[768px]:text-xs max-[768px]:leading-[30px]"><li className="mb-[15px]">10 weeks</li><li className="mb-[15px]">Course certification</li><li className="mb-[15px]">Double sharing flats</li></ul><ul className="ml-5 list-disc text-xl text-white max-[768px]:text-xs max-[768px]:leading-[30px]"><li className="mb-[15px]">Secured gated community</li><li className="mb-[15px]">Breakfast &amp; Dinner</li><li className="mb-[15px]">Shuttle service</li></ul></div>
              <div className="my-5 mb-[30px] text-center lg:text-left"><button type="button" onClick={() => setIsApplyModalOpen(true)} className="rounded-[5px] bg-[#F2006C] px-[60px] py-[15px] text-xl leading-[26px] text-white max-[768px]:h-[50px] max-[768px]:w-4/5 max-[768px]:px-4 max-[768px]:text-base">Enquire Now</button></div>
            </div>
            <div className="order-1 mt-[3%] text-center lg:col-span-4 lg:order-2"><picture><source srcSet="/images/bst/BharatSkillTech.webp" type="image/webp" /><source srcSet="/images/bst/BharatSkillTech.png" type="image/png" /><img src="/images/bst/BharatSkillTech.png" alt="BharatSkillTech" className="inline-block h-auto max-w-full max-[768px]:mt-[5%] max-[768px]:max-w-[160px]" /></picture></div>
          </div>
        </div>
      </section>

      {/* Premium Lifestyle and enquiry form */}
      <section className="bg-[#F6F6F6] py-[3%] max-[768px]:p-0">
        <div className="mx-auto w-[calc(100%-100px)] max-[768px]:w-[calc(100%-32px)]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-6">
              <h2 className="mb-0 pb-[1%] text-[30px] leading-[60px] max-[768px]:py-0 max-[768px]:text-center max-[768px]:leading-[50px]">Premium Lifestyle at EduCity</h2>
              <p className="text-lg leading-8 max-[768px]:mb-[10px] max-[768px]:text-sm max-[768px]:leading-[22px]">Immerse yourself in a premium lifestyle at one of Bangalore's largest gated communities. Don't miss out on this chance to reshape your career Apply Now and be Job Ready!</p>
              <div className="mt-[4%] rounded-[20px] border border-[#F2006C] bg-[rgba(242,0,108,0.10)] px-[3%] pb-[1%] pt-[2%] max-[768px]:rounded-[5px] max-[768px]:px-5 max-[768px]:pb-[5px] max-[768px]:pt-[15px]">
                <div className="grid grid-cols-2">
                  <ul>
                    <li className="mb-3 flex items-center"><img src="/images/bst/Properties.png" alt="Properties" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-xl font-semibold max-[768px]:text-xs">150+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Properties</span></p></li>
                    <li className="mb-3 flex items-center"><img src="/images/bst/Beds.png" alt="Beds" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-xl font-semibold max-[768px]:text-xs">20,000+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Platinum Beds pipeline</span></p></li>
                  </ul>
                  <ul>
                    <li className="mb-3 flex items-center"><img src="/images/bst/users.png" alt="users" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-xl font-semibold max-[768px]:text-xs">1 Mn+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Users</span></p></li>
                    <li className="mb-3 flex items-center"><img src="/images/bst/Tenants.png" alt="Beds" className="h-[23px] w-[23px]" /><p className="mb-0 pl-2 text-xl font-semibold max-[768px]:text-xs">18000+ <span className="block text-[15px] font-normal max-[768px]:text-[10px]">Tenants</span></p></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1" />
            <div className="lg:col-span-5">
              <div className="rounded-[10px] border border-[#ccc] bg-white">
                <div className="px-[4%]">
                  <h2 className="px-[2%] pt-[4%] text-[23px] font-semibold">Enquire <span className="text-[#F2006C]">Now</span></h2>
                  <hr className="my-4 h-[3px] border-0 bg-black" />
                  <form action="/api/Colive/SaveLeadDetails" method="post">
                    <input className="mb-4 h-[45px] w-full border border-[#ccc] bg-white px-3" type="text" name="first_name" id="first_name" placeholder="Name*" />
                    <div className="relative mb-4"><span className="absolute left-[25px] top-1/4">+91 |</span><input className="h-[45px] w-full border border-[#ccc] bg-white pl-[13%] pr-3" type="tel" name="customer_mobile" id="customer_mobile" pattern="[6789][0-9]{10}" placeholder="Mobile Number*" /></div>
                    <input className="mb-4 h-[45px] w-full border border-[#ccc] bg-white px-3" type="email" name="customer_email" id="customer_email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}" placeholder="Email" />
                    <div className="mb-4 mt-4 text-center"><input className="w-full cursor-pointer rounded-[5px] bg-[#F2006C] py-[10px] text-white" type="submit" value="Submit" name="submit" />
                      <input type="hidden" name="gclid" id="gclid" /><input type="hidden" name="utm_source" id="utm_source" /><input type="hidden" name="utm_medium" id="utm_medium" /><input type="hidden" name="utm_campaign" id="utm_campaign" /><input type="hidden" name="utm_content" id="utm_content" /><input type="hidden" name="utm_term" id="utm_term" /><input type="hidden" name="utm_keyword" id="utm_keyword" /><input type="hidden" name="leadSource" id="leadSource" value="Colive BST" /><input type="hidden" name="LandingPageId" id="LandingPageId" value="64" /><input type="hidden" name="Mobile_Number_Validated" id="Mobile_Number_Validated" value="false" /><input type="hidden" name="redirectURL" id="redirectURL" value="/bst/?act=thankyou" />
                    </div>
                    <p className="my-5 text-center text-base font-semibold max-[768px]:text-xs max-[768px]:leading-[10px]">Need Assistance? Call at <a href="tel:7676000500" className="font-semibold text-[#F2006C]">7676 000 500</a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry modal */}
      <div id="bst-apply-modal" className={`fixed inset-0 z-[1000] overflow-y-auto bg-black/50 px-4 py-10 ${isApplyModalOpen ? "block" : "hidden"}`}>
        <div className="mx-auto mt-[5vh] w-full max-w-[500px] rounded-[10px] bg-white shadow-xl">
          <div className="flex items-center justify-between border-b-2 border-[#555] px-6 py-4">
            <h2 className="text-[23px] font-semibold">Enquire <span className="text-[#F2006C]">Now</span></h2>
            <button type="button" aria-label="Close" onClick={() => setIsApplyModalOpen(false)} className="text-3xl leading-none">×</button>
          </div>
          <div className="p-6">
            <form action="/api/Offers/LeadCapture" method="post" id="popupform" name="popupform">
              <div className="mb-4"><label htmlFor="bst_first_name" className="mb-2 block">Name<sup className="text-red-600">*</sup></label><input className="mb-5 w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 py-3" type="text" name="first_name" id="bst_first_name" /></div>
              <div className="relative mb-4"><label htmlFor="bst_customer_mobile" className="mb-2 block">Mobile Number<sup className="text-red-600">*</sup></label><span className="absolute left-[10px] top-[58%]">+91 |</span><input className="mb-5 w-full rounded-[3px] border-0 bg-[#F4F4F4] py-3 pl-[13%] pr-3" type="tel" name="customer_mobile" id="bst_customer_mobile" pattern="[6789][0-9]{10}" /></div>
              <div className="mb-4"><label htmlFor="bst_customer_email" className="mb-2 block">E-mail</label><input className="mb-5 w-full rounded-[3px] border-0 bg-[#F4F4F4] px-3 py-3" type="email" name="customer_email" id="bst_customer_email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}" /></div>
              <div className="mb-4 mt-4 text-center"><input className="h-[50px] w-full cursor-pointer rounded-[3px] bg-[#F2006C] text-lg font-medium text-white" type="submit" value="Submit" name="submit" />
                <input type="hidden" name="gclid" id="bst_gclid" /><input type="hidden" name="utm_source" id="bst_utm_source" /><input type="hidden" name="utm_medium" id="bst_utm_medium" /><input type="hidden" name="utm_campaign" id="bst_utm_campaign" /><input type="hidden" name="utm_content" id="bst_utm_content" /><input type="hidden" name="utm_term" id="bst_utm_term" /><input type="hidden" name="utm_keyword" id="bst_utm_keyword" /><input type="hidden" name="leadSource" id="bst_leadSource" value="Colive BST" /><input type="hidden" name="LandingPageId" id="bst_LandingPageId" value="64" /><input type="hidden" name="Mobile_Number_Validated" id="bst_Mobile_Number_Validated" value="false" /><input type="hidden" name="redirectURL" id="bst_redirectURL" value="/bst/?act=thankyou" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Thank-you modal - display when URL contains ?act=thankyou */}
      <div id="bst-thankyou-modal" className={`fixed inset-0 z-[1001] overflow-y-auto bg-black/50 px-4 py-10 ${isThankYouModalOpen ? "block" : "hidden"}`}>
        <div className="mx-auto mt-[10vh] max-w-[500px] rounded-[5px] border-t-[5px] border-[#F2006C] bg-white">
          <div className="flex justify-end p-3"><button type="button" aria-label="Close" onClick={() => setIsThankYouModalOpen(false)} className="text-2xl">×</button></div>
          <div className="px-6 pb-8 text-center">
            <img src="/images/modal/img2.png" alt="success" width="100" className="mx-auto h-auto" />
            <h2 className="text-[60px] font-semibold leading-[90px] max-[768px]:text-4xl">Thank You!</h2>
            <h6 className="mb-[22px] text-base font-medium leading-[1.5] tracking-[1px] text-[#212529]">Our team will reach out to you soon with matching properties...</h6>
            <p className="font-semibold">Reach out to <span className="text-[#F2006C]">7676 000 500</span> to speak to our agent live</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BSTPage;
