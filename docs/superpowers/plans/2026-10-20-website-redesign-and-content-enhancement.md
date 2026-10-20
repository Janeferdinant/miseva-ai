# Miseva AI Competitor-Inspired Website Redesign & Content Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Miseva AI into a modern, responsive, competitor-inspired culinary platform (inspired by Cookpad, Tasty, Kitchen Stories, BBC Good Food, Allrecipes, and Serious Eats) featuring an emerald-and-ivory design system, recipe-first homepage, dedicated Ingredient Finder, focused step-by-step Cooking Mode, 23 regional cuisine emblems, verified food photography (zero people), and seamless Malayalam translation.

**Architecture:** Next.js 16 App Router with Turbopack, TypeScript, Tailwind CSS with liquid-glass tokens and warm culinary palettes, modular React components, and client-side reactive stores for user favorites, pantry items, and meal planning.

**Tech Stack:** Next.js 16.4.2, React 19, TypeScript, Tailwind CSS, Lucide React, Vitest.

**Spec:** Competitor-Inspired Website Redesign & Content Enhancement Specification.

## Global Constraints
- Preserve academic attribution: **Jane Rose, Assistant Professor, CSE**.
- Keep the marketing application decoupled in its standalone repository (`Janeferdinant/miseva-ai-marketing`).
- Strict food-only photography: Zero people, faces, hands, chefs, or silhouettes in any recipe image.
- Preserved Malayalam fidelity: Exact ingredient amounts and units must never be altered or omitted.
- Light and dark theme accessibility with high contrast ratios, accessible button labels, and semantic HTML.
- Zero breaking changes to existing working APIs, tests, or recipe datasets.

## Review Focus
1. **Serving Scaler Math**: Fractional or negative serving inputs must be clamped safely to avoid NaN amounts.
2. **Missing Ingredients Calculation**: Ingredient Finder must accurately identify which mandatory ingredients are missing and never falsely mark incomplete recipes as 100% matched.
3. **Cooking Mode Navigation**: Edge cases (first step, last step, rapid timer toggling, step completion) must not crash or jump indices.
4. **Unicode Malayalam Font Rendering**: Transliterated titles, ingredient units, and instructions must maintain proper character order without text truncation on mobile viewports.
5. **Image Fallback Handling**: Network failures or invalid URLs on any recipe card must fallback gracefully to the verified culinary fallback image without broken image icons.

---

### Task 1: Comprehensive Site Audit & Issues Documentation (Phase 1)

**Files:**
- Create: `docs/audit/website-redesign-audit.md`
- Test: `tests/audit/redesign-readiness.test.ts`

**Interfaces:**
- Produces: Complete audit report cataloging route structure, layout densities, mobile accessibility, SEO gaps, and competitor benchmarking metrics.

- [ ] **Step 1: Write the failing audit test**

```typescript
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Website Redesign Audit Documentation", () => {
  it("should have a comprehensive audit report document", () => {
    const auditPath = path.resolve(process.cwd(), "docs/audit/website-redesign-audit.md");
    expect(fs.existsSync(auditPath)).toBe(true);
    const content = fs.readFileSync(auditPath, "utf-8");
    expect(content).toContain("Cookpad");
    expect(content).toContain("Kitchen Stories");
    expect(content).toContain("BBC Good Food");
    expect(content).toContain("Ingredient Finder");
    expect(content).toContain("Cooking Mode");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/audit/redesign-readiness.test.ts`
Expected: FAIL (file not found).

- [ ] **Step 3: Create `docs/audit/website-redesign-audit.md`**

Write a detailed audit report analyzing Miseva AI against Cookpad, Tasty, Kitchen Stories, and BBC Good Food, identifying existing layout densities, mobile touch targets, missing Ingredient Finder route, and roadmap.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/audit/redesign-readiness.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add docs/audit/website-redesign-audit.md tests/audit/redesign-readiness.test.ts
git commit -m "docs: add comprehensive website redesign audit report"
```

---

### Task 2: Enhanced Navigation Header & Mobile Drawer (Phase 2)

**Files:**
- Modify: `components/Navbar.tsx`
- Test: `tests/culinary/navigation.test.ts`

**Interfaces:**
- Consumes: Nav routes (`/`, `/explore`, `/recipes`, `/ingredient-finder`, `/meal-planner`, `/desserts`, `/table-styling`, `/shopping`)
- Produces: Clean, responsive culinary header with search shortcut, language toggle, theme selector, and mobile navigation drawer.

- [ ] **Step 1: Add unit tests for updated navigation links**

In `tests/culinary/navigation.test.ts`, add test cases verifying that `/ingredient-finder` is present in `Navbar` links and marketing links remain excluded.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/culinary/navigation.test.ts`
Expected: FAIL with missing `/ingredient-finder` link.

