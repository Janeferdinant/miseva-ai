# Malayalam Audio Narration & Culinary Image Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement robust, 100% free Malayalam audio narration via an internal Next.js streaming TTS API route (`/api/tts`), integrate it into `AudioNarrationPlayer` and `HandsFreeCookingModal`, replace all 137 broken 404 recipe image URLs with verified culinary images, and add resilient image fallback handlers across all dish components.

**Architecture:**
- Server-side Next.js route (`/api/tts`) accepts `text` and `lang` query parameters, performs sentence-aware chunking (<180 chars), synthesizes fluent neural Malayalam speech, concatenates MP3 audio buffers, and streams standard `audio/mpeg` with 24-hour edge caching.
- Client-side `SpeechEngine` is upgraded to use an HTML5 `Audio` streaming player for Malayalam (`ml`) with full playback lifecycle callbacks (`onStart`, `onEnd`, `onError`, `pause`, `resume`, `stop`), while seamlessly retaining client `window.speechSynthesis` for English or offline scenarios.
- All 137 broken / 404 Unsplash image IDs in `recipes-*.ts`, `desserts.ts`, and `beverages.ts` are replaced with verified, live HTTP 200 culinary URLs.
- `RecipeCard`, `recipes/[id]/page.tsx`, `desserts/page.tsx`, and `beverages/page.tsx` receive resilient `onError` fallback handlers pointing to authentic regional cuisine fallback images.

**Tech Stack:** Next.js 16.4.2 (App Router), TypeScript, HTML5 Audio API, Vitest.

---

## Global Constraints
- Zero external API keys or paid third-party subscriptions required.
- Maintain academic attribution to **Jane Rose, Assistant Professor, CSE**.
- 100% TypeScript type safety with zero `tsc` errors.
- All 18 existing Vitest test suites must continue passing without regression.
- 100% of all 230 dishes (140 Recipes, 40 Desserts, 50 Beverages) must have verified HTTP 200 image URLs.

---

## Review Focus
1. Long Malayalam text exceeding single-request limits: verify sentence chunking concatenates cleanly without audio clipping.
2. Concurrent audio playback: verify `SpeechEngine.stop()` cancels any ongoing HTML5 audio stream before starting a new step.
3. Mobile browser autoplay policies: ensure audio playback is triggered synchronously from user click events.
4. CDN failure recovery: verify `onError` fallback displays a high-resolution cuisine fallback image rather than broken layout.
5. Audio playback speed: verify playback rate adjustments (0.75x, 1.0x, 1.25x) work properly with the audio element.

---

### Task 1: Create Streaming Malayalam TTS API Route (`/api/tts`)

**Files:**
- Create: `app/api/tts/route.ts`
- Create: `tests/tts-api.test.ts`

**Interfaces:**
- Produces: `GET /api/tts?text=<encoded_text>&lang=ml|en` -> `Response` with `Content-Type: audio/mpeg` and `Cache-Control: public, max-age=86400, s-maxage=604800`

- [ ] **Step 1: Write the failing test for `/api/tts`**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `/api/tts/route.ts` with sentence chunking, MP3 concatenation, and error handling**
- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit**

---

### Task 2: Upgrade `SpeechEngine` with HTML5 Audio Streamer

**Files:**
- Modify: `lib/voice/speech-engine.ts`
- Modify: `tests/speech.test.ts`

**Interfaces:**
- Consumes: `/api/tts?text=...&lang=...`
- Produces: `SpeechEngine.speak(text, lang, rate, callbacks)`, `SpeechEngine.stop()`, `SpeechEngine.pause()`, `SpeechEngine.resume()`

- [ ] **Step 1: Write tests for SpeechEngine audio streaming fallback in `tests/speech.test.ts`**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Update `lib/voice/speech-engine.ts` with dual-engine architecture (HTML5 Audio for Malayalam / remote TTS, SpeechSynthesis for English)**
- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit**

---

### Task 3: Enhance `AudioNarrationPlayer` and `HandsFreeCookingModal`

**Files:**
- Modify: `features/recipes/components/AudioNarrationPlayer.tsx`
- Modify: `features/recipes/components/HandsFreeCookingModal.tsx`

**Interfaces:**
- Consumes: `SpeechEngine.speak`, `SpeechEngine.stop`

- [ ] **Step 1: Update `AudioNarrationPlayer.tsx` to handle async audio loading state and active playback**
- [ ] **Step 2: Update `HandsFreeCookingModal.tsx` to handle Malayalam narration seamlessly**
- [ ] **Step 3: Verify components compile cleanly with `npx tsc --noEmit`**
- [ ] **Step 4: Commit**

---

### Task 4: Replace 137 Broken Recipe, Dessert, and Beverage Image URLs

**Files:**
- Modify: `lib/data/recipes-karnataka-andhra.ts`
- Modify: `lib/data/recipes-north-west-east.ts`
- Modify: `lib/data/recipes-maharashtra-gujarat.ts`
- Modify: `lib/data/recipes-bengali-east.ts`
- Modify: `lib/data/recipes-international.ts`
- Modify: `lib/data/recipes-mexican.ts`
- Modify: `lib/data/recipes-chinese.ts`
- Modify: `lib/data/recipes-thai.ts`
- Modify: `lib/data/recipes-middle-eastern.ts`
- Modify: `lib/data/desserts.ts`
- Modify: `lib/data/beverages.ts`
- Modify: `lib/data/image-registry.ts`

**Interfaces:**
- Produces: 100% valid HTTP 200 URLs across all 230 catalog items.

- [ ] **Step 1: Write verification script to identify and map verified high-res culinary image URLs**
- [ ] **Step 2: Update data files with verified high-res culinary images**
- [ ] **Step 3: Run `npx tsx scripts/check-image-urls.ts` and confirm 0 broken images (230/230 HTTP 200)**
- [ ] **Step 4: Commit**

---

### Task 5: Add Resilient Fallback Handlers to Image Components

**Files:**
- Modify: `components/RecipeCard.tsx`
- Modify: `app/recipes/[id]/page.tsx`
- Modify: `app/desserts/page.tsx`
- Modify: `app/beverages/page.tsx`

**Interfaces:**
- Produces: Automatic image fallback to curated culinary fallback if CDN image ever fails.

- [ ] **Step 1: Add `onError` stateful image fallback handler to `components/RecipeCard.tsx`**
- [ ] **Step 2: Add `onError` stateful image fallback to `app/recipes/[id]/page.tsx`, `app/desserts/page.tsx`, and `app/beverages/page.tsx`**
- [ ] **Step 3: Verify all pages compile and tests pass**
- [ ] **Step 4: Commit**

---

### Task 6: End-to-End Verification and Production Build

**Files:**
- None (verification phase)

- [ ] **Step 1: Run full Vitest suite (`npm test`)**
- [ ] **Step 2: Run TypeScript check (`npx tsc --noEmit`)**
- [ ] **Step 3: Run production Turbopack build (`npm run build`)**
- [ ] **Step 4: Push to Git and Deploy to Vercel via WCM**
- [ ] **Step 5: Verify live production endpoints**
