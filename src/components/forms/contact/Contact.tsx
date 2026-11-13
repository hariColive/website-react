
"use client";

import React, { useRef, useState } from "react";
import { submitContactForm } from "@/lib/forms/formApi";
import { validateContactForm } from "@/lib/forms/formValidations";
import type { ContactFormValues } from "@/lib/forms/formTypes";

type ContactProps = {
  onSuccess?: () => void;
};

export type ContactFormData = ContactFormValues;

const INITIAL_FORM_DATA: ContactFormValues = {
  name: "",
  mobile: "",
  email: "",
  select: "",
  message: "",
};

const Contact = ({ onSuccess }: ContactProps) => {
  const [formData, setFormData] = useState<ContactFormValues>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const submissionInProgress = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const nextValue = e.target.value;
    setFormData((current) => ({
      ...current,
      [e.target.name]: nextValue,
    }));

    const nextErrors = { ...fieldErrors };
    delete nextErrors[e.target.name];
    setFieldErrors(nextErrors);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionInProgress.current) return;

    const validationErrors = validateContactForm(formData);
    const nextErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([, value]) => Boolean(value)),
    );
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setErrorMessage("Please fix the highlighted fields and try again.");
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await submitContactForm(formData);
      if (response.Status !== "success") {
        setErrorMessage(
          response.Message?.trim() || "We couldn't submit your message. Please try again.",
        );
        return;
      }

      setFormData(INITIAL_FORM_DATA);
      setFieldErrors({});
      onSuccess?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't submit your message. Please try again.",
      );
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
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
        <fieldset className="m-0 block min-w-0 border-0 p-0" disabled={isSubmitting}>
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
              className={`${inputStyle} ${fieldErrors.name ? "border-red-500" : ""}`}
              aria-invalid={Boolean(fieldErrors.name)}
              required
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          <div className="relative mb-[20px]">
            <label htmlFor="mobile" className={labelStyle}>
              Mobile Number
              <sup className="ml-[2px] text-[11px] font-normal text-red-600">
                *
              </sup>
            </label>

            <div className={`relative flex h-[38px] w-full items-center rounded-[3px] border bg-white px-[7px] focus-within:border-[#2B001F] ${fieldErrors.mobile ? "border-red-500" : "border-[#DADADA]"}`}>
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
                className={`block h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-0 pl-[5px] text-[14px] font-normal leading-normal text-[#172536] shadow-none outline-none ${fieldErrors.mobile ? "text-red-600" : ""}`}
                aria-invalid={Boolean(fieldErrors.mobile)}
                required
              />
            </div>
            {fieldErrors.mobile && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.mobile}</p>
            )}
          </div>

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
              className={`${inputStyle} ${fieldErrors.email ? "border-red-500" : ""}`}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

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
              className={`${inputStyle} ${fieldErrors.select ? "border-red-500" : ""} cursor-pointer appearance-none pr-[35px]`}
              aria-invalid={Boolean(fieldErrors.select)}
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
            {fieldErrors.select && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.select}</p>
            )}
          </div>

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
              className={`box-border block h-[110px] w-full resize-y rounded-[3px] border bg-white px-[12px] py-[9px] text-[14px] font-normal leading-normal text-[#172536] shadow-none outline-none placeholder:text-[#737373] focus:border-[#2B001F] ${fieldErrors.message ? "border-red-500" : "border-[#DADADA]"}`}
              aria-invalid={Boolean(fieldErrors.message)}
            />
            {fieldErrors.message && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
            )}
          </div>

          {errorMessage && (
            <p role="alert" className="mb-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="m-0 mb-0 block h-[42px] w-full cursor-pointer rounded-[3px] border-2 border-[#2B001F] bg-[#2B001F] p-[5px] text-center text-[14px] font-normal leading-normal text-white shadow-none hover:bg-[#2B001F] focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default Contact;