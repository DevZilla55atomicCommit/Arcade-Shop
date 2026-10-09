import { describe, it, expect } from "vitest";
import { cn, formatPrice, slugify, truncate, debounce, throttle, clamp, lerp, mapRange } from "@/lib/utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("handles conditional classes", () => {
    expect(cn("a", true && "b", false && "c")).toBe("a b");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
  });
});

describe("formatPrice", () => {
  it("formats USD prices", () => {
    expect(formatPrice(19.99)).toBe("$19.99");
    expect(formatPrice(0)).toBe("$0.00");
    expect(formatPrice(100)).toBe("$100.00");
  });

  it("handles different currencies", () => {
    expect(formatPrice(19.99, "EUR")).toContain("€");
    expect(formatPrice(19.99, "GBP")).toContain("£");
  });
});

describe("slugify", () => {
  it("creates valid slugs", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("Neon Drifter!")).toBe("neon-drifter");
    expect(slugify("  spaces  ")).toBe("spaces");
  });
});

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
    expect(truncate("Hi", 10)).toBe("Hi");
  });
});

describe("clamp", () => {
  it("clamps values", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe("lerp", () => {
  it("linear interpolates", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 100, 0.25)).toBe(25);
  });
});

describe("mapRange", () => {
  it("maps ranges", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, -1, 1, 0, 1)).toBe(0.5);
  });
});

describe("debounce", () => {
  it("delays function calls", async () => {
    let count = 0;
    const fn = debounce(() => count++, 50);
    fn();
    fn();
    fn();
    expect(count).toBe(0);
    await new Promise((r) => setTimeout(r, 100));
    expect(count).toBe(1);
  });
});

describe("throttle", () => {
  it("limits function calls", async () => {
    let count = 0;
    const fn = throttle(() => count++, 50);
    fn();
    fn();
    fn();
    expect(count).toBe(1);
    await new Promise((r) => setTimeout(r, 100));
    fn();
    expect(count).toBe(2);
  });
});