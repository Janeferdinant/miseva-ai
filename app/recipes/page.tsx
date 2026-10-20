"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Clock,
  Flame,
  ChefHat,
  Filter,
  X,
  Sparkles,
} from "lucide-react";
import { RECIPES } from "@/lib/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { DietaryType, MealType } from "@/lib/types/recipe";

function RecipesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialQuick = searchParams.get("quick") === "true";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [selectedDiet, setSelectedDiet] = useState<string>("All");
  const [selectedMeal, setSelectedMeal] = useState<string>("All");
  const [maxTime, setMaxTime] = useState<number>(initialQuick ? 25 : 120);
  const [sortBy, setSortBy] = useState<"relevance" | "time" | "calories">("relevance");

  useEffect(() => {
    if (initialQuery) setSearch(initialQuery);
  }, [initialQuery]);

  const cuisinesList = [
    "All",
    "Kerala",
    "Tamil Nadu",
    "Punjabi",
    "Hyderabadi",
    "Bengali",
    "Gujarati",
    "Maharashtrian",
    "Italian",
    "Japanese",
    "Mexican",
    "Thai",
    "French",
    "Middle Eastern",
  ];

  const dietaryList = [
    "All",
    "vegetarian",
    "vegan",
    "non-vegetarian",
    "high-protein",
    "gluten-free",
    "budget",
  ];

  const mealTypes = ["All", "breakfast", "lunch", "dinner"];

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((r) => {
      // Search text
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = r.title.toLowerCase().includes(q) || r.titleMalayalam.includes(q);
        const matchDesc = r.description.toLowerCase().includes(q) || r.descriptionMalayalam.includes(q);
        const matchCuisine = r.cuisine.toLowerCase().includes(q) || r.stateOrCountry.toLowerCase().includes(q);
        const matchIng = r.ingredients.some(
          (i) => i.name.toLowerCase().includes(q) || i.nameMalayalam.includes(q)
        );
        if (!matchTitle && !matchDesc && !matchCuisine && !matchIng) return false;
      }

      // Cuisine
      if (selectedCuisine !== "All") {
        if (r.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()) return false;
      }

      // Dietary
      if (selectedDiet !== "All") {
        if (!r.dietary.includes(selectedDiet as DietaryType)) return false;
      }

      // Meal Type
      if (selectedMeal !== "All") {
        if (r.mealType !== (selectedMeal as MealType)) return false;
      }

      // Time
      const totalTime = r.prepTime + r.cookTime;
      if (totalTime > maxTime) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "time") {
        return a.prepTime + a.cookTime - (b.prepTime + b.cookTime);
      }
      if (sortBy === "calories") {
        return a.nutrition.calories - b.nutrition.calories;
      }
      return 0;
    });
  }, [search, selectedCuisine, selectedDiet, selectedMeal, maxTime, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCuisine("All");
    setSelectedDiet("All");
    setSelectedMeal("All");
    setMaxTime(120);
    setSortBy("relevance");
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-glass-border shadow-glass">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
          <ChefHat className="w-4 h-4" />
          <span>Curated Heritage Recipes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-1">
          Recipe Discovery & Smart Filtering
        </h1>
        <p className="text-sm text-foreground/75 mt-1.5 max-w-2xl leading-relaxed">
          Filter authentic tested recipes by preparation time, dietary requirements, regional heritage, and budget.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-2xl">
          <Search className="w-4 h-4 text-brand-primary absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ingredient, dish title or state (e.g. coconut, chicken, Kerala, biryani)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl glass-input text-sm font-medium text-foreground"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-foreground/50 hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Multi-faceted Filter Bar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4 border border-glass-border">
        <div className="flex items-center justify-between pb-3 border-b border-glass-border/40">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
            <span>Filter & Refine</span>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs font-bold text-brand-primary hover:underline"
          >
            Reset Filters
          </button>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Cuisine Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
              Cuisine / Region
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-foreground font-medium"
            >
              {cuisinesList.map((c) => (
                <option key={c} value={c} className="bg-background text-foreground">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
              Dietary Preference
            </label>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-foreground font-medium capitalize"
            >
              {dietaryList.map((d) => (
                <option key={d} value={d} className="bg-background text-foreground">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Meal Type Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
              Meal Type
            </label>
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-foreground font-medium capitalize"
            >
              {mealTypes.map((m) => (
                <option key={m} value={m} className="bg-background text-foreground">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl glass-input text-foreground font-medium"
            >
              <option value="relevance" className="bg-background text-foreground">
                Relevance
              </option>
              <option value="time" className="bg-background text-foreground">
                Fastest Cook Time
              </option>
              <option value="calories" className="bg-background text-foreground">
                Lowest Calories
              </option>
            </select>
          </div>
        </div>

        {/* Max Time Range Slider */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-foreground/75 font-medium">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span>Max Total Time:</span>
            <span className="font-bold text-foreground">{maxTime} minutes</span>
          </div>
          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            className="w-48 sm:w-64 accent-brand-primary"
          />
        </div>
      </div>

      {/* Result Counter & Active Count */}
      <div className="flex items-center justify-between text-xs text-foreground/60 font-semibold px-1">
        <span>Showing {filteredRecipes.length} verified culinary recipes</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" /> 100% Authentic Attribution
        </span>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl glass-panel text-center space-y-4 border border-glass-border">
          <ChefHat className="w-12 h-12 text-brand-primary mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-foreground">No recipes matched your criteria</h3>
          <p className="text-xs text-foreground/60 max-w-md mx-auto">
            Try adjusting your search query, expanding the cook time limit, or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl glass-button text-xs font-bold shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function RecipesDiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-foreground/60 text-sm">
          Loading culinary recipes...
        </div>
      }
    >
      <RecipesContent />
    </Suspense>
  );
}
