import { NextRequest, NextResponse } from "next/server";
import { RECIPES, getRecipeById, getRecipesByCuisine, getRecipesByRegion, searchRecipes } from "@/lib/data/recipes";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");
  const cuisine = searchParams.get("cuisine");
  const region = searchParams.get("region");
  const search = searchParams.get("q") || searchParams.get("search");
  const mealType = searchParams.get("mealType");

  if (id || slug) {
    const recipe = getRecipeById(id || slug || "");
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json({ recipe });
  }

  let results = RECIPES;

  if (search) {
    results = searchRecipes(search);
  }

  if (cuisine) {
    results = results.filter((r) => r.cuisine.toLowerCase() === cuisine.toLowerCase());
  }

  if (region) {
    results = results.filter((r) => r.region.toLowerCase() === region.toLowerCase());
  }

  if (mealType) {
    results = results.filter((r) => r.mealType.toLowerCase() === mealType.toLowerCase());
  }

  return NextResponse.json({
    total: results.length,
    recipes: results,
  });
}
