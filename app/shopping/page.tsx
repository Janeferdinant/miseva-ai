"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  Printer,
  Copy,
  ExternalLink,
  MapPin,
  Sparkles,
  TrendingDown,
  Trash2,
  Plus,
  Info,
} from "lucide-react";
import { RECIPES } from "@/lib/data/recipes";
import { consolidateShoppingList, RETAILERS } from "@/lib/pricing/cart-calculator";
import { ConsolidatedShoppingItem } from "@/lib/types/pricing";

export default function ShoppingComparisonPage() {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([
    "kerala-avial",
    "malabar-biryani",
  ]);
  const [pantryChecked, setPantryChecked] = useState<Record<string, boolean>>({});
  const [pincode, setPincode] = useState("682001");
  const [copied, setCopied] = useState(false);

  const activeRecipes = RECIPES.filter((r) => selectedRecipes.includes(r.id));
  const consolidatedItems = consolidateShoppingList(activeRecipes);

  const toggleRecipe = (id: string) => {
    setSelectedRecipes((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const togglePantry = (id: string) => {
    setPantryChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toBuyItems = consolidatedItems.filter((i) => !pantryChecked[i.id]);
  const estimatedTotal = toBuyItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);

  const handleCopyList = () => {
    const text = toBuyItems
      .map((item) => `• ${item.name} (${item.totalAmount} ${item.unit}) - ~₹${item.estimatedCost}`)
      .join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`CulinaryVerse AI Shopping List:\n\n${text}\n\nEstimated Total: ₹${estimatedTotal}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="space-y-10 py-4">
      {/* Page Header */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-glass-border shadow-glass">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <ShoppingCart className="w-4 h-4" />
              <span>Smart Grocery Cart & Indian Retailer Comparison</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-1">
              Consolidated Shopping & Price Intelligence
            </h1>
            <p className="text-sm text-foreground/75 mt-1 max-w-2xl">
              Consolidate duplicate ingredients across multiple recipes, check off items in your pantry, and compare checkout costs across Amazon Fresh, Flipkart, Swiggy Instamart, Zepto, Blinkit, and BigBasket.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyList}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-xs font-bold hover:border-brand-primary text-foreground transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy List"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-xs font-bold hover:border-brand-primary text-foreground transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print List</span>
            </button>
          </div>
        </div>

        {/* Recipe Selection Chips */}
        <div className="mt-6 pt-4 border-t border-glass-border/60">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
            Included Recipes in Cart:
          </div>
          <div className="flex flex-wrap gap-2">
            {RECIPES.map((recipe) => {
              const isSelected = selectedRecipes.includes(recipe.id);
              return (
                <button
                  key={recipe.id}
                  onClick={() => toggleRecipe(recipe.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-brand-primary text-white shadow-sm scale-105"
                      : "glass-card text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{recipe.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Shopping Checklist | Retailer Comparison Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Consolidated Items Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-glass-border shadow-glass space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-glass-border/60">
              <h2 className="text-lg font-extrabold text-foreground">
                Consolidated Grocery Items ({consolidatedItems.length} total)
              </h2>
              <span className="text-xs text-foreground/60">
                {toBuyItems.length} to buy • {consolidatedItems.length - toBuyItems.length} in pantry
              </span>
            </div>

            <div className="space-y-2.5">
              {consolidatedItems.map((item) => {
                const inPantry = !!pantryChecked[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePantry(item.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                      inPantry
                        ? "bg-emerald-500/10 border-emerald-500/30 opacity-60 line-through"
                        : "glass-card hover:border-brand-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          inPantry
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-white/30"
                        }`}
                      >
                        {inPantry && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-foreground/60 lang-ml">
                          {item.nameMalayalam}
                        </div>
                        <div className="text-[10px] text-foreground/50">
                          For: {item.recipesIncluded.join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-foreground">
                        {item.totalAmount} {item.unit}
                      </div>
                      <div className="text-[11px] font-bold text-brand-primary">
                        ~₹{item.estimatedCost}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Retailer Pricing & Direct Sourcing Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-brand-primary/40 shadow-glass space-y-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                Estimated Grocery Total
              </div>
              <div className="text-3xl font-black text-foreground mt-1">
                ₹{estimatedTotal}
              </div>
              <div className="text-xs text-foreground/60 mt-0.5">
                For {toBuyItems.length} items to purchase across {selectedRecipes.length} recipes
              </div>
            </div>

            {/* PIN Code Delivery Tester */}
            <div className="p-3.5 rounded-xl glass-card flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-brand-primary" />
                <span>Delivery Location:</span>
                <span className="font-mono font-bold">{pincode} (Kochi Metro)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                Quick Commerce Live
              </span>
            </div>

            {/* Retailer Cards List */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Order from Indian Retailers:
              </div>

              {RETAILERS.map((retailer) => {
                const searchLink = retailer.searchUrlTemplate(
                  toBuyItems.slice(0, 3).map((i) => i.name).join(" ")
                );
                return (
                  <div
                    key={retailer.id}
                    className="p-3.5 rounded-2xl glass-card hover:border-brand-primary/50 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{retailer.logo}</span>
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          {retailer.name}
                        </div>
                        <div className="text-[10px] text-foreground/60">
                          {retailer.deliveryEstimate}
                        </div>
                      </div>
                    </div>

                    <a
                      href={searchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl glass-button text-xs font-bold"
                    >
                      <span>Shop Now</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
