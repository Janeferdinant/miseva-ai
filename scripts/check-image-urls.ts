import { RECIPES } from "../lib/data/recipes";
import { DESSERT_RECIPES } from "../lib/data/desserts";
import { BEVERAGE_RECIPES } from "../lib/data/beverages";
import { LUXURY_TABLE_THEMES } from "../lib/data/luxury-table-themes";
import { TABLE_STYLING_CONCEPTS } from "../lib/data/table-styling-concepts";

async function checkUrl(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
    return res.status;
  } catch (err: any) {
    try {
      const getRes = await fetch(url, { method: "GET", headers: { Range: "bytes=0-10" }, signal: AbortSignal.timeout(5000) });
      return getRes.status;
    } catch (e: any) {
      return 0; // Error / Network fail
    }
  }
}

async function main() {
  console.log("Checking Table Styling Concepts...");
  for (const c of TABLE_STYLING_CONCEPTS) {
    if (!c.moodBoardImageUrl || c.moodBoardImageUrl.trim() === "") {
      console.log(`[EMPTY CONCEPT IMAGE] ${c.id}: ${c.title}`);
    }
  }

  console.log("Checking Recipes / Desserts / Beverages for HTTP status...");
  const all = [
    ...RECIPES.map((r) => ({ type: "Recipe", id: r.id, title: r.title, url: r.imageUrl })),
    ...DESSERT_RECIPES.map((d) => ({ type: "Dessert", id: d.id, title: d.title, url: d.imageUrl })),
    ...BEVERAGE_RECIPES.map((b) => ({ type: "Beverage", id: b.id, title: b.title, url: b.imageUrl })),
  ];

  let broken = 0;
  // Test in batches of 20
  for (let i = 0; i < all.length; i += 20) {
    const batch = all.slice(i, i + 20);
    const results = await Promise.all(
      batch.map(async (item) => {
        const status = await checkUrl(item.url);
        return { ...item, status };
      })
    );
    for (const res of results) {
      if (res.status !== 200 && res.status !== 304 && res.status !== 206) {
        broken++;
        console.log(`[BROKEN HTTP ${res.status}] [${res.type}] ${res.id} - ${res.title}: ${res.url}`);
      }
    }
  }
  console.log(`Total broken images: ${broken} / ${all.length}`);
}

main().catch(console.error);
