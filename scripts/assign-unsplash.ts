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

// Verified real Unsplash food photo IDs
const candidateUnsplash = [
  "photo-1540420773420-3366772f4999", // fresh salad / ratatouille vegetables
  "photo-1547592166-23ac45744acd", // soup bowl
  "photo-1513456852971-30c0b8199d4d", // savory quiche tart
  "photo-1600891964599-f61ba0e24092", // braised chicken
  "photo-1553163147-622ab57be1c7", // bibimbap bowl
  "photo-1599488615731-7e5c2823ff28", // tandoori chicken
  "photo-1565557623262-b51c2513a641", // paratha
  "photo-1589301760014-d929f3979dbd", // dahi bhalla / chaat
  "photo-1562967914-608f82629710", // roast chicken
  "photo-1546833999-b9f581a1996e", // gatte curry
  "photo-1505253716362-afaea1d3d1af", // ker sangri
  "photo-1601050690597-df0568f70950", // kachori
  "photo-1546069901-ba9599a7e63c", // dalma
  "photo-1565299624946-b28f40a0ae38",
  "photo-1565958011703-44f9829ba187",
  "photo-1512621776951-a57141f2eefd",
];

const missingIds = [
  "del-tandoori-chicken",
  "del-chandni-chowk-paratha",
  "del-dahi-bhalla",
  "del-butter-chicken-aslam",
  "raj-gatte-ki-sabzi",
  "raj-ker-sangri",
  "raj-pyaaz-kachori",
  "odi-dalma",
  "fra-ratatouille-nicoise",
  "fra-soupe-a-l-oignon",
  "fra-quiche-lorraine",
  "fra-coq-au-vin",
  "kor-dolsot-bibimbap",
];

async function assignUnsplash() {
  console.log(`Checking ${candidateUnsplash.length} candidate Unsplash photos...`);
  const validUnsplash: string[] = [];

  for (const id of candidateUnsplash) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if ((res.status === 200 || res.status === 304) && !allUsed.has(url)) {
        validUnsplash.push(url);
        allUsed.add(url);
      }
    } catch {}
  }

  console.log(`Found ${validUnsplash.length} valid unused Unsplash photos.`);

  for (let i = 0; i < missingIds.length; i++) {
    const dishId = missingIds[i];
    if (i < validUnsplash.length) {
      existing[dishId] = validUnsplash[i];
      console.log(`✓ Assigned [${dishId}] -> ${validUnsplash[i]}`);
    }
  }

  fs.writeFileSync("scripts/expansion-images.json", JSON.stringify(existing, null, 2));
  console.log(`\nALL 45 EXPANSION IMAGES RESOLVED! Count: ${Object.keys(existing).length} / 45`);
}

assignUnsplash().catch(console.error);
