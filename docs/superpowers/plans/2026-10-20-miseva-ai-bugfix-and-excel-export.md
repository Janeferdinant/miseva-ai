# Miseva AI — Full Application Bug Fix, Image Audit, Regression Testing & Recipe Excel Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (native execution) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Systematically resolve navigation bugs on the cuisine explorer, enhance liquid-glass button interaction states, execute a complete 230-dish culinary image audit eliminating all duplicates and semantic mismatches (including salmon aquarium and jackfruit packaging errors), and generate the authoritative 8-sheet Excel workbook `Miseva_AI_Complete_Recipe_Catalogue.xlsx`.

**Architecture:** 
1. Build a dedicated dynamic Next.js App Router route at `app/explore/[slug]/page.tsx` backed by canonical slug/ID matching to provide direct country/cuisine landing pages, coupled with URL search-param sync in `app/recipes/page.tsx`.
2. Standardize liquid-glass button interaction states in `app/globals.css` with responsive `:hover`, `:active`, `:focus-visible`, and `:disabled` rules, enforcing `@media (prefers-reduced-motion)`.
3. Audit all 230 culinary catalog entries (140 main recipes, 40 desserts, 50 beverages) using a verified registry to guarantee 100% unique, dish-specific, high-resolution culinary photography.
4. Utilize `exceljs` to construct a multi-sheet, beautifully styled `.xlsx` workbook containing all dishes, individual ingredient rows, preparation steps, image audit logs, and calculated metrics.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS with Vanilla CSS custom properties, Lucide React, Vitest, ExcelJS.

**Spec:** `# MISEVA AI — FULL APPLICATION BUG FIX, IMAGE AUDIT, REGRESSION TESTING & RECIPE EXCEL EXPORT` (Master Prompt dated 2026-10-20).

## Global Constraints

- Preserve all existing functionality, branding (Miseva AI, emerald green `#004D40`, gold `#E5A93C`, ivory `#FBFBF9`), and academic attribution (Jane Rose, Assistant Professor, CSE).
- Do not create a new application or break existing valid routes (`/`, `/recipes`, `/recipes/[id]`, `/desserts`, `/beverages`, `/ai-chef`, `/shopping`, `/table-styling`, `/exports`).
- Excel workbook MUST be named `Miseva_AI_Complete_Recipe_Catalogue.xlsx` and contain 8 distinct, fully populated sheets matching the user's column definitions.
- All 230 dishes in the database must be audited, with zero generic chapatis on desserts/beverages, zero living fish/aquarium images for cooked salmon, and zero packaging/cover photos for jackfruit pradhaman.
- Android compliance: maintain compatibility with Android 16 (API 36) release readiness.

## Review Focus

1. Direct navigation to `/explore/[slug]` for every supported Indian state and global cuisine slug (e.g. `kerala`, `punjab`, `italy`, `japan`) must load dishes specific to that region.
2. Direct navigation to invalid cuisine slugs (e.g. `/explore/atlantis`) must display a graceful, accessible 404 / Not Found state with a link back to `/explore`.
3. Touch interactions on mobile devices must trigger liquid-glass active feedback without layout shifts or delayed click handling.
4. In the Excel workbook, Malayalam text strings and multi-paragraph preparation instructions must not be truncated or corrupted.
5. All calculations in Sheet 8 (Summary Dashboard) must be strictly computed from the actual records in Sheets 1-7 without invented totals.

---

### Task 1: Fix Cuisine & Country Navigation with Dedicated Route & Param Sync

**Files:**
- Create: `app/explore/[slug]/page.tsx`
- Modify: `app/explore/page.tsx:100-140`
- Modify: `app/recipes/page.tsx:20-50`
- Create: `tests/navigation.test.ts`

**Interfaces:**
- Consumes: `INDIAN_REGIONS`, `GLOBAL_CUISINES`, `CulinaryRegion` from `@/lib/data/cuisines`, `RECIPES` from `@/lib/data/recipes`.
- Produces: Dynamic route `/explore/[slug]` returning country/cuisine detail with matching recipes, and updated `/recipes?cuisine={slug}` query param handler.

