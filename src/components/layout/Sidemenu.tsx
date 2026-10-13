"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import SocialLinks from "@/components/common/SocialLinks";

import { navigation } from "./Navbar";
import { appStoreLinks, sidemenuSections, type SidemenuSection } from "./sidemenuLinks";

// "Our Offerings" mirrors the sub-navigation, which is hidden below md
const offeringsSection: SidemenuSection = {
  id: "offerings",
  title: "Our Offerings",
  icon: "/images/sidemenu/offerings.png",
  links: navigation,
};

export default function Sidemenu({ triggerClassName }: { triggerClassName: string }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("activities");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const renderSection = (section: SidemenuSection, className = "") => {
    const expanded = openSection === section.id;
    const panelId = `sidemenu-${section.id}`;

    return (
      <div key={section.id} className={`mb-2.5 text-black ${className}`}>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setOpenSection(expanded ? null : section.id)}
          className={`flex w-full cursor-pointer items-center gap-2.5 px-4 pt-2.5 text-left text-base ${expanded ? "font-semibold" : ""}`}
        >
          <Image src={section.icon} alt="" width={22} height={22} className="size-5.5" />
          <span className="flex-1">{section.title}</span>
          <FaChevronDown
            aria-hidden="true"
            className={`mr-1 size-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <div
          id={panelId}
          inert={!expanded}
          className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <ul className="overflow-hidden">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={close}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="block px-4 py-2.5 text-sm text-black hover:font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="sidemenu"
        onClick={() => setOpen(true)}
        className={`${triggerClassName} cursor-pointer`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-60 h-dvh bg-black/45 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        id="sidemenu"
        aria-label="Menu"
        inert={!open}
        className={`fixed top-0 right-0 z-70 h-dvh w-[90%] overflow-y-auto bg-white transition-transform duration-300 min-[401px]:w-80 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-[#2b001f] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative flex min-h-12.5 bg-[linear-gradient(179.8deg,#f6f6f5_27.22%,#000_419.08%)] px-2.5 py-3.25">
          <div className="ml-4.5 text-black">
            <p className="text-xl">Hi Guest</p>
            <Link
              href="/login"
              onClick={close}
              className="mt-1.25 inline-block rounded-[5px] border border-black px-2.5 py-0.75 text-[15px] font-medium"
            >
              Login/Sign Up
            </Link>
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute top-3 right-3.5 flex size-7.5 cursor-pointer items-center justify-center rounded-full text-black transition-colors hover:bg-black/8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Menu sections" className="pt-2.5">
          {renderSection(offeringsSection, "md:hidden")}
          {sidemenuSections.map((section) => renderSection(section))}
        </nav>

        <div className="m-5 rounded-[5px] bg-[linear-gradient(179.8deg,#fff5ca_27.22%,#000_419.08%)] py-5">
          <p className="ml-[6%] font-semibold text-black">Download Colive App on</p>
          <div className="mt-4 flex justify-center gap-5">
            {appStoreLinks.map((app) => (
              <a key={app.href} href={app.href} target="_blank" rel="noopener noreferrer">
                <Image src={app.image} alt={app.label} width={120} height={38} className="h-auto w-30" />
              </a>
            ))}
          </div>
        </div>

        <div className="ml-[10%] pb-[5%]">
          <p className="mb-5 font-semibold text-black">Follow us on</p>
          <SocialLinks />
        </div>
      </aside>
    </>
  );
}
