# CulinaryVerse AI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, production-ready, responsive, multilingual (English & Malayalam) AI cooking platform called **CulinaryVerse AI**, featuring 28 Indian states + 8 UTs + global cuisines, interactive AI chef studio, voice-guided cooking with synchronized Malayalam/English narration, liquid-glass theme system (6 themes), ingredient price comparison across Indian grocery retailers, smart meal planner, and academic footer branding.

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS with a modular feature architecture (`features/recipes`, `features/ai-chef`, `features/shopping`, `features/meal-planner`). Custom Liquid-Glass CSS variable tokens powering 6 themes in dark and light modes. Web Speech API + SpeechRecognition for voice cooking mode. Structured JSON-LD SEO, nutrition calculation, and dynamic unit scaling.

**Tech Stack:** Next.js 15 / React 19, TypeScript, Tailwind CSS, Lucide React, Canvas / SVG graphics, Web Speech API, Vitest for unit tests, Vercel CLI for deployment.

**Spec:** Antigravity Master Prompt — AI Cooking Agent (CulinaryVerse AI)

## Global Constraints
- Target workspace: `c:\Users\Asus\Documents\cusine`
- Separate Git repository name: `culinaryverse-ai`
- Footer Academic Branding: `Jane Rose`, `Assistant Professor, CSE` with text `CulinaryVerse AI — Discover cuisines, learn techniques, and cook with confidence.`
- Malayalam (മലയാളം) must be a first-class language with accurate script, transliteration, and voice narration controls.
- Six Liquid-Glass Themes: Emerald Kitchen, Saffron & Spice, Ocean Mist, Midnight Gourmet, Rose Quartz, Ivory Luxury.
- Real India grocery retailer comparison: Amazon India, Flipkart, Swiggy Instamart, Zepto, Blinkit, BigBasket with consumption cost vs. checkout pack cost.
- Do not stop at mockups or static cards; build fully functional calculators, timers, audio narration, meal planner, search, filter, and AI studio.

## Review Focus
1. Serving size recalculation with non-integer fractions (e.g. 1/2 tsp scaling to 3 servings) must format nicely without float precision glitches.
2. Malayalam text rendering on Windows/mobile browsers must have appropriate line-height and font fallback to avoid clipped glyphs (matras/chillu letters).
3. Speech synthesis fallback when Malayalam system voice is unavailable must display an informative notice and fall back gracefully without JavaScript runtime errors.
4. Ingredient pricing calculation must handle missing retailer listings by honestly displaying "Price unavailable" and providing direct search fallback links.
5. Liquid-glass themes must preserve contrast ratio >= 4.5:1 for body text against translucent surfaces across both light and dark modes.

---

### Task 1: Project Initialization & Liquid-Glass Design System Setup
**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `lib/theme/theme-context.tsx`
- Test: `tests/theme.test.ts`

**Interfaces:**
- Produces: `ThemeContext`, `ThemeType` ('emerald' | 'saffron' | 'ocean' | 'midnight' | 'rose' | 'ivory'), `ModeType` ('dark' | 'light'), `useTheme()` hook.

- [ ] **Step 1: Write the failing test for theme switcher and class resolution**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Initialize Next.js project with Tailwind CSS, Lucide icons, and Liquid-Glass CSS variables**
- [ ] **Step 4: Implement `lib/theme/theme-context.tsx` and theme provider with 6 liquid-glass themes**
- [ ] **Step 5: Run theme test to verify it passes**
- [ ] **Step 6: Commit**

---

### Task 2: Normalized Recipe Taxonomy & Comprehensive Indian/Global Database
**Files:**
- Create: `lib/types/recipe.ts`
- Create: `lib/data/cuisines.ts`
- Create: `lib/data/recipes.ts`
- Create: `lib/recipes/scaling.ts`
- Test: `tests/recipes.test.ts`

**Interfaces:**
- Produces: `Recipe`, `Ingredient`, `CookingStep`, `CuisineRegion`, `scaleRecipe(recipe: Recipe, targetServings: number): ScaledRecipe`.

