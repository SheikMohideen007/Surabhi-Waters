import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { company } from "@/data/company";
import { siteConfig, siteUrl } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Sewage, Water & Wastewater Treatment Systems`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  keywords: siteConfig.keywords,
  applicationName: company.name,
  authors: [{ name: company.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
    url: siteUrl,
    title: `${company.name} — Sewage, Water & Wastewater Treatment Systems`,
    description: company.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Clarifier tank at a water treatment plant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Sewage, Water & Wastewater Treatment Systems`,
    description: company.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Water & Wastewater Engineering",
};

export const viewport: Viewport = {
  themeColor: "#07203a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable}`}>
      <body className="min-h-dvh overflow-x-hidden antialiased">
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
