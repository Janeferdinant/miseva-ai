import fs from "fs";

const dishes = [
  { id: "kas-rogan-josh", term: "Rogan josh mutton food" },
  { id: "kas-dum-olav", term: "Dum aaloo Indian food" },
  { id: "kas-nadru-yakhni", term: "Lotus root curry food" },
  { id: "kas-modur-pulao", term: "Saffron pulao dry fruits food" },
  { id: "kas-haakh-kadam", term: "Collard greens Indian food" },
  { id: "up-awadhi-dum-biryani", term: "Awadhi biryani Lucknow food" },
  { id: "up-galouti-kebab", term: "Galouti kebab Lucknow food" },
  { id: "up-banarasi-tamatar-chaat", term: "Tamatar chaat Banaras food" },
  { id: "up-bedmi-puri-aloo", term: "Bedmi puri aloo food" },
  { id: "up-matar-ka-nimona", term: "Green peas curry Indian food" },
  { id: "del-chole-bhature", term: "Chole bhature Delhi food" },
  { id: "del-tandoori-chicken", term: "Tandoori chicken plate food" },
  { id: "del-paranthe-wali-gali", term: "Stuffed paratha Indian food" },
  { id: "del-dahi-bhalla", term: "Dahi bhalla dahi vada food" },
  { id: "del-butter-chicken-aslam", term: "Butter chicken bowl food" },
];

async function findImages() {
  const results: Record<string, string> = {};
  const used = new Set<string>();

  for (const d of dishes) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      d.term + " filetype:bitmap"
    )}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime&format=json&origin=*`;

    try {
      const res = await fetch(url, { headers: { "User-Agent": "MisevaCulinaryBot/1.0" } });
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {}) as any[];

      for (const p of pages) {
        const img = p.imageinfo?.[0]?.url;
        const mime = p.imageinfo?.[0]?.mime;
        if (img && (mime === "image/jpeg" || mime === "image/png") && !used.has(img)) {
          const head = await fetch(img, {
            method: "HEAD",
            headers: { "User-Agent": "MisevaCulinaryBot/1.0" },
          });
          if (head.status === 200) {
            results[d.id] = img;
            used.add(img);
            console.log(`[FOUND] ${d.id} -> ${img.slice(0, 70)}...`);
            break;
          }
        }
      }
      if (!results[d.id]) {
        console.log(`[NOT FOUND] ${d.id}`);
      }
    } catch (e: any) {
      console.log(`[ERR] ${d.id}:`, e.message);
    }
  }

  fs.writeFileSync("scripts/north-images.json", JSON.stringify(results, null, 2));
}

findImages();
