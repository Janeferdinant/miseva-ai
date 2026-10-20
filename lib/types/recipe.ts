export type RegionType =
  | "South India"
  | "North India"
  | "West India"
  | "East India"
  | "Northeast India"
  | "Union Territories"
  | "Global";

export type DietaryType =
  | "vegetarian"
  | "vegan"
  | "non-vegetarian"
  | "jain"
  | "gluten-free"
  | "dairy-free"
  | "high-protein"
  | "budget";

export type MealType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snack"
  | "dessert"
  | "beverage"
  | "festive";

export interface Ingredient {
  name: string;
  nameMalayalam: string;
  amount: number;
  unit: string;
  notes?: string;
  category: "staple" | "produce" | "spice" | "dairy" | "protein" | "oil" | "condiment";
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  text: string;
  textMalayalam: string;
  transliteration?: string;
  timerMinutes?: number;
  tip?: string;
  technique?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber: number;   // in grams
}

export interface FoodSafetyInfo {
  allergens: string[];
  safeStorage: string;
  safeStorageMalayalam: string;
  internalTemp?: string;
  handlingTips: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  transliteration?: string;
  tagline: string;
  description: string;
  descriptionMalayalam: string;
  cuisine: string;
  stateOrCountry: string;
  region: RegionType;
  mealType: MealType;
  dietary: DietaryType[];
  difficulty: "Easy" | "Medium" | "Advanced";
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: CookingStep[];
  nutrition: NutritionInfo;
  foodSafety: FoodSafetyInfo;
  equipment: string[];
  culturalContext: string;
  sourceAttribution: string;
  verified: boolean;
}

export interface ScaledIngredient extends Ingredient {
  originalAmount: number;
  formattedAmount: string;
}

export interface ScaledRecipe extends Omit<Recipe, "ingredients"> {
  ingredients: ScaledIngredient[];
  targetServings: number;
}
