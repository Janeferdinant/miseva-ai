import { Ingredient, CookingStep, NutritionInfo, FoodSafetyInfo, DietaryType } from "./recipe";

export type DessertSubcategory =
  | "payasam-pradhaman"
  | "traditional-mithai"
  | "cakes-bakes"
  | "global-desserts";

export interface DessertRecipe {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  transliteration?: string;
  tagline: string;
  description: string;
  descriptionMalayalam: string;
  subcategory: DessertSubcategory;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTime: number; // minutes
  cookTime: number; // minutes (or bake time)
  servings: number;
  imageUrl: string;
  bakingTemperature?: {
    celsius: number;
    fahrenheit: number;
  };
  donenessIndicators: string[];
  donenessIndicatorsMalayalam: string[];
  substitutions: {
    original: string;
    substitute: string;
    notes: string;
  }[];
  dietary: DietaryType[];
  ingredients: Ingredient[];
  instructions: CookingStep[];
  nutrition: NutritionInfo;
  foodSafety: FoodSafetyInfo;
  costPerServing: number; // in INR
  storageGuidance: string;
  storageGuidanceMalayalam: string;
  verified: boolean;
}
