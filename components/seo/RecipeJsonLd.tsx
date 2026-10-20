import React from "react";
import { Recipe } from "@/lib/types/recipe";

export function buildRecipeSchemaJsonLd(recipe: Recipe) {
  const totalTimeMinutes = recipe.prepTime + recipe.cookTime;

  const dietMap: Record<string, string> = {
    vegetarian: "https://schema.org/VegetarianDiet",
    vegan: "https://schema.org/VeganDiet",
    "gluten-free": "https://schema.org/GlutenFreeDiet",
    "high-protein": "https://schema.org/LowCalorieDiet",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    headline: recipe.titleMalayalam
      ? `${recipe.title} (${recipe.titleMalayalam})`
      : recipe.title,
    image: [recipe.imageUrl],
    author: {
      "@type": "Person",
      name: "Jane Rose",
      jobTitle: "Assistant Professor, CSE",
      affiliation: {
        "@type": "Organization",
        name: "Miseva AI Culinary Research",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Miseva AI",
      url: "https://miseva.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://miseva.ai/brand/logo.svg",
      },
    },
    datePublished: "2026-10-20",
    description: recipe.description,
    recipeCuisine: recipe.cuisine,
    recipeCategory: recipe.mealType,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${totalTimeMinutes}M`,
    recipeYield: `${recipe.servings} servings`,
    suitableForDiet: recipe.dietary.map(
      (d) => dietMap[d] || "https://schema.org/RestrictedDiet"
    ),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein} grams`,
      carbohydrateContent: `${recipe.nutrition.carbs} grams`,
      fatContent: `${recipe.nutrition.fat} grams`,
    },
    recipeIngredient: recipe.ingredients.map(
      (ing) =>
        `${ing.formattedAmount || ing.amount} ${ing.unit} ${ing.name}${
          ing.nameMalayalam ? ` (${ing.nameMalayalam})` : ""
        }`
    ),
    recipeInstructions: recipe.instructions.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.text,
      url: `https://miseva.ai/recipes/${recipe.slug || recipe.id}#step-${
        step.stepNumber
      }`,
    })),
  };
}

export function RecipeJsonLd({ recipe }: { recipe: Recipe }) {
  const schema = buildRecipeSchemaJsonLd(recipe);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
