"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";
import { LuxuryTheme, CuratedMealCollection, TableShape } from "@/lib/types/table-styling";
import {
  TablewareCustomizer,
  TablewareCustomizerState,
  generateCustomPlacements
} from "@/components/table-styling/TablewareCustomizer";
import { TableLayoutCanvas } from "@/components/table-styling/TableLayoutCanvas";
import { MealCollectionBuilder } from "@/components/table-styling/MealCollectionBuilder";
import { DishSelectorModal } from "@/components/table-styling/DishSelectorModal";
import { generateThemePrompt, ThemePromptResult } from "@/lib/table-styling/image-prompt-engine";
import {
  Sparkles,
  UtensilsCrossed,
  Layers,
  Compass,
  Users,
  Wine,
  Share2,
  Bookmark,
  Check,
  Calendar,
  ChevronRight,
  Maximize2,
  Copy,
  Printer
} from "lucide-react";

export default function TableStylingStudioPage() {
  // Main Studio Mode: "luxury-atelier" | "curated-banquets" | "classic-catalog"
  const [activeMode, setActiveMode] = useState<"luxury-atelier" | "curated-banquets" | "classic-catalog">("luxury-atelier");

  // Selected Theme & Meal
  const [selectedTheme, setSelectedTheme] = useState<LuxuryTheme>(LUXURY_TABLE_THEMES[0]);
  const [selectedMeal, setSelectedMeal] = useState<CuratedMealCollection | null>(CURATED_MEAL_COLLECTIONS[0]);
  const [selectedDishes, setSelectedDishes] = useState<string[]>(
    CURATED_MEAL_COLLECTIONS[0].dishes.map((d) => d.name)
  );

  // Customizer State
  const [customizerState, setCustomizerState] = useState<TablewareCustomizerState>({
    guestCount: 6,
    tableShape: "rectangular",
    cutleryFinish: LUXURY_TABLE_THEMES[0].tableware.cutleryFinish,
    plateStyle: LUXURY_TABLE_THEMES[0].tableware.plateStyle,
    glasswareStyle: LUXURY_TABLE_THEMES[0].tableware.glasswareStyle,
    linensStyle: LUXURY_TABLE_THEMES[0].tableware.linensStyle,
    servingStyle: "plated-western"
  });

  // Occasion
  const [occasion, setOccasion] = useState<string>("Royal Banquet & Milestone Celebration");

  // Dish Selector Modal State
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  // Preview Mode: "moodboard" | "canvas2d"
  const [previewTab, setPreviewTab] = useState<"moodboard" | "canvas2d">("moodboard");

  // Prompt Engine Result
  const [renderedPrompt, setRenderedPrompt] = useState<ThemePromptResult>(() =>
    generateThemePrompt(LUXURY_TABLE_THEMES[0], {
      selectedDishes: CURATED_MEAL_COLLECTIONS[0].dishes.map((d) => d.name),
      guestCount: 6,
      tableShape: "rectangular",
      occasion: "Royal Banquet & Milestone Celebration"
    })
  );

  // Save / Copy Toast State
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Update prompt whenever theme, dishes, customizer, or occasion changes
  useEffect(() => {
    const res = generateThemePrompt(selectedTheme, {
      selectedDishes,
      guestCount: customizerState.guestCount,
      tableShape: customizerState.tableShape,
      occasion,
      cutleryOverride: customizerState.cutleryFinish,
      plateOverride: customizerState.plateStyle,
      glasswareOverride: customizerState.glasswareStyle,
      linensOverride: customizerState.linensStyle
    });
    setRenderedPrompt(res);
  }, [selectedTheme, selectedDishes, customizerState, occasion]);

  // Handle Theme Selection
  const handleSelectTheme = (theme: LuxuryTheme) => {
    setSelectedTheme(theme);
    setCustomizerState((prev) => ({
      ...prev,
      cutleryFinish: theme.tableware.cutleryFinish,
      plateStyle: theme.tableware.plateStyle,
      glasswareStyle: theme.tableware.glasswareStyle,
      linensStyle: theme.tableware.linensStyle
    }));
  };

  // Handle Curated Meal Selection
  const handleSelectMeal = (meal: CuratedMealCollection) => {
    setSelectedMeal(meal);
    setSelectedDishes(meal.dishes.map((d) => d.name));
    setOccasion(meal.occasion);

    // Auto-match ideal theme
    const matchedTheme = LUXURY_TABLE_THEMES.find((t) => t.id === meal.idealThemeId);
    if (matchedTheme) {
      handleSelectTheme(matchedTheme);
    }
    setActiveMode("luxury-atelier");
  };

  // Toggle Dish
  const handleToggleDish = (title: string) => {
    setSelectedDishes((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // Save concept to local storage
  const handleSaveConcept = () => {
    try {
      const saved = {
        themeId: selectedTheme.id,
        themeTitle: selectedTheme.title,
        dishes: selectedDishes,
        customizerState,
        occasion,
        savedAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem("miseva_saved_tablescapes") || "[]");
      existing.unshift(saved);
      localStorage.setItem("miseva_saved_tablescapes", JSON.stringify(existing.slice(0, 10)));
      setSaveToast("Saved to your personal Miseva Dining Atelier!");
      setTimeout(() => setSaveToast(null), 3000);
    } catch {
      setSaveToast("Concept saved!");
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Copy shareable link
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setSaveToast("Shareable link copied to clipboard!");
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Dynamic Placements
  const dynamicPlacements = generateCustomPlacements(customizerState);

  // Occasions list
  const occasions = [
    "Royal Banquet & Milestone Celebration",
    "Traditional Onam / Vishu Sadya",
    "Intimate Candlelight Dinner for Two",
    "Five-Star Haute Cuisine Tasting",
    "Festive Diwali / Eid Family Gala",
    "Sunlit Garden Champagne Brunch",
    "Contemporary Global Fusion Soirée"
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fade-in">
      {/* SECTION 1: LUXURY HERO */}
      <div className="glass-panel p-6 sm:p-12 rounded-3xl border border-glass-border shadow-2xl relative overflow-hidden bg-gradient-to-br from-background/90 via-background/60 to-black/80">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-xs font-extrabold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top-Level Module: Table Decoration & Dining Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            The Table Styling Studio
          </h1>

          <p className="text-base sm:text-xl text-foreground/85 leading-relaxed font-light">
            Redefining dining into an immersive culinary art. Uniting royal heritage, Michelin-starred tableware, luxury cutlery finishes, and coordinated gastronomic storytelling.
          </p>

          <div className="text-xs sm:text-sm font-semibold text-brand-secondary font-serif">
            തനത് രാജകീയ സദ്യയും ലോകോത്തര മേശാലങ്കാര പാരമ്പര്യവും
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-foreground/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span><strong>10</strong> Bespoke Luxury Themes</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-foreground/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span><strong>6</strong> Curated Multi-Course Banquets</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-foreground/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span><strong>40</strong> Classic Tablescapes</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-foreground/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span><strong>230</strong> Culinary Dishes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-card bg-brand-primary text-background px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-extrabold animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* SECTION 2: TOP-LEVEL NAVIGATION MODES */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveMode("luxury-atelier")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
            activeMode === "luxury-atelier"
              ? "bg-brand-primary text-background shadow-lg shadow-brand-primary/25 scale-105"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>10 Luxury Themes Atelier</span>
        </button>

        <button
          onClick={() => setActiveMode("curated-banquets")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
            activeMode === "curated-banquets"
              ? "bg-brand-primary text-background shadow-lg shadow-brand-primary/25 scale-105"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Curated Banquets (6 Multi-Course Meals)</span>
        </button>

        <button
          onClick={() => setActiveMode("classic-catalog")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
            activeMode === "classic-catalog"
              ? "bg-brand-primary text-background shadow-lg shadow-brand-primary/25 scale-105"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Classic Concepts Archive ({TABLE_STYLING_CONCEPTS.length})</span>
        </button>
      </div>

      {/* MODE 1: 10 LUXURY THEMES ATELIER */}
      {activeMode === "luxury-atelier" && (
        <div className="space-y-10">
          {/* SECTION 3: THEME GALLERY */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  Select Visual Theme
                </h2>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Each theme features dedicated tableware, cutlery metallurgy, lighting, and cultural storytelling.
                </p>
              </div>
              <span className="text-xs text-brand-primary font-serif font-bold hidden sm:inline">
                പത്തു വിശിഷ്ട മേശാലങ്കാര ശൈലികൾ
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {LUXURY_TABLE_THEMES.map((theme) => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme)}
                    className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "border-brand-primary ring-2 ring-brand-primary/50 shadow-lg scale-105 bg-brand-primary/10"
                        : "glass-card border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                      <Image
                        src={theme.moodBoardImageUrl}
                        alt={theme.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <div className="text-[10px] font-serif text-brand-secondary line-clamp-1">
                          {theme.titleMalayalam}
                        </div>
                        <div className="font-extrabold text-xs sm:text-sm line-clamp-1">
                          {theme.title}
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 text-[11px] text-foreground/70 italic line-clamp-2 leading-tight">
                      "{theme.catchphrase}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: LIVE PRESENTATION PREVIEW & ATELIER WORKSPACE */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border shadow-glass space-y-6">
            {/* Header with Title, Catchphrase, and Quick Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif text-brand-secondary font-bold">
                    {selectedTheme.titleMalayalam}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary font-extrabold uppercase">
                    Active Presentation
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {selectedTheme.title}
                </h3>
                <p className="text-sm text-foreground/80 italic font-serif">
                  "{selectedTheme.catchphrase}"
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed pt-1">
                  {selectedTheme.description}
                </p>
              </div>

              {/* Action Buttons: Save, Share, Dish Modal */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                <button
                  type="button"
                  onClick={() => setIsDishModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-brand-primary text-background font-bold text-xs hover:scale-105 transition-all shadow-md shadow-brand-primary/20 flex items-center gap-1.5"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Customize Dishes ({selectedDishes.length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveConcept}
                  className="p-2.5 rounded-xl glass-card text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors"
                  title="Save Concept"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleShareLink}
                  className="p-2.5 rounded-xl glass-card text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors"
                  title="Share Presentation"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <Link
                  href={`/table-styling/${selectedTheme.slug}`}
                  className="px-4 py-2.5 rounded-xl glass-card text-foreground font-bold text-xs hover:border-brand-primary transition-all flex items-center gap-1.5"
                >
                  <span>Full Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Configurator Controls: Occasion, Guests, Table Shape */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-background/40 p-4 rounded-2xl border border-white/5">
              {/* Occasion */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Dining Occasion</span>
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-foreground focus:outline-none"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>Guest Count ({customizerState.guestCount} Diners)</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="2"
                  value={customizerState.guestCount}
                  onChange={(e) =>
                    setCustomizerState((prev) => ({ ...prev, guestCount: Number(e.target.value) }))
                  }
                  className="w-full accent-brand-primary"
                />
              </div>

              {/* Table Shape */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1 flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Table Geometry</span>
                </label>
                <select
                  value={customizerState.tableShape}
                  onChange={(e) =>
                    setCustomizerState((prev) => ({ ...prev, tableShape: e.target.value as TableShape }))
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-foreground focus:outline-none capitalize"
                >
                  <option value="rectangular">Rectangular Dining Table</option>
                  <option value="round">Round Banquet Table</option>
                  <option value="oval">Oval Imperial Table</option>
                  <option value="square">Square Intimate Table</option>
                </select>
              </div>
            </div>

            {/* Presentation View Switcher (Moodboard vs 2D Canvas) */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setPreviewTab("moodboard")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  previewTab === "moodboard"
                    ? "bg-brand-primary text-background shadow"
                    : "glass-card text-foreground/75 hover:text-foreground"
                }`}
              >
                Visual Moodboard & Prompt Blueprint
              </button>
              <button
                onClick={() => setPreviewTab("canvas2d")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  previewTab === "canvas2d"
                    ? "bg-brand-primary text-background shadow"
                    : "glass-card text-foreground/75 hover:text-foreground"
                }`}
              >
                Interactive 2D Place Setting Canvas
              </button>
            </div>

            {/* PREVIEW: Moodboard View */}
            {previewTab === "moodboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
                    <Image
                      src={selectedTheme.moodBoardImageUrl}
                      alt={selectedTheme.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-serif text-brand-secondary">
                        {selectedTheme.titleMalayalam}
                      </div>
                      <h4 className="text-xl font-extrabold">{selectedTheme.title}</h4>
                      <p className="text-xs text-white/80 line-clamp-1 italic">
                        "{selectedTheme.catchphrase}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prompt Blueprint & Tableware Summary */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                      <span>AI Photography Prompt Blueprint</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(renderedPrompt.prompt);
                          setSaveToast("AI Prompt copied to clipboard!");
                          setTimeout(() => setSaveToast(null), 3000);
                        }}
                        className="text-[10px] text-brand-primary hover:underline flex items-center gap-1 font-bold"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Prompt</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-[11px] text-foreground/80 leading-relaxed font-mono max-h-44 overflow-y-auto">
                      {renderedPrompt.prompt}
                    </div>

                    <div className="space-y-1.5 text-xs text-foreground/80">
                      <div>
                        <strong>Cutlery Finish: </strong>
                        <span className="capitalize text-brand-primary font-bold">
                          {customizerState.cutleryFinish}
                        </span>
                      </div>
                      <div>
                        <strong>Plate & Vessel: </strong>
                        <span className="capitalize">{customizerState.plateStyle.replace(/-/g, " ")}</span>
                      </div>
                      <div>
                        <strong>Glassware: </strong>
                        <span className="capitalize">{customizerState.glasswareStyle.replace(/-/g, " ")}</span>
                      </div>
                      <div>
                        <strong>Selected Dishes ({selectedDishes.length}): </strong>
                        <span className="text-foreground/70">{selectedDishes.slice(0, 3).join(", ")}...</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setPreviewTab("canvas2d")}
                    className="w-full py-2.5 rounded-xl glass-card text-xs font-bold text-foreground hover:bg-brand-primary hover:text-background transition-all flex items-center justify-center gap-2"
                  >
                    <span>View 2D Top-Down Place Settings</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* PREVIEW: 2D Canvas View */}
            {previewTab === "canvas2d" && (
              <TableLayoutCanvas
                placements={dynamicPlacements}
                tableShape={customizerState.tableShape}
                colorPalette={selectedTheme.colorPalette}
                title={`${selectedTheme.title} — 2D Top-Down Place Setting Arrangement`}
              />
            )}

            {/* Tableware Customizer Drawer */}
            <TablewareCustomizer
              state={customizerState}
              onChange={(updated) => setCustomizerState((prev) => ({ ...prev, ...updated }))}
            />
          </div>
        </div>
      )}

      {/* MODE 2: CURATED BANQUETS */}
      {activeMode === "curated-banquets" && (
        <MealCollectionBuilder
          selectedCollectionId={selectedMeal?.id}
          onSelectCollection={handleSelectMeal}
        />
      )}

      {/* MODE 3: CLASSIC CONCEPTS ARCHIVE */}
      {activeMode === "classic-catalog" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Classic Tablescaping Concepts Archive (40)
              </h2>
              <p className="text-xs text-foreground/70 mt-0.5">
                Full repository of 40 culturally distinct dining arrangements with complete shopping lists and step-by-step guides.
              </p>
            </div>
            <span className="text-xs font-serif font-bold text-brand-primary">
              40 ആശയങ്ങളുടെ ശേഖരം
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TABLE_STYLING_CONCEPTS.map((concept) => (
              <Link
                key={concept.id}
                href={`/table-styling/${concept.slug}`}
                className="group glass-card rounded-3xl overflow-hidden border border-glass-border hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                    <Image
                      src={concept.moodBoardImageUrl}
                      alt={concept.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[10px] font-serif text-brand-secondary">
                        {concept.titleMalayalam}
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm line-clamp-1 group-hover:text-brand-secondary transition-colors">
                        {concept.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-3 text-[11px] text-foreground/70 line-clamp-2 leading-relaxed">
                    {concept.tagline}
                  </div>
                </div>
                <div className="p-3 pt-0 text-[10px] text-foreground/50 flex items-center justify-between border-t border-white/5">
                  <span className="capitalize">{concept.tableShape} Table</span>
                  <span className="font-bold text-brand-primary">
                    ₹{concept.estimatedBudgetINR.min} - ₹{concept.estimatedBudgetINR.max}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* DISH SELECTOR MODAL */}
      <DishSelectorModal
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        selectedDishTitles={selectedDishes}
        onToggleDish={handleToggleDish}
      />
    </div>
  );
}
