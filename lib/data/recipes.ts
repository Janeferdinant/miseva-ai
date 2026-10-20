import { Recipe, RegionType } from "../types/recipe";
import { SOUTH_INDIAN_RECIPES } from "./recipes-indian-south";
import { KARNATAKA_ANDHRA_RECIPES } from "./recipes-karnataka-andhra";
import { NORTH_WEST_EAST_RECIPES } from "./recipes-north-west-east";
import { MAHARASHTRA_GUJARAT_RECIPES } from "./recipes-maharashtra-gujarat";
import { BENGALI_EAST_RECIPES } from "./recipes-bengali-east";
import { INTERNATIONAL_RECIPES } from "./recipes-international";
import { MEXICAN_RECIPES } from "./recipes-mexican";
import { CHINESE_RECIPES } from "./recipes-chinese";
import { THAI_RECIPES } from "./recipes-thai";
import { MIDDLE_EASTERN_RECIPES } from "./recipes-middle-eastern";
import { NORTH_EXPANSION_RECIPES } from "./recipes-north-expansion";
import { REGIONAL_EXPANSION_RECIPES } from "./recipes-regional-expansion";
import { GLOBAL_EXPANSION_RECIPES } from "./recipes-global-expansion";

export const RECIPES: Recipe[] = [
  ...SOUTH_INDIAN_RECIPES,
  ...KARNATAKA_ANDHRA_RECIPES,
  ...NORTH_WEST_EAST_RECIPES,
  ...MAHARASHTRA_GUJARAT_RECIPES,
  ...BENGALI_EAST_RECIPES,
  ...INTERNATIONAL_RECIPES,
  ...MEXICAN_RECIPES,
  ...CHINESE_RECIPES,
  ...THAI_RECIPES,
  ...MIDDLE_EASTERN_RECIPES,
  ...NORTH_EXPANSION_RECIPES,
  ...REGIONAL_EXPANSION_RECIPES,
  ...GLOBAL_EXPANSION_RECIPES,
];

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id || r.slug === id);
}

export function getRecipesByRegion(region: RegionType): Recipe[] {
  return RECIPES.filter((r) => r.region === region);
}

export function getRecipesByCuisine(cuisine: string): Recipe[] {
  return RECIPES.filter((r) => r.cuisine.toLowerCase() === cuisine.toLowerCase());
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase().trim();
  if (!q) return RECIPES;

  return RECIPES.filter((r) => {
    return (
      r.title.toLowerCase().includes(q) ||
      r.titleMalayalam.includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.stateOrCountry.toLowerCase().includes(q) ||
      r.dietary.some((d) => d.toLowerCase().includes(q)) ||
      r.ingredients.some(
        (i) => i.name.toLowerCase().includes(q) || i.nameMalayalam.includes(q)
      )
    );
  });
}
