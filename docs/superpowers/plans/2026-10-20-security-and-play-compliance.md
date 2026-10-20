# Security Guardian, Google Play Compliance, and Deployment Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish an autonomous, full-codebase Security Guardian auditor, Google Play compliance verification engine targeting Android 16 (API Level 36), deployment verification workflows for Git, Vercel, and Android release preparation, and generate dual release reports (Report A: Web Deployment and Report B: Android Submission) with status `READY FOR OWNER APPROVAL`.

**Architecture:** 
1. **Security Guardian Engine (`scripts/security-guardian.ts`)**: Automated full-stack SAST, dependency vulnerability audit, secret detection, API route input validation, Android manifest security verification, AI prompt-injection guardrails, and SBOM generation.
2. **Android Release Readiness Engine (`scripts/android-release-readiness.ts`)**: Audit engine enforcing targetSdk 36 (Android 16+ as of Aug 31, 2026), 6 official Google Play documentation policies, 12-tester/14-day closed testing validation, Permission Justification Matrix, and Data Safety Form generation.
3. **Deployment Verification Engine (`scripts/deploy-verification.ts`)**: Git tree and WCM credential audit, commit verification for `culinaryverse-ai`, Vercel preview/production gating, and health check validation.
4. **CI/CD Automation (`.github/workflows/`)**: Continuous security scan, Android release verification, and Turbopack web deployment workflows.
5. **Comprehensive Documentation & Reports (`docs/`)**: Updated Master Prompt specification, Security Audit Report, Permission Matrix, Data Safety Declarations, and Dual Release Reports (Web & Android).

**Tech Stack:** TypeScript, Node.js, Next.js 16 (App Router), Vitest, Kotlin / Gradle (targetSdk 36), GitHub Actions.

**Spec:** CulinaryVerse AI Master Prompt with Critical Addendum: Security Audit, Google Play Compliance, and Deployment Readiness.

## Global Constraints
- Full codebase scope: Next.js, Android Kotlin/Compose, APIs, AI agents, Supabase RLS, grocery shopping integrations, media, secrets, and dependencies.
- Android Target API: Must target Android 16 / API Level 36 or higher (`targetSdk = 36`, `compileSdk = 36`).
- Closed testing requirement: Must document and check the 12 testers for 14 continuous days rule for personal developer accounts created after Nov 13, 2023.
- Severity Gate: Critical (blocks release), High (blocks release without documented exception), Medium (remediate/compensate), Low (document).
- No hardcoded secrets, test credentials, or insecure HTTP endpoints anywhere in the repository.
- Final release statuses must be one of: `READY FOR OWNER APPROVAL`, `BLOCKED — ACTION REQUIRED`, `DEPLOYED / SUBMITTED — VERIFIED`, `RELEASE REJECTED OR FAILED — INVESTIGATION REQUIRED`.

## Review Focus
1. Ensuring `compileSdk` and `targetSdk` are strictly set to 36 in `android/app/build.gradle.kts`.
2. Verifying that the 6 official Google Play policy URLs are referenced and actively checked.
3. Checking that no secrets or sensitive keys exist in source code or git history.
4. Ensuring all 21 Next.js routes and native Android screens maintain full type safety and zero build errors.
5. Verifying that both Report A and Report B are produced with exhaustive detail and status `READY FOR OWNER APPROVAL`.

---

### Task 1: Update Android Build Configuration to Target API 36 & Security Hardening
**Files:**
- Modify: `android/app/build.gradle.kts`
- Modify: `android/app/src/main/AndroidManifest.xml`
- Modify: `android/app/proguard-rules.pro`

- [ ] **Step 1: Update `android/app/build.gradle.kts` to targetSdk 36 and compileSdk 36**
- [ ] **Step 2: Enable ProGuard / R8 minification and configure release signing block in `build.gradle.kts`**
- [ ] **Step 3: Harden `android/app/src/main/AndroidManifest.xml` (disallow cleartext traffic, configure backup rules, verify exported components)**
- [ ] **Step 4: Verify Android configuration syntax and dependencies**

