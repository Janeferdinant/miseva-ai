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
