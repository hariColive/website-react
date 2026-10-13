import type { Metadata } from "next";
import { Archivo_Black, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Colive | Explore India's Premier Co-living Pgs Near You",
  description:
    "Discover Coliving Pg Near You for Luxury Accommodations, Couple-friendly Spaces, and More on. Colive – India's Largest Rental Exchange Platform. Rent With Ease, and Live With Comfort",
    keywords: "PG for Boys, PG for Couples, PG for Girls, PG for Male, PG for Ladies, PG in Bangalore, PG in Delhi, PG in Pune, PG in Mumbai"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${archivoBlack.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
