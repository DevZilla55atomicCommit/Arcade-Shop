"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GameCard } from "@/components/ui/Card";

interface RelatedGamesProps {
  games: {
    id: string;
    slug: string;
    title: string;
    thumbnail: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    category: string;
    platforms: string[];
  }[];
  title?: string;
  className?: string;
}

export function RelatedGames({ games, title = "YOU MAY ALSO LIKE", className }: RelatedGamesProps) {
  if (games.length === 0) return null;

  return (
    <section className={cn("py-12", className)} aria-labelledby="related-title">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="related-title"
          className="font-display text-heading-lg text-arcade-fg-primary mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1 h-8 bg-arcade-accent-pink rounded-pixel" />
          {title}
        </motion.h2>
        <GameGrid games={games} columns={4} animate />
      </div>
    </section>
  );
}