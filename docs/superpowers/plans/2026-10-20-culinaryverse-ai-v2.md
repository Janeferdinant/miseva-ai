# CulinaryVerse AI (v2) Implementation Plan — Web, Native Android, 10+ Recipe Coverage, Studios & Tablescaping

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand **CulinaryVerse AI** into a dual-client production platform consisting of a responsive Next.js web application and a native Kotlin Jetpack Compose Android application, with at least 10 distinct recipes across every published cuisine and category, dedicated Desserts and Beverages studios, a complete Table Decoration & Tablescaping Studio with 10+ concepts per collection and an interactive layout generator, shared backend APIs, bilingual (English & Malayalam) narration, and automated coverage validation.

**Architecture:** Next.js (App Router, React 19, TypeScript) shared backend serving REST APIs (`/api/recipes`, `/api/cuisines`, `/api/table-styling`, `/api/pricing`, `/api/ai-chef`, `/api/coverage-audit`) to both the web frontend and a native Android app in `android/` built with Jetpack Compose, Material 3 liquid-glass theme tokens, Room database for offline data, Retrofit/OkHttp, and Kotlin coroutines. Coverage audit enforcement via automated Vitest suite.

**Tech Stack:**
- **Web & Backend:** Next.js 16 (App Router), React 19, TypeScript 5.7+, Tailwind CSS 3.4, Lucide React, Web Speech API, Vitest 5.0.
- **Android App:** Kotlin 2.0+, Jetpack Compose, Material 3, AndroidX Navigation Compose, AndroidX Room (SQLite), Retrofit 2 + Moshi/Gson, Android TextToSpeech (`TextToSpeech`), Coroutines & StateFlow.
- **Styling:** 6 Liquid-Glass Themes (Emerald Kitchen, Saffron & Spice, Ocean Mist, Midnight Gourmet, Rose Quartz, Ivory Luxury) shared across Web CSS variables and Compose Color schemes.

**Spec:** CulinaryVerse AI — Updated Master Prompt for Google Antigravity

## Global Constraints
- **Dual Application Requirement:** Both responsive Web application and genuine native Android Jetpack Compose application must be implemented in the repository.
- **10+ Recipe Rule:** Every published cuisine, region, and category (Kerala, Tamil Nadu, Punjabi, Karnataka, Andhra, Bengal, Gujarat, Maharashtra, Italian, Japanese, Mexican, Chinese, Thai, French, Middle Eastern; Breakfast, Lunch, Dinner, Snacks, Rice, Breads, Curries, Desserts subcategories, Juices subcategories) must have at least 10 distinct authentic recipes.
- **10+ Table Styling Rule:** Every published tablescaping collection must have at least 10 complete, distinct concepts.
- **Automated Validation:** A database coverage audit script (`tests/coverage-audit.test.ts`) must run and assert that every published collection meets the 10+ minimum without duplicates.
- **Multilingual Support:** English and Malayalam (മലയാളം ലിപി + optional romanization) throughout recipe details, instructions, voice narration, and tablescaping guides.
- **Academic Supervision Branding:** Footer on Web and About/Profile on Android must display:
  `Jane Rose`, `Assistant Professor, CSE`
  `CulinaryVerse AI — Discover cuisines, learn techniques, style your table, and cook with confidence.`
- **Retailer Price Integrity:** Real product links and normalized units across Amazon Fresh, Flipkart Grocery, Swiggy Instamart, Blinkit, Zepto, and BigBasket with honest unavailable states; no fabricated transactions.

## Review Focus
1. Ensuring every published cuisine and subcategory strictly satisfies the >= 10 distinct recipe requirement with full bilingual data without placeholder titles or duplicates.
2. Jetpack Compose UI themes on Android must accurately replicate the 6 Liquid-Glass themes (frosted glass card containers, gradient surface borders, ambient glowing highlights) with WCAG AA contrast.
3. Offline Room database in Android must cache recipes, user favorites, and meal plans so cooks can view instructions without internet connection.
4. The Table Styling Studio interactive generator must dynamically calculate dimensions, plates, cutlery, centerpiece layout, and estimated decoration budgets for any selected guest count (2 to 20+ guests).
5. Android Text-to-Speech engine must gracefully handle Malayalam speech synthesis (`Locale("ml", "IN")`) with automatic fallback to system default when Malayalam voice data is not locally pre-installed on the Android device.

---

### Task 1: Comprehensive Recipe Database Expansion & Automated Coverage Audit
**Files:**
- Modify: `lib/types/recipe.ts`
- Modify: `lib/data/cuisines.ts`
- Modify: `lib/data/recipes.ts`
- Create: `tests/coverage-audit.test.ts`
- Create: `scripts/audit-coverage.ts`

