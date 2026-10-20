import fs from 'fs';
import path from 'path';
import { RECIPES } from '../../lib/data/recipes';
import { DESSERT_RECIPES } from '../../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../../lib/data/beverages';

export const VERIFIED_TABLE_STYLING_IMAGES: Record<string, { moodBoard: string; title: string; collection: string }> = {
  // === KERALA SADYA & BANQUET (10) ===
  "tab-kerala-onam-mahasadya": {
    moodBoard: "/brand/images/tablescapes/onam-sadya-tablescape.jpg",
    title: "Grand Onam Mahasadya (Traditional Banana-Leaf Dining)",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-vishu-kani-feast": {
    moodBoard: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80",
    title: "Vishu Kani Dawn Harvest Feast Tablescape",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-illam-bronze": {
    moodBoard: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    title: "Heritage Kerala Illam Bronze & Kindi Banquet",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-malabar-dastarkhan": {
    moodBoard: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
    title: "Malabar Moplah Royal Wedding Dastarkhan",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-syrian-christian-easter": {
    moodBoard: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    title: "Central Travancore Syrian Christian Easter Feast",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-backwater-houseboat": {
    moodBoard: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    title: "Alappuzha Backwater Houseboat Palm-Leaf Table",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-village-oottupura": {
    moodBoard: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80",
    title: "Village Oottupura Community Thali Setting",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-karkidakam-healing": {
    moodBoard: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    title: "Monsoon Karkidakam Healing & Oushadha Kanji Table",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-coastal-chic": {
    moodBoard: "/brand/images/tablescapes/coastal-chic-tablescape.jpg",
    title: "Coastal Karimeen & Toddy Shop Chic Table",
    collection: "kerala-sadya-banquet"
  },
  "tab-kerala-banana-fiber-eco": {
    moodBoard: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80",
    title: "Eco-Friendly Banana Fiber & Areca Nut Minimal Sadya",
    collection: "kerala-sadya-banquet"
  },

  // === FESTIVE INDIAN (10) ===
  "tab-diwali-royal-gold": {
    moodBoard: "/brand/images/tablescapes/diwali-royal-tablescape.jpg",
    title: "Royal Diwali Gold & Crimson Diya Tablescape",
    collection: "festive-indian"
  },
  "tab-navratri-colorful-thali": {
    moodBoard: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1200&q=80",
    title: "Navratri Dandiya Raas Colorful Vibrant Thali",
    collection: "festive-indian"
  },
  "tab-eid-silver-crescent": {
    moodBoard: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=1200&q=80",
    title: "Eid al-Fitr Emerald & Silver Crescent Banquet",
    collection: "festive-indian"
  },
  "tab-durga-puja-shonar-bangla": {
    moodBoard: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    title: "Durga Puja Shonar Bangla Red & White Feast",
    collection: "festive-indian"
  },
  "tab-makar-sankranti-brass": {
    moodBoard: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
    title: "Makar Sankranti Solar Harvest & Kite Festival Table",
    collection: "festive-indian"
  },
  "tab-pongal-kolam-harvest": {
    moodBoard: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=1200&q=80",
    title: "Tamil Thai Pongal Kolam & Terracotta Harvest Feast",
    collection: "festive-indian"
  },
  "tab-ganesh-chaturthi-marigold": {
    moodBoard: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80",
    title: "Ganesh Chaturthi Sacred Modak & Red Hibiscus Table",
    collection: "festive-indian"
  },
  "tab-holi-color-splash": {
    moodBoard: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    title: "Holi Festival of Colors Vibrant Garden Feast",
    collection: "festive-indian"
  },
  "tab-karwa-chauth-moonlit": {
    moodBoard: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1200&q=80",
    title: "Karwa Chauth Moonlit Terrace Romance Table",
    collection: "festive-indian"
  },
  "tab-raksha-bandhan-sweet": {
    moodBoard: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    title: "Raksha Bandhan Sweet Memories Family Table",
    collection: "festive-indian"
  },

  // === CELEBRATIONS & BANQUETS (10) ===
  "tab-wedding-maharaja-banquet": {
    moodBoard: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    title: "Royal Maharaja Wedding Sangeet Gold Banquet",
    collection: "celebrations-banquets"
  },
  "tab-anniversary-rose-gold": {
    moodBoard: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    title: "Candlelight Anniversary Rose Gold & Blush Table",
    collection: "celebrations-banquets"
  },
  "tab-romantic-dinner-two": {
    moodBoard: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?auto=format&fit=crop&w=1200&q=80",
    title: "Intimate Romantic Dinner for Two (Candlelight Valentine)",
    collection: "celebrations-banquets"
  },
  "tab-kids-birthday-carnival": {
    moodBoard: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    title: "Whimsical Kids Birthday Carnival & Sweet Treats Table",
    collection: "celebrations-banquets"
  },
  "tab-silver-jubilee-family": {
    moodBoard: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    title: "Silver Jubilee Grand Family Reunion Banquet",
    collection: "celebrations-banquets"
  },
  "tab-black-tie-formal-banquet": {
    moodBoard: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    title: "Elegant Black-Tie Formal Dinner Banquet",
    collection: "celebrations-banquets"
  },
  "tab-champagne-engagement-brunch": {
    moodBoard: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
    title: "Champagne Engagement Celebration Brunch",
    collection: "celebrations-banquets"
  },
  "tab-baby-shower-pastel-floral": {
    moodBoard: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    title: "Baby Shower Pastel Floral Wonderland Table",
    collection: "celebrations-banquets"
  },
  "tab-new-year-midnight-glitter": {
    moodBoard: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    title: "New Year's Eve Midnight Glitter Gala Banquet",
    collection: "celebrations-banquets"
  },
  "tab-graduation-achievement-banquet": {
    moodBoard: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    title: "Graduation Honors & Academic Achievement Banquet",
    collection: "celebrations-banquets"
  },

  // === MINIMALIST, RUSTIC & OUTDOOR (10) ===
  "tab-scandinavian-hygge-wood": {
    moodBoard: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    title: "Scandinavian Hygge Bare Wooden Dining",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-mediterranean-olive-grove": {
    moodBoard: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    title: "Mediterranean Olive Grove Al Fresco Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-japanese-wabi-sabi-bamboo": {
    moodBoard: "/brand/images/tablescapes/japanese-wabi-sabi-table.jpg",
    title: "Japanese Wabi-Sabi Ceramic & Bamboo Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-rustic-farmhouse-burlap": {
    moodBoard: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    title: "Rustic Farmhouse Burlap & Terracotta Harvest Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-coastal-driftwood-linen": {
    moodBoard: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    title: "Coastal Driftwood & Bleached Linen Beachside Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-zen-stone-bonsai": {
    moodBoard: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    title: "Zen Stone & Miniature Bonsai Monochromatic Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-vineyard-sunset-banquet": {
    moodBoard: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    title: "Vineyard Sunset Wine Country Harvest Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-bohemian-rattan-pampas": {
    moodBoard: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    title: "Bohemian Rattan & Fluffy Pampas Grass Sunset Picnic",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-industrial-loft-copper": {
    moodBoard: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    title: "Urban Industrial Loft Concrete & Raw Copper Table",
    collection: "minimalist-rustic-outdoor"
  },
  "tab-sustainable-forest-upcycled": {
    moodBoard: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    title: "Sustainable Forest-Foraged & Upcycled Timber Table",
    collection: "minimalist-rustic-outdoor"
  }
};

export function runTableStylingImageAudit() {
  const allImages = new Set<string>();
  const duplicates = new Map<string, string[]>();

  for (const [id, c] of Object.entries(VERIFIED_TABLE_STYLING_IMAGES)) {
    if (allImages.has(c.moodBoard)) {
      const list = duplicates.get(c.moodBoard) || [];
      list.push(id);
      duplicates.set(c.moodBoard, list);
    } else {
      allImages.add(c.moodBoard);
    }
  }

  console.log(`Audited ${Object.keys(VERIFIED_TABLE_STYLING_IMAGES).length} concepts.`);
  console.log(`Unique Moodboard Images: ${allImages.size}`);
  if (duplicates.size > 0) {
    console.error(`❌ Duplicates found:`, duplicates);
    process.exit(1);
  } else {
    console.log(`✅ 100% UNIQUE IMAGES across all 40 table styling concepts!`);
  }

  // Check cross-tab collisions with 230 culinary dishes
  const foodUrls = new Set<string>();
  for (const r of RECIPES) foodUrls.add(r.imageUrl);
  for (const d of DESSERT_RECIPES) foodUrls.add(d.imageUrl);
  for (const b of BEVERAGE_RECIPES) foodUrls.add(b.imageUrl);

  let crossCollisions = 0;
  for (const [id, c] of Object.entries(VERIFIED_TABLE_STYLING_IMAGES)) {
    if (foodUrls.has(c.moodBoard)) {
      crossCollisions++;
      console.warn(`Collision with food catalog: [${id}] ${c.moodBoard}`);
    }
  }
  console.log(`Cross-tab food collisions: ${crossCollisions}`);

  // Apply to lib/data/table-styling-concepts.ts
  const filePath = path.resolve(process.cwd(), 'lib/data/table-styling-concepts.ts');
  let content = fs.readFileSync(filePath, 'utf-8');

  let updatedCount = 0;
  for (const [id, entry] of Object.entries(VERIFIED_TABLE_STYLING_IMAGES)) {
    // Regex matches the concept block by id and replaces moodBoardImageUrl
    const regex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?moodBoardImageUrl:\\s*["'])[^"']+(["'])`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${entry.moodBoard}$2`);
      updatedCount++;
    } else {
      console.warn(`Warning: Could not match concept id: ${id}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`🎉 Successfully updated ${updatedCount} concepts in lib/data/table-styling-concepts.ts!`);
}

runTableStylingImageAudit();
