import React from "react";

const Arrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const DownArrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const Ticket = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2M13 17v2M13 11v2" />
  </svg>
);

const TicketPercent = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M9 9h.01M15 9l-6 6M15 15h.01" />
  </svg>
);

const Bed = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M12 4v6M2 18h20" />
  </svg>
);

/*
 * CSS keyframes are declared in a global SVG style element.
 * This avoids styled-jsx and keeps Offers as a Server Component.
 */
const OffersAnimations = () => (
  <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
    <defs>
      <style>{`
        @keyframes offersPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        @keyframes offersZoom {
          0%, 100% {
            transform: scale(1.03) rotate(5.99932deg);
          }
          50% {
            transform: scale(1.05) rotate(1.12deg);
          }
        }
      `}</style>
    </defs>
  </svg>
);

const offers = [
  {
    number: "Offer 01",
    color: "bg-[#80d392]",
    subtitle: "Applicable In November. T&C Apply.",
    title: "50% Off Your Rent",
    description: "When you move to Colive this November.",
    extra: (
      <p>
        <b>Eligible Properties:</b> Kyle, Chandler, Austin, Jasper, Kansas
      </p>
    ),
    icon: <span className="text-2xl leading-none">%</span>,
  },
  {
    number: "Offer 02",
    color: "bg-[#719bf8]",
    subtitle: "Applicable In November. T&C Apply.",
    title: "Get ₹1,000 Coupon",
    description: "When you move to Colive this November.",
    icon: <Ticket />,
  },
  {
    number: "Offer 03",
    color: "bg-[#ff8b28]",
    subtitle: "Applicable In November. T&C Apply.",
    title: "Get ₹2,000 Coupon",
    description: "When you move to Colive this November.",
    icon: <TicketPercent />,
  },
  {
    number: "Offer 04",
    color: "bg-[#ff8fa3]",
    subtitle: "Applicable In November",
    title: "Free Luxury Bedding With Every Move-In",
    description: "Settle in from night one with premium bedding on us.",
    icon: <Bed />,
  },
];

