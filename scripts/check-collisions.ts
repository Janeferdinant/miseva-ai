import { TABLE_STYLING_CONCEPTS } from "../lib/data/table-styling-concepts";
import { RECIPES } from "../lib/data/recipes";
import { DESSERT_RECIPES } from "../lib/data/desserts";
import { BEVERAGE_RECIPES } from "../lib/data/beverages";

const foodUrls = new Set([
  ...RECIPES.map((r) => r.imageUrl),
  ...DESSERT_RECIPES.map((d) => d.imageUrl),
  ...BEVERAGE_RECIPES.map((b) => b.imageUrl),
]);

console.log("Checking collisions between table styling and food catalog...");
for (const c of TABLE_STYLING_CONCEPTS) {
  if (foodUrls.has(c.moodBoardImageUrl)) {
    console.log(`COLLISION on concept [${c.id}] ${c.title}: ${c.moodBoardImageUrl}`);
  }
}
