import { describe, it, expect } from "vitest";
import { RECIPES, getRecipeById, getRecipesByRegion, getRecipesByCuisine } from "../lib/data/recipes";
import { scaleRecipe, formatQuantity } from "../lib/recipes/scaling";
import { INDIAN_REGIONS, GLOBAL_CUISINES } from "../lib/data/cuisines";

describe("Recipe Taxonomy & Database", () => {
  it("should have comprehensive Indian states and global cuisines registered", () => {
    expect(INDIAN_REGIONS.length).toBeGreaterThanOrEqual(10);
    expect(GLOBAL_CUISINES.length).toBeGreaterThanOrEqual(6);
  });

  it("should include rich authentic recipes with English and Malayalam details", () => {
    expect(RECIPES.length).toBeGreaterThanOrEqual(15);
    
    // Check Kerala recipe presence
    const keralaRecipes = RECIPES.filter(
      (r) => r.stateOrCountry.toLowerCase() === "kerala"
    );
    expect(keralaRecipes.length).toBeGreaterThanOrEqual(2);

    for (const recipe of RECIPES) {
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.titleMalayalam).toBeDefined();
      expect(recipe.ingredients.length).toBeGreaterThan(0);
      expect(recipe.instructions.length).toBeGreaterThan(0);
      expect(recipe.nutrition).toBeDefined();
      expect(recipe.foodSafety).toBeDefined();

      // Check bilingual instructions
      for (const step of recipe.instructions) {
        expect(step.text).toBeDefined();
        expect(step.textMalayalam).toBeDefined();
      }
    }
  });

  it("should retrieve recipes by id correctly", () => {
    const first = RECIPES[0];
    const retrieved = getRecipeById(first.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe(first.title);
  });

  it("should filter by regional cuisine", () => {
    const southIndian = getRecipesByRegion("South India");
    expect(southIndian.length).toBeGreaterThan(0);
  });
});

describe("Recipe Ingredient Scaling", () => {
  it("should scale ingredient quantities proportionally", () => {
    const sampleRecipe = RECIPES[0];
    const defaultServings = sampleRecipe.servings;
    const targetServings = defaultServings * 2;

    const scaled = scaleRecipe(sampleRecipe, targetServings);
    expect(scaled.servings).toBe(targetServings);

    // Quantity should be doubled
    const origFirst = sampleRecipe.ingredients[0];
    const scaledFirst = scaled.ingredients[0];
    expect(scaledFirst.amount).toBeCloseTo(origFirst.amount * 2, 2);
  });

  it("should format quantities into clean fractions", () => {
    expect(formatQuantity(0.5)).toBe("1/2");
    expect(formatQuantity(0.25)).toBe("1/4");
    expect(formatQuantity(0.75)).toBe("3/4");
    expect(formatQuantity(1.5)).toBe("1 1/2");
    expect(formatQuantity(2)).toBe("2");
    expect(formatQuantity(0)).toBe("0");
  });
});
