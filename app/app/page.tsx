"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Download,
  WifiOff,
  Eye,
  Volume2,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";

export default function AppDownloadPage() {
  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Hero Section */}
      <section className="relative rounded-3xl glass-panel p-6 sm:p-12 overflow-hidden border border-glass-border shadow-glass">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-emerald-400 border border-emerald-500/30">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Native Android Application • Jetpack Compose & Material 3</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.12]">
              The Power of Miseva AI in the{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Palm of Your Hand.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-medium">
              Take the intelligence of professional <em>mise en place</em> directly to your countertop. Featuring offline Room SQLite caching, hands-free screen-awake cooking studio, and instant bilingual Malayalam & English voice narration.
            </p>

            <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Google Play Compliance • Target API 36 (Android 16+)</span>
              </div>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Engineered to strict Google Play Developer Program Policies with zero cleartext traffic, minimal justified permissions, and in-app privacy controls.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#download-options"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-900/40 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Get Miseva AI for Android</span>
              </a>
              <Link
                href="/recipes"
                className="px-5 py-3.5 rounded-xl glass-button text-sm font-bold text-foreground border border-white/20 hover:border-emerald-400/50 transition-all flex items-center gap-2"
              >
                <span>Try Web Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3D App Mockup Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src="/brand/images/app-experience.jpg"
                alt="Miseva AI Native Android App on Kitchen Counter"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl glass-card border border-white/20 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Miseva AI Android Studio</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Offline Room DB
                  </span>
                </div>
                <div className="text-xs text-white/90 mt-1">Real-time Malayalam voice synthesis & step-by-step cooking timers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Native Features */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Built for Real Kitchens. Not Just Desks.
          </h2>
          <p className="text-sm text-foreground/70">
            Kitchens are busy, flour-dusted, and mobile. The Miseva AI Android app is specifically engineered for hands-busy home cooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-glass-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">100% Offline Room DB</h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Weak kitchen Wi-Fi will never ruin your dinner. Saved recipes, meal plans, and cooking instructions are cached locally on SQLite via Android Room.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-glass-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Screen-Awake Cooking Mode</h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Active cooking studio keeps the display alive via <code>FLAG_KEEP_SCREEN_ON</code> so you never have to tap your phone with spice-stained fingers.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-glass-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Malayalam Speech Engine</h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Native Android TextToSpeech engine reads instructions in natural Malayalam (<code>ml-IN</code>) with automatic fallback to system defaults.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Download & Testing Track Section */}
      <section id="download-options" className="glass-panel p-8 sm:p-12 rounded-3xl border border-glass-border space-y-6">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Release Channel</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Google Play Closed Testing & Installation
          </h2>
          <p className="text-sm text-foreground/75 leading-relaxed">
            Miseva AI is currently in early-access closed testing per Google Play personal developer account requirements (12 opted-in testers for 14 continuous days).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-foreground">Option A: Join Google Play Closed Beta</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Recommended</span>
            </div>
            <p className="text-xs text-foreground/70">
              Receive automatic updates directly through Google Play Console closed testing tracks.
            </p>
            <div className="pt-2">
              <button
                onClick={() => alert("To join closed testing, please register your Google Play account email with the academic research team.")}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                Request Tester Opt-In Access
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-foreground">Option B: Android Studio Local Build</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-foreground/60">Developer</span>
            </div>
            <p className="text-xs text-foreground/70">
              Open the <code>android/</code> directory in Android Studio (Koala/Jellyfish+) and run <code>./gradlew assembleDebug</code>.
            </p>
            <div className="pt-2">
              <Link
                href="/about#academic-supervision"
                className="block text-center w-full py-2.5 rounded-xl glass-button text-xs font-bold text-foreground hover:border-emerald-400/50 transition-colors"
              >
                View Build & Research Docs
              </Link>
            </div>
          </div>
        </div>

        {/* Academic Supervision Credential */}
        <div className="mt-8 pt-6 border-t border-glass-border/40 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary flex-shrink-0">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xs text-foreground/75">
            <span className="font-bold text-foreground">Academic Supervision: Jane Rose</span>, Assistant Professor, CSE. Miseva AI is an advanced research and engineering prototype combining AI agents with mobile culinary accessibility.
          </div>
        </div>
      </section>
    </div>
  );
}
