"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";

export interface ThankYouModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  redirectUrl?: string;
}

export default function ThankYouModal({
  isOpen,
  onClose,
  title = "Thank You",
  subtitle = "For Choosing Colive!",
  description = "Colive representative will reach out to you soon",
  buttonText = "Back to home",
  redirectUrl = "/",
}: ThankYouModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const activeElement = document.activeElement;
    const previouslyFocused =
      activeElement instanceof HTMLElement ? activeElement : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements =
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
      const firstElement = focusableElements.item(0);
      const lastElement = focusableElements.item(focusableElements.length - 1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !dialogRef.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !dialogRef.current.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtitleParts = subtitle.split("Colive!");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current?.();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-[6px] border-t-[8px] border-[#EF0073] bg-white px-5 text-center font-sans shadow-xl outline-none sm:px-8"
      >
        <Image
          src="/images/header/colive-logo-dark.png"
          alt="Colive"
          width={800}
          height={200}
          className="mx-auto mt-8 h-auto w-[150px]"
        />
        <h2
          id={titleId}
          className="mt-[6%] text-[50px] font-bold leading-tight text-[#31123A] min-[768px]:text-[70px]"
        >
          {title}
        </h2>
        <h3 className="mt-1 text-[24px] font-normal leading-tight text-[#31123A] min-[768px]:text-[30px]">
          {subtitleParts.map((part, index) => (
            <span key={`${part}-${index}`}>
              {part}
              {index < subtitleParts.length - 1 ? (
                <span className="text-[#EF0073]">Colive!</span>
              ) : null}
            </span>
          ))}
        </h3>
        <p
          id={descriptionId}
          className="mt-[10px] mb-[15px] text-[12px] font-normal text-[#31123A] min-[768px]:text-[18px]"
        >
          {description}
        </p>
        <Link
          href={redirectUrl}
          className="mb-[3%] inline-block rounded-[6px] bg-[#EF0073] px-5 py-[5px] text-white no-underline"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
