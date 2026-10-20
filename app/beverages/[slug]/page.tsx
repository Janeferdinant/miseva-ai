"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";
import {
  ArrowLeft,
  Clock,
  Users,
  IndianRupee,
  Volume2,
  VolumeX,
  Sparkles,
  Snowflake,
  Sun,
  Layers,
  ChefHat,
  Sliders,
} from "lucide-react";

export default function BeverageDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const beverage = BEVERAGE_RECIPES.find((b) => b.slug === slug || b.id === slug);

  if (!beverage) {
    return notFound();
  }

  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [activeLang, setActiveLang] = useState<"en" | "ml">("en");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sweetnessLevel, setSweetnessLevel] = useState<"none" | "mild" | "normal">("normal");

  const baseServings = beverage.servings || 2;
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
        href="/beverages"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground/70 hover:text-cyan-400 transition-colors glass-card px-3.5 py-1.5 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Beverages Studio</span>
      </Link>

      {/* Hero Showcase Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-glass-border shadow-glass">
        <div className="relative aspect-[16/9] w-full bg-black/40">
          <Image
            src={beverage.imageUrl}
            alt={beverage.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 text-white backdrop-blur-md">
              {beverage.cuisine}
            </span>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-md text-white flex items-center gap-1.5 ${
                beverage.isHot ? "bg-amber-600/90" : "bg-blue-600/90"
              }`}
            >
              {beverage.isHot ? <Sun className="w-3.5 h-3.5" /> : <Snowflake className="w-3.5 h-3.5" />}
              {beverage.isHot ? "Hot Beverage" : "Chilled Refresher"}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 capitalize">
              {beverage.servingGlass}
            </span>
          </div>

          {/* Title & Narration */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="text-sm font-serif text-cyan-300">
              {beverage.titleMalayalam}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {beverage.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {activeLang === "ml" ? beverage.descriptionMalayalam : beverage.description}
            </p>
          </div>
        </div>

        {/* Hero Control Bar */}
        <div className="p-4 sm:p-6 bg-background/50 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/80 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Prep: {beverage.prepTime} mins
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              {currentServings} Glasses
            </span>
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <IndianRupee className="w-4 h-4 text-cyan-400" />
              ₹{(beverage.costPerServingINR || beverage.costPerServing) * servingMultiplier} Est. Batch
            </span>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLang((l) => (l === "en" ? "ml" : "en"))}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold glass-card hover:border-cyan-400"
            >
              {activeLang === "en" ? "മലയാളം" : "English"}
            </button>
            <button
              onClick={() =>
                handleSpeak(
                  activeLang === "ml"
                    ? `${beverage.titleMalayalam}. ${beverage.descriptionMalayalam}`
                    : `${beverage.title}. ${beverage.description}`
                )
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isPlayingAudio
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-cyan-500 text-white hover:scale-105"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? "Stop Narration" : "Listen Narration"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Serving & Sweetness Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4">
          <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Glass Count:
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 4, 6].map((mult) => (
              <button
                key={mult}
                onClick={() => setServingMultiplier(mult / baseServings)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  Math.round(baseServings * servingMultiplier) === mult
                    ? "bg-cyan-500 text-white"
                    : "glass-card text-foreground/70 hover:text-foreground"
                }`}
              >
                {mult} {mult === 1 ? "glass" : "glasses"}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4">
          <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Sweetness Level:
          </span>
          <div className="flex items-center gap-1.5">
            {(["none", "mild", "normal"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSweetnessLevel(lvl)}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                  sweetnessLevel === lvl
                    ? "bg-cyan-500 text-white"
                    : "glass-card text-foreground/70 hover:text-foreground"
                }`}
              >
                {lvl === "none" ? "0% Sugar" : lvl === "mild" ? "Low Sugar" : "Standard"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredients & Preparation Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-cyan-400" />
              Ingredients & Proportions ({beverage.ingredients.length})
            </h2>
            <Link
              href={`/shopping?query=${encodeURIComponent(beverage.title)}`}
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              Compare Prices →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {beverage.ingredients.map((ing, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between gap-2 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-foreground">{ing.name}</span>
                  <span className="text-foreground/50 ml-2 font-serif">({ing.nameMalayalam})</span>
                  {ing.notes && <p className="text-[11px] text-foreground/60">{ing.notes}</p>}
                </div>
                <div className="font-mono font-bold text-cyan-400 whitespace-nowrap">
                  {Math.round((ing.amount * servingMultiplier) * 10) / 10} {ing.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Chilling & Blending Advice */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Refrigeration & Shelf Life
            </h3>
            <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
              {activeLang === "ml" ? beverage.refrigerationAdviceMalayalam : beverage.refrigerationAdvice}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-2">
            <h3 className="text-sm font-bold text-foreground">Serving Suggestion</h3>
            <p className="text-xs text-foreground/75 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
              Serve in a chilled <span className="font-bold text-cyan-400">{beverage.servingGlass}</span> glass. Garnish fresh immediately before handing to guests.
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border shadow-glass space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          Blending & Infusion Process
        </h2>

        <div className="space-y-4">
          {beverage.instructions.map((step, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl glass-card border-glass-border space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs font-bold">
                  {step.stepNumber}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed pl-10">
                {activeLang === "ml" ? step.textMalayalam : step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
