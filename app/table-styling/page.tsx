"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";
import { generateTablePlan } from "@/lib/table-styling/generator";
import { TableLayoutCanvas } from "@/components/table-styling/TableLayoutCanvas";
import {
  TableGeneratorConfig,
  GeneratedTablePlan,
  TableShape,
  ServingStyle,
  TableBudgetLevel,
} from "@/lib/types/table-styling";
import {
  UtensilsCrossed,
  Sparkles,
  Users,
  IndianRupee,
  Layers,
  Palette,
  Lightbulb,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function TableStylingStudioPage() {
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"catalog" | "generator">("catalog");

  // Generator form state
  const [guestCount, setGuestCount] = useState<number>(6);
  const [tableShape, setTableShape] = useState<TableShape>("rectangular");
  const [colorPaletteChoice, setColorPaletteChoice] = useState<"emerald" | "saffron" | "ocean" | "ruby" | "ivory" | "terracotta">("emerald");
  const [servingStyle, setServingStyle] = useState<ServingStyle>("banana-leaf");
  const [budgetLevel, setBudgetLevel] = useState<TableBudgetLevel>("moderate");
  const [occasion, setOccasion] = useState<string>("Family Celebration & Banquet");
  const [theme, setTheme] = useState<string>("Royal Kerala Kasavu");

  // Generated Plan state
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedTablePlan | null>(null);

  const collections = [
    { id: "all", label: "All Concepts", labelMl: "എല്ലാ ആശയങ്ങളും", count: TABLE_STYLING_CONCEPTS.length },
    { id: "kerala-sadya-banquet", label: "Kerala Sadya & Banquet", labelMl: "കേരള സദ്യ വിരുന്ന്", count: 10 },
    { id: "festive-indian", label: "Festive Indian (Diwali/Eid/Onam)", labelMl: "ഉത്സവ വിരുന്നുകൾ", count: 10 },
    { id: "celebrations-banquets", label: "Celebrations & Weddings", labelMl: "വിവാഹവും പാർട്ടികളും", count: 10 },
    { id: "minimalist-rustic-outdoor", label: "Minimalist & Rustic Outdoor", labelMl: "മോഡേൺ & ഗാർഡൻ", count: 10 },
  ];

  const filteredConcepts = TABLE_STYLING_CONCEPTS.filter((c) => {
    return selectedCollection === "all" || c.collection === selectedCollection;
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const config: TableGeneratorConfig = {
      occasion,
      guestCount,
      tableShape,
      setting: "indoor",
      budgetLevel,
      colorPaletteChoice,
      servingStyle,
      theme,
    };
    const plan = generateTablePlan(config);
    setGeneratedPlan(plan);
    setActiveTab("generator");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-glass-border shadow-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-wide">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>TOP-LEVEL MODULE: TABLE DECORATION & TABLESCAPING STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            The Table Decoration & Styling Studio
          </h1>
          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
            Elevate every meal into a visual celebration. Explore 40 complete tablescaping concepts spanning authentic Kerala banana-leaf sadyas, festive Onam/Diwali banquets, and modern minimalist tables. Configure your table shape and guest count to generate custom 2D layouts and shopping lists.
          </p>
          <div className="text-xs sm:text-sm font-semibold text-brand-primary font-serif">
            തനത് കേരള സദ്യയും ലോകോത്തര മേശാലങ്കാര ആശയങ്ങളും
          </div>
        </div>
      </div>

      {/* Mode Tabs: Catalog vs AI Table Generator */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "catalog"
              ? "bg-brand-primary text-background shadow-md shadow-brand-primary/20"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Curated Concepts Studio ({TABLE_STYLING_CONCEPTS.length})</span>
        </button>

        <button
          onClick={() => {
            if (!generatedPlan) {
              const defaultPlan = generateTablePlan({
                occasion,
                guestCount,
                tableShape,
                setting: "indoor",
                budgetLevel,
                colorPaletteChoice,
                servingStyle,
                theme,
              });
              setGeneratedPlan(defaultPlan);
            }
            setActiveTab("generator");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "generator"
              ? "bg-brand-primary text-background shadow-md shadow-brand-primary/20"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Table-Design Generator</span>
        </button>
      </div>

      {/* TAB 1: CURATED CONCEPTS */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          {/* Collection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {collections.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCollection === col.id
                    ? "bg-brand-primary text-background shadow-md shadow-brand-primary/20 scale-105"
                    : "glass-card text-foreground/80 hover:text-foreground hover:bg-white/10"
                }`}
              >
                <span>{col.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCollection === col.id ? "bg-background/20 text-background" : "bg-white/10 text-foreground/60"
                }`}>
                  {col.count}
                </span>
              </button>
            ))}
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConcepts.map((concept) => (
              <Link
                key={concept.id}
                href={`/table-styling/${concept.slug}`}
                className="group glass-card rounded-3xl overflow-hidden border border-glass-border hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
              >
                <div>
                  {/* Media */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                    <Image
                      src={concept.moodBoardImageUrl}
                      alt={concept.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Shape & Serving Style Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 capitalize">
                        {concept.tableShape} Table
                      </span>
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-brand-primary/80 backdrop-blur-md text-background capitalize">
                        {concept.servingStyle}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-serif text-brand-secondary">
                        {concept.titleMalayalam}
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-brand-secondary transition-colors">
                        {concept.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-foreground/75 line-clamp-2 leading-relaxed">
                      {concept.tagline}
                    </p>

                    {/* Palette swatches */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-foreground/50 font-semibold mr-1">Palette:</span>
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: concept.colorPalette.primary }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: concept.colorPalette.secondary }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: concept.colorPalette.accent }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: concept.colorPalette.neutral }} />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-foreground/70">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-foreground/50" />
                    {concept.recommendedGuestCount.min}-{concept.recommendedGuestCount.max} guests
                  </span>
                  <span className="flex items-center gap-0.5 font-bold text-foreground">
                    <IndianRupee className="w-3 h-3 text-brand-primary" />
                    ₹{concept.estimatedBudgetINR.min} - ₹{concept.estimatedBudgetINR.max}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI TABLE-DESIGN GENERATOR */}
      {activeTab === "generator" && (
        <div className="space-y-8">
          {/* Interactive Configuration Form */}
          <form
            onSubmit={handleGenerate}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border shadow-glass space-y-6"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                Configure Your Bespoke Dining Tablescape
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Guest Count */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1.5">
                  Guest Count ({guestCount} Persons)
                </label>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="2"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-brand-primary"
                />
                <div className="flex justify-between text-[10px] text-foreground/50 font-mono mt-1">
                  <span>2 (Intimate)</span>
                  <span>8 (Family)</span>
                  <span>16 (Banquet)</span>
                </div>
              </div>

              {/* Table Shape */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1.5">Table Shape</label>
                <select
                  value={tableShape}
                  onChange={(e) => setTableShape(e.target.value as TableShape)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs sm:text-sm text-foreground focus:outline-none"
                >
                  <option value="rectangular">Rectangular (Dining Table)</option>
                  <option value="round">Round (Circular Seating)</option>
                  <option value="oval">Oval (Elongated Curved)</option>
                  <option value="square">Square (Compact Casual)</option>
                </select>
              </div>

              {/* Serving Style */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1.5">Serving Tradition</label>
                <select
                  value={servingStyle}
                  onChange={(e) => setServingStyle(e.target.value as ServingStyle)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs sm:text-sm text-foreground focus:outline-none"
                >
                  <option value="banana-leaf">Banana-Leaf Sadya (പരമ്പരാഗത വാഴയില)</option>
                  <option value="traditional-thali">Royal Thali with Katoris (താളി പാത്രം)</option>
                  <option value="plated-western">Plated Fine Dining (കോഴ്സ് ഡിന്നർ)</option>
                  <option value="family-sharing">Family Sharing Bowls (ഫാമിലി ഡിന്നിങ്)</option>
                </select>
              </div>

              {/* Color Palette */}
              <div>
                <label className="block text-xs font-bold text-foreground/75 mb-1.5">Color Palette</label>
                <select
                  value={colorPaletteChoice}
                  onChange={(e) => setColorPaletteChoice(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs sm:text-sm text-foreground focus:outline-none"
                >
                  <option value="emerald">Kerala Emerald & Kasavu Gold</option>
                  <option value="saffron">Royal Saffron & Marigold</option>
                  <option value="ocean">Malabar Ocean Mist</option>
                  <option value="ruby">Mughal Ruby & Rose Gold</option>
                  <option value="ivory">Modern Ivory & Pearl</option>
                  <option value="terracotta">Rustic Terracotta & Olive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-foreground/75">Budget:</span>
                {(["budget-friendly", "moderate", "luxury"] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetLevel(b)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      budgetLevel === b
                        ? "bg-brand-primary text-background"
                        : "glass-card text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {b.replace("-", " ")}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-brand-primary text-background font-extrabold text-sm hover:scale-105 transition-all shadow-md shadow-brand-primary/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Plan & 2D Canvas</span>
              </button>
            </div>
          </form>

          {/* Generated Plan Display */}
          {generatedPlan && (
            <div className="space-y-6">
              {/* Interactive Top-down 2D Canvas */}
              <TableLayoutCanvas
                placements={generatedPlan.placements}
                tableShape={generatedPlan.tableShape}
                colorPalette={generatedPlan.colorPalette}
                title={generatedPlan.conceptTitle}
              />

              {/* Recommendations Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Linens & Centerpiece */}
                <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Palette className="w-4 h-4 text-brand-primary" />
                    Linens & Centerpiece
                  </h3>
                  <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
                    {generatedPlan.linensRecommendation}
                  </p>
                  <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
                    {generatedPlan.centerpieceRecommendation}
                  </p>
                </div>

                {/* Napkin Folding Guide */}
                <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-accent" />
                    Napkin Technique: {generatedPlan.napkinFolding.name}
                  </h3>
                  <ol className="space-y-2 text-xs text-foreground/80">
                    {generatedPlan.napkinFolding.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-2 bg-background/40 p-2.5 rounded-xl border border-white/5">
                        <span className="font-bold text-brand-primary">{i + 1}.</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Lighting & Ambience */}
                <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Lighting & Food Presentation
                  </h3>
                  <p className="text-xs text-foreground/80 leading-relaxed bg-background/40 p-3 rounded-xl border border-white/5">
                    {generatedPlan.lightingRecommendation}
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground/75">
                    {generatedPlan.foodPresentationGuide.map((g, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Setup & Estimated Shopping List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Steps */}
                <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
                  <h3 className="text-base font-bold text-foreground">Step-by-Step Execution Guide</h3>
                  <div className="space-y-3">
                    {generatedPlan.stepByStepGuide.map((step) => (
                      <div key={step.stepNumber} className="p-3 rounded-xl bg-background/40 border border-white/5 space-y-1">
                        <div className="text-xs font-bold text-foreground flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-brand-primary text-background flex items-center justify-center text-[10px]">
                            {step.stepNumber}
                          </span>
                          <span>{step.title}</span>
                        </div>
                        <p className="text-xs text-foreground/75 pl-7">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shopping List & Budget */}
                <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground">Estimated Styling Budget</h3>
                    <span className="text-base font-extrabold text-brand-primary flex items-center gap-0.5">
                      <IndianRupee className="w-4 h-4" />
                      ₹{generatedPlan.estimatedBudgetINR}
                    </span>
                  </div>

                  <div className="divide-y divide-white/5 text-xs">
                    {generatedPlan.shoppingList.map((item, i) => (
                      <div key={i} className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-foreground">{item.item}</span>
                          <span className="text-foreground/50 ml-2">({item.quantity})</span>
                        </div>
                        <span className="font-mono font-bold text-brand-primary">₹{item.estimatedCostINR}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
