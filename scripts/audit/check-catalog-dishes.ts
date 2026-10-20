import { RECIPES } from '../../lib/data/recipes';
import { DESSERT_RECIPES } from '../../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../../lib/data/beverages';

console.log('=== CHECKING RECIPES, DESSERTS, BEVERAGES ===');

function checkCollection(name: string, list: Array<{ id: string; title: string; imageUrl?: string }>) {
  console.log(`\nChecking ${name} (${list.length} items)...`);
  const missing = list.filter(item => !item.imageUrl || item.imageUrl.trim() === '');
  if (missing.length > 0) {
    console.log(`❌ Found ${missing.length} items with MISSING / EMPTY imageUrl:`);
    for (const m of missing) console.log(`   - [${m.id}] ${m.title}`);
  } else {
    console.log(`✅ All ${list.length} items have an imageUrl.`);
  }

  const urlMap = new Map<string, string[]>();
  for (const item of list) {
    if (!item.imageUrl) continue;
    const l = urlMap.get(item.imageUrl) || [];
    l.push(`${item.id} (${item.title})`);
    urlMap.set(item.imageUrl, l);
  }
  const duplicates = Array.from(urlMap.entries()).filter(([_, items]) => items.length > 1);
  if (duplicates.length > 0) {
    console.log(`⚠️ Found ${duplicates.length} duplicate image groups in ${name}:`);
    for (const [url, items] of duplicates) {
      console.log(`   URL: ${url}`);
      for (const it of items) console.log(`     * ${it}`);
    }
  } else {
    console.log(`✅ 100% unique images in ${name}! (${urlMap.size} unique URLs)`);
  }
}

checkCollection('Main Recipes', RECIPES);
checkCollection('Desserts', DESSERT_RECIPES);
checkCollection('Beverages', BEVERAGE_RECIPES);
