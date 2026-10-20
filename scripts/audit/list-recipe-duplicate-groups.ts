import { RECIPES } from '../../lib/data/recipes';

const m = new Map<string, typeof RECIPES>();
for (const r of RECIPES) {
  if (!m.has(r.imageUrl)) m.set(r.imageUrl, []);
  m.get(r.imageUrl)!.push(r);
}

console.log(`Total Main Recipes: ${RECIPES.length}`);
console.log(`Unique Image URLs: ${m.size}`);

let count = 0;
for (const [url, dishes] of m.entries()) {
  if (dishes.length > 1) {
    count++;
    console.log(`\n--- GROUP ${count} (${dishes.length} dishes) ---`);
    console.log(`URL: ${url}`);
    for (const d of dishes) {
      console.log(`  * [${d.id}] (${d.cuisine}) ${d.title}`);
    }
  }
}
