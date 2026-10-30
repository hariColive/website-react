"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { FaCalendarCheck } from "react-icons/fa";

import type { VisitSlot } from "@/lib/propertyDetails";

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const toIsoDay = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// Sales teams are off on Mondays, so colive.com starts the picker on Tuesday then
function defaultVisitDay() {
  const date = new Date();
  if (date.getDay() === 1) date.setDate(date.getDate() + 1);
  return toIsoDay(date);
}

const displayDay = (isoDay: string) =>
  new Date(`${isoDay}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

type Errors = Partial<Record<"name" | "mobile" | "email" | "slot", string>>;

const inputClass = "w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#111] outline-none focus:border-[#111]";

// Rendered only after the Schedule Visit tab is opened, so the date defaults run in the browser.
export default function ScheduleVisitForm({ propertyId, propertyName }: { propertyId: number; propertyName: string }) {
  const formId = useId();
  const [date, setDate] = useState(defaultVisitDay);
  const [slots, setSlots] = useState<VisitSlot[] | null>(null);
  const [slotId, setSlotId] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [booked, setBooked] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/visit-slots?propertyId=${propertyId}&date=${date}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : { slots: [] }))
      .then((data: { slots: VisitSlot[] }) => {
        setSlots(data.slots);
        setSlotId("");
      })
      .catch((error) => {
        if (!controller.signal.aborted) setSlots([]);
        if (!controller.signal.aborted) console.error(error);
      });
    return () => controller.abort();
  }, [propertyId, date]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name";
    if (!MOBILE_PATTERN.test(mobile)) nextErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Please enter a valid e-mail";
    if (!slotId) nextErrors.slot = "Please select a time slot";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Matches the current colive.com property page, which confirms on screen without saving the visit.
    // Wire this to the CRM's visit-insert endpoint before going live.
    const slot = slots?.find((option) => String(option.id) === slotId);
    setBooked({ date: displayDay(date), time: slot?.time ?? "" });
  };

  if (booked) {
    return (
      <div className="py-6 text-center">
        <FaCalendarCheck aria-hidden="true" className="mx-auto mb-4 text-4xl text-[#111]" />
        <p className="mb-2 text-lg font-semibold text-[#111]">YAY!! Your visit is scheduled successfully!</p>
        <p className="mb-1 text-sm text-gray-600">
          {booked.date} · {booked.time}
        </p>
        <p className="mb-5 text-sm text-gray-600">Our team will be available to give you a grand tour of our property</p>
        <p className="text-sm text-gray-600">
          Change in mind?{" "}
          <button type="button" onClick={() => setBooked(null)} className="cursor-pointer font-semibold text-[#111] underline">
            Reschedule date and time
          </button>
        </p>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${formId}-${name}` : undefined,
  });
  const error = (name: keyof Errors) =>
    errors[name] && (
      <p id={`${formId}-${name}`} className="mt-1 text-xs text-red-600">
        {errors[name]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 py-3">
      <p className="text-sm text-gray-600">Schedule a visit to {propertyName}</p>

      <div>
        <input name="name" autoComplete="name" placeholder="Name *" aria-label="Name" className={inputClass} {...field("name")} />
        {error("name")}
      </div>

      <div>
        <div className="flex">
          <span className="border border-r-0 border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-600">+91</span>
          <input
            name="mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            placeholder="Mobile Number *"
            aria-label="Mobile number"
            className={inputClass}
            {...field("mobile")}
          />
        </div>
        {error("mobile")}
      </div>

      <div>
        <input name="email" type="email" autoComplete="email" placeholder="E-mail *" aria-label="E-mail" className={inputClass} {...field("email")} />
        {error("email")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          value={date}
          min={toIsoDay(new Date())}
          onChange={(event) => event.target.value && setDate(event.target.value)}
          aria-label="Visit date"
          className={inputClass}
        />
        <select
          value={slotId}
          onChange={(event) => setSlotId(event.target.value)}
          disabled={!slots?.length}
          aria-label="Visit time"
          className={`${inputClass} disabled:bg-gray-50`}
          {...field("slot")}
        >
          <option value="">{slots === null ? "Loading…" : slots.length ? "Select a time slot" : "No slots"}</option>
          {slots?.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.time}
            </option>
          ))}
        </select>
      </div>
      {slots?.length === 0 && (
        <p className="-mt-1 text-xs text-gray-600">No time slots available for this day. Please pick the next day.</p>
      )}
      {error("slot")}

      <button type="submit" className="mt-2 cursor-pointer bg-[#111] py-2.5 text-white transition-colors hover:bg-[#333]">
        Schedule Visit
      </button>
    </form>
  );
}
