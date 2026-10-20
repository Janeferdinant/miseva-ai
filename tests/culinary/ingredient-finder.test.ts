import { describe, it, expect } from "vitest";
import { RECIPES } from "@/lib/data/recipes";
import {
  calculatePantryMatches,
  COMMON_PANTRY_CATEGORIES,
} from "@/components/ingredients/IngredientSelector";

describe("Ingredient Finder Calculation & Matching Engine", () => {
  it("should provide common categorized ingredient chips for easy selection", () => {
    expect(COMMON_PANTRY_CATEGORIES.length).toBeGreaterThanOrEqual(4);
    const categoryNames = COMMON_PANTRY_CATEGORIES.map((c) => c.name);
    expect(categoryNames).toContain("Pantry Staples");
    expect(categoryNames).toContain("Fresh Produce");
    expect(categoryNames).toContain("Spices & Aromatics");
    expect(categoryNames).toContain("Dairy & Proteins");

    for (const cat of COMMON_PANTRY_CATEGORIES) {
      expect(cat.items.length).toBeGreaterThan(0);
      for (const item of cat.items) {
        expect(item.name).toBeTruthy();
        expect(item.nameMalayalam).toBeTruthy();
      }
    }
  });

  it("should calculate exact matches and clearly identify missing required ingredients", () => {
    // User has Coconut, Ginger, Green Chilli, and Mustard Seeds
    const userIngredients = ["Coconut", "Ginger", "Green Chilli", "Mustard Seeds"];
    const results = calculatePantryMatches(RECIPES, userIngredients);

    expect(results.length).toBeGreaterThan(0);

    // Top results should have matched ingredients
    const topMatch = results[0];
    expect(topMatch.matchedIngredients.length).toBeGreaterThan(0);
    expect(topMatch.matchPercentage).toBeGreaterThan(0);

    // Crucial requirement: Must clearly state missing ingredients and never claim 100% when items are missing
    for (const res of results) {
      if (res.missingIngredients.length > 0) {
        expect(res.matchPercentage).toBeLessThan(100);
        expect(res.isCompleteWithoutShopping).toBe(false);
      } else {
        expect(res.matchPercentage).toBe(100);
        expect(res.isCompleteWithoutShopping).toBe(true);
      }
    }
  });

  it("should support dietary filters and max cook time constraints", () => {
    const userIngredients = ["Rice", "Coconut", "Onion"];
    const vegOnly = calculatePantryMatches(RECIPES, userIngredients, {
      dietary: "vegetarian",
    });
    for (const item of vegOnly) {
      expect(item.recipe.dietary).toContain("vegetarian");
    }

    const quickOnly = calculatePantryMatches(RECIPES, userIngredients, {
      maxTime: 25,
    });
    for (const item of quickOnly) {
      expect(item.recipe.prepTime + item.recipe.cookTime).toBeLessThanOrEqual(25);
    }
  });
});
