"use client";

import { useState } from "react";

import ScheduleVisitForm from "./ScheduleVisitForm";

type BookingPanelProps = {
  propertyId: number;
  propertyName: string;
  // colive.com's booking flow (this app has no booking pages yet)
  bookNowUrl: string;
};

const TABS = ["Book Now", "Schedule Visit"] as const;

export default function BookingPanel({ propertyId, propertyName, bookNowUrl }: BookingPanelProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Book Now");

  return (
    <div className="border border-gray-200 bg-white px-6 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div role="tablist" className="mb-3 grid grid-cols-2 bg-gray-100">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            onClick={() => setTab(name)}
            className={`cursor-pointer py-2.5 text-[17px] transition-colors ${tab === name ? "bg-[#111] text-white" : "text-[#111] hover:bg-gray-200"}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === "Book Now" ? (
        <div role="tabpanel" className="text-[17px] leading-[1.75] text-[#111]">
          <p>Hey!</p>
          <p>Upgrade your lifestyle with Colive, fully-managed rental homes, premium amenities and exciting common spaces.</p>
          <p>
            With a vibrant community of young professionals, Colive promises to give you the best experience of living on your own.
          </p>
          <p>
            A home with a Cinema room, Fitness room, Terrace Lounge, café and exciting events like Yoga, Zumba, barbecue evenings,
            live sports screening and more make the most of your time without having to step out or spend more.
          </p>
          <p className="mb-4">Experience the Colive way of life and be a part of our 15,000 strong Colive Community.</p>
          <a href={bookNowUrl} className="block bg-[#111] py-2.5 text-center text-white transition-colors hover:bg-[#333]">
            Book Now
          </a>
        </div>
      ) : (
        <div role="tabpanel">
          <ScheduleVisitForm propertyId={propertyId} propertyName={propertyName} />
        </div>
      )}
    </div>
  );
}
