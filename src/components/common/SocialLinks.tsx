import { FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/colive.in/", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC97k6haFp6RU_0puYWvlJuw", Icon: FaYoutube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/colive-futureofliving/", Icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/Colive.in/", Icon: FaFacebook },
];

export const circleIconClass =
  "flex size-8.5 items-center justify-center rounded-full border-[1.5px] border-[#111] text-[15px] text-[#111] transition-colors duration-200 hover:bg-[#111] hover:text-white";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={circleIconClass}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
