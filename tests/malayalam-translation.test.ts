import { describe, it, expect } from "vitest";
import { RECIPES } from "../lib/data/recipes";
import { DESSERT_RECIPES } from "../lib/data/desserts";
import { BEVERAGE_RECIPES } from "../lib/data/beverages";
import { formatMalayalamRecipeView } from "../components/MalayalamRecipeView";

describe("Dedicated Malayalam Translation Suite ('മലയാളത്തിൽ വായിക്കുക')", () => {
  const sampleMainRecipe = RECIPES.find((r) => r.id === "kerala-sadya-feast") || RECIPES[0];
  const sampleDessert = DESSERT_RECIPES.find((d) => d.id === "des-palada-pradhaman") || DESSERT_RECIPES[0];
  const sampleBeverage = BEVERAGE_RECIPES.find((b) => b.id === "bev-sambharam") || BEVERAGE_RECIPES[0];

  it("should format a complete Malayalam recipe view with preserved quantities and units", () => {
    const formatted = formatMalayalamRecipeView(sampleMainRecipe);
    expect(formatted).toBeDefined();
    expect(formatted.titleMalayalam).toBe(sampleMainRecipe.titleMalayalam);
    expect(formatted.descriptionMalayalam).toBe(sampleMainRecipe.descriptionMalayalam);

    // Verify ingredients count is identical (never silently omit ingredients)
    expect(formatted.ingredients).toHaveLength(sampleMainRecipe.ingredients.length);

    // Verify quantities and units are strictly preserved
    sampleMainRecipe.ingredients.forEach((orig, idx) => {
      const trans = formatted.ingredients[idx];
      expect(trans.amount).toBe(orig.amount);
      expect(trans.unit).toBe(orig.unit);
      expect(trans.nameMalayalam.length).toBeGreaterThan(0);
      // Contains valid Malayalam Unicode characters
      expect(/[\u0D00-\u0D7F]/.test(trans.nameMalayalam)).toBe(true);
    });
  });

  it("should preserve the exact sequence and step order of cooking instructions", () => {
    const formatted = formatMalayalamRecipeView(sampleDessert);
    expect(formatted.instructions).toHaveLength(sampleDessert.instructions.length);

    sampleDessert.instructions.forEach((origStep, idx) => {
      const transStep = formatted.instructions[idx];
      expect(transStep.stepNumber).toBe(origStep.stepNumber);
      expect(transStep.stepNumber).toBe(idx + 1);
      expect(transStep.textMalayalam.length).toBeGreaterThan(0);
      expect(/[\u0D00-\u0D7F]/.test(transStep.textMalayalam)).toBe(true);
    });
  });

  it("should format food safety and storage notes in Malayalam", () => {
    const formatted = formatMalayalamRecipeView(sampleMainRecipe);
    expect(formatted.foodSafetyNotesMalayalam).toBeDefined();
    expect(formatted.foodSafetyNotesMalayalam.length).toBeGreaterThan(0);
    expect(/[\u0D00-\u0D7F]/.test(formatted.foodSafetyNotesMalayalam)).toBe(true);
  });

  it("should support desserts and beverages seamlessly", () => {
    const formattedDessert = formatMalayalamRecipeView(sampleDessert);
    expect(formattedDessert.titleMalayalam).toContain("പാലട");

    const formattedBeverage = formatMalayalamRecipeView(sampleBeverage);
    expect(formattedBeverage.titleMalayalam.length).toBeGreaterThan(0);
    expect(formattedBeverage.ingredients.length).toBe(sampleBeverage.ingredients.length);
  });

  it("should operate completely independently of speech synthesis / audio playback", () => {
    const formatted = formatMalayalamRecipeView(sampleMainRecipe);
    // Translation data is purely textual and declarative, requiring no audio subsystem
    expect(typeof formatted.titleMalayalam).toBe("string");
    expect(Array.isArray(formatted.ingredients)).toBe(true);
    expect(Array.isArray(formatted.instructions)).toBe(true);
  });
});
