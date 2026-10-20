# Workspace Folder Organization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up and organize the Miseva AI project workspace by categorizing scripts into dedicated modules (`scripts/audit`, `scripts/exports`), grouping loose documentation into structured categories (`docs/audit`, `docs/specs`), adding a documentation index, and updating package scripts and documentation links while guaranteeing zero regressions in tests, builds, and CI verification gates.

**Architecture:** Maintain strict backwards-compatibility. Core CLI tools (`scripts/security-guardian.ts`, `scripts/android-release-readiness.ts`, `scripts/deploy-verification.ts`) remain root-executable for npm scripts and Vitest test suites. One-off catalog auditing scripts are moved into `scripts/audit/`, and export generators into `scripts/exports/` with root forwarders. Loose markdown files in `docs/` are categorized into `docs/audit/` and `docs/specs/` with an updated Table of Contents in `docs/README.md` and `README.md`.

**Tech Stack:** TypeScript, Next.js 16, Vitest, npm.

**Spec:** User request: "organize the folder" -> Option 1: "Organize the whole workspace: categorize scripts/ into submodules, organize docs/, and clean scratch files while keeping all npm commands and tests passing."

## Global Constraints
- All 12 Vitest test suites (64 tests) must pass with 0 failures (`npm test`).
- TypeScript compiler (`npx tsc --noEmit`) must report 0 errors.
- Next.js production build (`npm run build`) must complete successfully with exit code 0.
- All npm scripts (`security:audit`, `release:android-audit`, `deploy:verify`) must continue working seamlessly.
- Preserve all working functionality, branding, and academic attribution: **Jane Rose, Assistant Professor, CSE**.

---

### Task 1: Organize `scripts/` Folder into Submodules

**Files:**
- Create: `scripts/audit/`
  - Move: `analyze-dessert-images.ts`
  - Move: `assign-verified-culinary-images.ts`
  - Move: `audit-full-catalog-images.ts`
  - Move: `check-catalog-images.ts`
  - Move: `clean-duplicates.ts`
  - Move: `fix-collections.ts`
  - Move: `list-all-dishes.ts`
  - Move: `list-recipe-duplicate-groups.ts`
  - Move: `update-beverage-images.ts`
  - Move: `update-dessert-images.ts`
  - Move: `dish-catalog-list.txt`
- Create: `scripts/exports/`
  - Move: `generate-database-exports.ts`
  - Move: `generate-recipe-excel.ts`
- Create / Update forwarders:
  - `scripts/generate-recipe-excel.ts` (re-exports / invokes `scripts/exports/generate-recipe-excel.ts`)
  - `scripts/generate-database-exports.ts` (re-exports / invokes `scripts/exports/generate-database-exports.ts`)
- Modify: `package.json` to add convenient npm script shortcuts for exports and audits:
  - `"export:excel": "npx tsx scripts/exports/generate-recipe-excel.ts"`
  - `"export:db": "npx tsx scripts/exports/generate-database-exports.ts"`
  - `"audit:catalog": "npx tsx scripts/audit/audit-full-catalog-images.ts"`

- [ ] **Step 1: Create `scripts/audit` and `scripts/exports` directories and move files**
- [ ] **Step 2: Adjust internal relative paths in moved scripts if needed (e.g., imports from `../../lib/data/` or `ROOT_DIR`)**
- [ ] **Step 3: Provide clean root forwarders in `scripts/` for backwards compatibility**
- [ ] **Step 4: Update `package.json` with new script entries**
- [ ] **Step 5: Verify execution of scripts and tests**

---

### Task 2: Organize `docs/` Folder and Create Documentation Hub

**Files:**
- Create: `docs/audit/`
  - Move: `docs/coverage-audit-report.md` -> `docs/audit/coverage-audit-report.md`
  - Move: `docs/feature-parity-matrix.md` -> `docs/audit/feature-parity-matrix.md`
- Create: `docs/specs/`
  - Move: `docs/CULINARYVERSE_AI_MASTER_PROMPT.md` -> `docs/specs/CULINARYVERSE_AI_MASTER_PROMPT.md`
- Create: `docs/README.md` (Central Documentation Map & Architecture Guide)
- Modify: `README.md` (Update documentation links and Project Structure diagram)

- [ ] **Step 1: Create `docs/audit/` and `docs/specs/` directories and move loose files**
- [ ] **Step 2: Create `docs/README.md` listing all documentation sections, reports, and guidelines**
- [ ] **Step 3: Update markdown links in `README.md` to reflect new documentation locations**
- [ ] **Step 4: Update the Project Structure tree in `README.md`**

---

### Task 3: Comprehensive Regression Testing & Verification

**Files:**
- Verify: `tests/*.test.ts`
- Run: `npm test`
- Run: `npx tsc --noEmit`
- Run: `npm run build`
- Run: `npm run security:audit`
- Run: `npm run release:android-audit`
- Run: `npm run deploy:verify`

- [ ] **Step 1: Run Vitest test suite (`npm test`) and confirm 64/64 tests pass**
- [ ] **Step 2: Run TypeScript compiler check (`npx tsc --noEmit`) and confirm 0 errors**
- [ ] **Step 3: Run Next.js production build (`npm run build`) and confirm successful build**
- [ ] **Step 4: Run security & release audits (`npm run security:audit`, `npm run release:android-audit`, `npm run deploy:verify`)**
