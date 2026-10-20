"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Clock,
  Users,
  ShoppingCart,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Filter,
  Flame,
  ChefHat,
  ArrowRight,
} from "lucide-react";
import { RECIPES } from "@/lib/data/recipes";
import {
  IngredientSelector,
  calculatePantryMatches,
  PantryMatchFilterOptions,
} from "@/components/ingredients/IngredientSelector";
import { Recipe } from "@/lib/types/recipe";

export default function IngredientFinderPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "Coconut",
    "Onion",
    "Mustard Seeds",
  ]);
  const [dietaryFilter, setDietaryFilter] = useState<string>("All");
  const [maxTimeFilter, setMaxTimeFilter] = useState<number>(0);
  const [cuisineFilter, setCuisineFilter] = useState<string>("All");

  const handleToggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleAddCustom = (name: string) => {
    if (!selectedIngredients.includes(name)) {
      setSelectedIngredients((prev) => [...prev, name]);
    }
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
  };

  const filterOptions: PantryMatchFilterOptions = useMemo(
    () => ({
      dietary: dietaryFilter,
      maxTime: maxTimeFilter,
      cuisine: cuisineFilter,
    }),
    [dietaryFilter, maxTimeFilter, cuisineFilter]
  );

  const matchedResults = useMemo(() => {
    return calculatePantryMatches(RECIPES, selectedIngredients, filterOptions);
  }, [selectedIngredients, filterOptions]);

  const uniqueCuisines = useMemo(() => {
    const set = new Set<string>();
    RECIPES.forEach((r) => {
      if (r.cuisine) set.add(r.cuisine);
    });
    return Array.from(set).sort();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-brand-primary/30 text-brand-primary text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Smart Pantry Matching Engine</span>
          <span className="opacity-40">•</span>
          <span className="font-serif lang-ml">കിച്ചൻ പാൻട്രി ഫൈൻഡർ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          Cook With What You Have
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-medium">
          Select or search the ingredients available in your kitchen. We calculate exact culinary
          matches, transparently show what is missing, and give you an instant shopping list.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Selector & Filters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Filter Bar */}
          <div className="glass-panel p-5 rounded-3xl border border-glass-border space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-foreground pb-2 border-b border-glass-border/40">
              <Filter className="w-4 h-4 text-brand-primary" />
              <span>Cooking Preferences & Constraints</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Dietary Filter */}
              <div>
                <label className="block text-[11px] font-bold text-foreground/70 mb-1">
                  Dietary Requirement
                </label>
                <select
                  value={dietaryFilter}
                  onChange={(e) => setDietaryFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold text-foreground focus:outline-none"
                >
                  <option value="All">All Diets</option>
                  <option value="vegetarian">Vegetarian Only</option>
                  <option value="vegan">Vegan Only</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </div>

              {/* Cook Time Constraint */}
              <div>
                <label className="block text-[11px] font-bold text-foreground/70 mb-1">
                  Max Total Time
                </label>
                <select
                  value={maxTimeFilter}
                  onChange={(e) => setMaxTimeFilter(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold text-foreground focus:outline-none"
                >
                  <option value="0">Any Duration</option>
                  <option value="20">Under 20 Mins</option>
                  <option value="30">Under 30 Mins</option>
                  <option value="45">Under 45 Mins</option>
                  <option value="60">Under 60 Mins</option>
                </select>
              </div>

              {/* Cuisine Filter */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-foreground/70 mb-1">
                  Regional Cuisine
                </label>
                <select
                  value={cuisineFilter}
                  onChange={(e) => setCuisineFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold text-foreground focus:outline-none"
                >
                  <option value="All">All Global Cuisines</option>
                  {uniqueCuisines.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ingredient Selector with Categorized Tabs */}
          <IngredientSelector
            selectedIngredients={selectedIngredients}
            onToggleIngredient={handleToggleIngredient}
            onAddCustomIngredient={handleAddCustom}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Right Column: Ranked Match Results (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-glass-border">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-brand-primary" />
              <div>
                <h2 className="text-sm font-extrabold text-foreground">
                  {matchedResults.length} Recipe Matches Found
                </h2>
                <p className="text-[11px] text-foreground/60 font-medium">
                  Ranked by ingredient coverage, missing item count, and cook duration
                </p>
              </div>
            </div>

            {selectedIngredients.length > 0 && (
              <span className="text-xs font-bold text-brand-primary px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                {selectedIngredients.length} active ingredients
              </span>
            )}
          </div>

          {/* Empty State */}
          {matchedResults.length === 0 && (
            <div className="p-12 text-center rounded-3xl glass-card border border-glass-border space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">No Exact Matches Found</h3>
              <p className="text-xs text-foreground/70 max-w-sm mx-auto leading-relaxed">
                {selectedIngredients.length === 0
                  ? "Select one or more ingredients from the panel on the left to see what you can cook right now."
                  : "Try adding more common staples like Coconut, Onion, Rice, or Garlic, or broaden your dietary filters."}
              </p>
            </div>
          )}

          {/* Matched Recipe Cards List */}
          <div className="space-y-4">
            {matchedResults.map((match) => {
              const recipe = match.recipe;
              const totalTime = recipe.prepTime + recipe.cookTime;
              const isFullMatch = match.isCompleteWithoutShopping;

              return (
                <div
                  key={recipe.id}
                  className="rounded-3xl glass-card border border-glass-border p-5 space-y-4 hover:border-brand-primary/40 transition-all shadow-sm"
                >
                  {/* Top Bar: Image, Title, Match Badge */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full sm:w-28 h-28 object-cover rounded-2xl border border-white/10 shrink-0"
                      loading="lazy"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                          {recipe.stateOrCountry} • {recipe.cuisine}
                        </span>

                        {/* Match Percentage Badge */}
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                            isFullMatch
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {isFullMatch ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5" />
                          )}
                          <span>
                            {isFullMatch ? "100% Ready to Cook" : `${match.matchPercentage}% Matched`}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {recipe.title}
                      </h3>
                      <p className="text-xs text-foreground/70 font-serif lang-ml">
                        {recipe.titleMalayalam}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-foreground/70 pt-1 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-primary" />
                          {totalTime} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-brand-accent" />
                          {recipe.servings} servings
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          {recipe.nutrition.calories} kcal
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredient Breakdown: You Have vs Missing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-glass-border/40 text-xs">
                    {/* You Have */}
                    <div className="space-y-1.5 p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>You Have ({match.matchedIngredients.length}):</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {match.matchedIngredients.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 font-bold text-[10px]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Items */}
                    <div className="space-y-1.5 p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                      <div className="flex items-center gap-1.5 text-rose-400 font-extrabold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>
                          {match.missingIngredients.length === 0
                            ? "No Missing Items"
                            : `Missing (${match.missingIngredients.length}):`}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {match.missingIngredients.length === 0 ? (
                          <span className="text-[10px] text-emerald-400 font-medium italic">
                            All required ingredients are in your pantry!
                          </span>
                        ) : (
                          match.missingIngredients.slice(0, 6).map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 rounded-lg bg-rose-500/10 text-rose-300 font-bold text-[10px]"
                            >
                              {item}
                            </span>
                          ))
                        )}
                        {match.missingIngredients.length > 6 && (
                          <span className="text-[10px] text-foreground/50 font-bold self-center">
                            +{match.missingIngredients.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    {match.missingIngredients.length > 0 ? (
                      <Link
                        href={`/shopping?query=${encodeURIComponent(
                          match.missingIngredients.slice(0, 4).join(", ")
                        )}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card hover:bg-white/10 text-xs font-bold text-brand-primary transition-all border border-brand-primary/30"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add Missing to Shopping List</span>
                      </Link>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Ready to cook now
                      </span>
                    )}

                    <Link
                      href={`/recipes/${recipe.slug || recipe.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-background font-extrabold text-xs shadow-md hover:bg-brand-primary/90 transition-all ml-auto"
                    >
                      <span>View Recipe & Steps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
