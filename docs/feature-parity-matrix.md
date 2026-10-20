# CulinaryVerse AI — Web & Android Feature Parity Matrix

This document tracks the implementation status of all core features across the **Next.js Web Application** and the **Native Jetpack Compose Android Application**.

| Feature Category | Specific Capability | Web Implementation (Next.js) | Android Implementation (Jetpack Compose) | Parity Status |
| :--- | :--- | :--- | :--- | :--- |
| **Recipe Discovery** | Keyword search, regional filters, dietary tags | `app/recipes/page.tsx` with dynamic query filtering | `HomeScreen.kt` & `CuisinesScreen.kt` with live search | **100% Parity** |
| **Indian Cuisines** | Kerala, Tamil Nadu, Karnataka, Andhra, Punjab, Maharashtra, Gujarat, Bengal (10+ each) | `app/explore/page.tsx` & modular recipe datasets | `HomeScreen.kt` region carousel & Room DB cache | **100% Parity** |
| **Global Cuisines** | Italian, Japanese, Mexican, Chinese, Thai, Middle Eastern (10+ each) | `app/explore/page.tsx` & international datasets | Category filters & API repository sync | **100% Parity** |
| **Desserts Studio** | Dedicated studio with 40 recipes, baking temps, doneness test cards | `app/desserts/page.tsx` & `app/desserts/[slug]/page.tsx` | `DessertsScreen.kt` with doneness chips | **100% Parity** |
| **Beverages Studio** | Dedicated studio with 50 drinks, hot/cold filter, sweetness adjuster | `app/beverages/page.tsx` & `app/beverages/[slug]/page.tsx` | `BeveragesScreen.kt` with temperature toggles | **100% Parity** |
| **Table Styling Studio** | 40 complete concepts across 4 collections, 2D top-down arrangement canvas, shopping lists | `app/table-styling/page.tsx` & `TableLayoutCanvas.tsx` | `TableStylingScreen.kt` with 2D concept details | **100% Parity** |
| **Table Plan Generator** | Bespoke calculation of linens, centerpiece, 2D placements, and budget by guest count/shape | `lib/table-styling/generator.ts` & `/api/table-styling/generate` | `TableStylingViewModel.kt` calling shared generator API | **100% Parity** |
| **English & Malayalam** | Malayalam script (മലയാളം ലിപി), transliteration, and bilingual instruction text | Dynamic language state (`localStorage` + event bus) | Jetpack Compose bilingual text toggles | **100% Parity** |
| **Voice Narration** | Read-along transcripts, step navigation, audio controls | Web Speech Synthesis API & audio playback | Android `TextToSpeech` (`Locale("ml", "IN")` + English) | **100% Parity** |
| **Hands-Free Cooking** | Step-by-step cooking studio with timers and voice prompts | `app/recipes/[id]/page.tsx` interactive cooking mode | `CookingStudioScreen.kt` with active timer progress | **100% Parity** |
| **Screen-Awake Mode** | Keep screen illuminated during active culinary preparations | Web Wake Lock API (`navigator.wakeLock`) | `FLAG_KEEP_SCREEN_ON` with user toggle | **100% Parity** |
| **AI Chef Studio** | Conversational agent for pantry matching, technique advice, and substitutions | `lib/ai/cooking-agent.ts` & `app/ai-chef/page.tsx` | Retrofit client calling AI endpoints | **100% Parity** |
| **Grocery Price Compare**| Price comparison across Amazon Fresh, Flipkart, Blinkit, Swiggy Instamart, Zepto, BigBasket | `app/shopping/page.tsx` with PIN code lookup | `ShoppingScreen.kt` with retailer delivery estimates | **100% Parity** |
| **Meal Planner** | Weekly breakfast, lunch, and dinner scheduling with cost totals | `app/meal-planner/page.tsx` | `MealPlannerScreen.kt` with calendar schedule | **100% Parity** |
| **Liquid-Glass Design** | 6 Curated themes (Emerald, Saffron, Ocean, Midnight, Rose, Ivory) | Tailwind CSS glassmorphism, CSS variables | Custom Material 3 `LocalLiquidGlassColors` | **100% Parity** |
| **Offline Data Access** | View saved recipes and essential instructions without internet | Service Worker & browser caching | Room Database (`cached_recipes` & `RecipeDao`) | **100% Parity** |
| **Deep Linking** | Open specific recipes directly from shared links | Web routing `/recipes/[id]` | `culinaryverse://recipes/{id}` & web intents | **100% Parity** |
| **Academic Supervision**| Footer and profile branding: Jane Rose, Assistant Professor, CSE | `components/Footer.tsx` on every page | `ProfileScreen.kt` academic supervisor card | **100% Parity** |

---

## Verification Summary
Both the responsive web application and native Android application are fully structured, feature-complete, and share identical business logic, data models, and aesthetic standards.
