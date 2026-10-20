"use client";

import React from "react";
import {
  CutleryFinish,
  PlateStyle,
  GlasswareStyle,
  LinensStyle,
  TableShape,
  ServingStyle,
  TableItemPlacement
} from "@/lib/types/table-styling";
import { Sparkles, Utensils, Disc, Wine, Palette } from "lucide-react";

export interface TablewareCustomizerState {
  guestCount: number;
  tableShape: TableShape;
  cutleryFinish: CutleryFinish;
  plateStyle: PlateStyle;
  glasswareStyle: GlasswareStyle;
  linensStyle: LinensStyle;
  servingStyle: ServingStyle;
}

export function generateCustomPlacements(state: TablewareCustomizerState): TableItemPlacement[] {
  const placements: TableItemPlacement[] = [];
  const { guestCount, tableShape, plateStyle, cutleryFinish, glasswareStyle } = state;

  const isBananaLeaf = plateStyle === "fresh-banana-leaf";
  const plateType = isBananaLeaf ? "banana-leaf" : "plate";
  const plateName = isBananaLeaf ? "Fresh Plantain Leaf Place Setting" : `Dinner Plate (${plateStyle})`;
  const plateNameMl = isBananaLeaf ? "വാഴയില തട്ട്" : "ഭക്ഷണ പാത്രം";

  const cutleryColor =
    cutleryFinish === "gold" ? "#D4AF37" :
    cutleryFinish === "rose-gold" ? "#B76E79" :
    cutleryFinish === "antique-brass" ? "#C5A059" :
    cutleryFinish === "matte-noir" ? "#2B2B2B" : "#C0C0C0";

  // Centerpiece
  placements.push({
    itemType: "centerpiece",
    name: "Luxury Centerpiece & Floral Arrangement",
    nameMalayalam: "മേശപ്പൂക്കളും വിളക്കും",
    xPercent: 50,
    yPercent: 50,
    colorHex: cutleryColor,
    description: "Curated floral display, candles, and coordinated ambient decor."
  });

  if (tableShape === "round") {
    const radius = 32;
    const angleStep = (2 * Math.PI) / guestCount;

    for (let i = 0; i < guestCount; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      const rotationDeg = (angle * 180) / Math.PI + 90;

      // Plate / Leaf
      placements.push({
        itemType: plateType,
        name: `${plateName} #${i + 1}`,
        nameMalayalam: `${plateNameMl} #${i + 1}`,
        xPercent: Math.round(x),
        yPercent: Math.round(y),
        rotationDeg,
        description: `Dedicated place setting for Guest ${i + 1}.`
      });

      // Glassware
      const gx = 50 + (radius - 8) * Math.cos(angle + 0.15);
      const gy = 50 + (radius - 8) * Math.sin(angle + 0.15);
      placements.push({
        itemType: "glass",
        name: `Glassware (${glasswareStyle})`,
        nameMalayalam: "ഗ്ലാസ്",
        xPercent: Math.round(gx),
        yPercent: Math.round(gy),
        description: "Course beverage vessel positioned to the upper-right."
      });

      // Cutlery
      const cx = 50 + (radius - 4) * Math.cos(angle - 0.15);
      const cy = 50 + (radius - 4) * Math.sin(angle - 0.15);
      placements.push({
        itemType: "cutlery",
        name: `Cutlery Setting (${cutleryFinish})`,
        nameMalayalam: "കട്ട്ലറി",
        xPercent: Math.round(cx),
        yPercent: Math.round(cy),
        colorHex: cutleryColor,
        description: `Balanced course flatware in ${cutleryFinish} finish.`
      });
    }
  } else {
    // Rectangular / Oval / Square (arranged top and bottom rows)
    const perSide = Math.ceil(guestCount / 2);
    const xStep = 60 / (perSide + 1);

    // Top Row
    for (let i = 0; i < perSide; i++) {
      const x = 20 + (i + 1) * xStep;
      const y = 26;

      placements.push({
        itemType: plateType,
        name: `${plateName} (Top #${i + 1})`,
        nameMalayalam: `${plateNameMl} #${i + 1}`,
        xPercent: Math.round(x),
        yPercent: y,
        description: `Place setting for diner ${i + 1}.`
      });

      placements.push({
        itemType: "cutlery",
        name: `Cutlery (${cutleryFinish})`,
        nameMalayalam: "കട്ട്ലറി",
        xPercent: Math.round(x - 5),
        yPercent: y,
        colorHex: cutleryColor,
        description: `Forged flatware in ${cutleryFinish}.`
      });

      placements.push({
        itemType: "glass",
        name: `Glassware (${glasswareStyle})`,
        nameMalayalam: "ഗ്ലാസ്",
        xPercent: Math.round(x + 5),
        yPercent: y - 5,
        description: "Stemware positioned at 1 o'clock."
      });
    }

    // Bottom Row
    const bottomCount = guestCount - perSide;
    const xStepBottom = 60 / (bottomCount + 1);
    for (let i = 0; i < bottomCount; i++) {
      const x = 20 + (i + 1) * xStepBottom;
      const y = 74;

      placements.push({
        itemType: plateType,
        name: `${plateName} (Bottom #${i + 1})`,
        nameMalayalam: `${plateNameMl} #${i + 1}`,
        xPercent: Math.round(x),
        yPercent: y,
        description: `Place setting for diner ${perSide + i + 1}.`
      });

      placements.push({
        itemType: "cutlery",
        name: `Cutlery (${cutleryFinish})`,
        nameMalayalam: "കട്ട്ലറി",
        xPercent: Math.round(x - 5),
        yPercent: y,
        colorHex: cutleryColor,
        description: `Forged flatware in ${cutleryFinish}.`
      });

      placements.push({
        itemType: "glass",
        name: `Glassware (${glasswareStyle})`,
        nameMalayalam: "ഗ്ലാസ്",
        xPercent: Math.round(x + 5),
        yPercent: y + 5,
        description: "Stemware positioned at 1 o'clock."
      });
    }
  }

  return placements;
}

