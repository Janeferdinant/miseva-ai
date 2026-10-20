import { TABLE_STYLING_CONCEPTS } from '../../lib/data/table-styling-concepts';
import { RECIPES } from '../../lib/data/recipes';
import { DESSERT_RECIPES } from '../../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../../lib/data/beverages';

console.log('=== DEEP IMAGE INVENTORY REPORT ===');

console.log(`Main Recipes: ${RECIPES.length}`);
console.log(`Desserts: ${DESSERT_RECIPES.length}`);
console.log(`Beverages: ${BEVERAGE_RECIPES.length}`);
console.log(`Table Styling Concepts: ${TABLE_STYLING_CONCEPTS.length}`);

// Check Table Styling moodBoardImageUrl and topDownLayoutImageUrl
const tsMoodMap = new Map<string, string[]>();
const tsTopDownMap = new Map<string, string[]>();

for (const c of TABLE_STYLING_CONCEPTS) {
  const mList = tsMoodMap.get(c.moodBoardImageUrl) || [];
  mList.push(`${c.id} (${c.title})`);
  tsMoodMap.set(c.moodBoardImageUrl, mList);

  if (c.topDownLayoutImageUrl) {
    const tList = tsTopDownMap.get(c.topDownLayoutImageUrl) || [];
    tList.push(`${c.id} (${c.title})`);
    tsTopDownMap.set(c.topDownLayoutImageUrl, tList);
  }
}

console.log('\n--- Table Styling Moodboard Images ---');
console.log(`Total concepts: ${TABLE_STYLING_CONCEPTS.length}, Unique moodboard URLs: ${tsMoodMap.size}`);
for (const [url, items] of tsMoodMap.entries()) {
  if (items.length > 1) {
    console.log(`Duplicate moodboard image (${items.length} concepts): ${url}`);
    for (const it of items) console.log(`   * ${it}`);
  }
}

console.log('\n--- Table Styling Top-Down Layout Images ---');
console.log(`Total concepts: ${TABLE_STYLING_CONCEPTS.length}, Unique top-down URLs: ${tsTopDownMap.size}`);
for (const [url, items] of tsTopDownMap.entries()) {
  if (items.length > 1) {
    console.log(`Duplicate top-down image (${items.length} concepts): ${url}`);
  }
}
