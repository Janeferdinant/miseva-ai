import fs from 'fs';
import path from 'path';

const DESSERT_UNIQUE_IMAGES: Record<string, string> = {
  // Payasam & Pradhaman (10)
  "des-palada-pradhaman": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
  "des-ada-pradhaman": "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80",
  "des-parippu-payasam": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1200&q=80",
  "des-semiya-payasam": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
  "des-paal-payasam": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
  "des-pazham-pradhaman": "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=1200&q=80",
  "des-gothambu-payasam": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80",
  "des-kadala-payasam": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80",
  "des-aval-payasam": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1200&q=80",
  "des-chakka-pradhaman": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",

  // Traditional Indian Mithai (10)
  "des-gulab-jamun": "https://images.unsplash.com/photo-1605197148560-f703e7e39f37?auto=format&fit=crop&w=1200&q=80",
  "des-rasmalai": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
  "des-jalebi": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
  "des-mysore-pak": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  "des-ukadiche-modak": "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1200&q=80",
  "des-besan-ladoo": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1200&q=80",
  "des-kaju-katli": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80",
  "des-motichoor-ladoo": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
  "des-gajar-halwa": "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
  "des-sandesh": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",

  // Cakes, Pastries & Bakes (10)
  "des-kerala-plum-cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
  "des-cardamom-tea-cake": "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80",
  "des-red-velvet-cupcakes": "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1200&q=80",
  "des-banana-walnut-bread": "https://images.unsplash.com/photo-1605291535284-5f49df748729?auto=format&fit=crop&w=1200&q=80",
  "des-tres-leches-cake": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=80",
  "des-fudgy-brownies": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
  "des-molten-lava-cake": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1200&q=80",
  "des-ny-cheesecake": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80",
  "des-matcha-souffle-cheesecake": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80",
  "des-apple-crumble": "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1200&q=80",

  // Global Delights & Confectionery (10)
  "des-creme-brulee": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80",
  "des-vanilla-panna-cotta": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  "des-pistachio-baklava": "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80",
  "des-cheesy-kunafa": "https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=1200&q=80",
  "des-strawberry-mochi": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
  "des-cinnamon-churros": "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=1200&q=80",
  "des-turkish-delight": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=80",
  "des-butter-croissants": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
  "des-chocolate-eclairs": "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=1200&q=80",
  "des-italian-tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
};

// Check uniqueness of mapping
const values = Object.values(DESSERT_UNIQUE_IMAGES);
const uniqueSet = new Set(values);
console.log(`Mapped ${Object.keys(DESSERT_UNIQUE_IMAGES).length} desserts with ${uniqueSet.size} unique URLs.`);

if (uniqueSet.size !== 40) {
  console.error("ERROR: Not all image URLs are unique!");
  process.exit(1);
}

// Read lib/data/desserts.ts
const filePath = path.resolve('lib/data/desserts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace each recipe's imageUrl
for (const [id, newUrl] of Object.entries(DESSERT_UNIQUE_IMAGES)) {
  // Regex to find recipe block by id and replace its imageUrl
  const idRegex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?imageUrl:\\s*["'])[^"']+`, 'm');
  if (idRegex.test(content)) {
    content = content.replace(idRegex, `$1${newUrl}`);
  } else {
    console.warn(`Warning: Could not find block for ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated lib/data/desserts.ts with 40 unique image URLs!');
