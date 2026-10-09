"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 100,
  className,
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const scale = useTransform(springX, [-radius, radius], [0.98, 1, 0.98]);
  const rotateX = useTransform(springY, [-radius, radius], [5, 0, -5]);
  const rotateY = useTransform(springX, [-radius, radius], [-5, 0, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider",
        "bg-transparent text-arcade-accent-pink border-2 border-arcade-accent-pink",
        "pixel-border overflow-hidden",
        "hover:bg-arcade-accent-pink hover:text-arcade-bg-deep hover:neon-glow-pink",
        "active:scale-[0.98]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-arcade-bg-deep",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
        scale,
        rotateX,
        rotateY,
        transformPerspective: 500,
      }}
    >
      {children}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-500 hover:translate-x-[100%]" aria-hidden="true" />
    </motion.button>
  );
}

export function MagneticCard({
  children,
  strength = 0.15,
  radius = 150,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(springY, [-radius, radius], [3, 0, -3]);
  const rotateY = useTransform(springX, [-radius, radius], [-3, 0, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn("relative bg-arcade-bg-card rounded-arcade card-glow overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}