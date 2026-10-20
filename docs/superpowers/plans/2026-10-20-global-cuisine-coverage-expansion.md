# Miseva AI — Complete Global Cuisine Coverage & Recipe Database Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate all regional culinary gaps across Miseva AI so that every single country, state, territory, and culinary region in the platform has at least five complete, authentic, fully detailed recipes with verified imagery, Malayalam narration, and automated shopping-list aggregation, paired with an interactive Geographic Coverage Administration Dashboard.

**Architecture:** 
1. Build dedicated culinary data modules for the 9 shortfall regions (Kashmir, Uttar Pradesh, Delhi, Goa, Rajasthan, Odisha, Assam & Northeast, France, Korea) containing 5 complete authentic recipes each (45 total new dishes).
2. Register Chinese cuisine into `GLOBAL_CUISINES` to formally unite the existing 10 Chinese dishes with the geographic taxonomy.
3. Integrate verified, high-resolution, dish-specific culinary photography for all 45 new dishes with zero URL duplicates and 100% HTTP 200 uptime.
4. Extend the Geographic Coverage Audit API (`/api/coverage-audit`) and create an Interactive Geographic Coverage & Admin Dashboard UI at `/coverage-audit` with live filters, completion metrics, and missing field diagnostics.
5. Upgrade the shopping list generator with multi-recipe smart aggregation, category grouping, and unit normalization.
6. Regenerate database CSVs and the 8-sheet Excel Master Catalogue.
7. Implement comprehensive Vitest validation tests ensuring zero regions fall below the 5-recipe minimum.

**Tech Stack:** Next.js 16 (App Router + Turbopack), TypeScript 5.9, React 19, Tailwind CSS / Vanilla CSS glassmorphic tokens, Vitest, ExcelJS.

**Spec:** User prompt "MISEVA AI — COMPLETE GLOBAL CUISINE COVERAGE & RECIPE DATABASE EXPANSION".

---

## Global Constraints
- Target regions with shortfalls: Kashmir (5), Uttar Pradesh (5), Delhi (5), Goa (5), Rajasthan (5), Odisha (5), Assam & Northeast (5), France (5), Korea (5).
- Every single recipe must have: ID, Title, TitleMalayalam, Tagline, Description, DescriptionMalayalam, Cuisine, StateOrCountry, Region, MealType, Dietary, Difficulty, PrepTime, CookTime, Servings, ImageUrl (verified 200, distinct), Ingredients (with Malayalam names, quantities, units, categories), Instructions (stepNumber, title, text, textMalayalam, tips, technique), Nutrition, FoodSafety, Equipment, CulturalContext, SourceAttribution, Verified.
- All 22 regions must achieve >= 5 complete recipes.
- Zero duplicate image URLs across the entire expanded catalog.
- Academic attribution: Jane Rose, Assistant Professor, CSE.

---

## Tasks

### Task 1: Geographic Hierarchy & Shortfall Audit Engine
**Files:**
- Modify: `lib/data/cuisines.ts`
- Modify: `app/api/coverage-audit/route.ts`
- Test: `tests/audit/coverage-audit.test.ts`

- [ ] Add `china` to `GLOBAL_CUISINES` in `lib/data/cuisines.ts` so the existing 10 Chinese recipes map cleanly to the global taxonomy.
- [ ] Upgrade `/api/coverage-audit/route.ts` to output complete metrics for all 23 listed geographic entities:
  - Region name, region type, parent geographic region.
  - Total complete recipes, recipes with valid images, complete ingredients, complete instructions, shopping-list compatibility.
  - Completion percentage and validation status (COMPLIANT if >= 5 complete dishes).
- [ ] Run `npx vitest run tests/audit/coverage-audit.test.ts` to verify the audit baseline.

### Task 2: North Indian Expansion (Kashmir, Uttar Pradesh, Delhi — 15 Recipes)
**Files:**
- Create: `lib/data/recipes-north-expansion.ts`
- Modify: `lib/data/recipes.ts`
- Test: `tests/culinary/recipes.test.ts`

- [ ] Author 5 authentic **Kashmiri** recipes:
  1. `kas-rogan-josh` (Kashmiri Mutton Rogan Josh in Maval petals & fennel)
  2. `kas-dum-olav` (Authentic Kashmiri Dum Aloo with sonth & saunf)
  3. `kas-yakhni` (Kashmiri Nadru / Lotus Stem Yakhni in yogurt-mint gravy)
  4. `kas-modur-pulao` (Sweet Saffron Kashmiri Modur Pulao with dry fruits)
  5. `kas-saffron-kahwa-platter` (Kashmiri Kehwa & Girda Roti Breakfast)
