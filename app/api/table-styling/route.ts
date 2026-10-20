import { NextRequest, NextResponse } from "next/server";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const slug = searchParams.get("slug");
  const shape = searchParams.get("shape");

  if (slug) {
    const concept = TABLE_STYLING_CONCEPTS.find((c) => c.slug === slug || c.id === slug);
    if (!concept) {
      return NextResponse.json({ error: "Table styling concept not found" }, { status: 404 });
    }
    return NextResponse.json({ concept });
  }

  let results = TABLE_STYLING_CONCEPTS;

  if (collection) {
    results = results.filter((c) => c.collection.toLowerCase() === collection.toLowerCase());
  }

  if (shape) {
    results = results.filter((c) => c.tableShape.toLowerCase() === shape.toLowerCase());
  }

  return NextResponse.json({
    total: results.length,
    concepts: results,
  });
}