- [ ] **Step 1: Write failing navigation tests**
Write `tests/navigation.test.ts` testing that all region IDs from `INDIAN_REGIONS` and `GLOBAL_CUISINES` can be resolved, their recipes filtered accurately, and invalid slugs return null/undefined.
- [ ] **Step 2: Run navigation test to verify failure**
Run: `npx vitest run tests/navigation.test.ts`
- [ ] **Step 3: Implement `app/explore/[slug]/page.tsx`**
Create the country/cuisine detail page with:
  - Dynamic route parameter `params.slug`.
  - Canonical region lookup matching `INDIAN_REGIONS` and `GLOBAL_CUISINES` by `id` or normalized slug.
  - Graceful Not-Found handling if region is invalid (`notFound()`).
  - Region header with icons, Malayalam title, culinary heritage narrative, specialties chips.
  - Filtered recipe cards linking directly to `/recipes/${r.id}`.
  - Breadcrumbs and back-navigation link to `/explore`.
- [ ] **Step 4: Update `app/explore/page.tsx` card links**
Update the region cards in `app/explore/page.tsx` to wrap or navigate with `<Link href={`/explore/${reg.id}`}>` so users can open in a new tab, navigate forward/backward, and preserve URL state.
- [ ] **Step 5: Support `?cuisine=` and `?country=` query params in `app/recipes/page.tsx`**
In `RecipesContent`, read `searchParams.get("cuisine")` and `searchParams.get("country")` on load and update `selectedCuisine` state automatically.
- [ ] **Step 6: Run navigation test to verify pass**
Run: `npx vitest run tests/navigation.test.ts`

---

### Task 2: Standardize Liquid-Glass Button & Interaction States

**Files:**
- Modify: `app/globals.css:120-220`
- Modify: `components/RecipeCard.tsx`
- Modify: `components/Navbar.tsx`

**Interfaces:**
- Consumes: CSS variables `--brand-primary`, `--glass-bg`, `--glass-border`, `--glass-shine`.
- Produces: `.glass-button`, `.glass-card`, `.glass-pill`, `button`, and `a` liquid-glass interactive states (hover, active/pressed, focus-visible, disabled, reduced-motion).

- [ ] **Step 1: Write interaction CSS tests**
Verify in a test script or style check that `.glass-button` and interactive states include `transform`, `box-shadow`, `backdrop-filter`, and `@media (prefers-reduced-motion)`.
- [ ] **Step 2: Enhance liquid-glass CSS classes in `app/globals.css`**
Add refined interaction tokens:
  - Subtle translucent depth and dynamic specular reflections.
  - `:hover`: gentle brightness lift, luminous border shimmer, subtle upward translation (`-1px`).
  - `:active`: tactile scale compression (`scale(0.97)` or `scale(0.98)`), softened specular highlight, no layout jump.
  - `:focus-visible`: clear 2px outline in emerald green with 2px offset.
  - `:disabled`: opacity 0.5, cursor not-allowed, pointer-events none.
  - Respect `@media (prefers-reduced-motion: reduce)` by disabling transitions and scale animations.
- [ ] **Step 3: Audit buttons across major pages**
Ensure buttons in `Navbar`, `RecipeCard`, `Explore`, `MealPlanner`, and `TableStyling` use `.glass-button` or consistent interactive classes.
- [ ] **Step 4: Verify build and styling**
Run: `npx tsc --noEmit`

---

### Task 3: Comprehensive Dish-to-Image Audit & Fix for Main Recipes (140 Dishes)

**Files:**
- Audit & Modify:
  - `lib/data/recipes-indian-south.ts`
  - `lib/data/recipes-karnataka-andhra.ts`
  - `lib/data/recipes-north-west-east.ts`
  - `lib/data/recipes-maharashtra-gujarat.ts`
  - `lib/data/recipes-bengali-east.ts`
  - `lib/data/recipes-international.ts` (specifically fixing salmon nigiri `photo-1579871494447-9811cf80d66c`)
  - `lib/data/recipes-mexican.ts`
  - `lib/data/recipes-chinese.ts`
  - `lib/data/recipes-thai.ts`
  - `lib/data/recipes-middle-eastern.ts`

**Interfaces:**
- Consumes: All 140 recipe objects from `RECIPES`.
- Produces: 140 unique, dish-specific, high-resolution culinary photography URLs without duplications or mismatched images.