- [ ] Author 5 authentic **Uttar Pradesh / Awadhi** recipes:
  1. `up-awadhi-dum-biryani` (Lucknowi Awadhi Chicken Dum Biryani in Kewra & Saffron)
  2. `up-galouti-kebab` (Melt-in-Mouth Awadhi Galouti Kebab with Mughlai Paratha)
  3. `up-banarasi-tamatar-chaat` (Banarasi Tamatar Chaat with Khoya & Cumin syrup)
  4. `up-bedmi-puri-aloo` (Mathura Bedmi Puri with Dubki Wale Hing Aloo)
  5. `up-nimona` (Winter Fresh Green Peas Matar Ka Nimona)
- [ ] Author 5 authentic **Delhi** recipes:
  1. `del-chole-bhature` (Pindi Chole with Puffed Paneer-Stuffed Bhature)
  2. `del-tandoori-chicken` (Authentic Old Delhi Charred Tandoori Chicken)
  3. `del-chandni-chowk-paratha` (Gali Paranthe Wali Crispy Stuffed Paratha with Achar)
  4. `del-dahi-bhalla` (Delhi Chaat Spiced Dahi Bhalla with Saunth & Sev)
  5. `del-shahi-tukda` (Old Delhi Jama Masjid Shahi Tukda with Rabri)
- [ ] Link in `lib/data/recipes.ts` and verify build.

### Task 3: West & East Indian Expansion (Goa, Rajasthan, Odisha, Assam & Northeast — 20 Recipes)
**Files:**
- Create: `lib/data/recipes-regional-expansion.ts`
- Modify: `lib/data/recipes.ts`
- Test: `tests/culinary/recipes.test.ts`

- [ ] Author 5 authentic **Goan** recipes:
  1. `goa-fish-curry-kodi` (Traditional Goan Fish Curry Kodi with Kokum & Coconut)
  2. `goa-chicken-xacuti` (Spicy Roasted Coconut & Poppy Seed Chicken Xacuti)
  3. `goa-pork-vindaloo` (Indo-Portuguese Toddy Vinegar & Kashmiri Chili Pork Vindaloo)
  4. `goa-caldine-vegetable` (Mild Coconut Turmeric Vegetable Caldine Stew)
  5. `goa-poi-chorizo` (Spiced Goan Sausage Chili Fry with Traditional Poi Bread)
- [ ] Author 5 authentic **Rajasthani** recipes:
  1. `raj-dal-baati-churma` (Royal Panchmel Dal with Ghee-Dipped Baati & Sweet Churma)
  2. `raj-laal-maas` (Fiery Mathania Red Chili Smoked Mutton Laal Maas)
  3. `raj-gatte-ki-sabzi` (Steamed Gram Flour Dumplings in Spiced Yogurt Gravy)
  4. `raj-ker-sangri` (Desert Bean & Wild Berry Stir Fry in Mustard Oil)
  5. `raj-pyaaz-kachori` (Crispy Jodhpur Flaky Onion & Asafoetida Kachori)
- [ ] Author 5 authentic **Odia** recipes:
  1. `odi-dalma` (Puri Temple Style Roasted Moong Dalma with Crushed Coconut & Ghee)
  2. `odi-pakhala-bhata` (Fermented Rice Pakhala with Badi Chura & Fried Fish)
  3. `odi-macha-ghanta` (Traditional Odia Carp Fish Head Chencheda / Ghanta)
  4. `odi-santula` (Panch Phoron Steamed Vegetable Stew with Garlic Tempering)
  5. `odi-chhena-tarkari` (Fried Fresh Chhena Dumplings in Rich Tomato-Cumin Gravy)
- [ ] Author 5 authentic **Assamese & Northeast** recipes:
  1. `asm-masor-tenga` (Assamese Tangy Freshwater Rohu Fish Curry with Ou Tenga)
  2. `asm-omita-khar` (Traditional Alkaline Papaya & Panch Phoron Khar)
  3. `asm-pork-bamboo-shoot` (Naga / Assamese Smoked Pork with Fermented Bamboo Shoots)
  4. `asm-kordoi-aloo-pitika` (Charred Mustard Oil Potato & Starfruit Mash)
  5. `asm-til-pitha` (Sticky Bora Rice Rolls Stuffed with Jaggery & Black Sesame)
- [ ] Link in `lib/data/recipes.ts` and verify build.

