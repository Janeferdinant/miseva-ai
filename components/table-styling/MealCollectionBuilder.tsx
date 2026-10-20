"use client";

import React from "react";
import { CuratedMealCollection } from "@/lib/types/table-styling";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";
import { Utensils, Wine, Check, ArrowRight, Sparkles, Layers } from "lucide-react";

interface MealCollectionBuilderProps {
  selectedCollectionId?: string;
  onSelectCollection: (collection: CuratedMealCollection) => void;
}

export function MealCollectionBuilder({
  selectedCollectionId,
  onSelectCollection
}: MealCollectionBuilderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-primary" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Curated Royal & Fine Dining Banquets
            </h3>
          </div>
          <p className="text-xs text-foreground/70 mt-1">
            Complete, culturally authentic dining experiences composed of harmonized starters, mains, accompaniments, desserts, and beverage pairings.
          </p>
        </div>
        <span className="text-xs font-serif font-bold text-brand-primary">
          വിശേഷപ്പെട്ട പൂർണ്ണ വിരുന്നുകൾ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURATED_MEAL_COLLECTIONS.map((meal) => {
          const isSelected = selectedCollectionId === meal.id;
          return (
            <div
              key={meal.id}
              className={`glass-panel p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 hover:border-brand-primary/50 hover:shadow-glass ${
                isSelected
                  ? "border-brand-primary ring-2 ring-brand-primary/30 bg-brand-primary/10"
                  : "border-glass-border"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-brand-secondary font-serif uppercase tracking-wider">
                      {meal.titleMalayalam}
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
                      {meal.title}
                    </h4>
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-background flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-foreground/75 italic leading-relaxed">
                  "{meal.catchphrase}"
                </p>

                {/* Course List Preview */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">
                    Courses Included ({meal.dishes.length} dishes):
                  </div>
                  <ul className="space-y-1 text-xs">
                    {meal.dishes.slice(0, 4).map((d, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/80 shrink-0" />
                        <span className="line-clamp-1">{d.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-foreground/50 capitalize ml-auto shrink-0">
                          {d.course}
                        </span>
                      </li>
                    ))}
                    {meal.dishes.length > 4 && (
                      <li className="text-[11px] text-brand-primary font-semibold pl-3.5">
                        + {meal.dishes.length - 4} more courses & sides
                      </li>
                    )}
                  </ul>
                </div>

                {/* Beverage Pairing */}
                <div className="p-3 rounded-2xl bg-background/50 border border-white/5 flex items-start gap-2.5 text-xs">
                  <Wine className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-foreground">{meal.beveragePairing.name}</div>
                    <div className="text-[11px] text-foreground/60 leading-tight mt-0.5">
                      Served in {meal.beveragePairing.servingVessel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectCollection(meal)}
                className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-brand-primary text-background shadow-md shadow-brand-primary/20"
                    : "glass-card text-foreground hover:bg-brand-primary hover:text-background"
                }`}
              >
                <span>{isSelected ? "Active Experience Selected" : "Select This Dining Experience"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
