"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookmarkCheck, Utensils } from "lucide-react";

export interface CuratedCollectionItem {
  id: string;
  title: string;
  titleMalayalam: string;
  description: string;
  imageUrl: string;
  recipeSlugs: string[];
  filterQuery: string;
  dishCount: number;
}

export const CURATED_COLLECTIONS: CuratedCollectionItem[] = [
  {
    id: "five-ingredient-meals",
    title: "Five-Ingredient Meals",
    titleMalayalam: "അഞ്ച് ചേരുവകൾ കൊണ്ടുള്ള വിഭവങ്ങൾ",
    description: "Effortless, flavorful dishes built on minimal staples without sacrificing authentic depth.",
    imageUrl: "https://images.unsplash.com/photo-1546833999-56f576340395?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["kerala-kalan", "kerala-erissery", "ben-chholar-dal"],
    filterQuery: "easy",
    dishCount: 4,
  },
  {
    id: "weeknight-dinners",
    title: "Weeknight Dinners",
    titleMalayalam: "തിരക്കേറിയ സായാഹ്നങ്ങളിലെ ലളിതമായ അത്താഴം",
    description: "Wholesome, comforting dinners ready in under 35 minutes for busy weeknights.",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["tn-chettinad-chicken", "pun-dal-makhani", "kerala-egg-roast"],
    filterQuery: "dinner",
    dishCount: 5,
  },
  {
    id: "traditional-kerala-lunch",
    title: "Traditional Kerala Lunch",
    titleMalayalam: "പരമ്പരാഗത കേരളീയ ഉച്ചഭക്ഷണം",
    description: "Steamed Matta rice, coconut Avial, spicy Meen Curry, and fresh Thoran on banana leaves.",
    imageUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["kerala-avial", "kerala-fish-curry", "kerala-kalan", "kerala-erissery"],
    filterQuery: "kerala",
    dishCount: 6,
  },
  {
    id: "one-pot-cooking",
    title: "One-Pot Cooking",
    titleMalayalam: "വൺ-പോട്ട് പാചകം",
    description: "Aromatic biryanis, slow-simmered pulaos, and braised meat stews that save cleanup time.",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["kerala-thalassery-biryani", "ap-hyderabadi-biryani", "ben-kolkata-biryani"],
    filterQuery: "biryani",
    dishCount: 4,
  },
  {
    id: "desserts-around-the-world",
    title: "Desserts from Around the World",
    titleMalayalam: "ലോകമെമ്പാടുമുള്ള മധുരപലഹാരങ്ങൾ",
    description: "From slow-caramelized Kerala Palada to Milanese Tiramisu and golden Spanish Churros.",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["kerala-kalan", "des-palada-pradhaman", "des-gulab-jamun"],
    filterQuery: "dessert",
    dishCount: 8,
  },
  {
    id: "meals-for-beginners",
    title: "Meals for Beginners",
    titleMalayalam: "തുടക്കക്കാർക്കായുള്ള ലളിത പാചകം",
    description: "Step-by-step foolproof recipes with clear heat control, spice tips, and visual doneness tests.",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["kerala-kadala-curry", "kerala-egg-roast", "ben-chholar-dal"],
    filterQuery: "beginner",
    dishCount: 5,
  },
  {
    id: "menus-family-gatherings",
    title: "Complete Menus for Family Gatherings",
    titleMalayalam: "കുടുംബ സംഗമങ്ങൾക്കായുള്ള വിഭവങ്ങൾ",
    description: "Cohesive celebratory banquets and festive centerpieces curated to feed groups with joy.",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    recipeSlugs: ["kerala-thalassery-biryani", "ap-hyderabadi-biryani", "kerala-avial"],
    filterQuery: "festive",
    dishCount: 7,
  },
];

export function CuratedCollections() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5" />
            <span>Editorial Cookbooks</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-0.5">
            Featured Cooking Collections
          </h2>
          <p className="text-xs sm:text-sm text-foreground/70 mt-1 max-w-2xl">
            Expertly curated combinations for everyday home cooks, weekend hosts, and heritage food lovers.
          </p>
        </div>

        <Link
          href="/recipes"
          className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
        >
          <span>Browse All Curations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {CURATED_COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            href={`/recipes?q=${encodeURIComponent(col.filterQuery)}`}
            className="group glass-card rounded-2xl overflow-hidden border border-glass-border hover:border-brand-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-black/40">
                <img
                  src={col.imageUrl}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-background/80 text-brand-primary backdrop-blur-md border border-brand-primary/30">
                  {col.dishCount} Dishes
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-extrabold text-foreground group-hover:text-brand-primary transition-colors leading-snug">
                  {col.title}
                </h3>
                <div className="text-[11px] text-foreground/60 font-serif lang-ml">
                  {col.titleMalayalam}
                </div>
                <p className="text-xs text-foreground/75 leading-relaxed line-clamp-2">
                  {col.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-glass-border/40 flex items-center justify-between text-xs font-bold text-brand-primary">
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
