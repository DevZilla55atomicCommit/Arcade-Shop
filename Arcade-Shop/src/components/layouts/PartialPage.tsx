"use client";

import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";

/**
 * Standard page wrapper: providers + navbar + main content + footer.
 * `children` are rendered inside `<main>` so every page gets the same chrome
 * and access to GameProvider / CartProvider / WishlistProvider.
 */
export function PartialPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <Navbar />
        <main className="relative z-10 flex min-h-screen flex-col bg-arcade-bg-deep">
          {children}
        </main>
        <Footer />
      </Providers>
    </>
  );
}
