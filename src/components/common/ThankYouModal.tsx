"use client";

import Image from "next/image";
import Link from "next/link";

type ThankYouModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="thank-you-title"
        className="absolute left-1/2 top-1/2 flex w-full max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-8 py-10 text-center shadow-xl max-[768px]:left-[48%] max-[768px]:w-[85%] max-[768px]:max-w-none max-[768px]:px-5 max-[768px]:py-8"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src="/assets/images/contactus/logo.png"
          alt="Colive"
          width={150}
          height={38}
          className="mb-6 h-auto w-[150px]"
        />
        <h2
          id="thank-you-title"
          className="text-[70px] leading-[1.1] font-semibold text-[#2B001F] max-[768px]:text-[50px]"
        >
          Thank You
        </h2>
        <h3 className="mt-2 text-[30px] leading-tight font-medium text-[#2B001F] max-[768px]:text-[24px]">
          For Choosing Colive!
        </h3>
        <p className="mt-4 text-[18px] leading-relaxed text-gray-700 max-[768px]:text-[12px]">
          Colive representative will reach out to you soon
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded bg-[#2B001F] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3b002b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B001F]"
          onClick={onClose}
        >
          Back to home
        </Link>
      </section>
    </div>
  );
}
