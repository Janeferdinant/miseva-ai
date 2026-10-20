import { Recipe, Ingredient } from "../types/recipe";

export interface AggregatedShoppingItem {
  id: string;
  canonicalName: string;
  nameMalayalam: string;
  totalAmount: number;
  unit: string;
  category:
    | "Produce"
    | "Staples & Grains"
    | "Spices & Seasoning"
    | "Dairy & Fats"
    | "Protein & Seafood"
    | "Oils & Condiments"
    | "Pantry";
  recipesIncluded: {
    recipeId: string;
    recipeTitle: string;
    amount: number;
    unit: string;
    notes?: string;
  }[];
  notes?: string;
  isOptional: boolean;
  estimatedCost: number;
  checked: boolean;
}

// Canonical name normalization dictionary
const CANONICAL_MAP: Record<string, { canonical: string; category: AggregatedShoppingItem["category"] }> = {
  // Alliums & Produce
  onion: { canonical: "Onions", category: "Produce" },
  onions: { canonical: "Onions", category: "Produce" },
  "yellow onion": { canonical: "Onions", category: "Produce" },
  "yellow onions": { canonical: "Onions", category: "Produce" },
  "red onion": { canonical: "Onions", category: "Produce" },
  "red onions": { canonical: "Onions", category: "Produce" },
  "finely chopped red onions": { canonical: "Onions", category: "Produce" },
  "finely chopped red onion": { canonical: "Onions", category: "Produce" },
  garlic: { canonical: "Garlic", category: "Produce" },
  "garlic cloves": { canonical: "Garlic", category: "Produce" },
  ginger: { canonical: "Fresh Ginger", category: "Produce" },
  "fresh ginger": { canonical: "Fresh Ginger", category: "Produce" },
  "ginger paste": { canonical: "Ginger Paste", category: "Produce" },
  "ginger-garlic paste": { canonical: "Ginger-Garlic Paste", category: "Produce" },
  "ginger garlic paste": { canonical: "Ginger-Garlic Paste", category: "Produce" },
  potato: { canonical: "Potatoes", category: "Produce" },
  potatoes: { canonical: "Potatoes", category: "Produce" },
  "baby potatoes": { canonical: "Potatoes", category: "Produce" },
  tomato: { canonical: "Tomatoes", category: "Produce" },
  tomatoes: { canonical: "Tomatoes", category: "Produce" },
  "ripe plum tomatoes": { canonical: "Tomatoes", category: "Produce" },
  "ripe red tomatoes": { canonical: "Tomatoes", category: "Produce" },
  "green chilies": { canonical: "Green Chilies", category: "Produce" },
  "green chili": { canonical: "Green Chilies", category: "Produce" },
  "curry leaves": { canonical: "Curry Leaves", category: "Produce" },
  "coriander leaves": { canonical: "Fresh Coriander Leaves", category: "Produce" },
  "fresh coriander leaves": { canonical: "Fresh Coriander Leaves", category: "Produce" },
  carrots: { canonical: "Carrots", category: "Produce" },
  carrot: { canonical: "Carrots", category: "Produce" },
  spinach: { canonical: "Spinach", category: "Produce" },
  "fresh spinach": { canonical: "Spinach", category: "Produce" },

  // Dairy & Fats
  ghee: { canonical: "Desi Ghee", category: "Dairy & Fats" },
  "desi ghee": { canonical: "Desi Ghee", category: "Dairy & Fats" },
  "desi cow ghee": { canonical: "Desi Ghee", category: "Dairy & Fats" },
  "pure cow ghee": { canonical: "Desi Ghee", category: "Dairy & Fats" },
  butter: { canonical: "Unsalted Butter", category: "Dairy & Fats" },
  "unsalted butter": { canonical: "Unsalted Butter", category: "Dairy & Fats" },
  "whisked yogurt": { canonical: "Yogurt (Curd)", category: "Dairy & Fats" },
  "thick yogurt (dahi)": { canonical: "Yogurt (Curd)", category: "Dairy & Fats" },
  "curd (dahi)": { canonical: "Yogurt (Curd)", category: "Dairy & Fats" },
  "heavy cream": { canonical: "Heavy Cream", category: "Dairy & Fats" },
  milk: { canonical: "Fresh Milk", category: "Dairy & Fats" },
  paneer: { canonical: "Fresh Paneer", category: "Dairy & Fats" },
  "fresh chhena (soft paneer)": { canonical: "Fresh Paneer", category: "Dairy & Fats" },

  // Grains & Staples
  "basmati rice": { canonical: "Aged Basmati Rice", category: "Staples & Grains" },
  "aged basmati rice": { canonical: "Aged Basmati Rice", category: "Staples & Grains" },
  "whole wheat flour": { canonical: "Whole Wheat Flour (Atta)", category: "Staples & Grains" },
  "all purpose flour (maida)": { canonical: "All Purpose Flour (Maida)", category: "Staples & Grains" },
  "semolina (sooji)": { canonical: "Semolina (Sooji)", category: "Staples & Grains" },
  "gram flour (besan)": { canonical: "Gram Flour (Besan)", category: "Staples & Grains" },
  "yellow moong dal": { canonical: "Yellow Moong Dal", category: "Staples & Grains" },

  // Oils & Condiments
  "mustard oil": { canonical: "Mustard Oil", category: "Oils & Condiments" },
  "coconut oil": { canonical: "Coconut Oil", category: "Oils & Condiments" },
  "extra virgin olive oil": { canonical: "Extra Virgin Olive Oil", category: "Oils & Condiments" },
  "toasted sesame oil": { canonical: "Toasted Sesame Oil", category: "Oils & Condiments" },
  "soy sauce": { canonical: "Soy Sauce", category: "Oils & Condiments" },
  "naturally brewed soy sauce": { canonical: "Soy Sauce", category: "Oils & Condiments" },
  "korean chili paste (gochujang)": { canonical: "Korean Gochujang Paste", category: "Oils & Condiments" },

  // Spices
  "turmeric powder": { canonical: "Turmeric Powder", category: "Spices & Seasoning" },
  "kashmiri red chili powder": { canonical: "Kashmiri Red Chili Powder", category: "Spices & Seasoning" },
  "kashmiri chili powder": { canonical: "Kashmiri Red Chili Powder", category: "Spices & Seasoning" },
  "coriander powder": { canonical: "Coriander Powder", category: "Spices & Seasoning" },
  "cumin seeds": { canonical: "Cumin Seeds", category: "Spices & Seasoning" },
  "asafoetida (hing)": { canonical: "Asafoetida (Hing)", category: "Spices & Seasoning" },
  "fennel seeds (saunf)": { canonical: "Fennel Seeds (Saunf)", category: "Spices & Seasoning" },
  "garam masala": { canonical: "Garam Masala", category: "Spices & Seasoning" },
};

