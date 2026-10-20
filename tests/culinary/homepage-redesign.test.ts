import { describe, it, expect } from "vitest";
import { QUICK_ACTIONS } from "@/components/home/QuickActionPanel";
import { CURATED_COLLECTIONS } from "@/components/home/CuratedCollections";
import { RECIPES } from "@/lib/data/recipes";

describe("Homepage Redesign & Curated Collections", () => {
  it("should define all 6 required quick actions with working routes and Malayalam titles", () => {
    expect(QUICK_ACTIONS).toHaveLength(6);
    const routes = QUICK_ACTIONS.map((a) => a.href);
    expect(routes).toContain("/ingredient-finder");
    expect(routes).toContain("/recipes");
    expect(routes).toContain("/meal-planner");
    expect(routes).toContain("/explore");
    expect(routes).toContain("/table-styling");

    // Check Malayalam support in every quick action
    for (const action of QUICK_ACTIONS) {
      expect(action.title).toBeTruthy();
      expect(action.titleMalayalam).toBeTruthy();
      expect(/[\u0D00-\u0D7F]/.test(action.titleMalayalam)).toBe(true);
      expect(action.description).toBeTruthy();
    }
  });

  it("should define the 7 editorially curated cooking collections with valid recipe references", () => {
    expect(CURATED_COLLECTIONS.length).toBeGreaterThanOrEqual(7);
    const titles = CURATED_COLLECTIONS.map((c) => c.title);
    expect(titles).toContain("Five-Ingredient Meals");
    expect(titles).toContain("Weeknight Dinners");
    expect(titles).toContain("Traditional Kerala Lunch");
    expect(titles).toContain("One-Pot Cooking");
    expect(titles).toContain("Desserts from Around the World");
    expect(titles).toContain("Meals for Beginners");
    expect(titles).toContain("Complete Menus for Family Gatherings");

    for (const col of CURATED_COLLECTIONS) {
      expect(col.id).toBeTruthy();
      expect(col.description).toBeTruthy();
      expect(col.imageUrl).toBeTruthy();
      expect(col.recipeSlugs.length).toBeGreaterThan(0);

      // Verify that at least one recipe in each collection actually exists in RECIPES
      const matched = RECIPES.filter(
        (r) => col.recipeSlugs.includes(r.id) || col.recipeSlugs.includes(r.slug)
      );
      expect(matched.length).toBeGreaterThan(0);
    }
  });
});
