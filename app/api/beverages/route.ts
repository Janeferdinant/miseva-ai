import { NextRequest, NextResponse } from "next/server";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subcategory = searchParams.get("subcategory");
  const slug = searchParams.get("slug");
  const isHot = searchParams.get("hot");
  const search = searchParams.get("q") || searchParams.get("search");

  if (slug) {
    const beverage = BEVERAGE_RECIPES.find((b) => b.slug === slug || b.id === slug);
    if (!beverage) {
      return NextResponse.json({ error: "Beverage not found" }, { status: 404 });
    }
    return NextResponse.json({ beverage });
  }

  let results = BEVERAGE_RECIPES;

  if (subcategory) {
    results = results.filter((b) => b.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  if (isHot !== null && isHot !== undefined) {
    const hotBool = isHot === "true";
    results = results.filter((b) => b.isHot === hotBool);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.titleMalayalam.includes(q) ||
        b.cuisine.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    total: results.length,
    beverages: results,
  });
}
