import { describe, it, expect } from "vitest";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";

describe("Luxury Table Themes & Curated Meal Collections", () => {
  it("defines exactly 10 distinct luxury dining themes with full storytelling", () => {
    expect(LUXURY_TABLE_THEMES.length).toBe(10);
    const ids = new Set(LUXURY_TABLE_THEMES.map((t) => t.id));
    expect(ids.size).toBe(10);

    for (const theme of LUXURY_TABLE_THEMES) {
      expect(theme.id).toBeDefined();
      expect(theme.slug).toBeDefined();
      expect(theme.title).toBeDefined();
      expect(theme.titleMalayalam).toBeDefined();
      expect(theme.catchphrase).toBeDefined();
      expect(theme.catchphrase.length).toBeGreaterThan(10);
      expect(theme.description).toBeDefined();
      expect(theme.tableware.cutleryFinish).toBeDefined();
      expect(theme.tableware.plateStyle).toBeDefined();
      expect(theme.tableware.glasswareStyle).toBeDefined();
      expect(theme.tableware.linensStyle).toBeDefined();
      expect(theme.moodBoardImageUrl).toBeDefined();
      expect(theme.colorPalette.primary).toBeDefined();
    }
  });

  it("ensures zero cross-tab image duplicate collisions between the 10 luxury themes and 230 culinary recipes", () => {
    const foodUrls = new Set([
      ...RECIPES.map((r) => r.imageUrl),
      ...DESSERT_RECIPES.map((d) => d.imageUrl),
      ...BEVERAGE_RECIPES.map((b) => b.imageUrl),
    ]);

    const themeUrls = new Set<string>();
    for (const theme of LUXURY_TABLE_THEMES) {
      expect(foodUrls.has(theme.moodBoardImageUrl)).toBe(false);
      expect(themeUrls.has(theme.moodBoardImageUrl)).toBe(false);
      themeUrls.add(theme.moodBoardImageUrl);
    }
    expect(themeUrls.size).toBe(10);
  });

  it("defines 6 curated meal collections with compatible dish groupings and course sequences", () => {
    expect(CURATED_MEAL_COLLECTIONS.length).toBe(6);
    for (const meal of CURATED_MEAL_COLLECTIONS) {
      expect(meal.id).toBeDefined();
      expect(meal.title).toBeDefined();
      expect(meal.titleMalayalam).toBeDefined();
      expect(meal.catchphrase).toBeDefined();
      expect(meal.dishes.length).toBeGreaterThanOrEqual(3);
      expect(meal.beveragePairing).toBeDefined();
      expect(meal.courseOrder.length).toBeGreaterThanOrEqual(3);
      expect(meal.idealThemeId).toBeDefined();
    }
  });
});
