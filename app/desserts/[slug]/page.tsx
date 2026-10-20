"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { MalayalamRecipeView } from "@/components/MalayalamRecipeView";
import {
  ArrowLeft,
  Flame,
  Clock,
  Users,
  IndianRupee,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldAlert,
  Thermometer,
  Layers,
  ChefHat,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

export default function DessertDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const dessert = DESSERT_RECIPES.find((d) => d.slug === slug || d.id === slug);

  if (!dessert) {
    return notFound();
  }

  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [activeLang, setActiveLang] = useState<"en" | "ml">("en");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const baseServings = dessert.servings || 4;
  const currentServings = Math.round(baseServings * servingMultiplier);

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = activeLang === "ml" ? "ml-IN" : "en-IN";
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Back button */}
      <Link
        href="/desserts"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground/70 hover:text-brand-primary transition-colors glass-card px-3.5 py-1.5 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Desserts Studio</span>
      </Link>

      {/* Hero Showcase Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-glass-border shadow-glass">
        <div className="relative aspect-[16/9] w-full bg-black/40">
          <Image
            src={dessert.imageUrl}
            alt={dessert.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-brand-primary text-background backdrop-blur-md">
              {dessert.cuisine}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
              {dessert.difficulty}
            </span>
            {dessert.bakingTemperature && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                {dessert.bakingTemperature.celsius}°C ({dessert.bakingTemperature.fahrenheit}°F)
              </span>
            )}
          </div>

          {/* Title & Narration */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="text-sm font-serif text-brand-secondary">
              {dessert.titleMalayalam}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {dessert.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {activeLang === "ml" ? dessert.descriptionMalayalam : dessert.description}
            </p>
          </div>
        </div>

        {/* Hero Control Bar */}
        <div className="p-4 sm:p-6 bg-background/50 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/80 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-primary" />
              Prep: {dessert.prepTime}m | Cook: {dessert.cookTime}m
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-primary" />
              {currentServings} Servings
            </span>
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <IndianRupee className="w-4 h-4 text-brand-primary" />
              ₹{dessert.costPerServing * servingMultiplier} Total Est.
            </span>
          </div>

          {/* Bilingual Audio Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLang((l) => (l === "en" ? "ml" : "en"))}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold glass-card hover:border-brand-primary"
            >
              {activeLang === "en" ? "മലയാളം" : "English"}
            </button>
            <button
              onClick={() =>
                handleSpeak(
                  activeLang === "ml"
                    ? `${dessert.titleMalayalam}. ${dessert.descriptionMalayalam}`
                    : `${dessert.title}. ${dessert.description}`
                )
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isPlayingAudio
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-brand-primary text-background hover:scale-105"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? "Stop Narration" : "Listen Narration"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dedicated Malayalam Translation Section ("മലയാളത്തിൽ വായിക്കുക") */}
      <section>
        <MalayalamRecipeView recipe={dessert} />
      </section>

      {/* Serving Scaler */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4">
        <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-primary" />
          Adjust Serving Size:
        </span>
        <div className="flex items-center gap-2">
          {[0.5, 1, 2, 3].map((mult) => (
            <button
              key={mult}
              onClick={() => setServingMultiplier(mult)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                servingMultiplier === mult
                  ? "bg-brand-primary text-background shadow-sm"
                  : "glass-card text-foreground/70 hover:text-foreground"
              }`}
            >
              {Math.round(baseServings * mult)} ppl
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients & Doneness Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ingredients Column */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-brand-primary" />
              Required Ingredients ({dessert.ingredients.length})
            </h2>
            <Link
              href={`/shopping?query=${encodeURIComponent(dessert.title)}`}
              className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
            >
              Compare Prices →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {dessert.ingredients.map((ing, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between gap-2 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-foreground">{ing.name}</span>
                  <span className="text-foreground/50 ml-2 font-serif">({ing.nameMalayalam})</span>
                  {ing.notes && <p className="text-[11px] text-foreground/60">{ing.notes}</p>}
                </div>
                <div className="font-mono font-bold text-brand-primary whitespace-nowrap">
                  {Math.round((ing.amount * servingMultiplier) * 10) / 10} {ing.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Doneness Indicators & Food Safety */}
        <div className="space-y-6">
          {/* Visual Doneness */}
          <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              Visual Doneness Indicators
            </h3>
            <ul className="space-y-2 text-xs text-foreground/80">
              {dessert.donenessIndicators.map((ind: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 bg-background/40 p-2.5 rounded-xl border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Storage & Allergens */}
          <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Allergens & Preservation
            </h3>
            {dessert.foodSafety.allergens.length > 0 && (
              <div className="text-xs">
                <span className="font-bold text-foreground/80">Allergens: </span>
                <span className="text-rose-400 capitalize">{dessert.foodSafety.allergens.join(", ")}</span>
              </div>
            )}
            <p className="text-xs text-foreground/75 leading-relaxed bg-background/40 p-2.5 rounded-xl border border-white/5">
              {activeLang === "ml" ? dessert.storageGuidanceMalayalam : dessert.storageGuidance}
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border shadow-glass space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-primary" />
          Step-by-Step Culinary Preparation
        </h2>

        <div className="space-y-4">
          {dessert.instructions.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border ${
                  isActive
                    ? "bg-brand-primary/10 border-brand-primary shadow-sm"
                    : "glass-card hover:bg-white/5 border-glass-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? "bg-brand-primary text-background" : "bg-white/10 text-foreground"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>

                  {step.timerMinutes && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.timerMinutes} min timer
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed pl-10">
                  {activeLang === "ml" ? step.textMalayalam : step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
