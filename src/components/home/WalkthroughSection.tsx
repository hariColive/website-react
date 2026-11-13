import { Suspense } from "react";

import { WalkthroughForm, WalkthroughResult } from "./WalkthroughForm";

export default function WalkthroughSection() {
  return (
    <section id="walkthrough" className="scroll-mt-(--header-h) bg-[#fd716c] px-4 py-20 text-center md:px-15 md:py-36">
      <h2 className="mb-6 font-head text-4xl leading-[1.05] tracking-[-0.025em] text-[#111] md:mb-8 md:text-[clamp(2.5rem,5vw,4rem)]">
        Get a personalised Colive
        <br />
        walkthrough
      </h2>

      <p className="mx-auto mb-10 max-w-290 text-lg leading-[1.7] text-[#222] md:mb-12">
        Drop your name &amp; WhatsApp number. A community manager will reach out within the day with the right Colive
        hub for you.
      </p>

      {/* The success message depends on the URL, which is only known per request; the plain form is prerendered */}
      <Suspense fallback={<WalkthroughForm />}>
        <WalkthroughResult />
      </Suspense>

      <p className="mt-5 text-[15px] text-black/55">By submitting you agree to be contacted on WhatsApp by Colive.</p>
    </section>
  );
}
