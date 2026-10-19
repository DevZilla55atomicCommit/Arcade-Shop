export const metadata = {
  title: "ARCADE VAULT | Retro Gaming Destination",
  description: "Discover thousands of curated games from arcade classics to modern indie masterpieces. Neon-lit deals, pixel-perfect quality.",
  keywords: ["games", "arcade", "retro gaming", "indie games", "game store", "digital games"],
  authors: [{ name: "Arcade Vault" }],
  creator: "Arcade Vault",
  publisher: "Arcade Vault",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arcadevault.gg",
    title: "ARCADE VAULT | Retro Gaming Destination",
    description: "Discover thousands of curated games from arcade classics to modern indie masterpieces.",
    siteName: "Arcade Vault",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arcade Vault - Retro Gaming Destination",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCADE VAULT | Retro Gaming Destination",
    description: "Discover thousands of curated games from arcade classics to modern indie masterpieces.",
    images: ["/images/og-image.jpg"],
    creator: "@arcadevault",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { Providers } from "@/components/providers/Providers";
import { ScrollSystem } from "@/components/scroll/ScrollSystem";
import { BackToTop, ScrollProgress } from "@/components/arcade/BackToTop";

const inter = localFont({
  src: "../../public/fonts/inter-variable.ttf",
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Fonts are self-hosted via next/font/local (Inter); no external font requests. */}
      </head>
      <body className="min-h-screen bg-arcade-bg-deep text-arcade-fg-primary antialiased">
        <Providers>
          <Navbar />
          <main id="main-content" className="relative z-10">
            <ScrollProgress />
            <ScrollSystem className="relative z-10">{children}</ScrollSystem>
          </main>
          <BackToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}