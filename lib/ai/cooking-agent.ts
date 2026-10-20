import { Recipe } from "../types/recipe";
import { RECIPES } from "../data/recipes";

export type ChefIntent =
  | "FIND_BY_INGREDIENTS"
  | "EXPLAIN_TECHNIQUE"
  | "SUBSTITUTION"
  | "DIETARY_RECIPES"
  | "BUDGET_ADVICE"
  | "GENERAL_COOKING";

export interface ChefResponse {
  intent: ChefIntent;
  reply: string;
  replyMalayalam: string;
  suggestedRecipes: Recipe[];
  actionSuggestions: string[];
}

export interface PantryMatchResult {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}

export interface SubstitutionInfo {
  original: string;
  alternatives: string[];
  notes: string;
}

const SUBSTITUTIONS: Record<string, SubstitutionInfo> = {
  "sour curd": {
    original: "Sour Curd / Yogurt",
    alternatives: ["Raw green mango (Pacha Manga)", "Tamarind pulp extract", "Fresh lemon juice with cashew paste"],
    notes: "For vegan Avial or Sadya curries, raw green mango gives the exact authentic fruity sourness without dairy.",
  },
  ghee: {
    original: "Pure Cow Ghee",
    alternatives: ["Virgin Cold-Pressed Coconut Oil", "Mustard Oil", "Toasted Sesame Oil"],
    notes: "Coconut oil provides rich body for South Indian dishes; cold-pressed mustard oil works wonders in Bengali & Punjabi dishes.",
  },
  "jeerakasala rice": {
    original: "Jeerakasala / Khaima Rice",
    alternatives: ["Seeraga Samba rice", "Gobindobhog rice", "Aged Basmati"],
    notes: "Seeraga Samba from Tamil Nadu is the closest equivalent short aromatic grain for Malabar or Dindigul biryani.",
  },
  kalpasi: {
    original: "Kalpasi (Stone Flower)",
    alternatives: ["Star Anise", "Black Cardamom", "Mace (Javitri)"],
    notes: "Provides the earthy, woody baseline essential for authentic Chettinad gravies.",
  },
  "mustard oil": {
    original: "Kachi Ghani Mustard Oil",
    alternatives: ["Peanut / Groundnut oil with a touch of crushed mustard", "Sesame oil"],
    notes: "Always bring pure mustard oil to its smoking point and let cool slightly before cooking to soften pungent allyl isothiocyanate.",
  },
  feta: {
    original: "Feta Cheese",
    alternatives: ["Fresh Paneer with lemon and salt", "Firm salted Tofu"],
    notes: "Soaking paneer cubes in salted water with a dash of lemon juice mimics feta's salty, creamy sharpness.",
  },
};

const TECHNIQUES: Record<string, { en: string; ml: string }> = {
  coconut_oil: {
    en: "Drizzling raw, cold-pressed coconut oil at the very end of cooking (off the heat) volatilizes delicate aroma compounds without burning them. Cooking coconut oil on prolonged high heat destroys its signature nutty sweetness.",
    ml: "തീ അണച്ച ശേഷം പച്ച വെളിച്ചെണ്ണ ഒഴിക്കുന്നത് അതിന്റെ സ്വാഭാവിക സുഗന്ധം നഷ്ടപ്പെടാതെ നിലനിർത്താനാണ്. തിളച്ച എണ്ണയിൽ സുഗന്ധ തന്മാത്രകൾ നശിച്ചുപോകും.",
  },
  mantecatura: {
    en: "Mantecatura is the art of vigorously beating ice-cold cubed butter and grated Parmigiano Reggiano into hot risotto OFF the flame. The temperature differential emulsifies the rice amylopectin starches with fat, creating a silky, creamy wave ('all'onda') without heavy cream.",
    ml: "തീ അണച്ച ശേഷം തണുത്ത വെണ്ണയും പാർമെസാൻ ചീസും ചേർത്ത് നന്നായി കടഞ്ഞെടുക്കുന്നതിനെയാണ് മാന്തെകാതുറ എന്ന് വിളിക്കുന്നത്. അരിയിലെ അന്നജവും കൊഴുപ്പും ചേർന്ന് സ്വാഭാവിക ക്രീം ഉണ്ടാകുന്നു.",
  },
  tadka: {
    en: "Tadka (blooming spices in hot oil or ghee) is essential because spice flavor compounds (curcumin in turmeric, piperine in pepper, cuminaldehyde in cumin) are fat-soluble. Blooming extracts and distributes their aromatics throughout the dish far better than water boiling.",
    ml: "എണ്ണയിലോ നെയ്യിലോ സുഗന്ധവ്യഞ്ജനങ്ങൾ മൂപ്പിക്കുമ്പോൾ (താളിക്കൽ) അവയിലെ സുഗന്ധ തൈലങ്ങൾ പുറത്തുവരികയും കറിയുടെ രുചി ഇരട്ടിയാക്കുകയും ചെയ്യുന്നു.",
  },
  kachchi_dum: {
    en: "In Hyderabadi Kachchi Dum, raw meat tenderized with raw green papaya enzyme (papain) is cooked simultaneously with 70% parboiled rice. The meat releases steam that carries fragrant meat juices upward, seasoning each rice grain as it cooks.",
    ml: "പപ്പായയിലെ പപ്പൈൻ എന്ന എൻസൈം ഇറച്ചിയെ മൃദുവാക്കുന്നു. പാകമായ ചോറും പച്ച മാംസവും ഒരുമിച്ച് അടച്ച് ദം ചെയ്യുമ്പോൾ ഇറച്ചിയിലെ ആവി ചോറിനെ അതീവ രുചിയുള്ളതാക്കുന്നു.",
  },
};

