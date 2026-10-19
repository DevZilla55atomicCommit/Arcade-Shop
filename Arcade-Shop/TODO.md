# Arcade-Shop — Project Task List

**Project root:** `/Volumes/Samsung LED/Game Store/Arcade-Shop`
**Branch:** `feat/build-setup` (branch-per-feature; never push `main` directly)

> Status: **Build green + catalog wired end-to-end.** 36 arcade components, 5 contexts, 6
> lib files, 27 route dirs, 26 routes all prerender. Core pages are wired to the data
> layer (shop, cart, wishlist, categories, best-sellers, top-rated, sale, new-releases,
> product detail) and the animation/scroll systems are wired into the root layout. The
> real remaining work is **page content** (Phase 3) and **polish/perf** (Phase 4).
>
> **Latest commit (7d59af2):** interactive components wired into pages (product action bar,
> wishlist share+related, account library, contact cookie banner) and a new multi-step
> `/cart/checkout` flow (shipping → payment → review → done). Fixed `ShareButton` prerender
> crash (`document.title` at module scope → guarded with `typeof document`).

> **Build fix log:** the production build failed repeatedly with `ReferenceError: document
> is not defined` at `.next/server/chunks/125.js:9` — a shared chunk bundling Locomotive
> Scroll's ESM. Root cause was two module-scope references to `document` in
> `locomotive-scroll`'s ESM that fire at import time during server prerender:
> `defaults.el: document` (line 255) and the `support` feature-detection IIFE (line 1622).
> Both now short-circuit to a server-safe value via `typeof document !== "undefined"`, so
> the browser path is byte-identical to upstream. This was **not** a Next.js issue and no
> project source touched `document` at module scope (every project ref is inside a function
> or effect, guarded by `typeof window`). The `node_modules` patch is build-only and untracked.

---

## Verification (all green)

- [x] `npm run build` (webpack mode) — 26 routes prerendered, EXIT=0. Fixed two module-scope
      `document` refs in `locomotive-scroll` ESM (shared chunk) that broke server prerender:
      `defaults.el` (line 255) and the `support` feature-detection IIFE (line 1622). Both now
      short-circuit to a server-safe value via `typeof document !== "undefined"` so the
      browser path is byte-identical to upstream.
- [x] `npx tsc --noEmit` — full typecheck clean
- [x] `npx eslint .` — 0 errors, 7 harmless `@next/next/no-img-element` warnings
- [x] `npm test` — 12/12 unit tests pass (`tests/unit/utils.test.ts`)
- [x] Asset refs resolve (no 404s) — images, fonts (self-hosted Inter), links
- [x] **Integration** — `ScrollSystem` (Locomotive + GSAP ScrollTrigger + PageTransition,
      `prefers-reduced-motion` aware) wired into root layout; `useGamesData` hydrates the
      catalog client-side.
- [x] **Scroll chrome wired into root layout** — `BackToTop` + `ScrollProgress` (from
      `components/arcade/BackToTop.tsx`) are now rendered by the root layout so every page
      gets the fixed back-to-top button and full-page scroll progress bar.
- [x] **NewsletterForm import fix** — `src/components/arcade/NewsletterForm.tsx` had
      `import { useState } from "react"` dangling at the *bottom* of the file (after the
      component body), which is invalid TS. Moved it to the top import block.
- [x] **Catalog data flow (replaced broken hydration)** — the old architecture injected the
      catalog via `window.__arcadeGames` on client hydration, but **nothing ever set that
      global**, so every page fell back to empty and showed "LOADING VAULT..." forever (build
      was green but the site had no data). Replaced it with a proper React context + server
      component: `src/context/game-catalog.server.tsx` (`GameCatalog`) reads
      `content/games/games.json` and `content/categories/categories.json` **once at build
      time** and provides the snapshot through `GameCatalogContext`. Clients consume it via
      `useGamesData()` (re-exported from `src/lib/games-data.ts`, which also holds the pure
      collection helpers). All 10 page imports keep working unchanged. Wired into the provider
      chain in `src/components/providers/Providers.tsx`.
- [x] **Webpack fallback for Node built-ins** — the production build (`next build --webpack`)
      failed with `Module not found: Can't resolve 'fs'` because webpack tried to bundle
      Node's built-ins used by the server component. Added `webpack` resolve.fallback entries
      (`fs: false`, `path: false`) to `next.config.js` so they stay external.

---

## Setup (PSB SETUP) — DONE

- [x] Git repo initialized (`feat/build-setup`, branch-per-feature)
- [x] `.env.example` + local `.env` (placeholders, no real secrets)
- [x] Project `CLAUDE.md` (arcade theme, stack, commands, etiquette)
- [x] `architecture.md`, `CHANGELOG.md`, `PROJECT-STATUS.md`
- [x] Build migration: Turbopack→webpack (`next build --webpack`), self-hosted Inter variable font

## Git / GitHub — DONE

- [x] Branch-per-feature workflow: `feat/<issue>-<slug>`, `fix/<issue>-<slug>`
- [x] Never push `main` directly
- [x] Docs + code committed together

---

