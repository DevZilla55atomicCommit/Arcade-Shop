"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Hero3DBackground } from "@/lib/three-scene";
import { RGBShift } from "@/components/arcade/Scanlines";
import { CRTOverlay, CRTCurvature } from "@/components/arcade/CRTOverlay";
import { MagneticButton } from "@/components/arcade/MagneticButton";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn("relative min-h-screen flex items-center justify-center overflow-hidden", className)} aria-labelledby="hero-title">
      <Hero3DBackground />
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" aria-hidden="true" />
      <RGBShift intensity={3} />
      <div className="absolute inset-0 bg-gradient-to-b from-arcade-bg-deep via-transparent to-arcade-bg-deep/50 pointer-events-none" aria-hidden="true" />
      <CRTOverlay intensity={0.12} />
      <CRTCurvature intensity={0.3} />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-20 z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-arcade-lg bg-arcade-accent-pink/10 border border-arcade-accent-pink/30 text-arcade-accent-pink text-caption font-mono uppercase tracking-wider mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="animate-neon-pulse">●</span>
            NEW ARRIVALS • EXCLUSIVE DEALS • RETRO CLASSICS
          </motion.span>

          <motion.h1
            id="hero-title"
            className="font-display text-display-xl sm:text-display-lg md:text-display-md lg:text-display-sm text-arcade-fg-primary mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">LEVEL UP YOUR</span>
            <span className="block text-gradient-neon">GAME COLLECTION</span>
          </motion.h1>

          <motion.p
            className="text-body-lg md:text-heading-sm text-arcade-fg-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Discover thousands of curated games from arcade classics to modern indie masterpieces. 
            Neon-lit deals, pixel-perfect quality.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button variant="neon" size="lg">
              <a href="/shop">EXPLORE GAMES</a>
            </Button>
            <Button variant="blue" size="lg">
              <a href="/categories">BROWSE CATEGORIES</a>
            </Button>
            <Button variant="ghost" size="lg">
              <a href="/about">LEARN MORE</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { label: "10,000+", description: "Games in Vault" },
            { label: "500+", description: "Verified Developers" },
            { label: "99.9%", description: "Uptime Guarantee" },
            { label: "24/7", description: "Support Online" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 bg-arcade-bg-card/50 backdrop-blur-sm rounded-arcade border border-arcade-accent-pink/10 hover:border-arcade-accent-pink/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-display text-display-sm text-arcade-accent-pink mb-1">{stat.label}</div>
              <div className="text-body-sm text-arcade-fg-muted">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-arcade-fg-muted/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { duration: 1, delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
      >
        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="text-caption font-mono">SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
}

export function Marquee({ children, speed = 20, paused = false, className }: { children: React.ReactNode; speed?: number; paused?: boolean; className?: string }) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-flex items-center gap-16"
        style={{
          animation: paused ? "none" : `marquee ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => paused || (document.querySelector("[style*=\"marquee\"]") as HTMLElement | null)?.style.setProperty("animation-play-state", "paused")}
        onMouseLeave={() => paused || (document.querySelector("[style*=\"marquee\"]") as HTMLElement | null)?.style.setProperty("animation-play-state", "running")}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export function MarqueeItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("flex-shrink-0 px-4", className)}>
      {children}
    </span>
  );
}