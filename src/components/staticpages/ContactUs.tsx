"use client";

import Image from "next/image";
import React, { useState } from "react";
import ThankYouModal from "@/components/common/ThankYouModal";
import { submitContactForm } from "@/lib/formApi";
import Contact, { type ContactFormData } from "../forms/Contact";

const ContactUs = () => {
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (values: ContactFormData) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitContactForm(values);

      setFormKey((current) => current + 1);
      setIsThankYouModalOpen(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-[4%] box-border block h-auto min-h-0 w-full overflow-visible bg-[#F6F6F6] px-[18px] py-[5px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="order-2 md:order-1">
            <div className="mx-auto w-full max-w-[560px] rounded-md bg-color-background p-5 sm:p-8">
              <Contact
                key={formKey}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
              {submitError ? (
                <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </p>
              ) : null}
            </div>
          </div>

          <div className="order-1 min-w-0 md:order-2">
            <div className="px-2 pt-2 md:px-0">
              <h1 className="mb-3 text-[30px] font-semibold leading-tight text-gray-900 sm:text-[36px] lg:text-[40px]">
                Get in touch
              </h1>

              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Colife Advisory Private Limited
              </h2>

              <p className="mb-4 text-sm leading-7 text-gray-700 sm:text-base">
                No.755/95, BBMP Katha, Kote MR Plaza, First Floor,
                Marathahalli Outer Ring Rd, Doddanekundi, Bengaluru,
                Karnataka 560037.
              </p>

              <p className="mb-4 text-sm text-gray-700 sm:text-base">
                <span className="font-medium">Branches:</span>{" "}
                Hyderabad, Chennai, Pune
              </p>

              <a
                href="tel:+917676000500"
                className="inline-flex items-center gap-2 text-base font-medium text-[#2B001F] transition hover:text-[#F2006C] sm:text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.58 2.79.7a2 2 0 0 1 1.74 2.03z" />
                </svg>
                7676 000 500
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 divide-x divide-gray-400 py-5 sm:mt-10 sm:grid-cols-4">
              <div className="min-w-0 px-2 sm:px-4">
                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  120+
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                  Properties
                </p>
              </div>

              <div className="min-w-0 px-2 sm:px-4">
                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  15,000+
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                  Tenants
                </p>
              </div>

              <div className="min-w-0 px-2 sm:px-4">
                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  20,000+
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                  Platinum Beds pipeline
                </p>
              </div>

              <div className="hidden min-w-0 px-2 sm:block sm:px-4">
                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  1 Mn+
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                  Users
                </p>
              </div>
            </div>

            <div className="mt-4 hidden md:block">
              <Image
                src="/images/contact/image.png"
                alt="Couple"
                width={1200}
                height={800}
                className="h-auto max-h-[360px] w-full rounded object-contain object-left"
              />
            </div>
          </div>
        </div>
      </div>
      <ThankYouModal
        isOpen={isThankYouModalOpen}
        onClose={() => {
          setIsThankYouModalOpen(false);
          setSubmitError("");
        }}
      />
    </section>
  );
};

export default ContactUs;
