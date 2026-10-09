"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GAME_CATEGORIES } from "@/config/site";

interface CategoryTabsProps {
  activeCategory: string | null;
  onChange: (category: string | null) => void;
  className?: string;
  variant?: "pills" | "underline" | "neon";
}

export function CategoryTabs({
  activeCategory,
  onChange,
  className,
  variant = "neon",
}: CategoryTabsProps) {
  const categories = [null, ...GAME_CATEGORIES];

  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="tablist" aria-label="Game categories">
      {categories.map((cat) => (
        <motion.button
          key={cat?.slug || "all"}
          role="tab"
          aria-selected={activeCategory === (cat?.slug || null)}
          onClick={() => onChange(cat?.slug || null)}
          className={cn(
            "px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-bg-deep",
            activeCategory === (cat?.slug || null)
              ? variant === "neon"
                ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
                : variant === "pills"
                ? "bg-arcade-accent-pink text-arcade-bg-deep"
                : "bg-transparent text-arcade-accent-pink border-2 border-arcade-accent-pink"
              : variant === "neon"
              ? "bg-transparent text-arcade-fg-muted border-2 border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink"
              : variant === "pills"
              ? "bg-arcade-bg-card text-arcade-fg-muted hover:text-arcade-accent-pink"
              : "bg-transparent text-arcade-fg-muted hover:text-arcade-accent-pink border-b-2 border-transparent hover:border-arcade-accent-pink"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: GAME_CATEGORIES.indexOf(cat as any) * 0.05 }}
        >
          {cat ? cat.name : "ALL GAMES"}
        </motion.button>
      ))}
    </div>
  );
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
  className,
}: {
  categories: { slug: string; name: string; count: number }[];
  selected: string | null;
  onChange: (slug: string | null) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group" aria-label="Filter by category">
      <button
        role="button"
        aria-pressed={selected === null}
        onClick={() => onChange(null)}
        className={cn(
          "px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink",
          selected === null
            ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
            : "bg-transparent text-arcade-fg-muted border-2 border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink"
        )}
      >
        ALL
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          role="button"
          aria-pressed={selected === cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            "px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink",
            selected === cat.slug
              ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
              : "bg-transparent text-arcade-fg-muted border-2 border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink"
          )}
        >
          {cat.name} <span className="text-arcade-fg-muted/50">({cat.count})</span>
        </button>
      ))}
    </div>
  );
}