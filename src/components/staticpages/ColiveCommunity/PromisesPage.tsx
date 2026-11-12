"use client";

import Link from "next/link";
import { useState } from "react";

type Feature = {
  id: string;
  label: string;
  image: string;
  alt: string;
  href: string;
  explore: string;
  tabIcon: string;
  items: { label: string; icon: string }[];
};

const features: Feature[] = [
  {
    id: "style",
    label: "Style",
    image: "/images/promises/Style-374x545.jpg",
    alt: "pg in marathahalli for gents",
    href: "/promises/style",
    explore: "Explore",
    tabIcon: "StyleTabAlign",
    items: [
      { label: "Chic & contemporary furniture", icon: "Modern-Furnishing_Icon" },
      { label: "Modern storage spaces", icon: "Modern-Storage-Space_Icon" },
      { label: "Self-cooking equipments", icon: "Self_Cooking_Icon" },
    ],
  },
  {
    id: "safety",
    label: "Safety",
    image: "/images/promises/Safety-374x545.jpg",
    alt: "bellandur pg for ladies",
    href: "/promises/safety",
    explore: "Explore Safety",
    tabIcon: "SafetyTabAlign",
    items: [
      { label: "Emergency Response Team", icon: "Emergency_Response_Team_Icon" },
      { label: "CCTV & video surveillance", icon: "CCTV_Video_Surveillance_Icon" },
      { label: "Facial Recognition Access Management Engine", icon: "Facial_Recognition_Based_Key_Management_Icon" },
    ],
  },
  {
    id: "service",
    label: "Service",
    image: "/images/promises/Service-374x545.jpg",
    alt: "koramangala pg for gents",
    href: "/promises/service",
    explore: "Explore Service",
    tabIcon: "ServiceTabAlign",
    items: [
      { label: "Professional housekeeping", icon: "Professional_House_Keeping_Icon" },
      { label: "Power back-up", icon: "Power_Backup_Icon" },
      { label: "Service & maintenance support", icon: "Maintenance_Support_Icon" },
    ],
  },
  {
    id: "saving",
    label: "Savings",
    image: "/images/promises/Savings-374x545.jpg",
    alt: "pg in bangalore electronic city phase 2",
    href: "/promises/savings",
    explore: "Explore Savings",
    tabIcon: "SavingsTabAlign",
    items: [
      { label: "Pocket friendly value rentals", icon: "Affordable_Rentals_Icon" },
      { label: "2 months deposit", icon: "Pay_Deposit_Installments_Icon" },
    ],
  },
  {
    id: "smart",
    label: "Smart",
    image: "/images/promises/Smart-374x545.jpg",
    alt: "Pg in Tathawade",
    href: "/promises/smart",
    explore: "Explore Smart",
    tabIcon: "SmartTabAlign",
    items: [
      { label: "Digital door locks", icon: "Digital_Door_Lock_Icon" },
      { label: "High speed internet", icon: "High_Speed_Internet_Icon" },
      { label: "Urban co-working space", icon: "Co_Working_Space_Icon" },
    ],
  },
  {
    id: "socials",
    label: "Social",
    image: "/images/promises/Social-374x545.jpg",
    alt: "whitefield pg for ladies",
    href: "/promises/social",
    explore: "Explore Social",
    tabIcon: "SocialTabAlign",
    items: [
      { label: "Cinema room", icon: "Cinema_Room_Icon" },
      { label: "Fitness room", icon: "Fitness_Room_Icon" },
      { label: "Community kitchen", icon: "Community_Kitchen_Icon" },
      { label: "Events & celebrations", icon: "Events_Celebrations_Icon" },
    ],
  },
];

const spritePositions: Record<string, string> = {
  StyleTabAlign: "-329px 111px",
  "Modern-Furnishing_Icon": "-558px -125px",
  "Modern-Storage-Space_Icon": "-558px -42px",
  Self_Cooking_Icon: "-138px -40px",
  SafetyTabAlign: "-43px 111px",
  Emergency_Response_Team_Icon: "-305px -125px",
  CCTV_Video_Surveillance_Icon: "-141px -214px",
  Facial_Recognition_Based_Key_Management_Icon: "-56px -214px",
  ServiceTabAlign: "-116px 111px",
  Professional_House_Keeping_Icon: "-188px 195px",
  Power_Backup_Icon: "-65px 425px",
  Maintenance_Support_Icon: "-260px 195px",
  SavingsTabAlign: "-257px 111px",
  Affordable_Rentals_Icon: "-629px 195px",
  Pay_Deposit_Installments_Icon: "-331px 195px",
  SmartTabAlign: "-405px 111px",
  Digital_Door_Lock_Icon: "-244px 425px",
  High_Speed_Internet_Icon: "-404px 195px",
  Co_Working_Space_Icon: "-481px 195px",
  SocialTabAlign: "-186px 111px",
  Cinema_Room_Icon: "-338px 425px",
  Fitness_Room_Icon: "-713px 425px",
  Community_Kitchen_Icon: "-428px 425px",
  Events_Celebrations_Icon: "-522px 425px",
};

