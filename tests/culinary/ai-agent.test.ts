import { describe, it, expect } from "vitest";
import {
  processChefQuery,
  matchRecipesByPantry,
  getSubstitutionSuggestion,
} from "@/lib/ai/cooking-agent";

describe("AI Cooking Studio & Conversational Chef Agent", () => {
  it("should recognize pantry ingredient intent and recommend matched recipes", () => {
    const query = "What can I cook with coconut and plantain?";
    const response = processChefQuery(query);

    expect(response.intent).toBe("FIND_BY_INGREDIENTS");
    expect(response.suggestedRecipes.length).toBeGreaterThan(0);
    // Should match Kerala Avial
    const titles = response.suggestedRecipes.map((r) => r.title);
    expect(titles.some((t) => t.includes("Avial"))).toBe(true);
  });

  it("should answer culinary technique questions accurately", () => {
    const query = "Why do we add raw coconut oil at the end of avial?";
    const response = processChefQuery(query);

    expect(response.intent).toBe("EXPLAIN_TECHNIQUE");
    expect(response.reply.length).toBeGreaterThan(50);
    expect(response.reply.toLowerCase()).toContain("aroma");
  });

  it("should provide authentic culinary substitutions", () => {
    const sub = getSubstitutionSuggestion("sour curd");
    expect(sub).toBeDefined();
    expect(sub?.alternatives.length).toBeGreaterThan(0);
    expect(sub?.alternatives.some((a) => a.toLowerCase().includes("mango") || a.toLowerCase().includes("tamarind") || a.toLowerCase().includes("lemon"))).toBe(true);
  });

  it("should match pantry items against the recipe database with match percentages", () => {
    const matches = matchRecipesByPantry(["coconut", "yam", "drumsticks", "plantain"]);
    expect(matches.length).toBeGreaterThan(0);

    const top = matches[0];
    expect(top.recipe).toBeDefined();
    expect(top.matchPercentage).toBeGreaterThanOrEqual(20);
    expect(top.matchedIngredients.length).toBeGreaterThan(0);
  });
});
