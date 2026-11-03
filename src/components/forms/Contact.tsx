
"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    select: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const labelStyle =
    "mb-[3px] block text-[14px] leading-[20px] font-normal text-[#172536]";

  const inputStyle =
    "block h-[38px] w-full rounded-[3px] border border-[#DADADA] bg-white px-[12px] py-0 text-[14px] font-normal leading-normal text-[#172536] shadow-none outline-none focus:border-[#2B001F]";

  return (
    <section className="box-border block h-auto min-h-0 w-full overflow-visible bg-color-background px-[18px] py-[5px]">
      <form
        onSubmit={handleSubmit}
        className="m-0 block h-auto w-full overflow-visible"
      >
        <fieldset className="m-0 block min-w-0 border-0 p-0">
          {/* Name */}
          <div className="relative mb-[20px]">
            <label htmlFor="name" className={labelStyle}>
              Name
              <sup className="ml-[2px] text-[11px] font-normal text-red-600">
                *
              </sup>
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="relative mb-[20px]">
            <label htmlFor="mobile" className={labelStyle}>
              Mobile Number
              <sup className="ml-[2px] text-[11px] font-normal text-red-600">
                *
              </sup>
            </label>

            <div className="relative flex h-[38px] w-full items-center rounded-[3px] border border-[#DADADA] bg-white px-[7px] focus-within:border-[#2B001F]">
              <span className="shrink-0 text-[14px] font-normal text-[#172536]">
                +91
              </span>

              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                autoComplete="tel-national"
                className="block h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-0 pl-[5px] text-[14px] font-normal leading-normal text-[#172536] shadow-none outline-none"
                required
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="relative mb-[20px]">
            <label htmlFor="email" className={labelStyle}>
              E-mail
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Select */}
          <div className="relative mb-[20px]">
            <label htmlFor="select" className={labelStyle}>
              Select
              <sup className="ml-[2px] text-[11px] font-normal text-red-600">
                *
              </sup>
            </label>

            <select
              id="select"
              name="select"
              value={formData.select}
              onChange={handleChange}
              className={`${inputStyle} cursor-pointer appearance-none pr-[35px]`}
              required
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="I am a customer">I am a customer</option>
              <option value="I want to be the partner of Colive">
                I want to be the partner of Colive
              </option>
              <option value="I am an owner">I am an owner</option>
            </select>

            <svg
              className="pointer-events-none absolute right-[12px] top-[34px] h-[12px] w-[12px]"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 4L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Write a Message */}
          <div className="relative mb-[16px]">
            <label htmlFor="message" className={labelStyle}>
              Write a Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="box-border block h-[110px] w-full resize-y rounded-[3px] border border-[#DADADA] bg-white px-[12px] py-[9px] text-[14px] font-normal leading-normal text-[#172536] shadow-none outline-none placeholder:text-[#737373] focus:border-[#2B001F]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="m-0 mb-0 block h-[42px] w-full cursor-pointer rounded-[3px] border-2 border-[#2B001F] bg-[#2B001F] p-[5px] text-center text-[14px] font-normal leading-normal text-white shadow-none hover:bg-[#2B001F] focus:outline-none"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default Contact;