"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FaArrowRight } from "react-icons/fa";

import { LEAD_PHONE_PATTERN, LEAD_TRACKING_KEYS } from "@/lib/leadCapture";

type Errors = Partial<Record<"name" | "phone", string>>;

const inputClass =
  "w-full bg-white px-6 py-5 text-lg text-[#111] outline-none placeholder:text-gray-400 focus:outline-2 focus:outline-[#111] aria-invalid:outline-2 aria-invalid:outline-[#7a1310]";
const errorClass = "mt-2 text-left text-sm font-medium text-[#5c0e0b]";

// Validates in the browser, then lets the native POST go through; the route redirects back with ?act=thankyou?dt=...
export function WalkthroughForm({ failed = false }: { failed?: boolean }) {
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const name = (form.elements.namedItem("first_name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("customer_mobile") as HTMLInputElement).value.trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name";
    if (!phone) nextErrors.phone = "Please enter your WhatsApp number";
    else if (!LEAD_PHONE_PATTERN.test(phone)) nextErrors.phone = "Enter a valid WhatsApp number";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      return;
    }

    const query = new URLSearchParams(window.location.search);
    LEAD_TRACKING_KEYS.forEach((key) => {
      (form.elements.namedItem(key) as HTMLInputElement).value = query.get(key) ?? "";
    });
  };

  // Clear each field's error as soon as it becomes valid
  const clearIfValid = (field: keyof Errors, valid: boolean) => {
    if (valid && errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <>
      {failed && (
        <p role="alert" className="mx-auto mb-5 max-w-240 font-medium text-[#5c0e0b]">
          Something went wrong. Please try again.
        </p>
      )}
      <form
        action="/api/Offers/LeadCapture"
        method="post"
        noValidate
        onSubmit={onSubmit}
        className="mx-auto flex max-w-240 flex-col gap-4 md:flex-row md:items-start md:gap-5"
      >
        <div className="flex-1">
          <input
            type="text"
            name="first_name"
            autoComplete="name"
            placeholder="Full name"
            aria-label="Full name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "wt-name-error" : undefined}
            onChange={(event) => clearIfValid("name", Boolean(event.target.value.trim()))}
            className={inputClass}
          />
          {errors.name && (
            <p id="wt-name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex-1">
          <input
            type="tel"
            name="customer_mobile"
            inputMode="tel"
            autoComplete="tel"
            placeholder="WhatsApp number"
            aria-label="WhatsApp number"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "wt-phone-error" : undefined}
            onChange={(event) => clearIfValid("phone", LEAD_PHONE_PATTERN.test(event.target.value.trim()))}
            className={inputClass}
          />
          {errors.phone && (
            <p id="wt-phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex cursor-pointer items-center justify-center gap-3 bg-[#111] px-9 py-5 text-lg font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-black"
        >
          Submit <FaArrowRight aria-hidden="true" />
        </button>

        {LEAD_TRACKING_KEYS.map((key) => (
          <input key={key} type="hidden" name={key} defaultValue="" />
        ))}
        <input type="hidden" name="leadSource" value="Colive Home Page" />
        <input type="hidden" name="LandingPageId" value="1" />
        <input type="hidden" name="Mobile_Number_Validated" value="false" />
        <input type="hidden" name="redirectURL" value="/?act=thankyou" />
      </form>
    </>
  );
}

// After the redirect back: ?act=thankyou?dt=20261106114931&name=Hari (the second "?" is the API's, so act starts with "thankyou")
export function WalkthroughResult() {
  const params = useSearchParams();
  const act = params.get("act") ?? "";
  const thanked = act.startsWith("thankyou");
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (thanked) messageRef.current?.scrollIntoView({ block: "center" });
  }, [thanked]);

  if (!thanked) return <WalkthroughForm failed={act === "leaderror"} />;

  return (
    <p
      ref={messageRef}
      role="status"
      className="font-head text-3xl leading-tight tracking-[-0.02em] text-[#111] md:text-[44px]"
    >
      Thanks {params.get("name") ?? ""} — we&apos;ll WhatsApp you soon.
    </p>
  );
}
