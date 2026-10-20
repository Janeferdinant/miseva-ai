# Futuristic Theme, Motion Graphics & Enhanced UI/UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a high-tech "Cyber Kitchen 2099" futuristic theme, interactive GPU-accelerated motion graphics (particles, cyber grid, holographic radar visualizer), and enhanced UI/UX micro-interactions across Miseva AI.

**Architecture:** Extend the existing `ThemeProvider` and CSS token system with a 7th first-class theme (`cyber`), add a non-blocking interactive HTML5 Canvas/SVG motion graphics engine (`MotionGraphicsCanvas`) respecting `prefers-reduced-motion`, create an interactive Holographic Culinary Telemetry HUD (`HoloCulinaryRadar`), and provide an ambient HUD dock (`MotionControlDock`) for instant theme, particle FX, and haptic feedback management.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, HTML5 Canvas API, Web Audio API (ambient sci-fi chimes).

---

## Global Constraints
- Preserve all existing 6 liquid-glass themes (`emerald`, `saffron`, `ocean`, `midnight`, `rose`, `ivory`) without regressions.
- Respect `prefers-reduced-motion: reduce` unconditionally for all particle loops and transforms.
- Zero extra heavy external dependencies (use native HTML5 Canvas, CSS hardware acceleration, and standard Lucide icons).
- Ensure strict WCAG AA contrast for text and controls in both Dark and Light modes of the Cyber theme.
- All recipe catalog links and Malayalam language scripts must remain intact and functional.

---

## Review Focus
1. **Theme selector persistence**: Selecting `cyber` saves to `localStorage` and restores properly on page refresh.
2. **Performance on low-power devices**: Canvas animations must pause or throttle when off-screen or when Motion FX is toggled off.
3. **Malayalam font rendering**: Cyber glow effects must maintain high legibility for Malayalam script (`.lang-ml`).
4. **Hydration safety**: Motion dock and theme selector must mount safely without Next.js SSR hydration mismatches.
5. **No layout shifting**: HUD brackets, radar rings, and hover glows must not trigger reflows.

---

### Task 1: Cyber Kitchen 2099 Theme Foundation & CSS Design Tokens
**Files:**
- Modify: `lib/theme/theme-context.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Test: `tests/theme-futuristic.test.ts`

**Interfaces:**
- Consumes: Existing `ThemeType` and `THEMES` map.
- Produces: `ThemeType = ... | 'cyber'`, CSS tokens for `:root[data-theme="cyber"]`, and utility classes `.cyber-grid`, `.cyber-hud-bracket`, `.cyber-glow-text`.

- [ ] **Step 1: Write the failing test for `cyber` theme definition**
- [ ] **Step 2: Run test to verify it fails (`npx vitest run tests/theme-futuristic.test.ts`)**
- [ ] **Step 3: Add `cyber` theme metadata to `lib/theme/theme-context.tsx` and CSS tokens to `app/globals.css` and `tailwind.config.ts`**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 2: Interactive Motion Graphics Engine & Particle Visualizer
**Files:**
- Create: `components/motion/MotionGraphicsCanvas.tsx`
- Create: `components/motion/motion-context.tsx`
- Modify: `app/layout.tsx`
- Test: `tests/motion-graphics.test.ts`

**Interfaces:**
- Produces: `<MotionProvider>`, `useMotion()`, `<MotionGraphicsCanvas />` with particle density, speed, cyber grid, and mouse interaction.

- [ ] **Step 1: Write test for `MotionProvider` defaults and state management**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `motion-context.tsx` and `MotionGraphicsCanvas.tsx`**
- [ ] **Step 4: Wire `MotionProvider` and `MotionGraphicsCanvas` into `app/layout.tsx`**
- [ ] **Step 5: Run tests and verify they pass**

---

### Task 3: Holographic Culinary Telemetry HUD & Audio Synthesizer
**Files:**
- Create: `components/motion/HoloCulinaryRadar.tsx`
- Create: `lib/audio/sci-fi-audio.ts`
- Modify: `app/page.tsx`
- Test: `tests/holo-radar.test.ts`

**Interfaces:**
- Produces: `<HoloCulinaryRadar dish={...} />` interactive scanner with flavor vectors, thermal reading, bilingual audio wave synthesis, and scanning animation.

- [ ] **Step 1: Write unit test for `sci-fi-audio.ts` and `HoloCulinaryRadar` data calculations**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `sci-fi-audio.ts` (Web Audio API synthetic beeps/frequencies) and `HoloCulinaryRadar.tsx`**
- [ ] **Step 4: Mount `HoloCulinaryRadar` on the hero section of `app/page.tsx`**
- [ ] **Step 5: Run tests and verify they pass**

---

### Task 4: Motion Control Dock & ThemeSelector UI/UX Enhancement
**Files:**
- Create: `components/motion/MotionControlDock.tsx`
- Modify: `components/ThemeSelector.tsx`
- Modify: `components/Navbar.tsx`
- Test: `tests/dock-theme.test.ts`

**Interfaces:**
- Produces: Floating HUD dock with quick Cyber Mode toggle, Particle FX slider/switch, Sound effects toggle, and live AI Chef Telemetry status.

- [ ] **Step 1: Write test for ThemeSelector rendering 7 palettes including `cyber`**
- [ ] **Step 2: Implement `MotionControlDock.tsx` and update `ThemeSelector.tsx` & `Navbar.tsx`**
- [ ] **Step 3: Run all test suites and verify 100% pass rate**

---

### Task 5: End-to-End Verification & Browser Validation
**Files:**
- Run test suite: `npx vitest run`
- Run typecheck: `npx tsc --noEmit`
- Run Next.js build: `npx next build`
- Browser Subagent: Validate `http://localhost:3000` with Cyber theme activated, test radar interaction, toggle motion graphics, and verify responsive mobile layout.
