"use client";

import { useEffect } from "react";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { PageTransition } from "@/components/arcade/PageTransition";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Composes the three scroll/transition systems into one tree:
 *   Locomotive Scroll (smooth scroll)
 *   GSAP ScrollTrigger (reveal / parallax, opt-in per section)
 *   PageTransition (client-side page-change animation)
 *
 * All three are disabled automatically under prefers-reduced-motion, falling
 * back to native scrolling so the page stays usable.
 */
export function ScrollSystem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { scrollRef } = useLocomotiveScroll({ smooth: !reduce });

  // Measure ScrollTriggers once, after Locomotive has initialized and fonts are
  // laid out. Runs after the Locomotive effect above, so the instance exists.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  if (reduce) {
    return (
      <div ref={scrollRef} className={className}>
        <PageTransition>{children}</PageTransition>
      </div>
    );
  }

  return (
    <div ref={scrollRef} data-scroll-container className={className}>
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
