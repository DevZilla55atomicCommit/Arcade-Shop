"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({ price, originalPrice, discount, size = "md", className }: PriceDisplayProps) {
  const hasDiscount = discount && discount > 0 && originalPrice && originalPrice > price;
  const displayOriginal = hasDiscount ? originalPrice : null;

  const sizeClasses = {
    sm: "text-body-sm",
    md: "text-heading-sm",
    lg: "text-heading-md",
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-bold tabular-nums", sizeClasses[size], hasDiscount ? "text-arcade-accent-green" : "text-arcade-fg-primary")}>
        {formatPrice(price)}
      </span>
      {displayOriginal && (
        <span className={cn("text-arcade-fg-muted line-through", sizeClasses[size])}>
          {formatPrice(displayOriginal)}
        </span>
      )}
      {hasDiscount && (
        <span className={cn("font-mono text-xs uppercase tracking-wider bg-arcade-accent-green text-arcade-bg-deep px-1.5 py-0.5 rounded-pixel animate-neon-pulse", size === "sm" && "text-[10px]")}>
          -{discount}%
        </span>
      )}
    </div>
  );
}

export function PriceRange({ min, max, size = "md", className }: { min: number; max: number; size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "text-body-sm",
    md: "text-heading-sm",
    lg: "text-heading-md",
  };

  return (
    <div className={cn("flex items-baseline gap-1", className)}>
      <span className={cn("font-bold tabular-nums text-arcade-accent-green", sizeClasses[size])}>
        {formatPrice(min)}
      </span>
      <span className={cn("text-arcade-fg-muted", sizeClasses[size])}>–</span>
      <span className={cn("font-bold tabular-nums text-arcade-fg-primary", sizeClasses[size])}>
        {formatPrice(max)}
      </span>
    </div>
  );
}