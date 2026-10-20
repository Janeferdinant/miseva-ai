"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Smartphone,
  Globe,
  Clock,
  IndianRupee,
  UtensilsCrossed,
  ChefHat,
  Play
} from "lucide-react";
import {
  CAMPAIGN_CONFIGS,
  sharedAttributionService
} from "@/lib/marketing/services/attribution-funnel-service";

export default function CampaignLandingPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const searchParams = useSearchParams();
  const config = CAMPAIGN_CONFIGS[slug] || CAMPAIGN_CONFIGS["ingredient-finder"];

  // Interactive Demo State
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "Tomato",
    "Eggs"
  ]);
  const [budgetSlider, setBudgetSlider] = useState(1200);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioStep, setAudioStep] = useState(1);

  // Capture UTM parameters and log landing visit
  useEffect(() => {
    const utmSource = searchParams.get("utm_source") || "direct";
    const utmCampaign = searchParams.get("utm_campaign") || slug;
    const utmMedium = searchParams.get("utm_medium") || "web";

    sharedAttributionService.recordFunnelEvent({
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      campaignSlug: slug,
      stage: "LANDING_PAGE_VISIT",
      utmSource,
      utmCampaign,
      utmMedium
    });
  }, [slug, searchParams]);

  const handleInstallClick = () => {
    sharedAttributionService.recordFunnelEvent({
      sessionId: `sess_${Date.now()}`,
      campaignSlug: slug,
      stage: "APP_INSTALL",
      utmSource: searchParams.get("utm_source") || "web"
    });
  };

  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  const playMalayalamDemo = () => {
    setIsPlayingAudio(true);
    if ("speechSynthesis" in window) {
      const phrases = [
        "നമസ്കാരം! ഇന്ന് നമുക്ക് മീൻ പൊള്ളിച്ചത് തയ്യാറാക്കാം.",
        "ആദ്യമായി മീനിൽ മഞ്ഞൾപ്പൊടിയും ഉപ്പും ചേർത്ത് പുരട്ടുക.",
        "വാഴയില തീയിൽ ചെറുതായി വാട്ടി എടുക്കുക."
      ];
      const phrase = phrases[audioStep - 1] || phrases[0];
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = "ml-IN";
      utterance.rate = 0.9;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setAudioStep(prev => (prev < 3 ? prev + 1 : 1));
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Banner Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-md">
            M
          </div>
          <span className="font-extrabold tracking-tight text-lg">Miseva AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={config.webAppUrl}
            className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition-all hidden sm:inline-flex"
          >
            Open Web App
          </Link>
          <a
            href={config.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInstallClick}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install Android App</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto pt-12 sm:pt-16 px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{config.heroBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-orange-400">
          {config.headline}
        </h1>

        {config.taglineMalayalam && (
          <p className="text-xl sm:text-2xl font-semibold text-amber-300/90 font-serif">
            {config.taglineMalayalam}
          </p>
        )}

        <p className="text-sm sm:text-base text-foreground/75 max-w-2xl mx-auto leading-relaxed">
          {config.subheadline}
        </p>

        {/* Primary Call to Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link
            href={config.webAppUrl}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-xl hover:shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>{config.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={config.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInstallClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-card text-foreground font-semibold text-sm border border-white/20 hover:border-emerald-400/40 flex items-center justify-center gap-2 transition-all"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Download Free on Google Play</span>
          </a>
        </div>
      </header>

      {/* Interactive Feature Demo Sandbox */}
      <section className="max-w-4xl mx-auto mt-14 px-4 sm:px-6">
        <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold tracking-wider uppercase text-emerald-400">
                Live Interactive Demonstration
              </h2>
            </div>
            <span className="text-xs text-foreground/50">Instant In-Browser Test</span>
          </div>

          <div className="pt-6">
            {/* Demo 1: Ingredient Picker */}
            {config.demoType === "INGREDIENT_PICKER" && (
              <div className="space-y-5">
                <p className="text-xs text-foreground/75 font-medium">
                  Tap ingredients currently in your kitchen:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Tomato",
                    "Eggs",
                    "Paneer",
                    "Garlic",
                    "Onion",
                    "Curry Leaves",
                    "Potato",
                    "Coconut Milk"
                  ].map(ing => (
                    <button
                      key={ing}
                      onClick={() => toggleIngredient(ing)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedIngredients.includes(ing)
                          ? "bg-emerald-600 text-white border border-emerald-400 shadow-md"
                          : "bg-white/5 border border-white/10 text-foreground/75 hover:border-white/30"
                      }`}
                    >
                      {selectedIngredients.includes(ing) ? "✓ " : "+ "}
                      {ing}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">
                        {selectedIngredients.includes("Paneer")
                          ? "Garlic Butter Paneer Roast (Ready in 15 mins)"
                          : "Quick Nadan Tomato Egg Roast (Ready in 12 mins)"}
                      </h4>
                      <p className="text-xs text-foreground/60">
                        Matches {selectedIngredients.length} ingredients with 100% pantry availability.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/recipes?filter=ingredients&items=${selectedIngredients.join(",")}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0 hover:bg-emerald-500 transition-all"
                  >
                    Cook This
                  </Link>
                </div>
              </div>
            )}

            {/* Demo 2: Malayalam Voice Assistant Preview */}
            {config.demoType === "MALAYALAM_VOICE_PREVIEW" && (
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/20">
                  <Volume2 className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-amber-300">
                    Step {audioStep}: മീൻ പൊള്ളിച്ചത് (Fish Pollichathu)
                  </h4>
                  <p className="text-xs text-foreground/70 max-w-md mx-auto">
                    {audioStep === 1
                      ? '"നമസ്കാരം! ഇന്ന് നമുക്ക് മീൻ പൊള്ളിച്ചത് തയ്യാറാക്കാം."'
                      : audioStep === 2
                      ? '"ആദ്യമായി മീനിൽ മഞ്ഞൾപ്പൊടിയും ഉപ്പും ചേർത്ത് പുരട്ടുക."'
                      : '"വാഴയില തീയിൽ ചെറുതായി വാട്ടി എടുക്കുക."'}
                  </p>
                </div>

                <button
                  onClick={playMalayalamDemo}
                  disabled={isPlayingAudio}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isPlayingAudio ? "സംസാരിക്കുന്നു (Speaking)..." : "Listen in Malayalam"}</span>
                </button>
              </div>
            )}

            {/* Demo 3: Budget Calculator */}
            {config.demoType === "BUDGET_CALCULATOR" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Weekly Budget: ₹{budgetSlider}</span>
                  <span className="text-emerald-400">Avg Cost/Serving: ₹{Math.round(budgetSlider / 21)}</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="3000"
                  step="100"
                  value={budgetSlider}
                  onChange={e => setBudgetSlider(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs text-foreground/50 block">Meals Covered</span>
                    <span className="text-base font-extrabold text-emerald-400">21 Meals</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs text-foreground/50 block">Grocery Savings</span>
                    <span className="text-base font-extrabold text-amber-400">₹450/week</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs text-foreground/50 block">Food Waste</span>
                    <span className="text-base font-extrabold text-teal-400">Zero Grams</span>
                  </div>
                </div>
              </div>
            )}

            {/* Default or Other Demos */}
            {config.demoType !== "INGREDIENT_PICKER" &&
              config.demoType !== "MALAYALAM_VOICE_PREVIEW" &&
              config.demoType !== "BUDGET_CALCULATOR" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {config.sampleDishes.map((dish, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-emerald-400/30 transition-all"
                    >
                      <div className="h-28 rounded-xl bg-emerald-950/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        {dish.title}
                      </div>
                      <div className="flex items-center justify-between text-xs text-foreground/75">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {dish.time}
                        </span>
                        <span className="font-bold text-emerald-400">{dish.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Feature Bullet Points */}
      <section className="max-w-4xl mx-auto mt-14 px-4 sm:px-6">
        <h3 className="text-lg font-bold mb-6 text-center">Why Home Cooks Love Miseva AI</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.features.map((feat, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-2xl glass-card border border-white/10"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium leading-relaxed">{feat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <footer className="max-w-3xl mx-auto mt-16 px-4 text-center space-y-4">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold">Ready to start cooking?</h3>
          <p className="text-xs sm:text-sm text-foreground/70 max-w-md mx-auto">
            Free forever for basic cooking. Zero credit card required to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={config.webAppUrl}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all w-full sm:w-auto"
            >
              Start Free on Web
            </Link>
            <a
              href={config.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInstallClick}
              className="px-6 py-3 rounded-2xl glass-card text-foreground font-semibold text-xs border border-white/20 hover:border-emerald-400/40 transition-all w-full sm:w-auto"
            >
              Download Android APK / Play Store
            </a>
          </div>
        </div>

        {/* Ethical Privacy Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-foreground/50 pt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Miseva AI respects your privacy. We never track browsing history across other apps.</span>
        </div>
      </footer>
    </div>
  );
}
