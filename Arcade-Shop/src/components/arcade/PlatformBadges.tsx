"use client";

import { cn } from "@/lib/utils";
import type { Platform } from "@/types";

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  pc: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  ps5: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M9 12l2 2 4-4"/></svg>,
  xbox: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>,
  switch: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h4M14 8h4M6 16h4M14 16h4"/></svg>,
  mobile: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  vr: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6"/><circle cx="12" cy="12" r="4"/></svg>,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  pc: "PC",
  ps5: "PlayStation 5",
  xbox: "Xbox Series X/S",
  switch: "Nintendo Switch",
  mobile: "Mobile",
  vr: "VR",
};

interface PlatformBadgesProps {
  platforms: Platform[];
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

export function PlatformBadges({ platforms, size = "md", showLabels = false, className }: PlatformBadgesProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label="Supported platforms">
      {platforms.map((platform) => (
        <span
          key={platform}
          className={cn(
            "inline-flex items-center justify-center rounded-pixel bg-arcade-bg-elevated border border-arcade-fg-muted/20",
            "text-arcade-fg-muted transition-all duration-200",
            "hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink",
            sizeClasses[size]
          )}
          title={PLATFORM_LABELS[platform]}
        >
          {PLATFORM_ICONS[platform]}
          {showLabels && <span className="ml-1">{PLATFORM_LABELS[platform]}</span>}
        </span>
      ))}
    </div>
  );
}

export function PlatformFilter({
  platforms,
  selected,
  onChange,
  className,
}: {
  platforms: Platform[];
  selected: Platform | null;
  onChange: (platform: Platform | null) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group" aria-label="Filter by platform">
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
      {platforms.map((platform) => (
        <button
          key={platform}
          role="button"
          aria-pressed={selected === platform}
          onClick={() => onChange(platform)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-pixel transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink",
            selected === platform
              ? "bg-arcade-accent-pink text-arcade-bg-deep neon-glow-pink"
              : "bg-transparent text-arcade-fg-muted border-2 border-arcade-fg-muted/30 hover:border-arcade-accent-pink hover:text-arcade-accent-pink hover:neon-glow-pink"
          )}
        >
          {PLATFORM_ICONS[platform]}
          {PLATFORM_LABELS[platform]}
        </button>
      ))}
    </div>
  );
}