"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelLoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "pink" | "blue" | "green" | "yellow" | "purple";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const colorClasses = {
  pink: "text-arcade-accent-pink",
  blue: "text-arcade-accent-blue",
  green: "text-arcade-accent-green",
  yellow: "text-arcade-accent-yellow",
  purple: "text-arcade-accent-purple",
};

export function PixelLoader({ size = "md", color = "pink", className }: PixelLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} role="status" aria-label="Loading">
      <motion.svg
        className={cn(sizeClasses[size], colorClasses[color], "animate-spin")}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="4" height="4" rx="1" className="opacity-30" />
        <rect x="18" y="2" width="4" height="4" rx="1" className="opacity-50" />
        <rect x="2" y="18" width="4" height="4" rx="1" className="opacity-70" />
        <rect x="18" y="18" width="4" height="4" rx="1" />
        <motion.rect
          x="8"
          y="8"
          width="8"
          height="8"
          rx="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

export function ArcadeSpinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)} role="status" aria-label="Loading">
      <motion.div
        className={cn(
          "relative rounded-full border-4 border-arcade-fg-muted/20",
          size === "sm" && "w-6 h-6",
          size === "md" && "w-10 h-10",
          size === "lg" && "w-16 h-16"
        )}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-arcade-accent-pink border-t-transparent animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-arcade-accent-blue border-b-transparent animate-spin"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border-1 border-arcade-accent-green border-l-transparent animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-arcade-bg-deep" role="status" aria-label="Page loading">
      <div className="text-center">
        <ArcadeSpinner size="lg" />
        <p className="mt-6 font-mono text-sm text-arcade-fg-muted uppercase tracking-wider">LOADING GAME DATA...</p>
        <motion.div
          className="mt-4 flex items-center justify-center gap-1"
          animate={{ x: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="w-2 h-2 rounded-full bg-arcade-accent-pink animate-neon-pulse" style={{ animationDelay: "0s" }} />
          <span className="w-2 h-2 rounded-full bg-arcade-accent-blue animate-neon-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 rounded-full bg-arcade-accent-green animate-neon-pulse" style={{ animationDelay: "0.4s" }} />
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-caption font-mono text-arcade-fg-muted/50">
        INITIALIZING ARCADE SYSTEM...
      </div>
    </div>
  );
}