"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";
import { TableLayoutCanvas } from "@/components/table-styling/TableLayoutCanvas";
import {
  ArrowLeft,
  Users,
  IndianRupee,
  Layers,
  Palette,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function TableConceptDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const concept = TABLE_STYLING_CONCEPTS.find((c) => c.slug === slug || c.id === slug);

  if (!concept) {
    return notFound();
  }

  const [activeLang, setActiveLang] = useState<"en" | "ml">("en");

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Back button */}
      <Link
        href="/table-styling"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground/70 hover:text-brand-primary transition-colors glass-card px-3.5 py-1.5 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Table Styling Studio</span>
      </Link>

      {/* Hero Mood Board */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-glass-border shadow-glass">
        <div className="relative aspect-[16/9] w-full bg-black/40">
          <Image
            src={concept.moodBoardImageUrl}
            alt={concept.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-brand-primary text-background backdrop-blur-md">
              {concept.collection.replace(/-/g, " ")}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 capitalize">
              {concept.tableShape} Table
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-brand-secondary/80 text-background backdrop-blur-md capitalize">
              {concept.servingStyle}
            </span>
          </div>

          {/* Title & Cultural Context */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="text-sm font-serif text-brand-secondary">
              {concept.titleMalayalam}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {concept.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {activeLang === "ml" ? concept.descriptionMalayalam : concept.description}
            </p>
          </div>
        </div>

        {/* Hero Control Bar */}
        <div className="p-4 sm:p-6 bg-background/50 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/80 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-primary" />
              Recommended: {concept.recommendedGuestCount.min}-{concept.recommendedGuestCount.max} Guests
            </span>
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <IndianRupee className="w-4 h-4 text-brand-primary" />
              Budget: ₹{concept.estimatedBudgetINR.min} - ₹{concept.estimatedBudgetINR.max}
            </span>
          </div>

          <button
            onClick={() => setActiveLang((l) => (l === "en" ? "ml" : "en"))}
            className="px-3 py-1.5 rounded-xl text-xs font-bold glass-card hover:border-brand-primary"
          >
            {activeLang === "en" ? "മലയാളത്തിൽ വായിക്കുക" : "Read in English"}
          </button>
        </div>
      </div>

      {/* Interactive 2D Top-Down Layout Canvas */}
      <TableLayoutCanvas
        placements={concept.layoutPlacements}
        tableShape={concept.tableShape}
        colorPalette={concept.colorPalette}
        title={`${concept.title} — 2D Top-Down Arrangement`}
      />

      {/* Detailed Styling Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tablecloth & Linens */}
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-primary" />
            Linens & Runners
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
            {concept.tableclothRunner}
          </p>
          <div className="text-xs text-foreground/75 space-y-1">
            <span className="font-bold text-foreground">Serving Style: </span>
            <span className="capitalize text-brand-primary">{concept.servingStyle}</span>
          </div>
        </div>

        {/* Centerpiece & Florals */}
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-secondary" />
            Centerpiece & Floral Decor
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
            {concept.centerpieceAndFlorals}
          </p>
          <p className="text-xs text-foreground/75 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
            <span className="font-bold text-foreground">Lighting: </span>
            {concept.lightingAndCandles}
          </p>
        </div>

        {/* Napkin Folding Guide */}
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-accent" />
            Napkin Guide: {concept.napkinFoldingGuide.name}
          </h3>
          <ol className="space-y-2 text-xs text-foreground/80">
            {(activeLang === "ml"
              ? concept.napkinFoldingGuide.stepsMalayalam
              : concept.napkinFoldingGuide.steps
            ).map((st, i) => (
              <li key={i} className="flex items-start gap-2 bg-background/40 p-2.5 rounded-xl border border-white/5">
                <span className="font-bold text-brand-primary">{i + 1}.</span>
                <span>{st}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Food Presentation Ideas & Cultural Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Food Presentation & Etiquette
          </h3>
          <ul className="space-y-2 text-xs text-foreground/80">
            {(activeLang === "ml"
              ? concept.foodPresentationTipsMalayalam
              : concept.foodPresentationTips
            ).map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-background/40 p-3 rounded-xl border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Cultural Context & Heritage
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-4 rounded-xl border border-white/5">
            {concept.culturalContext}
          </p>
          <div className="text-xs text-foreground/70 p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
            <span className="font-bold text-foreground">Plate & Cutlery: </span>
            {concept.plateAndCutleryArrangement}
          </div>
        </div>
      </div>

      {/* Step-by-Step Setup Guide & Estimated Shopping List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step-by-Step Guide */}
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
          <h3 className="text-base font-bold text-foreground">Step-by-Step Decoration Guide</h3>
          <div className="space-y-3">
            {concept.stepByStepGuide.map((step) => (
              <div key={step.stepNumber} className="p-3.5 rounded-xl bg-background/40 border border-white/5 space-y-1">
                <div className="text-xs font-bold text-foreground flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-primary text-background flex items-center justify-center text-[10px]">
                    {step.stepNumber}
                  </span>
                  <span>{step.title}</span>
                </div>
                <p className="text-xs text-foreground/75 pl-7">
                  {activeLang === "ml" ? step.descriptionMalayalam : step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Shopping List */}
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-primary" />
              Decor & Linens Shopping List
            </h3>
            <span className="text-xs font-mono text-brand-primary font-bold">
              Est: ₹{concept.estimatedBudgetINR.min} - ₹{concept.estimatedBudgetINR.max}
            </span>
          </div>

          <div className="divide-y divide-white/5 text-xs">
            {concept.shoppingList.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground">{item.item}</span>
                  <span className="text-foreground/50 ml-2">({item.quantity})</span>
                  <div className="text-[10px] text-foreground/40 capitalize">{item.category}</div>
                </div>
                <span className="font-mono font-bold text-brand-primary">₹{item.estimatedCostINR}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
