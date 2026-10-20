export type RetailerId =
  | "amazon-fresh"
  | "flipkart-grocery"
  | "swiggy-instamart"
  | "blinkit"
  | "zepto"
  | "bigbasket";

export interface RetailerInfo {
  id: RetailerId;
  name: string;
  logo: string;
  accentColor: string;
  type: "quick-commerce" | "scheduled-grocery" | "marketplace";
  deliveryEstimate: string;
  searchUrlTemplate: (query: string) => string;
  supportedCities: string[];
}

export interface IngredientCalculationInput {
  requiredAmount: number;
  requiredUnit: string;
  packageSize: number;
  packageUnit: string;
  packagePrice: number;
}

export interface IngredientCostResult {
  consumptionCost: number;
  checkoutCost: number;
  packsNeeded: number;
  normalizedPricePerKg: number;
}

export interface RetailerItemQuote {
  retailerId: RetailerId;
  retailerName: string;
  available: boolean;
  productName: string;
  packageSize: string;
  listedPrice: number;
  normalizedPrice: string;
  consumptionCost: number;
  checkoutCost: number;
  deliveryEstimate: string;
  productUrl: string;
  lastChecked: string;
}

export interface IngredientPriceComparison {
  ingredientName: string;
  ingredientNameMalayalam: string;
  requiredAmount: number;
  requiredUnit: string;
  quotes: RetailerItemQuote[];
  cheapestRetailer?: RetailerId;
  benchmarkPrice: number;
}

export interface RecipeGrocerySummary {
  recipeId: string;
  recipeTitle: string;
  servings: number;
  totalConsumptionCost: number;
  totalCheckoutCost: number;
  ingredients: IngredientPriceComparison[];
  retailerComparisons: {
    retailerId: RetailerId;
    retailerName: string;
    totalCheckoutCost: number;
    availableItemCount: number;
    totalItemCount: number;
    deliveryTime: string;
    searchUrl: string;
  }[];
}

export interface ConsolidatedShoppingItem {
  id: string;
  name: string;
  nameMalayalam: string;
  totalAmount: number;
  unit: string;
  category: string;
  recipesIncluded: string[];
  inPantry: boolean;
  estimatedCost: number;
}
