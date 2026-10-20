"use client";

import React from "react";

export interface EmblemMetadata {
  id: string;
  name: string;
  nameMalayalam: string;
  primaryElement: string;
  motif: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export const REGION_EMBLEM_MAP: Record<string, EmblemMetadata> = {
  // South India
  kerala: {
    id: "kerala",
    name: "Kerala",
    nameMalayalam: "കേരളം",
    primaryElement: "Bronze Uruli & Coconut Palm",
    motif: "Traditional heavy bell-metal bronze Uruli cooking vessel flanked by coconut palm fronds and tellicherry black peppercorns",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      accent: "#f59e0b",
      background: "#022c22"
    }
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    nameMalayalam: "തമിഴ്നാട്",
    primaryElement: "Brass Davara-Tumbler & Gopuram Arch",
    motif: "Hand-hammered brass coffee davara-tumbler crowned by temple gopuram arch and mustard-curry leaf tadka",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#ef4444",
      background: "#451a03"
    }
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka",
    nameMalayalam: "കർണാടക",
    primaryElement: "Mysore Stone Mortar & Golden Ghee Dosa",
    motif: "Ancient stone pestle grinding Udupi spices with Mysore pak diamond medallion and banana leaf roll",
    colors: {
      primary: "#eab308",
      secondary: "#ca8a04",
      accent: "#06b6d4",
      background: "#422006"
    }
  },
  "andhra-telangana": {
    id: "andhra-telangana",
    name: "Andhra & Telangana",
    nameMalayalam: "ആന്ധ്രാ & തെലങ്കാന",
    primaryElement: "Fiery Guntur Chili & Royal Dum Handi",
    motif: "Clay Nizam dum biryani sealed handi flanked by fiery curved Guntur scarlet red chilies and tangy gongura leaves",
    colors: {
      primary: "#ef4444",
      secondary: "#b91c1c",
      accent: "#f97316",
      background: "#450a0a"
    }
  },

  // North India
  punjab: {
    id: "punjab",
    name: "Punjab",
    nameMalayalam: "പഞ്ചാബ്",
    primaryElement: "Clay Tandoor & Golden Wheat Sheaves",
    motif: "Earthen tandoor oven radiant with embers, topped with crossed stalks of golden harvest wheat and a wooden butter madhani",
    colors: {
      primary: "#f59e0b",
      secondary: "#ea580c",
      accent: "#84cc16",
      background: "#451a03"
    }
  },
  kashmir: {
    id: "kashmir",
    name: "Kashmir",
    nameMalayalam: "കശ്മീർ",
    primaryElement: "Engraved Copper Samovar & Saffron Crocus",
    motif: "Intricately engraved Chinar-leaf copper tea samovar blooming with purple saffron crocus petals and cardamom pods",
    colors: {
      primary: "#a855f7",
      secondary: "#9333ea",
      accent: "#f59e0b",
      background: "#3b0764"
    }
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    nameMalayalam: "ഉത്തർപ്രദേശ്",
    primaryElement: "Awadhi Copper Lagan & Silver Leaf Rose",
    motif: "Wide royal copper lagan cooking pan embellished with silver vark foil, Damask rose petals, and aromatic star anise",
    colors: {
      primary: "#ec4899",
      secondary: "#db2777",
      accent: "#eab308",
      background: "#500724"
    }
  },
  delhi: {
    id: "delhi",
    name: "Delhi",
    nameMalayalam: "ഡൽഹി",
    primaryElement: "Iron Karahi & Old Delhi Spice Crescent",
    motif: "Deep cast-iron karahi with brass skimmer, surrounded by crescent of whole cumin, mace, and golden crisp bhatura",
    colors: {
      primary: "#f97316",
      secondary: "#c2410c",
      accent: "#38bdf8",
      background: "#431407"
    }
  },

  // West India
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    nameMalayalam: "ഗുജറാത്ത്",
    primaryElement: "Brass Katori Thali & Steaming Dhokla Cube",
    motif: "Ornate Saurashtra brass serving thali rimmed with traditional katoris, topped with mustard-tempered dhokla and green chili",
    colors: {
      primary: "#eab308",
      secondary: "#ca8a04",
      accent: "#10b981",
      background: "#422006"
    }
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    nameMalayalam: "മഹാരാഷ്ട്ര",
    primaryElement: "Cast-Iron Tawa & Mumbai Goda Pav",
    motif: "Seasoned cast-iron flat tawa with golden toasted pav, fresh garlic chutney pod, and fragrant coriander crest",
    colors: {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#14b8a6",
      background: "#431407"
    }
  },
  goa: {
    id: "goa",
    name: "Goa",
    nameMalayalam: "ഗോവ",
    primaryElement: "Terracotta Balchao Pot & Purple Kokum Petals",
    motif: "Red clay Portuguese-Konkan balchão stew vessel garlanded by deep crimson dried kokum fruit and cinnamon quills",
    colors: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#f43f5e",
      background: "#083344"
    }
  },
  rajasthan: {
    id: "rajasthan",
    name: "Rajasthan",
    nameMalayalam: "രാജസ്ഥാൻ",
    primaryElement: "Desert Earthen Handi & Ker-Sangri Pods",
    motif: "Traditional Marwari sand-textured earthen handi flanked by desert wild ker berries, sangri bean pods, and ghee swirl",
    colors: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      accent: "#f59e0b",
      background: "#4c0519"
    }
  },

  // East & Northeast India
  "west-bengal": {
    id: "west-bengal",
    name: "West Bengal",
    nameMalayalam: "പശ്ചിമ ബംഗാൾ",
    primaryElement: "Mustard Flower Crest & Earthen Fish Deck",
    motif: "Terracotta fish currying pot encircled by blooming yellow Shorshe mustard blossoms and Panch Phoron seeds",
    colors: {
      primary: "#eab308",
      secondary: "#ca8a04",
      accent: "#0ea5e9",
      background: "#422006"
    }
  },
  odisha: {
    id: "odisha",
    name: "Odisha",
    nameMalayalam: "ഒഡീഷ",
    primaryElement: "Puri Temple Kudua & Caramelized Chhena",
    motif: "Sacred earthen Kudua clay pot from Jagannath temple Mahaprasad legacy, surrounded by sal leaf and golden chhena poda",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#ec4899",
      background: "#451a03"
    }
  },
  "assam-northeast": {
    id: "assam-northeast",
    name: "Assam & Northeast",
    nameMalayalam: "അസം & വടക്കുകിഴക്കൻ സംസ്ഥാനങ്ങൾ",
    primaryElement: "Woven Bamboo Basket & Fresh Tea Flush",
    motif: "Handwoven Assamese bamboo Japi-inspired basket cradle with fresh two-leaves-and-a-bud tea shoots and bhoot jolokia",
    colors: {
      primary: "#10b981",
      secondary: "#047857",
      accent: "#ef4444",
      background: "#022c22"
    }
  },

  // Global Cuisines
  italy: {
    id: "italy",
    name: "Italian",
    nameMalayalam: "ഇറ്റാലിയൻ",
    primaryElement: "Terracotta Pizza Peel & Genovese Basil Sprig",
    motif: "Artisanal wooden pizza peel and ridged pasta gnocchi board topped with San Marzano tomato, olive branch, and sweet basil",
    colors: {
      primary: "#ef4444",
      secondary: "#dc2626",
      accent: "#16a34a",
      background: "#450a0a"
    }
  },
  japan: {
    id: "japan",
    name: "Japanese",
    nameMalayalam: "ജാപ്പനീസ്",
    primaryElement: "Lacquered Bento & Seigaiha Wave Ceramic",
    motif: "Minimalist black-and-vermilion lacquered ceramic ramen bowl with natural bamboo chopsticks and floating sakura blossom",
    colors: {
      primary: "#e11d48",
      secondary: "#be123c",
      accent: "#f43f5e",
      background: "#4c0519"
    }
  },
  mexico: {
    id: "mexico",
    name: "Mexican",
    nameMalayalam: "മെക്സിക്കൻ",
    primaryElement: "Volcanic Stone Molcajete & Blue Agave",
    motif: "Ancient carved volcanic basalt molcajete mortar with tejocote pestle, roasted serrano chilies, and blue agave crest",
    colors: {
      primary: "#14b8a6",
      secondary: "#0d9488",
      accent: "#f97316",
      background: "#042f2e"
    }
  },
  thailand: {
    id: "thailand",
    name: "Thai",
    nameMalayalam: "തായ്",
    primaryElement: "Golden Brass Wok & Makrut Lime Leaves",
    motif: "Curved golden Thai brass wok vessel with bruised lemongrass stalk, double-lobed makrut lime leaves, and galangal root",
    colors: {
      primary: "#84cc16",
      secondary: "#65a30d",
      accent: "#f59e0b",
      background: "#1a2e05"
    }
  },
  "middle-east": {
    id: "middle-east",
    name: "Middle Eastern & Levantine",
    nameMalayalam: "മിഡിൽ ഈസ്റ്റേൺ",
    primaryElement: "Copper Tagine Conical Dome & Pomegranate",
    motif: "Engraved Moroccan copper conical tagine surrounded by halved ruby pomegranate arils, wild thyme zaatar, and sesame",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#be123c",
      background: "#451a03"
    }
  },
  france: {
    id: "france",
    name: "French",
    nameMalayalam: "ഫ്രഞ്ച്",
    primaryElement: "Enameled Cocotte & Provençal Herb Bouquet",
    motif: "Cast-iron enameled Dutch cocotte with tied bouquet garni (thyme, bay laurel, tarragon) and delicate fleur culinary emblem",
    colors: {
      primary: "#3b82f6",
      secondary: "#2563eb",
      accent: "#f59e0b",
      background: "#172554"
    }
  },
  china: {
    id: "china",
    name: "Chinese",
    nameMalayalam: "ചൈനീസ്",
    primaryElement: "Carbon-Steel Wok & Bamboo Steamer Tier",
    motif: "Round-bottom hand-hammered carbon-steel wok with interlocking bamboo dumpling steamer tiers and eight-point star anise",
    colors: {
      primary: "#ef4444",
      secondary: "#b91c1c",
      accent: "#eab308",
      background: "#450a0a"
    }
  },
  korea: {
    id: "korea",
    name: "Korean",
    nameMalayalam: "കൊറിയൻ",
    primaryElement: "Sizzling Stone Dolsot & Gochujang Pepper",
    motif: "Heavy dark granite Dolsot bibimbap stone pot paired with brass Sujeo long-handled spoon and bright red gochujang chili",
    colors: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      accent: "#fbbf24",
      background: "#4c0519"
    }
  }
};

