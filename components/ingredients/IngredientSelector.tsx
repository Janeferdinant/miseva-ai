"use client";

import React, { useState } from "react";
import { Plus, X, Search, Sparkles, Check, Tag } from "lucide-react";
import { Recipe, DietaryType } from "@/lib/types/recipe";

export interface PantryItemMeta {
  name: string;
  nameMalayalam: string;
  category: string;
  icon?: string;
}

export interface PantryCategory {
  name: string;
  icon: string;
  items: PantryItemMeta[];
}

export const COMMON_PANTRY_CATEGORIES: PantryCategory[] = [
  {
    name: "Pantry Staples",
    icon: "🌾",
    items: [
      { name: "Rice", nameMalayalam: "അരി", category: "staple", icon: "🍚" },
      { name: "Wheat Flour (Atta)", nameMalayalam: "ആട്ട / ഗോതമ്പ് പൊടി", category: "staple", icon: "🌾" },
      { name: "Coconut Oil", nameMalayalam: "വെളിച്ചെണ്ണ", category: "oil", icon: "🥥" },
      { name: "Mustard Oil", nameMalayalam: "കടുക് എണ്ണ", category: "oil", icon: "🟡" },
      { name: "Pure Ghee", nameMalayalam: "നെയ്യ്", category: "dairy", icon: "🧈" },
      { name: "Sugar", nameMalayalam: "പഞ്ചസാര", category: "staple", icon: "🍬" },
      { name: "Salt", nameMalayalam: "ഉപ്പ്", category: "staple", icon: "🧂" },
      { name: "Tamarind", nameMalayalam: "വാളൻപുളി", category: "staple", icon: "🟤" },
    ],
  },
  {
    name: "Fresh Produce",
    icon: "🥬",
    items: [
      { name: "Coconut", nameMalayalam: "തേങ്ങ", category: "produce", icon: "🥥" },
      { name: "Onion", nameMalayalam: "സവാള / ഉള്ളി", category: "produce", icon: "🧅" },
      { name: "Tomato", nameMalayalam: "തക്കാളി", category: "produce", icon: "🍅" },
      { name: "Potato", nameMalayalam: "ഉരുളക്കിഴങ്ങ്", category: "produce", icon: "🥔" },
      { name: "Ginger", nameMalayalam: "ഇഞ്ചി", category: "produce", icon: "🫚" },
      { name: "Garlic", nameMalayalam: "വെളുത്തുള്ളി", category: "produce", icon: "🧄" },
      { name: "Green Chilli", nameMalayalam: "പച്ചമുളക്", category: "produce", icon: "🌶️" },
      { name: "Curry Leaves", nameMalayalam: "കറിവേപ്പില", category: "produce", icon: "🌿" },
      { name: "Coriander Leaves", nameMalayalam: "മല്ലിയില", category: "produce", icon: "🌱" },
      { name: "Lemon", nameMalayalam: "നാരങ്ങ", category: "produce", icon: "🍋" },
    ],
  },
  {
    name: "Spices & Aromatics",
    icon: "🌶️",
    items: [
      { name: "Mustard Seeds", nameMalayalam: "കടുക്", category: "spice", icon: "⚫" },
      { name: "Turmeric Powder", nameMalayalam: "മഞ്ഞൾപ്പൊടി", category: "spice", icon: "🟡" },
      { name: "Red Chilli Powder", nameMalayalam: "മുളകുപൊടി", category: "spice", icon: "🔴" },
      { name: "Coriander Powder", nameMalayalam: "മല്ലിപ്പൊടി", category: "spice", icon: "🟤" },
      { name: "Cumin Seeds", nameMalayalam: "ജീരകം", category: "spice", icon: "🟫" },
      { name: "Green Cardamom", nameMalayalam: "ഏലയ്ക്ക", category: "spice", icon: "🟢" },
      { name: "Cinnamon", nameMalayalam: "കറുവാപ്പട്ട", category: "spice", icon: "🪵" },
      { name: "Cloves", nameMalayalam: "ഗ്രാമ്പൂ", category: "spice", icon: "📍" },
      { name: "Fenugreek Seeds", nameMalayalam: "ഉലുവ", category: "spice", icon: "🟨" },
      { name: "Black Peppercorns", nameMalayalam: "കുരുമുളക്", category: "spice", icon: "⚫" },
    ],
  },
  {
    name: "Dairy & Proteins",
    icon: "🍗",
    items: [
      { name: "Chicken", nameMalayalam: "ചിക്കൻ", category: "protein", icon: "🍗" },
      { name: "Mutton", nameMalayalam: "മട്ടൺ", category: "protein", icon: "🥩" },
      { name: "Fish", nameMalayalam: "മീൻ", category: "protein", icon: "🐟" },
      { name: "Eggs", nameMalayalam: "മുട്ട", category: "protein", icon: "🥚" },
      { name: "Fresh Paneer", nameMalayalam: "പനീർ", category: "dairy", icon: "🧀" },
      { name: "Curd / Yogurt", nameMalayalam: "തൈര്", category: "dairy", icon: "🥛" },
      { name: "Fresh Milk", nameMalayalam: "പാൽ", category: "dairy", icon: "🥛" },
      { name: "Chickpeas (Chana)", nameMalayalam: "കടല", category: "protein", icon: "🟤" },
      { name: "Toor Dal", nameMalayalam: "തുവരപ്പരിപ്പ്", category: "protein", icon: "🟡" },
    ],
  },
];

