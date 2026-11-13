"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FaArrowRight } from "react-icons/fa";

import { LEAD_PHONE_PATTERN, LEAD_TRACKING_KEYS } from "@/lib/leadCapture";
import { submitWalkthroughLead } from "@/lib/forms/formApi";
import type { WalkthroughLeadRequest } from "@/lib/forms/formTypes";

type Errors = Partial<Record<"name" | "phone", string>>;

const inputClass =
  "w-full bg-white px-6 py-5 text-lg text-[#111] outline-none placeholder:text-gray-400 focus:outline-2 focus:outline-[#111] aria-invalid:outline-2 aria-invalid:outline-[#7a1310]";

const errorClass = "mt-2 text-left text-sm font-medium text-[#5c0e0b]";

export function WalkthroughForm({ failed = false }: { failed?: boolean }) {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = (
      form.elements.namedItem("first_name") as HTMLInputElement
    ).value.trim();

    const phone = (
      form.elements.namedItem("customer_mobile") as HTMLInputElement
    ).value.trim();

    const nextErrors: Errors = {};

    if (!name) {
      nextErrors.name = "Please enter your name";
    }

    if (!phone) {
      nextErrors.phone = "Please enter your WhatsApp number";
    } else if (!LEAD_PHONE_PATTERN.test(phone)) {
      nextErrors.phone = "Enter a valid WhatsApp number";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      const query = new URLSearchParams(window.location.search);

      const payload: WalkthroughLeadRequest = {
        first_name: name,
        customer_mobile: phone,

        ...Object.fromEntries(
          LEAD_TRACKING_KEYS.map((key) => [
            key,
            query.get(key) ?? "",
          ])
        ),

        leadSource: "Colive Home Page",
        LandingPageId: "1",
        Mobile_Number_Validated: "false",
        redirectURL: "/?act=thankyou",
      };

      const response = await submitWalkthroughLead(payload);

      if (response?.success) {
        setSuccess(true);
        form.reset();
      } else {
        setApiError(response?.message || "Submission failed. Please try again.");
      }
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearIfValid = (field: keyof Errors, valid: boolean) => {
    if (valid && errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  if (success) {
    return (
      <p role="status" className="font-head text-3xl text-[#111] md:text-[44px]">
        Thanks {""} — we&apos;ll WhatsApp you soon.
      </p>
    );
  }

  return (
    <>
      {(failed || apiError) && (
        <p role="alert" className="mx-auto mb-5 max-w-240 font-medium text-[#5c0e0b]">
          {apiError || "Something went wrong. Please try again."}
        </p>
      )}

      <form
        onSubmit={onSubmit}
        noValidate
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
            onChange={(event) =>
              clearIfValid("name", Boolean(event.target.value.trim()))
            }
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
            onChange={(event) =>
              clearIfValid(
                "phone",
                LEAD_PHONE_PATTERN.test(event.target.value.trim())
              )
            }
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
          disabled={loading}
          className="inline-flex cursor-pointer items-center justify-center gap-3 bg-[#111] px-9 py-5 text-lg font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
          {!loading && <FaArrowRight aria-hidden="true" />}
        </button>
      </form>
    </>
  );
}

export function WalkthroughResult() {
  const params = useSearchParams();
  const act = params.get("act") ?? "";
  const thanked = act.startsWith("thankyou");

  if (!thanked) {
    return <WalkthroughForm failed={act === "leaderror"} />;
  }

  return (
    <p role="status" className="font-head text-3xl leading-tight tracking-[-0.02em] text-[#111] md:text-[44px]">
      Thanks {params.get("name") ?? ""} — we&apos;ll WhatsApp you soon.
    </p>
  );
}