- [ ] **Step 1: Write audit script to identify all duplicates and anomalies in Main Recipes**
Identify all repeated image URLs, including the salmon recipe pointing to aquarium/living fish, and map each recipe to its culinary description.
- [ ] **Step 2: Curate verified, distinct, high-res culinary image URLs**
For all 140 dishes, define authentic, verified images representing the prepared dish (e.g. Japanese salmon nigiri showing prepared sushi with pickled ginger and wasabi on slate, not live fish in water).
- [ ] **Step 3: Apply image corrections across recipe files**
Update each of the 10 recipe files with distinct, high-quality, verified images.
- [ ] **Step 4: Verify 100% image uniqueness in Main Recipes**
Verify that `new Set(RECIPES.map(r => r.imageUrl)).size === 140`.

---

### Task 4: Comprehensive Image Audit & Fix for Desserts (40) & Beverages (50)

**Files:**
- Audit & Modify:
  - `lib/data/desserts.ts` (specifically fixing `chakka-pradhaman` `photo-1544816155-12df9643f363` and eliminating any generic chapati references)
  - `lib/data/beverages.ts` (ensuring 50 unique beverage images in appropriate vessels)

**Interfaces:**
- Consumes: `DESSERT_RECIPES` (40 dishes), `BEVERAGE_RECIPES` (50 beverages).
- Produces: 40 unique dessert images and 50 unique beverage images, each depicting authentic food/drink.

- [ ] **Step 1: Check `chakka-pradhaman` and all 40 desserts**
Replace `photo-1544816155-12df9643f363` (packaging/book cover) on `des-chakka-pradhaman` with authentic Kerala jackfruit payasam in a traditional uruli or bowl with golden coconut flakes.
Verify all 40 desserts have 100% unique, dish-specific images.
- [ ] **Step 2: Check all 50 beverages**
Verify all 50 beverages have 100% unique, beverage-specific images in appropriate glassware/cups, with zero chapatis or solid-food confusion.
- [ ] **Step 3: Run uniqueness check across entire catalog (230 dishes)**
Verify that across all 230 dishes (140 + 40 + 50), all images are distinct and verified.

---

### Task 5: Build Centralized Image Registry & Duplicate Detection System

**Files:**
- Create: `lib/data/image-registry.ts`
- Create: `scripts/image-auditor.ts`
- Create: `tests/image-audit.test.ts`

**Interfaces:**
- Consumes: `RECIPES`, `DESSERT_RECIPES`, `BEVERAGE_RECIPES`.
- Produces: Typed image registry data structure, automated duplicate detector, and audit log.

- [ ] **Step 1: Define `ImageRegistryEntry` and `ImageAuditRecord` in `lib/data/image-registry.ts`**
Include: `imageId`, `recipeId`, `dishName`, `cuisine`, `category`, `imageUrl`, `source`, `license`, `dimensions`, `format`, `verificationStatus`, `semanticMatch`, `duplicateStatus`, `correctiveAction`, `lastCheckedDate`.
- [ ] **Step 2: Populate image registry for all 230 dishes**
Generate structured registry records with canonical image IDs (e.g. `IMG-REC-001`, `IMG-DES-001`, `IMG-BEV-001`).
- [ ] **Step 3: Write automated tests in `tests/image-audit.test.ts`**
Verify:
  - Total audited dishes = 230.
  - Zero broken URLs or invalid protocols.
  - Zero exact duplicates across the entire catalog.
  - Salmon dish has verified sushi/nigiri photography.
  - Jackfruit dish has verified payasam photography.
  - No dessert or beverage has a chapati/bread image.

---

### Task 6: 8-Sheet Excel Generation Engine (`Miseva_AI_Complete_Recipe_Catalogue.xlsx`)

**Files:**
- Create: `scripts/generate-recipe-excel.ts`
- Modify: `app/exports/page.tsx`
- Output: `public/exports/Miseva_AI_Complete_Recipe_Catalogue.xlsx` and artifact directory.

**Interfaces:**
- Consumes: Complete recipe data (230 dishes), image registry, bug register.
- Produces: Downloadable Microsoft Excel workbook (.xlsx) with 8 professionally styled sheets.

