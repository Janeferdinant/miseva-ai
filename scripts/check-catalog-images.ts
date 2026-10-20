import { RECIPES } from '../lib/data/recipes';
import { BEVERAGE_RECIPES } from '../lib/data/beverages';

console.log('Total Main Recipes:', RECIPES.length);
const recUrlMap = new Map<string, number>();
for (const r of RECIPES) {
  recUrlMap.set(r.imageUrl, (recUrlMap.get(r.imageUrl) || 0) + 1);
}
console.log('Unique Image URLs in Main Recipes:', recUrlMap.size);

console.log('Total Beverages:', BEVERAGE_RECIPES.length);
const bevUrlMap = new Map<string, number>();
for (const b of BEVERAGE_RECIPES) {
  bevUrlMap.set(b.imageUrl, (bevUrlMap.get(b.imageUrl) || 0) + 1);
}
console.log('Unique Image URLs in Beverages:', bevUrlMap.size);
