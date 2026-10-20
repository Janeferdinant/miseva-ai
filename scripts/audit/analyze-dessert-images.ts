import fs from 'fs';
import { DESSERT_RECIPES } from '../../lib/data/desserts';

console.log('Total Desserts:', DESSERT_RECIPES.length);
const urlMap = new Map<string, string[]>();

for (const d of DESSERT_RECIPES) {
  const existing = urlMap.get(d.imageUrl) || [];
  existing.push(`${d.id} (${d.title})`);
  urlMap.set(d.imageUrl, existing);
}

console.log('Unique Image URLs count:', urlMap.size);
for (const [url, recipes] of urlMap.entries()) {
  console.log(`\nURL: ${url}`);
  console.log(`Used by (${recipes.length}):`);
  for (const r of recipes) {
    console.log(` - ${r}`);
  }
}
