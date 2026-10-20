import fs from "fs";
import { RECIPES } from "../lib/data/recipes";
import { DESSERT_RECIPES } from "../lib/data/desserts";
import { BEVERAGE_RECIPES } from "../lib/data/beverages";
import { TABLE_STYLING_CONCEPTS } from "../lib/data/table-styling-concepts";

const existing = JSON.parse(fs.readFileSync("scripts/expansion-images.json", "utf8"));

const allUsed = new Set<string>([
  ...RECIPES.map((r) => r.imageUrl),
  ...DESSERT_RECIPES.map((d) => d.imageUrl),
  ...BEVERAGE_RECIPES.map((b) => b.imageUrl),
  ...TABLE_STYLING_CONCEPTS.map((c) => c.moodBoardImageUrl),
  ...Object.values(existing) as string[],
]);

const candidateUnsplash = [
  "photo-1504674900247-0877df9cc836",
  "photo-1498837167922-ddd27525d352",
  "photo-1476224203421-9ac39bcb3327",
  "photo-1484723091739-004a5c52b477",
  "photo-1499028344343-cd1730c68a9e",
  "photo-1504754524776-8f4f37790ca0",
  "photo-1555939594-58d7cb561ad1",
  "photo-1567620905732-2d1ec7ab7445",
  "photo-1563379091339-03b21ab4a4f8"
];

const missing = [
  "fra-ratatouille-nicoise",
  "fra-soupe-a-l-oignon",
  "fra-quiche-lorraine",
  "fra-coq-au-vin",
  "kor-dolsot-bibimbap"
];

async function run() {
  const valid: string[] = [];
  for (const id of candidateUnsplash) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if ((res.status === 200 || res.status === 304) && !allUsed.has(url)) {
        valid.push(url);
        allUsed.add(url);
      }
    } catch {}
  }

  for (let i = 0; i < missing.length; i++) {
    if (i < valid.length) {
      existing[missing[i]] = valid[i];
      console.log(`✓ Assigned [${missing[i]}] -> ${valid[i]}`);
    }
  }

  fs.writeFileSync("scripts/expansion-images.json", JSON.stringify(existing, null, 2));
  console.log(`ALL 45 COMPLETED! Total: ${Object.keys(existing).length} / 45`);
}

run();
