import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "JUAN — Photo & Videography",
    template: "%s · JUAN",
  },
  description:
    "Cinematic photography and videography by Juan. Portraits, weddings, fashion, and commercial storytelling.",
  openGraph: {
    type: "website",
    siteName: "JUAN Studio",
    title: "JUAN — Photo & Videography",
    description:
      "Cinematic photography and videography by Juan. Portraits, weddings, fashion, and commercial storytelling.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JUAN — Photo & Videography",
    description: "Cinematic photography and videography by Juan.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg grain">{children}</body>
    </html>
  );
}
