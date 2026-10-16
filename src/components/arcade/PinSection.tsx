"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface PinSectionProps {
  children: React.ReactNode;
  height?: number;
  start?: string;
  end?: string;
  className?: string;
}

export function PinSection({
  children,
  height = 300,
  start = "top top",
  end = "bottom bottom",
  className,
}: PinSectionProps) {
  const ref = motion.div;
  const { scrollYProgress } = useScroll({ target: ref, offset: [start, end] });

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ height: `${height}vh` }}
    >
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface PinLayerProps {
  children: React.ReactNode;
  start?: number;
  end?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  className?: string;
}

export function PinLayer({
  children,
  start = 0,
  end = 1,
  y = 0,
  opacity = 1,
  scale = 1,
  rotate = 0,
  className,
}: PinLayerProps) {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [start, end], [0, y]);
  const opacityVal = useTransform(scrollYProgress, [start, end], [1, opacity]);
  const scaleVal = useTransform(scrollYProgress, [start, end], [1, scale]);
  const rotateVal = useTransform(scrollYProgress, [start, end], [0, rotate]);

  return (
    <motion.div
      className={cn("absolute inset-0 flex items-center justify-center", className)}
      style={{ y: yPos, opacity: opacityVal, scale: scaleVal, rotate: rotateVal }}
    >
      {children}
    </motion.div>
  );
}