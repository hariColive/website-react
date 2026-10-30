import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
};

// "WHAT'S INSIDE / Every detail, considered." style heading used across the property page
export default function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-gray-100 pb-4">
      <div>
        {eyebrow && <p className="mb-1 text-[11px] tracking-[0.2em] text-gray-500 uppercase">{eyebrow}</p>}
        <h2 className="text-2xl font-normal tracking-tight text-[#111] md:text-[28px]">{title}</h2>
      </div>
      {action}
    </div>
  );
}
