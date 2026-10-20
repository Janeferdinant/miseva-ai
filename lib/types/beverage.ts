import { Ingredient, CookingStep, NutritionInfo, FoodSafetyInfo, DietaryType } from "./recipe";

export type BeverageSubcategory =
  | "fresh-juices"
  | "smoothies-shakes"
  | "traditional-refreshers"
  | "mocktails-lemonades"
  | "teas-coffees";

export interface BeverageRecipe {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  transliteration?: string;
  tagline: string;
  description: string;
  descriptionMalayalam: string;
  subcategory: BeverageSubcategory;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTime: number; // minutes
  cookTime?: number;
  servings: number;
  imageUrl: string;
  isHot: boolean;
  sweetnessAdjustmentSupported: boolean;
  defaultSweetnessLevel: number; // percentage, e.g. 100
  ingredients: Ingredient[];
  instructions: CookingStep[];
  nutrition: NutritionInfo;
  foodSafety: FoodSafetyInfo;
  costPerServing: number; // in INR
  costPerServingINR?: number;
  caffeineFree?: boolean;
  servingGlass?: string;
  refrigerationGuidance: string;
  refrigerationGuidanceMalayalam: string;
  refrigerationAdvice?: string;
  refrigerationAdviceMalayalam?: string;
  dietary: DietaryType[];
  verified: boolean;
}
