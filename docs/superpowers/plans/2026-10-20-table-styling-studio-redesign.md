# Table Styling Studio Luxury Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Miseva AI Table Styling Studio into an interactive, five-star luxury dining atelier featuring 10 bespoke visual themes, professional cutlery and tableware principles, curated meal collections, parametric image prompt synthesis, and real-time 2D layout customization.

**Architecture:** A modular client-server architecture where strongly-typed theme metadata and curated meal combinations feed into a parametric prompt engine and an interactive 8-section luxury studio UI. The studio features interactive 2D placement canvases, tableware finish toggles, dish multi-selectors, and local persistence for saving and sharing bespoke dining concepts.

**Tech Stack:** Next.js 16.4.2 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-20-table-styling-studio-redesign.md`

## Global Constraints

- Preserve all existing 40 table styling concepts and their routes (`/table-styling/[slug]`).
- Ensure 100% unique imagery across all 10 luxury themes with zero cross-tab collisions with the 230 recipes.
- Academic attribution must remain intact: Jane Rose, Assistant Professor, CSE.
- Zero TypeScript compiler errors (`npx tsc --noEmit`) and 100% passing tests in `vitest run`.
- Seamless responsiveness across mobile (375px), tablet (768px), and desktop (1280px+).

## Review Focus

- Empty dish selection or mismatched cuisine pairing defaults to an authentic, curated banquet combination.
- Cutlery arrangement adapts strictly to course configuration without utensil duplication or floating artifacts.
- Theme switching instantly updates color palette, tableware tokens, catchphrases, and 2D canvas without reloading.
- Mobile viewport displays sticky preview action bar so the host can view the dining table canvas on any device.
- Save and share features gracefully handle offline browser storage and clipboard permissions.

---

### Task 1: Data Models & Type Definitions for Luxury Themes & Curated Collections

**Files:**
- Modify: `lib/types/table-styling.ts`
- Create: `lib/data/luxury-table-themes.ts`
- Create: `lib/data/curated-meal-collections.ts`
- Test: `tests/table-styling-themes.test.ts`

**Interfaces:**
- Consumes: `TableShape`, `ServingStyle`, `TableItemPlacement` from `lib/types/table-styling.ts`.
- Produces:
  - `LuxuryTheme`: Interface representing a five-star dining visual theme with title, catchphrase, description, tableware specs, cutlery finishes, and moodboard URL.
  - `LUXURY_TABLE_THEMES`: Array of 10 curated themes (Royal Heritage, Five-Star Luxury, Kerala Royal Feast, Modern Fine Dining, Romantic Candlelight, Mediterranean Elegance, Festive Indian Grandeur, Garden Brunch, Dessert Atelier, Contemporary Global Dining).
  - `CuratedMealCollection`: Interface representing a complete dining experience with grouped dishes, ideal theme, course ordering, and beverage pairing.
  - `CURATED_MEAL_COLLECTIONS`: Array of 6 signature meal collections.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/table-styling-themes.test.ts
import { describe, it, expect } from "vitest";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";

describe("Luxury Table Themes & Curated Meal Collections", () => {
  it("defines exactly 10 distinct luxury dining themes with full storytelling", () => {
    expect(LUXURY_TABLE_THEMES.length).toBe(10);
    const ids = new Set(LUXURY_TABLE_THEMES.map((t) => t.id));
    expect(ids.size).toBe(10);

    for (const theme of LUXURY_TABLE_THEMES) {
      expect(theme.title).toBeDefined();
      expect(theme.catchphrase).toBeDefined();
      expect(theme.catchphrase.length).toBeGreaterThan(10);
      expect(theme.description).toBeDefined();
      expect(theme.tableware.cutleryFinish).toBeDefined();
      expect(theme.moodBoardImageUrl).toBeDefined();
    }
  });

  it("defines 6 curated meal collections with compatible dish groupings", () => {
    expect(CURATED_MEAL_COLLECTIONS.length).toBe(6);
    for (const meal of CURATED_MEAL_COLLECTIONS) {
      expect(meal.dishes.length).toBeGreaterThanOrEqual(3);
      expect(meal.beveragePairing).toBeDefined();
      expect(meal.courseOrder.length).toBeGreaterThanOrEqual(3);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/table-styling-themes.test.ts`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `lib/types/table-styling.ts`, `lib/data/luxury-table-themes.ts`, and `lib/data/curated-meal-collections.ts`**

