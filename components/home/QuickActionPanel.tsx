"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Calendar,
  Compass,
  Languages,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";

export interface QuickActionItem {
  id: string;
  title: string;
  titleMalayalam: string;
  description: string;
  href: string;
  icon: any;
  badge: string;
  gradient: string;
}

export const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: "ingredient-finder",
    title: "Cook with My Ingredients",
    titleMalayalam: "ചേരുവകൾ വെച്ച് പാചകം ചെയ്യുക",
    description: "Enter what's in your pantry or fridge to discover delicious matched meals.",
    href: "/ingredient-finder",
    icon: Sparkles,
    badge: "Smart Match",
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
  },
  {
    id: "find-recipe",
    title: "Find a Recipe",
    titleMalayalam: "പാചകക്കുറിപ്പ് കണ്ടെത്തുക",
    description: "Search 275+ verified authentic heritage dishes, desserts, and drinks.",
    href: "/recipes",
    icon: Search,
    badge: "Catalog",
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
  },
  {
    id: "plan-meals",
    title: "Plan My Meals",
    titleMalayalam: "ഭക്ഷണക്രമം പ്ലാൻ ചെയ്യുക",
    description: "Organize balanced weekly meals, serving sizes, and grocery shopping lists.",
    href: "/meal-planner",
    icon: Calendar,
    badge: "7-Day Rotation",
    gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
  },
  {
    id: "explore-cuisines",
    title: "Explore Regional Cuisine",
    titleMalayalam: "തനത് രുചികൾ അറിയുക",
    description: "Journey across 23 distinct Indian states and global culinary capitals.",
    href: "/explore",
    icon: Compass,
    badge: "Cultural Geography",
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
  },
  {
    id: "malayalam-reader",
    title: "Read Instructions in Malayalam",
    titleMalayalam: "മലയാളത്തിൽ വായിക്കുക",
    description: "Full offline recipe translation preserving exact measurements and step order.",
    href: "/recipes/kerala-sadya-feast",
    icon: Languages,
    badge: "മലയാളം ലിപി",
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
  },
  {
    id: "table-styling",
    title: "Style My Dining Table",
    titleMalayalam: "മേശാലങ്കാരം ഒരുക്കുക",
    description: "Create memorable Sadya banana leaf spreads, banquets, and modern tablescapes.",
    href: "/table-styling",
    icon: UtensilsCrossed,
    badge: "2D Canvas Studio",
    gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
  },
];

export function QuickActionPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Essential Culinary Actions</span>
          </span>
          <h2 className="text-2xl font-black text-foreground mt-0.5">
            Start Cooking with Purpose
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              className={`group p-5 rounded-2xl glass-card border border-glass-border hover:border-brand-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between bg-gradient-to-br ${action.gradient}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                    {action.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-foreground group-hover:text-brand-primary transition-colors">
                    {action.title}
                  </h3>
                  <div className="text-xs text-foreground/60 font-serif lang-ml mt-0.5">
                    {action.titleMalayalam}
                  </div>
                  <p className="text-xs text-foreground/75 mt-1.5 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-glass-border/40 flex items-center justify-between text-xs font-bold text-brand-primary">
                <span>Open Feature</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
