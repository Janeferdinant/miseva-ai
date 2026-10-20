import {
  TableGeneratorConfig,
  GeneratedTablePlan,
  TableItemPlacement,
  TableShape,
} from "../types/table-styling";

export const PALETTES = {
  emerald: {
    name: "Kerala Emerald & Kasavu Gold",
    primary: "#1B4D3E",
    secondary: "#C5A059",
    accent: "#34D399",
    neutral: "#F4F6F0",
  },
  saffron: {
    name: "Royal Saffron & Marigold",
    primary: "#E65100",
    secondary: "#FFD700",
    accent: "#FF9800",
    neutral: "#FFF8E7",
  },
  ocean: {
    name: "Malabar Ocean Mist",
    primary: "#0F4C81",
    secondary: "#20B2AA",
    accent: "#48CAE4",
    neutral: "#F0F8FF",
  },
  ruby: {
    name: "Mughal Ruby & Rose Gold",
    primary: "#881337",
    secondary: "#D97706",
    accent: "#F43F5E",
    neutral: "#FFF1F2",
  },
  ivory: {
    name: "Modern Ivory & Pearl",
    primary: "#3D3833",
    secondary: "#C5A059",
    accent: "#E2D9C8",
    neutral: "#FAF8F5",
  },
  terracotta: {
    name: "Rustic Terracotta & Olive",
    primary: "#9C4122",
    secondary: "#D97706",
    accent: "#4D7C0F",
    neutral: "#FDF6EE",
  },
};

