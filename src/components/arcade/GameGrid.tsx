"use client";

import { motion } from "framer-motion";
import { GameCard } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface GameGridProps {
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
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: number;
  animate?: boolean;
}

export function GameGrid({
  games,
  className,
  columns = 4,
  gap = 6,
  animate = true,
}: GameGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  const gapClasses = {
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <motion.div
      className={cn("grid", columnClasses[columns], gapClasses[gap as keyof typeof gapClasses], className)}
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : false}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      role="list"
      aria-label="Game grid"
    >
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={animate ? { opacity: 0, y: 30 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          role="listitem"
        >
          <GameCard game={game} />
        </motion.div>
      ))}
      {games.length === 0 && (
        <div className="col-span-full text-center py-16">
          <svg className="w-16 h-16 mx-auto text-arcade-fg-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-display text-heading-md text-arcade-fg-primary mb-2">No games found</h3>
          <p className="text-body-md text-arcade-fg-muted">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </motion.div>
  );
}

export function GameGridSkeleton({ count = 12, columns = 4 }: { count?: number; columns?: 1 | 2 | 3 | 4 | 5 }) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`} role="list" aria-label="Game grid loading" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse" role="listitem">
          <div className="aspect-[16/10] bg-arcade-bg-elevated rounded-arcade mb-4" />
          <div className="h-4 bg-arcade-bg-elevated rounded-pixel w-3/4 mb-2" />
          <div className="h-4 bg-arcade-bg-elevated rounded-pixel w-1/2" />
        </div>
      ))}
    </div>
  );
}