export const FALLBACK_EMBLEM: EmblemMetadata = {
  id: "universal",
  name: "Global Culinary Heritage",
  nameMalayalam: "ആഗോള പാചക പാരമ്പര്യം",
  primaryElement: "Universal Culinary Vessel",
  motif: "Timeless handcrafted cooking vessel representing global culinary craftsmanship, fire, and wholesome nourishment",
  colors: {
    primary: "#10b981",
    secondary: "#059669",
    accent: "#f59e0b",
    background: "#022c22"
  }
};

export function getCuisineEmblemMeta(regionId: string): EmblemMetadata {
  if (!regionId) return FALLBACK_EMBLEM;
  const normalized = regionId.trim().toLowerCase();
  return REGION_EMBLEM_MAP[normalized] || FALLBACK_EMBLEM;
}

interface CuisineEmblemProps {
  regionId: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showLabel?: boolean;
}

export function CuisineEmblem({
  regionId,
  size = "md",
  className = "",
  showLabel = false
}: CuisineEmblemProps) {
  const meta = getCuisineEmblemMeta(regionId);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-24 h-24 text-lg"
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 38,
    xl: 56
  };

  return (
    <div className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
      <div
        role="img"
        aria-label={`${meta.name} Cuisine Emblem — ${meta.primaryElement}`}
        className={`${sizeClasses[size]} rounded-2xl p-1 relative flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md border`}
        style={{
          backgroundColor: meta.colors.background,
          borderColor: `${meta.colors.primary}55`,
          boxShadow: `0 4px 16px ${meta.colors.primary}25`
        }}
        title={`${meta.name} (${meta.nameMalayalam}) — ${meta.motif}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Decorative Geometric Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={meta.colors.primary}
            strokeWidth="2.5"
            strokeDasharray="4 3"
            opacity="0.65"
          />

          {/* Region-Specific Symbolic Silhouettes */}
          {regionId === "kerala" && (
            <g>
              {/* Bronze Uruli Vessel Shape */}
              <ellipse cx="50" cy="58" rx="30" ry="16" fill={meta.colors.primary} opacity="0.85" />
              <ellipse cx="50" cy="54" rx="26" ry="11" fill={meta.colors.accent} opacity="0.9" />
              {/* Uruli Rim & Handles */}
              <path d="M20 54 Q14 54 14 58 Q14 62 20 62" stroke={meta.colors.accent} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M80 54 Q86 54 86 58 Q86 62 80 62" stroke={meta.colors.accent} strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Coconut Frond Arc */}
              <path d="M50 38 Q65 24 75 30" stroke={meta.colors.primary} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M50 38 Q35 24 25 30" stroke={meta.colors.primary} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {regionId === "tamil-nadu" && (
            <g>
              {/* Brass Davara Base */}
              <ellipse cx="50" cy="68" rx="26" ry="8" fill={meta.colors.secondary} />
              {/* Tumbler Body */}
              <path d="M38 40 L42 66 L58 66 L62 40 Z" fill={meta.colors.primary} />
              {/* Gopuram Temple Triangle Peak */}
              <path d="M50 20 L62 36 L38 36 Z" fill={meta.colors.accent} opacity="0.9" />
              <line x1="50" y1="16" x2="50" y2="20" stroke={meta.colors.accent} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {regionId === "punjab" && (
            <g>
              {/* Clay Tandoor Silhouette */}
              <path d="M32 68 Q30 46 40 40 L60 40 Q70 46 68 68 Z" fill={meta.colors.primary} opacity="0.85" />
              <ellipse cx="50" cy="40" rx="10" ry="4" fill={meta.colors.accent} />
              {/* Golden Wheat Stalks */}
              <path d="M50 40 L34 22 M50 40 L66 22" stroke={meta.colors.accent} strokeWidth="3" strokeLinecap="round" />
              <circle cx="34" cy="22" r="3" fill={meta.colors.accent} />
              <circle cx="66" cy="22" r="3" fill={meta.colors.accent} />
            </g>
          )}

          {regionId === "kashmir" && (
            <g>
              {/* Samovar Vessel */}
              <rect x="42" y="32" width="16" height="32" rx="6" fill={meta.colors.primary} />
              <path d="M40 64 L60 64 L56 72 L44 72 Z" fill={meta.colors.secondary} />
              {/* Chinar Saffron Blossom Peak */}
              <path d="M50 18 Q56 26 50 32 Q44 26 50 18 Z" fill={meta.colors.accent} />
              <circle cx="50" cy="24" r="2" fill="#fff" />
            </g>
          )}

          {regionId === "italy" && (
            <g>
              {/* Pizza Peel & Basil Leaf */}
              <circle cx="50" cy="48" r="22" fill={meta.colors.primary} opacity="0.9" />
              <path d="M50 68 L50 82" stroke={meta.colors.accent} strokeWidth="5" strokeLinecap="round" />
              {/* Basil Sprig */}
              <path d="M50 36 Q60 30 54 44 Q44 44 50 36 Z" fill={meta.colors.accent} />
              <circle cx="44" cy="48" r="3" fill="#fff" opacity="0.8" />
              <circle cx="56" cy="52" r="3" fill="#fff" opacity="0.8" />
            </g>
          )}

          {regionId === "japan" && (
            <g>
              {/* Lacquered Ceramic Bowl & Chopsticks */}
              <path d="M28 46 Q28 68 50 68 Q72 68 72 46 Z" fill={meta.colors.primary} />
              <line x1="24" y1="46" x2="76" y2="46" stroke={meta.colors.accent} strokeWidth="3" strokeLinecap="round" />
              {/* Diagonal Chopsticks */}
              <line x1="26" y1="34" x2="74" y2="38" stroke={meta.colors.secondary} strokeWidth="2.5" strokeLinecap="round" />
              {/* Rising Sun / Sakura Dot */}
              <circle cx="50" cy="30" r="7" fill={meta.colors.accent} />
            </g>
          )}

          {regionId === "mexico" && (
            <g>
              {/* Molcajete Stone Mortar on 3 Legs */}
              <ellipse cx="50" cy="48" rx="24" ry="12" fill={meta.colors.primary} />
              <path d="M26 48 Q28 66 50 66 Q72 66 74 48 Z" fill={meta.colors.secondary} />
              <line x1="34" y1="64" x2="32" y2="74" stroke={meta.colors.secondary} strokeWidth="5" strokeLinecap="round" />
              <line x1="66" y1="64" x2="68" y2="74" stroke={meta.colors.secondary} strokeWidth="5" strokeLinecap="round" />
              {/* Serrated Agave & Chili Accent */}
              <path d="M50 24 L54 38 L46 38 Z" fill={meta.colors.accent} />
            </g>
          )}

          {/* Generalized Geometric Emblem for Other Regions */}
          {![
            "kerala",
            "tamil-nadu",
            "punjab",
            "kashmir",
            "italy",
            "japan",
            "mexico"
          ].includes(regionId) && (
            <g>
              {/* Artisan Handcrafted Bowl / Cauldron */}
              <path
                d="M30 48 Q30 70 50 70 Q70 70 70 48 Z"
                fill={meta.colors.primary}
                opacity="0.85"
              />
              <line
                x1="26"
                y1="48"
                x2="74"
                y2="48"
                stroke={meta.colors.accent}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Regional Culinary Crown */}
              <circle cx="50" cy="34" r="8" fill={meta.colors.accent} opacity="0.9" />
              <circle cx="34" cy="38" r="4" fill={meta.colors.secondary} />
              <circle cx="66" cy="38" r="4" fill={meta.colors.secondary} />
            </g>
          )}

          {/* Center Brand Star Accent */}
          <circle cx="50" cy="50" r="2.5" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>

      {showLabel && (
        <span className="text-[11px] font-bold text-foreground/80 tracking-wide">
          {meta.name}
        </span>
      )}
    </div>
  );
}