export function generateTablePlan(config: TableGeneratorConfig): GeneratedTablePlan {
  const count = Math.max(2, Math.min(24, Math.round(config.guestCount || 4)));
  const shape: TableShape = config.tableShape || "rectangular";
  const palette = PALETTES[config.colorPaletteChoice] || PALETTES.emerald;

  const placements: TableItemPlacement[] = [];

  // 1. Base Linens
  placements.push({
    itemType: "tablecloth",
    name: `${palette.name} Base Tablecloth`,
    nameMalayalam: "മേശവിരി",
    xPercent: 50,
    yPercent: 50,
    colorHex: palette.neutral,
    description: `Heavyweave textured linen cloth in ${palette.neutral} draped over the ${shape} table with 10-inch drop.`,
  });

  if (shape === "rectangular" || shape === "oval") {
    placements.push({
      itemType: "runner",
      name: `${config.theme || "Designer"} Center Runner`,
      nameMalayalam: "കസവ് സെന്റർ റണ്ണർ",
      xPercent: 50,
      yPercent: 50,
      colorHex: palette.secondary,
      description: `Woven handloom runner in ${palette.secondary} running lengthwise down the table spine.`,
    });
  }

  // 2. Centerpiece & Lighting
  const centerpieceName =
    config.servingStyle === "banana-leaf"
      ? "Polished Brass Nilavilakku & Fresh Uruli"
      : config.theme.toLowerCase().includes("candle") || config.budgetLevel === "luxury"
      ? "Crystal Floral Candelabra & Jasmine Uruli"
      : "Low Floral Garland & Ceramic Accent Bowl";

  const centerpieceMalayalam =
    config.servingStyle === "banana-leaf" ? "നിലവിളക്കും ഉരുളിയും" : "മേശപ്പൂക്കളും മെഴുകുതിരികളും";

  placements.push({
    itemType: "centerpiece",
    name: centerpieceName,
    nameMalayalam: centerpieceMalayalam,
    xPercent: 50,
    yPercent: 50,
    colorHex: palette.secondary,
    description: `Central decorative focal point placed low (under 12 inches) to keep guest sightlines clear.`,
  });

  // Candles flanking centerpiece
  placements.push({
    itemType: "candle",
    name: "Brass Votive / Taper Candle Left",
    nameMalayalam: "മെഴുകുതിരി (ഇടത്)",
    xPercent: 36,
    yPercent: 50,
    colorHex: palette.accent,
    description: "Soft flame candle providing warm ambient dinner glow.",
  });
  placements.push({
    itemType: "candle",
    name: "Brass Votive / Taper Candle Right",
    nameMalayalam: "മെഴുകുതിരി (വലത്)",
    xPercent: 64,
    yPercent: 50,
    colorHex: palette.accent,
    description: "Matching right-flank flame candle for visual symmetry.",
  });

  // 3. Guest Place Settings
  if (shape === "rectangular") {
    const topCount = Math.ceil(count / 2);
    const bottomCount = Math.floor(count / 2);

    // Top row
    for (let i = 0; i < topCount; i++) {
      const x = Math.round(18 + (64 / Math.max(1, topCount - 1)) * i);
      addSeatPlacements(placements, i + 1, x, 22, config.servingStyle, palette, 180);
    }
    // Bottom row
    for (let i = 0; i < bottomCount; i++) {
      const x = Math.round(18 + (64 / Math.max(1, bottomCount - 1)) * i);
      addSeatPlacements(placements, topCount + i + 1, x, 78, config.servingStyle, palette, 0);
    }
  } else {
    // Round / Oval / Square radial placement
    const radius = shape === "oval" ? 30 : 32;
    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2;
      const x = Math.round(50 + radius * Math.cos(angle) * (shape === "oval" ? 1.25 : 1));
      const y = Math.round(50 + radius * Math.sin(angle) * (shape === "oval" ? 0.8 : 1));
      const deg = Math.round((angle * 180) / Math.PI + 90);
      addSeatPlacements(placements, i + 1, Math.max(8, Math.min(92, x)), Math.max(12, Math.min(88, y)), config.servingStyle, palette, deg);
    }
  }

  // Budget calculations
  const baseCostPerGuest =
    config.budgetLevel === "luxury"
      ? 1250
      : config.budgetLevel === "moderate"
      ? 650
      : 320;
  const estimatedBudgetINR = Math.round(baseCostPerGuest * count + 800);

  // Napkin guides
  const napkinFolding =
    config.servingStyle === "banana-leaf"
      ? {
          name: "Kasavu Peacock Fan",
          steps: [
            "Lay cream handloom cloth flat with the golden border at the bottom.",
            "Accordion fold across the entire fabric in 1-inch crisp pleats.",
            "Fold in half down the center, flare out the fan, and slip into a polished brass ring.",
          ],
          stepsMalayalam: [
            "കസവ് തുണി നേരെ വിരിക്കുക.",
            "1 ഇഞ്ച് വീതിയിൽ മടക്കുക.",
            "നടുവിലൂടെ മടക്കി മയിൽപ്പീലി പോലെ വിടർത്തി പിച്ചള വളയത്തിൽ വെക്കുക.",
          ],
        }
      : {
          name: "Bishop's Mitre Fold",
          steps: [
            "Fold square linen diagonally into a clean triangle pointing down.",
            "Fold right and left corners down to meet the bottom point.",
            "Turn over, fold bottom point upwards, and tuck the ends into each other to stand erect.",
          ],
          stepsMalayalam: [
            "തുണി ത്രികോണാകൃതിയിൽ മടക്കുക.",
            "ഇരുവശങ്ങളും താഴേക്ക് മടക്കുക.",
            "തിരിച്ച് മറിച്ചിട്ടു മടക്കുകൾ പരസ്പരം തിരുകി നിവർത്തി വെക്കുക.",
          ],
        };

  return {
    conceptTitle: `${config.theme || "Bespoke"} ${shape.toUpperCase()} Tablescape for ${count} Guests`,
    conceptTitleMalayalam: `${count} പേർക്കുള്ള ${config.theme || "വിശേഷ"} മേശാലങ്കാരം`,
    guestCount: count,
    tableShape: shape,
    colorPalette: palette,
    placements,
    linensRecommendation: `Base cloth in ${palette.neutral} with ${palette.name} accents and hand-hemmed edges.`,
    centerpieceRecommendation: `${centerpieceName} accented with seasonal fresh blossoms and brass elements.`,
    cutleryAndCrockery:
      config.servingStyle === "banana-leaf"
        ? "Farm-fresh organic plantain leaves oriented with tip pointing left, accompanied by heavy brass water kindi/tumblers."
        : config.servingStyle === "traditional-thali"
        ? "Polished Kansa bell-metal or heavy brass thalis with 5 matching katori bowls and brass water glasses."
        : "Fine matte-finish porcelain dinner plates, soup bowls, and brushed gold 18/10 stainless steel flatware.",
    napkinFolding,
    lightingRecommendation:
      config.setting === "outdoor"
        ? "Battery-operated warm fairy string lights overhead plus hurricane-shielded glass candle holders."
        : "Natural flame brass lamps complemented by soft 2700K ambient room lighting (dimmed to 40%).",
    foodPresentationGuide:
      config.servingStyle === "banana-leaf"
        ? [
            "Lay leaves right-side up; wipe gently with warm water before guests arrive.",
            "Salt, chips, and sweet ginger tamarind (Inji Puli) strictly on top left edge.",
            "Steamed Matta rice centered with fragrant golden ghee and parippu.",
          ]
        : [
            "Stack warm plates just 5 minutes before seating.",
            "Present vibrant garnish (micro-greens, toasted spices) immediately before serving.",
            "Ensure beverage glasses are filled with citrus/herb-infused water upon seating.",
          ],
    stepByStepGuide: [
      {
        stepNumber: 1,
        title: "Iron and Lay Base Linens",
        description: `Steam or press the ${palette.neutral} base cloth. Center the runner along the ${shape} axis with equal overhang.`,
        descriptionMalayalam: "മേശവിരി ചുളിവുകൾ മാറ്റി വിരിച്ചു റണ്ണർ നടുവിലായി ഇടുക.",
      },
      {
        stepNumber: 2,
        title: "Anchor Centerpiece & Ambient Lighting",
        description: `Position ${centerpieceName} at dead center. Space flanking votive candles 14 inches to either side.`,
        descriptionMalayalam: "നിലവിളക്കും പൂക്കളും മെഴുകുതിരികളും നടുവിലായി നിരത്തുക.",
      },
      {
        stepNumber: 3,
        title: "Align Guest Place Settings",
        description: `Position each place setting precisely 1 inch from table edge. Ensure water glasses sit top-right of the plate.`,
        descriptionMalayalam: "പ്ലേറ്റുകളും ഗ്ലാസുകളും ഓരോരുത്തർക്കും സൗകര്യപ്രദമായ അകലത്തിൽ വെക്കുക.",
      },
      {
        stepNumber: 4,
        title: "Fold Napkins and Final Florals",
        description: `Fold ${napkinFolding.name} napkins and tuck into rings. Add fresh jasmine or marigolds to the water bowls.`,
        descriptionMalayalam: "തുണി മടക്കി വളയങ്ങളിൽ ഇട്ടു പൂക്കൾ വിതറുക.",
      },
    ],
    estimatedBudgetINR,
    shoppingList: [
      {
        item: `${palette.name} Linen Tablecloth & Runner`,
        quantity: "1 Set",
        estimatedCostINR: Math.round(estimatedBudgetINR * 0.35),
        category: "linens",
      },
      {
        item: config.servingStyle === "banana-leaf" ? "Fresh Cut Plantain Leaves" : "Dinnerware / Thalis",
        quantity: `${count} Pieces`,
        estimatedCostINR: Math.round(estimatedBudgetINR * 0.28),
        category: "crockery",
      },
      {
        item: "Fresh Florals (Marigold / Jasmine / Orchids)",
        quantity: "1 Basket",
        estimatedCostINR: Math.round(estimatedBudgetINR * 0.18),
        category: "centerpiece",
      },
      {
        item: "Pure Sesame Oil / Wax Pillar Candles",
        quantity: "4 Units",
        estimatedCostINR: Math.round(estimatedBudgetINR * 0.1),
        category: "lighting",
      },
      {
        item: "Handloom Cotton Napkins & Rings",
        quantity: `${count} Units`,
        estimatedCostINR: Math.round(estimatedBudgetINR * 0.09),
        category: "accents",
      },
    ],
  };
}

