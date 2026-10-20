param()

$ErrorActionPreference = "Stop"

$sourceRoot = "c:\Users\Asus\Documents\cusine"
$targetRoot = "c:\Users\Asus\Documents\miseva-ai-marketing"

Write-Host ">>> Creating target directory: $targetRoot"
if (-not (Test-Path $targetRoot)) {
    New-Item -ItemType Directory -Path $targetRoot -Force | Out-Null
}

# 1. Scaffold directories
$dirs = @(
    "app",
    "app/api",
    "app/api/marketing",
    "app/campaigns",
    "app/campaigns/[slug]",
    "app/marketing",
    "app/marketing/components",
    "lib",
    "lib/marketing",
    "tests",
    "tests/marketing"
)

foreach ($d in $dirs) {
    $p = Join-Path $targetRoot $d
    if (-not (Test-Path $p)) {
        New-Item -ItemType Directory -Path $p -Force | Out-Null
    }
}

# 2. Copy Marketing Assets from Source
Write-Host ">>> Copying lib/marketing..."
Copy-Item -Path "$sourceRoot\lib\marketing\*" -Destination "$targetRoot\lib\marketing" -Recurse -Force

Write-Host ">>> Copying app/marketing components and page..."
Copy-Item -Path "$sourceRoot\app\marketing\components\*" -Destination "$targetRoot\app\marketing\components" -Recurse -Force
Copy-Item -Path "$sourceRoot\app\marketing\page.tsx" -Destination "$targetRoot\app\marketing\page.tsx" -Force

Write-Host ">>> Copying app/campaigns..."
Copy-Item -Path "$sourceRoot\app\campaigns\page.tsx" -Destination "$targetRoot\app\campaigns\page.tsx" -Force
Copy-Item -Path "$sourceRoot\app\campaigns\[slug]\*" -Destination "$targetRoot\app\campaigns\[slug]" -Recurse -Force

Write-Host ">>> Copying app/api/marketing..."
Copy-Item -Path "$sourceRoot\app\api\marketing\*" -Destination "$targetRoot\app\api\marketing" -Recurse -Force

Write-Host ">>> Copying tests/marketing..."
Copy-Item -Path "$sourceRoot\tests\marketing\*" -Destination "$targetRoot\tests\marketing" -Recurse -Force

# 3. Create Root app/page.tsx that imports and displays the Marketing Dashboard directly at /
$rootPageContent = @"
import MarketingDashboard from "./marketing/page";

export default function Home() {
  return <MarketingDashboard />;
}
"@
Set-Content -Path "$targetRoot\app\page.tsx" -Value $rootPageContent -Encoding UTF8

# 4. Create Root app/layout.tsx
$rootLayoutContent = @"
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miseva AI Marketing Platform — Autonomous Social Media & Growth Engine",
  description: "Autonomous multi-channel marketing, social media scheduling, AI content studio, and customer segmentation engine. Academic Lead: Jane Rose, Assistant Professor, CSE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans selection:bg-emerald-500 selection:text-white">
        <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
              M
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Miseva AI <span className="text-emerald-400 font-semibold text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">Marketing Engine</span>
              </div>
              <div className="text-[10px] text-slate-400">Autonomous Culinary Growth & Campaign Hub</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="hidden sm:inline">Lead: <strong className="text-slate-200">Jane Rose</strong>, Asst. Prof, CSE</span>
            <a 
              href="https://cusine-chi.vercel.app" 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-medium transition"
            >
              Open Cuisine App &rarr;
            </a>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
"@
Set-Content -Path "$targetRoot\app\layout.tsx" -Value $rootLayoutContent -Encoding UTF8

# 5. Copy or create globals.css
$globalsCssContent = @"
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #020617;
  --foreground: #f8fafc;
}

body {
  color: var(--foreground);
  background: var(--background);
}

.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
"@
Set-Content -Path "$targetRoot\app\globals.css" -Value $globalsCssContent -Encoding UTF8