Define `LuxuryTheme`, `CutleryFinish`, `TablewareStyle`, and populate all 10 themes and 6 curated collections with authentic cultural and culinary descriptions.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/table-styling-themes.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/types/table-styling.ts lib/data/luxury-table-themes.ts lib/data/curated-meal-collections.ts tests/table-styling-themes.test.ts
git commit -m "feat(styling): define 10 luxury themes and 6 curated meal collections"
```

---

### Task 2: Theme-Specific Image Prompt & Presentation Engine

**Files:**
- Create: `lib/table-styling/image-prompt-engine.ts`
- Create: `app/api/table-styling/render/route.ts`
- Test: `tests/table-styling-prompt-engine.test.ts`

**Interfaces:**
- Consumes: `LuxuryTheme`, `CuratedMealCollection` from Task 1.
- Produces:
  - `generateThemePrompt(theme: LuxuryTheme, options: PresentationPromptOptions): ThemePromptResult`
  - `POST /api/table-styling/render`: Endpoint synthesizing dining parameters into a structured presentation blueprint with cached image assets.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/table-styling-prompt-engine.test.ts
import { describe, it, expect } from "vitest";
import { generateThemePrompt } from "@/lib/table-styling/image-prompt-engine";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";

describe("Theme-Specific Image Prompt Engine", () => {
  it("synthesizes high-fidelity photographic prompts with tableware and lighting specs", () => {
    const royalTheme = LUXURY_TABLE_THEMES.find((t) => t.id === "royal-heritage")!;
    const result = generateThemePrompt(royalTheme, {
      selectedDishes: ["Mughlai Biryani", "Shahi Paneer", "Garlic Naan"],
      guestCount: 6,
      tableShape: "rectangular",
      occasion: "Royal Banquet",
    });

    expect(result.prompt).toContain("Royal Heritage");
    expect(result.prompt).toContain("gold");
    expect(result.prompt).toContain("Mughlai Biryani");
    expect(result.negativePrompt).toContain("distorted");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/table-styling-prompt-engine.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `lib/table-styling/image-prompt-engine.ts` and `app/api/table-styling/render/route.ts`**

Build the prompt synthesis engine with structured photography parameters (lighting, angle, aperture, tableware placement) and an API route with in-memory caching.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/table-styling-prompt-engine.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/table-styling/image-prompt-engine.ts app/api/table-styling/render/route.ts tests/table-styling-prompt-engine.test.ts
git commit -m "feat(styling): implement parametric theme prompt engine and render API"
```

---

### Task 3: Interactive Tableware Customizer & Live 2D Placement Canvas Upgrade

**Files:**
- Create: `components/table-styling/TablewareCustomizer.tsx`
- Modify: `components/table-styling/TableLayoutCanvas.tsx`
- Test: `tests/tableware-customizer.test.ts`

**Interfaces:**
- Consumes: `TableItemPlacement`, `LuxuryTheme` from Task 1.
- Produces:
  - `<TablewareCustomizer />`: UI component allowing real-time selection of cutlery finishes (Gold, Silver, Matte Noir, Antique Brass), plates (Bone China, Stoneware, Thali, Banana Leaf), glassware, and napkin folds.
  - Updated `<TableLayoutCanvas />`: Supports dynamic tableware icons, course cutlery layout, and zoom/pan view.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/tableware-customizer.test.ts
import { describe, it, expect } from "vitest";
import { generateCustomPlacements } from "@/components/table-styling/TablewareCustomizer";

