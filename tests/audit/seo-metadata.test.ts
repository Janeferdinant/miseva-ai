import { describe, it, expect } from "vitest";
import { RECIPES } from "@/lib/data/recipes";
import { buildRecipeSchemaJsonLd } from "@/components/seo/RecipeJsonLd";

describe("Recipe SEO Structured Data & Schema.org Rich Snippets", () => {
  const sampleRecipe = RECIPES.find((r) => r.id === "kerala-avial") || RECIPES[0];

  it("should generate a valid Schema.org Recipe JSON-LD object", () => {
    const jsonLd = buildRecipeSchemaJsonLd(sampleRecipe);

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Recipe");
    expect(jsonLd.name).toBe(sampleRecipe.title);
    expect(jsonLd.description).toBe(sampleRecipe.description);
    expect(jsonLd.recipeCuisine).toBe(sampleRecipe.cuisine);
    expect(jsonLd.image).toBeDefined();
    expect(Array.isArray(jsonLd.image)).toBe(true);
    expect(jsonLd.image[0]).toBe(sampleRecipe.imageUrl);
  });

  it("should format prep, cook, and total times in valid ISO 8601 duration format", () => {
    const jsonLd = buildRecipeSchemaJsonLd(sampleRecipe);

    expect(jsonLd.prepTime).toBe(`PT${sampleRecipe.prepTime}M`);
    expect(jsonLd.cookTime).toBe(`PT${sampleRecipe.cookTime}M`);
    expect(jsonLd.totalTime).toBe(`PT${sampleRecipe.prepTime + sampleRecipe.cookTime}M`);
  });

  it("should include complete ingredients and HowToStep instructions", () => {
    const jsonLd = buildRecipeSchemaJsonLd(sampleRecipe);

    expect(jsonLd.recipeIngredient.length).toBe(sampleRecipe.ingredients.length);
    for (const ing of jsonLd.recipeIngredient) {
      expect(typeof ing).toBe("string");
      expect(ing.length).toBeGreaterThan(0);
    }

    expect(jsonLd.recipeInstructions.length).toBe(sampleRecipe.instructions.length);
    for (const step of jsonLd.recipeInstructions) {
      expect(step["@type"]).toBe("HowToStep");
      expect(step.name).toBeTruthy();
      expect(step.text).toBeTruthy();
    }
  });

  it("should preserve nutrition information and academic creator attribution", () => {
    const jsonLd = buildRecipeSchemaJsonLd(sampleRecipe);

    expect(jsonLd.nutrition["@type"]).toBe("NutritionInformation");
    expect(jsonLd.nutrition.calories).toContain(sampleRecipe.nutrition.calories.toString());
    expect(jsonLd.nutrition.proteinContent).toContain(sampleRecipe.nutrition.protein.toString());

    expect(jsonLd.author["@type"]).toBe("Person");
    expect(jsonLd.author.name).toBe("Jane Rose");
    expect(jsonLd.author.jobTitle).toBe("Assistant Professor, CSE");
  });
});