# 6. Create package.json
$pkgJsonContent = @"
{
  "name": "miseva-ai-marketing",
  "version": "1.0.0",
  "description": "Miseva AI Marketing — Autonomous Social Media & Growth Engine. Academic Attribution: Jane Rose, Assistant Professor, CSE.",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.59.0",
    "next": "^16.4.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.7.0"
  },
  "devDependencies": {
    "@types/node": "^26.6.5",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "autoprefixer": "^10.6.1",
    "postcss": "^8.5.31",
    "tailwindcss": "^3.4.17",
    "typescript": "^7.0.2",
    "vitest": "^5.0.5"
  }
}
"@
Set-Content -Path "$targetRoot\package.json" -Value $pkgJsonContent -Encoding UTF8

# 7. Create tsconfig.json
$tsconfigContent = @"
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@
Set-Content -Path "$targetRoot\tsconfig.json" -Value $tsconfigContent -Encoding UTF8

# 8. Create next.config.ts
$nextConfigContent = @"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
"@
Set-Content -Path "$targetRoot\next.config.ts" -Value $nextConfigContent -Encoding UTF8

# 9. Create tailwind.config.ts and postcss.config.mjs
$tailwindConfigContent = @"
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
"@
Set-Content -Path "$targetRoot\tailwind.config.ts" -Value $tailwindConfigContent -Encoding UTF8

$postcssContent = @"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@
Set-Content -Path "$targetRoot\postcss.config.mjs" -Value $postcssContent -Encoding UTF8

# 10. Create vitest.config.ts
$vitestContent = @"
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
"@
Set-Content -Path "$targetRoot\vitest.config.ts" -Value $vitestContent -Encoding UTF8

# 11. Create README.md
$readmeContent = @"
# Miseva AI Marketing & Social Media Automation Platform

> **Academic Attribution & Project Leadership:**  
> Developed under the academic supervision and engineering leadership of **Jane Rose, Assistant Professor, Department of Computer Science & Engineering (CSE)**.

## Overview

**Miseva AI Marketing** (`Janeferdinant/miseva-ai-marketing`) is the dedicated, standalone multi-channel marketing, social media scheduling, AI content studio, and growth analytics platform for the Miseva AI Culinary Ecosystem.

This repository was cleanly separated from the primary cuisine discovery application (`Janeferdinant/miseva-ai`) to establish independent deployment cycles, distinct environment variable governance, and autonomous background execution.

## Core Capabilities

1. **30-Day Automated Campaign Calendar**: Pre-loaded with culturally resonant food holidays, festival takeovers, and intent-driven recipe promos across Instagram, YouTube, Facebook, Pinterest, LinkedIn, and WhatsApp.
2. **AI Content Studio**: Generates multi-format creative hooks, captions, hashtags, and visual generation prompts with bilingual English and Malayalam cultural support.
3. **Omni-Channel Publishing Queue**: Mock and production adapters for social media platforms with verification checks.
4. **Channel Integrations**: Production-ready adapters for YouTube, Instagram, Facebook, Pinterest, LinkedIn, and WhatsApp.
5. **Customer Segmentation Engine**: Segments users based on culinary intent (Vegan Explorers, Busy Parents, Festival Celebrators, Budget Cooks).
6. **AI Recommendation Engine**: Correlates customer segments with recipe categories to maximize campaign engagement.
7. **Attribution & UTM Funnel**: First-party consent-compliant attribution tracking for campaign conversions.
8. **Growth & Budget Experiments**: A/B testing framework for headlines, CTA formats, and ad spend allocation.
9. **Error & Health Monitor**: Circuit breaker and retry queues for network resilience.
10. **Executive Analytics Digest**: Weekly rollup metrics on reach, impressions, click-through rates, and estimated culinary conversions.

## Architecture & Integration

- **Primary Cuisine Discovery App**: [https://cusine-chi.vercel.app](https://cusine-chi.vercel.app)
- **Marketing Automation Engine**: [https://miseva-ai-marketing.vercel.app](https://miseva-ai-marketing.vercel.app)

## Local Development & Testing

```bash
# Run unit tests
npm test

# Run development server
npm run dev

# Run production build
npm run build
```
"@
Set-Content -Path "$targetRoot\README.md" -Value $readmeContent -Encoding UTF8

# 12. Create .gitignore
$gitignoreContent = @"
node_modules
.next
out
build
dist
.env*.local
.DS_Store
*.log
"@
Set-Content -Path "$targetRoot\.gitignore" -Value $gitignoreContent -Encoding UTF8

Write-Host ">>> Standalone marketing repository successfully scaffolded at $targetRoot"
