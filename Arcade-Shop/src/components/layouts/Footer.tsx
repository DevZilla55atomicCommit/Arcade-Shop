"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-arcade-bg-deep border-t border-arcade-accent-pink/20" role="contentinfo">
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-crt-curve pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Arcade Vault Home">
              <div className="w-10 h-10 rounded-pixel bg-gradient-to-br from-arcade-accent-pink to-arcade-accent-blue flex items-center justify-center">
                <svg className="w-6 h-6 text-arcade-bg-deep" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-display text-heading-lg font-bold tracking-tight">
                ARCADE<span className="text-arcade-accent-pink">VAULT</span>
              </span>
            </Link>
            <p className="text-body-md text-arcade-fg-muted mb-6 leading-relaxed">
              Your retro gaming destination. Discover, collect, and play the best arcade classics and modern indie gems.
            </p>
            <div className="flex gap-3">
              {[
                { href: siteConfig.social.twitter, label: "Twitter", icon: "twitter" },
                { href: siteConfig.social.discord, label: "Discord", icon: "discord" },
                { href: siteConfig.social.youtube, label: "YouTube", icon: "youtube" },
                { href: siteConfig.social.twitch, label: "Twitch", icon: "twitch" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-arcade bg-arcade-bg-card border border-arcade-accent-pink/20 flex items-center justify-center text-arcade-fg-muted hover:text-arcade-accent-pink hover:border-arcade-accent-pink hover:neon-glow-pink transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon === "twitter" && (
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    )}
                    {social.icon === "discord" && (
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.676 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 00.031.055 19.9 19.9 0 005.997 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.007-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.04.107c-.36.688-.772 1.35-1.225 1.993a.076.076 0 00.032.125 19.839 19.839 0 006.01-3.03.077.077 0 00.032-.054C23.852 13.547 23.12 9.12 20.348 4.397a.061.061 0 00-.031-.027zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    )}
                    {social.icon === "youtube" && (
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 00.46 12a29 29 0 000 4 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 000-4 29 29 0 00-.46-4.02zM10 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    )}
                    {social.icon === "twitch" && (
                      <path d="M21 2H3v3a2 2 0 002 2h14a2 2 0 002-2V2zM22 8H1v14a2 2 0 002 2h5v-9h2v9h5a2 2 0 002-2V8z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {[
            { label: "Shop", items: siteConfig.footer.shop },
            { label: "Company", items: siteConfig.footer.company },
            { label: "Support", items: siteConfig.footer.support },
            { label: "Legal", items: siteConfig.footer.legal },
          ].map((column, colIndex) => (
            <motion.nav
              key={column.label}
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + colIndex * 0.1 }}
              aria-label={column.label}
            >
              <h3 className="font-display text-heading-sm text-arcade-fg-primary mb-4">{column.label}</h3>
              <ul className="space-y-3" role="list">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-arcade-fg-muted hover:text-arcade-accent-pink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <div className="pt-8 border-t border-arcade-accent-pink/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-body-sm text-arcade-fg-muted">
              © {currentYear} Arcade Vault. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-body-sm text-arcade-fg-muted">
              <Link href="/privacy" className="hover:text-arcade-accent-pink transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-arcade-accent-pink transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-arcade-accent-pink transition-colors">Cookie Policy</Link>
              <Link href="/accessibility" className="hover:text-arcade-accent-pink transition-colors">Accessibility</Link>
            </div>
            <div className="flex items-center gap-2 text-caption font-mono text-arcade-accent-pink">
              <kbd className="px-2 py-1 bg-arcade-bg-card border border-arcade-accent-pink/20 rounded-pixel">K</kbd>
              <kbd className="px-2 py-1 bg-arcade-bg-card border border-arcade-accent-pink/20 rounded-pixel">O</kbd>
              <kbd className="px-2 py-1 bg-arcade-bg-card border border-arcade-accent-pink/20 rounded-pixel">N</kbd>
              <kbd className="px-2 py-1 bg-arcade-bg-card border border-arcade-accent-pink/20 rounded-pixel">A</kbd>
              <kbd className="px-2 py-1 bg-arcade-bg-card border border-arcade-accent-pink/20 rounded-pixel">M</kbd>
              <kbd className="px-2 py-1 bg-arcade-bg-card border border-arcade-accent-pink/20 rounded-pixel">I</kbd>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-arcade-accent-pink to-transparent" aria-hidden="true" />
    </footer>
  );
}