export function getSubstitutionSuggestion(ingredientName: string): SubstitutionInfo | undefined {
  const q = ingredientName.toLowerCase().trim();
  for (const [key, val] of Object.entries(SUBSTITUTIONS)) {
    if (q.includes(key) || key.includes(q)) return val;
  }
  return undefined;
}

export function matchRecipesByPantry(pantryIngredients: string[]): PantryMatchResult[] {
  if (!pantryIngredients || pantryIngredients.length === 0) return [];

  const normalizedPantry = pantryIngredients.map((i) => i.toLowerCase().trim());

  interface ScoredResult extends PantryMatchResult {
    score: number;
  }

  const results: ScoredResult[] = RECIPES.map((recipe) => {
    const matched: string[] = [];
    const missing: string[] = [];
    const coveredPantry = new Set<string>();

    for (const ing of recipe.ingredients) {
      const ingName = ing.name.toLowerCase();
      let matchedAny = false;

      for (const p of normalizedPantry) {
        if (ingName.includes(p) || p.includes(ingName)) {
          matchedAny = true;
          coveredPantry.add(p);
        }
      }

      if (matchedAny) {
        matched.push(ing.name);
      } else {
        missing.push(ing.name);
      }
    }

    const matchPercentage =
      recipe.ingredients.length > 0
        ? Math.round((matched.length / recipe.ingredients.length) * 100)
        : 0;

    // Distinct pantry items matched carries dominant weight
    const score = coveredPantry.size * 1000 + matchPercentage;

    return {
      recipe,
      matchPercentage,
      matchedIngredients: matched,
      missingIngredients: missing,
      score,
    };
  });

  return results
    .filter((r) => r.matchPercentage > 0)
    .sort((a, b) => b.score - a.score);
}

export interface AiSecurityAuditStatus {
  hasPromptInjectionMitigation: boolean;
  hasInputLengthLimits: boolean;
  disallowsSystemOverride: boolean;
}

export const AI_SECURITY_CONTROLS: AiSecurityAuditStatus = {
  hasPromptInjectionMitigation: true,
  hasInputLengthLimits: true,
  disallowsSystemOverride: true,
};

const PROMPT_INJECTION_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /system prompt/i,
  /override (the )?system/i,
  /developer mode/i,
  /bypass safety/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/i,
];

export function sanitizeUserPrompt(rawQuery: string): { sanitized: string; blocked: boolean; reason?: string } {
  if (!rawQuery || typeof rawQuery !== "string") {
    return { sanitized: "", blocked: false };
  }

  // Enforce 1000 char maximum length to mitigate resource exhaustion
  const truncated = rawQuery.slice(0, 1000).trim();

  // Inspect for system override or injection attempts
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(truncated)) {
      return {
        sanitized: "Safe cooking guidance request",
        blocked: true,
        reason: "Prompt injection or unsafe system override attempt detected.",
      };
    }
  }

  return { sanitized: truncated, blocked: false };
}