## Sub-agent Team (global, `~/.claude/agents/`)

- **@Stark** — Tailwind v4 + Next.js layout/CSS. Tools: Read, Write, Edit, Bash.
- **@Vision** — Review-only (bugs/security/best-practices). Tools: Read, Grep, Glob, WebSearch, WebFetch.
- **@Cap** — Tests. Tools: Read, Write, Edit, Bash, Grep.
- **@Jarvis** — Git: commits, branches, PR descriptions. Tools: Read, Bash, Grep, Glob, TodoWrite.
- **@dr.strange** — Docs. Tools: Read, Write, Edit, Bash, Grep.
- **@retro-agent** — Continuous improvement. Tools: Read, Grep, Glob.
- **@Avengers** — Orchestrator. Invoke for whole-feature delivery or full audits.

### Sub-agent Task Map (orchestrate ONE AT A TIME, sequential)
- **A. Build fix** → @Stark
- **B. Typecheck & lint** → @Cap
- **C. Tests** → @Cap
- **D. Asset integrity** → @Stark
- **E. Documentation** → @dr.strange
- **F. Git init** → @Jarvis
- **G. GitHub + branching** → @Jarvis

> A–G all complete (see git log). The remaining work is **integration + content**.

---

## Remaining Work

### Phase 2 — Integration (wire built-but-unused systems)

**The gap:** all of these are built and lint/type-clean, but never imported into a
layout or page. Wiring them in is the highest-leverage step — it turns a static site
into the smooth-scroll, scroll-driven, page-transitioning arcade experience from the spec.

- [x] **Locomotive Scroll + GSAP ScrollTrigger** — `ScrollSystem` (composes both, with a
      `prefers-reduced-motion` fallback) is wired into the root layout. The catalog is no longer
      hydrated via `window.__arcadeGames` (that was dead — nothing set it); it now flows from
      the build-time server component through `useGamesData`.
- [x] **Scanlines / CRTOverlay** — `Scanlines` + `CRTOverlay`/`CRTCurvature` are used inside
      `Hero` (CRT scanline shader, RGB-shift). Respect `prefers-reduced-motion` on all.
- [x] **MagneticButton** — use on CTA buttons (hero "Play Now", category cards). (complete, not yet used)
- [x] **BackToTop / ScrollProgress** — wired into root layout (complete, now in use).
- [x] **RelatedGames** — wired into product detail (`/g/[slug]`) and wishlist (`/wishlist`)
      via same-category filtering.
- [x] **ShareButton / WishlistButton** — wired into product detail + wishlist pages.
      `ShareButton` default `document.title` was crashing server prerender (module-scope
      global); now guarded with `typeof document !== "undefined"`.
- [x] **NewsletterForm** — wired into home + contact pages.
- [x] **CookieBanner** — wired into contact page (accept/decline handlers).
- [ ] **Barba.js v2** — import `@barba/core` into layout for seamless page transitions. (`@barba/core` installed, never imported)
- [ ] **PinSection / ParallaxSection** — wire these into a scrolltelling hero sequence (e.g. home or a dedicated scroll page). (complete, not yet used)

> Rule from CLAUDE.md: isolate GSAP/Three.js from Framer Motion per component tree.
> Respect `prefers-reduced-motion` on every animation.

### Phase 3 — Page content (fill 24 route dirs)

Most pages are **already wired to the data layer** (verified: shop/cart/wishlist/categories/
best-sellers/top-rated/sale/new-releases all render data; about/blog/careers/help/faq/refunds/
shipping have data-driven content). Remaining content work:

- [x] **Product detail** (`/g/[slug]`) — finalized: gallery, rating, price/discount,
      platforms/genres/features, reviews, RelatedGames, and a new sticky action bar
      (AddToCart + BuyNow + WishlistButton + ShareButton).
- [x] **Cart / Checkout** (`/cart`) — arcade UI wired to `CartContext`; added multi-step
      `/cart/checkout` flow (shipping → payment → review → done).
- [x] **Wishlist** (`/wishlist`) — wired to `WishlistContext` + `RelatedGames` by genre +
      `ShareButton` header.
- [x] **Account** (`/account`) — wired to `UserContext` + Library grid (purchased games) +
      Preferences.
- [ ] **Barba.js v2** — import `@barba/core` into layout for seamless page transitions. (`@barba/core` installed, never imported)
- [ ] **PinSection / ParallaxSection** — wire these into a scrolltelling hero sequence (e.g. home or a dedicated scroll page). (complete, not yet used)

### Phase 4 — Polish & Performance

- [ ] Image optimization (next/image, WebP/AVIF) — replace 7 `<img>` usages
- [ ] Font subsetting + preload (Inter variable self-hosted)
- [ ] Bundle analysis + Lighthouse > 90
- [ ] Reduced motion support (verify)
- [ ] Accessibility audit (WCAG AA)

---

## Test Notes

- Vitest config: `tests/unit/utils.test.ts` (12 tests) — `src/lib/utils.ts` (cn/merge, formatPrice, slugify, etc.)
- Add coverage for: `formatPrice`, `slugify`, `cn` variants, game data helpers as pages grow.
