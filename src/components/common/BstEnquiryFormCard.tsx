"use client";

import { useEffect, useState } from "react";

export default function BstEnquiryFormCard() {
  const [tracking, setTracking] = useState({
    gclid: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    utm_keyword: "",
  });

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
  }, []);

  return (
    <div className="mt-[25px] rounded-[10px] border border-[#CCCCCC] bg-white">
      <form
        action="/api/Offers/LeadCapture"
        method="post"
        id="popupform"
        name="popupform"
        className="popupform1"
        noValidate
      >
        <div id="form-content" className="inputblock">
          {/* Form Title */}
          <div className="px-[4%] pt-[4%]">
            <h2 className="text-[23px] font-semibold text-black max-[768px]:text-[18px]">
              Enquire <span className="text-[#F2006C]">Now</span>
            </h2>
          </div>

          {/* Divider */}
          <hr className="my-2 h-[3px] border-0 bg-black max-[768px]:h-px" />

          {/* Name */}
          <div className="relative px-[4%]">
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Name*"
              className="mb-5 h-[45px] w-full rounded-[3px] border border-[#CCCCCC] bg-white px-3 text-sm outline-none focus:border-[#CCCCCC]"
            />
          </div>

          {/* Mobile Number */}
          <div className="relative px-[4%]">
            <div className="relative">
              <span className="absolute left-[10px] top-1/2 z-10 -translate-y-1/2 text-sm text-black">
                +91 |
              </span>

              <input
                type="tel"
                name="customer_mobile"
                id="customer_mobile"
                pattern="[6789][0-9]{10}"
                placeholder="Mobile Number*"
                className="mb-5 h-[45px] w-full rounded-[3px] border border-[#CCCCCC] bg-white pl-[11%] pr-3 text-sm outline-none focus:border-[#CCCCCC] max-[768px]:pl-[13%]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative px-[4%]">
            <input
              type="email"
              name="customer_email"
              id="customer_email"
              pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
              placeholder="Email"
              className="mb-5 h-[45px] w-full rounded-[3px] border border-[#CCCCCC] bg-white px-3 text-sm outline-none focus:border-[#CCCCCC]"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 px-[4%] text-center">
            <input
              type="submit"
              value="Submit"
              name="submit"
              data-toggle="modal"
              className="h-[50px] w-full cursor-pointer rounded-[5px] border-0 bg-[#F2006C] px-0 py-[10px] text-center text-[18px] font-medium text-white"
            />

            {/* Tracking Fields */}
            {Object.entries(tracking).map(([name, value]) => (
              <input
                key={name}
                type="hidden"
                name={name}
                value={value}
                readOnly
              />
            ))}

            <input
              type="hidden"
              name="leadSource"
              id="leadSource"
              value="Colive BST"
              readOnly
            />

            <input
              type="hidden"
              name="LandingPageId"
              id="LandingPageId"
              value="64"
              readOnly
            />

            <input
              type="hidden"
              name="Mobile_Number_Validated"
              id="Mobile_Number_Validated"
              value="false"
              readOnly
            />

            <input
              type="hidden"
              name="redirectURL"
              id="redirectURL"
              value="/bst/?act=thankyou"
              readOnly
            />
          </div>
        </div>

        {/* Assistance */}
        <p className="my-5 text-center text-[16px] font-semibold max-[768px]:text-[12px] max-[768px]:leading-[10px]">
          Need Assistance? Call at{" "}
          <a
            href="tel:7676000500"
            className="font-semibold text-[#F2006C]"
          >
            7676 000 500
          </a>
        </p>
      </form>
    </div>
  );
}