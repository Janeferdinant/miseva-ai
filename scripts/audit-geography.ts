import { RECIPES } from "../lib/data/recipes";
import { DESSERT_RECIPES } from "../lib/data/desserts";
import { BEVERAGE_RECIPES } from "../lib/data/beverages";

interface GeoEntity {
  name: string;
  count: number;
  type: string;
  dishes: string[];
}

function analyze() {
  console.log("=== TOTAL CATALOG ===");
  console.log(`Main Recipes: ${RECIPES.length}`);
  console.log(`Desserts: ${DESSERT_RECIPES.length}`);
  console.log(`Beverages: ${BEVERAGE_RECIPES.length}`);

  const byRegion: Record<string, number> = {};
  const byStateOrCountry: Record<string, number> = {};
  const byCuisine: Record<string, number> = {};

  for (const r of RECIPES) {
    byRegion[r.region] = (byRegion[r.region] || 0) + 1;
    byStateOrCountry[r.stateOrCountry] = (byStateOrCountry[r.stateOrCountry] || 0) + 1;
    byCuisine[r.cuisine] = (byCuisine[r.cuisine] || 0) + 1;
  }

  console.log("\n=== BY REGION (Macro in Recipes) ===");
  for (const [k, v] of Object.entries(byRegion).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }

  console.log("\n=== BY STATE OR COUNTRY (in Recipes) ===");
  for (const [k, v] of Object.entries(byStateOrCountry).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }

  console.log("\n=== BY CUISINE (in Recipes) ===");
  for (const [k, v] of Object.entries(byCuisine).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }

  // Also check desserts cuisines
  const dessertCuisines: Record<string, number> = {};
  for (const d of DESSERT_RECIPES) {
    dessertCuisines[d.cuisine] = (dessertCuisines[d.cuisine] || 0) + 1;
  }
  console.log("\n=== BY CUISINE (in Desserts) ===");
  for (const [k, v] of Object.entries(dessertCuisines).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }

  // Also check beverages cuisines/regions
  const bevCuisines: Record<string, number> = {};
  for (const b of BEVERAGE_RECIPES) {
    bevCuisines[b.cuisine] = (bevCuisines[b.cuisine] || 0) + 1;
  }
  console.log("\n=== BY CUISINE (in Beverages) ===");
  for (const [k, v] of Object.entries(bevCuisines).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }
}

analyze();
