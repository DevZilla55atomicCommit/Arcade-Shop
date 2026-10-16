# Changelog

All notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] — 2026-01-14

### Added
- **Next.js 16.4.1 upgrade** (React 19 compatible). Resolved the
  `ReactCurrentBatchConfig` runtime error caused by React 19.3.0; pinned
  `react`/`react-dom` to `19.0.3` and `@types/*` to `19.3.0`.
- **Lint setup** from scratch: ESLint 9 flat config via `eslint.config.mjs`
  (Next 16 core-web-vitals preset) replacing the Next 15 `next lint` command.
  R3F false positives disabled per-file.
- **Unit tests** (`vitest.config.ts`, Vitest + jsdom, `@` → `src` alias).
  `src/lib/utils.ts` (`truncate`, `formatPrice`) — 12/12 passing.
- **Asset integrity tooling**: `scripts/make_icons.js` generates the favicon
  + PWA icon set (pure Node zlib, zero deps). Browser icon set, `site.webmanifest`,
  and PWA manifest created.
- **8 previously-missing pages** created to satisfy footer/nav links:
  `best-sellers`, `careers`, `press`, `blog`, `help`, `refunds`, `shipping`,
  `faq` — all follow the design system.
- **Fixed broken link** in `best-sellers`: game detail href corrected from
  `/game/${slug}` → `/g/${slug}` (the canonical route).

### Fixed
- `react-hooks/set-state-in-effect` disable comment relocated to the line that
  the rule actually reports (the `setState` call, not the `useEffect`).
- `vitest` no longer picks up Playwright specs — `include` scoped to
  `tests/unit/**/*.test.ts`.
- Vitest alias resolution failure resolved via `resolve.alias["@"]` in
  `vitest.config.ts`.

### Notes
- Typecheck (`tsc --noEmit`) and lint (`next lint`) are clean — 0 errors.
- Remaining lint warnings (8): `<img>` performance hints + 1
  `exhaustive-deps` (non-blocking; user-requested 0 errors).
