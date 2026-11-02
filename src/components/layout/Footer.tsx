import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { FaPhoneAlt } from "react-icons/fa";
import SocialLinks, { circleIconClass } from "@/components/common/SocialLinks";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";

const helpLinks = [
  { label: "Help center", href: "#" },
  { label: "Contact us", href: "/contactus" },
];

const curiousLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Future locations", href: "/pg-in-bangalore" },
  { label: "Handbook", href: "/handbook" },
  { label: "Blog", href: "https://www.colive.com/blog/", external: true },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/news-and-press-releases" },
];

const legalLinks = [
  { label: "Terms & conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacypolicy" },
  { label: "Sitemap", href: "/sitemap" },
];

const headingClass = "mb-4.5 text-[15px] font-bold text-[#111]";
const linkClass =
  "mb-3 block text-sm text-[#111] underline decoration-[#111]/50 underline-offset-3 transition-colors hover:text-slate-600";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

type FooterLink = { label: string; href: string; external?: boolean };

function FooterLinks({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <>
      <h2 className={headingClass}>{heading}</h2>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
          className={linkClass}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#e8e8e8]">
      <div className="mx-auto grid max-w-7xl items-start gap-9 px-6 pt-10 pb-8 text-center md:grid-cols-[1fr_auto_1fr] md:gap-12 md:px-12 md:pt-15 md:pb-12 md:text-left">
        <div>
          <FooterLinks heading="How can we help?" links={helpLinks} />
        </div>

        <div className="flex flex-col items-center gap-3.5 text-center">
          <Link href="/">
            <Image
              src="/images/common/colive-footer-logo.png"
              alt="Colive - Good Food, Great Friends"
              width={1400}
              height={600}
              sizes="224px"
              className="w-56 rounded-[5%] bg-[#2b001f] p-3"
            />
          </Link>

          <p className="flex items-center gap-2.5 font-medium text-[#111]">
            <span className={circleIconClass} aria-hidden="true">
              <FaPhoneAlt />
            </span>
            <a href="tel:+917676000500" className="text-lg">
              7676 000 500
            </a>
          </p>

          <SocialLinks />

          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-3 md:gap-4.5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12.5px] text-gray-500 transition-colors hover:text-gray-700 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-[12.5px] text-gray-500">
            © <CurrentYear /> Colive. All rights reserved.
          </p>
        </div>

        <div className="md:text-right">
          <FooterLinks heading="Feeling curious?" links={curiousLinks} />
        </div>
      </div>

      <p className="bg-[#2b001f] px-6 py-5.5 text-center font-head text-[15px] tracking-[0.18em] text-white uppercase">
        Coliving never ends
      </p>

      <WhatsAppFloat />
    </footer>
  );
}
