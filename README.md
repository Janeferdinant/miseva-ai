# Miseva AI — Your World. Your Kitchen. Your AI Chef.

> **Academic Supervision:**  
> **Jane Rose**  
> **Assistant Professor, CSE**  
> *“Miseva AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”*

---

## 🌟 Overview

**Miseva AI** is an intelligent, dual-platform culinary and lifestyle ecosystem combining the art of *mise en place* (culinary preparation and mindful organization) with *seva* (devoted hospitality and service).

1. **Responsive Next.js Web Application** (`/`): Next.js 16 (Turbopack, TypeScript, Tailwind CSS, liquid-glass aesthetic, 6 dynamic themes).
2. **Dedicated Native Android Application** (`android/`): Kotlin, Jetpack Compose Material 3, ViewModel, Room DB, Retrofit 2, Navigation Compose, Android Text-to-Speech, screen-awake cooking mode. Target SDK: API 36 (Android 16+ compliant).
3. **Conversational AI Cooking Agent** (`lib/ai/cooking-agent.ts`): Adaptive step-by-step guidance, ingredient substitutions, and cooking science explanations.
4. **Verified 270-Asset Culinary Catalog**: Across 14 regional Indian and international cuisines (140 main recipes), Desserts Studio (40 items), Beverages Studio (50 items), and Table Styling Studio (40 concepts).
5. **Bilingual English and Malayalam (മലയാളം ലിപി)**: Real-time speech synthesis, synchronized karaoke transcripts, and voice-guided hands-free cooking.
6. **Indian Grocery Price Comparison**: Live retailer benchmarking across Blinkit, Zepto, Swiggy Instamart, Amazon Fresh, and Flipkart Grocery.
7. **Table Styling Studio**: Interactive 2D top-down arrangement engine, moodboard generator, and curated tableware checklists.
8. **Original Brand Identity & Visual Asset Pipeline**: Emerald green, saffron gold, warm ivory, and translucent liquid-glass design system with vector logos and 4K/HD culinary imagery.

---

## 🎨 Brand Identity System

- **Brand Name:** Miseva AI (*Mise en place* + *Seva*)
- **Primary Tagline:** *Your World. Your Kitchen. Your AI Chef.*
- **Supporting Taglines:**
  - *From Kerala to the World, One Recipe at a Time.*
  - *Your Ingredients. Your Imagination. Your AI Chef.*
  - *Cook Smarter. Eat Better. Explore More.*
- **Color Palette:**
  - **Emerald Primary:** `#0F5132` / `#059669` (Culinary tech & freshness)
  - **Saffron Gold:** `#D97706` / `#F59E0B` (Indian culinary heritage & warmth)
  - **Warm Ivory:** `#FDFBF7` (Clean editorial backgrounds)
  - **Deep Forest Green:** `#062419` (High-contrast dark surfaces)
  - **Champagne:** `#F7E7CE` (Refined accents)
  - **Translucent Glass:** `rgba(255, 255, 255, 0.08)` backdrop blur

