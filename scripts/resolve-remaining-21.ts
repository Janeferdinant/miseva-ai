import fs from "fs";

const existing = JSON.parse(fs.readFileSync("scripts/expansion-images.json", "utf8"));
const used = new Set(Object.values(existing));

const remaining: Record<string, string[]> = {
  "up-bedmi-puri-aloo": ["Puri (food)", "Puri bhaji", "Poori"],
  "up-matar-ka-nimona": ["Aloo matar", "Mattar paneer", "Pea soup"],
  "del-chole-bhature": ["Chole bhature", "Bhatura"],
  "del-tandoori-chicken": ["Tandoori chicken", "Chicken tikka"],
  "del-chandni-chowk-paratha": ["Paratha", "Aloo paratha"],
  "del-dahi-bhalla": ["Dahi vada", "Chaat"],
  "del-butter-chicken-aslam": ["Chicken tikka masala", "Chicken curry"],
  "raj-gatte-ki-sabzi": ["Gram flour", "Rajasthani cuisine", "Besan"],
  "raj-ker-sangri": ["Rajasthani cuisine", "Thali"],
  "raj-pyaaz-kachori": ["Kachori", "Samosa"],
  "odi-dalma": ["Dalma (dish)", "Puri, Odisha", "Odia cuisine"],
  "odi-pakhala-bhata": ["Pakhala", "Fermented rice"],
  "odi-macha-ghanta": ["Fish head", "Machher Jhol"],
  "odi-santula": ["Santula", "Odia cuisine", "Tarkari"],
  "asm-til-pitha": ["Pitha", "Bihu"],
  "fra-boeuf-bourguignon": ["Beef bourguignon", "Beef stew"],
  "fra-ratatouille-nicoise": ["Ratatouille", "Confit byaldi"],
  "fra-soupe-a-l-oignon": ["French onion soup", "Onion soup"],
  "fra-quiche-lorraine": ["Quiche", "Tarte"],
  "fra-coq-au-vin": ["Coq au vin", "Braised chicken"],
  "kor-dolsot-bibimbap": ["Bibimbap", "Dolsot"],
};

async function fetchWikiLead(title: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original|thumbnail&pithumbsize=1000&titles=${encodeURIComponent(
    title
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

async function main() {
  for (const [id, titles] of Object.entries(remaining)) {
    if (existing[id]) continue;
    console.log(`Resolving ${id}...`);
    for (const title of titles) {
      await new Promise((r) => setTimeout(r, 600));
      const url = await fetchWikiLead(title);
      if (url && !used.has(url)) {
        used.add(url);
        existing[id] = url;
        console.log(`  ✓ FOUND: ${url.slice(0, 75)}...`);
        break;
      }
    }
    if (!existing[id]) {
      console.log(`  ✗ Still missing: ${id}`);
    }
  }

  fs.writeFileSync("scripts/expansion-images.json", JSON.stringify(existing, null, 2));
  console.log(`Total resolved in expansion-images.json: ${Object.keys(existing).length} / 45`);
}

main().catch(console.error);