**Interfaces:**
- Consumes: `Recipe`, `CuisineRegion` from `lib/types/recipe.ts`.
- Produces: Complete catalogue with >= 10 recipes for:
  - Kerala (10 recipes)
  - Tamil Nadu (10 recipes)
  - Punjab (10 recipes)
  - Karnataka (10 recipes)
  - Andhra Pradesh & Telangana (10 recipes)
  - Maharashtra (10 recipes)
  - Gujarat (10 recipes)
  - West Bengal (10 recipes)
  - Other Indian Heritage (Kashmir, Rajasthan, Goa, Odisha, Assam - 10 recipes)
  - Italian (10 recipes)
  - Japanese (10 recipes)
  - Mexican (10 recipes)
  - Chinese & Pan-Asian (10 recipes)
  - Thai (10 recipes)
  - French & Mediterranean (10 recipes)
  - Middle Eastern (10 recipes)
  - Categories: Breakfast (10+), Lunch (10+), Dinner (10+), Snacks & Street Food (10+), Rice Dishes (10+), Breads (10+), Curries (10+).

- [ ] **Step 1: Write the failing coverage audit test in `tests/coverage-audit.test.ts`**
- [ ] **Step 2: Run test to verify it fails on missing categories**
- [ ] **Step 3: Expand `lib/data/recipes.ts` with authentic, source-attributed recipes containing bilingual titles, Malayalam script, detailed ingredients, step-by-step instructions, and nutritional data**
- [ ] **Step 4: Run `npm test tests/coverage-audit.test.ts` to verify 100% pass across all collections**
- [ ] **Step 5: Commit**

---

### Task 2: Dedicated Desserts & Sweets Studio (`/desserts`)
**Files:**
- Create: `lib/types/dessert.ts`
- Create: `lib/data/desserts.ts`
- Create: `app/desserts/page.tsx`
- Create: `app/desserts/[slug]/page.tsx`
- Create: `features/desserts/components/DessertCard.tsx`
- Create: `features/desserts/components/DessertDetailView.tsx`
- Create: `features/desserts/components/DonenessIndicator.tsx`
- Test: `tests/desserts.test.ts`

**Interfaces:**
- Produces: `DessertRecipe`, `DessertCategory` ('payasam-pradhaman' | 'traditional-mithai' | 'cakes-bakes' | 'global-desserts'), with 10+ recipes each:
  - Payasam & Pradhaman (10 recipes)
  - Traditional Indian Mithai (10 recipes)
  - Cakes, Pastries & Puddings (10 recipes)
  - International & Gourmet Desserts (10 recipes)
- Features: Baking temperature & oven conversions, visual doneness stages, sugar substitutions, allergen alerts, English & Malayalam narration.

- [ ] **Step 1: Write failing unit tests for dessert filtering, doneness indicators, and 10+ rule per subcategory**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `lib/data/desserts.ts` with 40+ curated dessert recipes across all 4 subcategories**
- [ ] **Step 4: Build `/app/desserts/page.tsx` with subcategory tabs, temperature guides, and liquid-glass cards**
- [ ] **Step 5: Build `/app/desserts/[slug]/page.tsx` with doneness indicators, bilingual voice narration, and baking timers**
- [ ] **Step 6: Run tests and verify all pass**
- [ ] **Step 7: Commit**

---

### Task 3: Dedicated Juices, Drinks & Beverages Studio (`/beverages`)
**Files:**
- Create: `lib/types/beverage.ts`
- Create: `lib/data/beverages.ts`
- Create: `app/beverages/page.tsx`
- Create: `app/beverages/[slug]/page.tsx`
- Create: `features/beverages/components/BeverageCard.tsx`
- Create: `features/beverages/components/BeverageDetailView.tsx`
- Create: `features/beverages/components/SugarAdjuster.tsx`
- Test: `tests/beverages.test.ts`

**Interfaces:**
- Produces: `BeverageRecipe`, `BeverageCategory` ('fresh-juices' | 'smoothies-shakes' | 'traditional-refreshers' | 'mocktails-lemonades' | 'teas-coffees'), with 10+ recipes each:
  - Fresh Fruit & Vegetable Juices (10 recipes)
  - Smoothies & Milkshakes (10 recipes)
  - Traditional Indian & Kerala Refreshers (10 recipes: Kulukki Sarbath, Sambharam, Badam Milk, Thandai, etc.)
  - Mocktails & Sparkling Refreshers (10 recipes)
  - Artisanal Teas & Coffees (10 recipes: Sulaimani Chai, Masala Chai, Filter Coffee, etc.)
