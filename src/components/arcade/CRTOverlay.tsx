"use client";

import { cn } from "@/lib/utils";

interface CRTOverlayProps {
  intensity?: number;
  className?: string;
}

export function CRTOverlay({ intensity = 0.1, className }: CRTOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-40",
        className
      )}
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0, 0, 0, ${intensity}), rgba(0, 0, 0, ${intensity}) 1px, transparent 1px, transparent 3px)`,
        backgroundSize: "100% 4px",
        opacity: 0.08,
      }}
      aria-hidden="true"
    />
  );
}

export function CRTCurvature({ intensity = 0.3, className }: { intensity?: number; className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-30", className)}
      style={{
        background: `radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, ${intensity}) 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

export function CRTGlare({ className }: { className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-35", className)}
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

export function CRTNoise({ intensity = 0.02, className }: { intensity?: number; className?: string }) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-45", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${intensity}'/%3E%3C/svg%3E")`,
        opacity: 0.5,
      }}
      aria-hidden="true"
    />
  );
}

export function CRTMonitor({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-arcade-lg", className)}>
      <div className="relative z-10">{children}</div>
      <CRTOverlay intensity={0.12} />
      <CRTCurvature intensity={0.25} />
      <CRTGlare />
      <CRTNoise intensity={0.015} />
    </div>
  );
}