import { describe, it, expect } from "vitest";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";

describe("Database Coverage Audit — 10+ Minimum Rule Enforcement", () => {
  it("should have zero duplicate IDs or slugs across the entire recipe database", () => {
    const ids = new Set<string>();
    const slugs = new Set<string>();
    const titles = new Set<string>();

    for (const recipe of RECIPES) {
      expect(ids.has(recipe.id), `Duplicate recipe ID detected: ${recipe.id}`).toBe(false);
      expect(slugs.has(recipe.slug), `Duplicate recipe slug detected: ${recipe.slug}`).toBe(false);
      expect(titles.has(recipe.title.toLowerCase()), `Duplicate recipe title detected: ${recipe.title}`).toBe(false);

      ids.add(recipe.id);
      slugs.add(recipe.slug);
      titles.add(recipe.title.toLowerCase());
    }
  });

  it("should contain at least 10 distinct recipes for every published Indian regional cuisine", () => {
    const targetCuisines = [
      "Kerala",
      "Tamil Nadu",
      "Punjabi",
      "Karnataka",
      "Andhra & Telangana",
      "Maharashtrian",
      "Gujarati",
      "Bengali",
    ];

    for (const cuisine of targetCuisines) {
      const matching = RECIPES.filter(
        (r) => r.cuisine.toLowerCase() === cuisine.toLowerCase() ||
               r.stateOrCountry.toLowerCase() === cuisine.toLowerCase()
      );
      expect(
        matching.length,
        `Cuisine '${cuisine}' failed minimum recipe requirement: found ${matching.length}, expected >= 10`
      ).toBeGreaterThanOrEqual(10);
    }
  });

  it("should contain at least 10 distinct recipes for every published International cuisine", () => {
    const targetCuisines = [
      "Italian",
      "Japanese",
      "Mexican",
      "Chinese",
      "Thai",
      "Middle Eastern",
    ];

    for (const cuisine of targetCuisines) {
      const matching = RECIPES.filter(
        (r) => r.cuisine.toLowerCase() === cuisine.toLowerCase()
      );
      expect(
        matching.length,
        `International cuisine '${cuisine}' failed minimum recipe requirement: found ${matching.length}, expected >= 10`
      ).toBeGreaterThanOrEqual(10);
    }
  });

  it("should contain at least 10 distinct recipes for every major meal and culinary category", () => {
    const categories = [
      { name: "Breakfast", filter: (r: any) => r.mealType === "breakfast" },
      { name: "Lunch", filter: (r: any) => r.mealType === "lunch" },
      { name: "Dinner", filter: (r: any) => r.mealType === "dinner" },
      { name: "Snacks & Street Food", filter: (r: any) => r.mealType === "snack" || r.dietary?.includes("street-food") },
      { name: "Rice Dishes", filter: (r: any) => r.ingredients.some((i: any) => i.name.toLowerCase().includes("rice") || i.name.toLowerCase().includes("biryani")) || r.title.toLowerCase().includes("rice") || r.title.toLowerCase().includes("biryani") },
      { name: "Curries & Gravies", filter: (r: any) => r.title.toLowerCase().includes("curry") || r.title.toLowerCase().includes("korma") || r.title.toLowerCase().includes("dal") || r.title.toLowerCase().includes("gravy") || r.title.toLowerCase().includes("masala") || r.title.toLowerCase().includes("stew") || r.title.toLowerCase().includes("sambar") },
      { name: "Breads & Flatbreads", filter: (r: any) => /(roti|naan|paratha|parotta|dosa|appam|puri|bread|luchi|thepla|bhakri|kulcha|bhatur|pav|tortilla|taco|quesadilla)/i.test(r.title) },
    ];

    for (const cat of categories) {
      const matching = RECIPES.filter(cat.filter);
      expect(
        matching.length,
        `Category '${cat.name}' failed minimum recipe requirement: found ${matching.length}, expected >= 10`
      ).toBeGreaterThanOrEqual(10);
    }
  });

  it("should contain at least 10 distinct recipes in every published dessert subcategory", () => {
    const dessertSubcategories = [
      "payasam-pradhaman",
      "traditional-mithai",
      "cakes-bakes",
      "global-desserts",
    ];

    for (const sub of dessertSubcategories) {
      const matching = DESSERT_RECIPES.filter((d) => d.subcategory === sub);
      expect(
        matching.length,
        `Dessert subcategory '${sub}' failed minimum rule: found ${matching.length}, expected >= 10`
      ).toBeGreaterThanOrEqual(10);
    }
  });

  it("should contain at least 10 distinct recipes in every published beverage subcategory", () => {
    const beverageSubcategories = [
      "fresh-juices",
      "smoothies-shakes",
      "traditional-refreshers",
      "mocktails-lemonades",
      "teas-coffees",
    ];

    for (const sub of beverageSubcategories) {
      const matching = BEVERAGE_RECIPES.filter((b) => b.subcategory === sub);
      expect(
        matching.length,
        `Beverage subcategory '${sub}' failed minimum rule: found ${matching.length}, expected >= 10`
      ).toBeGreaterThanOrEqual(10);
    }
  });

  it("should contain at least 10 complete concepts in every published table styling collection", () => {
    const stylingCollections = [
      "kerala-sadya-banquet",
      "festive-indian",
      "celebrations-banquets",
      "minimalist-rustic-outdoor",
    ];

    for (const col of stylingCollections) {
      const matching = TABLE_STYLING_CONCEPTS.filter((c) => c.collection === col);
      expect(
        matching.length,
        `Table styling collection '${col}' failed minimum rule: found ${matching.length}, expected >= 10`
      ).toBeGreaterThanOrEqual(10);
    }
  });
});
