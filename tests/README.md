# Miseva AI — Test Architecture & Quality Gates

This directory contains the automated test suites for Miseva AI across 5 specialized domains.

```
tests/
├── audit/                  # AppSec, Play Store, Image & Catalog Quality
│   ├── coverage-audit.test.ts        # Enforces >= 10 items per collection
│   ├── excel-validation.test.ts      # Multi-sheet Excel export integrity
│   ├── image-audit.test.ts           # Dish-to-image mapping & anomaly check
│   ├── release-readiness.test.ts     # Android 16 API 36 compliance
│   └── security-guardian.test.ts     # Secret scanning & AppSec checks
│
├── culinary/               # Core Culinary Domain, Intelligence & Table Styling
│   ├── ai-agent.test.ts              # Conversational Chef Agent
│   ├── meal-collection-builder.test.ts # Curated meal collections & dish selector
│   ├── meal-planner.test.ts          # 7-day schedule & budget rollup
│   ├── navigation.test.ts            # Regional routing & canonical slugs
│   ├── pricing.test.ts               # 6-retailer cost intelligence
│   ├── recipes.test.ts               # Recipe database & scaling math
│   ├── speech.test.ts                # Bilingual speech engine & parser
│   ├── table-styling-detail.test.ts  # Concept & luxury detail resolution
│   ├── table-styling-page.test.ts    # Table Styling Studio 8-section layout
│   ├── table-styling-prompt-engine.test.ts # AI dining prompt generator
│   ├── table-styling-themes.test.ts  # 10 luxury themes & palette tokens
│   └── tableware-customizer.test.ts  # 2D top-down arrangement & tableware customizer
│
├── marketing/              # 30-Day Omnichannel Automation
│   ├── api-routes.test.ts            # Marketing REST endpoints
│   ├── approval-scheduler.test.ts    # Sign-offs, IST timezone & killswitch
│   ├── campaign-calendar.test.ts     # 30-day flight calendar & filters
│   ├── content-pipeline.test.ts      # Bilingual English/Malayalam briefs
│   ├── dashboard-render.test.ts      # Marketing Hub state & UI
│   ├── growth-analytics.test.ts      # 7 A/B experiments & LTV models
│   ├── platform-adapters.test.ts     # YouTube, IG, FB, Pin, LinkedIn, WA
│   └── types-validation.test.ts      # 8 status states & schema models
│
├── motion/                 # GPU-Accelerated Motion Graphics & HUD
│   ├── dock-theme.test.ts            # HUD control dock & palette switcher
│   ├── holo-radar.test.ts            # Holographic Culinary Radar HUD
│   └── motion-graphics.test.ts       # HTML5 Canvas particles & cyber grid
│
└── theme/                  # Design System & Theming Engine
    ├── theme.test.ts                 # 7 liquid-glass & futuristic themes
    └── theme-futuristic.test.ts      # Cyber Kitchen 2099 CSS tokens
```

## Running Tests

```bash
# Run all 30 test suites (129 tests)
npm test

# Run a specific domain
npx vitest run tests/audit
npx vitest run tests/culinary
npx vitest run tests/marketing
npx vitest run tests/motion
npx vitest run tests/theme
```
