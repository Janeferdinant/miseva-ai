# Miseva AI — Table Styling Studio Luxury Redesign Architecture

## 1. Overview & Vision

The **Table Styling Studio** in Miseva AI transforms every culinary dish into a complete five-star luxury dining presentation. Inspired by royal Indian banquets, Michelin-starred dining rooms, and five-star luxury hospitality (The Oberoi, Taj Palaces, Ritz-Carlton), the redesign combines:
- **10 Bespoke Visual Themes** with authentic cultural storytelling, dedicated cutlery metallurgy, plate styles, glassware, and ambient lighting.
- **6 Curated Multi-Course Banquets** grouping compatible starters, mains, accompaniments, desserts, and traditional beverage pairings from the 230 recipes.
- **Parametric AI Photography Prompt Engine** synthesizing high-definition editorial food photography blueprints.
- **Interactive Tableware Customizer** with dynamic 2D top-down place setting arrangement canvas.
- **8 Integrated Sections** on `/table-styling` providing a luxury dining atelier experience with full responsiveness and save/share capabilities.

---

## 2. Core Architecture & Modules

```
lib/
├── types/table-styling.ts                 # Type definitions (LuxuryTheme, CuratedMealCollection, CutleryFinish, PlateStyle, etc.)
├── data/
│   ├── luxury-table-themes.ts             # 10 Luxury Themes with complete visual & storytelling parameters
│   ├── curated-meal-collections.ts        # 6 Curated Banquets with course sequences & beverage pairings
│   └── table-styling-concepts.ts          # 40 Classic Tablescape concepts (preserved with unique images)
└── table-styling/
    ├── image-prompt-engine.ts             # Parametric AI prompt generator for high-definition dining photography
    └── generator.ts                       # 2D table layout placement algorithm

components/table-styling/
├── TableLayoutCanvas.tsx                  # Interactive SVG top-down placement canvas with zoom controls
├── TablewareCustomizer.tsx                # Cutlery, plate, glassware & linen customization controls
├── MealCollectionBuilder.tsx              # Card carousel of the 6 signature curated banquets
└── DishSelectorModal.tsx                  # Multi-dish selector modal covering all 230 catalog recipes

app/
├── table-styling/
│   ├── page.tsx                           # Main 8-section interactive Luxury Dining Atelier
│   └── [slug]/page.tsx                    # Dynamic detail view resolving both luxury themes and classic concepts
└── api/table-styling/
    ├── generate/route.ts                  # Layout plan generator endpoint
    └── render/route.ts                    # Dynamic theme prompt rendering API
```

---

## 3. The 10 Luxury Themes

| ID | Title | Malayalam | Cutlery Finish | Plate Style | Primary Ambiance |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `royal-heritage` | Royal Heritage | രാജകീയ പാരമ്പര്യം | 24K Imperial Gold | Fine Bone China with gold filigree | Candelabra glow, raw silk, crystal goblets |
| `five-star-luxury` | Five-Star Luxury | പഞ്ചനക്ഷത്ര ലക്ഷ്വറി | Mirror Silver | Limoges Porcelain & silver underplate | Pin-spot lighting, white Belgian linen |
| `kerala-royal-feast` | Kerala Royal Feast | തിരുവിതാംകൂർ രാജകീയ വിരുന്ന് | Antique Brass | Fresh Plantain Banana Leaf | Nilavilakku brass lamps, Kasavu gold runner |
| `modern-fine-dining` | Modern Fine Dining | ആധുനിക ഫൈൻ ഡൈനിംഗ് | Matte Noir Titanium | Organic Volcanic Stoneware | Theatrical narrow spotlighting, charred oak |
| `romantic-candlelight` | Romantic Candlelight | പ്രണയ സന്ധ്യ വിരുന്ന് | Blush Rose Gold | Scalloped Blush Porcelain | Beeswax tapers, French dusty rose linen |
| `mediterranean-elegance` | Mediterranean Elegance | മെഡിറ്ററേനിയൻ ശൈലി | Antique Brass & Wood | Tuscan Terracotta with white slip glaze | Golden hour terrace light, olive branch garland |
| `festive-indian-grandeur` | Festive Indian Grandeur | ഉത്സവ ഭാരതീയ പ്രൗഢി | Engraved Gold | Embossed Bell-Metal Thali | Floating brass diyas, marigold rangoli |
| `garden-brunch` | Garden Brunch | പൂന്തോട്ട ബ്രഞ്ച് | Chiseled Silver | Botanical Hand-Painted Porcelain | Dappled morning sunlight, sage linen |
| `dessert-atelier` | Dessert Atelier | ഡെസേർട്ട് അറ്റലിയർ | Gold Pastry Forks | Marble Pedestal & Glossy Gold Rim | Pinpoint amber spot on glazes & sugar crystals |
| `contemporary-global-dining` | Contemporary Global Dining | സമകാലിക ആഗോള വിരുന്ന് | Brushed Satin Nickel | Scandinavian Slate Stoneware | Architectural warm white, neutral flax mats |

---

## 4. The 6 Curated Multi-Course Banquets

1. **Kerala Grand Lunch (കേരള ഗ്രാന്റ് ലഞ്ച്)**: Matta Rice, Sambar, Avial, Thoran, Papadam & Inji Puli, Palada Pradhaman + Spiced Sambharam.
2. **Royal Indian Dinner (രാജകീയ ഭാരതീയ ഡിന്നർ)**: Dum Biryani, Paneer Butter Masala, Dal Makhani, Garlic Naan, Gulab Jamun + Saffron Lassi.
3. **Continental Fine Dining (കോണ്ടിനെന്റൽ ഫൈൻ ഡൈനിംഗ്)**: Truffle Mushroom Soup, Polenta Steak, Ratatouille, Sourdough, Tiramisu + Sparkling Berry Spritzer.
4. **Elegant Afternoon Tea (ഹൈ ടീ സൽക്കാരം)**: Cucumber Ribbon Sandwiches, Buttermilk Scones, Fruit Tartlets, Macarons + Darjeeling Tea & Masala Chai.
5. **Dessert Indulgence (ഡെസേർട്ട് സംഗമം)**: Chocolate Lava Cake, Chakka Pradhaman, New York Cheesecake, Kesar Kulfi + Cold Brew Affogato.
6. **Fresh Juice & Elixir Bar (ഫ്രഷ് ജ്യൂസ് ബാർ)**: Kulukki Sarbath, Watermelon Mint Cooler, Tender Coconut Elixir, Masala Buttermilk + Butterfly Pea Lemonade.

---

## 5. Image Integrity & Deduplication Verification

- **10 / 10 Unique Luxury Theme Images**: Zero duplicates across all 10 themes.
- **Zero Cross-Tab Collisions**: Verified with automated tests that none of the 10 luxury themes share image URLs with any of the 230 culinary recipes (140 mains, 40 desserts, 50 beverages) or classic concepts.
- **Bespoke AI Tablescapes**: High-definition local photographic assets placed in `public/brand/images/tablescapes/` and served via native Next.js asset routing.

---

## 6. Testing & Quality Assurance

- **Vitest Suites**: 18 test files, 78 / 78 tests passing (100%).
- **TypeScript**: `npx tsc --noEmit` exits with code 0 (zero errors).
- **Next.js Turbopack Build**: `npm run build` succeeds across all 24 static and dynamic routes.
- **Live Vercel Production**: Verified with HTTP 200 on `https://cusine-chi.vercel.app/table-styling`.