### Task 4: Global Expansion (France & Korea — 10 Recipes)
**Files:**
- Create: `lib/data/recipes-global-expansion.ts`
- Modify: `lib/data/recipes.ts`
- Test: `tests/culinary/recipes.test.ts`

- [ ] Author 5 authentic **French** recipes:
  1. `fra-boeuf-bourguignon` (Slow-Braised Burgundy Beef Stew with Pearl Onions & Mushrooms)
  2. `fra-ratatouille-nicoise` (Layered Provençal Vegetable Confit Byaldi Ratatouille)
  3. `fra-soupe-a-l-oignon` (Classic Parisian Caramelized French Onion Soup Gratinée)
  4. `fra-quiche-lorraine` (Flaky Savory Tart with Smoked Bacon Lardons & Gruyère)
  5. `fra-coq-au-vin` (Red Wine Braised Chicken with Lardons, Thyme & Button Mushrooms)
- [ ] Author 5 authentic **Korean** recipes:
  1. `kor-dolsot-bibimbap` (Sizzling Stone Pot Rice with Namul, Bulgogi Beef & Gochujang)
  2. `kor-kimchi-jjigae` (Aged Kimchi & Pork Belly Stew with Silken Tofu)
  3. `kor-bulgogi` (Tender Marinated Ribeye Beef with Asian Pear & Sesame)
  4. `kor-japchae` (Stir-Fried Sweet Potato Glass Noodles with Spinach & Mushrooms)
  5. `kor-korean-fried-chicken` (Dakgangjeong Ultra-Crispy Double-Fried Glazed Chicken)
- [ ] Link in `lib/data/recipes.ts` and verify build.

### Task 5: Verified Imagery Integration for all 45 New Recipes
**Files:**
- Modify: `lib/data/recipes-north-expansion.ts`
- Modify: `lib/data/recipes-regional-expansion.ts`
- Modify: `lib/data/recipes-global-expansion.ts`
- Test: `tests/audit/image-audit.test.ts`

- [ ] Attach 45 distinct, authentic, live HTTP 200 culinary photographs from Wikimedia Commons / Unsplash specifically corresponding to each new dish.
- [ ] Run `scripts/check-image-urls.ts` and `tests/audit/image-audit.test.ts` to ensure 100% uniqueness (no duplicate URLs across the entire 275+ catalog) and zero 404s.

### Task 6: Smart Shopping List Aggregation Engine
**Files:**
- Create: `lib/shopping/shopping-aggregator.ts`
- Modify: `app/shopping/page.tsx`
- Test: `tests/culinary/shopping-aggregator.test.ts`

- [ ] Implement `aggregateIngredients(recipes: Recipe[])` with:
  - Smart name normalization (e.g. "Ghee", "Pure Cow Ghee", "Desi Ghee" -> "Desi Ghee").
  - Compatible unit combination (grams + grams, ml + ml, pieces + pieces).
  - Categorization into 7 groups (Produce, Staples & Grains, Spices & Seasoning, Dairy & Fats, Protein & Seafood, Oils & Condiments, Pantry).
  - Ticking off items, editing amounts, and export/share formatting.
- [ ] Connect into `/shopping` page with multi-recipe selection.

### Task 7: Interactive Geographic Coverage & Administration Dashboard
**Files:**
- Create: `app/coverage-audit/page.tsx`
- Modify: `components/Navbar.tsx`
- Test: `tests/audit/coverage-audit.test.ts`

- [ ] Build a sleek, glassmorphic Geographic Coverage Dashboard displaying:
  - Macro KPI summary cards (Total Regions: 23, Total Recipes: 275, Compliant Regions: 23/23, 100% Minimum Guaranteed).
  - Interactive Region Table with columns: Region Name, Type, Parent Region, Total Recipes, Complete Ingredients, Complete Instructions, Verified Images, Shopping-List Ready, Coverage Status (✅ Complete / ⚠️ Below Minimum).
  - Filters by Parent Region (South India, North India, West India, East India, Northeast India, Global), Status, and search.
  - Drilldown modal to preview all dishes under any region.

### Task 8: Data Exports & Comprehensive Verification
**Files:**
- Run: `npm run export:db; npm run export:excel`
- Test: Full Vitest suite (`npm test`)

- [ ] Regenerate database CSVs and the 8-sheet Excel Master Catalogue (`Miseva_AI_Complete_Recipe_Catalogue.xlsx`).
- [ ] Verify all 37 test suites pass (170+ tests passing, 0 failures).
- [ ] Run `npx tsc --noEmit` and `npm run build` to verify production build.
- [ ] Deploy to Vercel via git push.