- [ ] **Step 3: Update `components/Navbar.tsx`**

Add `Ingredient Finder` (`/ingredient-finder`, icon: `Sparkles` or `UtensilsCrossed`, labelMl: `ചേരുവ തിരച്ചിൽ`), refine logo typography, streamline links, and implement mobile search button.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/culinary/navigation.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx tests/culinary/navigation.test.ts
git commit -m "feat: enhance navbar with dedicated ingredient finder and culinary navigation"
```

---

### Task 3: Homepage Redesign with Hero, Quick Actions & Curated Collections (Phase 2)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/QuickActionPanel.tsx`
- Create: `components/home/CuratedCollections.tsx`
- Test: `tests/culinary/homepage-redesign.test.ts`

**Interfaces:**
- Consumes: `RECIPES`, `INDIAN_REGIONS`, `GLOBAL_CUISINES`
- Produces:
  - Hero with headline: **“Discover the World. Cook Something Wonderful.”**
  - Supporting text: **“Explore authentic regional recipes, cook with the ingredients you have, plan your meals and follow clear cooking instructions in your preferred language.”**
  - 6 Quick Actions (Cook with My Ingredients, Find a Recipe, Plan My Meals, Explore Regional Cuisine, Read in Malayalam, Style My Dining Table)
  - Curated Collections (Five-Ingredient Meals, Weeknight Dinners, Traditional Kerala Lunch, One-Pot Cooking, World Desserts, Beginner Meals, Family Gatherings).

- [ ] **Step 1: Write test for homepage components**

Verify that `QuickActionPanel` has 6 working actions and `CuratedCollections` exposes valid collections with real recipes.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/culinary/homepage-redesign.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement `components/home/QuickActionPanel.tsx`, `components/home/CuratedCollections.tsx`, and update `app/page.tsx`**

Implement competitor-inspired clean culinary editorial hierarchy with generous whitespace, authentic food photography, and quick actions.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/culinary/homepage-redesign.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/home/QuickActionPanel.tsx components/home/CuratedCollections.tsx tests/culinary/homepage-redesign.test.ts
git commit -m "feat: redesign homepage with competitor-inspired culinary editorial hierarchy"
```

---

### Task 4: Dedicated Ingredient Finder Tool (Phase 3 & Phase 5)

**Files:**
- Create: `app/ingredient-finder/page.tsx`
- Create: `components/ingredients/IngredientSelector.tsx`
- Test: `tests/culinary/ingredient-finder.test.ts`

**Interfaces:**
- Consumes: `RECIPES`, `matchRecipesByPantry`
- Produces: Interactive ingredient search, categorized ingredient chips, dietary preference filters, missing ingredient calculations, and direct shopping list export.

- [ ] **Step 1: Write tests for Ingredient Finder logic**

Verify that selecting ingredients ranks recipes by matching percentage, highlights missing required ingredients, and never marks incomplete recipes as complete.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/culinary/ingredient-finder.test.ts`
Expected: FAIL (page/component not found).

- [ ] **Step 3: Implement `app/ingredient-finder/page.tsx` and `components/ingredients/IngredientSelector.tsx`**