- [ ] **Step 1: Write failing tests for recipe retrieval, regional filtering, and serving scaling**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Define TypeScript interfaces in `lib/types/recipe.ts`**
- [ ] **Step 4: Implement curated rich recipes covering all Indian culinary regions (Kerala, Tamil Nadu, Karnataka, Andhra, Punjab, Bengal, Gujarat, Maharashtra, Goa, Kashmir, Rajasthan, Assam/Northeast, etc.) and global cuisines (Italian, Japanese, Mexican, Thai, French, etc.) with both English & Malayalam details**
- [ ] **Step 5: Implement `scaleRecipe` utility with safe fraction formatting in `lib/recipes/scaling.ts`**
- [ ] **Step 6: Run tests to verify all pass**
- [ ] **Step 7: Commit**

---

### Task 3: Retailer Price Comparison & Shopping Intelligence Engine
**Files:**
- Create: `lib/types/pricing.ts`
- Create: `lib/pricing/retailer-service.ts`
- Create: `lib/pricing/cart-calculator.ts`
- Test: `tests/pricing.test.ts`

**Interfaces:**
- Produces: `IngredientPriceComparison`, `RetailerQuote`, `calculateRecipeCost(recipe: Recipe, servings: number, pincode?: string)`, `consolidateShoppingList(recipes: Recipe[])`.

- [ ] **Step 1: Write failing tests for consumption cost vs pack checkout cost and unit normalization**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement retailer service supporting Amazon India, Flipkart, Swiggy Instamart, Zepto, Blinkit, and BigBasket with real product URLs, verified benchmarks, and honest unavailable state handling**
- [ ] **Step 4: Implement `calculateRecipeCost` and `consolidateShoppingList` in `lib/pricing/cart-calculator.ts`**
- [ ] **Step 5: Run tests to verify they pass**
- [ ] **Step 6: Commit**

---

### Task 4: Multilingual Voice & Audio Cooking Engine (English & Malayalam)
**Files:**
- Create: `lib/voice/speech-engine.ts`
- Create: `features/recipes/components/AudioNarrationPlayer.tsx`
- Create: `features/recipes/components/HandsFreeCookingModal.tsx`
- Test: `tests/speech.test.ts`

**Interfaces:**
- Produces: `SpeechEngine`, `useSpeechNarration()`, `AudioNarrationPlayer`, `HandsFreeCookingModal` with step narration, timer triggers, and voice command recognition.

- [ ] **Step 1: Write failing test for speech synthesis configuration and fallback logic**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement Web Speech API synthesizer with Malayalam (`ml-IN`) and English voice selector & phonetic transliteration display**
- [ ] **Step 4: Build interactive `AudioNarrationPlayer` with karaoke step highlight, speed control (0.75x, 1x, 1.25x), step scrubber, and interactive timer**
- [ ] **Step 5: Build `HandsFreeCookingModal` with voice command parser (Next step, Previous step, Start timer, Repeat, Ingredients)**
- [ ] **Step 6: Run tests to verify they pass**
- [ ] **Step 7: Commit**

---

