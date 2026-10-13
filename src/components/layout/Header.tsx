import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

import { WHATSAPP_URL } from "@/components/common/WhatsAppFloat";

import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";

const actionButtons = [
  { label: "Book Now", href: "/booknow" },
  { label: "Check-In", href: "/checkin" },
];

const iconLinkClass =
  "flex size-9 items-center justify-center rounded-full border border-black/30 text-slate-700 transition-colors hover:text-slate-900";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      {/* Blur lives on its own layer: a backdrop-filter on <header> would trap the fixed side menu inside it */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-[14px]" />
      <div className="border-b border-black/6">
        <div className="mx-auto flex h-15 max-w-360 items-center justify-between px-1.5 md:h-17 md:px-8">
          <Link href="/">
            <Image
              src="/images/header/colive-logo-dark.png"
              alt="Colive - Good Food, Great Friends"
              width={176}
              height={44}
              preload
              className="block h-8.75 w-auto pl-0.75 min-[361px]:h-11"
            />
          </Link>

          <div className="flex items-center gap-1.5 md:gap-4.5">
            {actionButtons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className="border border-[#111] bg-slate-900 px-1.5 py-1.5 text-xs font-semibold tracking-[0.02em] whitespace-nowrap text-white transition-colors hover:bg-slate-800 md:px-5 md:py-2 md:text-[13.5px]"
              >
                {button.label}
              </Link>
            ))}

            <Link
              href="/customerprofile"
              aria-label="My profile"
              className={`${iconLinkClass} hidden md:flex`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
              </svg>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className={`${iconLinkClass} hidden md:flex`}
            >
              <FaWhatsapp size={17} aria-hidden="true" />
            </a>

            <Sidemenu triggerClassName={iconLinkClass} />
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
}
