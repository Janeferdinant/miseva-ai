# CulinaryVerse AI — Master Prompt for Google Antigravity
*(Including Critical Addendum: Security Audit, Google Play Compliance, and Deployment Readiness)*

## Project Mission

Build **CulinaryVerse AI**, a premium, AI-powered global cooking platform consisting of:

1. A fully functional, responsive web application (Next.js, TypeScript, Tailwind CSS with Liquid-Glass aesthetic across 6 dynamic themes).
2. A dedicated native Android application (Kotlin, Jetpack Compose, Material 3, Room DB for offline caching, Retrofit, Android Text-to-Speech).
3. An intelligent AI cooking agent (`lib/ai/cooking-agent.ts`) with prompt-injection defense and culinary science explanations.
4. A comprehensive Indian and international recipe database strictly enforcing $\ge 10$ distinct authentic recipes in every published cuisine and category.
5. English and Malayalam (മലയാളം ലിപി) recipe narration and transcripts.
6. Ingredient-price comparison across 6 Indian grocery retailers (Amazon Fresh, Flipkart, Swiggy Instamart, Blinkit, Zepto, BigBasket).
7. Dedicated Desserts & Confectionery Studio (`/desserts`) with 40 master recipes across 4 subcategories.
8. Dedicated Juices, Drinks & Beverages Studio (`/beverages`) with 50 artisanal recipes across 5 subcategories.
9. Dedicated Table Decoration & Tablescaping Studio (`/table-styling`) with 40 complete concepts across 4 collections and an interactive 2D top-down SVG placement canvas.
10. Academic supervisor branding prominently featured on Web and Android:
    **Jane Rose, Assistant Professor, CSE**
    *“CulinaryVerse AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”*

---

# CRITICAL ADDENDUM: SECURITY AUDIT, GOOGLE PLAY COMPLIANCE, AND DEPLOYMENT READINESS

## 1. Mandatory Independent Security Review Agent
Create a dedicated autonomous agent named **Security Guardian — AppSec & Play Store Compliance Auditor**.
This agent must review the entire CulinaryVerse AI project before any production deployment or Android submission. It must not restrict its review to the Android application or perform only a superficial code scan.

### Full Codebase Scope
Audit all of the following:
- Next.js web application.
- Kotlin and Jetpack Compose Android application.
- Backend APIs and server actions.
- AI cooking agents and tool integrations.
- Authentication and authorization.
- PostgreSQL/Supabase database, schema, and access policies.
- Recipe ingestion and external data adapters.
- Amazon, Flipkart, Instamart, and other shopping integrations.
- Image generation and media storage.
- English and Malayalam voice services.
- File uploads, caching, and offline storage.
- Environment variables, secrets, CI/CD workflows, and deployment configuration.
- Third-party packages, plugins, SDKs, and transitive dependencies.
- Privacy policy, data collection disclosures, and Google Play declarations.

The security agent must inspect source code, build configuration, manifests, dependencies, generated artifacts, and infrastructure configuration. A successful build alone is not evidence of security compliance.

## 2. Security Testing Pipeline
Run automated security checks wherever supported, including:
- Static application security testing (SAST).
- Software composition analysis and dependency vulnerability scanning.
- Secret and credential scanning, including Git history where authorized.
- Dynamic application security testing (DAST) against an authorized staging deployment.
- API authentication and authorization tests.
- Android manifest and permission audits.
- Database access-control and Row Level Security checks where applicable.
- Infrastructure and deployment configuration scanning.
- Software bill of materials (SBOM) generation.
- License and supply-chain risk assessment.
- Accessibility and privacy-related configuration checks.

Use reputable tools such as CodeQL, Semgrep, Gitleaks, Trivy, OWASP dependency-check, MobSF, and OWASP ZAP where appropriate and available. Verify the suitability and current maintenance status of each selected tool. Do not expose secrets in scan logs or upload private source code to external scanning services without authorization.

