import { RECIPES } from '../lib/data/recipes';
import { DESSERT_RECIPES } from '../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../lib/data/beverages';

console.log('=== FULL CATALOG IMAGE AUDIT REPORT ===');
console.log(`Main Recipes: ${RECIPES.length}`);
console.log(`Desserts: ${DESSERT_RECIPES.length}`);
console.log(`Beverages: ${BEVERAGE_RECIPES.length}`);
const totalDishes = RECIPES.length + DESSERT_RECIPES.length + BEVERAGE_RECIPES.length;
console.log(`Total Culinary Dishes: ${totalDishes}`);

const urlUsage = new Map<string, Array<{ id: string; title: string; category: string }>>();

function recordDish(id: string, title: string, category: string, imageUrl: string) {
  if (!urlUsage.has(imageUrl)) {
    urlUsage.set(imageUrl, []);
  }
  urlUsage.get(imageUrl)!.push({ id, title, category });
}

for (const r of RECIPES) {
  recordDish(r.id, r.title, `Main (${r.cuisine})`, r.imageUrl);
}
for (const d of DESSERT_RECIPES) {
  recordDish(d.id, d.title, `Dessert (${d.subcategory})`, d.imageUrl);
}
for (const b of BEVERAGE_RECIPES) {
  recordDish(b.id, b.title, `Beverage (${b.subcategory})`, b.imageUrl);
}

console.log(`Unique Image URLs across entire catalog: ${urlUsage.size}`);
let duplicateCount = 0;
for (const [url, dishes] of urlUsage.entries()) {
  if (dishes.length > 1) {
    duplicateCount++;
    console.log(`\nDUPLICATE GROUP #${duplicateCount} (${dishes.length} dishes):`);
    console.log(`URL: ${url}`);
    for (const d of dishes) {
      console.log(` - [${d.id}] (${d.category}) ${d.title}`);
    }
  }
}

console.log(`\nTotal Duplicate Groups: ${duplicateCount}`);