### Task 5: Core Pages & Liquid-Glass UI Components
**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`
- Create: `components/ThemeSelector.tsx`
- Create: `app/page.tsx` (Homepage with animated hero, featured Indian states, trending recipes, quick meals, ask-AI teaser)
- Create: `app/explore/page.tsx` (Interactive Indian states & global cuisine explorer with map/grid filters)
- Create: `app/recipes/page.tsx` (Recipe discovery with search, multi-faceted filtering, sorting)
- Create: `app/recipes/[id]/page.tsx` (Full recipe detail with hero, ingredients checklist, serving scaler, timers, audio player, pricing chart, safety tips)
- Create: `app/about/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`

**Interfaces:**
- Produces: Responsive, liquid-glass aesthetic pages with Jane Rose academic footer branding.

- [ ] **Step 1: Create reusable liquid-glass components (GlassCard, GlassButton, Badge, Modal, Input)**
- [ ] **Step 2: Build Navbar with search trigger, language switch, theme selector, and mobile drawer**
- [ ] **Step 3: Build Homepage with rich hero, state carousel, dietary tags, trending dishes**
- [ ] **Step 4: Build Indian State & Global Cuisine Explorer (`/explore`)**
- [ ] **Step 5: Build Recipe Discovery & Filtering page (`/recipes`)**
- [ ] **Step 6: Build Full Recipe Detail Page (`/recipes/[id]`) with active timers, serving scaler, Malayalam audio, price comparison table, and food safety layer**
- [ ] **Step 7: Build Footer with academic branding (`Jane Rose, Assistant Professor, CSE`) and policy pages**
- [ ] **Step 8: Run build test to verify compilation**
- [ ] **Step 9: Commit**

---

### Task 6: AI Cooking Studio & Conversational Chef
**Files:**
- Create: `app/ai-chef/page.tsx`
- Create: `lib/ai/cooking-agent.ts`
- Create: `features/ai-chef/components/ChefChatInterface.tsx`
- Create: `features/ai-chef/components/PantryFinder.tsx`
- Test: `tests/ai-agent.test.ts`

**Interfaces:**
- Produces: Interactive AI Chef Studio with RAG knowledge retrieval, pantry ingredient matcher, substitution advisor, and structured recipe recommendations.

- [ ] **Step 1: Write failing test for AI Chef query router and pantry ingredient matching**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `lib/ai/cooking-agent.ts` with local culinary reasoning engine, recipe retrieval, dietary constraint solver, and substitution database**
- [ ] **Step 4: Build conversational UI with pre-built prompt pills, audio reply capability, and direct recipe card embedding**
- [ ] **Step 5: Implement Pantry Assistant allowing users to pick home ingredients and view matched dishes**
- [ ] **Step 6: Run tests to verify they pass**
- [ ] **Step 7: Commit**

---

### Task 7: Smart Meal Planner & Shopping Cart Intelligence
**Files:**
- Create: `app/meal-planner/page.tsx`
- Create: `app/shopping/page.tsx`
- Create: `lib/storage/user-store.ts`
- Test: `tests/meal-planner.test.ts`

**Interfaces:**
- Produces: 7-day meal planner (Breakfast, Lunch, Dinner, Snack), grocery budget calculator, consolidated shopping list with pantry exclusions, export to PDF/print.

- [ ] **Step 1: Write failing test for meal planner cost rollup and shopping list aggregation**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement client-side persistent storage for saved recipes, meal plans, and shopping items in `lib/storage/user-store.ts`**
- [ ] **Step 4: Build interactive weekly Meal Planner calendar UI (`/meal-planner`)**
- [ ] **Step 5: Build Shopping & Cost Comparison hub (`/shopping`) with retailer breakdowns, PIN code availability tester, and print/export feature**
- [ ] **Step 6: Run tests to verify they pass**
- [ ] **Step 7: Commit**

---

### Task 8: Visual Excellence, 4K Food Visuals & Micro-Animations
**Files:**
- Create: `public/images/...` (Generate high quality food visuals for dishes & regional banners)
- Create: `components/FoodVisualCard.tsx`
- Modify: `app/globals.css` with shimmer, glass reflections, and smooth transitions

- [ ] **Step 1: Generate original high-definition food visual assets using `generate_image` or SVG culinary canvas representations for hero dishes (Kerala Sadya, Malabar Biryani, Hyderabadi Biryani, Butter Chicken, Dosa, Ramen, etc.)**
- [ ] **Step 2: Implement responsive picture tags with lazy loading, WebP fallbacks, and glass overlay styling**
- [ ] **Step 3: Add subtle micro-animations (steam indicators, active cooking step pulse, timer ring animation, glass reflection hover)**
- [ ] **Step 4: Commit**

---

### Task 9: End-to-End Verification, Browser Testing & Test Suite Execution
- [ ] **Step 1: Run comprehensive unit test suite (`npm run test`)**
- [ ] **Step 2: Run Next.js production build (`npm run build`) and fix any lint or type discrepancies**
- [ ] **Step 3: Launch dev server and run browser subagent to interact with pages, test serving scaler, audio player, theme switcher, AI chef, and shopping cost comparison**
- [ ] **Step 4: Verify mobile responsiveness and accessibility**

---

### Task 10: Git Repository & Vercel Production Deployment
- [ ] **Step 1: Initialize Git repository `culinaryverse-ai` and create `.gitignore`**
- [ ] **Step 2: Commit all production-ready codebase with clean commit history**
- [ ] **Step 3: Deploy to Vercel via `npx vercel --prod --yes`**
- [ ] **Step 4: Verify production live URL and document credentials, endpoints, and features in README.md**
