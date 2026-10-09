"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScanlinesProps {
  intensity?: number;
  speed?: number;
  className?: string;
}

export function Scanlines({ intensity = 0.1, speed = 0, className }: ScanlinesProps) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-20", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0, 0, 0, ${intensity}), rgba(0, 0, 0, ${intensity}) 1px, transparent 1px, transparent 3px)`,
        backgroundSize: "100% 4px",
        opacity: 0.06,
        animation: speed > 0 ? `scanlines-move ${speed}s linear infinite` : "none",
      }}
      aria-hidden="true"
    />
  );
}

export function RGBShift({ intensity = 2, className }: { intensity?: number; className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-25", className)}
      style={{
        background: `
          linear-gradient(90deg, rgba(255, 0, 110, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57, 255, 20, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: `${intensity}px ${intensity}px`,
        opacity: 0.3,
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}

export function Vignette({ intensity = 0.4, className }: { intensity?: number; className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-15", className)}
      style={{
        boxShadow: `inset 0 0 ${200 * intensity}px ${100 * intensity}px rgba(0, 0, 0, ${intensity})`,
      }}
      aria-hidden="true"
    />
  );
}

export function PixelGrid({ size = 40, color = "rgba(255, 0, 110, 0.03)", className }: { size?: number; color?: string; className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-10", className)}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  );
}

export function VisualEffects({
  children,
  scanlines = true,
  rgbShift = false,
  vignette = true,
  pixelGrid = false,
  className,
}: {
  children: React.ReactNode;
  scanlines?: boolean;
  rgbShift?: boolean;
  vignette?: boolean;
  pixelGrid?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {scanlines && <Scanlines />}
      {rgbShift && <RGBShift />}
      {vignette && <Vignette />}
      {pixelGrid && <PixelGrid />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}