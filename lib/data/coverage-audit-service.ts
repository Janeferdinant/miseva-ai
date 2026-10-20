import { RECIPES } from "./recipes";
import { DESSERT_RECIPES } from "./desserts";
import { BEVERAGE_RECIPES } from "./beverages";
import { TABLE_STYLING_CONCEPTS } from "./table-styling-concepts";
import { getAllRegions, CulinaryRegion } from "./cuisines";
import { Recipe } from "../types/recipe";

export interface RegionAuditRecord {
  id: string;
  name: string;
  nameMalayalam: string;
  regionType: "State" | "Country" | "Culinary Region";
  parentRegion: string;
  icon: string;
  description: string;
  totalRecipes: number;
  completeRecipes: number;
  recipesWithValidImages: number;
  recipesWithCompleteIngredients: number;
  recipesWithCompleteInstructions: number;
  recipesWithShoppingList: number;
  verifiedRecipes: number;
  missingFields: string[];
  completionPercentage: number;
  status: "COMPLIANT" | "BELOW_MINIMUM" | "EMPTY";
  recipes: {
    id: string;
    title: string;
    titleMalayalam: string;
    imageUrl: string;
    mealType: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    verified: boolean;
    ingredientCount: number;
    instructionCount: number;
  }[];
}

export interface MacroAuditSummary {
  timestamp: string;
  totalRegions: number;
  compliantRegions: number;
  belowMinimumRegions: number;
  zeroRecipeRegions: number;
  totalCatalogDishes: number;
  totalMainRecipes: number;
  totalDesserts: number;
  totalBeverages: number;
  totalTableConcepts: number;
  totalValidatedRecipes: number;
  missingImagesCount: number;
  missingIngredientsCount: number;
  missingStepsCount: number;
  shoppingListFailuresCount: number;
  duplicateRecipesCount: number;
  overallComplianceRate: number;
  status: "PASSED" | "FAILED";
}

export interface FullCoverageAuditResponse {
  summary: MacroAuditSummary;
  regions: RegionAuditRecord[];
}