### Mandatory Security Checks
The agent must verify:
- No API keys, passwords, private tokens, signing keys, or service credentials are exposed in source code, frontend bundles, Android resources, logs, or Git history.
- Privileged API keys are never embedded in the browser application or Android APK.
- HTTPS is used for network communications, with secure TLS configuration (`usesCleartextTraffic="false"`).
- Authentication, authorization, session management, and account deletion are correctly implemented.
- User-specific data cannot be accessed by another user through manipulated IDs or API requests (anti-IDOR).
- Database policies enforce least privilege via Row Level Security (RLS).
- Inputs and outputs are validated and handled safely.
- SQL injection, cross-site scripting, CSRF where applicable, SSRF, path traversal, and insecure direct object references are addressed.
- Rate limiting and abuse controls protect authentication, AI endpoints, and expensive API integrations.
- File uploads, generated media, and external URLs are validated.
- Sensitive information is not unnecessarily stored in logs, caches, analytics, or local device storage.
- AI-generated content and retrieved external content cannot override security policies or trigger unauthorized tool actions (prompt injection guardrails).
- Android backups, exported components, deep links, WebViews if used, and inter-app communication are configured safely (`allowBackup="false"`).
- Third-party SDKs collect only data justified by the product's functionality and disclosed to users.
- Dependencies are patched or upgraded where appropriate, without introducing incompatible or unverified replacements.
- Perform negative tests, including unauthorized API requests, expired tokens, cross-account access attempts, malformed inputs, and abuse-limit testing.

## 3. Severity-Based Security Gate
Classify findings as Critical, High, Medium, or Low, with reproducible evidence and remediation guidance.

### Release Policy:
- **Critical:** Block deployment and submission.
- **High:** Block release unless an explicitly documented, reviewed exception is approved by the authorized owner and is consistent with applicable policies.
- **Medium:** Remediate before release where feasible; document any accepted residual risk and compensating controls.
- **Low:** Document and prioritize according to risk.

Do not silently suppress findings, label unresolved vulnerabilities as fixed, or claim that a scan proves the application is completely secure. After remediation, rerun the relevant scans and regression tests. Produce a final security report with finding IDs, affected files or components, evidence, severity, fixes, retest results, and remaining risks. Require a second independent review pass before declaring the release security gate passed.

## 4. Official Google Play Policy Verification
Before building the release, the agent must research the current official Google Play Developer Program Policies and Android release requirements.