function addSeatPlacements(
  placements: TableItemPlacement[],
  seatIndex: number,
  x: number,
  y: number,
  servingStyle: string,
  palette: typeof PALETTES.emerald,
  rotationDeg: number
) {
  if (servingStyle === "banana-leaf") {
    placements.push({
      itemType: "banana-leaf",
      name: `Banana Leaf (Guest ${seatIndex})`,
      nameMalayalam: `വാഴയില (${seatIndex})`,
      xPercent: x,
      yPercent: y,
      rotationDeg,
      colorHex: palette.accent,
      description: `Washed tapered plantain leaf with tip facing left.`,
    });
    placements.push({
      itemType: "glass",
      name: `Tumbler (${seatIndex})`,
      nameMalayalam: `ഗ്ലാസ്`,
      xPercent: Math.max(5, Math.min(95, x - 4)),
      yPercent: Math.max(5, Math.min(95, y > 50 ? y - 10 : y + 10)),
      colorHex: palette.secondary,
      description: "Brass water tumbler.",
    });
  } else {
    placements.push({
      itemType: "plate",
      name: `Place Setting (Guest ${seatIndex})`,
      nameMalayalam: `പ്ലേറ്റ് (${seatIndex})`,
      xPercent: x,
      yPercent: y,
      rotationDeg,
      colorHex: palette.neutral,
      description: `Charger and dinner plate.`,
    });
    placements.push({
      itemType: "glass",
      name: `Water Goblet (${seatIndex})`,
      nameMalayalam: `ഗ്ലാസ്`,
      xPercent: Math.max(5, Math.min(95, x + 5)),
      yPercent: Math.max(5, Math.min(95, y > 50 ? y - 10 : y + 10)),
      colorHex: palette.primary,
      description: "Crystal water glass.",
    });
    placements.push({
      itemType: "cutlery",
      name: `Cutlery (${seatIndex})`,
      nameMalayalam: `സ്പൂൺ/ഫോർക്ക്`,
      xPercent: Math.max(5, Math.min(95, x - 5)),
      yPercent: y,
      colorHex: palette.secondary,
      description: "Polished fork & knife.",
    });
  }
}