Build the interactive SuperCook/Tasty-style Ingredient Finder with manual tag entry, quick pantry staples selection, dietary preferences, and missing ingredients badges.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/culinary/ingredient-finder.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/ingredient-finder/page.tsx components/ingredients/IngredientSelector.tsx tests/culinary/ingredient-finder.test.ts
git commit -m "feat: implement dedicated ingredient finder with missing ingredient calculations"
```

---

### Task 5: Recipe Detail Page Enhancement & Distraction-Free Cooking Mode (Phase 3)

**Files:**
- Modify: `app/recipes/[id]/page.tsx`
- Create: `components/recipes/StepByStepCookingMode.tsx`
- Test: `tests/culinary/cooking-mode.test.ts`

**Interfaces:**
- Consumes: `Recipe`, `scaleRecipe`, `formatMalayalamRecipeView`
- Produces:
  - Structured content order: Title, image, region badge with emblem, prep/cook time, servings, save/share/print, scaler, checklist, Add to Shopping List, cooking steps, Malayalam view, tips, related recipes, and cultural provenance.
  - Fullscreen/modal Step-by-Step Cooking Mode with step timers, adjustable font size (A- / A+), keyboard arrow navigation, and audio narration.

- [ ] **Step 1: Write test for Cooking Mode state machine**

Test step indexing, next/previous transitions, font size adjustments, and timer countdown triggers.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/culinary/cooking-mode.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `components/recipes/StepByStepCookingMode.tsx` and integrate into `app/recipes/[id]/page.tsx`**

Add prominent "Start Cooking Mode" button, step-by-step modal, and "Add to Shopping List" action.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/culinary/cooking-mode.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/recipes/[id]/page.tsx components/recipes/StepByStepCookingMode.tsx tests/culinary/cooking-mode.test.ts
git commit -m "feat: add distraction-free step-by-step cooking mode and shopping list integration"
```

---

### Task 6: Global Cuisine Discovery Hierarchy & Breadcrumbs (Phase 3)

**Files:**
- Modify: `app/explore/page.tsx`
- Modify: `app/explore/[slug]/page.tsx`
- Test: `tests/cuisine-emblems.test.ts`

**Interfaces:**
- Consumes: `INDIAN_REGIONS`, `GLOBAL_CUISINES`, `RECIPES`
- Produces: Geographic hierarchy (Broad Region / Continent → Country / State → Category → Dish), verified dish counts, and regional emblems.

- [ ] **Step 1: Verify existing cuisine emblem test cases**

Run: `npx vitest run tests/cuisine-emblems.test.ts`
Expected: PASS.

- [ ] **Step 2: Enhance `app/explore/page.tsx` and `app/explore/[slug]/page.tsx`**

Add breadcrumbs, grouped broad regions (South Asia, East Asia, Europe, Americas, Middle East), search filtering with zero-state fallbacks, and real recipe counts.

- [ ] **Step 3: Run tests to verify no regressions**

Run: `npx vitest run tests/cuisine-emblems.test.ts`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add app/explore/page.tsx app/explore/[slug]/page.tsx
git commit -m "feat: refine global cuisine discovery hierarchy with regional grouping and breadcrumbs"
```

---

### Task 7: SEO Structured Data, Accessibility & Performance Polish (Phase 6)

**Files:**
- Create: `components/seo/RecipeJsonLd.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/recipes/[id]/page.tsx`
- Test: `tests/audit/seo-metadata.test.ts`

**Interfaces:**
- Produces: `schema.org/Recipe` JSON-LD structured metadata, canonical tags, responsive image attributes, and accessible ARIA attributes.

- [ ] **Step 1: Write test for Recipe JSON-LD schema generation**

Verify that `RecipeJsonLd` outputs valid schema fields (name, image, prepTime, cookTime, recipeIngredient, recipeInstructions).

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/audit/seo-metadata.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `components/seo/RecipeJsonLd.tsx` and integrate into recipe pages**

Ensure valid Schema.org markup is embedded for all 275 recipes, desserts, and beverages.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/audit/seo-metadata.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/seo/RecipeJsonLd.tsx app/recipes/[id]/page.tsx tests/audit/seo-metadata.test.ts
git commit -m "feat: add Schema.org Recipe JSON-LD structured data and SEO meta"
```

---

### Task 8: Full Verification, Production Build & Deployment (Phase 7)

**Files:**
- Modify: `docs/release/redesign-verification-report.md`

**Interfaces:**
- Produces: Full regression test suite pass, production build verification, and git push/deployment.

- [ ] **Step 1: Run complete Vitest suite**

Run: `npx vitest run`
Expected: 100% test files pass.

- [ ] **Step 2: Run Next.js production build**

Run: `npm run build`
Expected: 0 errors, all 27+ routes generated cleanly.

- [ ] **Step 3: Deploy to Vercel and push to GitHub**

Execute:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\deploy\git-push.ps1
powershell -ExecutionPolicy Bypass -File scripts\deploy\vercel-deploy.ps1
```

- [ ] **Step 4: Generate final verification report in `docs/release/redesign-verification-report.md`**

- [ ] **Step 5: Commit**

```bash
git add docs/release/redesign-verification-report.md
git commit -m "docs: generate final redesign verification and deployment report"
```
