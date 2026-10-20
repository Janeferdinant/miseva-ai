# Miseva AI — Documentation Hub

Welcome to the central documentation index for **Miseva AI** (*Your World. Your Kitchen. Your AI Chef.*). This directory contains all technical specifications, architectural decisions, AppSec audits, Google Play compliance filings, and brand assets.

---

## 🗂️ Documentation Directory Structure

### 1. [Audit & Quality Assurance](file:///c:/Users/Asus/Documents/cusine/docs/audit)
- [Database Coverage Audit Report](file:///c:/Users/Asus/Documents/cusine/docs/audit/coverage-audit-report.md) — Rigorous audit confirming 10+ distinct dishes per regional cuisine, zero duplicate IDs/slugs, and 100% data completeness.
- [Feature Parity Matrix](file:///c:/Users/Asus/Documents/cusine/docs/audit/feature-parity-matrix.md) — Comprehensive comparison of Next.js web application and native Jetpack Compose Android app capabilities.

### 2. [Security & Compliance](file:///c:/Users/Asus/Documents/cusine/docs/security)
- [Security Guardian Audit Report](file:///c:/Users/Asus/Documents/cusine/docs/security/security-guardian-report.md) — AppSec report covering 14 distinct scopes: SAST, secret detection, API route input validation, Android Manifest hardening, and SBOM.

### 3. [Release & Play Store Compliance](file:///c:/Users/Asus/Documents/cusine/docs/release)
- [Android Submission Readiness Report](file:///c:/Users/Asus/Documents/cusine/docs/release/android-submission-report.md) — Verification of Android 16 (Target SDK 36), 64-bit binaries, App Bundle generation, and the mandatory 12-tester / 14-day closed testing protocol.
- [Google Play Data Safety Form](file:///c:/Users/Asus/Documents/cusine/docs/release/google-play-data-safety.md) — Verified questionnaire answers for Play Console submission.
- [Permission Justification Matrix](file:///c:/Users/Asus/Documents/cusine/docs/release/permission-justification-matrix.md) — Technical justifications for `RECORD_AUDIO`, `INTERNET`, and `WAKE_LOCK`.
- [Web Deployment Report](file:///c:/Users/Asus/Documents/cusine/docs/release/web-deployment-report.md) — Production deployment status and health checks on Vercel.

### 4. [Specifications](file:///c:/Users/Asus/Documents/cusine/docs/specs)
- [CulinaryVerse & Miseva AI Master Specification](file:///c:/Users/Asus/Documents/cusine/docs/specs/CULINARYVERSE_AI_MASTER_PROMPT.md) — Foundational system architecture, data models, and prompt specifications.

### 5. [Brand Identity](file:///c:/Users/Asus/Documents/cusine/docs/brand)
- [Brand Guidelines](file:///c:/Users/Asus/Documents/cusine/docs/brand/brand-guidelines.md) — Color palette (Deep Emerald `#004D40`, Warm Ivory `#FBFBF9`, Saffron Gold `#E5A93C`), typography, and design tokens.
- [Logo Usage Guide](file:///c:/Users/Asus/Documents/cusine/docs/brand/logo-usage-guide.md) — Rules for SVG logo variants, clear space, and dark/light mode rendering.
- [Naming & Trademark Research](file:///c:/Users/Asus/Documents/cusine/docs/brand/naming-trademark-research.md) — Semantic etymology (*mise en place* + seva) and trademark clearance.
- [Visual Asset Pipeline](file:///c:/Users/Asus/Documents/cusine/docs/brand/visual-asset-pipeline.md) — Guidelines for culinary imagery and photography standards.

### 6. [Marketing Strategy](file:///c:/Users/Asus/Documents/cusine/docs/marketing)
- [30-Day Launch Content Calendar](file:///c:/Users/Asus/Documents/cusine/docs/marketing/30-day-content-calendar.md) — Multi-channel promotional plan across Instagram, YouTube, and TikTok.
- [App Store Optimization (ASO)](file:///c:/Users/Asus/Documents/cusine/docs/marketing/google-play-aso.md) — Optimized metadata, keywords, and screenshots for Google Play Store.
- [Instagram Carousels](file:///c:/Users/Asus/Documents/cusine/docs/marketing/instagram-carousels.md) — Copy and design layouts for culinary educational carousels.
- [SEO Growth Strategy](file:///c:/Users/Asus/Documents/cusine/docs/marketing/seo-strategy.md) — Long-tail search optimization for regional Indian and international recipes.
- [Short-Form Video Scripts](file:///c:/Users/Asus/Documents/cusine/docs/marketing/short-form-video-scripts.md) — Engaging 15-60s video concepts demonstrating Malayalam voice guidance and the cooking studio.

### 7. [CI/CD Workflows](file:///c:/Users/Asus/Documents/cusine/docs/workflows)
- `security-audit.yml` — Automated GitHub Actions workflow for secret scanning and vulnerability checks.
- `web-deploy-gate.yml` — Automated Vercel deployment verification gate.
- `android-release-gate.yml` — Automated Gradle build and API 36 compliance check.

### 8. [Superpowers Implementation Plans](file:///c:/Users/Asus/Documents/cusine/docs/superpowers/plans)
- Granular, verifiable implementation plans tracking major features, image audits, Excel exports, and code organization.
