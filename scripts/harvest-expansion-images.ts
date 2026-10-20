import fs from "fs";

interface DishQuery {
  id: string;
  terms: string[];
}

const dishes: DishQuery[] = [
  // Kashmir
  { id: "kas-rogan-josh", terms: ["Rogan josh", "Mutton Rogan Josh", "Kashmiri curry"] },
  { id: "kas-dum-olav", terms: ["Dum Aloo", "Dum aloo Kashmiri", "Potato curry Indian"] },
  { id: "kas-nadru-yakhni", terms: ["Lotus root curry", "Yakhni curry", "Lotus stem Indian"] },
  { id: "kas-modur-pulao", terms: ["Saffron pulao", "Kashmiri pulao", "Sweet rice saffron"] },
  { id: "kas-haakh-kadam", terms: ["Saag Indian", "Collard greens curry", "Green leafy curry Indian"] },

  // Uttar Pradesh
  { id: "up-awadhi-dum-biryani", terms: ["Lucknowi biryani", "Awadhi biryani", "Chicken dum biryani"] },
  { id: "up-galouti-kebab", terms: ["Galouti kebab", "Tunday kabab", "Shami kabab"] },
  { id: "up-banarasi-tamatar-chaat", terms: ["Tamatar chaat", "Aloo chaat plate", "Banarasi chaat"] },
  { id: "up-bedmi-puri-aloo", terms: ["Bedmi puri", "Poori aloo", "Puri bhaji Indian"] },
  { id: "up-matar-ka-nimona", terms: ["Matar curry", "Green peas curry", "Peas gravy Indian"] },

  // Delhi
  { id: "del-chole-bhature", terms: ["Chole bhature", "Chole bhature plate", "Bhatura chole"] },
  { id: "del-tandoori-chicken", terms: ["Tandoori chicken", "Tandoori chicken plate", "Roasted chicken Indian"] },
  { id: "del-chandni-chowk-paratha", terms: ["Aloo paratha", "Stuffed paratha", "Paratha Indian"] },
  { id: "del-dahi-bhalla", terms: ["Dahi bhalla", "Dahi vada chaat", "Dahi vada"] },
  { id: "del-butter-chicken-aslam", terms: ["Butter chicken plate", "Murgh makhani", "Chicken curry bowl"] },

  // Goa
  { id: "goa-fish-curry-kodi", terms: ["Goan fish curry", "Fish curry coconut", "Seafood curry Indian"] },
  { id: "goa-chicken-xacuti", terms: ["Chicken xacuti", "Xacuti", "Goan chicken curry"] },
  { id: "goa-pork-vindaloo", terms: ["Vindaloo", "Pork vindaloo", "Goan vindaloo"] },
  { id: "goa-caldine-vegetable", terms: ["Coconut vegetable curry", "Vegetable stew coconut", "Goan curry vegetable"] },
  { id: "goa-chorizo-pao", terms: ["Sausage bread", "Chorizo stew", "Spicy sausage pan"] },

  // Rajasthan
  { id: "raj-dal-baati-churma", terms: ["Dal baati", "Dal baati churma", "Rajasthani food plate"] },
  { id: "raj-laal-maas", terms: ["Laal maas", "Mutton red curry", "Spicy mutton curry"] },
  { id: "raj-gatte-ki-sabzi", terms: ["Gatte ki sabzi", "Gatta curry", "Besan gatte"] },
  { id: "raj-ker-sangri", terms: ["Ker sangri", "Rajasthani sabzi", "Dry vegetable Indian"] },
  { id: "raj-pyaaz-kachori", terms: ["Pyaaz kachori", "Kachori", "Khasta kachori"] },

  // Odisha
  { id: "odi-dalma", terms: ["Dalma Odisha", "Dalma", "Lentil vegetable stew"] },
  { id: "odi-pakhala-bhata", terms: ["Pakhala", "Fermented rice Indian", "Pakhala bhata"] },
  { id: "odi-macha-ghanta", terms: ["Fish head curry", "Macha ghanta", "Fish curry Bengali Odisha"] },
  { id: "odi-santula", terms: ["Santula", "Boiled vegetables tempered", "Odia vegetable"] },
  { id: "odi-chhena-tarkari", terms: ["Paneer curry Indian", "Chhena curry", "Cottage cheese curry"] },

  // Assam & Northeast
  { id: "asm-masor-tenga", terms: ["Masor tenga", "Assamese fish curry", "Sour fish curry"] },
  { id: "asm-omita-khar", terms: ["Khar Assam", "Papaya curry", "Assamese food"] },
  { id: "asm-pork-bamboo-shoot", terms: ["Pork bamboo shoot", "Naga pork", "Smoked pork curry"] },
  { id: "asm-aloo-pitika", terms: ["Aloo pitika", "Mashed potato Indian", "Bhorta aloo"] },
  { id: "asm-til-pitha", terms: ["Pitha Assam", "Til pitha", "Rice cake sweet"] },

  // France
  { id: "fra-boeuf-bourguignon", terms: ["Boeuf bourguignon", "Beef bourguignon", "French beef stew"] },
  { id: "fra-ratatouille-nicoise", terms: ["Ratatouille", "Ratatouille Nicoise", "Confit byaldi"] },
  { id: "fra-soupe-a-l-oignon", terms: ["French onion soup", "Soupe a l'oignon", "Onion soup gratin"] },
  { id: "fra-quiche-lorraine", terms: ["Quiche lorraine", "Quiche slice", "Savory tart"] },
  { id: "fra-coq-au-vin", terms: ["Coq au vin", "Chicken braised wine", "French chicken stew"] },

  // Korea
  { id: "kor-dolsot-bibimbap", terms: ["Bibimbap", "Dolsot bibimbap", "Korean rice bowl"] },
  { id: "kor-kimchi-jjigae", terms: ["Kimchi jjigae", "Kimchi stew", "Korean stew"] },
  { id: "kor-bulgogi", terms: ["Bulgogi", "Korean beef bulgogi", "Beef bulgogi grilled"] },
  { id: "kor-japchae", terms: ["Japchae", "Korean glass noodles", "Stir fried noodles Korean"] },
  { id: "kor-korean-fried-chicken", terms: ["Korean fried chicken", "Yangnyeom chicken", "Dakgangjeong"] },
];

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchWikipediaImage(term: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original|thumbnail&pithumbsize=1000&titles=${encodeURIComponent(
    term
  )}&origin=*`;

  try {
    const res = await fetch(url, { headers: { "User-Agent": "MisevaCulinaryBot/1.0" } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {}) as any[];
    for (const p of pages) {
      const src = p.thumbnail?.source || p.original?.source;
      if (src && !src.endsWith(".svg")) return src;
    }
  } catch {}
  return null;
}

async function searchCommonsImage(term: string): Promise<string | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    term + " filetype:bitmap"
  )}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime&format=json&origin=*`;

  try {
    const res = await fetch(url, { headers: { "User-Agent": "MisevaCulinaryBot/1.0" } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {}) as any[];
    for (const p of pages) {
      const u = p.imageinfo?.[0]?.url;
      const mime = p.imageinfo?.[0]?.mime;
      if (u && (mime === "image/jpeg" || mime === "image/png")) {
        return u;
      }
    }
  } catch {}
  return null;
}

async function main() {
  const results: Record<string, string> = {};
  const used = new Set<string>();

  // Load existing north images if any
  if (fs.existsSync("scripts/north-images.json")) {
    const prev = JSON.parse(fs.readFileSync("scripts/north-images.json", "utf8"));
    Object.assign(results, prev);
    Object.values(prev).forEach((u) => used.add(u as string));
  }

  console.log(`Starting image harvest for ${dishes.length} dishes...`);

  for (let i = 0; i < dishes.length; i++) {
    const d = dishes[i];
    if (results[d.id]) {
      console.log(`[${i + 1}/${dishes.length}] Already have ${d.id}`);
      continue;
    }

    console.log(`[${i + 1}/${dishes.length}] Searching for ${d.id}...`);
    let foundUrl: string | null = null;

    for (const term of d.terms) {
      await delay(700); // 700ms polite rate limit
      // Try Wikipedia title first
      foundUrl = await searchWikipediaImage(term);
      if (foundUrl && !used.has(foundUrl)) break;

      // Try Commons search
      await delay(700);
      foundUrl = await searchCommonsImage(term);
      if (foundUrl && !used.has(foundUrl)) break;
    }

    if (foundUrl && !used.has(foundUrl)) {
      used.add(foundUrl);
      results[d.id] = foundUrl;
      console.log(`  ✓ FOUND: ${foundUrl.slice(0, 75)}...`);
    } else {
      console.log(`  ✗ NOT FOUND for ${d.id}`);
    }

    fs.writeFileSync("scripts/expansion-images.json", JSON.stringify(results, null, 2));
  }

  console.log(`\nHarvest complete! Total resolved: ${Object.keys(results).length} / ${dishes.length}`);
}

main().catch(console.error);
