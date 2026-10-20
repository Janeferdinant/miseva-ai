import {
  LuxuryTheme,
  CutleryFinish,
  PlateStyle,
  GlasswareStyle,
  LinensStyle,
  TableShape
} from "@/lib/types/table-styling";

export interface PresentationPromptOptions {
  selectedDishes?: string[];
  guestCount: number;
  tableShape: TableShape;
  occasion: string;
  cutleryOverride?: CutleryFinish;
  plateOverride?: PlateStyle;
  glasswareOverride?: GlasswareStyle;
  linensOverride?: LinensStyle;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}

export interface ThemePromptResult {
  prompt: string;
  negativePrompt: string;
  metadata: {
    themeId: string;
    themeTitle: string;
    guestCount: number;
    dishesCount: number;
    tableShape: TableShape;
    aspectRatio: string;
    cachedMoodboardUrl: string;
  };
}

const THEME_DEFAULT_DISHES: Record<string, string[]> = {
  "royal-heritage": ["Mughlai Dum Biryani", "Shahi Paneer", "Tandoori Garlic Naan", "Dal Makhani", "Gulab Jamun"],
  "five-star-luxury": ["Cream of Wild Truffle Soup", "Herb Grilled Polenta", "Roasted Asparagus", "Classic Tiramisu"],
  "kerala-royal-feast": ["Kerala Matta Rice", "Kerala Sambar", "Traditional Avial", "Cabbage Thoran", "Palada Pradhaman"],
  "modern-fine-dining": ["Sculptural Charcoal Seared Medallion", "Wild Mushroom Purée", "Micro-herbs", "Deconstructed Tart"],
  "romantic-candlelight": ["Saffron Risotto", "Pan-seared Truffle Vegetables", "Rose Berry Tart", "Sparkling Bellini"],
  "mediterranean-elegance": ["Artisanal Olive Focaccia", "Penne al Pomodoro", "Grilled Artichokes", "Sea Salt Gelato"],
  "festive-indian-grandeur": ["Kashmiri Rogan Curry", "Jeera Basmati Pulao", "Amritsari Kulcha", "Kesar Peda"],
  "garden-brunch": ["Cucumber Herb Ribbon Sandwiches", "Warm Clotted Cream Scones", "Glazed Fruit Tartlets", "First Flush Darjeeling"],
  "dessert-atelier": ["Valrhona Molten Chocolate Fondant", "Kerala Chakka Pradhaman", "New York Cheesecake", "Vanilla Gelato"],
  "contemporary-global-dining": ["Sesame Miso Ramen Bowl", "Pan-fried Gyoza Dumplings", "Chilled Edamame", "Green Tea Mousse"]
};

export function generateThemePrompt(theme: LuxuryTheme, options: PresentationPromptOptions): ThemePromptResult {
  const dishes = options.selectedDishes && options.selectedDishes.length > 0
    ? options.selectedDishes
    : THEME_DEFAULT_DISHES[theme.id] || ["Gourmet Culinary Course", "Artisanal Bread", "Heritage Dessert"];

  const cutlery = options.cutleryOverride || theme.tableware.cutleryFinish;
  const plate = options.plateOverride || theme.tableware.plateStyle;
  const glassware = options.glasswareOverride || theme.tableware.glasswareStyle;
  const linens = options.linensOverride || theme.tableware.linensStyle;
  const aspectRatio = options.aspectRatio || "16:9";

  const prompt = [
    `Award-winning editorial food and dining photography of a luxurious dining table setting.`,
    `Theme: "${theme.title}" (${theme.catchphrase}).`,
    `Cultural Aesthetic: ${theme.culturalStory}`,
    `Table Setup: Formally set for ${options.guestCount} guests on an elegant ${options.tableShape} dining table.`,
    `Tableware Specifications:`,
    `- Cutlery Finish: ${cutlery} finish, professionally balanced dinner forks, knives, and dessert spoons placed in perfect course alignment.`,
    `- Plates & Presentation: ${plate} serving plates and charger platters, spotless luxury restaurant quality.`,
    `- Glassware: ${glassware}, crystal-clear goblets and water vessels sparkling under ambient light.`,
    `- Linens & Textiles: ${linens} table runner with neatly folded napkins in ${theme.tableware.napkinFoldName}.`,
    `- Centerpiece & Decor: ${theme.tableware.centerpieceDescription}.`,
    `- Lighting Atmosphere: ${theme.lightingAndAmbiance}.`,
    `Featured Plated Dishes: ${dishes.join(", ")}. Every dish looks freshly cooked, garnished with culinary precision, appetizing steam and authentic textures.`,
    `Occasion Context: ${options.occasion}.`,
    `Cinematography: Shot with an 85mm f/1.8 prime lens, high depth-of-field food magazine perspective, soft rim light, natural reflections, balanced negative space, ultra-high definition 8K.`
  ].join(" ");

  const negativePrompt = [
    "low quality, blurry, distorted cutlery, duplicated forks, floating spoons, warped plates, plastic utensils, messy table, artificial looking food, cartoonish, oversaturated, dirty napkins, crowded chaotic arrangement, extra limbs, unrealistic reflections, watermark, text labels"
  ].join(", ");

  return {
    prompt,
    negativePrompt,
    metadata: {
      themeId: theme.id,
      themeTitle: theme.title,
      guestCount: options.guestCount,
      dishesCount: dishes.length,
      tableShape: options.tableShape,
      aspectRatio,
      cachedMoodboardUrl: theme.moodBoardImageUrl
    }
  };
}
