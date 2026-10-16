import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const pixelBounce: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const neonPulse: Variants = {
  initial: { opacity: 1, filter: "brightness(1)" },
  animate: {
    opacity: [1, 0.7, 1],
    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const neonFlicker: Variants = {
  animate: {
    opacity: [1, 1, 0.3, 1, 1, 0.3, 1],
    transition: { duration: 0.15, repeat: Infinity, ease: "linear" },
  },
};

export const float: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export const marquee: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

export const scrollReveal = (
  element: Element | string,
  options: {
    y?: number;
    x?: number;
    scale?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
  } = {}
) => {
  const {
    y = 40,
    x = 0,
    scale = 1,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    ease = "power2.out",
    stagger = 0,
  } = options;

  const elements = typeof element === "string" ? document.querySelectorAll(element) : [element];

  gsap.fromTo(
    elements,
    { y, x, scale, opacity, force3D: true },
    {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const scrollParallax = (
  element: Element | string,
  options: {
    yPercent?: number;
    xPercent?: number;
    speed?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const { yPercent = 50, xPercent = 0, speed = 1, start = "top bottom", end = "bottom top", scrub = true } = options;

  const elements = typeof element === "string" ? document.querySelectorAll(element) : [element];

  gsap.to(elements, {
    yPercent: yPercent * speed,
    xPercent: xPercent * speed,
    ease: "none",
    scrollTrigger: {
      trigger: elements[0],
      start,
      end,
      scrub,
    },
  });
};

export const scrollPin = (
  element: Element | string,
  options: {
    pin?: boolean;
    pinSpacing?: boolean;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) => {
  const { pin = true, pinSpacing = true, start = "top top", end = "bottom bottom", scrub = 1, ...callbacks } = options;

  const elements = typeof element === "string" ? document.querySelectorAll(element) : [element];

  gsap.to(elements, {
    ease: "none",
    scrollTrigger: {
      trigger: elements[0],
      start,
      end,
      pin,
      pinSpacing,
      scrub,
      ...callbacks,
    },
  });
};

export const textReveal = (
  element: Element | string,
  options: {
    type?: "chars" | "words" | "lines";
    delay?: number;
    duration?: number;
    ease?: string;
    stagger?: number;
    from?: { opacity: number; y: number; rotateX?: number };
  } = {}
) => {
  const { type = "chars", delay = 0, duration = 0.5, ease = "power2.out", stagger = 0.03, from = { opacity: 0, y: 50 } } = options;

  const elements = typeof element === "string" ? document.querySelectorAll(element) : [element];

  elements.forEach((el) => {
    const text = el.textContent || "";
    el.innerHTML = "";

    const splitType = type === "chars" ? "" : type === "words" ? " " : "<br>";
    const parts = text.split(splitType);

    parts.forEach((part, i) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.textContent = part + (type === "lines" ? "" : type === "words" ? " " : "");
      el.appendChild(span);

      gsap.fromTo(
        span,
        { opacity: from.opacity, y: from.y, rotateX: from.rotateX || 0, force3D: true },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          delay: delay + i * stagger,
          ease,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });
};

export const magneticHover = (
  element: Element | string,
  options: { strength?: number; radius?: number } = {}
) => {
  const { strength = 0.3, radius = 100 } = options;
  const elements = typeof element === "string" ? Array.from(document.querySelectorAll(element)) : [element];

  (elements as HTMLElement[]).forEach((el: HTMLElement) => {
    let bounds: DOMRect;

    const updateBounds = () => {
      bounds = el.getBoundingClientRect();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) updateBounds();

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < radius) {
        gsap.to(el, { x: deltaX, y: deltaY, duration: 0.3, ease: "power2.out" });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", updateBounds);
    updateBounds();

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", updateBounds);
    };
  });
};

export const initScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};