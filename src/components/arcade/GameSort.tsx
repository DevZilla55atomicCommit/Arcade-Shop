"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface GameSortProps {
  selected: "newest" | "price-asc" | "price-desc" | "rating" | "popular";
  onChange: (sort: "newest" | "price-asc" | "price-desc" | "rating" | "popular") => void;
  className?: string;
}

const SORT_OPTIONS = [
  { value: "newest", label: "NEWEST" },
  { value: "price-asc", label: "PRICE: LOW TO HIGH" },
  { value: "price-desc", label: "PRICE: HIGH TO LOW" },
  { value: "rating", label: "HIGHEST RATED" },
  { value: "popular", label: "MOST POPULAR" },
] as const;

export function GameSort({ selected, onChange, className }: GameSortProps) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor="sort-select" className="sr-only">Sort games</label>
      <select
        id="sort-select"
        value={selected}
        onChange={(e) => onChange(e.target.value as any)}
        className={cn(
          "appearance-none bg-arcade-bg-card border-2 border-arcade-fg-muted/30",
          "text-arcade-fg-primary font-mono text-sm uppercase tracking-wider",
          "px-4 py-2 pr-10 rounded-pixel",
          "focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink",
          "hover:border-arcade-accent-pink/50"
        )}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-arcade-accent-pink">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export function SortDropdown({ selected, onChange, className }: GameSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-arcade-bg-card border-2 border-arcade-fg-muted/30",
          "text-arcade-fg-primary font-mono text-sm uppercase tracking-wider",
          "rounded-pixel transition-all",
          "focus:outline-none focus:border-arcade-accent-pink focus:neon-glow-pink",
          "hover:border-arcade-accent-pink/50"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{SORT_OPTIONS.find((o) => o.value === selected)?.label}</span>
        <motion.svg
          className="w-4 h-4 text-arcade-accent-pink"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-56 bg-arcade-bg-card border-2 border-arcade-accent-pink/30 rounded-arcade overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="listbox"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                role="option"
                aria-selected={selected === opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={cn(
                  "w-full px-4 py-3 text-left font-mono text-sm uppercase tracking-wider",
                  "transition-colors",
                  selected === opt.value
                    ? "bg-arcade-accent-pink/10 text-arcade-accent-pink"
                    : "text-arcade-fg-primary hover:bg-arcade-accent-pink/10 hover:text-arcade-accent-pink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from "react";