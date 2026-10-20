# Miseva AI — Autonomous Marketing, Social Publishing & Customer Recommendation Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, privacy-compliant AI Marketing Automation & Customer Recommendation Engine for Miseva AI that markets around customer intent and job-to-be-done, powers 9 audience segments, provides explainable consented recommendations, drives 8 campaign landing pages with full-funnel attribution, and equips operators with an enterprise dashboard.

**Architecture:** Extend `lib/marketing/` with modular TypeScript services (`customer-segment-service`, `recommendation-engine-service`, `error-retry-monitor-service`, `attribution-funnel-service`), deploy Next.js dynamic campaign routes (`app/campaigns/[slug]`), embed contextual recommendation widgets into the core app with explicit user privacy controls, and integrate all 11 marketing modules into the `/marketing` dashboard.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Web Speech API (`ml-IN` & `en-IN`), Vitest.

**Spec:** `docs/superpowers/specs/2026-10-20-miseva-marketing-recommendation-engine-design.md`

---

## Global Constraints

- Never infer sensitive demographic traits; marketing and recommendations must anchor on cooking intent, ingredient discovery, budget planning, and consented first-party actions.
- Provide a non-personalized, zero-tracking contextual fallback for anonymous visitors.
- Include explicit user privacy controls: opt-in/opt-out toggles, profile reset, and complete data deletion.
- All scheduled social publishing must enforce idempotency keys, exponential backoff, and duplicate prevention.
- No social post may be marked as published unless confirmed by the platform adapter; provide clear manual publishing checklists when an API is unauthorized or unavailable.
- Default campaign timezone: `Asia/Kolkata` (IST, UTC+5:30).
- Preserve existing culinary catalog integrity (230 recipes, Table Styling Studio, price intelligence, and audio cooking assistant).

---

## Review Focus

1. **Anonymous Fallback:** Unauthenticated visitors with no cookies must receive relevant recipe recommendations strictly from page context without erroring or creating user profiles.
2. **Duplicate Post Prevention:** Resubmitting an approved campaign item or re-running the publisher must reject duplicate actions using persistent idempotency checks.
3. **Consent Revocation:** Toggling personalization OFF must instantly purge in-memory profile signals and revert all recommendations to generic/contextual mode.
4. **Attribution Funnel Math:** Cost Per Activated User (CPAU) must correctly handle zero-activation scenarios without division-by-zero errors.
5. **Campaign Landing Page Route Parity:** All 8 campaign slugs (`ingredient-finder`, `kerala-recipes`, `malayalam-assistant`, `meal-planner`, `budget-cooking`, `desserts-juices`, `table-styling`, `international-recipes`) must resolve valid content, UTM tracking, and feature demonstrations.

---

## Tasks

### Task 1: Customer Segmentation & Prompt Library Engine
**Files:**
- Create: `lib/marketing/services/customer-segment-service.ts`
- Modify: `lib/marketing/types/marketing-types.ts`
- Test: `tests/marketing/customer-segments.test.ts`

**Interfaces:**
- Produces: `CustomerSegmentService`, `AudienceSegmentDefinition`, `SegmentPromptTemplate`, `SegmentSignalRule`
- Exposes: `getAllSegments()`, `getSegmentById(id)`, `matchAudienceSignals(signals)`, `generateSegmentPrompt(segmentId, context)`

- [ ] **Step 1: Write the failing test**
Create `tests/marketing/customer-segments.test.ts` verifying that all 9 segments (A to I) exist, match appropriate behavioral signals, and produce valid prompt templates with safety checks.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/customer-segments.test.ts`
Expected: FAIL with missing module.

- [ ] **Step 3: Implement `customer-segment-service.ts`**
Define all 9 segments (A through I) with exact prompt templates, signal matching rules (ingredient search, Malayalam preference, budget comparison, family prep, desserts, table styling, international cuisine, re-engagement), and copy guardrails.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/customer-segments.test.ts`
Expected: PASS

---

### Task 2: Consent-Based Explainable Recommendation Engine
**Files:**
- Create: `lib/marketing/services/recommendation-engine-service.ts`
- Test: `tests/marketing/recommendation-engine.test.ts`

**Interfaces:**
- Consumes: `CustomerSegmentService`, verified recipe catalog
- Produces: `RecommendationEngineService`, `RecommendationResult`, `UserConsentProfile`
- Exposes: `getRecommendations(context, userProfile?)`, `setConsent(userId, consent)`, `resetUserProfile(userId)`

- [ ] **Step 1: Write the failing test**
Create `tests/marketing/recommendation-engine.test.ts` verifying contextual matching, content-based ranking, explainable reason strings, anonymous fallback, and consent revocation.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/recommendation-engine.test.ts`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `recommendation-engine-service.ts`**
Implement the 5-layer engine: Contextual Matcher, Content-Based Matcher, Collaborative Readiness, Explainability Decorator, and Consent Guard.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/recommendation-engine.test.ts`
Expected: PASS

---

### Task 3: 8 Dedicated Campaign Landing Pages & Funnel Attribution Engine
**Files:**
- Create: `lib/marketing/services/attribution-funnel-service.ts`
- Create: `app/campaigns/[slug]/page.tsx`
- Create: `app/campaigns/page.tsx`
- Test: `tests/marketing/campaign-landing-pages.test.ts`