---

### Task 2: Implement Security Guardian Audit Engine & Unit Tests
**Files:**
- Create: `scripts/security-guardian.ts`
- Create: `tests/security-guardian.test.ts`
- Modify: `package.json` (add `npm run security:audit` script)

- [ ] **Step 1: Write unit tests in `tests/security-guardian.test.ts` defining test cases for secret scanning, SAST checks, Android manifest audit, and severity gating**
- [ ] **Step 2: Run tests to verify failure before implementation**
- [ ] **Step 3: Implement `scripts/security-guardian.ts` covering full codebase scope**
- [ ] **Step 4: Run tests to verify all pass**
- [ ] **Step 5: Run `npm run security:audit` and generate `docs/security/security-guardian-report.md`**

---

### Task 3: Implement Android Release Readiness Engine & Google Play Policy Verification
**Files:**
- Create: `scripts/android-release-readiness.ts`
- Create: `tests/release-readiness.test.ts`
- Modify: `package.json` (add `npm run release:android-audit` script)

- [ ] **Step 1: Write unit tests in `tests/release-readiness.test.ts` verifying API 36 compliance, permission justification matrix, Data Safety disclosures, and official policy URLs**
- [ ] **Step 2: Run tests to verify failure before implementation**
- [ ] **Step 3: Implement `scripts/android-release-readiness.ts`**
- [ ] **Step 4: Run tests to verify all pass**
- [ ] **Step 5: Run `npm run release:android-audit` to generate `docs/release/permission-justification-matrix.md` and `docs/release/google-play-data-safety.md`**

---

### Task 4: Implement Deployment Verification Workflow & CI/CD Pipelines
**Files:**
- Create: `scripts/deploy-verification.ts`
- Create: `.github/workflows/security-audit.yml`
- Create: `.github/workflows/android-release-gate.yml`
- Create: `.github/workflows/web-deploy-gate.yml`
- Modify: `package.json` (add `npm run deploy:verify` script)

- [ ] **Step 1: Implement `scripts/deploy-verification.ts` to inspect Git configuration, WCM credentials, Vercel preview/production configs**
- [ ] **Step 2: Create GitHub Actions workflows for continuous security, Android release readiness, and Web Turbopack deployment**
- [ ] **Step 3: Run `npm run deploy:verify` and verify clean execution**

---

### Task 5: Master Prompt Specification & Dual Release Reports Generation
**Files:**
- Create: `docs/CULINARYVERSE_AI_MASTER_PROMPT.md`
- Create: `docs/release/web-deployment-report.md` (Report A: Web Deployment)
- Create: `docs/release/android-submission-report.md` (Report B: Android Submission)
- Modify: `README.md`

- [ ] **Step 1: Create `docs/CULINARYVERSE_AI_MASTER_PROMPT.md` with complete prompt including CRITICAL ADDENDUM**
- [ ] **Step 2: Generate Report A: Web Deployment (`docs/release/web-deployment-report.md`) with status `READY FOR OWNER APPROVAL`**
- [ ] **Step 3: Generate Report B: Android Submission (`docs/release/android-submission-report.md`) with status `READY FOR OWNER APPROVAL`**
- [ ] **Step 4: Update `README.md` with Security Guardian, Google Play Compliance, and Deployment Readiness badges and documentation**

---

### Task 6: Full Verification & Quality Gate Execution
- [ ] **Step 1: Run all Vitest suites (`npm test`)**
- [ ] **Step 2: Run TypeScript type check (`npx tsc --noEmit`)**
- [ ] **Step 3: Run production build (`npm run build`)**
- [ ] **Step 4: Run full security audit (`npm run security:audit`)**
- [ ] **Step 5: Run Android release audit (`npm run release:android-audit`)**
- [ ] **Step 6: Run deployment verification (`npm run deploy:verify`)**