const largeSpriteIcons = new Set([
  "Power_Backup_Icon",
  "Digital_Door_Lock_Icon",
  "Cinema_Room_Icon",
  "Fitness_Room_Icon",
  "Community_Kitchen_Icon",
  "Events_Celebrations_Icon",
]);

function SpriteIcon({ name, tab = false }: { name: string; tab?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[72px] w-[72px] shrink-0 bg-no-repeat ${
        tab ? "bg-[length:728px]" : largeSpriteIcons.has(name) ? "bg-[length:920px]" : "bg-[length:728px]"
      }`}
      style={{
        backgroundImage: "url('/images/promises/ourfeatureicon.png')",
        backgroundPosition: spritePositions[name] || "0 0",
        ...(name === "Modern-Furnishing_Icon" ||
        name === "Modern-Storage-Space_Icon" ||
        name === "Self_Cooking_Icon" ||
        name === "Emergency_Response_Team_Icon" ||
        name === "CCTV_Video_Surveillance_Icon" ||
        name === "Facial_Recognition_Based_Key_Management_Icon"
          ? { backgroundSize: "838px" }
          : {}),
      }}
    />
  );
}

export default function PromisesPage() {
  const [activeTab, setActiveTab] = useState("style");
  const activeFeature = features.find((feature) => feature.id === activeTab) || features[0];

  return (
    <main className="homepage-wrap mt-[5%] w-full overflow-x-hidden pt-[5%] font-['Inter-Regular']">

      <section className="features section-top pt-0 max-md:pt-[45px]">
        <div className="w-full bg-transparent">
          <div className="w-full">
            <div className="feature-wrap mt-0 w-full p-0">
              <ul className="nav-tabs mb-0 flex list-none justify-center border-b border-[#760c4e] bg-[linear-gradient(#ef0073,#760c4e)] p-[10px]">
                {features.map((feature) => (
                  <li key={feature.id} className="mb-0 flex flex-1 items-center justify-center text-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab(feature.id)}
                      className={`flex h-full w-full items-center justify-center font-semibold text-white max-md:text-[14px] ${
                        activeTab === feature.id
                          ? "w-auto rounded-[10px] border-b-2 border-[#760c4e] bg-white px-[10px] text-[#760c4e]"
                          : ""
                      }`}
                      aria-selected={activeTab === feature.id}
                      role="tab"
                    >
                      {feature.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="tab-content pb-0">
              <div id={activeFeature.id} className="tab-pane block h-auto">
                <div className="grid grid-cols-1 md:grid-cols-[33.333%_66.667%] lg:grid-cols-[25%_75%]">
                  <div className="w-full p-0 md:pr-0">
                    <div className="owl-carousel owl-carousel-cards owl-theme block">
                      <div className="item">
                        <div className="owl-image text-center">
                          <img
                            src={activeFeature.image}
                            className="img-fluid h-auto max-w-full"
                            alt={activeFeature.alt}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="Blog_Align" className="flex flex-wrap items-center">
                    <div className="RightOurSection w-full px-0 pt-0 md:py-[20px] md:pl-[50px]">
                      <div className="section-heading-our">
                        <div className="Heading_blog mt-[15px] text-center text-[37px] font-bold leading-[50px] text-[#112950] md:mt-0 md:text-left md:text-[45px] lg:text-[62px] lg:leading-[70px]">
                          {activeFeature.id === "style" ? <h1>OUR 6S PROMISES</h1> : "OUR 6S PROMISES"}
                        </div>
                      </div>

                      <div className="our_promises px-0 py-[10px] md:px-0 md:py-0 md:pl-[25px] md:pb-[40px]">
                        <div className="mt-8 flex items-center md:mt-8">
                          <SpriteIcon name={activeFeature.tabIcon} tab />
                          <span className="pl-1 text-[32px] font-bold text-[var(--primary-clr)]">
                            {activeFeature.label}
                          </span>
                        </div>

                        <div className="my-[1.5rem] mb-[3rem]">
                          <Link
                            href={activeFeature.href}
                            className="inline-block cursor-pointer border-2 border-[#112950] bg-[#112950] px-[42px] py-[10px] text-[16px] font-semibold text-white"
                          >
                            {activeFeature.explore}
                          </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3">
                          {activeFeature.items.map((item) => (
                            <div key={item.icon} className="o-feature flex items-center md:block">
                              <SpriteIcon name={item.icon} />
                              <div>
                                <p className="TabViewText ml-[15px] border-t-2 border-[var(--primary-clr)] pt-[14px] text-left text-[15px] font-medium leading-[1.5] md:ml-0 md:text-center">
                                  {item.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="modal" id="video-modal">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="container" id="divLocationMenus">
            <div className="CityList" id="CityList" />
          </div>
          <button className="modal-close is-large" id="btnClose" aria-label="close" type="button">
            <svg
              version="1.1"
              className="svgClose"
              id="closeLoc"
              style={{ transform: "rotate(270deg)" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.49 31.49"
            >
              <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
