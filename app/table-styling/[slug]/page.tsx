"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";
import { TableLayoutCanvas } from "@/components/table-styling/TableLayoutCanvas";
import { generateCustomPlacements } from "@/components/table-styling/TablewareCustomizer";
import {
  ArrowLeft,
  Users,
  Sparkles,
  Palette,
  Utensils,
  Disc,
  Wine,
  Layers,
  Lightbulb,
  CheckCircle2,
  Printer,
  Share2,
  BookOpen
} from "lucide-react";

export default function TableConceptDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Resolve against Luxury Themes first, then Classic Concepts
  const luxuryTheme = LUXURY_TABLE_THEMES.find((t) => t.slug === slug || t.id === slug);
  const classicConcept = !luxuryTheme
    ? TABLE_STYLING_CONCEPTS.find((c) => c.slug === slug || c.id === slug)
    : null;

  if (!luxuryTheme && !classicConcept) {
    return notFound();
  }

  const [activeLang, setActiveLang] = useState<"en" | "ml">("en");
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Case 1: Luxury Theme Presentation
  if (luxuryTheme) {
    const placements = generateCustomPlacements({
      guestCount: 6,
      tableShape: "rectangular",
      cutleryFinish: luxuryTheme.tableware.cutleryFinish,
      plateStyle: luxuryTheme.tableware.plateStyle,
      glasswareStyle: luxuryTheme.tableware.glasswareStyle,
      linensStyle: luxuryTheme.tableware.linensStyle,
      servingStyle: "plated-western"
    });

    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-fade-in print:p-0 print:m-0">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4 print:hidden">
          <Link
            href="/table-styling"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground/70 hover:text-brand-primary transition-colors glass-card px-3.5 py-1.5 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Table Styling Studio</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLang((l) => (l === "en" ? "ml" : "en"))}
              className="px-3 py-1.5 rounded-xl text-xs font-bold glass-card hover:border-brand-primary transition-colors"
            >
              {activeLang === "en" ? "മലയാളത്തിൽ വായിക്കുക" : "Read in English"}
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl glass-card text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl glass-card text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors"
              title="Print Dining Menu Card"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copyFeedback && (
          <div className="glass-card bg-brand-primary text-background text-xs font-bold px-4 py-2 rounded-xl text-center shadow-lg">
            Shareable link copied to clipboard!
          </div>
        )}

        {/* Hero Banner */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-glass-border shadow-2xl">
          <div className="relative aspect-[16/9] w-full bg-black/40">
            <Image
              src={luxuryTheme.moodBoardImageUrl}
              alt={luxuryTheme.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-primary text-background backdrop-blur-md">
                Luxury Dining Atelier
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 capitalize">
                {luxuryTheme.tableware.cutleryFinish} Cutlery
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 capitalize">
                {luxuryTheme.tableware.plateStyle.replace(/-/g, " ")}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="text-sm font-serif text-brand-secondary">
                {luxuryTheme.titleMalayalam}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {luxuryTheme.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 italic font-serif max-w-2xl">
                "{activeLang === "ml" ? luxuryTheme.catchphraseMalayalam : luxuryTheme.catchphrase}"
              </p>
              <p className="text-xs sm:text-sm text-white/80 max-w-3xl leading-relaxed pt-1">
                {activeLang === "ml" ? luxuryTheme.descriptionMalayalam : luxuryTheme.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tableware Specifications Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-glass-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Utensils className="w-4 h-4 text-brand-primary" />
              <span>Cutlery Finish</span>
            </div>
            <div className="text-xs text-foreground/80 leading-relaxed">
              {luxuryTheme.tableware.cutleryDescription}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-glass-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Disc className="w-4 h-4 text-brand-secondary" />
              <span>Plates & Platters</span>
            </div>
            <div className="text-xs text-foreground/80 leading-relaxed">
              {luxuryTheme.tableware.plateDescription}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-glass-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Wine className="w-4 h-4 text-amber-400" />
              <span>Glassware</span>
            </div>
            <div className="text-xs text-foreground/80 leading-relaxed">
              {luxuryTheme.tableware.glasswareDescription}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-glass-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Linens & Napkins</span>
            </div>
            <div className="text-xs text-foreground/80 leading-relaxed">
              {luxuryTheme.tableware.linensDescription}
              <div className="text-[10px] text-brand-primary font-bold mt-1">
                Fold: {luxuryTheme.tableware.napkinFoldName}
              </div>
            </div>
          </div>
        </div>

        {/* 2D Top-Down Layout Canvas */}
        <TableLayoutCanvas
          placements={placements}
          tableShape="rectangular"
          colorPalette={luxuryTheme.colorPalette}
          title={`${luxuryTheme.title} — Course Placements & Table Geometry`}
        />

        {/* Ambiance, Cultural Context & Etiquette */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Lighting & Ambiance</span>
            </h3>
            <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-4 rounded-xl border border-white/5">
              {luxuryTheme.lightingAndAmbiance}
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-4 rounded-xl border border-white/5">
              <strong className="text-foreground">Centerpiece: </strong>
              {luxuryTheme.tableware.centerpieceDescription}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-primary" />
              <span>Cultural Heritage & Hospitality</span>
            </h3>
            <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-4 rounded-xl border border-white/5">
              {luxuryTheme.culturalStory}
            </p>
            <div className="p-3.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-xs text-foreground/80">
              <span className="font-bold text-foreground">Recommended Occasions: </span>
              {luxuryTheme.recommendedOccasion}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Classic Concept Presentation (40 Concepts)
  const concept = classicConcept!;
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fade-in print:p-0">
      <Link
        href="/table-styling"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground/70 hover:text-brand-primary transition-colors glass-card px-3.5 py-1.5 rounded-xl print:hidden"
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

        <div className="p-4 sm:p-6 bg-background/50 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-foreground/80 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-primary" />
              Recommended: {concept.recommendedGuestCount.min}-{concept.recommendedGuestCount.max} Guests
            </span>
            <span className="flex items-center gap-1.5 font-bold text-foreground">
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

      {/* 2D Canvas */}
      <TableLayoutCanvas
        placements={concept.layoutPlacements}
        tableShape={concept.tableShape}
        colorPalette={concept.colorPalette}
        title={`${concept.title} — 2D Top-Down Arrangement`}
      />

      {/* Detailed Styling Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-primary" />
            Linens & Runners
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
            {concept.tableclothRunner}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-secondary" />
            Centerpiece & Floral Decor
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
            {concept.centerpieceAndFlorals}
          </p>
        </div>

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
    </div>
  );
}