### Brand Documentation & Assets
- [Brand Guidelines & Design Tokens](file:///c:/Users/Asus/Documents/cusine/docs/brand/brand-guidelines.md)
- [Trademark & Naming Research](file:///c:/Users/Asus/Documents/cusine/docs/brand/naming-trademark-research.md)
- [Logo Usage Guide](file:///c:/Users/Asus/Documents/cusine/docs/brand/logo-usage-guide.md)
- [Visual Asset Pipeline & Media Catalog](file:///c:/Users/Asus/Documents/cusine/docs/brand/visual-asset-pipeline.md)
- [Vector Logo Suite](file:///c:/Users/Asus/Documents/cusine/public/brand/) (`logo.svg`, `logo-horizontal.svg`, `logo-mark.svg`, `logo-dark.svg`, `logo-monochrome.svg`)

---

## 📢 Marketing & Global Launch Strategy

- [30-Day Omnichannel Publishing Calendar](file:///c:/Users/Asus/Documents/cusine/docs/marketing/30-day-content-calendar.md)
- [10 Bilingual Short-Form Video Scripts](file:///c:/Users/Asus/Documents/cusine/docs/marketing/short-form-video-scripts.md) (English + Malayalam with shot lists & voiceover)
- [10 Instagram Carousel Decks](file:///c:/Users/Asus/Documents/cusine/docs/marketing/instagram-carousels.md)
- [Google Play ASO Strategy & Metadata Package](file:///c:/Users/Asus/Documents/cusine/docs/marketing/google-play-aso.md)
- [Comprehensive SEO Strategy & Structured Data](file:///c:/Users/Asus/Documents/cusine/docs/marketing/seo-strategy.md)

---

## 🏗️ Technology Stack & Architecture

### Web Application (`apps/web` / root)
- **Framework:** Next.js (App Router, Turbopack)
- **Language:** Strict TypeScript
- **Styling:** Tailwind CSS with custom liquid-glass design system & 6 dynamic themes
- **Audio:** Web Speech Synthesis API (`ml-IN` & `en-IN`)
- **State Management:** Reactive Client State & LocalStorage event bus

### Native Android Application (`android/`)
- **Language:** Kotlin 1.9.23
- **UI Toolkit:** Jetpack Compose with Material 3 & Custom `LocalLiquidGlassColors`
- **Architecture:** MVVM (Model-View-ViewModel) + Repository Pattern
- **Local Persistence:** Room Database (`CulinaryVerseDatabase`, `RecipeDao`, `RecipeEntity`) with TypeConverters
- **Networking:** Retrofit 2 + OkHttp + Gson Converter
- **Voice:** Android Text-to-Speech (`android.speech.tts.TextToSpeech`)
- **Screen Awake:** `FLAG_KEEP_SCREEN_ON` during active cooking sessions
- **Deep Linking:** `miseva://recipes/{id}` and Universal Web links

### Shared Backend REST APIs
- `GET /api/recipes`: Recipe catalog, search, and regional filtering.
- `GET /api/desserts`: 40 desserts across 4 subcategories.
- `GET /api/beverages`: 50 beverages across 5 subcategories.
- `GET /api/table-styling`: 40 complete tablescaping concepts.
- `POST /api/table-styling/generate`: Dynamic 2D top-down placement, moodboard, and shopping list generator.
- `GET /api/coverage-audit`: Real-time compliance report enforcing $\ge 10$ distinct items per collection.

---

## 📊 Database Coverage & Minimum 10+ Rule

The platform strictly adheres to the rule: **Every cuisine, category, dessert subcategory, beverage subcategory, and table styling collection must contain at least 10 distinct, verified items.**

| Module | Published Collections | Items per Collection | Total Items | Audit Status |
| :--- | :--- | :--- | :--- | :--- |
| **Indian Cuisines** | Kerala, Tamil Nadu, Karnataka, Andhra, Punjab, Maharashtra, Gujarat, Bengal | $\ge 10$ each | 80 Recipes | ✅ **PASSED** |
| **Global Cuisines** | Italian, Japanese, Mexican, Chinese, Thai, Middle Eastern | $\ge 10$ each | 60 Recipes | ✅ **PASSED** |
| **Desserts Studio** | Payasam, Traditional Mithai, Cakes & Bakes, Global Delights | $\ge 10$ each | 40 Recipes | ✅ **PASSED** |
| **Beverages Studio** | Fresh Juices, Smoothies, Traditional Refreshers, Mocktails, Teas & Coffees | $\ge 10$ each | 50 Drinks | ✅ **PASSED** |
| **Table Styling Studio** | Kerala Sadya, Festive Indian, Celebrations & Banquets, Minimalist & Outdoor | $\ge 10$ each | 40 Concepts | ✅ **PASSED** |
| **Grand Total** | **23 Distinct Collections** | **$\ge 10$ each** | **270 Assets** | ✅ **100% COMPLIANT** |

---

## 🚀 Getting Started

### 1. Web Application

```bash
# Install dependencies
npm install

# Run automated test suite (all 64 tests across 12 suites)
npm test

# Run type check
npx tsc --noEmit

# Run production build
npm run build

# Run development server
npm run dev

# Generate complete recipe catalogue Excel export (8 sheets)
npm run export:excel

# Generate CSV and JSON database exports
npm run export:db

# Run full catalog image duplicate audit (230 unique dishes)
npm run audit:catalog
```

The web application will be accessible at `http://localhost:3000`.

### 2. Android Application

Open the `android/` directory in **Android Studio**:
1. Sync Gradle files.
2. Ensure JDK 17 is configured in **Project Structure > SDK Location > Gradle Settings**.
3. Run on an Android Emulator (API 26+) or a connected physical Android device.
4. To build debug APK via command line:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

---

## 🛡️ Security Guardian & Google Play Compliance Gate

Miseva AI incorporates an autonomous three-gate release pipeline:
- **Gate 1 — Security Guardian (`npm run security:audit`):** Full-codebase SAST, secret scanning, AI prompt-injection guardrails, and database RLS auditing. (Status: **0 Critical, 0 High**).
- **Gate 2 — Android Release Readiness (`npm run release:android-audit`):** Enforces **Android 16 (API Level 36)** per Google Play's published August 31, 2026 mandate, 12-tester/14-day closed testing protocol, Permission Justification Matrix, and Data Safety disclosures.
- **Gate 3 — Web Deployment Gate (`npm run deploy:verify`):** Git tree integrity, WCM credential verification, Vercel preview/production gating.

---

## 📄 Documentation & Release Packages

- **[Central Documentation Hub](file:///c:/Users/Asus/Documents/cusine/docs/README.md)** — Comprehensive index of all technical documentation and specifications
- [Brand Guidelines & Design Tokens](file:///c:/Users/Asus/Documents/cusine/docs/brand/brand-guidelines.md)
- [Logo Usage Guide](file:///c:/Users/Asus/Documents/cusine/docs/brand/logo-usage-guide.md)
- [Visual Asset Pipeline](file:///c:/Users/Asus/Documents/cusine/docs/brand/visual-asset-pipeline.md)
- [30-Day Marketing Content Calendar](file:///c:/Users/Asus/Documents/cusine/docs/marketing/30-day-content-calendar.md)
- [Short-Form Video Scripts](file:///c:/Users/Asus/Documents/cusine/docs/marketing/short-form-video-scripts.md)
- [Instagram Carousel Campaigns](file:///c:/Users/Asus/Documents/cusine/docs/marketing/instagram-carousels.md)
- [Google Play ASO Package](file:///c:/Users/Asus/Documents/cusine/docs/marketing/google-play-aso.md)
- [SEO Strategy & Schema Specifications](file:///c:/Users/Asus/Documents/cusine/docs/marketing/seo-strategy.md)
- [Report A: Web Deployment Readiness](file:///c:/Users/Asus/Documents/cusine/docs/release/web-deployment-report.md)
- [Report B: Android Submission & Play Policy Compliance](file:///c:/Users/Asus/Documents/cusine/docs/release/android-submission-report.md)
- [Security Guardian Audit Report](file:///c:/Users/Asus/Documents/cusine/docs/security/security-guardian-report.md)
- [Permission Justification Matrix](file:///c:/Users/Asus/Documents/cusine/docs/release/permission-justification-matrix.md)
- [Google Play Data Safety Declaration](file:///c:/Users/Asus/Documents/cusine/docs/release/google-play-data-safety.md)
- [Feature Parity Matrix](file:///c:/Users/Asus/Documents/cusine/docs/audit/feature-parity-matrix.md)
- [Coverage Audit Report](file:///c:/Users/Asus/Documents/cusine/docs/audit/coverage-audit-report.md)
- [Android Setup Guide](file:///c:/Users/Asus/Documents/cusine/android/README.md)
- [Miseva AI Complete Recipe Catalogue (Excel)](file:///c:/Users/Asus/Documents/cusine/public/exports/Miseva_AI_Complete_Recipe_Catalogue.xlsx)

---

## 🎓 Academic Supervision
**Jane Rose**  
*Assistant Professor, CSE*  
“Miseva AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”
