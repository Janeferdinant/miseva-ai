import { TABLE_STYLING_CONCEPTS } from '../../lib/data/table-styling-concepts';
import { RECIPES } from '../../lib/data/recipes';
import { DESSERT_RECIPES } from '../../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../../lib/data/beverages';

console.log('=== TABLE STYLING IMAGES AUDIT ===');
console.log('Total Table Styling Concepts:', TABLE_STYLING_CONCEPTS.length);

const urlMap = new Map<string, Array<{ id: string; title: string; collection?: string }>>();

for (const c of TABLE_STYLING_CONCEPTS) {
  const list = urlMap.get(c.moodBoardImageUrl) || [];
  list.push({ id: c.id, title: c.title, collection: c.collection });
  urlMap.set(c.moodBoardImageUrl, list);
}

console.log('Unique Image URLs in Table Styling:', urlMap.size);

let duplicateGroups = 0;
for (const [url, items] of urlMap.entries()) {
  if (items.length > 1) {
    duplicateGroups++;
    console.log(`\nDuplicate Group ${duplicateGroups} (${items.length} items):`);
    console.log(`URL: ${url}`);
    for (const item of items) {
      console.log(`  - [${item.id}] (${item.collection}) ${item.title}`);
    }
  }
}

// Also check cross-tab duplicates with recipes, desserts, and beverages
const catalogUrls = new Map<string, string>();
for (const r of RECIPES) catalogUrls.set(r.imageUrl, `Main: ${r.title} (${r.id})`);
for (const d of DESSERT_RECIPES) catalogUrls.set(d.imageUrl, `Dessert: ${d.title} (${d.id})`);
for (const b of BEVERAGE_RECIPES) catalogUrls.set(b.imageUrl, `Beverage: ${b.title} (${b.id})`);

console.log('\n=== CROSS-TAB OVERLAP CHECK ===');
let crossTabCount = 0;
for (const c of TABLE_STYLING_CONCEPTS) {
  if (catalogUrls.has(c.moodBoardImageUrl)) {
    crossTabCount++;
    console.log(`Table styling item [${c.id}] shares image with: ${catalogUrls.get(c.moodBoardImageUrl)}`);
    console.log(`URL: ${c.moodBoardImageUrl}`);
  }
}
console.log(`Total Cross-Tab Overlaps: ${crossTabCount}`);
