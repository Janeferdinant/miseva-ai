# Miseva AI — Your World. Your Kitchen. Your AI Chef.

> **Academic Supervision:**  
> **Jane Rose**  
> **Assistant Professor, CSE**  
> *“Miseva AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”*

---

## 🌟 Overview

**Miseva AI** is an intelligent, dual-platform culinary and lifestyle ecosystem combining the art of *mise en place* (culinary preparation and mindful organization) with *seva* (devoted hospitality and service).

1. **Responsive Next.js Web Application** (`/`): Next.js 16 (App Router, Turbopack, TypeScript, Tailwind CSS, liquid-glass aesthetic, 7 dynamic & futuristic themes).
2. **Dedicated Native Android Application** (`android/`): Kotlin, Jetpack Compose Material 3, ViewModel, Room DB, Retrofit 2, Navigation Compose, Android Text-to-Speech, screen-awake cooking mode. Target SDK: API 36 (Android 16+ compliant).
3. **Conversational AI Cooking Agent** (`lib/ai/cooking-agent.ts`): Adaptive step-by-step guidance, ingredient substitutions, and cooking science explanations.
4. **30-Day Omnichannel Marketing Engine** (`app/marketing/`, `lib/marketing/`): Automated 30-day publishing flight calendar, bilingual scripts, visual asset generators, approval workflow, and growth analytics.
5. **Verified 270-Asset Culinary Catalog**: Across 14 regional Indian and international cuisines (140 main recipes), Desserts Studio (40 items), Beverages Studio (50 items), and Table Styling Studio (40 concepts).
6. **Bilingual English and Malayalam (മലയാളം ലിപി)**: Real-time speech synthesis, synchronized karaoke transcripts, and voice-guided hands-free cooking.
7. **Indian Grocery Price Comparison**: Live retailer benchmarking across Blinkit, Zepto, Swiggy Instamart, Amazon Fresh, and Flipkart Grocery.
8. **Table Styling Studio**: Interactive 2D top-down arrangement engine, moodboard generator, and curated tableware checklists.
9. **Original Brand Identity & Visual Asset Pipeline**: Emerald green, saffron gold, warm ivory, and translucent liquid-glass design system with vector logos and 4K/HD culinary imagery.

---

## 🏛️ Repository Architecture & Directory Map

The codebase is organized into cleanly decoupled domains:

```
cusine_adv/
├── app/                          # Next.js 16 App Router (Routes & Server/Client Pages)
│   ├── api/                      # REST API Endpoints (/api/recipes, /api/marketing, etc.)
│   ├── beverages/                # Beverages Studio showcase & recipe views
│   ├── desserts/                 # Desserts Studio showcase & recipe views
│   ├── marketing/                # 30-Day Social Media Automation Hub & Dashboard
│   ├── meal-planner/             # 7-day nutritional meal planner & budget calculator
│   ├── pricing/                  # 6-retailer Indian grocery price comparison
│   ├── recipes/                  # Dynamic regional culinary pages ([slug])
│   ├── table-styling/            # 2D top-down table arrangement & moodboard studio
│   ├── globals.css               # Global theme tokens & Cyber Kitchen styling
│   ├── layout.tsx                # Root layout with theme provider & navigation
│   └── page.tsx                  # Interactive homepage & culinary hero
│
├── components/                   # Modular React Components & UI Widgets
│   ├── culinary/                 # Recipe cards, cooking guides, ingredient scaling
│   ├── marketing/                # Marketing calendar, content briefs, platform cards
│   ├── motion/                   # HUD dock, holographic radar, canvas particles
│   ├── navigation/               # Navbar, mobile drawer, cuisine mega-menu
│   └── ui/                       # Glass cards, modals, buttons, badges, tabs
│
├── lib/                          # Core Domain Logic, Data & Utility Services
│   ├── ai/                       # Conversational Chef Agent & prompt sandboxing
│   ├── catalog/                  # Curated recipes, beverages, desserts, tableware
│   ├── marketing/                # 30-day flight calendar, content brief generation
│   ├── pricing/                  # Grocery pricing models & live store adapters
│   ├── speech/                   # Web Speech API & Malayalam phonetics engine
│   └── theme/                    # 7-palette theme engine & Cyber Kitchen tokens
│
├── tests/                        # 30 Vitest Test Suites (129 Tests) in 5 Domains
│   ├── audit/                    # AppSec, Play Store, and catalog integrity tests
│   ├── culinary/                 # Recipe scaling, meal planner, table styling & AI agent tests
│   ├── marketing/                # 30-day pipeline, approval scheduler, API tests
│   ├── motion/                   # Canvas particles, HUD dock, holographic radar tests
│   ├── theme/                    # Dynamic themes and Futuristic Cyber tokens tests
│   └── README.md                 # Detailed test architecture & run instructions
│
├── scripts/                      # Automation, Audit & Deployment Scripts
│   ├── audit/                    # Image audits, catalog deduplication & integrity
│   ├── exports/                  # Excel master catalogue & JSON/CSV database exporters
│   ├── deploy/                   # Git push, Vercel deployment & verification gates
│   ├── android-release-readiness.ts # Android 16 (API 36) compliance audit engine
│   ├── security-guardian.ts      # 14-scope AppSec & secret scanning audit suite
│   └── README.md                 # Scripts index, forwarders & npm shortcuts
│
├── docs/                         # Specifications, Brand Assets & Audit Reports
│   ├── brand/                    # Brand identity, typography, logos, visual pipeline
│   ├── marketing/                # 30-day calendar, video scripts, Instagram carousels
│   ├── release/                  # Web and Android store submission reports
│   └── security/                 # AppSec audit reports & permission justifications
│
├── android/                      # Native Android Application (Kotlin, Jetpack Compose)
│   ├── app/src/main/             # Compose UI, Room DB, Retrofit, Speech TTS
│   ├── build.gradle.kts          # API 36 (Android 16) compilation targets
│   └── README.md                 # Android build & setup instructions
│
└── public/                       # Static Assets & Exports
    ├── brand/                    # SVG vector logos & brand marks
    ├── exports/                  # Generated Excel, CSV & JSON data files
    └── images/                   # Curated 4K/HD culinary imagery
```

