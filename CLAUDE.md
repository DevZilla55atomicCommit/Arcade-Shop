# Gaming Store — Arcade Theme

**Project Type:** Next.js 15 + TypeScript + Tailwind v4 + GSAP + Framer Motion
**Theme:** Retro Arcade / Neon Cyberpunk

---

## Project Overview

Build a smooth-scroll gaming store website with professional animations, arcade aesthetic, and neon color palette. The site features:
- Hero with animated arcade cabinet + particle effects
- Product grid with hover/tap reveal animations
- Smooth scroll with Locomotive Scroll or GSAP ScrollTrigger
- Page transitions with Barba.js or Framer Motion
- 3D background elements with Three.js / React Three Fiber
- Arcade sound effects on interaction (optional, muted by default)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 (@theme) |
| Smooth Scroll | Locomotive Scroll + GSAP ScrollTrigger |
| Animations | Framer Motion (UI), GSAP (scroll-driven), Three.js/R3F (3D) |
| 3D | React Three Fiber + Drei |
| Page Transitions | Barba.js v2 or Framer Motion AnimatePresence |
| Icons | Lucide React |
| Fonts | Space Grotesk (headings), JetBrains Mono (code/mono), Outfit (body) |

---

## Design System (Arcade Theme)

### Color Palette
```css
:root {
  --bg-deep: #0a0a0f;
  --bg-elevated: #12121a;
  --bg-card: #1a1a24;
  --fg-primary: #f0f0f5;
  --fg-muted: #8b8b9a;
  --accent-neon-pink: #ff006e;
  --accent-neon-blue: #00d4ff;
  --accent-neon-green: #39ff14;
  --accent-neon-yellow: #ffea00;
  --accent-neon-purple: #bc13fe;
  --border-glow: #ff006e;
  --glow-pink: rgba(255, 0, 110, 0.4);
  --glow-blue: rgba(0, 212, 255, 0.4);
  --glow-green: rgba(57, 255, 20, 0.4);
}
```

### Typography
- **Display/Headings:** Space Grotesk (variable, 300-700)
- **Body:** Outfit (variable, 300-600)
- **Mono/Code:** JetBrains Mono (variable, 400-700)

### Motion Dials (UI/UX Pro Max)
- **Variance:** 8 (bold, asymmetric)
- **Motion:** 9 (complex choreography, scroll-driven)
- **Density:** 4 (standard spacing)

---

## Phase Plan

### Phase 1: Foundation & Config
- [ ] Project structure + config files
- [ ] Tailwind v4 theme with arcade tokens
- [ ] Global CSS with CSS variables, font imports, base styles
- [ ] TypeScript strict config
- [ ] ESLint + Prettier

### Phase 2: Core UI Components
- [ ] Button (arcade variants: neon, pixel, ghost)
- [ ] Card (product, feature, testimonial)
- [ ] Navbar (sticky, scroll-aware, neon glow)
- [ ] Footer (arcade marquee style)
- [ ] Loading states (skeleton, arcade spinner)

### Phase 3: Animation & Scroll System
- [ ] Locomotive Scroll provider
- [ ] GSAP ScrollTrigger setup
- [ ] Framer Motion variants library
- [ ] Scroll-driven animations (reveal, parallax, pin)
- [ ] Page transition wrapper

### Phase 4: 3D & Visual Effects
- [ ] Three.js scene (arcade grid floor, floating particles)
- [ ] React Three Fiber canvas component
- [ ] Neon tube geometry
- [ ] Pixel particle system
- [ ] CRT scanline shader (optional)

### Phase 5: Pages & Features
- [ ] Home (hero, featured games, categories, newsletter)
- [ ] Shop (filterable grid, infinite scroll, quick view)
- [ ] Product Detail (gallery, specs, reviews, add to cart)
- [ ] Cart / Checkout (arcade UI)
- [ ] About / Contact

### Phase 6: Polish & Performance
- [ ] Image optimization (next/image, WebP/AVIF)
- [ ] Font subsetting + preload
- [ ] Bundle analysis
- [ ] Lighthouse > 90
- [ ] Reduced motion support
- [ ] Accessibility audit (WCAG AA)

---

## Key Files for Claude Code

| File | Purpose |
|------|---------|
| `src/lib/animations.ts` | GSAP/Framer variants, scroll triggers |
| `src/lib/three-scene.ts` | R3F scene setup, arcade shaders |
| `src/components/arcade/` | Arcade-specific components |
| `src/hooks/useScroll.ts` | Locomotive/GSAP scroll hooks |
| `src/hooks/useAnimation.ts` | Framer Motion helpers |
| `src/styles/arcade.css` | Arcade-specific utilities |

---

## Important Notes for Claude Code

1. **Never mix GSAP/Three.js with Framer Motion in the same component tree** — isolate them
2. **Use Framer Motion for UI/Bento interactions**, GSAP/Three.js EXCLUSIVELY for full-page scrolltelling or 3D
3. **All animations must respect `prefers-reduced-motion`**
4. **Images:** Use `next/image` with WebP/AVIF, proper sizes, priority on hero
5. **Fonts:** Preload variable fonts, subset for Latin only
6. **Performance:** Memoize perpetual motion components, isolate in Client Components
7. **Arcade aesthetic:** Scanlines, pixel borders, neon glows, CRT curvature (subtle)

---

## Asset Requirements

Download these to `public/images/`:
- Arcade cabinet hero image (or generate with AI)
- Game cover art placeholders (16:9)
- Neon tube textures
- Pixel particle sprites
- CRT overlay texture
- Background grid texture

Use `web-image-downloader` skill for batch downloads.

---

## Commands

```bash
# Dev
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run typecheck

# Test
npm run test
npm run test:e2e
```