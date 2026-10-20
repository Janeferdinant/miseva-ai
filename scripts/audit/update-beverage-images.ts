import fs from 'fs';
import path from 'path';

const BEV_UNIQUE_IMAGES: Record<string, string> = {
  // Fresh Juices (10)
  "bev-sweet-lime-ginger": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
  "bev-pomegranate-mint": "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
  "bev-watermelon-basil": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1200&q=80",
  "bev-abc-detox": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1200&q=80",
  "bev-pineapple-pink-pepper": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=80",
  "bev-orange-juice": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80",
  "bev-cucumber-celery": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=80",
  "bev-papaya-passionfruit": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=1200&q=80",
  "bev-amla-honey": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=1200&q=80",
  "bev-guava-chili": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",

  // Smoothies & Shakes (10)
  "bev-sharjah-shake": "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=80",
  "bev-mango-mastani": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1200&q=80",
  "bev-chikoo-date-shake": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
  "bev-blueberry-smoothie": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80",
  "bev-avocado-honey-smoothie": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80",
  "bev-strawberry-banana-smoothie": "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1200&q=80",
  "bev-kesar-pista-shake": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80",
  "bev-peanut-butter-cacao": "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=1200&q=80",
  "bev-tender-coconut-shake": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
  "bev-berry-chia-smoothie": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=80",

  // Traditional Refreshers (10)
  "bev-kulukki-sarbath": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
  "bev-sambharam": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
  "bev-nannari-sarbath": "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80",
  "bev-punjabi-lassi": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
  "bev-solkadhi": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1200&q=80",
  "bev-aam-panna": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
  "bev-madurai-jigarthanda": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80",
  "bev-festive-thandai": "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1200&q=80",
  "bev-bel-sharbat": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80",
  "bev-rose-milk-sabja": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",

  // Mocktails & Coolers (10)
  "bev-blue-curacao-fizz": "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80",
  "bev-mint-mojito": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
  "bev-spicy-guava-mary": "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
  "bev-hibiscus-ginger": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
  "bev-shikanji-lemonade": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
  "bev-passion-fruit-spritzer": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=80",
  "bev-cucumber-rosemary-tonic": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1200&q=80",
  "bev-pomegranate-fizz": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1200&q=80",
  "bev-orange-cranberry-sunrise": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80",
  "bev-lychee-lemongrass": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",

  // Teas & Coffees (10)
  "bev-kumbakonam-filter-coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
  "bev-mumbai-cutting-chai": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
  "bev-malabar-sulaimani": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80",
  "bev-kashmiri-noon-chai": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80",
  "bev-matcha-latte": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80",
  "bev-iced-cafe-con-leche": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
  "bev-turkish-coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
  "bev-vietnamese-iced-coffee": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
  "bev-darjeeling-first-flush": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1200&q=80",
  "bev-lemongrass-ginger-kadha": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=80",
};

const filePath = path.resolve('lib/data/beverages.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let updatedCount = 0;
for (const [id, newUrl] of Object.entries(BEV_UNIQUE_IMAGES)) {
  const idRegex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?imageUrl:\\s*["'])[^"']+`, 'm');
  if (idRegex.test(content)) {
    content = content.replace(idRegex, `$1${newUrl}`);
    updatedCount++;
  } else {
    console.warn(`Warning: Could not find block for ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Successfully updated ${updatedCount} beverages in lib/data/beverages.ts!`);
