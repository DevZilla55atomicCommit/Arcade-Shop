"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "game" | "feature" | "testimonial" | "category";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      padding = "md",
      border = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "relative rounded-arcade overflow-hidden transition-all duration-300";

    const variantStyles = {
      default: "bg-arcade-bg-card card-glow",
      game: "bg-arcade-bg-card card-glow group",
      feature: "bg-arcade-bg-elevated/50 backdrop-blur-xl border border-arcade-accent-pink/20",
      testimonial: "bg-arcade-bg-card card-glow border-l-4 border-arcade-accent-pink",
      category: "bg-arcade-bg-card card-glow aspect-square",
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverStyles = hover
      ? "hover:card-glow-hover hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,0,110,0.15)]"
      : "";

    const borderStyles = border ? "border border-arcade-accent-pink/10" : "";

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], paddingStyles[padding], hoverStyles, borderStyles, className)}
        whileHover={hover ? { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export const GameCard = ({
  game,
  className,
  onClick,
}: {
  game: {
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
  };
  className?: string;
  onClick?: () => void;
}) => {
  const hasDiscount = game.discount && game.discount > 0;
  const displayPrice = hasDiscount && game.originalPrice ? game.originalPrice : game.price;

  return (
    <Card variant="game" className={cn("group cursor-pointer", className)} onClick={onClick}>
      <div className="relative aspect-[16/10] overflow-hidden bg-arcade-bg-elevated">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2 py-1 text-xs font-mono font-bold text-arcade-bg-deep bg-arcade-accent-green rounded-pixel animate-neon-pulse">
              -{game.discount}%
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <button className="p-2 bg-arcade-bg-deep/80 backdrop-blur-sm rounded-pixel text-arcade-fg-muted hover:text-arcade-accent-pink hover:neon-glow-pink transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-arcade-bg-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-[10px] font-mono uppercase text-arcade-accent-pink bg-arcade-accent-pink/10 rounded-pixel">
            {game.category}
          </span>
          <div className="flex items-center gap-1 ml-auto">
            {game.platforms.slice(0, 3).map((platform) => (
              <span key={platform} className="w-5 h-5 bg-arcade-bg-elevated rounded-pixel flex items-center justify-center">
                <svg className="w-3 h-3 text-arcade-fg-muted" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </span>
            ))}
            {game.platforms.length > 3 && (
              <span className="w-5 h-5 bg-arcade-bg-elevated rounded-pixel flex items-center justify-center text-[10px] font-mono text-arcade-fg-muted">
                +{game.platforms.length - 3}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-display text-heading-sm text-arcade-fg-primary mb-2 group-hover:text-arcade-accent-pink transition-colors line-clamp-1">
          {game.title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-arcade-accent-yellow" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-body-sm font-medium text-arcade-fg-primary">{game.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-baseline gap-1">
            {hasDiscount ? (
              <>
                <span className="text-heading-sm font-bold text-arcade-accent-green">${game.price.toFixed(2)}</span>
                <span className="text-body-sm text-arcade-fg-muted line-through">${displayPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-heading-sm font-bold text-arcade-fg-primary">${game.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export const FeatureCard = ({
  icon,
  title,
  description,
  color = "pink",
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: "pink" | "blue" | "green" | "yellow" | "purple";
  className?: string;
}) => {
  const colorStyles = {
    pink: "border-arcade-accent-pink/20 hover:border-arcade-accent-pink/50",
    blue: "border-arcade-accent-blue/20 hover:border-arcade-accent-blue/50",
    green: "border-arcade-accent-green/20 hover:border-arcade-accent-green/50",
    yellow: "border-arcade-accent-yellow/20 hover:border-arcade-accent-yellow/50",
    purple: "border-arcade-accent-purple/20 hover:border-arcade-accent-purple/50",
  };

  return (
    <Card variant="feature" className={cn(colorStyles[color], className)} padding="lg">
      <div className="w-12 h-12 rounded-arcade bg-arcade-accent-{color}/10 flex items-center justify-center mb-4 text-arcade-accent-{color}".replace(/{color}/g, color)>
        {icon}
      </div>
      <h3 className="font-display text-heading-md text-arcade-fg-primary mb-2">{title}</h3>
      <p className="text-body-md text-arcade-fg-muted leading-relaxed">{description}</p>
    </Card>
  );
};

export const CategoryCard = ({
  category,
  className,
  onClick,
}: {
  category: {
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: string;
    gameCount: number;
    color: string;
    gradient: string;
  };
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Card variant="category" className={cn("relative cursor-pointer overflow-hidden", className)} onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-arcade-bg-card to-arcade-bg-elevated" />
      <div className="absolute inset-0 bg-[{gradient}] opacity-10".replace("{gradient}", category.gradient) />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <div className="w-16 h-16 rounded-arcade-lg bg-arcade-bg-deep/50 backdrop-blur-sm flex items-center justify-center mb-4 border border-arcade-accent-pink/20">
          <svg className="w-8 h-8" style={{ color: category.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-display text-heading-md text-arcade-fg-primary mb-1">{category.name}</h3>
        <p className="text-body-sm text-arcade-fg-muted mb-2 line-clamp-2">{category.description}</p>
        <div className="flex items-center gap-1 text-caption text-arcade-accent-pink font-mono">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>{category.gameCount} games</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-{color} to-transparent".replace(/{color}/g, category.color) />
    </Card>
  );
};