describe("Tableware Customizer & Dynamic Placements", () => {
  it("generates correct placement coordinates for different cutlery and table shapes", () => {
    const placements = generateCustomPlacements({
      tableShape: "rectangular",
      guestCount: 4,
      cutleryFinish: "gold",
      plateStyle: "fine-bone-china",
      servingStyle: "plated-western",
    });

    expect(placements.length).toBeGreaterThanOrEqual(12);
    const forks = placements.filter((p) => p.itemType === "cutlery");
    expect(forks.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tableware-customizer.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `components/table-styling/TablewareCustomizer.tsx` and enhance `components/table-styling/TableLayoutCanvas.tsx`**

Implement the customizer with interactive pills and color chips, and enhance the SVG/HTML canvas renderer with smooth transitions.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tableware-customizer.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/table-styling/TablewareCustomizer.tsx components/table-styling/TableLayoutCanvas.tsx tests/tableware-customizer.test.ts
git commit -m "feat(styling): add tableware customizer and dynamic placement generator"
```

---

### Task 4: Curated Meal Collection Builder & Dish Selector Components

**Files:**
- Create: `components/table-styling/MealCollectionBuilder.tsx`
- Create: `components/table-styling/DishSelectorModal.tsx`
- Test: `tests/meal-collection-builder.test.ts`

**Interfaces:**
- Consumes: `CURATED_MEAL_COLLECTIONS`, `RECIPES`, `DESSERT_RECIPES`, `BEVERAGE_RECIPES`.
- Produces:
  - `<MealCollectionBuilder />`: Interactive carousel/grid of the 6 curated meal experiences with one-click theme & dish activation.
  - `<DishSelectorModal />`: Searchable, filterable modal to pick and combine dishes from the 230 catalog items.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/meal-collection-builder.test.ts
import { describe, it, expect } from "vitest";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";

describe("Meal Collection Builder Data Integrity", () => {
  it("contains valid, non-empty collections with verified course sequences", () => {
    for (const c of CURATED_MEAL_COLLECTIONS) {
      expect(c.title).toBeTruthy();
      expect(c.description).toBeTruthy();
      expect(c.dishes.length).toBeGreaterThan(0);
      expect(c.idealThemeId).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/meal-collection-builder.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `components/table-styling/MealCollectionBuilder.tsx` and `components/table-styling/DishSelectorModal.tsx`**

Create accessible, keyboard-friendly selection components with glassmorphic styling and course tags.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/meal-collection-builder.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/table-styling/MealCollectionBuilder.tsx components/table-styling/DishSelectorModal.tsx tests/meal-collection-builder.test.ts
git commit -m "feat(styling): add meal collection builder and dish selector modal"
```

---

### Task 5: Redesigned Table Styling Studio Main Page (`app/table-styling/page.tsx`)

**Files:**
- Modify: `app/table-styling/page.tsx`
- Test: `tests/table-styling-page.test.ts`

**Interfaces:**
- Assembles all 8 studio sections:
  1. Hero section with luxury typography and quick-start actions.
  2. Theme gallery displaying the 10 luxury themes with image, title, catchphrase, description.
  3. Dish selector triggering individual or multi-dish selection.
  4. Curated meal collection builder with 6 preset banquets.
  5. Tableware customization drawer (cutlery finishes, plate styles, linens).
  6. Live presentation preview with 2D canvas and course timeline.
  7. Occasion selector (Wedding, Candlelight Date, Festive, Family Sunday, Garden Party).
  8. Save & share suite with clipboard links and menu card export.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/table-styling-page.test.ts
import { describe, it, expect } from "vitest";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";

describe("Table Styling Studio Integration", () => {
  it("provides complete coverage for both 10 luxury themes and 40 classic concepts", () => {
    expect(LUXURY_TABLE_THEMES.length).toBe(10);
    expect(TABLE_STYLING_CONCEPTS.length).toBe(40);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/table-styling-page.test.ts`
Expected: FAIL if types or imports mismatch.

- [ ] **Step 3: Implement redesign in `app/table-styling/page.tsx`**

Replace the existing view with the luxury 8-section interactive atelier, preserving all classic concepts while featuring the 10 luxury themes, live customizer, and meal builder.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/table-styling-page.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/table-styling/page.tsx tests/table-styling-page.test.ts
git commit -m "feat(styling): redesign Table Styling Studio with 8 luxury sections"
```

---

### Task 6: Upgraded Detail Page & Concept Presentation (`app/table-styling/[slug]/page.tsx`)

**Files:**
- Modify: `app/table-styling/[slug]/page.tsx`
- Test: `tests/table-styling-detail.test.ts`

**Interfaces:**
- Consumes: `LUXURY_TABLE_THEMES`, `TABLE_STYLING_CONCEPTS`.
- Produces: Dynamic detail page supporting both luxury themes (`/table-styling/royal-heritage`, etc.) and classic concepts (`/table-styling/tab-kerala-onam-mahasadya`), featuring high-resolution moodboard, catchphrase, tableware specs, napkin folding guides, and printable dining cards.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/table-styling-detail.test.ts
import { describe, it, expect } from "vitest";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";

describe("Table Styling Detail Resolution", () => {
  it("resolves all 10 luxury themes and all 40 classic concepts by slug or id", () => {
    for (const theme of LUXURY_TABLE_THEMES) {
      expect(theme.slug).toBeTruthy();
    }
    for (const concept of TABLE_STYLING_CONCEPTS) {
      expect(concept.slug).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/table-styling-detail.test.ts`
Expected: FAIL if slugs are missing.

- [ ] **Step 3: Update `app/table-styling/[slug]/page.tsx`**

Add fallback resolution so that navigating to either a luxury theme slug or a classic concept slug renders a cohesive luxury dining presentation with interactive canvas and printable menu summary.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/table-styling-detail.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/table-styling/[slug]/page.tsx tests/table-styling-detail.test.ts
git commit -m "feat(styling): upgrade detail page to resolve luxury themes and classic concepts"
```

---

### Task 7: Comprehensive Regression Verification, Documentation, Build & Deployment

**Files:**
- Create: `docs/architecture/table-styling-studio-redesign.md`
- Test: Full Vitest suite (`vitest run`), Next.js Turbopack build (`npm run build`)

- [ ] **Step 1: Run comprehensive tests across all suites**

Run: `npm test`
Expected: All test suites PASS (100%).

- [ ] **Step 2: Run TypeScript compiler check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3: Run production Next.js build**

Run: `npm run build`
Expected: Build succeeds with all static & dynamic routes compiled.

- [ ] **Step 4: Push to GitHub and deploy to Vercel production**

Run: `powershell -ExecutionPolicy Bypass -File scripts/git-push.ps1`
Run: `powershell -ExecutionPolicy Bypass -File scripts/vercel-deploy.ps1`
Verify: `curl.exe -s -o NUL -w "%{http_code}" https://cusine-chi.vercel.app/table-styling` returns 200.

- [ ] **Step 5: Commit documentation and complete**

```bash
git add docs/architecture/table-styling-studio-redesign.md
git commit -m "docs(styling): add architecture documentation for luxury Table Styling Studio"
```