- [ ] **Step 1: Install `exceljs` and types**
Run: `npm install exceljs` and `npm install -D @types/exceljs`
- [ ] **Step 2: Implement `scripts/generate-recipe-excel.ts`**
Build the workbook with the following sheets:
  1. `Recipe Catalogue`: 230 rows, 21 columns (Recipe ID, Canonical Name, Malayalam/Alt Name, Country, Region, Cuisine, Category, Subcategory, Description, Prep Time, Cook Time, Total Time, Difficulty, Servings, Dietary Tags, Primary Image ID, Image URL, Image Verification, Recipe Verification, Source URL, Attribution, Last Updated).
  2. `Ingredients`: Individual ingredient rows (~1,200+ rows) with Recipe ID, Dish Name, Ingredient ID, Name, Malayalam Name, Amount, Unit, Notes, Category, Allergen.
  3. `Preparation Steps`: Individual step rows (~800+ rows) with Recipe ID, Dish Name, Step Number, Title, Full Instructions (English & Malayalam), Duration, Timer, Safety Notes, Verification Status.
  4. `Image Registry`: 230 rows with Image ID, Recipe ID, Dish Name, Asset URL, Source, License, Image Type, Dimensions, Format, File Size, Verification Status, Semantic Notes.
  5. `Image Audit`: 230 rows with Recipe ID, Dish Name, Cuisine, Category, Current Image, Current Image ID, Semantic Relevance Result, Duplicate Status, Missing Status, Problem Detected, Corrective Action, Replacement Image ID/URL, Verification Method, Final Audit Status.
  6. `Duplicate Image Report`: Duplicate groups, affected dishes, classification (exact vs visual), resolution status ("Resolved - Unique Dish-Specific Photography Assigned").
  7. `Bug and Regression Report`: All fixed bugs (Navigation, Salmon Aquarium photo, Jackfruit packaging photo, Chapati on desserts, Duplicated images, Liquid-glass touch states, Excel export).
  8. `Summary Dashboard`: Key performance indicators and catalog metrics calculated directly from the data.
- [ ] **Step 3: Apply professional formatting**
Frozen header rows, styled headers (emerald background `#004D40`, white bold text), alternating row fills, auto-fit column widths, text wrap on descriptions/instructions, borders, and number formatting.
- [ ] **Step 4: Execute generator and validate output file**
Run `npx tsx scripts/generate-recipe-excel.ts` and inspect generated file size and sheets.
- [ ] **Step 5: Update `app/exports/page.tsx`**
Add the new Excel workbook download card with file size, sheet count, and download link.

---

### Task 7: Automated Regression Testing Suite

**Files:**
- Create: `tests/excel-validation.test.ts`
- Update: `tests/navigation.test.ts`
- Update: `tests/image-audit.test.ts`

**Interfaces:**
- Consumes: Test runners Vitest.
- Produces: Test execution reports demonstrating 100% pass rate.

- [ ] **Step 1: Implement `tests/excel-validation.test.ts`**
Re-open the generated `.xlsx` workbook using `exceljs`, check that:
  - All 8 sheets exist with exact names.
  - Sheet 1 has 230 recipe rows.
  - Sheet 2 has ingredients for every dish without orphaned rows.
  - Sheet 3 has ordered steps without truncation.
  - Malayalam characters are intact (not corrupted or mojibake).
  - Sheet 8 metrics exactly match the row counts of Sheets 1-7.
- [ ] **Step 2: Run all tests**
Run: `npm test` or `npx vitest run`
Expected: ALL PASS.
- [ ] **Step 3: Run TypeScript compiler check**
Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 8: Production Build, Git Commit, and Deployment

**Files:**
- Package: `public/exports/Miseva_AI_Complete_Recipe_Catalogue.xlsx`
- Artifacts: Copy to conversation artifact directory.
- Push to GitHub `Janeferdinant/miseva-ai` and verify Vercel deployment.

- [ ] **Step 1: Run production build**
Run: `npm run build`
Expected: Next.js clean production build with static generation for all routes including `/explore/[slug]`.
- [ ] **Step 2: Commit all changes**
Git commit with descriptive message referencing all fixes, image audits, and Excel export.
- [ ] **Step 3: Push to `origin/main`**
Push using GitHub credentials from Windows Credential Manager.
- [ ] **Step 4: Verify Vercel deployment**
Verify live deployment status at `https://cusine-chi.vercel.app` and `/exports`.
- [ ] **Step 5: Generate Final Bug Register & Audit Report**
Document all findings, root causes, tests passed, and file locations for the user.
