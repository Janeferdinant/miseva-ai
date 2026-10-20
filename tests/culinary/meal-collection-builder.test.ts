import { describe, it, expect } from "vitest";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";

describe("Meal Collection Builder Data & Component Integrity", () => {
  it("contains valid collections linked to appropriate theme IDs", () => {
    for (const c of CURATED_MEAL_COLLECTIONS) {
      expect(c.title).toBeTruthy();
      expect(c.description).toBeTruthy();
      expect(c.dishes.length).toBeGreaterThanOrEqual(3);
      expect(c.idealThemeId).toBeTruthy();
      expect(c.beveragePairing).toBeDefined();
    }
  });

  it("verifies culinary catalog contains dishes suitable for multi-course meal construction", () => {
    expect(RECIPES.length).toBe(140);
    expect(DESSERT_RECIPES.length).toBe(40);
    expect(BEVERAGE_RECIPES.length).toBe(50);
  });
});
