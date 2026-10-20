import { RECIPES } from '../../lib/data/recipes';
import { DESSERT_RECIPES } from '../../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../../lib/data/beverages';
import { TABLE_STYLING_CONCEPTS } from '../../lib/data/table-styling-concepts';

console.log('--- Checking Duplicates and Missing Images across All Tabs ---');

function checkTab(tabName: string, items: any[], imgKey = 'imageUrl') {
  const map = new Map<string, string[]>();
  const missing: string[] = [];

  for (const item of items) {
    const url = item[imgKey];
    if (!url || typeof url !== 'string' || url.trim() === '') {
      missing.push(`${item.id} (${item.title || item.name})`);
    } else {
      const list = map.get(url) || [];
      list.push(`${item.id} (${item.title || item.name})`);
      map.set(url, list);
    }
  }

  let dupGroups = 0;
  console.log(`\n=== Tab: ${tabName} ===`);
  console.log(`Total items: ${items.length}`);
  console.log(`Unique URLs: ${map.size}`);
  console.log(`Missing URLs: ${missing.length}`);

  for (const [url, list] of map.entries()) {
    if (list.length > 1) {
      dupGroups++;
      console.log(`Duplicate URL (${list.length} items): ${url}`);
      list.forEach(i => console.log('   * ' + i));
    }
  }
  if (dupGroups === 0 && missing.length === 0) {
    console.log(`✅ 100% Unique and No Missing Images in ${tabName}!`);
  }
}

checkTab('Main Recipes', RECIPES);
checkTab('Desserts', DESSERT_RECIPES);
checkTab('Beverages', BEVERAGE_RECIPES);
checkTab('Table Styling (moodBoardImageUrl)', TABLE_STYLING_CONCEPTS, 'moodBoardImageUrl');

console.log('\n=== Checking Cross-Tab URL Collisions ===');
const allTabUrls = new Map<string, { tab: string; id: string; name: string }[]>();

function collectUrls(tab: string, items: any[], key = 'imageUrl') {
  for (const item of items) {
    const url = item[key];
    if (url) {
      const list = allTabUrls.get(url) || [];
      list.push({ tab, id: item.id, name: item.title || item.name });
      allTabUrls.set(url, list);
    }
  }
}

collectUrls('Main Recipes', RECIPES);
collectUrls('Desserts', DESSERT_RECIPES);
collectUrls('Beverages', BEVERAGE_RECIPES);
collectUrls('Table Styling', TABLE_STYLING_CONCEPTS, 'moodBoardImageUrl');

let crossDupes = 0;
for (const [url, list] of allTabUrls.entries()) {
  const tabs = new Set(list.map(x => x.tab));
  if (tabs.size > 1) {
    crossDupes++;
    console.log(`Cross-tab duplicate: ${url}`);
    list.forEach(x => console.log(`   - [${x.tab}] ${x.id}: ${x.name}`));
  }
}

if (crossDupes === 0) {
  console.log('✅ 0 Cross-tab duplicate URLs! Every tab has completely distinct images.');
} else {
  console.log(`❌ Found ${crossDupes} cross-tab duplicate URLs.`);
}
