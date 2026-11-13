import { FaArrowRight } from "react-icons/fa";

const PROMISES = [
  {
    icon: "✦",
    title: "Style",
    description: "Tech-enabled spaces with chic, tasteful furniture, gyms and cinema rooms — designed for modern urban life.",
  },
  {
    icon: "⬡",
    title: "Safety",
    description: "24×7 security, CCTV monitoring and emergency response — so you never feel alone in a new city.",
  },
  {
    icon: "◈",
    title: "Service",
    description: "Daily housekeeping, laundry, nourishing meals and onsite community managers. Plug, play and live.",
  },
  {
    icon: "◎",
    title: "Smart",
    description: "High-speed WiFi, smart access controls and a fully landlord-free rental experience on the Colive app.",
  },
  {
    icon: "◐",
    title: "Social",
    description:
      "15,000+ residents agree — the friendships you form here are the best part of the entire experience.",
  },
  {
    icon: "◇",
    title: "Savings",
    description: "Flexible plans, low deposits and the feel of a 6-Star hotel — at a fraction of what you'd expect to pay.",
  },
];

export default function PromiseSection() {
  return (
    <section className="bg-white px-4 py-16 md:px-15 md:py-20">
      <div className="mx-auto max-w-480">
        <h2 className="mb-10 font-head text-4xl leading-none tracking-[-0.025em] text-[#111] sm:text-[clamp(1.5rem,6vw,4.5rem)] md:mb-14 md:text-[clamp(2.5rem,6vw,4.5rem)]">
          The Colive 6S Promise
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map((promise) => (
            <article
              key={promise.title}
              className="border border-gray-200 px-8 pt-10 pb-18 transition-colors duration-300 hover:border-[#43d967] hover:bg-[#43d967]"
            >
              <span aria-hidden="true" className="block text-3xl leading-none text-[#111]">
                {promise.icon}
              </span>

              <h3 className="mt-8 mb-6 font-head text-2xl leading-tight tracking-[-0.01em] text-[#111]">
                {promise.title}
              </h3>

              <p className="text-[17px] leading-normal text-[#555]">{promise.description}</p>

              <FaArrowRight aria-hidden="true" className="mt-8 text-xl text-[#111]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