For detailed subfolder documentation, refer to:
- [`tests/README.md`](file:///c:/Users/Asus/Documents/cusine_adv/tests/README.md)
- [`scripts/README.md`](file:///c:/Users/Asus/Documents/cusine_adv/scripts/README.md)
- [`docs/README.md`](file:///c:/Users/Asus/Documents/cusine_adv/docs/README.md)
- [`android/README.md`](file:///c:/Users/Asus/Documents/cusine_adv/android/README.md)

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
- [Brand Guidelines & Design Tokens](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/brand-guidelines.md)
- [Trademark & Naming Research](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/naming-trademark-research.md)
- [Logo Usage Guide](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/logo-usage-guide.md)
- [Visual Asset Pipeline & Media Catalog](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/visual-asset-pipeline.md)
- [Vector Logo Suite](file:///c:/Users/Asus/Documents/cusine_adv/public/brand/) (`logo.svg`, `logo-horizontal.svg`, `logo-mark.svg`, `logo-dark.svg`, `logo-monochrome.svg`)

---

## 📢 Marketing & Global Launch Strategy

- [30-Day Omnichannel Publishing Calendar](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/30-day-content-calendar.md)
- [10 Bilingual Short-Form Video Scripts](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/short-form-video-scripts.md) (English + Malayalam with shot lists & voiceover)
- [10 Instagram Carousel Decks](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/instagram-carousels.md)
- [Google Play ASO Strategy & Metadata Package](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/google-play-aso.md)
- [Comprehensive SEO Strategy & Structured Data](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/seo-strategy.md)

---

## 🏗️ Technology Stack & Architecture

### Web Application (`app/` & `lib/`)
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** Strict TypeScript
- **Styling:** Tailwind CSS with custom liquid-glass design system & 7 dynamic themes
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
- `GET /api/marketing/calendar`: 30-day omnichannel social media publishing calendar.
- `GET /api/marketing/analytics`: Live campaign performance metrics and growth experiments.

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

# Run automated test suite (all 129 tests across 30 suites)
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

- **[Central Documentation Hub](file:///c:/Users/Asus/Documents/cusine_adv/docs/README.md)** — Comprehensive index of all technical documentation and specifications
- [Brand Guidelines & Design Tokens](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/brand-guidelines.md)
- [Logo Usage Guide](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/logo-usage-guide.md)
- [Visual Asset Pipeline](file:///c:/Users/Asus/Documents/cusine_adv/docs/brand/visual-asset-pipeline.md)
- [30-Day Marketing Content Calendar](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/30-day-content-calendar.md)
- [Short-Form Video Scripts](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/short-form-video-scripts.md)
- [Instagram Carousel Campaigns](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/instagram-carousels.md)
- [Google Play ASO Package](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/google-play-aso.md)
- [SEO Strategy & Schema Specifications](file:///c:/Users/Asus/Documents/cusine_adv/docs/marketing/seo-strategy.md)
- [Report A: Web Deployment Readiness](file:///c:/Users/Asus/Documents/cusine_adv/docs/release/web-deployment-report.md)
- [Report B: Android Submission & Play Policy Compliance](file:///c:/Users/Asus/Documents/cusine_adv/docs/release/android-submission-report.md)
- [Security Guardian Audit Report](file:///c:/Users/Asus/Documents/cusine_adv/docs/security/security-guardian-report.md)
- [Permission Justification Matrix](file:///c:/Users/Asus/Documents/cusine_adv/docs/release/permission-justification-matrix.md)
- [Google Play Data Safety Declaration](file:///c:/Users/Asus/Documents/cusine_adv/docs/release/google-play-data-safety.md)
- [Feature Parity Matrix](file:///c:/Users/Asus/Documents/cusine_adv/docs/audit/feature-parity-matrix.md)
- [Coverage Audit Report](file:///c:/Users/Asus/Documents/cusine_adv/docs/audit/coverage-audit-report.md)
- [Android Setup Guide](file:///c:/Users/Asus/Documents/cusine_adv/android/README.md)
- [Miseva AI Complete Recipe Catalogue (Excel)](file:///c:/Users/Asus/Documents/cusine_adv/public/exports/Miseva_AI_Complete_Recipe_Catalogue.xlsx)

---

## 🎓 Academic Supervision
**Jane Rose**  
*Assistant Professor, CSE*  
“Miseva AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”
