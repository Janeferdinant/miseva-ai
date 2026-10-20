"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResilientImage } from "@/components/ResilientImage";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";
import { GlassWater, Sparkles, Clock, Flame, IndianRupee, Search, Sun, Snowflake } from "lucide-react";

export default function BeveragesStudioPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [tempFilter, setTempFilter] = useState<"all" | "cold" | "hot">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const subcategories = [
    { id: "all", label: "All Drinks", labelMl: "എല്ലാ പാനീയങ്ങളും", count: BEVERAGE_RECIPES.length },
    { id: "fresh-juices", label: "Fresh Juices", labelMl: "പഴച്ചാറുകൾ", count: 10 },
    { id: "smoothies-shakes", label: "Smoothies & Shakes", labelMl: "സ്മൂത്തികൾ", count: 10 },
    { id: "traditional-refreshers", label: "Traditional Refreshers", labelMl: "തനത് പാനീയങ്ങൾ", count: 10 },
    { id: "mocktails-lemonades", label: "Mocktails & Coolers", labelMl: "മോക്ക്ടെയിലുകൾ", count: 10 },
    { id: "teas-coffees", label: "Artisanal Teas & Coffees", labelMl: "ചായയും കാപ്പിയും", count: 10 },
  ];

  const filtered = BEVERAGE_RECIPES.filter((b) => {
    const matchesSub = selectedSubcategory === "all" || b.subcategory === selectedSubcategory;
    const matchesTemp =
      tempFilter === "all" || (tempFilter === "hot" ? b.isHot : !b.isHot);
    const matchesQuery =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.titleMalayalam.includes(searchQuery) ||
      b.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesTemp && matchesQuery;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-glass-border shadow-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wide">
            <GlassWater className="w-3.5 h-3.5" />
            <span>DEDICATED JUICES, REFRESHERS & BEVERAGES STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            The Beverage & Refreshment Studio
          </h1>
          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
            From iconic Kerala Kulukki Sarbath and spicy Sambharam to Kumbakonam Degree Coffee, Turkish Coffee, and probiotic Solkadhi. Every beverage features chilling instructions, optional sweetener levels, and verifiable ingredients.
          </p>
          <div className="text-xs sm:text-sm font-semibold text-cyan-400 font-serif">
            കുലുക്കി സർബത്തും ഫിൽട്ടർ കോഫിയും ലോകോത്തര പാനീയങ്ങളും
          </div>
        </div>
      </div>

      {/* Subcategory & Temperature Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubcategory(sub.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedSubcategory === sub.id
                  ? "bg-brand-primary text-background shadow-md shadow-brand-primary/20 scale-105"
                  : "glass-card text-foreground/80 hover:text-foreground hover:bg-white/10"
              }`}
            >
              <span>{sub.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedSubcategory === sub.id ? "bg-background/20 text-background" : "bg-white/10 text-foreground/60"
              }`}>
                {sub.count}
              </span>
            </button>
          ))}
        </div>

        {/* Temperature & Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-background/50 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setTempFilter("all")}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold ${
                tempFilter === "all" ? "bg-brand-primary text-background" : "text-foreground/70"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTempFilter("cold")}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 ${
                tempFilter === "cold" ? "bg-cyan-500 text-white" : "text-foreground/70"
              }`}
            >
              <Snowflake className="w-3 h-3" /> Cold
            </button>
            <button
              onClick={() => setTempFilter("hot")}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 ${
                tempFilter === "hot" ? "bg-amber-500 text-white" : "text-foreground/70"
              }`}
            >
              <Sun className="w-3 h-3" /> Hot
            </button>
          </div>

          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              placeholder="Search drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>
      </div>

      {/* Grid of Beverages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((beverage) => (
          <Link
            key={beverage.id}
            href={`/beverages/${beverage.slug}`}
            className="group glass-card rounded-3xl overflow-hidden border border-glass-border hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
          >
            <div>
              {/* Media Card */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                <ResilientImage
                  src={beverage.imageUrl}
                  fallbackSrc="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80"
                  alt={beverage.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Subcategory & Temperature Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {beverage.cuisine}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md text-white flex items-center gap-1 ${
                      beverage.isHot ? "bg-amber-600/80" : "bg-cyan-600/80"
                    }`}
                  >
                    {beverage.isHot ? <Sun className="w-3 h-3" /> : <Snowflake className="w-3 h-3" />}
                    {beverage.isHot ? "Hot" : "Chilled"}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-serif text-cyan-300">
                    {beverage.titleMalayalam}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {beverage.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-foreground/75 line-clamp-2 leading-relaxed">
                  {beverage.tagline}
                </p>

                <div className="text-[11px] text-foreground/60 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 capitalize">
                    {beverage.servingGlass}
                  </span>
                  {beverage.caffeineFree && (
                    <span className="text-emerald-400 font-bold">Caffeine-Free</span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-foreground/70">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-foreground/50" />
                {beverage.prepTime} mins
              </span>
              <span className="flex items-center gap-0.5 font-bold text-foreground">
                <IndianRupee className="w-3 h-3 text-cyan-400" />
                ₹{beverage.costPerServingINR || beverage.costPerServing} / glass
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
