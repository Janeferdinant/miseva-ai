import { LuxuryTheme } from "@/lib/types/table-styling";

export const LUXURY_TABLE_THEMES: LuxuryTheme[] = [
  {
    id: "royal-heritage",
    slug: "royal-heritage",
    title: "Royal Heritage",
    titleMalayalam: "രാജകീയ പാരമ്പര്യം",
    catchphrase: "A royal feast, dressed in timeless imperial elegance.",
    catchphraseMalayalam: "രാജകീയ പാരമ്പര്യവും പ്രൗഢിയും തുളുമ്പുന്ന വിരുന്ന്.",
    description: "A regal Indian dining arrangement featuring carefully plated traditional dishes, fine porcelain, 24K gold-accented cutlery, polished brass serving ware, rich ivory linens, and subtle heritage-inspired details.",
    descriptionMalayalam: "സ്വർണ്ണ അരികുകളുള്ള പാത്രങ്ങൾ, പാരമ്പര്യ പിച്ചള അലങ്കാരങ്ങൾ, ഐവറി പട്ട് വിരികൾ എന്നിവയാൽ ഒരുക്കിയ രാജകീയ വിരുന്ന്.",
    tableware: {
      cutleryFinish: "gold",
      cutleryDescription: "24K electroplated gold-finish heavy forged cutlery with ornate baroque handles",
      plateStyle: "fine-bone-china",
      plateDescription: "Fine bone china charger plates with intricate filigree gold rim and footed katori bowls",
      glasswareStyle: "cut-crystal-goblet",
      glasswareDescription: "Heavy hand-cut lead-free crystal goblets with diamond facet refraction",
      linensStyle: "crimson-zardozi-silk",
      linensDescription: "Burgundy raw silk table runner with hand-embroidered metallic gold zardozi borders",
      napkinFoldName: "Royal Crown Fold",
      centerpieceDescription: "Antiqued brass candelabra with crimson taper candles and fresh red rose garlands"
    },
    lightingAndAmbiance: "Warm low-temperature ambient candelabra glow with warm accent spots at 2700K",
    colorPalette: {
      primary: "#8B1E2D", // Royal Burgundy
      secondary: "#D4AF37", // Imperial Gold
      accent: "#FAF9F6", // Ivory
      neutral: "#2C1B1E" // Deep Mahogany
    },
    moodBoardImageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    culturalStory: "Drawing inspiration from the banquet halls of Mysore and Rajasthan, this setting treats every guest as royalty with structured multi-course service.",
    recommendedOccasion: "State Banquets, Milestone Anniversaries, Royal Receptions",
    recommendedGuestCount: { min: 4, max: 16 }
  },
  {
    id: "five-star-luxury",
    slug: "five-star-luxury",
    title: "Five-Star Luxury",
    titleMalayalam: "പഞ്ചനക്ഷത്ര ലക്ഷ്വറി",
    catchphrase: "Impeccable balance, architectural restraint, and bespoke silverware.",
    catchphraseMalayalam: "കൃത്യതയും ലാളിത്യവും ചേർന്ന പഞ്ചനക്ഷത്ര അനുഭവം.",
    description: "Inspired by Michelin-starred dining rooms and luxury Grand Hotels. Minimalist fine china, mirror-polished silverware, crystal stemware, crisp linen napkins, and generous spacing.",
    descriptionMalayalam: "മിറർ ഫിനിഷ് വെള്ളി സ്പൂണുകൾ, ക്രിസ്റ്റൽ ഗ്ലാസുകൾ, ബൽജിയൻ ലിനൻ എന്നിവയോടെ ഹോട്ടൽ ശൈലിയിലുള്ള ടേബിൾ.",
    tableware: {
      cutleryFinish: "polished-silver",
      cutleryDescription: "Mirror-polished heavy 18/10 stainless steel, architectural balanced profile",
      plateStyle: "fine-bone-china",
      plateDescription: "Pure white Limoges porcelain with wide rim and mirror silver underplates",
      glasswareStyle: "lead-free-crystal-stemware",
      glasswareDescription: "Ultra-thin blown crystal Bordeaux wine and sparkling water glasses",
      linensStyle: "belgian-linen-white",
      linensDescription: "Crisply pressed 100% white Belgian linen tablecloth with mitred corners",
      napkinFoldName: "Classic French Pleat",
      centerpieceDescription: "Low architectural arrangement of white calla lilies in mirrored rectangular trough"
    },
    lightingAndAmbiance: "Precision pin-spotting directed exclusively at tableware, deep ambient shadows",
    colorPalette: {
      primary: "#0D1117", // Pure Obsidian
      secondary: "#E5E7EB", // Platinum Silver
      accent: "#FFFFFF", // Crisp White
      neutral: "#374151" // Charcoal Slate
    },
    moodBoardImageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    culturalStory: "The gold standard of international grand hospitality, emphasizing geometric alignment and uninterrupted sightlines.",
    recommendedOccasion: "Formal Corporate Dinners, Diplomatic Banquets, Haute Cuisine Tastings",
    recommendedGuestCount: { min: 2, max: 12 }
  },
  {
    id: "kerala-royal-feast",
    slug: "kerala-royal-feast",
    title: "Kerala Royal Feast",
    titleMalayalam: "തിരുവിതാംകൂർ രാജകീയ വിരുന്ന്",
    catchphrase: "Centuries of sacred hospitality served on fresh plantain leaves.",
    catchphraseMalayalam: "തനിമയാർന്ന വാഴയിലയിൽ വിളമ്പുന്ന പവിത്രമായ കേരള വിരുന്ന്.",
    description: "Traditional Travancore and Malabar feast presented with heavy bell-metal brass Uruli, polished bronze Kindi, Kasavu runners, and sacred banana-leaf dining geometry.",
    descriptionMalayalam: "നിലവിളക്കിൻ്റെ പ്രകാശത്തിൽ കസവ് വിരിയും ഓട്ടുപാത്രങ്ങളും വാഴയിലയും അണിനിരത്തിയ പരമ്പരാഗത വിരുന്ന്.",
    tableware: {
      cutleryFinish: "antique-brass",
      cutleryDescription: "Handcrafted traditional brass serving ladles and rosewood-accented butter knives",
      plateStyle: "fresh-banana-leaf",
      plateDescription: "Unblemished tapered plantain leaf trimmed to precision on bell-metal base plates",
      glasswareStyle: "hammered-brass-tumbler",
      glasswareDescription: "Polished heavy bell-metal brass tumblers for herbal water and spiced buttermilk",
      linensStyle: "kasavu-gold-brocade",
      linensDescription: "Natural unbleached handloom cotton runner with authentic Kasavu gold tissue border",
      napkinFoldName: "Lotus Blossom Fold",
      centerpieceDescription: "Glowing multi-tiered brass Nilavilakku with floating water jasmine in bronze Uruli"
    },
    lightingAndAmbiance: "Warm flickering sesame oil lamp illumination with soft golden overhead glow",
    colorPalette: {
      primary: "#2E6930", // Plantain Green
      secondary: "#D4AF37", // Kasavu Gold
      accent: "#FFFDD0", // Cream
      neutral: "#5C4033" // Rosewood
    },
    moodBoardImageUrl: "/brand/images/tablescapes/onam-sadya-tablescape.jpg",
    culturalStory: "Rooted in millennia of Kerala temple hospitality, where food arrangement follows precise geometric and Ayurvedic balance.",
    recommendedOccasion: "Onam Sadya, Vishu Harvest, Heritage Family Banquets",
    recommendedGuestCount: { min: 4, max: 20 }
  },
  {
    id: "modern-fine-dining",
    slug: "modern-fine-dining",
    title: "Modern Fine Dining",
    titleMalayalam: "ആധുനിക ഫൈൻ ഡൈനിംഗ്",
    catchphrase: "Sculptural minimalism where culinary art takes center stage.",
    catchphraseMalayalam: "ഭക്ഷണത്തിൻ്റെ മനോഹാരിത വെളിവാക്കുന്ന ആധുനിക മിനിമലിസം.",
    description: "Contemporary restaurant styling featuring sculptural ceramics, matte noir cutlery, dark tactile stone surfaces, and focused theatrical lighting.",
    descriptionMalayalam: "കറുത്ത സെറാമിക് പാത്രങ്ങളും മാറ്റ് ബ്ലാക്ക് ഫോർക്കുകളും ചേർന്ന അത്യാധുനിക റെസ്റ്റോറൻ്റ് ശൈലി.",
    tableware: {
      cutleryFinish: "matte-noir",
      cutleryDescription: "PVD coated matte black titanium flatware with ultra-slim geometric handles",
      plateStyle: "handcrafted-stoneware",
      plateDescription: "Speckled volcanic charcoal stoneware with organic irregular rims",
      glasswareStyle: "smoked-gray-tumbler",
      glasswareDescription: "Smoked charcoal stemless crystal glasses with heavy weighted bases",
      linensStyle: "bare-dark-oak",
      linensDescription: "Unadorned natural charred oak dining slab with tactile matte finish",
      napkinFoldName: "Architectural Roll",
      centerpieceDescription: "Single blackened driftwood branch paired with monochromatic stone sculpture"
    },
    lightingAndAmbiance: "Overhead narrow-beam spotlighting creating high-contrast culinary drama",
    colorPalette: {
      primary: "#18181B", // Matte Charcoal
      secondary: "#71717A", // Slate Gray
      accent: "#E4E4E7", // Off White
      neutral: "#27272A" // Dark Basalt
    },
    moodBoardImageUrl: "/brand/images/tablescapes/japanese-wabi-sabi-table.jpg",
    culturalStory: "Celebrating the wabi-sabi philosophy of natural asymmetry and contemporary Nordic-Japanese culinary minimalism.",
    recommendedOccasion: "Degustation Menus, Chef's Table Dinners, Modern Tasting Flights",
    recommendedGuestCount: { min: 2, max: 8 }
  },
  {
    id: "romantic-candlelight",
    slug: "romantic-candlelight",
    title: "Romantic Candlelight",
    titleMalayalam: "പ്രണയ സന്ധ്യ വിരുന്ന്",
    catchphrase: "Intimate whispers framed in dancing flame and delicate crystal.",
    catchphraseMalayalam: "മെഴുകുതിരി വെളിച്ചത്തിൽ വിരിയുന്ന പ്രണയ നിമിഷങ്ങൾ.",
    description: "An intimate fine-dining table set for two. Fluted glassware, soft blush linens, fragrant English garden roses, and glowing tapered beeswax candles.",
    descriptionMalayalam: "റോസ് ഗോൾഡ് കട്ട്ലറിയും ഇളം റോസ് ലിനനും റോസാപ്പൂക്കളും ചേർന്ന ഇരട്ട വിരുന്ന്.",
    tableware: {
      cutleryFinish: "rose-gold",
      cutleryDescription: "Warm brushed rose gold flatware with slender ergonomic profiles",
      plateStyle: "scalloped-porcelain",
      plateDescription: "Soft blush porcelain with delicate scalloped gold-lustre rim",
      glasswareStyle: "organic-coupe-glass",
      glasswareDescription: "Vintage optical ribbed coupe glasses for artisanal cocktails and champagne",
      linensStyle: "dusty-rose-linen",
      linensDescription: "Pre-washed natural dusty rose French linen runner cascading softly to floor",
      napkinFoldName: "Gentle Knot Fold",
      centerpieceDescription: "Cluster of slender brass candleholders with ivory tapers and garden roses"
    },
    lightingAndAmbiance: "Soft candle glow, zero direct overhead lighting, warm 2200K amber intimacy",
    colorPalette: {
      primary: "#9E4770", // Velvet Plum
      secondary: "#B76E79", // Rose Gold
      accent: "#FDE2E4", // Blush
      neutral: "#2B193D" // Midnight Wine
    },
    moodBoardImageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    culturalStory: "Designed to remove all digital and culinary distractions, turning a meal into an unforgettable shared memory.",
    recommendedOccasion: "Valentine's Dinner, Wedding Proposals, Intimate Anniversaries",
    recommendedGuestCount: { min: 2, max: 4 }
  },
  {
    id: "mediterranean-elegance",
    slug: "mediterranean-elegance",
    title: "Mediterranean Elegance",
    titleMalayalam: "മെഡിറ്ററേനിയൻ ശൈലി",
    catchphrase: "Sun-drenched olive groves and effortless coastal warmth.",
    catchphraseMalayalam: "കടൽത്തീര കാറ്റും ഒലിവ് മരങ്ങളും ചേർന്ന യൂറോപ്യൻ വിരുന്ന്.",
    description: "Earthy glazed ceramics, fresh cut olive branches, rough-spun oatmeal linens, artisanal olive oil bowls, and natural afternoon sun.",
    descriptionMalayalam: "നാടൻ ടെറാക്കോട്ട പാത്രങ്ങൾ, ഒലിവ് ഇലകൾ, നാച്വറൽ ലിനൻ എന്നിവയാൽ ഒരുക്കിയ മേശ.",
    tableware: {
      cutleryFinish: "antique-brass",
      cutleryDescription: "Weathered antique brass with rustic wooden riveted handles",
      plateStyle: "rustic-terracotta",
      plateDescription: "Hand-thrown Tuscan terracotta plates with creamy white chalk slip glaze",
      glasswareStyle: "cut-crystal-goblet",
      glasswareDescription: "Hand-blown sea-green recycled glass tumblers and rustic wine carafes",
      linensStyle: "oatmeal-rustic-linen",
      linensDescription: "Heavy-draped oatmeal linen runner with raw frayed selvage edges",
      napkinFoldName: "Rustic Envelope Fold",
      centerpieceDescription: "Abundant garland of freshly clipped olive branches, lemons, and wild rosemary"
    },
    lightingAndAmbiance: "Golden hour sunlit terrace ambiance filtered through pergola foliage",
    colorPalette: {
      primary: "#556B2F", // Olive Green
      secondary: "#C04000", // Terracotta
      accent: "#FAF0E6", // Linen White
      neutral: "#D2B48C" // Sunbleached Teak
    },
    moodBoardImageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    culturalStory: "Inspired by leisurely lunches on the Amalfi coast and Greek islands where sharing food is an unhurried celebration of life.",
    recommendedOccasion: "Al Fresco Lunches, Summer Family Gatherings, Vineyard Banquets",
    recommendedGuestCount: { min: 4, max: 14 }
  },
  {
    id: "festive-indian-grandeur",
    slug: "festive-indian-grandeur",
    title: "Festive Indian Grandeur",
    titleMalayalam: "ഉത്സവ ഭാരതീയ പ്രൗഢി",
    catchphrase: "A symphony of vibrant spices, glowing brass, and celebratory joy.",
    catchphraseMalayalam: "ദീപങ്ങളും പൂക്കളും തിളങ്ങുന്ന ഉത്സവ സദ്യ.",
    description: "Imperial festive celebration tablescape featuring hammered copper vessels, polished brass thalis, glowing terracotta diyas, and fragrant marigold trails.",
    descriptionMalayalam: "പിച്ചള താലങ്ങൾ, ചെമ്പ് പാത്രങ്ങൾ, മഞ്ഞപ്പൂക്കളുടെ മാലകൾ എന്നിവയാൽ ദീപാവലി ശൈലിയിലുള്ള വിരുന്ന്.",
    tableware: {
      cutleryFinish: "gold",
      cutleryDescription: "Intricately engraved Mughal floral-handle gold plated flatware",
      plateStyle: "bell-metal-thali",
      plateDescription: "Heavy embossed silver-and-gold finish royal thali with 6 perimeter bowls",
      glasswareStyle: "hammered-brass-tumbler",
      glasswareDescription: "Hand-chiseled brass lassi glasses and silver rose-water sprinklers",
      linensStyle: "emerald-marigold-silk",
      linensDescription: "Deep emerald green silk table cover with vibrant golden-yellow border",
      napkinFoldName: "Diya Flame Fold",
      centerpieceDescription: "Brass Uruli filled with floating marigold blossoms and 12 glowing brass diyas"
    },
    lightingAndAmbiance: "Warm luminous glow of multiple oil lamps and fairy lights reflecting off brass",
    colorPalette: {
      primary: "#0F52BA", // Royal Sapphire / Emerald
      secondary: "#FFA500", // Marigold Orange
      accent: "#FFD700", // Bright Gold
      neutral: "#4A0E17" // Crimson Rust
    },
    moodBoardImageUrl: "/brand/images/tablescapes/diwali-royal-tablescape.jpg",
    culturalStory: "Evoking the festive splendor of Diwali and Navratri banquets, radiating prosperity, warmth, and culinary abundance.",
    recommendedOccasion: "Diwali Feast, Wedding Sangeet, Festive Family Reunion",
    recommendedGuestCount: { min: 6, max: 24 }
  },
  {
    id: "garden-brunch",
    slug: "garden-brunch",
    title: "Garden Brunch",
    titleMalayalam: "പൂന്തോട്ട ബ്രഞ്ച്",
    catchphrase: "Morning blossoms, crisp champagne, and sunlit botanicals.",
    catchphraseMalayalam: "പ്രഭാത വെളിച്ചവും പൂക്കളും നിറഞ്ഞ പുൽത്തകിടി വിരുന്ന്.",
    description: "Airy outdoor morning setting with pastel botanical fine china, fluted champagne flutes, tiered porcelain dessert stands, and gentle natural light.",
    descriptionMalayalam: "ഹൈ ടീ സ്റ്റാൻഡുകൾ, ഷാംപെയ്ൻ ഗ്ലാസുകൾ, പെസ്റ്റൽ നിറങ്ങൾ എന്നിവ ചേർന്ന പ്രഭാത സൽക്കാരം.",
    tableware: {
      cutleryFinish: "polished-silver",
      cutleryDescription: "Chiseled sterling silver with subtle pearl-beaded borders",
      plateStyle: "scalloped-porcelain",
      plateDescription: "Pastel mint and cream porcelain with delicate hand-painted botanical motifs",
      glasswareStyle: "fluted-champagne-glass",
      glasswareDescription: "Tall crystal flutes for prosecco, mimosas, and elderflower spritzers",
      linensStyle: "sage-botanical-linen",
      linensDescription: "Soft sage green washed linen tablecloth with hemstitch detailing",
      napkinFoldName: "Garden Lily Fold",
      centerpieceDescription: "Ceramic urn overflowing with white hydrangeas, eucalyptus, and ranunculus"
    },
    lightingAndAmbiance: "Dappled morning sunlight filtered through garden pergolas",
    colorPalette: {
      primary: "#8FBC8F", // Sage Green
      secondary: "#FFF0F5", // Lavender Blush
      accent: "#FFD700", // Soft Gold
      neutral: "#F5F5F0" // Bone White
    },
    moodBoardImageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
    culturalStory: "Inspired by European garden conservatory parties, celebrating fresh produce and leisurely morning conversation.",
    recommendedOccasion: "Bridal Brunches, Weekend High Teas, Spring Celebrations",
    recommendedGuestCount: { min: 4, max: 12 }
  },
  {
    id: "dessert-atelier",
    slug: "dessert-atelier",
    title: "Dessert Atelier",
    titleMalayalam: "ഡെസേർട്ട് അറ്റലിയർ",
    catchphrase: "Haute patisserie precision and sweet sensory architecture.",
    catchphraseMalayalam: "മധുര പലഹാരങ്ങൾക്കായുള്ള കലാപരമായ ടേബിൾ ഡിസൈൻ.",
    description: "An exclusive dessert studio presentation with marble pedestal cake stands, gold pastry forks, crystal cloches, coupe glasses, and rich dark textures.",
    descriptionMalayalam: "മാർബിൾ സ്റ്റാൻഡുകൾ, ഗോൾഡ് പേസ്ട്രി ഫോർക്കുകൾ, കപ്പുകൾ എന്നിവയാൽ മധുര വിരുന്ന്.",
    tableware: {
      cutleryFinish: "gold",
      cutleryDescription: "Dainty three-pronged gold pastry forks and polished espresso spoons",
      plateStyle: "fine-bone-china",
      plateDescription: "Glossy black and gold dessert plates with raised coulis wells",
      glasswareStyle: "organic-coupe-glass",
      glasswareDescription: "Fine crystal dessert bowls and cut glassware for sweet infusions",
      linensStyle: "bare-dark-oak",
      linensDescription: "Rich black velvet texture table runner over dark polished timber",
      napkinFoldName: "Bishop's Hat Fold",
      centerpieceDescription: "Tiered white marble cake stands displaying handcrafted confectionary"
    },
    lightingAndAmbiance: "Theatrical pinpoint spot lighting highlighting glazes and sugar crystals",
    colorPalette: {
      primary: "#3D0C11", // Deep Chocolate / Cherry
      secondary: "#D4AF37", // Gold Leaf
      accent: "#FFFDD0", // Vanilla Cream
      neutral: "#1A1A1A" // Charcoal Velvet
    },
    moodBoardImageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=80",
    culturalStory: "Honoring the meticulous artistry of French and Viennese patisseries, where dessert is served as the crowning artistic event.",
    recommendedOccasion: "Post-Dinner Tasting, Cocktail Soirées, Dessert Bars",
    recommendedGuestCount: { min: 2, max: 10 }
  },
  {
    id: "contemporary-global-dining",
    slug: "contemporary-global-dining",
    title: "Contemporary Global Dining",
    titleMalayalam: "സമകാലിക ആഗോള വിരുന്ന്",
    catchphrase: "Cosmopolitan fusion with clean lines and worldwide hospitality.",
    catchphraseMalayalam: "ആഗോള രുചികളെ ഒന്നിപ്പിക്കുന്ന മോഡേൺ ഫ്യൂഷൻ മേശ.",
    description: "International dining styling featuring neutral gray stoneware, sleek satin nickel cutlery, Japanese ceramic chopstick rests, and clean global harmony.",
    descriptionMalayalam: "ഗ്രേ സ്റ്റോൺവെയർ പാത്രങ്ങളും സാറ്റിൻ നിക്കൽ കട്ട്ലറിയും ചേർന്ന ആധുനിക ആഗോള വിരുന്ന്.",
    tableware: {
      cutleryFinish: "polished-silver",
      cutleryDescription: "Brushed satin nickel flatware with minimalist balanced curves",
      plateStyle: "handcrafted-stoneware",
      plateDescription: "Scandinavian matte slate-gray stoneware coupe plates and deep ramen bowls",
      glasswareStyle: "smoked-gray-tumbler",
      glasswareDescription: "Minimalist Scandinavian tumblers and ribbed decanters",
      linensStyle: "oatmeal-rustic-linen",
      linensDescription: "Woven charcoal and neutral flax placemats with clean geometric borders",
      napkinFoldName: "Modern Flat Fold",
      centerpieceDescription: "Sculptural ceramic vase with minimalist dried pampas and lunaria branches"
    },
    lightingAndAmbiance: "Crisp architectural 3000K warm white ceiling pendants",
    colorPalette: {
      primary: "#262626", // Graphite
      secondary: "#9CA3AF", // Cool Slate
      accent: "#F3F4F6", // Pearl Gray
      neutral: "#4B5563" // Cool Charcoal
    },
    moodBoardImageUrl: "/brand/images/tablescapes/coastal-chic-tablescape.jpg",
    culturalStory: "A tribute to modern cosmopolitan dining, bringing East and West together in effortless harmony.",
    recommendedOccasion: "Global Fusion Dinners, Friends Gathering, Contemporary Feasts",
    recommendedGuestCount: { min: 4, max: 12 }
  }
];
