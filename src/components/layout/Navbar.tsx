import Link from "next/link";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Rentals", href: "/pg-in-bangalore" },
  { label: "Propex", href: "https://www.propex.ai/", external: true },
  { label: "Corporate Serviced Apartments", href: "/csuites" },
];

export default function Navbar() {
  return (
    <nav aria-label="Primary" className="hidden h-9 md:block">
      <ul className="mx-auto flex h-full max-w-360 items-center px-8">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="mx-5 block border-b border-transparent text-[15px] font-semibold tracking-[0.01em] text-black hover:border-black"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