export function performGeographicCoverageAudit(): FullCoverageAuditResponse {
  const regions = getAllRegions();
  const seenIds = new Set<string>();
  let duplicateCount = 0;

  for (const r of RECIPES) {
    if (seenIds.has(r.id)) duplicateCount++;
    seenIds.add(r.id);
  }

  let totalValidatedRecipes = 0;
  let missingImagesCount = 0;
  let missingIngredientsCount = 0;
  let missingStepsCount = 0;
  let shoppingListFailuresCount = 0;

  const regionRecords: RegionAuditRecord[] = regions.map((reg) => {
    // Match recipes by cuisine or stateOrCountry
    const matchingRecipes = RECIPES.filter((r) => {
      const c = r.cuisine.toLowerCase();
      const s = r.stateOrCountry.toLowerCase();
      const name = reg.name.toLowerCase();
      const id = reg.id.toLowerCase();

      return (
        c === id ||
        c === name ||
        s === id ||
        s === name ||
        (reg.id === "andhra-telangana" && (c.includes("andhra") || c.includes("hyderabad") || s.includes("andhra"))) ||
        (reg.id === "assam-northeast" && (c.includes("assam") || c.includes("northeast") || s.includes("assam"))) ||
        (reg.id === "kashmir" && (c.includes("kashmir") || s.includes("kashmir"))) ||
        (reg.id === "uttar-pradesh" && (c.includes("uttar pradesh") || c.includes("awadh") || s.includes("uttar pradesh"))) ||
        (reg.id === "west-bengal" && (c.includes("bengal") || s.includes("bengal"))) ||
        (reg.id === "middle-east" && c.includes("middle eastern"))
      );
    });

    let completeCount = 0;
    let validImagesCount = 0;
    let completeIngredientsCount = 0;
    let completeInstructionsCount = 0;
    let shoppingListCount = 0;
    let verifiedCount = 0;
    const missingFieldsSet = new Set<string>();

    const recipeSummaries = matchingRecipes.map((r) => {
      const hasValidImage = Boolean(r.imageUrl && r.imageUrl.startsWith("http"));
      const hasIngredients = Array.isArray(r.ingredients) && r.ingredients.length >= 3 && r.ingredients.every((i) => i.name && i.amount > 0 && i.unit);
      const hasInstructions = Array.isArray(r.instructions) && r.instructions.length >= 2 && r.instructions.every((s) => s.title && s.text);
      const hasShopping = hasIngredients;
      const isVerified = Boolean(r.verified);

      if (hasValidImage) validImagesCount++;
      else {
        missingImagesCount++;
        missingFieldsSet.add("imageUrl");
      }

      if (hasIngredients) completeIngredientsCount++;
      else {
        missingIngredientsCount++;
        missingFieldsSet.add("ingredients");
      }

      if (hasInstructions) completeInstructionsCount++;
      else {
        missingStepsCount++;
        missingFieldsSet.add("instructions");
      }

      if (hasShopping) shoppingListCount++;
      else shoppingListFailuresCount++;

      if (isVerified) verifiedCount++;

      const isComplete = hasValidImage && hasIngredients && hasInstructions && hasShopping;
      if (isComplete) completeCount++;

      return {
        id: r.id,
        title: r.title,
        titleMalayalam: r.titleMalayalam,
        imageUrl: r.imageUrl,
        mealType: r.mealType,
        difficulty: r.difficulty,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        verified: isVerified,
        ingredientCount: r.ingredients.length,
        instructionCount: r.instructions.length,
      };
    });

    totalValidatedRecipes += completeCount;

    // Determine region type
    let regionType: RegionAuditRecord["regionType"] = "State";
    if (reg.category === "Global") {
      regionType = "Country";
    } else if (reg.id === "delhi") {
      regionType = "Culinary Region";
    } else if (reg.id === "middle-east" || reg.id === "assam-northeast") {
      regionType = "Culinary Region";
    }

    const minRequired = 5;
    const completionPercentage = Math.min(100, Math.round((completeCount / minRequired) * 100));
    let status: RegionAuditRecord["status"] = "COMPLIANT";
    if (completeCount === 0) status = "EMPTY";
    else if (completeCount < minRequired) status = "BELOW_MINIMUM";

    return {
      id: reg.id,
      name: reg.name,
      nameMalayalam: reg.nameMalayalam,
      regionType,
      parentRegion: reg.category,
      icon: reg.icon,
      description: reg.description,
      totalRecipes: matchingRecipes.length,
      completeRecipes: completeCount,
      recipesWithValidImages: validImagesCount,
      recipesWithCompleteIngredients: completeIngredientsCount,
      recipesWithCompleteInstructions: completeInstructionsCount,
      recipesWithShoppingList: shoppingListCount,
      verifiedRecipes: verifiedCount,
      missingFields: Array.from(missingFieldsSet),
      completionPercentage,
      status,
      recipes: recipeSummaries,
    };
  });

  const compliantRegions = regionRecords.filter((r) => r.status === "COMPLIANT").length;
  const belowMinimumRegions = regionRecords.filter((r) => r.status === "BELOW_MINIMUM").length;
  const zeroRecipeRegions = regionRecords.filter((r) => r.status === "EMPTY").length;

  const totalCatalogDishes = RECIPES.length + DESSERT_RECIPES.length + BEVERAGE_RECIPES.length;

  const summary: MacroAuditSummary = {
    timestamp: new Date().toISOString(),
    totalRegions: regions.length,
    compliantRegions,
    belowMinimumRegions,
    zeroRecipeRegions,
    totalCatalogDishes,
    totalMainRecipes: RECIPES.length,
    totalDesserts: DESSERT_RECIPES.length,
    totalBeverages: BEVERAGE_RECIPES.length,
    totalTableConcepts: TABLE_STYLING_CONCEPTS.length,
    totalValidatedRecipes,
    missingImagesCount,
    missingIngredientsCount,
    missingStepsCount,
    shoppingListFailuresCount,
    duplicateRecipesCount: duplicateCount,
    overallComplianceRate: Math.round((compliantRegions / regions.length) * 100),
    status: belowMinimumRegions === 0 && zeroRecipeRegions === 0 ? "PASSED" : "FAILED",
  };

  return { summary, regions: regionRecords };
}