- Features: Blending vs brewing steps, sugar level calculator (0%, 25%, 50%, 100%), ice/chill guidance, serving cost.

- [ ] **Step 1: Write failing unit tests for beverage subcategories, sugar adjuster, and 10+ recipe rule**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `lib/data/beverages.ts` with 50+ authentic beverage recipes across 5 subcategories**
- [ ] **Step 4: Build `/app/beverages/page.tsx` with category filters, wellness flags, and glassmorphic showcase**
- [ ] **Step 5: Build `/app/beverages/[slug]/page.tsx` with sugar adjuster, refrigeration guidelines, and audio narration**
- [ ] **Step 6: Run tests to verify all pass**
- [ ] **Step 7: Commit**

---

### Task 4: Dedicated Table Decoration & Tablescaping Studio (`/table-styling`)
**Files:**
- Create: `lib/types/table-styling.ts`
- Create: `lib/data/table-styling-concepts.ts`
- Create: `lib/table-styling/generator.ts`
- Create: `app/table-styling/page.tsx`
- Create: `app/table-styling/[slug]/page.tsx`
- Create: `features/table-styling/components/TableGeneratorForm.tsx`
- Create: `features/table-styling/components/TableLayoutCanvas.tsx`
- Create: `features/table-styling/components/NapkinFoldingGuide.tsx`
- Create: `features/table-styling/components/StylingPlanView.tsx`
- Test: `tests/table-styling.test.ts`

**Interfaces:**
- Produces: `TableStylingConcept`, `TableDesignPlan`, `generateTablePlan(config: TableGeneratorConfig)`.
- Collections with >= 10 concepts each:
  - Kerala Sadya & Banana Leaf Banquets (10 concepts)
  - Festive Indian Dining (Onam, Vishu, Diwali, Eid, Christmas, etc. - 10 concepts)
  - Celebrations & Romantic Banquets (Weddings, Anniversaries, Kids, Romantic Dinners - 10 concepts)
  - Minimalist, Rustic & Garden Dining (10 concepts)
- Generator features:
  - Inputs: Occasion, guest count (2-24), table shape (rectangular, round, oval, square), indoor/outdoor, budget range, color palette, serving style (plated, buffet, banana leaf, family style).
  - Outputs: Interactive 2D layout canvas with plates, bowls, glassware, cutlery, centerpiece, floral runners, napkin folds, ambient candle placement, step-by-step styling checklist, estimated decoration budget with itemized store links, and bilingual narration.

- [ ] **Step 1: Write failing unit tests for table styling collections and plan generator math**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `lib/data/table-styling-concepts.ts` with 40+ complete styling concepts**
- [ ] **Step 4: Implement `generateTablePlan` in `lib/table-styling/generator.ts` with geometric layout calculation**
- [ ] **Step 5: Build interactive canvas and generator UI in `app/table-styling/page.tsx`**
- [ ] **Step 6: Build concept detail view in `app/table-styling/[slug]/page.tsx`**
- [ ] **Step 7: Run tests to verify all pass**
- [ ] **Step 8: Commit**

---

### Task 5: Shared REST API Layer for Web and Android
**Files:**
- Create: `app/api/recipes/route.ts`
- Create: `app/api/recipes/[id]/route.ts`
- Create: `app/api/cuisines/route.ts`
- Create: `app/api/desserts/route.ts`
- Create: `app/api/beverages/route.ts`
- Create: `app/api/table-styling/route.ts`
- Create: `app/api/table-styling/generate/route.ts`
- Create: `app/api/pricing/route.ts`
- Create: `app/api/ai-chef/route.ts`
- Create: `app/api/coverage-audit/route.ts`
- Test: `tests/api-routes.test.ts`

**Interfaces:**
- Produces: Standardized JSON API responses with CORS headers for native Android client access.
  - `GET /api/recipes?cuisine=...&category=...&search=...`
  - `GET /api/recipes/[id]?servings=...`
  - `GET /api/cuisines`
  - `GET /api/desserts`
  - `GET /api/beverages`
  - `GET /api/table-styling`
  - `POST /api/table-styling/generate`
  - `GET /api/pricing?recipeId=...&pincode=...`
  - `POST /api/ai-chef`
  - `GET /api/coverage-audit`

- [ ] **Step 1: Write failing tests for shared API route handlers**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement all Next.js App Router API route handlers with input validation and CORS**
- [ ] **Step 4: Run API tests to verify clean 200 OK responses and proper schema structures**
- [ ] **Step 5: Commit**

