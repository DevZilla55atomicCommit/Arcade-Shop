# Arcade-Shop — Project Task List

**Project root:** `/Volumes/Samsung LED/Game Store/Arcade-Shop`
**Branch:** `feat/build-setup` (branch-per-feature; never push `main` directly)

> Status: **Build green + integration complete.** 36 arcade components, 5 contexts, 6
> lib files, 27 route dirs, 26 routes all prerender. The animation/scroll systems are
> now wired into the layout. The real remaining work is **page content** (Phase 3) and
> **polish/perf** (Phase 4).

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
      `prefers-reduced-motion` fallback) is wired into the root layout; `useGamesData`
      hydrates the catalog client-side so pages prerender without touching globals.
- [ ] **Barba.js v2** — import `@barba/core` into layout for seamless page transitions. (`@barba/core` installed, never imported)
- [ ] **PinSection / ParallaxSection** — wire these into a scrolltelling hero sequence (e.g. home or a dedicated scroll page). (orphaned)
- [ ] **Scanlines / CRTOverlay** — apply `Scanlines`/`CRTOverlay` to hero + select sections. (orphaned)
- [ ] **MagneticButton** — use on CTA buttons (hero "Play Now", category cards). (orphaned)

> Rule from CLAUDE.md: isolate GSAP/Three.js from Framer Motion per component tree.
> Respect `prefers-reduced-motion` on every animation.

### Phase 3 — Page content (fill 24 route dirs)

Pages exist as route stubs; most need data-driven content wired in.

- [ ] **Shop** (`/shop`) — filterable grid (`GameFilter` + `GameSort`), infinite scroll, quick view. (orphaned)
- [ ] **Product detail** (`/g/[slug]`) — gallery, specs, reviews, add-to-cart. (partial: has `ReviewCard`/`ReviewForm`/`AddToCart`/`PlatformBadges`/`PriceDisplay`/`SystemRequirements`/`GameTrailer` available)
- [ ] **Cart / Checkout** (`/cart`) — arcade UI, uses `CartContext`. (needs wiring)
- [ ] **Wishlist** (`/wishlist`) — uses `WishlistContext` + `WishlistButton`. (needs wiring)
- [ ] **Account** (`/account`) — uses `UserContext`. (needs wiring)
- [ ] **Best-sellers / New-releases / Top-rated / Sale** — curated lists. (needs content)
- [ ] **Categories** (`/categories`) — uses `CategoryTabs`. (needs wiring)
- [ ] **Related games** (`RelatedGames`) — wire into product pages. (orphaned)
- [ ] **NewsletterForm / CookieBanner / ShareButton / BackToTop** — wire into relevant pages. (partial)

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
