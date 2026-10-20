import { NextResponse } from "next/server";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";
import { performGeographicCoverageAudit } from "@/lib/data/coverage-audit-service";

export async function GET() {
  const indianCuisines = [
    "Kerala",
    "Tamil Nadu",
    "Punjabi",
    "Karnataka",
    "Andhra & Telangana",
    "Maharashtrian",
    "Gujarati",
    "Bengali",
  ];

  const internationalCuisines = [
    "Italian",
    "Japanese",
    "Mexican",
    "Chinese",
    "Thai",
    "Middle Eastern",
  ];

  const mealCategories = [
    { name: "Breakfast", filter: (r: any) => r.mealType === "breakfast" },
    { name: "Lunch", filter: (r: any) => r.mealType === "lunch" },
    { name: "Dinner", filter: (r: any) => r.mealType === "dinner" },
    { name: "Snacks & Street Food", filter: (r: any) => r.mealType === "snack" || r.dietary?.includes("street-food") },
    { name: "Rice Dishes", filter: (r: any) => r.ingredients.some((i: any) => i.name.toLowerCase().includes("rice") || i.name.toLowerCase().includes("biryani")) || r.title.toLowerCase().includes("rice") || r.title.toLowerCase().includes("biryani") },
    { name: "Curries & Gravies", filter: (r: any) => r.title.toLowerCase().includes("curry") || r.title.toLowerCase().includes("korma") || r.title.toLowerCase().includes("dal") || r.title.toLowerCase().includes("gravy") || r.title.toLowerCase().includes("masala") || r.title.toLowerCase().includes("stew") || r.title.toLowerCase().includes("sambar") },
    { name: "Breads & Flatbreads", filter: (r: any) => /(roti|naan|paratha|parotta|dosa|appam|puri|bread|luchi|thepla|bhakri|kulcha|bhatur|pav|tortilla|taco|quesadilla)/i.test(r.title) },
  ];

  const dessertSubcategories = [
    "payasam-pradhaman",
    "traditional-mithai",
    "cakes-bakes",
    "global-desserts",
  ];

  const beverageSubcategories = [
    "fresh-juices",
    "smoothies-shakes",
    "traditional-refreshers",
    "mocktails-lemonades",
    "teas-coffees",
  ];

  const tableCollections = [
    "kerala-sadya-banquet",
    "festive-indian",
    "celebrations-banquets",
    "minimalist-rustic-outdoor",
  ];

  const audit = {
    timestamp: new Date().toISOString(),
    ruleMinimum: 10,
    status: "PASSED",
    summary: {
      totalRecipes: RECIPES.length,
      totalDesserts: DESSERT_RECIPES.length,
      totalBeverages: BEVERAGE_RECIPES.length,
      totalTableConcepts: TABLE_STYLING_CONCEPTS.length,
    },
    indianCuisines: indianCuisines.map((c) => {
      const count = RECIPES.filter(
        (r) => r.cuisine.toLowerCase() === c.toLowerCase() || r.stateOrCountry.toLowerCase() === c.toLowerCase()
      ).length;
      return { cuisine: c, count, compliant: count >= 10 };
    }),
    internationalCuisines: internationalCuisines.map((c) => {
      const count = RECIPES.filter((r) => r.cuisine.toLowerCase() === c.toLowerCase()).length;
      return { cuisine: c, count, compliant: count >= 10 };
    }),
    mealCategories: mealCategories.map((cat) => {
      const count = RECIPES.filter(cat.filter).length;
      return { category: cat.name, count, compliant: count >= 10 };
    }),
    desserts: dessertSubcategories.map((sub) => {
      const count = DESSERT_RECIPES.filter((d) => d.subcategory === sub).length;
      return { subcategory: sub, count, compliant: count >= 10 };
    }),
    beverages: beverageSubcategories.map((sub) => {
      const count = BEVERAGE_RECIPES.filter((b) => b.subcategory === sub).length;
      return { subcategory: sub, count, compliant: count >= 10 };
    }),
    tableStyling: tableCollections.map((col) => {
      const count = TABLE_STYLING_CONCEPTS.filter((t) => t.collection === col).length;
      return { collection: col, count, compliant: count >= 10 };
    }),
    geographicCoverage: performGeographicCoverageAudit(),
  };

  const allCompliant =
    audit.indianCuisines.every((c) => c.compliant) &&
    audit.internationalCuisines.every((c) => c.compliant) &&
    audit.mealCategories.every((c) => c.compliant) &&
    audit.desserts.every((c) => c.compliant) &&
    audit.beverages.every((c) => c.compliant) &&
    audit.tableStyling.every((c) => c.compliant) &&
    audit.geographicCoverage.summary.status === "PASSED";

  audit.status = allCompliant ? "PASSED" : "FAILED";

  return NextResponse.json(audit);
}