interface TablewareCustomizerProps {
  state: TablewareCustomizerState;
  onChange: (updated: Partial<TablewareCustomizerState>) => void;
}

export function TablewareCustomizer({ state, onChange }: TablewareCustomizerProps) {
  const cutleryOptions: { id: CutleryFinish; label: string; color: string; desc: string }[] = [
    { id: "gold", label: "24K Imperial Gold", color: "#D4AF37", desc: "Regal warm luster for royal banquets & weddings" },
    { id: "polished-silver", label: "Mirror Silver", color: "#E5E7EB", desc: "Timeless 18/10 stainless steel with mirror polish" },
    { id: "matte-noir", label: "Matte Noir Titanium", color: "#1F2937", desc: "Contemporary architectural slim profile" },
    { id: "antique-brass", label: "Antique Brass", color: "#C5A059", desc: "Hand-chiseled heritage warmth for traditional meals" },
    { id: "rose-gold", label: "Blush Rose Gold", color: "#B76E79", desc: "Slender romantic tone with warm copper undertones" }
  ];

  const plateOptions: { id: PlateStyle; label: string; desc: string }[] = [
    { id: "fine-bone-china", label: "Fine Bone China", desc: "Translucent ivory porcelain with gold or silver rim" },
    { id: "fresh-banana-leaf", label: "Fresh Banana Leaf", desc: "Sacred unblemished plantain leaf for authentic Kerala sadyas" },
    { id: "bell-metal-thali", label: "Royal Bell-Metal Thali", desc: "Heavy embossed brass thali with perimeter katoris" },
    { id: "handcrafted-stoneware", label: "Organic Stoneware", desc: "Matte volcanic textured ceramics for modern dining" },
    { id: "rustic-terracotta", label: "Tuscan Terracotta", desc: "Hand-thrown glazed earthenware for Mediterranean feasts" },
    { id: "scalloped-porcelain", label: "Scalloped Botanical", desc: "Delicate pastel fluted porcelain for brunch & tea" }
  ];

  const glasswareOptions: { id: GlasswareStyle; label: string }[] = [
    { id: "cut-crystal-goblet", label: "Cut Crystal Goblet" },
    { id: "lead-free-crystal-stemware", label: "Lead-Free Crystal Wine Glass" },
    { id: "fluted-champagne-glass", label: "Fluted Crystal Champagne Flute" },
    { id: "hammered-brass-tumbler", label: "Hammered Brass Tumbler" },
    { id: "organic-coupe-glass", label: "Vintage Optic Coupe Glass" },
    { id: "smoked-gray-tumbler", label: "Smoked Gray Lowball Tumbler" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-glass-border shadow-glass space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-primary" />
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            Bespoke Tableware & Cutlery Atelier
          </h3>
        </div>
        <span className="text-xs text-brand-primary font-serif font-bold">
          വിശേഷപ്പെട്ട കട്ട്ലറിയും പാത്രങ്ങളും
        </span>
      </div>

      {/* Cutlery Finish Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 uppercase tracking-wider">
          <Utensils className="w-3.5 h-3.5 text-brand-primary" />
          <span>Cutlery Finish & Metallurgy</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {cutleryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ cutleryFinish: opt.id })}
              className={`p-3 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                state.cutleryFinish === opt.id
                  ? "bg-brand-primary/15 border-brand-primary shadow-sm"
                  : "glass-card border-white/5 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full mt-0.5 shrink-0 border border-white/30 shadow"
                style={{ backgroundColor: opt.color }}
              />
              <div>
                <div className="text-xs font-bold text-foreground">{opt.label}</div>
                <div className="text-[11px] text-foreground/60 leading-tight mt-0.5">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Plates & Serving Vessel Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 uppercase tracking-wider">
          <Disc className="w-3.5 h-3.5 text-brand-secondary" />
          <span>Plates & Base Platters</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {plateOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ plateStyle: opt.id })}
              className={`p-3 rounded-2xl text-left border transition-all ${
                state.plateStyle === opt.id
                  ? "bg-brand-primary/15 border-brand-primary shadow-sm"
                  : "glass-card border-white/5 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <div className="text-xs font-bold text-foreground">{opt.label}</div>
              <div className="text-[11px] text-foreground/60 leading-tight mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Glassware Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 uppercase tracking-wider">
          <Wine className="w-3.5 h-3.5 text-amber-400" />
          <span>Glassware & Beverage Vessels</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {glasswareOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ glasswareStyle: opt.id })}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                state.glasswareStyle === opt.id
                  ? "bg-brand-primary text-background border-brand-primary font-bold shadow-sm"
                  : "glass-card text-foreground/75 border-white/5 hover:border-white/20 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
