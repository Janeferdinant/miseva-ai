# Miseva AI — Repository Separation, Cuisine Branding, Recipe Image Correction & Malayalam Support Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate the marketing automation system into its own standalone GitHub repository and Vercel project, clean the main cuisine application, build country- and state-inspired culinary visual emblems for all 23 regions, audit and fix all recipe/dessert images with professional food-only photography, and add a dedicated Malayalam translation button.

**Architecture:** 
1. `miseva-ai-marketing` isolated as a separate Next.js repo with its own package.json, routes, automated scheduling, and Vercel deployment.
2. `miseva-ai` (main cuisine app) purified: marketing routes/tabs removed; cuisine discovery elevated with SVG-based vector emblems for all 23 culinary regions.
3. Universal recipe image audit ensuring all 275 dishes (185 main, 40 desserts, 50 beverages) depict authentic food-only photography (zero people/hands/mismatches).
4. Dedicated `"മലയാളത്തിൽ വായിക്കുക"` (Read in Malayalam) translation UI view on all recipe pages, preserving exact quantities, units, and sequential instructions without relying on audio.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS, Vitest, Lucide React, SVG vector graphic design, GitHub API, Vercel CLI/API.

**Spec:** User prompt requirements and architectural guidelines for Miseva AI.

## Global Constraints
- Academic attribution: Jane Rose, Assistant Professor, CSE.
- Credential security: Windows Credential Manager (WCM) used for GitHub and Vercel deployment; zero committed secrets.
- Strict food photography rule: NO people, faces, hands, chefs, or silhouettes in any recipe images.
- Translation fidelity: Quantities and units MUST be preserved exactly during Malayalam translation; step order strictly maintained.
- Both repositories must build with zero errors and pass all tests independently.

## Review Focus
1. Dessert image relevance: Ensure every dessert (e.g. Palada Pradhaman, Unniyappam, Rasgulla, Mysore Pak) shows the actual sweet and NOT flatbreads/chapatis or generic puddings.
2. No human figures in food photography: Validate that all newly audited URLs feature food-only compositions.
3. Clean separation: Verify main cuisine app builds with 0 missing imports after marketing files are deleted.
4. Malayalam translation display: Test toggle state, Unicode rendering, ingredients quantity retention, and step numbering.
5. Independent deployment: Verify both GitHub repositories and Vercel deployments succeed.

---

### Task 1: Scaffolding and Deploying `miseva-ai-marketing`
**Files:**
- Create in external folder `c:\Users\Asus\Documents\miseva-ai-marketing\`:
  - `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
  - `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
  - `app/campaigns/page.tsx`
  - `app/api/marketing/...`
  - `lib/marketing/...`
  - `tests/marketing/...`
  - `README.md`
- Test: `npm test` and `npm run build` in `miseva-ai-marketing` directory

**Interfaces:**
- Produces: Standalone repository `https://github.com/Janeferdinant/miseva-ai-marketing` deployed to Vercel.

- [ ] **Step 1: Write directory scaffold script and copy marketing assets**
- [ ] **Step 2: Initialize git repo, commit, and push to `Janeferdinant/miseva-ai-marketing`**
- [ ] **Step 3: Run build and tests in marketing repo to verify independence**
- [ ] **Step 4: Deploy `miseva-ai-marketing` to Vercel**

---

### Task 2: Clean Marketing Artifacts from Main Cuisine Repository
**Files:**
- Modify: `components/Navbar.tsx` (remove Marketing navigation link)
- Modify: `README.md` (document separation of marketing into `miseva-ai-marketing`)
- Remove: `app/marketing/`, `app/campaigns/`, `app/api/marketing/`, `lib/marketing/`, `tests/marketing/`
- Test: `npm test` and `npm run build` in main repository

- [ ] **Step 1: Update `components/Navbar.tsx` to remove Marketing link**
- [ ] **Step 2: Safely remove marketing pages, routes, lib files, and test files**
- [ ] **Step 3: Run `npx tsc --noEmit` and `npm test` to ensure 0 broken imports**
- [ ] **Step 4: Commit changes in main repo**

---

### Task 3: Design Regional Cuisine Emblems
**Files:**
- Create: `components/CuisineEmblem.tsx`
- Modify: `app/explore/page.tsx`
- Modify: `app/explore/[slug]/page.tsx`
- Test: `tests/cuisine-emblems.test.ts`

- [ ] **Step 1: Write unit tests verifying that all 23 regions have a dedicated emblem**
- [ ] **Step 2: Implement `components/CuisineEmblem.tsx` with authentic culinary motifs for each region**
- [ ] **Step 3: Integrate `CuisineEmblem` into explore page and region detail page**
- [ ] **Step 4: Verify test passes and visual rendering is sharp**

---

### Task 4: Complete Audit & Correction of Recipe, Dessert & Beverage Images
**Files:**
- Modify: `lib/data/desserts.ts`
- Modify: `lib/data/recipes.ts`
- Modify: `lib/data/beverages.ts`
- Create/Run: `scripts/audit-recipe-images.ts`
- Test: `tests/image-audit.test.ts`

- [ ] **Step 1: Write test checking all 275 recipes for valid image URLs, no empty placeholders, no duplicates, and no mismatched desserts**
- [ ] **Step 2: Audit all 40 desserts (correct Palada Pradhaman, Unniyappam, Neyyappam, etc.) with high-definition food photography**
- [ ] **Step 3: Audit all 185 main recipes and 50 beverages to guarantee food-only photography with no people**
- [ ] **Step 4: Run test to verify all 275 items pass image quality and matching criteria**

---

### Task 5: Add Dedicated Malayalam Translation Button
**Files:**
- Create: `components/MalayalamRecipeView.tsx`
- Modify: `app/recipes/[id]/page.tsx`
- Modify: `app/desserts/[slug]/page.tsx`
- Modify: `app/beverages/[slug]/page.tsx`
- Test: `tests/malayalam-translation.test.ts`

- [ ] **Step 1: Write tests verifying translation toggle, ingredients quantity retention, step ordering, and fallback handling**
- [ ] **Step 2: Implement `components/MalayalamRecipeView.tsx` featuring the “മലയാളത്തിൽ വായിക്കുക” / “Read in Malayalam” button and detailed Malayalam card**
- [ ] **Step 3: Integrate component across all recipe, dessert, and beverage detail pages**
- [ ] **Step 4: Verify test passes and independent of voice narration**

---

### Task 6: Data Re-Export, Final Verification and Deployments
**Files:**
- Run: `npm run export:db` and `npm run export:excel`
- Verify: Vitest test suite (`npm test`) and production build (`npm run build`)
- Deploy: `scripts/git-push.ps1` and `scripts/vercel-deploy.ps1`

- [ ] **Step 1: Regenerate database exports and Excel catalog with updated image records**
- [ ] **Step 2: Run full test suite and Next.js build**
- [ ] **Step 3: Commit and push main cuisine app to GitHub, trigger Vercel deployment**
- [ ] **Step 4: Produce comprehensive final verification report**