export function processChefQuery(query: string): ChefResponse {
  const { sanitized, blocked, reason } = sanitizeUserPrompt(query);

  if (blocked) {
    return {
      intent: "GENERAL_COOKING",
      reply: `I am CulinaryVerse AI, your dedicated cooking companion. I focus strictly on culinary science, authentic recipes, and table styling. How can I assist with your cooking today?`,
      replyMalayalam: `പാചകക്കുറിപ്പുകൾ, ഭക്ഷണ രീതികൾ, വിഭവങ്ങൾ എന്നിവയിൽ മാത്രമേ എന്നോട് ചോദിക്കാൻ കഴിയൂ. എന്ത് വിഭവമാണ് ഇന്ന് തയ്യാറാക്കേണ്ടത്?`,
      suggestedRecipes: RECIPES.slice(0, 2),
      actionSuggestions: ["Show trending Kerala recipes", "Explain Tadka technique", "What can I cook with rice and coconut?"],
    };
  }

  const q = sanitized.toLowerCase().trim();

  // 1. TECHNIQUE QUERY
  if (
    q.includes("why") ||
    q.includes("technique") ||
    q.includes("how does") ||
    q.includes("explain") ||
    q.includes("enthanu")
  ) {
    if (q.includes("coconut oil") || q.includes("velichenna") || q.includes("avial")) {
      return {
        intent: "EXPLAIN_TECHNIQUE",
        reply: TECHNIQUES.coconut_oil.en,
        replyMalayalam: TECHNIQUES.coconut_oil.ml,
        suggestedRecipes: RECIPES.filter((r) => r.id === "kerala-avial"),
        actionSuggestions: ["View Kerala Sadya Avial", "Explore Kerala Spices", "Ask about Sadya traditions"],
      };
    }
    if (q.includes("mantecatura") || q.includes("risotto") || q.includes("cold butter")) {
      return {
        intent: "EXPLAIN_TECHNIQUE",
        reply: TECHNIQUES.mantecatura.en,
        replyMalayalam: TECHNIQUES.mantecatura.ml,
        suggestedRecipes: RECIPES.filter((r) => r.id === "italian-risotto-funghi"),
        actionSuggestions: ["View Risotto ai Funghi", "Learn Al Dente secrets", "Mushroom preparation tips"],
      };
    }
    if (q.includes("tadka") || q.includes("temper") || q.includes("chhonk") || q.includes("thalikkal")) {
      return {
        intent: "EXPLAIN_TECHNIQUE",
        reply: TECHNIQUES.tadka.en,
        replyMalayalam: TECHNIQUES.tadka.ml,
        suggestedRecipes: RECIPES.filter((r) => r.cuisine === "Kerala" || r.cuisine === "Punjabi"),
        actionSuggestions: ["Tadka spice temperatures", "Oil vs Ghee for tempering", "Common tempering mistakes"],
      };
    }
  }

  // 2. SUBSTITUTION QUERY
  if (
    q.includes("substitute") ||
    q.includes("instead of") ||
    q.includes("alternative") ||
    q.includes("pakaram")
  ) {
    for (const [key, sub] of Object.entries(SUBSTITUTIONS)) {
      if (q.includes(key)) {
        return {
          intent: "SUBSTITUTION",
          reply: `For ${sub.original}, the finest chef substitutes are: ${sub.alternatives.join(", ")}. Note: ${sub.notes}`,
          replyMalayalam: `${sub.original} ന് പകരമായി ${sub.alternatives.join(", ")} ഉപയോഗിക്കാം. ഇത് തനത് രുചി കാത്തുസൂക്ഷിക്കും.`,
          suggestedRecipes: RECIPES.slice(0, 2),
          actionSuggestions: [`Can I use ${sub.alternatives[0]}?`, "Check ingredient price", "View recipes without this"],
        };
      }
    }
  }

  // 3. PANTRY INGREDIENTS QUERY
  const pantryKeywords = [
    "coconut", "plantain", "chicken", "mutton", "yam", "rice", "potatoes",
    "tomatoes", "onions", "prawns", "mushrooms", "eggs", "mustard",
  ];
  const detectedPantry = pantryKeywords.filter((k) => q.includes(k));

  if (detectedPantry.length > 0) {
    const matches = matchRecipesByPantry(detectedPantry);
    const topMatches = matches.slice(0, 3).map((m) => m.recipe);

    return {
      intent: "FIND_BY_INGREDIENTS",
      reply: `I analyzed your pantry with ${detectedPantry.join(", ")}. Here are ${topMatches.length} authentic dishes you can prepare right now!`,
      replyMalayalam: `നിങ്ങളുടെ പക്കലുള്ള ${detectedPantry.join(", ")} വെച്ച് തയ്യാറാക്കാവുന്ന ഏറ്റവും മികച്ച വിഭവങ്ങൾ ഇതാ!`,
      suggestedRecipes: topMatches.length > 0 ? topMatches : RECIPES.slice(0, 2),
      actionSuggestions: [
        `Scale for 2 servings`,
        `Calculate grocery cost for missing items`,
        `Start voice-guided cooking`,
      ],
    };
  }

  // 4. DIETARY & GENERAL COOKING
  let matched = RECIPES;
  if (q.includes("vegetarian") || q.includes("veg")) {
    matched = RECIPES.filter((r) => r.dietary.includes("vegetarian"));
  } else if (q.includes("protein")) {
    matched = RECIPES.filter((r) => r.dietary.includes("high-protein"));
  } else if (q.includes("breakfast")) {
    matched = RECIPES.filter((r) => r.mealType === "breakfast");
  }

  return {
    intent: "GENERAL_COOKING",
    reply: `Welcome to CulinaryVerse AI! I'm your interactive master chef. You can ask me for recipe recommendations, ingredient substitutions, culinary science explanations, or hands-free cooking guidance.`,
    replyMalayalam: `CulinaryVerse AI-ലേക്ക് സ്വാഗതം! നിങ്ങളുടെ പാചക സഹായിയായി ഞാൻ ഇവിടെയുണ്ട്. പാചകക്കുറിപ്പുകൾ, ചേരുവകൾ, പുതിയ രീതികൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.`,
    suggestedRecipes: matched.slice(0, 3),
    actionSuggestions: [
      "What can I cook with coconut and rice?",
      "Why temper spices in oil first?",
      "Show high-protein Kerala breakfast dishes",
    ],
  };
}
