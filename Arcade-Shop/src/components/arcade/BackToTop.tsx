"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

export function BackToTop({ threshold = 300, className }: { threshold?: number; className?: string }) {
  const { scrollY } = useScroll();
  const isVisible = useTransform(scrollY, [0, threshold], [0, 1]);

  return (
    <motion.button
      className={cn(
        "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-arcade bg-arcade-bg-card border-2 border-arcade-accent-pink/30",
        "flex items-center justify-center text-arcade-accent-pink",
        "hover:bg-arcade-accent-pink hover:text-arcade-bg-deep hover:neon-glow-pink",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-bg-deep",
        "transition-all duration-300",
        className
      )}
      style={{ opacity: isVisible, pointerEvents: isVisible }}
      whileHover={{ scale: 1.1, rotate: -180 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  );
}

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 h-1 z-50 bg-arcade-bg-elevated", className)}
      style={{ height }}
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-arcade-accent-pink via-arcade-accent-blue to-arcade-accent-green"
        style={{ width: height, transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export function ScrollIndicator({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className={cn("fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4", className)} aria-hidden="true">
      <div className="relative w-1 h-32 bg-arcade-bg-elevated rounded-full overflow-hidden">
        <motion.div className="absolute left-0 top-0 w-full bg-gradient-to-b from-arcade-accent-pink to-arcade-accent-blue" style={{ height: y }} />
      </div>
      <div className="font-mono text-xs text-arcade-fg-muted uppercase tracking-wider writing-mode-vertical-tb">
        SCROLL
      </div>
    </div>
  );
}