export interface PantryMatchFilterOptions {
  dietary?: string;
  maxTime?: number;
  cuisine?: string;
}

export interface PantryRecipeMatch {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  isCompleteWithoutShopping: boolean;
  score: number;
}

/**
 * Calculates transparent ingredient matches against the full recipe catalog.
 * Accurately reports missing items and never claims 100% when items are missing.
 */
export function calculatePantryMatches(
  recipes: Recipe[],
  userIngredients: string[],
  filters?: PantryMatchFilterOptions
): PantryRecipeMatch[] {
  if (!userIngredients || userIngredients.length === 0) return [];

  const normalizedUser = userIngredients.map((item) => item.toLowerCase().trim());

  const matches: PantryRecipeMatch[] = [];

  for (const recipe of recipes) {
    // Apply filters first
    if (filters?.dietary && filters.dietary !== "All") {
      if (!recipe.dietary.includes(filters.dietary as DietaryType)) {
        continue;
      }
    }

    const totalTime = recipe.prepTime + recipe.cookTime;
    if (filters?.maxTime && filters.maxTime > 0) {
      if (totalTime > filters.maxTime) {
        continue;
      }
    }

    if (filters?.cuisine && filters.cuisine !== "All") {
      const fc = filters.cuisine.toLowerCase();
      const rc = recipe.cuisine.toLowerCase();
      const rsc = recipe.stateOrCountry.toLowerCase();
      if (!rc.includes(fc) && !rsc.includes(fc)) {
        continue;
      }
    }

    const recipeIngredients = recipe.ingredients || [];
    if (recipeIngredients.length === 0) continue;

    const matched: string[] = [];
    const missing: string[] = [];

    for (const ing of recipeIngredients) {
      const ingNameLower = ing.name.toLowerCase();
      const isMatched = normalizedUser.some(
        (u) =>
          ingNameLower.includes(u) ||
          u.includes(ingNameLower) ||
          (u === "coconut" && ingNameLower.includes("coconut")) ||
          (u === "rice" && ingNameLower.includes("rice")) ||
          (u === "chicken" && ingNameLower.includes("chicken")) ||
          (u === "onion" && ingNameLower.includes("onion")) ||
          (u === "tomato" && ingNameLower.includes("tomato"))
      );

      if (isMatched) {
        matched.push(ing.name);
      } else {
        missing.push(ing.name);
      }
    }

    if (matched.length === 0) continue;

    const totalRequired = recipeIngredients.length;
    let matchPct = Math.round((matched.length / totalRequired) * 100);

    // Strict constraint: If there are missing ingredients, matchPercentage CANNOT be 100
    if (missing.length > 0 && matchPct >= 100) {
      matchPct = 99;
    }

    const isComplete = missing.length === 0;

    // Weight score: high match percentage + fewer missing items + quick time
    const score = matchPct * 10 - missing.length * 5 - totalTime * 0.1;

    matches.push({
      recipe,
      matchPercentage: matchPct,
      matchedIngredients: matched,
      missingIngredients: missing,
      isCompleteWithoutShopping: isComplete,
      score,
    });
  }

  // Sort by score descending (highest matches first, fewer missing items first)
  return matches.sort((a, b) => b.score - a.score);
}

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onToggleIngredient: (name: string) => void;
  onAddCustomIngredient: (name: string) => void;
  onClearAll: () => void;
}

