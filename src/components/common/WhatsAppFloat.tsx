import { FaWhatsapp } from "react-icons/fa";

export const WHATSAPP_URL =
  "https://wa.me/918050003274?text=Hi%20Colive!%20I%27m%20looking%20for%20a%20rental%20home";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-7 bottom-7 z-40 flex size-13.5 items-center justify-center rounded-full bg-[#25d366] text-[28px] text-white shadow-[0_4px_18px_rgba(37,211,102,0.45)] transition-[transform,box-shadow] duration-200 hover:scale-108 hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)]"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
