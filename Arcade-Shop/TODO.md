# Arcade-Shop — Project Task List

**Project root:** `/Volumes/Samsung LED/Game Store/Arcade-Shop`

---

## Blocker: Production build (`npm run build`)

- [x] Fix `PinSection.tsx` offset type error — `useScroll({ offset: [start, end] })` nested two arrays; hardcoded `["start", "end"]` literals.
- [ ] Re-run `npm run build` until "Compiled successfully" AND type-check passes.

---

## Verification

- [x] `npx tsc --noEmit` — full typecheck clean.
- [x] Lint — no lint errors.
- [x] `npm test` — all tests pass (12/12 unit tests).
- [x] Verify all asset refs resolve (no 404s) — images, videos, fonts, links.

---

## Setup (PSB SETUP)

- [ ] Initialize git repo (if not already).
- [ ] Create `.env.example` from spec + stack.
- [ ] Create local `.env` (NOT committed) — no real secrets.
- [ ] Write project `CLAUDE.md` (goals, architecture, layout/UX guide, constraints, build/test commands, repo etiquette).
- [ ] Write `architecture.md` (system design, components, DB schema, API design).
- [ ] Write `CHANGELOG.md`.
- [ ] Write `PROJECT-STATUS.md` (milestones, done, where left off).

---

## Git / GitHub (PSB SETUP bonus)

- [ ] Create GitHub repo (if not already).
- [ ] Branch-per-feature workflow: `feat/<issue>-<slug>`, `fix/<issue>-<slug>`.
- [ ] Never push to `main` directly.
- [ ] Commit docs + code together.

---

## Sub-agent Team (global, `~/.claude/agents/`)

- **@Stark** — Tailwind v4 + Next.js layout/CSS expert. Diagnose & fix type/layout bugs. Tools: Read, Write, Edit, Bash.
- **@Vision** — Review-only (bugs/security/best-practices, confidence-scored). Tools: Read, Grep, Glob, WebSearch, WebFetch.
- **@Cap** — Tests: write/run unit+integration tests, regression checks. Tools: Read, Write, Edit, Bash, Grep.
- **@Jarvis** — Git: commits, branches, PR descriptions. Tools: Read, Bash, Grep, Glob, TodoWrite.
- **@dr.strange** — Docs: `architecture.md`, `CHANGELOG.md`, `PROJECT-STATUS.md`. Tools: Read, Write, Edit, Bash, Grep.
- **@retro-agent** — Continuous improvement: reflects on session, proposes CLAUDE.md/rule/command upgrades. Tools: Read, Grep, Glob.
- **@Avengers** — Orchestrator: runs full team end-to-end. Invoke for whole-feature delivery or full audits.

## Sub-agent Task Map (orchestrate ONE AT A TIME, sequential)

- **A. Build fix** → **@Stark**
- **B. Typecheck & lint** → **@Cap**
- **C. Tests** → **@Cap**
- **D. Asset integrity** → **@Stark**
- **E. Documentation** → **@dr.strange**
- **F. Git init** → **@Jarvis**
- **G. GitHub + branching** → **@Jarvis**

---

### A. Build fix — clear all remaining build errors (CURRENT)
- [x] Diagnose & fix `PinSection.tsx` offset type error.
- [x] Fix `RelatedGames.tsx` missing `GameGrid` import.
- [x] Fix `Footer.tsx` footer column map (flat config arrays).
- [x] Fix `Card.tsx` motion `onDrag` typing (use `HTMLMotionProps<'div'>`).
- [x] Fix `GameContext.tsx` / `UserContext.tsx` missing `useReducer` import.
- [x] Fix `UserContext.tsx` `SET_USER` payload missing `wishlist`/`library`.
- [x] Fix `useLocomotiveScroll.tsx` `breakpoint`/`call`/`easing` typing + `querySelector` cast.
- [x] Re-run `npm run build` until "Compiled successfully" AND type-check passes.
- [x] Report final build status to main.

### B. Typecheck & Lint
- [x] Run `npx tsc --noEmit` — full typecheck clean.
- [x] Run lint — no lint errors.
- [x] Fix any remaining issues.

### C. Tests
- [x] Run `npm test`.
- [x] Fix failing tests / add coverage for new code.

### D. Asset integrity
- [x] Scan all asset references (images, videos, fonts, links).
- [x] Confirm every ref resolves; no 404s.
- [x] Fix any broken/missing refs (icons, manifest, 8 pages, href bug).

### E. Documentation
- [x] Write `CLAUDE.md`.
- [x] Write `architecture.md`.
- [x] Write `CHANGELOG.md`.
- [x] Write `PROJECT-STATUS.md`.

### F. Git initialization
- [ ] `git init` if not already.
- [ ] Create `.env.example`.
- [ ] Create local `.env` (not committed).

### G. GitHub + branching
- [ ] Create GitHub repo.
- [ ] Set up branch-per-feature.
- [ ] First commit on a feature branch (never main).
