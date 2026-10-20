import { describe, it, expect } from "vitest";
import { aggregateShoppingList } from "@/lib/shopping/shopping-aggregator";
import { RECIPES } from "@/lib/data/recipes";

describe("Smart Shopping List Aggregator", () => {
  it("aggregates ingredients from a single recipe", () => {
    const roganJosh = RECIPES.find((r) => r.id === "kas-rogan-josh");
    expect(roganJosh).toBeDefined();

    const items = aggregateShoppingList([roganJosh!]);
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.canonicalName && i.totalAmount > 0 && i.unit)).toBe(true);
    expect(items.every((i) => i.category)).toBe(true);
  });

  it("combines duplicate ingredients across multiple recipes intelligently", () => {
    // Select two recipes that both use onions, ginger/garlic, and ghee
    const biryani = RECIPES.find((r) => r.id === "up-awadhi-dum-biryani");
    const laalMaas = RECIPES.find((r) => r.id === "raj-laal-maas");
    expect(biryani).toBeDefined();
    expect(laalMaas).toBeDefined();

    const aggregated = aggregateShoppingList([biryani!, laalMaas!]);
    const gheeItem = aggregated.find((i) => i.canonicalName === "Desi Ghee");
    expect(gheeItem).toBeDefined();
    // Both use Desi Ghee; recipesIncluded should contain both
    expect(gheeItem!.recipesIncluded.length).toBe(2);
    expect(gheeItem!.totalAmount).toBeGreaterThan(0);
  });

  it("groups aggregated items into valid grocery categories", () => {
    const sampleRecipes = RECIPES.slice(0, 5);
    const aggregated = aggregateShoppingList(sampleRecipes);

    const categories = new Set(aggregated.map((i) => i.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
    for (const cat of categories) {
      expect([
        "Produce",
        "Staples & Grains",
        "Spices & Seasoning",
        "Dairy & Fats",
        "Protein & Seafood",
        "Oils & Condiments",
        "Pantry",
      ]).toContain(cat);
    }
  });

  it("converts units when aggregating compatible measurements", () => {
    const dummyRecipe1 = {
      ...RECIPES[0],
      id: "dummy-1",
      ingredients: [{ name: "Basmati Rice", nameMalayalam: "അരി", amount: 500, unit: "g", category: "staple" as const }],
    };
    const dummyRecipe2 = {
      ...RECIPES[0],
      id: "dummy-2",
      ingredients: [{ name: "Basmati Rice", nameMalayalam: "അരി", amount: 1, unit: "kg", category: "staple" as const }],
    };

    const aggregated = aggregateShoppingList([dummyRecipe1, dummyRecipe2]);
    const rice = aggregated.find((i) => i.canonicalName.includes("Basmati Rice"));
    expect(rice).toBeDefined();
    // 500g + 1000g = 1500g -> formatted to 1.5 kg
    expect(rice!.totalAmount).toBe(1.5);
    expect(rice!.unit).toBe("kg");
  });
});
