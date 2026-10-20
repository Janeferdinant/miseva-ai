"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Compass,
  Search,
  Filter,
  ChefHat,
  Clock,
  Flame,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import { getRegionBySlug, getAllRegions } from "@/lib/data/cuisines";
import { RECIPES } from "@/lib/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { DietaryType, MealType } from "@/lib/types/recipe";

export default function CountryCuisineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const [search, setSearch] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string>("All");
  const [selectedMeal, setSelectedMeal] = useState<string>("All");

  const dietaryList = [
    "All",
    "vegetarian",
    "vegan",
    "non-vegetarian",
    "high-protein",
    "gluten-free",
  ];

  const mealTypes = ["All", "breakfast", "lunch", "dinner"];

  const matchingRecipes = useMemo(() => {
    const regName = region.name.toLowerCase();
    const regId = region.id.toLowerCase();

    return RECIPES.filter((r) => {
      const matchRegion =
        r.stateOrCountry.toLowerCase().includes(regName) ||
        regName.includes(r.stateOrCountry.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(regId) ||
        r.cuisine.toLowerCase().includes(regName);

      if (!matchRegion) return false;

      // Filter by search
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = r.title.toLowerCase().includes(q) || r.titleMalayalam.includes(q);
        const matchDesc = r.description.toLowerCase().includes(q) || r.descriptionMalayalam.includes(q);
        const matchIng = r.ingredients.some(
          (i) => i.name.toLowerCase().includes(q) || i.nameMalayalam.includes(q)
        );
        if (!matchTitle && !matchDesc && !matchIng) return false;
      }

      // Filter by dietary
      if (selectedDiet !== "All") {
        if (!r.dietary.includes(selectedDiet as DietaryType)) return false;
      }

      // Filter by meal type
      if (selectedMeal !== "All") {
        if (r.mealType !== (selectedMeal as MealType)) return false;
      }

      return true;
    });
  }, [region, search, selectedDiet, selectedMeal]);

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-card text-xs font-bold text-foreground/80 hover:text-foreground hover:scale-[1.02] transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-brand-primary" />
          <span>Back to All Cuisines</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-foreground/60">
          <Link href="/explore" className="hover:underline">Explore</Link>
          <span>/</span>
          <span className="text-brand-primary font-bold">{region.name}</span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-brand-primary/30 shadow-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-card flex items-center justify-center text-4xl sm:text-5xl border border-glass-border shadow-sm flex-shrink-0">
              {region.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary px-2 py-0.5 rounded-md bg-brand-primary/10">
                  {region.category} Heritage
                </span>
                <span className="text-xs text-foreground/60">• Canonical: {region.id}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-1">
                {region.name} Cuisine
              </h1>
              <p className="text-base text-brand-primary font-semibold lang-ml mt-0.5">
                {region.nameMalayalam}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/ai-chef?prompt=Tell me authentic cooking secrets and history of ${encodeURIComponent(region.name)} cuisine`}
              className="px-4 py-2 rounded-xl glass-button text-xs font-bold flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Ask AI Chef About {region.name}</span>
            </Link>
          </div>
        </div>

        <p className="text-sm sm:text-base text-foreground/85 mt-4 max-w-4xl leading-relaxed font-medium">
          {region.description}
        </p>

        {/* Signature Specialties */}
        <div className="mt-6 pt-5 border-t border-glass-border/50">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2.5">
            Hallmark Ingredients & Signature Dishes
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {region.specialties.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 rounded-xl text-xs font-semibold glass-card text-foreground border border-glass-border/70"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl glass-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-primary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search dishes in ${region.name} cuisine...`}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs glass-input text-foreground"
          />
        </div>

        {/* Dietary Filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          <span className="text-xs font-bold text-foreground/60 whitespace-nowrap">Diet:</span>
          {dietaryList.map((diet) => (
            <button
              key={diet}
              onClick={() => setSelectedDiet(diet)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDiet === diet
                  ? "bg-brand-primary text-white shadow-sm"
                  : "glass-card text-foreground/75 hover:text-foreground"
              }`}
            >
              {diet}
            </button>
          ))}
        </div>

        {/* Meal Type Filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          <span className="text-xs font-bold text-foreground/60 whitespace-nowrap">Meal:</span>
          {mealTypes.map((meal) => (
            <button
              key={meal}
              onClick={() => setSelectedMeal(meal)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                selectedMeal === meal
                  ? "bg-brand-primary text-white shadow-sm"
                  : "glass-card text-foreground/75 hover:text-foreground"
              }`}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-primary" />
            <span>
              {region.name} Recipes ({matchingRecipes.length})
            </span>
          </h2>
          <span className="text-xs text-foreground/60">
            Click any recipe card for step-by-step guidance & Malayalam voice
          </span>
        </div>

        {matchingRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl glass-card text-center space-y-4 border border-dashed border-glass-border">
            <div className="w-12 h-12 rounded-2xl glass-panel mx-auto flex items-center justify-center text-2xl">
              🍲
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No matching recipes found in {region.name}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-md mx-auto">
              Try adjusting your dietary or meal filters, or explore recipes from our other regional traditions.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedDiet("All");
                  setSelectedMeal("All");
                }}
                className="px-4 py-2 rounded-xl glass-button text-xs font-bold"
              >
                Reset Filters
              </button>
              <Link
                href="/recipes"
                className="px-4 py-2 rounded-xl glass-card text-xs font-bold hover:text-brand-primary"
              >
                Browse Entire Catalog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
