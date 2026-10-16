import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: {
            deep: "#0a0a0f",
            elevated: "#12121a",
            card: "#1a1a24",
          },
          fg: {
            primary: "#f0f0f5",
            muted: "#8b8b9a",
          },
          accent: {
            pink: "#ff006e",
            blue: "#00d4ff",
            green: "#39ff14",
            yellow: "#ffea00",
            purple: "#bc13fe",
          },
          border: {
            glow: "#ff006e",
          },
          glow: {
            pink: "rgba(255, 0, 110, 0.4)",
            blue: "rgba(0, 212, 255, 0.4)",
            green: "rgba(57, 255, 20, 0.4)",
            yellow: "rgba(255, 234, 0, 0.4)",
            purple: "rgba(188, 19, 254, 0.4)",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", fontWeight: "600" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "600" }],
        "heading-xl": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-lg": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-md": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.35", fontWeight: "600" }],
        "heading-sm": ["clamp(1.125rem, 1.5vw, 1.25rem)", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "caption": ["0.75rem", { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.05em" }],
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-12": "48px",
        "space-16": "64px",
        "space-20": "80px",
        "space-24": "96px",
        "space-32": "128px",
      },
      borderRadius: {
        "pixel": "2px",
        "pixel-lg": "4px",
        "arcade": "6px",
        "arcade-lg": "12px",
      },
      boxShadow: {
        "neon-pink": "0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3), 0 0 60px rgba(255, 0, 110, 0.1)",
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)",
        "neon-green": "0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3), 0 0 60px rgba(57, 255, 20, 0.1)",
        "neon-purple": "0 0 20px rgba(188, 19, 254, 0.5), 0 0 40px rgba(188, 19, 254, 0.3), 0 0 60px rgba(188, 19, 254, 0.1)",
        "neon-yellow": "0 0 20px rgba(255, 234, 0, 0.5), 0 0 40px rgba(255, 234, 0, 0.3), 0 0 60px rgba(255, 234, 0, 0.1)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 0, 110, 0.1)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 0, 110, 0.3), 0 0 40px rgba(255, 0, 110, 0.1)",
      },
      backgroundImage: {
        "arcade-grid": "linear-gradient(rgba(255, 0, 110, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 110, 0.03) 1px, transparent 1px)",
        "arcade-grid-blue": "linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)",
        "scanlines": "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 3px)",
        "crt-curve": "radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.3) 100%)",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
        "grid-80": "80px 80px",
        "scanlines": "100% 4px",
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "neon-flicker": "neon-flicker 0.15s infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pixel-bounce": "pixel-bounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.7", filter: "brightness(1.2)" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.3" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pixel-bounce": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      transitionDuration: {
        "fast": "150ms",
        "normal": "250ms",
        "slow": "350ms",
        "slower": "500ms",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;