const Offers = () => {
  return (
    <main className="-mt-[8%] w-full overflow-hidden bg-white text-[#080808]">
      <style>{`
        @keyframes offersPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        @keyframes offersZoom {
          0%, 100% {
            transform: scale(1.03) rotate(5.99932deg);
          }
          50% {
            transform: scale(1.05) rotate(1.12deg);
          }
        }
      `}</style>

      {/* Hero Banner */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-black px-10 pb-[68px] pt-[160px] font-['DM_Sans',sans-serif] text-gray-500 max-[767px]:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsla(0,0%,80%,0.13) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,80%,0.13) 1px, transparent 1px)",
            backgroundSize: "51px 51px",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute left-[48%] top-[89px] h-[290px] w-[311px] rounded-full border-[61px] border-[hsl(51,96%,60%)] md:left-[36%] md:top-16 md:h-[460px] md:w-[460px] md:border-[80px] lg:left-[60%] lg:top-[95px]"
          style={{ animation: "offersZoom 3s infinite" }}
        />

        <div className="relative z-[1] mx-auto w-full max-w-[1280px] md:right-5">
          <div className="mb-7 inline-flex items-center gap-3 border border-white/20 px-4 py-[10px] text-base font-normal text-white">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#70d6a0]"
              style={{ animation: "offersPulse 1.5s infinite" }}
            />
            November Offers Are Live
          </div>

          <h1 className="m-0 max-w-[1000px] font-['Archivo_Black',sans-serif] text-[clamp(3.4rem,10vw,9.5rem)] font-normal leading-[0.95] tracking-[-0.015em] text-white">
            Move-In
            <br />
            Offers
          </h1>

          <div className="mt-9 flex items-center gap-6 max-[767px]:block">
            <a
              href="#offers"
              className="inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap bg-[#f5d547] px-7 text-sm font-semibold text-[#171717] no-underline transition-colors duration-200 hover:bg-[#ff762b] hover:text-black"
            >
              See What Is Running
              <DownArrow />
            </a>

            <p className="m-0 max-w-[380px] text-sm leading-[1.8] text-[rgba(245,242,236,0.55)] max-[767px]:mt-[10px]">
              Four smart ways to make your November move easier, lighter and
              better value.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="-mt-[10%] box-border w-full px-[4%] py-8 font-['DM_Sans',sans-serif] text-[#080808] max-[767px]:mt-[10%] max-[767px]:px-4 max-[767px]:py-[30px] md:max-lg:px-[30px] md:max-lg:pt-28">
        <div
          id="offers"
          className="mb-8 flex items-center justify-between gap-10 max-[767px]:mb-6 max-[767px]:block md:max-lg:items-end md:max-lg:p-[10px]"
        >
          <div className="max-[767px]:flex max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-[18px]">
            <p className="mb-[18px] mt-0 font-['IBM_Plex_Mono',monospace] text-xs font-semibold uppercase text-[#666]">
              Current Offers
            </p>

            <h2 className="m-0 whitespace-nowrap font-['Archivo_Black',sans-serif] text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-1.5px] max-[767px]:text-[clamp(30px,7vw,40px)] md:max-lg:max-w-[280px] md:max-lg:whitespace-normal md:max-lg:text-[54px] md:max-lg:leading-none">
              Choose Your Move
            </h2>
          </div>

          <p className="mb-0 mt-8 max-w-[448px] text-[17px] leading-[1.65] text-[rgba(8,8,8,0.7)] max-[767px]:mt-4 md:max-lg:ml-[10%] md:max-lg:text-sm">
            Availability and eligibility vary by property. Our team will help
            you find the best live offer.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2 sm:gap-4">
          {offers.map((offer) => (
            <article
              key={offer.number}
              className={`group flex min-h-[420px] min-w-0 flex-col justify-between overflow-hidden ${offer.color} p-6 transition-transform duration-200 hover:-translate-y-1.5 sm:min-h-[464px] sm:p-9 max-[1024px]:p-7 max-[767px]:min-h-[420px] max-[767px]:p-6`}
            >
              <div className="flex items-center justify-between font-['IBM_Plex_Mono',monospace] text-[13px]">
                <span>{offer.number}</span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(8,8,8,0.25)]">
                  {offer.icon}
                </span>
              </div>

              <div className="mt-8">
                <p className="mb-[18px] mt-0 font-['IBM_Plex_Mono',monospace] text-[11px] leading-[1.5]">
                  {offer.subtitle}
                </p>

                <h2 className="m-0 max-w-[576px] font-['Archivo_Black',sans-serif] text-[60px] font-normal leading-none text-[#080808] max-[1024px]:text-[46px] max-[767px]:text-[clamp(36px,9vw,48px)] max-[767px]:tracking-[-1px]">
                  {offer.title}
                </h2>

                <p className="mt-5">{offer.description}</p>

                {offer.extra}

                <a
                  href="#claim"
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 border border-[#080808] bg-transparent px-5 text-sm font-medium text-[#080808] no-underline transition-colors duration-200 hover:bg-[#080808] hover:text-white max-[767px]:mt-[26px]"
                >
                  Check Eligibility
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Offer Desk */}
      <section
        id="claim"
        className="relative box-border overflow-hidden bg-[hsl(48,100%,90%)] px-6 py-[60px] text-[#080808] sm:px-10 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#ff8b28]"
          style={{ animation: "offersZoom 3s infinite" }}
        />

        <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <p className="mb-5 mt-0 text-sm font-semibold">Offer Desk</p>

            <h2 className="m-0 max-w-[750px] font-['Archivo_Black',sans-serif] text-[clamp(38px,10vw,52px)] font-normal leading-[1.05] tracking-[-1.5px] sm:text-[clamp(40px,5.5vw,72px)]">
              Find The Best Offer For Your Move
            </h2>
          </div>

          <div className="w-full max-w-[440px] md:justify-self-end">
            <p className="mb-7 mt-0 text-base leading-[1.7] text-[rgba(8,8,8,0.7)]">
              Share your preferred location and move-in date with our team. We
              will confirm which November offers apply to you.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/917676000500?text=Hi%20Colive%2C%20I%20want%20to%20check%20the%20latest%20move-in%20offers"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-0 inline-flex min-h-14 items-center justify-center gap-3 bg-[#080808] px-7 text-sm font-medium text-white no-underline transition-colors duration-200 hover:bg-[#ff8b28] hover:text-[#080808] max-[767px]:mr-[42%]"
              >
                Ask About Offers
                <Arrow />
              </a>

              <a
                href="/newlaunch"
                className="inline-flex min-h-10 items-center px-4 text-sm font-medium text-[#080808] underline-offset-4 no-underline hover:text-black hover:underline"
              >
                See New Launches
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Offers;
