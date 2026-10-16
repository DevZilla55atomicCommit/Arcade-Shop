"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  paused?: boolean;
  direction?: "left" | "right";
  className?: string;
}

export function NeonMarquee({
  children,
  speed = 20,
  paused = false,
  direction = "left",
  className,
}: NeonMarqueeProps) {
  const distance = direction === "left" ? "-50%" : "50%";

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} aria-hidden="true">
      <div
        className="inline-flex items-center gap-16"
        style={{
          animation: paused ? "none" : `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => !paused && (document.querySelector('[style*="marquee"]')?.style.setProperty("animation-play-state", "paused"))}
        onMouseLeave={() => !paused && (document.querySelector('[style*="marquee"]')?.style.setProperty("animation-play-state", "running"))}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export function MarqueeItem({ children, className, icon }: { children: React.ReactNode; className?: string; icon?: React.ReactNode }) {
  return (
    <span className={cn("flex-shrink-0 px-4 flex items-center gap-2", className)}>
      {icon && <span className="text-arcade-accent-pink animate-neon-pulse">{icon}</span>}
      <span className="font-mono text-sm uppercase tracking-wider text-arcade-fg-primary">{children}</span>
    </span>
  );
}

export function GameMarquee({ games }: { games: { title: string; discount?: number }[] }) {
  return (
    <NeonMarquee speed={30}>
      {games.map((game) => (
        <MarqueeItem key={game.title} icon={<span>⬢</span>}>
          {game.title} {game.discount && <span className="text-arcade-accent-green">-#{game.discount}%</span>}
        </MarqueeItem>
      ))}
    </NeonMarquee>
  );
}