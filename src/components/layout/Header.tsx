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

<div className="hidden items-center gap-2 md:flex">
        {/* New Launches */}
        <Link
          href="/newlaunch"
          className="relative inline-flex h-10 items-center gap-2 rounded-full border border-black/15 bg-white/80 px-3 text-[13px] font-semibold text-inherit no-underline transition-all duration-150 ease-in-out hover:border-black hover:bg-[#facc15] hover:text-black"
        >
          <span className="absolute -right-1.5 -top-2 animate-pulse rounded-full bg-[#111827] px-1.5 py-0.5 text-[8px] font-semibold text-white">
            New
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>

          <span className="hidden min-[1280px]:inline">
            New Launches
          </span>

          <span className="inline min-[1280px]:hidden">
            New Launches
          </span>
        </Link>
      </div>
              {/* Offers */}
        <Link
          href="/offers"
          className="hidden h-10 items-center rounded-full border border-transparent bg-[#facc15] px-3 text-[13px] font-semibold text-inherit no-underline transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:bg-[#fef08a] hover:text-black md:inline-flex"
        >
          Offers
        </Link>

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
