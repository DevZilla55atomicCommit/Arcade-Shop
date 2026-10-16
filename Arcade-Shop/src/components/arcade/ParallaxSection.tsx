"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
  offset = 0,
}: ParallaxSectionProps) {
  const refEl = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: refEl, offset: ["start end", "end start"] });
  const y = useTransform(scrollY, [0, 1], [`${-offset * speed}px`, `${offset * speed}px`]);

  return (
    <motion.div
      ref={refEl}
      className={cn("relative overflow-hidden", className)}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  x = 0,
  scale = 1,
  opacity = 0,
  once = true,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  stagger = 0.1,
  delayChildren = 0,
  className,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 20 }: { children: React.ReactNode; className?: string; y?: number }) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}