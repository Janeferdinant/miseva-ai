"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { Cake, Sparkles, Clock, Flame, IndianRupee, Search, ShieldCheck } from "lucide-react";

export default function DessertsStudioPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const subcategories = [
    { id: "all", label: "All Creations", labelMl: "എല്ലാ മധുരങ്ങളും", count: DESSERT_RECIPES.length },
    { id: "payasam-pradhaman", label: "Payasam & Pradhaman", labelMl: "പായസങ്ങളും പ്രഥമനും", count: 10 },
    { id: "traditional-mithai", label: "Traditional Mithai", labelMl: "പരമ്പരാഗത മിഠായികൾ", count: 10 },
    { id: "cakes-bakes", label: "Cakes & Patisserie", labelMl: "കേക്ക് & ബേക്കുകൾ", count: 10 },
    { id: "global-desserts", label: "Global Delights", labelMl: "ആഗോള ഡെസേർട്ടുകൾ", count: 10 },
  ];

  const filtered = DESSERT_RECIPES.filter((d) => {
    const matchesSub = selectedSubcategory === "all" || d.subcategory === selectedSubcategory;
    const matchesQuery =
      !searchQuery ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.titleMalayalam.includes(searchQuery) ||
      d.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesQuery;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Studio Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-glass-border shadow-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold tracking-wide">
            <Cake className="w-3.5 h-3.5" />
            <span>DEDICATED DESSERTS & CONFECTIONERY STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            The Confectionery & Sweet Studio
          </h1>
          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
            From 4-hour slow-simmered Kerala Ambalapuzha Paal Payasam and ghee-roasted Mysore Pak to French Panna Cotta and Japanese Mochi. Every recipe calibrated with exact baking temperatures, syrup thread testing, and bilingual audio transcripts.
          </p>
          <div className="text-xs sm:text-sm font-semibold text-brand-primary font-serif">
            പരമ്പരാഗത പായസങ്ങളും ലോകോത്തര മധുരപലഹാരങ്ങളും
          </div>
        </div>
      </div>

      {/* Subcategory Navigation & Search */}
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

        {/* Search Bar */}
        <div className="relative min-w-[260px] sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            placeholder="Search payasam, halwa, tiramisu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* Recipe Grid (Minimum 10 per category rule) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((dessert) => (
          <Link
            key={dessert.id}
            href={`/desserts/${dessert.slug}`}
            className="group glass-card rounded-3xl overflow-hidden border border-glass-border hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
          >
            <div>
              {/* Media Card */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                <Image
                  src={dessert.imageUrl}
                  alt={dessert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Subcategory & Doneness Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {dessert.cuisine}
                  </span>
                  {dessert.bakingTemperature && (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-500/80 backdrop-blur-md text-white flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {dessert.bakingTemperature.celsius}°C
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-serif text-brand-secondary">
                    {dessert.titleMalayalam}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-brand-secondary transition-colors">
                    {dessert.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-foreground/75 line-clamp-2 leading-relaxed">
                  {dessert.tagline}
                </p>

                {/* Doneness Indicator */}
                <div className="p-2.5 rounded-xl bg-background/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary">
                    <Sparkles className="w-3 h-3" />
                    <span>Doneness Test:</span>
                  </div>
                  <p className="text-[11px] text-foreground/70 line-clamp-1 italic">
                    {dessert.donenessIndicators[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Metrics */}
            <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-foreground/70">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-foreground/50" />
                {dessert.cookTime} mins
              </span>
              <span className="flex items-center gap-0.5 font-bold text-foreground">
                <IndianRupee className="w-3 h-3 text-brand-primary" />
                ₹{dessert.costPerServing} / serving
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