function normalizeName(raw: string): { canonical: string; category: AggregatedShoppingItem["category"] } {
  const clean = raw.toLowerCase().replace(/[()]/g, "").trim();
  if (CANONICAL_MAP[clean]) return CANONICAL_MAP[clean];

  for (const [key, val] of Object.entries(CANONICAL_MAP)) {
    if (clean.includes(key)) {
      return val;
    }
  }

  // Fallback category heuristic
  if (clean.includes("chicken") || clean.includes("mutton") || clean.includes("beef") || clean.includes("fish") || clean.includes("pork")) {
    return { canonical: raw, category: "Protein & Seafood" };
  }
  if (clean.includes("oil")) {
    return { canonical: raw, category: "Oils & Condiments" };
  }
  if (clean.includes("powder") || clean.includes("seeds") || clean.includes("masala") || clean.includes("pepper")) {
    return { canonical: raw, category: "Spices & Seasoning" };
  }
  if (clean.includes("flour") || clean.includes("rice") || clean.includes("dal")) {
    return { canonical: raw, category: "Staples & Grains" };
  }
  if (clean.includes("milk") || clean.includes("cheese") || clean.includes("curd") || clean.includes("butter")) {
    return { canonical: raw, category: "Dairy & Fats" };
  }

  return { canonical: raw, category: "Produce" };
}

/**
 * Intelligent unit conversion helper.
 * If units are compatible (e.g. g and kg, ml and l, tsp and tbsp), normalizes them.
 */
function normalizeUnitAndAmount(amount: number, unit: string): { amount: number; unit: string } {
  const u = unit.toLowerCase().trim();
  if (u === "kg" || u === "kilogram" || u === "kilograms") {
    return { amount: amount * 1000, unit: "g" };
  }
  if (u === "l" || u === "liter" || u === "litres" || u === "liters") {
    return { amount: amount * 1000, unit: "ml" };
  }
  if (u === "tbsp" || u === "tablespoon" || u === "tablespoons") {
    return { amount: amount * 3, unit: "tsp" };
  }
  if (u === "piece" || u === "pieces" || u === "pcs") {
    return { amount, unit: "pieces" };
  }
  return { amount, unit: u };
}

function formatFinalUnit(amount: number, unit: string): { amount: number; unit: string } {
  if (unit === "g" && amount >= 1000) {
    return { amount: Math.round((amount / 1000) * 100) / 100, unit: "kg" };
  }
  if (unit === "ml" && amount >= 1000) {
    return { amount: Math.round((amount / 1000) * 100) / 100, unit: "L" };
  }
  if (unit === "tsp" && amount >= 3 && amount % 3 === 0) {
    return { amount: amount / 3, unit: "tbsp" };
  }
  return { amount: Math.round(amount * 100) / 100, unit };
}

/**
 * Main smart aggregation function for multiple recipes.
 */
export function aggregateShoppingList(recipes: Recipe[]): AggregatedShoppingItem[] {
  const map = new Map<string, AggregatedShoppingItem>();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const { canonical, category } = normalizeName(ing.name);
      const { amount: normAmount, unit: normUnit } = normalizeUnitAndAmount(ing.amount, ing.unit);
      const key = `${canonical.toLowerCase()}-${normUnit}`;

      const existing = map.get(key);
      if (existing) {
        existing.totalAmount += normAmount;
        existing.recipesIncluded.push({
          recipeId: recipe.id,
          recipeTitle: recipe.title,
          amount: ing.amount,
          unit: ing.unit,
          notes: ing.notes,
        });
      } else {
        const id = `item-${canonical.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${normUnit}`;
        map.set(key, {
          id,
          canonicalName: canonical,
          nameMalayalam: ing.nameMalayalam || canonical,
          totalAmount: normAmount,
          unit: normUnit,
          category,
          recipesIncluded: [
            {
              recipeId: recipe.id,
              recipeTitle: recipe.title,
              amount: ing.amount,
              unit: ing.unit,
              notes: ing.notes,
            },
          ],
          notes: ing.notes,
          isOptional: ing.notes?.toLowerCase().includes("optional") || false,
          estimatedCost: Math.max(30, Math.round(normAmount * 0.4)),
          checked: false,
        });
      }
    }
  }

  // Format final readable units
  const results = Array.from(map.values()).map((item) => {
    const formatted = formatFinalUnit(item.totalAmount, item.unit);
    return {
      ...item,
      totalAmount: formatted.amount,
      unit: formatted.unit,
    };
  });

  // Sort by category then name
  return results.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.canonicalName.localeCompare(b.canonicalName);
  });
}
