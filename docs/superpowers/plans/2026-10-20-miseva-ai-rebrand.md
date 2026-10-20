# Miseva AI Rebrand, Visual Identity & Global Marketing Launch Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the platform into **Miseva AI** ("Your World. Your Kitchen. Your AI Chef."), establishing an original flame-leaf logo system, visual design tokens, original 3D-inspired food imagery, upgraded web & Android applications, and a complete 30-day global launch marketing campaign.

**Architecture:**
1. **Brand & Naming System (`docs/brand/`)**: Trademark research report for "Miseva AI", 3 comparison alternatives, brand guidelines, color tokens (Emerald `#0F5132`, Saffron Gold `#D97706`, Warm Ivory `#FDFBF7`, Deep Forest `#062419`, Champagne `#F7E7CE`, Liquid Glass).
2. **Logo Suite (`public/brand/` & `android/app/src/main/res/`)**: Original vector SVG & raster assets (primary full-color, horizontal wordmark, symbol mark, dark/light variants, monochrome, Android adaptive icons, favicon, app-store icon, brand watermark, logo usage guide).
3. **Visual Media Pipeline & AI Food Art**: Original 3D-inspired hero and culinary scenes generated via `generate_image`, structured asset library in `public/brand/images/`.
4. **Web Experience Rebrand (`app/` & `components/`)**: Header metadata, SEO structured data (JSON-LD), Navbar, Footer (with Jane Rose, Assistant Professor, CSE), Home page hero, About / Brand story, App Download marketing landing page (`app/app/page.tsx`).
5. **Native Android App Rebrand (`android/`)**: Strings (`app_name = "Miseva AI"`), Compose themes, launcher icons, splash screen, and Profile/About screens.
6. **Marketing, ASO & Social Media Campaign (`docs/marketing/`)**: 30-day social media publishing calendar, 10 short-form video scripts (bilingual English + Malayalam with shot lists & voiceover), 10 Instagram carousels, Google Play ASO listing package, and SEO strategy.
7. **Verification & Gates**: Ensure `npm test`, `npx tsc --noEmit`, `npm run build`, `npm run security:audit`, `npm run release:android-audit`, and `npm run deploy:verify` pass with 100% success.

---

### Task 1: Trademark Validation, Naming Analysis & Brand Guidelines
- [ ] **Step 1: Conduct trademark & naming research for Miseva AI (Classes 9, 42, 43) and analyze 3 fallback candidates**
- [ ] **Step 2: Create `docs/brand/naming-trademark-research.md`**
- [ ] **Step 3: Create `docs/brand/brand-guidelines.md` with typography, color tokens, and voice frameworks**

---

### Task 2: Original Logo System & Android Adaptive Icons
- [ ] **Step 1: Design and generate SVG logo suite in `public/brand/` (primary mark, horizontal wordmark, symbol-only, monochrome, dark/light)**
- [ ] **Step 2: Create Android adaptive launcher icon XMLs in `android/app/src/main/res/drawable/` and `mipmap/`**
- [ ] **Step 3: Create `docs/brand/logo-usage-guide.md`**
- [ ] **Step 4: Update web favicon and icon references**

---

### Task 3: Visual Content Generation (AI Food Imagery & Hero 3D Scenes)
- [ ] **Step 1: Generate high-resolution 3D-inspired culinary hero visual using `generate_image`**
- [ ] **Step 2: Generate signature Kerala Meen Curry and tablescaping visual assets**
- [ ] **Step 3: Establish `docs/brand/visual-asset-pipeline.md` with unique asset IDs and optimization specs**

---

### Task 4: Web Application Rebrand & Marketing Landing Pages
- [ ] **Step 1: Update metadata, SEO titles, OpenGraph, and JSON-LD schema in `app/layout.tsx`**
- [ ] **Step 2: Update `components/Navbar.tsx` and `components/Footer.tsx` with Miseva AI logo and academic supervisor branding**
- [ ] **Step 3: Redesign `app/page.tsx` hero section with cinematic Miseva AI branding and clear CTAs**
- [ ] **Step 4: Create dedicated App Download page at `app/app/page.tsx`**
- [ ] **Step 5: Update `app/about/page.tsx` with the Miseva AI brand narrative and mise en place philosophy**

---

### Task 5: Native Android Application Rebrand
- [ ] **Step 1: Update `strings.xml` with `app_name = "Miseva AI"` and branded taglines**
- [ ] **Step 2: Update Compose `Theme.kt`, `HomeScreen.kt`, `ProfileScreen.kt` with Miseva AI branding and Jane Rose CSE supervision**
- [ ] **Step 3: Verify Android build configs and manifest labels**

---

### Task 6: Global Marketing Campaign, Social Media Assets & ASO
- [ ] **Step 1: Create 30-day social media publishing calendar (`docs/marketing/30-day-content-calendar.md`)**
- [ ] **Step 2: Create 10 bilingual English & Malayalam short-form video scripts (`docs/marketing/short-form-video-scripts.md`)**
- [ ] **Step 3: Create 10 Instagram carousel & post concepts (`docs/marketing/instagram-carousels.md`)**
- [ ] **Step 4: Create Google Play ASO listing package (`docs/marketing/google-play-aso.md`)**
- [ ] **Step 5: Create website SEO strategy document (`docs/marketing/seo-strategy.md`)**

---

### Task 7: Full Verification & Quality Gates
- [ ] **Step 1: Run all unit tests (`npm test`)**
- [ ] **Step 2: Run TypeScript static analysis (`npx tsc --noEmit`)**
- [ ] **Step 3: Run production build (`npm run build`)**
- [ ] **Step 4: Run Security Guardian audit (`npm run security:audit`)**
- [ ] **Step 5: Run Android release audit (`npm run release:android-audit`)**
- [ ] **Step 6: Run deployment verification (`npm run deploy:verify`)**
