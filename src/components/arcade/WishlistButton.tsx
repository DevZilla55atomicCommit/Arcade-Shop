"use client";

import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

interface WishlistButtonProps {
  gameId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WishlistButton({ gameId, className, size = "md" }: WishlistButtonProps) {
  const { toggleItem, isInWishlist, state } = useWishlist();
  const inWishlist = isInWishlist(gameId);

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <motion.button
      onClick={() => toggleItem(gameId)}
      className={cn(
        "relative rounded-pixel transition-all duration-300",
        "bg-arcade-bg-elevated border border-arcade-fg-muted/20",
        "hover:border-arcade-accent-pink hover:neon-glow-pink",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-bg-deep",
        sizeClasses[size],
        className
      )}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={inWishlist}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: inWishlist ? 1.1 : 1 }}
      animate={{ scale: inWishlist ? 1.1 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <svg
        className={cn(iconSizes[size], inWishlist ? "text-arcade-accent-pink fill-current" : "text-arcade-fg-muted") }
        fill={inWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <motion.span
        className="absolute -top-1 -right-1 w-4 h-4 bg-arcade-accent-pink text-[10px] font-mono rounded-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: inWishlist ? 1 : 0, scale: inWishlist ? 1 : 0 }}
      >
        {state.items.length > 0 && state.items.length <= 99 ? state.items.length : "99+"}
      </motion.span>
    </motion.button>
  );
}

export function WishlistToggle({ gameId, className }: { gameId: string; className?: string }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(gameId);

  return (
    <button
      onClick={() => toggleItem(gameId)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all",
        inWishlist
          ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
          : "bg-transparent text-arcade-fg-muted border-2 border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink",
        className
      )}
    >
      <svg className="w-4 h-4" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {inWishlist ? "IN WISHLIST" : "ADD TO WISHLIST"}
    </button>
  );
}