**Interfaces:**
- Produces: `AttributionFunnelService`, `CampaignLandingConfig`, interactive campaign pages
- Exposes: `trackEvent(event)`, `getFunnelMetrics()`, `calculateCostPerActivatedUser(spend, activatedUsers)`

- [ ] **Step 1: Write the failing test**
Create `tests/marketing/campaign-landing-pages.test.ts` testing attribution funnel tracking, UTM parsing, CPAU calculation, and configuration for all 8 campaign slugs.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/campaign-landing-pages.test.ts`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `attribution-funnel-service.ts` and `app/campaigns/[slug]/page.tsx`**
Build dynamic campaign router supporting all 8 landing pages with interactive micro-demos (ingredient finder, Malayalam voice preview, meal planner preview, table styling preview), UTM tracking, and Play Store / Web App conversion CTAs.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/campaign-landing-pages.test.ts`
Expected: PASS

---

### Task 4: Error, Retry & Duplicate Prevention Monitor
**Files:**
- Create: `lib/marketing/services/error-retry-monitor-service.ts`
- Modify: `lib/marketing/services/scheduler-service.ts`
- Test: `tests/marketing/error-retry-monitor.test.ts`

**Interfaces:**
- Produces: `ErrorRetryMonitorService`, `RetryJob`, `IdempotencyRecord`
- Exposes: `recordError(job)`, `getNextRetrySchedule(attempt)`, `isDuplicate(idempotencyKey)`, `getAuditLog()`

- [ ] **Step 1: Write the failing test**
Create `tests/marketing/error-retry-monitor.test.ts` verifying exponential backoff calculations, duplicate post rejection, and audit log persistence.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/error-retry-monitor.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `error-retry-monitor-service.ts`**
Implement idempotent scheduling ledger, exponential backoff (e.g. 5m, 15m, 45m), duplicate check, and failure diagnostics.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/error-retry-monitor.test.ts`
Expected: PASS

---

### Task 5: Core In-App Integration: Recommendation Widget & Privacy Modal
**Files:**
- Create: `components/recommendations/ContextualRecommendationCard.tsx`
- Create: `components/recommendations/PrivacySettingsModal.tsx`
- Modify: `app/page.tsx`
- Test: `tests/marketing/privacy-compliance.test.ts`

**Interfaces:**
- Produces: UI components for explainable in-app recommendations and privacy control modal.

- [ ] **Step 1: Write the failing test**
Create `tests/marketing/privacy-compliance.test.ts` verifying consent status updates, privacy settings persistence, and data deletion.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/privacy-compliance.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement UI components and integrate into `app/page.tsx`**
Create modern liquid-glass recommendation card showing reason badge ("Why recommended"), confidence percentage, and one-click privacy toggle modal.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/privacy-compliance.test.ts`
Expected: PASS

---

### Task 6: Marketing Dashboard Complete 11-Module Suite
**Files:**
- Create: `app/marketing/components/CustomerSegmentManagerView.tsx`
- Create: `app/marketing/components/RecommendationEngineView.tsx`
- Create: `app/marketing/components/ConsentPrivacyView.tsx`
- Create: `app/marketing/components/ErrorRetryMonitorView.tsx`
- Create: `app/marketing/components/AiContentStudioView.tsx`
- Create: `app/marketing/components/BudgetExperimentView.tsx`
- Modify: `app/marketing/page.tsx`
- Modify: `lib/marketing/services/marketing-hub.ts`
- Test: `tests/marketing/dashboard-render.test.ts`

**Interfaces:**
- Mounts all 11 modules seamlessly in the executive marketing dashboard.

- [ ] **Step 1: Write the failing test**
Add tests to `tests/marketing/dashboard-render.test.ts` asserting all new views render correctly with interactive tab navigation.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/dashboard-render.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement view components and wire tabs into `app/marketing/page.tsx`**
Implement Segment Manager, Recommendation Simulator, Privacy & Consent View, Error/Retry Monitor, Content Studio with Storyboards, and Budget/Experiment Tracker.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/dashboard-render.test.ts`
Expected: PASS

---

### Task 7: Marketing API Endpoints & Hub Wiring
**Files:**
- Create: `app/api/marketing/segments/route.ts`
- Create: `app/api/marketing/recommendations/route.ts`
- Create: `app/api/marketing/privacy/route.ts`
- Create: `app/api/marketing/attribution/route.ts`
- Create: `app/api/marketing/generate-content/route.ts`
- Modify: `lib/marketing/services/marketing-hub.ts`
- Test: `tests/marketing/api-routes.test.ts`

**Interfaces:**
- Standard Next.js Route Handlers with JSON responses, status codes, and input validation.

- [ ] **Step 1: Write the failing test**
Extend `tests/marketing/api-routes.test.ts` to test GET/POST handlers for segments, recommendations, privacy consent, and attribution.

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/marketing/api-routes.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the API routes**
Build clean route handlers connecting services to HTTP clients.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/marketing/api-routes.test.ts`
Expected: PASS

---

### Task 8: Full Verification, Documentation & Release Readiness
**Files:**
- Create: `docs/marketing/marketing-recommendation-engine-guide.md`
- Run: Full vitest test suite across all 30+ test suites.
- Verify: Zero regressions, clean build, verified platform statuses.

- [ ] **Step 1: Run complete test suite**
Run: `npx vitest run`
Expected: All tests pass.

- [ ] **Step 2: Compile documentation report**
Create comprehensive operator guide explaining architecture, platform connections, setup instructions, and deployment status.
