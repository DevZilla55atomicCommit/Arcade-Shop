"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface GameFilterProps {
  categories: { slug: string; name: string; count: number }[];
  platforms: string[];
  selectedCategory: string | null;
  selectedPlatform: string | null;
  priceRange: [number, number];
  onCategoryChange: (category: string | null) => void;
  onPlatformChange: (platform: string | null) => void;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
  className?: string;
}

export function GameFilter({
  categories,
  platforms,
  selectedCategory,
  selectedPlatform,
  priceRange,
  onCategoryChange,
  onPlatformChange,
  onPriceChange,
  onReset,
  className,
}: GameFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("bg-arcade-bg-card rounded-arcade-lg card-glow p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-heading-md text-arcade-fg-primary">FILTERS</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          RESET ALL
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">CATEGORY</label>
          <div className="flex flex-wrap gap-2">
            <button
              role="button"
              aria-pressed={selectedCategory === null}
              onClick={() => onCategoryChange(null)}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-pixel transition-all",
                selectedCategory === null
                  ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
                  : "bg-transparent text-arcade-fg-muted border border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink"
              )}
            >
              ALL
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                role="button"
                aria-pressed={selectedCategory === cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  "px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-pixel transition-all",
                  selectedCategory === cat.slug
                    ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
                    : "bg-transparent text-arcade-fg-muted border border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">PLATFORM</label>
          <div className="flex flex-wrap gap-2">
            <button
              role="button"
              aria-pressed={selectedPlatform === null}
              onClick={() => onPlatformChange(null)}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-pixel transition-all",
                selectedPlatform === null
                  ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
                  : "bg-transparent text-arcade-fg-muted border border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink"
              )}
            >
              ALL
            </button>
            {platforms.map((platform) => (
              <button
                key={platform}
                role="button"
                aria-pressed={selectedPlatform === platform}
                onClick={() => onPlatformChange(platform)}
                className={cn(
                  "px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-pixel transition-all",
                  selectedPlatform === platform
                    ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
                    : "bg-transparent text-arcade-fg-muted border border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink"
                )}
              >
                {platform.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">
            PRICE RANGE <span className="text-arcade-accent-pink ml-2">${priceRange[0]} - ${priceRange[1]}</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
              className="flex-1 h-2 bg-arcade-bg-elevated rounded-lg appearance-none accent-arcade-accent-pink"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="flex-1 h-2 bg-arcade-bg-elevated rounded-lg appearance-none accent-arcade-accent-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";