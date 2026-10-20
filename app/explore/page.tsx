"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Compass, Sparkles, MapPin, Search, Globe, ChevronRight } from "lucide-react";
import { INDIAN_REGIONS, GLOBAL_CUISINES, CulinaryRegion } from "@/lib/data/cuisines";
import { RECIPES } from "@/lib/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";

export default function ExploreCuisinesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [activeRegion, setActiveRegion] = useState<CulinaryRegion | null>(INDIAN_REGIONS[0]);

  const allRegions = useMemo(() => {
    return [...INDIAN_REGIONS, ...GLOBAL_CUISINES];
  }, []);

  const categories = [
    "All",
    "South India",
    "North India",
    "West India",
    "East India",
    "Northeast India",
    "Global",
  ];

  const filteredRegions = useMemo(() => {
    return allRegions.filter((reg) => {
      const matchCat = selectedCategory === "All" || reg.category === selectedCategory;
      const matchSearch =
        searchFilter === "" ||
        reg.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        reg.nameMalayalam.includes(searchFilter) ||
        reg.specialties.some((s) => s.toLowerCase().includes(searchFilter.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [allRegions, selectedCategory, searchFilter]);

  const regionRecipes = useMemo(() => {
    if (!activeRegion) return [];
    return RECIPES.filter(
      (r) =>
        r.stateOrCountry.toLowerCase().includes(activeRegion.name.toLowerCase()) ||
        activeRegion.name.toLowerCase().includes(r.stateOrCountry.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(activeRegion.id.toLowerCase())
    );
  }, [activeRegion]);

  return (
    <div className="space-y-10 py-4">
      {/* Page Header */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-glass-border shadow-glass">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
          <Compass className="w-4 h-4" />
          <span>Interactive Cultural Geography</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
          Explore Indian Regional States & Global Cuisines
        </h1>
        <p className="text-sm sm:text-base text-foreground/80 mt-2 max-w-3xl leading-relaxed">
          Journey through the authentic spices of Kerala's spice coast, the clay tandoors of Punjab, the mustard traditions of Bengal, and renowned culinary arts of Italy, Japan, and Mexico.
        </p>
        <p className="text-sm text-brand-primary font-semibold lang-ml mt-1">
          ഇന്ത്യയിലെ എല്ലാ സംസ്ഥാനങ്ങളുടെയും തനത് രുചികളും ലോകോത്തര പാചക സംസ്കാരങ്ങളും ഇവിടെ പരിചയപ്പെടാം.
        </p>

        {/* Search & Category Pills */}
        <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-primary text-white shadow-md scale-105"
                    : "glass-card text-foreground/75 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-brand-primary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter states or dishes..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs glass-input text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Grid of Regions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredRegions.map((reg) => {
          const isSelected = activeRegion?.id === reg.id;
          return (
            <button
              key={reg.id}
              onClick={() => setActiveRegion(reg)}
              className={`p-3.5 rounded-2xl text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "glass-panel border-2 border-brand-primary shadow-lg scale-[1.03]"
                  : "glass-card hover:border-brand-primary/60 hover:scale-[1.01]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{reg.icon}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-foreground/70">
                    {reg.category}
                  </span>
                </div>
                <div className="text-sm font-bold text-foreground mt-2 line-clamp-1">
                  {reg.name}
                </div>
                <div className="text-[11px] text-foreground/60 lang-ml line-clamp-1">
                  {reg.nameMalayalam}
                </div>
              </div>

              <div className="mt-2 text-[10px] text-brand-primary font-semibold flex items-center gap-0.5">
                <span>View dishes</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Region Deep Dive Panel */}
      {activeRegion && (
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-brand-primary/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-glass-border/60">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 rounded-2xl glass-card">{activeRegion.icon}</span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  {activeRegion.category} Culinary Heritage
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {activeRegion.name} Cuisine
                </h2>
                <div className="text-sm text-foreground/70 lang-ml font-medium">
                  {activeRegion.nameMalayalam}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {activeRegion.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold glass-card text-foreground"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium">
            {activeRegion.description}
          </p>

          {/* Region Dishes Section */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>Recipes from {activeRegion.name}</span>
            </h3>

            {regionRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionRecipes.map((r) => (
                  <RecipeCard key={r.id} recipe={r} />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl glass-card text-center text-foreground/70 text-sm space-y-3">
                <p>Authentic recipes for {activeRegion.name} are currently being curated by our culinary research team.</p>
                <Link
                  href="/recipes"
                  className="inline-block px-4 py-2 rounded-xl glass-button text-xs font-bold"
                >
                  Browse All Available Recipes
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
