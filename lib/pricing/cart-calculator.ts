import { Recipe, Ingredient } from "../types/recipe";
import {
  RetailerId,
  RetailerInfo,
  IngredientCalculationInput,
  IngredientCostResult,
  RetailerItemQuote,
  IngredientPriceComparison,
  RecipeGrocerySummary,
  ConsolidatedShoppingItem,
} from "../types/pricing";

export const RETAILERS: RetailerInfo[] = [
  {
    id: "amazon-fresh",
    name: "Amazon Fresh India",
    logo: "📦",
    accentColor: "#2563eb",
    type: "scheduled-grocery",
    deliveryEstimate: "Same day (2-4 hrs)",
    searchUrlTemplate: (q) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}&i=nowstore`,
    supportedCities: ["Kochi", "Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai", "Kolkata", "Pune"],
  },
  {
    id: "flipkart-grocery",
    name: "Flipkart Grocery",
    logo: "🛍️",
    accentColor: "#2874f0",
    type: "scheduled-grocery",
    deliveryEstimate: "Next morning slot",
    searchUrlTemplate: (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q + " grocery")}`,
    supportedCities: ["Kochi", "Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"],
  },
  {
    id: "swiggy-instamart",
    name: "Swiggy Instamart",
    logo: "⚡",
    accentColor: "#fc8019",
    type: "quick-commerce",
    deliveryEstimate: "12 - 18 mins",
    searchUrlTemplate: (q) => `https://www.swiggy.com/instamart/search?custom_back=true&query=${encodeURIComponent(q)}`,
    supportedCities: ["Kochi", "Thiruvananthapuram", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Kolkata"],
  },
  {
    id: "blinkit",
    name: "Blinkit",
    logo: "🟡",
    accentColor: "#f59e0b",
    type: "quick-commerce",
    deliveryEstimate: "10 - 15 mins",
    searchUrlTemplate: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`,
    supportedCities: ["Delhi NCR", "Bangalore", "Mumbai", "Kochi", "Hyderabad", "Kolkata", "Pune"],
  },
  {
    id: "zepto",
    name: "Zepto",
    logo: "🚀",
    accentColor: "#9333ea",
    type: "quick-commerce",
    deliveryEstimate: "9 - 14 mins",
    searchUrlTemplate: (q) => `https://www.zeptonow.com/search?q=${encodeURIComponent(q)}`,
    supportedCities: ["Kochi", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata"],
  },
  {
    id: "bigbasket",
    name: "BigBasket / BBnow",
    logo: "🥬",
    accentColor: "#84cc16",
    type: "scheduled-grocery",
    deliveryEstimate: "BBnow 15-30 mins / Scheduled",
    searchUrlTemplate: (q) => `https://www.bigbasket.com/ps/?q=${encodeURIComponent(q)}`,
    supportedCities: ["All Metro & Tier 1/2 Cities (Kochi, Kozhikode, Bangalore, etc.)"],
  },
];

/**
 * Standardize culinary units to grams or milliliters for accurate conversion.
 */
function convertToBaseUnits(amount: number, unit: string): { baseAmount: number; baseType: "weight" | "volume" | "count" } {
  const u = unit.toLowerCase().trim();
  switch (u) {
    case "kg":
      return { baseAmount: amount * 1000, baseType: "weight" };
    case "g":
    case "gram":
    case "grams":
      return { baseAmount: amount, baseType: "weight" };
    case "l":
    case "litre":
    case "liter":
      return { baseAmount: amount * 1000, baseType: "volume" };
    case "ml":
      return { baseAmount: amount, baseType: "volume" };
    case "tbsp":
    case "tablespoon":
      return { baseAmount: amount * 15, baseType: "volume" };
    case "tsp":
    case "teaspoon":
      return { baseAmount: amount * 5, baseType: "volume" };
    case "cup":
    case "cups":
      return { baseAmount: amount * 240, baseType: "volume" };
    default:
      return { baseAmount: amount, baseType: "count" };
  }
}

/**
 * Calculate the consumption cost and packaging checkout cost.
 * Formula: Required ingredient cost = listed package price × required quantity ÷ package quantity.
 */
export function calculateIngredientCost(input: IngredientCalculationInput): IngredientCostResult {
  const { requiredAmount, requiredUnit, packageSize, packageUnit, packagePrice } = input;

  const req = convertToBaseUnits(requiredAmount, requiredUnit);
  const pkg = convertToBaseUnits(packageSize, packageUnit);

  let ratio = 1;
  let normalizedPricePerKg = packagePrice;

  if (req.baseType === pkg.baseType && pkg.baseAmount > 0) {
    ratio = req.baseAmount / pkg.baseAmount;
    if (pkg.baseType === "weight" || pkg.baseType === "volume") {
      normalizedPricePerKg = Math.round((packagePrice / (pkg.baseAmount / 1000)) * 100) / 100;
    }
  } else {
    // Fallback if units mismatch (e.g. pieces to kg)
    ratio = packageSize > 0 ? requiredAmount / packageSize : 1;
  }

  const consumptionCost = Math.round(packagePrice * ratio * 100) / 100;
  const packsNeeded = Math.max(1, Math.ceil(ratio));
  const checkoutCost = packsNeeded * packagePrice;

  return {
    consumptionCost,
    checkoutCost,
    packsNeeded,
    normalizedPricePerKg,
  };
}

// Benchmark standard prices for Indian kitchen staples
const INGREDIENT_BENCHMARKS: Record<
  string,
  { defaultPackSize: number; defaultPackUnit: string; basePrice: number; standardProductName: string }
> = {
  coconut: { defaultPackSize: 1, defaultPackUnit: "piece", basePrice: 38, standardProductName: "Fresh De-husked Coconut (Kerala Medium)" },
  "elephant foot yam": { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 42, standardProductName: "Fresh Elephant Foot Yam (Chena)" },
  "raw plantain": { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 35, standardProductName: "Fresh Raw Banana / Pacha Kaya" },
  drumsticks: { defaultPackSize: 250, defaultPackUnit: "g", basePrice: 28, standardProductName: "Fresh Green Drumsticks (Muringakka)" },
  "ash gourd": { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 26, standardProductName: "Fresh Ash Gourd (Kumbalanga Cut)" },
  "snake gourd": { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 30, standardProductName: "Fresh Snake Gourd (Padavalanga)" },
  "cold-pressed coconut oil": { defaultPackSize: 500, defaultPackUnit: "ml", basePrice: 195, standardProductName: "Kera / KLF Pure Coconut Oil Pouch 500ml" },
  ghee: { defaultPackSize: 500, defaultPackUnit: "ml", basePrice: 340, standardProductName: "Milma / Amul Pure Cow Ghee 500ml Jar" },
  "sour curd": { defaultPackSize: 400, defaultPackUnit: "g", basePrice: 35, standardProductName: "Milma / Mother Dairy Rich Curd 400g" },
  "jeerakasala rice": { defaultPackSize: 1000, defaultPackUnit: "g", basePrice: 140, standardProductName: "Double Horse / Pavizham Jeerakasala Khaima Rice 1kg" },
  chicken: { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 130, standardProductName: "Fresh Cleaned Chicken Curry Cut (Skinless 500g)" },
  mutton: { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 460, standardProductName: "Fresh Tender Goat Mutton Curry Cut (500g)" },
  "mustard oil": { defaultPackSize: 1000, defaultPackUnit: "ml", basePrice: 165, standardProductName: "Fortune Kachi Ghani Pure Mustard Oil 1L" },
  "gram flour": { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 55, standardProductName: "Tata Sampann / Fortune Besan Gram Flour 500g" },
  "moth beans": { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 65, standardProductName: "Unpolished Matki Moth Beans 500g" },
  rice: { defaultPackSize: 1000, defaultPackUnit: "g", basePrice: 75, standardProductName: "Raw White Rice (Pacharisi) 1kg" },
  potatoes: { defaultPackSize: 1000, defaultPackUnit: "g", basePrice: 38, standardProductName: "Fresh Table Potatoes 1kg" },
  onions: { defaultPackSize: 1000, defaultPackUnit: "g", basePrice: 45, standardProductName: "Fresh Red Onions 1kg" },
  shallots: { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 55, standardProductName: "Fresh Small Sambar Onions / Kunjulli 500g" },
  tomatoes: { defaultPackSize: 500, defaultPackUnit: "g", basePrice: 28, standardProductName: "Fresh Country Hybrid Tomatoes 500g" },
  prawns: { defaultPackSize: 250, defaultPackUnit: "g", basePrice: 220, standardProductName: "Fresh Peeled & Deveined Medium Prawns 250g" },
  mushrooms: { defaultPackSize: 200, defaultPackUnit: "g", basePrice: 50, standardProductName: "Fresh White Button Mushrooms 200g Pack" },
  eggs: { defaultPackSize: 6, defaultPackUnit: "pieces", basePrice: 48, standardProductName: "Farm Fresh White Eggs (Pack of 6)" },
};

function matchBenchmark(ingredientName: string) {
  const lower = ingredientName.toLowerCase();
  for (const [key, val] of Object.entries(INGREDIENT_BENCHMARKS)) {
    if (lower.includes(key)) return val;
  }
  // Default fallback benchmark
  return {
    defaultPackSize: 250,
    defaultPackUnit: "g",
    basePrice: 45,
    standardProductName: `${ingredientName} (Standard Retail Pack)`,
  };
}

/**
 * Generate multi-retailer quotes for an ingredient.
 */
export function getRetailerQuotes(ingredient: Ingredient, scaledAmount: number): RetailerItemQuote[] {
  const bench = matchBenchmark(ingredient.name);
  const now = new Date().toISOString().split("T")[0];

  // Minor realistic variance across platforms (e.g. Zepto convenience price vs Flipkart bulk discount)
  const multipliers: Record<RetailerId, number> = {
    "amazon-fresh": 0.98,
    "flipkart-grocery": 0.95,
    "swiggy-instamart": 1.04,
    blinkit: 1.02,
    zepto: 1.03,
    bigbasket: 0.97,
  };

  return RETAILERS.map((retailer) => {
    const mult = multipliers[retailer.id] || 1.0;
    const price = Math.round(bench.basePrice * mult);
    const cost = calculateIngredientCost({
      requiredAmount: scaledAmount,
      requiredUnit: ingredient.unit,
      packageSize: bench.defaultPackSize,
      packageUnit: bench.defaultPackUnit,
      packagePrice: price,
    });

    return {
      retailerId: retailer.id,
      retailerName: retailer.name,
      available: true,
      productName: bench.standardProductName,
      packageSize: `${bench.defaultPackSize} ${bench.defaultPackUnit}`,
      listedPrice: price,
      normalizedPrice: `₹${cost.normalizedPricePerKg} / kg`,
      consumptionCost: cost.consumptionCost,
      checkoutCost: cost.checkoutCost,
      deliveryEstimate: retailer.deliveryEstimate,
      productUrl: retailer.searchUrlTemplate(ingredient.name),
      lastChecked: now,
    };
  });
}

/**
 * Calculate complete grocery summary for a recipe with serving scaling.
 */
export function calculateRecipeGroceryCost(recipe: Recipe, targetServings: number, pincode?: string): RecipeGrocerySummary {
  const ratio = targetServings / recipe.servings;

  const ingredientComparisons: IngredientPriceComparison[] = recipe.ingredients.map((ing) => {
    const scaledAmount = Math.round(ing.amount * ratio * 100) / 100;
    const quotes = getRetailerQuotes(ing, scaledAmount);
    const benchmark = quotes[0]?.consumptionCost || 20;

    return {
      ingredientName: ing.name,
      ingredientNameMalayalam: ing.nameMalayalam,
      requiredAmount: scaledAmount,
      requiredUnit: ing.unit,
      quotes,
      cheapestRetailer: "flipkart-grocery",
      benchmarkPrice: benchmark,
    };
  });

  let totalConsumption = 0;
  let totalCheckout = 0;

  for (const item of ingredientComparisons) {
    const bestQuote = item.quotes[0];
    if (bestQuote) {
      totalConsumption += bestQuote.consumptionCost;
      totalCheckout += bestQuote.checkoutCost;
    }
  }

  const retailerComparisons = RETAILERS.map((retailer) => {
    let retCheckout = 0;
    let availCount = 0;

    for (const item of ingredientComparisons) {
      const q = item.quotes.find((quote) => quote.retailerId === retailer.id);
      if (q && q.available) {
        retCheckout += q.checkoutCost;
        availCount += 1;
      }
    }

    return {
      retailerId: retailer.id,
      retailerName: retailer.name,
      totalCheckoutCost: retCheckout,
      availableItemCount: availCount,
      totalItemCount: recipe.ingredients.length,
      deliveryTime: retailer.deliveryEstimate,
      searchUrl: retailer.searchUrlTemplate(recipe.title),
    };
  });

  return {
    recipeId: recipe.id,
    recipeTitle: recipe.title,
    servings: targetServings,
    totalConsumptionCost: Math.round(totalConsumption),
    totalCheckoutCost: Math.round(totalCheckout),
    ingredients: ingredientComparisons,
    retailerComparisons,
  };
}

/**
 * Consolidate ingredients from multiple recipes into a merged shopping list.
 */
export function consolidateShoppingList(recipes: Recipe[]): ConsolidatedShoppingItem[] {
  const mergedMap = new Map<string, ConsolidatedShoppingItem>();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const key = ing.name.toLowerCase().trim();
      const existing = mergedMap.get(key);

      if (existing) {
        existing.totalAmount = Math.round((existing.totalAmount + ing.amount) * 100) / 100;
        if (!existing.recipesIncluded.includes(recipe.title)) {
          existing.recipesIncluded.push(recipe.title);
        }
      } else {
        const bench = matchBenchmark(ing.name);
        const cost = calculateIngredientCost({
          requiredAmount: ing.amount,
          requiredUnit: ing.unit,
          packageSize: bench.defaultPackSize,
          packageUnit: bench.defaultPackUnit,
          packagePrice: bench.basePrice,
        });

        mergedMap.set(key, {
          id: key.replace(/[^a-z0-9]/g, "-"),
          name: ing.name,
          nameMalayalam: ing.nameMalayalam,
          totalAmount: ing.amount,
          unit: ing.unit,
          category: ing.category,
          recipesIncluded: [recipe.title],
          inPantry: false,
          estimatedCost: cost.checkoutCost,
        });
      }
    }
  }

  return Array.from(mergedMap.values());
}
