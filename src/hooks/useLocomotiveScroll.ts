"use client";

import { useEffect, useRef, useCallback } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LocomotiveScrollOptions {
  el?: HTMLElement;
  smooth?: boolean;
  smoothMobile?: boolean;
  direction?: "vertical" | "horizontal";
  lerp?: number;
  multiplier?: number;
  class?: string;
  scrollbarClass?: string;
  scrollingClass?: string;
  draggingClass?: string;
  smoothClass?: string;
  initClass?: string;
  getSpeed?: boolean;
  getDirection?: boolean;
  scrollFromAnywhere?: boolean;
  tablet?: {
    smooth?: boolean;
    breakpoint?: number;
  };
  smartphone?: {
    smooth?: boolean;
    breakpoint?: number;
  };
}

let locomotiveScrollInstance: LocomotiveScroll | null = null;

export function useLocomotiveScroll(options: LocomotiveScrollOptions = {}) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const initialized = useRef(false);

  const defaultOptions: LocomotiveScrollOptions = {
    el: undefined,
    smooth: true,
    smoothMobile: false,
    direction: "vertical",
    lerp: 0.08,
    multiplier: 1,
    class: "is-reveal",
    scrollbarClass: "c-scrollbar",
    scrollingClass: "is-scrolling",
    draggingClass: "is-dragging",
    smoothClass: "has-scroll-smooth",
    initClass: "has-scroll-init",
    getSpeed: true,
    getDirection: true,
    scrollFromAnywhere: true,
    tablet: {
      smooth: true,
      breakpoint: 1024,
    },
    smartphone: {
      smooth: false,
      breakpoint: 768,
    },
  };

  const init = useCallback(() => {
    if (initialized.current || typeof window === "undefined") return;

    const element = scrollRef.current || document.querySelector("[data-scroll-container]") as HTMLElement;
    if (!element) return;

    const mergedOptions = { ...defaultOptions, ...options, el: element };

    locomotiveScrollInstance = new LocomotiveScroll(mergedOptions);

    locomotiveScrollInstance.on("scroll", (instance: any) => {
      ScrollTrigger.update();
    });

    locomotiveScrollInstance.on("call", (func: string, ...args: any[]) => {
      if (func === "trigger") {
        const [element, direction] = args;
        if (element) {
          const event = new CustomEvent("scrollTrigger", {
            detail: { element, direction },
          });
          window.dispatchEvent(event);
        }
      }
    });

    setTimeout(() => {
      locomotiveScrollInstance?.update();
      ScrollTrigger.refresh();
    }, 100);

    initialized.current = true;

    return () => {
      locomotiveScrollInstance?.destroy();
      locomotiveScrollInstance = null;
      initialized.current = false;
    };
  }, [options]);

  const update = useCallback(() => {
    locomotiveScrollInstance?.update();
    ScrollTrigger.refresh();
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement | number, options: { offset?: number; duration?: number; easing?: number[] } = {}) => {
      if (!locomotiveScrollInstance) return;

      if (typeof target === "number") {
        locomotiveScrollInstance.scrollTo(target, options);
      } else if (typeof target === "string") {
        const element = document.querySelector(target);
        if (element) {
          locomotiveScrollInstance.scrollTo(element, options);
        }
      } else {
        locomotiveScrollInstance.scrollTo(target, options);
      }
    },
    []
  );

  const getInstance = useCallback(() => locomotiveScrollInstance, []);

  const destroy = useCallback(() => {
    if (locomotiveScrollInstance) {
      locomotiveScrollInstance.destroy();
      locomotiveScrollInstance = null;
      initialized.current = false;
    }
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return {
    scrollRef,
    init,
    update,
    scrollTo,
    getInstance,
    destroy,
  };
}

export function getLocomotiveScroll() {
  return locomotiveScrollInstance;
}

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  const { scrollRef } = useLocomotiveScroll();

  return <div ref={scrollRef} data-scroll-container className="relative z-10">{children}</div>;
}

export function ScrollSection({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return <div data-scroll-section {...props}>{children}</div>;
}

export function ScrollElement({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return <div data-scroll {...props}>{children}</div>;
}

export function ScrollDirection({ children }: { children: (direction: "up" | "down") => React.ReactNode }) {
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    if (!locomotiveScrollInstance) return;

    const handleScroll = (instance: any) => {
      setDirection(instance.direction === "down" ? "down" : "up");
    };

    locomotiveScrollInstance.on("scroll", handleScroll);
    return () => locomotiveScrollInstance?.off("scroll", handleScroll);
  }, []);

  return <>{children(direction)}</>;
}

import { useState } from "react";