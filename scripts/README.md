# 🛠️ Miseva AI — Automation & Utility Scripts Directory

This directory contains automation pipelines, security audits, data export generators, and deployment gates for the Miseva AI platform.

---

## 📁 Directory Architecture

```
scripts/
├── audit/                        # Catalog, image, and recipe data integrity audits
│   ├── analyze-dessert-images.ts
│   ├── assign-verified-culinary-images.ts
│   ├── audit-full-catalog-images.ts
│   ├── check-catalog-images.ts
│   ├── clean-duplicates.ts
│   ├── dish-catalog-list.txt
│   ├── fix-collections.ts
│   ├── list-all-dishes.ts
│   ├── list-recipe-duplicate-groups.ts
│   ├── update-beverage-images.ts
│   └── update-dessert-images.ts
├── exports/                      # Production data export generators
│   ├── generate-database-exports.ts    # Generates JSON/CSV exports in public/exports/
│   └── generate-recipe-excel.ts       # Generates multi-sheet Excel master catalogue
├── deploy/                       # CI/CD deployment scripts & verification gates
│   ├── deploy-verification.ts         # Pre-deployment verification gate
│   ├── git-push.ps1                   # WCM-authenticated Git push script
│   ├── vercel-deploy.ps1              # Production Vercel deployment helper
│   └── wcm-cred.ps1                   # Windows Credential Manager diagnostics
├── android-release-readiness.ts  # Android 16 (API 36) Google Play policy audit engine
├── security-guardian.ts          # 14-scope AppSec & secret scanning audit suite
└── [forwarders]                  # Root entrypoints preserving package.json backward compatibility
    ├── deploy-verification.ts          -> scripts/deploy/deploy-verification.ts
    ├── generate-database-exports.ts    -> scripts/exports/generate-database-exports.ts
    ├── generate-recipe-excel.ts        -> scripts/exports/generate-recipe-excel.ts
    ├── git-push.ps1                    -> scripts/deploy/git-push.ps1
    ├── vercel-deploy.ps1               -> scripts/deploy/vercel-deploy.ps1
    └── wcm-cred.ps1                    -> scripts/deploy/wcm-cred.ps1
```

---

## ⚡ Quick Command Reference

| Command | Target Script | Purpose |
| :--- | :--- | :--- |
| `npm run security:audit` | `scripts/security-guardian.ts` | Runs the 14-scope AppSec audit (secrets, RLS, manifests, agent sandboxing) |
| `npm run release:android-audit` | `scripts/android-release-readiness.ts` | Audits Android 16 (API 36) compliance & 14-day tester policies |
| `npm run deploy:verify` | `scripts/deploy/deploy-verification.ts` | Validates Git status, build artifacts, and deployment targets |
| `npm run export:excel` | `scripts/exports/generate-recipe-excel.ts` | Compiles `Miseva_AI_Complete_Recipe_Catalogue.xlsx` (8 sheets, 300+ recipes) |
| `npm run export:db` | `scripts/exports/generate-database-exports.ts` | Generates minified JSON and CSV recipe exports |
| `npm run audit:catalog` | `scripts/audit/audit-full-catalog-images.ts` | Validates image URL resolutions and catalog health |

---

## 🔒 Security & Execution Notes

1. **Root Resolution**: Scripts resolve project paths dynamically via `process.cwd()` ensuring seamless execution from anywhere in the workspace.
2. **Credential Safety**: PowerShell scripts under `scripts/deploy/` use `advapi32.dll` to read tokens directly from Windows Credential Manager without exposing credentials to files or environment leaks.
3. **Automated Testing**: All audit logic and export outputs are continuously tested under `tests/audit/` (`excel-validation.test.ts`, `release-readiness.test.ts`, `security-guardian.test.ts`).