export function IngredientSelector({
  selectedIngredients,
  onToggleIngredient,
  onAddCustomIngredient,
  onClearAll,
}: IngredientSelectorProps) {
  const [customInput, setCustomInput] = useState("");
  const [activeTab, setActiveTab] = useState(COMMON_PANTRY_CATEGORIES[0].name);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAddCustomIngredient(customInput.trim());
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom Tag Input */}
      <form onSubmit={handleCustomSubmit} className="relative">
        <Search className="w-5 h-5 text-brand-primary absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Type an ingredient (e.g. Cardamom, Mutton, Fenugreek) and press Enter..."
          className="w-full pl-12 pr-28 py-3.5 rounded-2xl glass-input text-sm font-medium text-foreground shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-brand-primary text-background font-extrabold text-xs shadow-md hover:bg-brand-primary/90 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Selected Items Tray */}
      {selectedIngredients.length > 0 && (
        <div className="p-4 rounded-2xl glass-panel border border-brand-primary/30 space-y-2 bg-brand-primary/5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>In Your Kitchen ({selectedIngredients.length} ingredients):</span>
            </span>
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-rose-400 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {selectedIngredients.map((ing) => (
              <span
                key={ing}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-brand-primary text-background shadow-sm animate-fade-in"
              >
                <span>{ing}</span>
                <button
                  onClick={() => onToggleIngredient(ing)}
                  className="hover:opacity-75 focus:outline-none"
                  aria-label={`Remove ${ing}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Categorized Ingredient Selector */}
      <div className="glass-panel p-5 rounded-3xl border border-glass-border space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-glass-border/40">
          {COMMON_PANTRY_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === cat.name
                  ? "bg-brand-primary text-background shadow-md scale-105"
                  : "glass-card text-foreground/75 hover:text-foreground"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Category Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
          {COMMON_PANTRY_CATEGORIES.find((c) => c.name === activeTab)?.items.map((item) => {
            const isSelected = selectedIngredients.includes(item.name);
            return (
              <button
                key={item.name}
                onClick={() => onToggleIngredient(item.name)}
                className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between text-xs ${
                  isSelected
                    ? "bg-brand-primary text-background border-brand-primary shadow-sm font-extrabold scale-[1.02]"
                    : "glass-card hover:border-brand-primary/50 text-foreground"
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    {item.icon && <span>{item.icon}</span>}
                    <span className="font-bold">{item.name}</span>
                  </div>
                  <div
                    className={`text-[10px] font-serif lang-ml ${
                      isSelected ? "text-background/80" : "text-foreground/60"
                    }`}
                  >
                    {item.nameMalayalam}
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                    isSelected
                      ? "bg-white text-brand-primary border-white"
                      : "border-white/20 text-transparent"
                  }`}
                >
                  <Check className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
