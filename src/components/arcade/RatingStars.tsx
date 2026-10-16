"use client";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function RatingStars({ rating, max = 5, size = "md", showValue = false, interactive = false, onChange, className }: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const stars = Array.from({ length: max }, (_, i) => {
    const starValue = i + 1;
    const filled = rating >= starValue;
    const partial = !filled && rating > i && rating < starValue;
    const percent = partial ? (rating - i) * 100 : filled ? 100 : 0;

    return (
      <span key={i} className="relative">
        <svg className={cn(sizeClasses[size], "text-arcade-fg-muted/30")} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {percent > 0 && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${percent}%` }}>
            <svg className={cn(sizeClasses[size], "text-arcade-accent-yellow")} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        )}
      </span>
    );
  });

  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`${rating} out of ${max} stars`}>
      {interactive ? (
        stars.map((star, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => onChange?.(i + 1)}
            className="p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-bg-deep"
            aria-label={`${i + 1} star${i + 1 !== 1 ? "s" : ""}`}
          >
            {star}
          </button>
        ))
      ) : (
        stars
      )}
      {showValue && (
        <span className="ml-2 font-mono text-sm text-arcade-fg-primary tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function RatingDistribution({ ratings }: { ratings: { stars: number; count: number; percentage: number }[] }) {
  const total = ratings.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-2" role="img" aria-label="Rating distribution">
      {ratings.map((r) => (
        <div key={r.stars} className="flex items-center gap-3">
          <span className="font-mono text-sm text-arcade-fg-primary w-8 text-right">{r.stars}</span>
          <span className="text-arcade-accent-yellow">{"★".repeat(r.stars)}</span>
          <div className="flex-1 h-2 bg-arcade-bg-elevated rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-arcade-accent-yellow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${r.percentage}%` }}
              transition={{ duration: 0.8, delay: r.stars * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="font-mono text-sm text-arcade-fg-muted w-16 text-right">{r.count} ({r.percentage}%)</span>
        </div>
      ))}
    </div>
  );
}

import { motion } from "framer-motion";