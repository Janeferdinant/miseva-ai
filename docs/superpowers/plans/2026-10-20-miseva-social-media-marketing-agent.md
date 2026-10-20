# Miseva AI — 30-Day Social Media Marketing Automation Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend Miseva AI with an enterprise-grade, reliable 30-day social media marketing automation system, complete with bilingual (English + Malayalam) content production, multi-platform publishing adapters, human approval gates, scheduling/retry engine, A/B growth experiments, UTM/conversion analytics, and a dedicated liquid-glass marketing dashboard.

**Architecture:** Implement a modular marketing engine under `lib/marketing/` (types, services, platform adapters, and security vault) coupled with Next.js App Router API endpoints (`/api/marketing/*`) and a dedicated responsive dashboard (`/marketing`) that utilizes Miseva's emerald/saffron liquid-glass design system.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Web Speech API (`ml-IN` & `en-IN`), Vitest.

**Spec:** USER_REQUEST specification for 30-Day Social Media Marketing Automation Agent

---

## Global Constraints

- Never rebuild or break existing Miseva AI recipes, meal planner, pricing, table-styling, or themes.
- Emerald green (`#0F5132` / `#059669`), Saffron gold (`#D97706` / `#F59E0B`), Warm ivory (`#FDFBF7`), and liquid-glass aesthetic.
- Require human approval by default before any post can be scheduled or published.
- Include emergency pause killswitch for the entire campaign.
- Default campaign timezone: `Asia/Kolkata` (IST, UTC+5:30).
- Do not claim a platform is connected until authenticated and verified; generate clear manual publishing checklists when an API operation is unsupported or pending approval.
- Maintain asset provenance records for all images, scripts, voiceovers, and recipes (linking verified Miseva dishes).
- Zero exposure of API secrets or tokens in frontend code, client responses, or logs.

---

## Review Focus

1. **Timezone Shifts & DST:** Schedule calculations must strictly anchor to `Asia/Kolkata` (or configured timezone) without drifting on client browser offsets.
2. **Idempotent Retries:** Network failure during publication must never trigger duplicate social posts; idempotency keys and state checks prevent double-posting.
3. **Emergency Pause:** Triggering emergency pause immediately halts all queued and scheduled publishing without losing approved content state.
4. **Bilingual Script Alignment:** Malayalam and English variants must map identical recipe parameters, timings, and verified ingredients.
5. **Least-Privilege Token Vault:** Mock and live credentials must be scrubbed from error logs, client API responses, and serialization.

---

## Tasks

### Task 1: Core Marketing Domain Types & State Models
**Files:**
- Create: `lib/marketing/types/marketing-types.ts`
- Test: `tests/marketing/types-validation.test.ts`

**Interfaces:**
- Produces: `MarketingPost`, `CampaignPhase`, `ContentPillar`, `ContentStatus`, `PlatformType`, `SocialPlatformAdapter`, `ApprovalRecord`, `AssetProvenance`, `GrowthExperiment`, `MarketingFunnelMetrics`, `PublishingQueueItem`

- [ ] **Step 1: Write failing test for type constraints and default state validators**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement data structures and validation guards in `lib/marketing/types/marketing-types.ts`**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 2: 30-Day Campaign Template & Content Calendar Service
**Files:**
- Create: `lib/marketing/data/initial-30-day-campaign.ts`
- Create: `lib/marketing/services/campaign-calendar-service.ts`
- Test: `tests/marketing/campaign-calendar.test.ts`

**Interfaces:**
- Consumes: `lib/marketing/types/marketing-types.ts`
- Produces: `CampaignCalendarService` (`get30DayCalendar()`, `getPostById()`, `updatePost()`, `filterPosts()`, `exportCalendar(format)`)

- [ ] **Step 1: Write failing test for 30-day calendar retrieval, filtering by pillar/platform, and ICS/CSV export**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement 30 detailed day-by-day campaigns with bilingual scripts, captions, hashtags, and format specifications**
- [ ] **Step 4: Implement `CampaignCalendarService` with ICS/CSV/JSON exporters**
- [ ] **Step 5: Run test to verify it passes**

---

### Task 3: Social Platform Adapters & Manual Publishing Fallback
**Files:**
- Create: `lib/marketing/adapters/base-adapter.ts`
- Create: `lib/marketing/adapters/youtube-adapter.ts`
- Create: `lib/marketing/adapters/instagram-adapter.ts`
- Create: `lib/marketing/adapters/facebook-adapter.ts`
- Create: `lib/marketing/adapters/pinterest-adapter.ts`
- Create: `lib/marketing/adapters/linkedin-adapter.ts`
- Create: `lib/marketing/adapters/whatsapp-adapter.ts`
- Create: `lib/marketing/adapters/manual-fallback-adapter.ts`
- Create: `lib/marketing/adapters/adapter-registry.ts`
- Test: `tests/marketing/platform-adapters.test.ts`

**Interfaces:**
- Produces: `SocialPlatformAdapter` interface, `PlatformAdapterRegistry` with status verification, format checks, and manual checklists.

