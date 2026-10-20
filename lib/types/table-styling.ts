export type TableCollection =
  | "kerala-sadya-banquet"
  | "festive-indian"
  | "celebrations-banquets"
  | "minimalist-rustic-outdoor";

export type TableShape = "rectangular" | "round" | "square" | "oval";
export type ServingStyle = "banana-leaf" | "traditional-thali" | "plated-western" | "family-sharing" | "buffet";
export type TableSetting = "indoor" | "outdoor" | "semi-covered";
export type TableBudgetLevel = "budget-friendly" | "moderate" | "luxury";

export interface TableItemPlacement {
  itemType: "tablecloth" | "runner" | "placemat" | "plate" | "bowl" | "glass" | "cutlery" | "centerpiece" | "candle" | "napkin" | "banana-leaf";
  name: string;
  nameMalayalam: string;
  xPercent: number; // 0 to 100 on canvas
  yPercent: number; // 0 to 100 on canvas
  rotationDeg?: number;
  colorHex?: string;
  description: string;
}

export interface TableStylingConcept {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  transliteration?: string;
  collection: TableCollection;
  occasion?: string;
  tagline: string;
  description: string;
  descriptionMalayalam: string;
  theme: string;
  recommendedGuestCount: { min: number; max: number };
  tableShape: TableShape;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  servingStyle: ServingStyle;
  moodBoardImageUrl: string;
  topDownLayoutImageUrl?: string;
  tableclothRunner: string;
  plateAndCutleryArrangement: string;
  centerpieceAndFlorals: string;
  napkinFoldingGuide: {
    name: string;
    steps: string[];
    stepsMalayalam: string[];
  };
  lightingAndCandles: string;
  foodPresentationTips: string[];
  foodPresentationTipsMalayalam: string[];
  layoutPlacements: TableItemPlacement[];
  stepByStepGuide: {
    stepNumber: number;
    title: string;
    description: string;
    descriptionMalayalam: string;
  }[];
  estimatedBudgetINR: {
    min: number;
    max: number;
  };
  shoppingList: {
    item: string;
    quantity: string;
    estimatedCostINR: number;
    category: "linens" | "crockery" | "cutlery" | "centerpiece" | "lighting" | "accents";
    retailerUrl?: string;
  }[];
  culturalContext: string;
}

export interface TableGeneratorConfig {
  occasion: string;
  guestCount: number;
  tableShape: TableShape;
  setting: TableSetting;
  budgetLevel: TableBudgetLevel;
  colorPaletteChoice: "emerald" | "saffron" | "ocean" | "ruby" | "ivory" | "terracotta";
  servingStyle: ServingStyle;
  theme: string;
}

export interface GeneratedTablePlan {
  conceptTitle: string;
  conceptTitleMalayalam: string;
  guestCount: number;
  tableShape: TableShape;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  placements: TableItemPlacement[];
  linensRecommendation: string;
  centerpieceRecommendation: string;
  cutleryAndCrockery: string;
  napkinFolding: {
    name: string;
    steps: string[];
    stepsMalayalam: string[];
  };
  lightingRecommendation: string;
  foodPresentationGuide: string[];
  stepByStepGuide: {
    stepNumber: number;
    title: string;
    description: string;
    descriptionMalayalam: string;
  }[];
  estimatedBudgetINR: number;
  shoppingList: {
    item: string;
    quantity: string;
    estimatedCostINR: number;
    category: string;
  }[];
}

export type CutleryFinish = "gold" | "polished-silver" | "matte-noir" | "antique-brass" | "rose-gold";
export type PlateStyle = "fine-bone-china" | "handcrafted-stoneware" | "bell-metal-thali" | "fresh-banana-leaf" | "rustic-terracotta" | "scalloped-porcelain";
export type GlasswareStyle = "cut-crystal-goblet" | "fluted-champagne-glass" | "lead-free-crystal-stemware" | "hammered-brass-tumbler" | "organic-coupe-glass" | "smoked-gray-tumbler";
export type LinensStyle = "belgian-linen-white" | "kasavu-gold-brocade" | "crimson-zardozi-silk" | "oatmeal-rustic-linen" | "dusty-rose-linen" | "sage-botanical-linen" | "emerald-marigold-silk" | "bare-dark-oak";

export interface LuxuryTheme {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  catchphrase: string;
  catchphraseMalayalam: string;
  description: string;
  descriptionMalayalam: string;
  tableware: {
    cutleryFinish: CutleryFinish;
    cutleryDescription: string;
    plateStyle: PlateStyle;
    plateDescription: string;
    glasswareStyle: GlasswareStyle;
    glasswareDescription: string;
    linensStyle: LinensStyle;
    linensDescription: string;
    napkinFoldName: string;
    centerpieceDescription: string;
  };
  lightingAndAmbiance: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  moodBoardImageUrl: string;
  culturalStory: string;
  recommendedOccasion: string;
  recommendedGuestCount: { min: number; max: number };
}

export interface CuratedMealCollection {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  catchphrase: string;
  description: string;
  dishes: {
    name: string;
    course: "starter" | "main" | "accompaniment" | "side" | "dessert";
    description: string;
  }[];
  beveragePairing: {
    name: string;
    type: "traditional-digestive" | "mocktail" | "tea-infusion" | "sparkling-cooler";
    servingVessel: string;
  };
  courseOrder: string[];
  idealThemeId: string;
  occasion: string;
  stylingNotes: string;
}
