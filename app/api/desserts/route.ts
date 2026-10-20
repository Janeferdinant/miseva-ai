import { NextRequest, NextResponse } from "next/server";
import { DESSERT_RECIPES } from "@/lib/data/desserts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subcategory = searchParams.get("subcategory");
  const slug = searchParams.get("slug");
  const search = searchParams.get("q") || searchParams.get("search");

  if (slug) {
    const dessert = DESSERT_RECIPES.find((d) => d.slug === slug || d.id === slug);
    if (!dessert) {
      return NextResponse.json({ error: "Dessert not found" }, { status: 404 });
    }
    return NextResponse.json({ dessert });
  }

  let results = DESSERT_RECIPES;

  if (subcategory) {
    results = results.filter((d) => d.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.titleMalayalam.includes(q) ||
        d.cuisine.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    total: results.length,
    desserts: results,
  });
}
