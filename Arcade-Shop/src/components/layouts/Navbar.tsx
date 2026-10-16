"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = siteConfig.navigation;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-arcade-bg-deep/95 backdrop-blur-xl border-b border-arcade-accent-pink/20 neon-glow-pink"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-arcade-fg-primary hover:text-arcade-accent-pink transition-colors"
            aria-label="Arcade Vault Home"
          >
            <div className="w-8 h-8 rounded-pixel bg-gradient-to-br from-arcade-accent-pink to-arcade-accent-blue flex items-center justify-center">
              <svg className="w-5 h-5 text-arcade-bg-deep" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-display text-heading-md font-bold tracking-tight">
              ARCADE<span className="text-arcade-accent-pink">VAULT</span>
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <Link href="/search" className="btn-arcade-ghost px-4 py-2 text-sm" aria-label="Search games">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link href="/wishlist" className="btn-arcade-ghost px-4 py-2 text-sm relative" aria-label="Wishlist">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-arcade-accent-pink text-[10px] font-mono rounded-full flex items-center justify-center">3</span>
            </Link>
            <Link href="/cart" className="btn-arcade-ghost px-4 py-2 text-sm relative" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-arcade-accent-green text-[10px] font-mono rounded-full flex items-center justify-center">2</span>
            </Link>
            <Button variant="neon" size="sm">
              <Link href="/account">Account</Link>
            </Button>
          </div>

          <button
            className="md:hidden btn-arcade-ghost p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden py-4 border-t border-arcade-accent-pink/20 animate-slide-down"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <MobileNavItem key={item.href} item={item} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-arcade-accent-pink/20">
                  <Button variant="pixel" size="md" className="w-full justify-start">
                    <Link href="/search">Search Games</Link>
                  </Button>
                  <Button variant="pixel" size="md" className="w-full justify-start">
                    <Link href="/wishlist">Wishlist</Link>
                  </Button>
                  <Button variant="pixel" size="md" className="w-full justify-start">
                    <Link href="/cart">Cart</Link>
                  </Button>
                  <Button variant="neon" size="md" className="w-full justify-start mt-2">
                    <Link href="/account">Account</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function NavItem({ item }: { item: { label: string; href: string; children?: { label: string; href: string }[] } }) {
  const [isHovered, setIsHovered] = useState(false);

  if (item.children) {
    return (
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link
          href={item.href}
          className="btn-arcade-ghost px-4 py-2 text-sm flex items-center gap-1"
        >
          {item.label}
          <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-full left-0 mt-2 w-56 bg-arcade-bg-card rounded-arcade-lg card-glow border border-arcade-accent-pink/20 py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-body-sm text-arcade-fg-muted hover:text-arcade-accent-pink hover:bg-arcade-accent-pink/10 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="btn-arcade-ghost px-4 py-2 text-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({
  item,
  activeDropdown,
  setActiveDropdown,
}: {
  item: { label: string; href: string; children?: { label: string; href: string }[] };
  activeDropdown: string | null;
  setActiveDropdown: (label: string | null) => void;
}) {
  const isOpen = activeDropdown === item.label;

  if (item.children) {
    return (
      <div>
        <button
          className="btn-arcade-ghost px-4 py-2 text-sm w-full justify-between"
          onClick={() => setActiveDropdown(isOpen ? null : item.label)}
          aria-expanded={isOpen}
        >
          {item.label}
          <svg className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="ml-4 mt-2 space-y-1 border-l border-arcade-accent-pink/20 pl-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-2 py-1.5 text-body-sm text-arcade-fg-muted hover:text-arcade-accent-pink transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={item.href} className="btn-arcade-ghost px-4 py-2 text-sm w-full justify-start" onClick={() => setActiveDropdown(null)}>
      {item.label}
    </Link>
  );
}