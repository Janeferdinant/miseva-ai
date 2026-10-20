"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";
import { X, Search, Check, Utensils, Sparkles, Plus } from "lucide-react";

interface DishItem {
  id: string;
  title: string;
  category: "main" | "dessert" | "beverage";
  cuisine?: string;
  imageUrl: string;
}

interface DishSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDishTitles: string[];
  onToggleDish: (title: string) => void;
}

export function DishSelectorModal({
  isOpen,
  onClose,
  selectedDishTitles,
  onToggleDish
}: DishSelectorModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "main" | "dessert" | "beverage">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allDishes: DishItem[] = useMemo(() => {
    const mains: DishItem[] = RECIPES.map((r) => ({
      id: r.id,
      title: r.title,
      category: "main",
      cuisine: r.cuisine,
      imageUrl: r.imageUrl
    }));
    const desserts: DishItem[] = DESSERT_RECIPES.map((d) => ({
      id: d.id,
      title: d.title,
      category: "dessert",
      cuisine: "Dessert",
      imageUrl: d.imageUrl
    }));
    const beverages: DishItem[] = BEVERAGE_RECIPES.map((b) => ({
      id: b.id,
      title: b.title,
      category: "beverage",
      cuisine: "Beverage",
      imageUrl: b.imageUrl
    }));
    return [...mains, ...desserts, ...beverages];
  }, []);

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      const matchesCategory = activeTab === "all" || dish.category === activeTab;
      const matchesSearch =
        searchQuery.trim() === "" ||
        dish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.cuisine && dish.cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allDishes, activeTab, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl border border-glass-border shadow-2xl flex flex-col overflow-hidden bg-background/95">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-brand-primary" />
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Select Featured Dishes for Table Presentation
              </h3>
            </div>
            <p className="text-xs text-foreground/60 mt-0.5">
              Choose from all 230 culinary recipes to compose your bespoke dining presentation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 sm:p-6 border-b border-white/10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes by name or cuisine (e.g., Sambar, Biryani, Tiramisu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-foreground focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: "all", label: "All Items", count: allDishes.length },
              { id: "main", label: "Mains & Curries", count: 140 },
              { id: "dessert", label: "Desserts & Sweets", count: 40 },
              { id: "beverage", label: "Beverages & Coolers", count: 50 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-brand-primary text-background shadow"
                    : "glass-card text-foreground/70 hover:text-foreground hover:bg-white/10"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Selected pills */}
          {selectedDishTitles.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              <span className="text-xs font-bold text-foreground/60 shrink-0">
                Selected ({selectedDishTitles.length}):
              </span>
              {selectedDishTitles.map((title) => (
                <span
                  key={title}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-xs font-medium shrink-0"
                >
                  <span className="max-w-[160px] truncate">{title}</span>
                  <button
                    type="button"
                    onClick={() => onToggleDish(title)}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Dish Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredDishes.map((dish) => {
            const isSelected = selectedDishTitles.includes(dish.title);
            return (
              <div
                key={dish.id}
                onClick={() => onToggleDish(dish.title)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? "bg-brand-primary/15 border-brand-primary shadow-sm"
                    : "glass-card border-white/5 hover:border-white/20 hover:bg-white/5"
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/30 shrink-0">
                  <Image
                    src={dish.imageUrl}
                    alt={dish.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-foreground truncate">{dish.title}</div>
                  <div className="text-[10px] text-foreground/50 capitalize truncate">
                    {dish.cuisine || dish.category}
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? "bg-brand-primary border-brand-primary text-background"
                      : "border-white/20 text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 flex items-center justify-between gap-4 bg-background/50">
          <div className="text-xs text-foreground/70">
            <span className="font-bold text-foreground">{selectedDishTitles.length}</span> dishes selected for presentation.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-brand-primary text-background font-bold text-xs hover:scale-105 transition-all shadow-md shadow-brand-primary/20"
          >
            Confirm & View Presentation
          </button>
        </div>
      </div>
    </div>
  );
}
