import { RECIPES } from '../../lib/data/recipes';
import { DESSERT_RECIPES } from '../../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../../lib/data/beverages';
import fs from 'fs';

const lines: string[] = [];
lines.push(`// MAIN RECIPES (${RECIPES.length})`);
for (const r of RECIPES) {
  lines.push(`"${r.id}": "", // [${r.cuisine}] ${r.title}`);
}
lines.push(`\n// DESSERTS (${DESSERT_RECIPES.length})`);
for (const d of DESSERT_RECIPES) {
  lines.push(`"${d.id}": "", // [${d.subcategory}] ${d.title}`);
}
lines.push(`\n// BEVERAGES (${BEVERAGE_RECIPES.length})`);
for (const b of BEVERAGE_RECIPES) {
  lines.push(`"${b.id}": "", // [${b.subcategory}] ${b.title}`);
}

fs.writeFileSync('scripts/audit/dish-catalog-list.txt', lines.join('\n'), 'utf-8');
console.log('Exported dish catalogue list to scripts/dish-catalog-list.txt');