---

### Task 6: Native Android Jetpack Compose Application (`android/`)
**Files:**
- Create: `android/build.gradle.kts`
- Create: `android/settings.gradle.kts`
- Create: `android/gradle.properties`
- Create: `android/gradle/wrapper/gradle-wrapper.properties`
- Create: `android/app/build.gradle.kts`
- Create: `android/app/src/main/AndroidManifest.xml`
- Create: `android/app/src/main/java/com/culinaryverse/ai/MainActivity.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/CulinaryVerseApp.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/model/Recipe.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/model/TableStyling.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/local/RecipeEntity.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/local/RecipeDao.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/local/CulinaryVerseDatabase.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/remote/CulinaryVerseApiService.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/data/repository/RecipeRepository.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/theme/Theme.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/theme/Color.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/navigation/CulinaryNavGraph.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/HomeScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/RecipeDetailScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/CookingStudioScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/DessertsScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/BeveragesScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/TableStylingScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/ShoppingScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/MealPlannerScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/ui/screens/AboutScreen.kt`
- Create: `android/app/src/main/java/com/culinaryverse/ai/voice/AndroidSpeechHelper.kt`
- Create: `android/app/src/test/java/com/culinaryverse/ai/RecipeRepositoryTest.kt`

**Architecture:**
- Modern Jetpack Compose with Material 3 styling adapted to the 6 liquid-glass themes.
- Navigation Compose with bottom navigation bar and deep-link handling.
- Room database for offline recipe and meal-plan synchronization.
- Android TextToSpeech engine with Malayalam (`ml-IN`) and English narration.
- Screen awake lock (`FLAG_KEEP_SCREEN_ON`) during active cooking studio sessions.
- Academic branding in AboutScreen: `Jane Rose`, `Assistant Professor, CSE`.

- [ ] **Step 1: Scaffold native Android project structure in `android/` with Gradle configuration**
- [ ] **Step 2: Implement Room database entities, DAO, and database builder**
- [ ] **Step 3: Implement Retrofit API service and Repository with offline cache fallback**
- [ ] **Step 4: Implement Material 3 Liquid-Glass theme system (6 palettes)**
- [ ] **Step 5: Implement all Compose screens: Home, Detail, Cooking Studio, Desserts, Beverages, Table Styling, Shopping, Meal Planner, About**
- [ ] **Step 6: Implement Android TextToSpeech helper and unit tests**
- [ ] **Step 7: Verify Gradle project structure and Android unit tests**
- [ ] **Step 8: Commit**

---

### Task 7: Web Navigation & Studios Integration
**Files:**
- Modify: `components/navigation/Navbar.tsx` (or `app/layout.tsx`)
- Modify: `components/footer/Footer.tsx` (or `app/layout.tsx`)
- Modify: `app/page.tsx`
- Modify: `app/explore/page.tsx`
- Test: `tests/web-integration.test.ts`

**Interfaces:**
- Add top-level navigation items:
  - **Cuisines** (`/explore`)
  - **Desserts & Sweets** (`/desserts`)
  - **Juices & Beverages** (`/beverages`)
  - **Table Styling Studio** (`/table-styling`)
  - **AI Chef** (`/ai-chef`)
  - **Meal Planner** (`/meal-planner`)
  - **Shopping** (`/shopping`)
- Add hero showcases for the new Studios on the home page.
- Update academic footer across all pages.

- [ ] **Step 1: Update navigation bar with links to new Studios**
- [ ] **Step 2: Update homepage with vibrant showcase cards for Desserts, Beverages, and Table Styling**
- [ ] **Step 3: Verify responsive layout across mobile and desktop breakpoints**
- [ ] **Step 4: Run complete web test suite to verify 0 regressions**
- [ ] **Step 5: Commit**

---

### Task 8: Automated Verification, Feature Parity & Documentation
**Files:**
- Create: `docs/feature-parity-matrix.md`
- Create: `docs/coverage-audit-report.md`
- Create: `docs/android-build-guide.md`
- Modify: `README.md`
- Modify: `.env.example`

- [ ] **Step 1: Run complete automated coverage audit and generate report**
- [ ] **Step 2: Run all Vitest unit and integration tests**
- [ ] **Step 3: Build production Next.js bundle (`npm run build`) to ensure zero TypeScript or routing errors**
- [ ] **Step 4: Create feature parity matrix and Android build documentation**
- [ ] **Step 5: Commit and verify final repository state**