- [ ] **Step 1: Write failing tests for platform validation, permission checks, quota enforcement, and manual fallback generation**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement all 6 channel adapters + manual fallback checklist generator**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 4: Content Production Pipeline & Provenance Registry
**Files:**
- Create: `lib/marketing/services/content-generation-pipeline.ts`
- Create: `lib/marketing/services/media-asset-library.ts`
- Test: `tests/marketing/content-pipeline.test.ts`

**Interfaces:**
- Consumes: Verified recipes from `lib/data/recipes.ts`, `beverages.ts`, `desserts.ts`, `table-styling-concepts.ts`
- Produces: `ContentGenerationPipeline` (`generatePostAssets()`, `verifyClaimsAndLicensing()`, `generateThumbnailPrompt()`), `MediaAssetLibrary` (`getAssets()`, `registerProvenance()`)

- [ ] **Step 1: Write failing test for content generation, dish image relevance verification, and asset provenance auditing**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement verified recipe linker, Malayalam script generator, audio narration script builder, and provenance tracker**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 5: Approval Workflow, Emergency Pause & Scheduler Engine
**Files:**
- Create: `lib/marketing/services/approval-workflow-service.ts`
- Create: `lib/marketing/services/scheduler-service.ts`
- Test: `tests/marketing/approval-scheduler.test.ts`

**Interfaces:**
- Produces: `ApprovalWorkflowService` (`approvePost()`, `rejectPost()`, `setEmergencyPause()`, `isEmergencyPaused()`), `SchedulerService` (`enqueue()`, `processQueue()`, `calculateNextPublishSlot()`, `retryFailed()`)

- [ ] **Step 1: Write failing test for approval state transitions, emergency pause killswitch, timezone windowing, and retry with backoff**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement approval audit logging, emergency pause controller, and timezone-aware scheduler**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 6: Growth Experiments, Privacy-Conscious Analytics & Revenue Funnel
**Files:**
- Create: `lib/marketing/services/growth-experiments-service.ts`
- Create: `lib/marketing/services/analytics-revenue-service.ts`
- Test: `tests/marketing/growth-analytics.test.ts`

**Interfaces:**
- Produces: `GrowthExperimentsService` (`getExperiments()`, `recordOutcome()`), `AnalyticsRevenueService` (`getFunnelReport()`, `generateUTM()`, `generateWeeklyExecutiveDigest()`)

- [ ] **Step 1: Write failing test for UTM generation, funnel attribution separation (observed vs estimated), and weekly report generation**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement A/B testing matrix and privacy-first analytics calculation**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 7: Marketing API Endpoints
**Files:**
- Create: `app/api/marketing/posts/route.ts`
- Create: `app/api/marketing/posts/[id]/approve/route.ts`
- Create: `app/api/marketing/posts/[id]/publish/route.ts`
- Create: `app/api/marketing/analytics/route.ts`
- Create: `app/api/marketing/pause/route.ts`
- Create: `app/api/marketing/export/route.ts`
- Test: `tests/marketing/api-routes.test.ts`

- [ ] **Step 1: Write failing tests for all marketing REST endpoints**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement Next.js App Router route handlers with proper HTTP status codes, error handling, and authorization simulation**
- [ ] **Step 4: Run test to verify it passes**

---

### Task 8: Dedicated Liquid-Glass Marketing Dashboard UI
**Files:**
- Create: `app/marketing/page.tsx`
- Create: `app/marketing/components/MarketingHeader.tsx`
- Create: `app/marketing/components/CampaignCalendarView.tsx`
- Create: `app/marketing/components/PostDetailStudio.tsx`
- Create: `app/marketing/components/PublishingQueueView.tsx`
- Create: `app/marketing/components/MediaAssetGallery.tsx`
- Create: `app/marketing/components/GrowthExperimentsView.tsx`
- Create: `app/marketing/components/AnalyticsDigestView.tsx`
- Create: `app/marketing/components/ChannelIntegrationsView.tsx`
- Modify: `components/Navbar.tsx` (add link to Marketing Agent)
- Test: `tests/marketing/dashboard-render.test.ts`

- [ ] **Step 1: Write component tests for calendar filters, post detail modal, Malayalam audio preview, approval action triggers, and emergency pause**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement all marketing dashboard components with emerald/saffron liquid-glass aesthetics, mobile responsiveness, and tabbed workflow**
- [ ] **Step 4: Add Marketing navigation link in the main navigation bar**
- [ ] **Step 5: Run tests to verify all pass**

---

### Task 9: Comprehensive End-to-End Verification, Security Audit & Documentation
**Files:**
- Create: `docs/marketing/social-media-automation-guide.md`
- Run: Full vitest test suite across entire project
- Verify: Zero security vulnerabilities, zero secret leaks, verified asset provenance

- [ ] **Step 1: Run all tests in the workspace**
- [ ] **Step 2: Generate complete documentation covering platform setup, manual publishing SOPs, and operational guidelines**
- [ ] **Step 3: Verify the dashboard build using Next.js build**