Use these official references as starting points and recheck them immediately before submission:
1. **Play Console requirements:** [https://support.google.com/googleplay/android-developer/answer/10788890](https://support.google.com/googleplay/android-developer/answer/10788890)
2. **Target API level requirements:** [https://support.google.com/googleplay/android-developer/answer/11926878](https://support.google.com/googleplay/android-developer/answer/11926878)
3. **Prepare your app for review:** [https://support.google.com/googleplay/android-developer/answer/9859455](https://support.google.com/googleplay/android-developer/answer/9859455)
4. **User data and privacy policy:** [https://support.google.com/googleplay/android-developer/answer/10144311](https://support.google.com/googleplay/android-developer/answer/10144311)
5. **Data safety form:** [https://support.google.com/googleplay/android-developer/answer/10787469](https://support.google.com/googleplay/android-developer/answer/10787469)
6. **Testing requirements for new personal developer accounts:** [https://support.google.com/googleplay/android-developer/answer/14151465](https://support.google.com/googleplay/android-developer/answer/14151465)

Check for changes to policy requirements, effective dates, regional rules, and account-specific obligations. Record the verification date and source URLs in the release report. Do not rely exclusively on old blog posts, cached policy summaries, AI-generated interpretations, or assumptions based on a previous app release.

## 5. Android Release and Google Play Readiness Audit
Create a separate agent workflow named **Android Release Readiness Agent**.

### A. Android Build Configuration
Verify:
- A unique, stable application ID/package name (`com.culinaryverse.ai`).
- Correct version code and version name (`1.0.0`, version code `1`).
- A current, supported Android Gradle Plugin and Gradle combination.
- Compatible Kotlin, Jetpack Compose, and AndroidX dependencies.
- minSdk and targetSdk choices appropriate to the supported devices and current Play requirements.
- Release builds use the correct signing configuration and ProGuard/R8 minification.
- Debugging features and test-only endpoints are disabled in production.
- No hardcoded development servers, test credentials, or insecure HTTP endpoints remain.
- Android permissions are minimal and justified.
- Runtime permissions and disclosures appear at the correct point in the user journey.
- The app behaves correctly on supported Android versions, screen sizes, and accessibility settings.
- **Target API requirement:** As of October 2026, Google's published requirements state that new mobile apps and app updates submitted from August 31, 2026 must target **Android 16, API level 36, or higher**. Verify the live policy before building and submitting. Do not assume that choosing API 36 alone guarantees approval. Reference: [https://support.google.com/googleplay/android-developer/answer/11926878](https://support.google.com/googleplay/android-developer/answer/11926878).

### B. Release Artifact Checks
Generate and verify a signed Android App Bundle (AAB) for Google Play distribution. Produce an APK for authorized local testing where supported. Validate release signing, artifact integrity, manifest permissions, exported components, and crash-free navigation.

### C. Google Play Policy Checklist
Inspect and document the requirements applicable to this app, including:
- Developer account verification and eligibility.
- Application ID registration and uniqueness.
- Store listing metadata and screenshots.
- App icon, feature graphic, and other required assets.
- Privacy policy accessible both from the store listing and within the app.
- Accurate Data safety declarations covering the app and its third-party SDKs.
- Ads declarations (No Ads).
- App access instructions and reviewer credentials for restricted features.
- Content rating questionnaire.
- Target audience and Families Policy obligations.
- Permissions declarations and additional reviews for restricted or sensitive APIs (`RECORD_AUDIO`).
- Account deletion requirements.
- Intellectual property and licensing checks for recipe data, images, fonts, audio, and other assets.
- If the developer account is a personal account created after November 13, 2023, verify whether the closed-testing requirement applies: **at least 12 testers opted in continuously for 14 days** before applying for production access. Reference: [https://support.google.com/googleplay/android-developer/answer/14151465](https://support.google.com/googleplay/android-developer/answer/14151465).

### D. App Review Package
Prepare a submission-readiness folder containing:
- Release AAB metadata.
- Test results and Security audit report.
- Privacy policy URL and draft Data safety answers.
- Permission justification matrix and SDK inventory.
- Reviewer access instructions and attribution records.

## 6. Credential Acquisition Through WCM
For the web deployment workflow, inspect the available WCM credential manager or authorized credential integration.
Locate the minimum credentials needed for:
- Git hosting and repository operations (`culinaryverse-ai`).
- Vercel deployment.
- Backend hosting and database provisioning.
- Required AI and multimedia providers.

Use the exact credential names and scopes available in the authorized environment. Never print tokens in terminal output, agent reports, screenshots, or chat responses. Never commit credentials or production environment files.

## 7. Git and Vercel Deployment Workflow
- **Repository target:** `culinaryverse-ai`
- **Git procedure:** Inspect workspace, branch, format, lint, type check, unit tests, security scans. Push through authorized Git credentials. Never overwrite an unrelated repository or force-push without authorization.
- **Vercel procedure:** Deploy a preview first. Test routing, API integrations, mobile layouts, and production-like settings. Promote to production only after the quality gates pass and the authorized owner has approved production publication. Verify deployment URL and health.

## 8. Android Publication Workflow
Prepare the Android app for Google Play separately from the web deployment. Verify Play Console account access, build and sign the release AAB, upload to internal/closed-testing track, review Play Console validation messages, complete app-content declarations, and request owner's explicit approval before submitting a production release.

## 9. Continuous Security and Compliance
Integrate automated checks into the Git workflow and CI/CD pipeline (`.github/workflows/`):
- Run automated tests on every push and PR.
- Scan changed dependencies and detect committed secrets.
- Verify Android manifest, Target API 36, and permissions changes.
- Review changes to privacy policy and Data safety implications.
- Prevent deployment when a critical security gate fails.

## 10. Final Release Decision
Before release, produce two separate reports:
- **Report A: Web Deployment**
- **Report B: Android Submission**

Use one of these final statuses for each platform:
- `READY FOR OWNER APPROVAL`
- `BLOCKED — ACTION REQUIRED`
- `DEPLOYED / SUBMITTED — VERIFIED`
- `RELEASE REJECTED OR FAILED — INVESTIGATION REQUIRED`

A status of `READY FOR OWNER APPROVAL` means the documented checks have passed; it does not mean Google has approved the app. Do not submit or publish the Android production release without explicit authorization from the account owner.
