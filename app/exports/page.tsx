"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  FileCode2,
  Sparkles,
  Search,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ArrowRight,
  Database,
  Camera,
} from "lucide-react";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";

export default function ExportsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCollection, setFilterCollection] = useState<string>("all");

  const exportFiles = [
    {
      title: "Complete Culinary Database (CSV)",
      filename: "miseva_complete_culinary_database.csv",
      path: "/exports/miseva_complete_culinary_database.csv",
      records: "230 Total Records",
      description: "Unified master table combining all 140 main recipes, 40 desserts, and 50 beverages with nutritional data, costs, and bilingual titles.",
      size: "142 KB",
      format: "CSV / Excel compatible",
      icon: FileSpreadsheet,
      badge: "Master Dataset",
    },
    {
      title: "Google Gemini Image Prompts (JSON)",
      filename: "gemini_recipe_image_prompts.json",
      path: "/exports/gemini_recipe_image_prompts.json",
      records: "230 Detailed Prompts",
      description: "Photorealistic macro prompts crafted for Gemini & Imagen 3 with authentic crockery, textures, lighting, and negative prompt guidelines.",
      size: "425 KB",
      format: "JSON (Gemini API & Studio)",
      icon: FileCode2,
      badge: "AI Image Pipeline",
    },
    {
      title: "Gemini Image Prompts (CSV)",
      filename: "gemini_recipe_image_prompts.csv",
      path: "/exports/gemini_recipe_image_prompts.csv",
      records: "230 Prompt Rows",
      description: "Tabular spreadsheet of all Gemini image generation prompts with separate columns for crockery, garnishes, lighting, and aspect ratios.",
      size: "366 KB",
      format: "CSV / Excel",
      icon: FileSpreadsheet,
      badge: "Prompt Spreadsheet",
    },
    {
      title: "Main Recipes Catalog (CSV)",
      filename: "miseva_recipes_master.csv",
      path: "/exports/miseva_recipes_master.csv",
      records: "140 Main Recipes",
      description: "14 regional Indian and international cuisines (Kerala, Tamil Nadu, Punjab, Bengal, Italy, Japan, Mexico, etc.) with ingredient breakdowns.",
      size: "120 KB",
      format: "CSV / Excel",
      icon: FileSpreadsheet,
      badge: "Cuisine Recipes",
    },
    {
      title: "Desserts & Confectionery (CSV)",
      filename: "miseva_desserts_master.csv",
      path: "/exports/miseva_desserts_master.csv",
      records: "40 Unique Desserts",
      description: "All 40 desserts (Payasam, Traditional Mithai, Cakes & Bakes, Global Delights) with baking temperatures, doneness markers, and unique image URLs.",
      size: "42 KB",
      format: "CSV / Excel",
      icon: FileSpreadsheet,
      badge: "40 Unique Photos",
    },
    {
      title: "Artisanal Beverages (CSV)",
      filename: "miseva_beverages_master.csv",
      path: "/exports/miseva_beverages_master.csv",
      records: "50 Beverages",
      description: "Cold-pressed juices, smoothies, traditional coolers (Kulukki, Sambharam), and heritage coffees with temperature and sweetness settings.",
      size: "44 KB",
      format: "CSV / Excel",
      icon: FileSpreadsheet,
      badge: "Drinks & Coolers",
    },
  ];

  // Build combined items for the prompt generator preview
  const allPromptItems = [
    ...RECIPES.map((r) => ({
      id: r.id,
      title: r.title,
      titleMl: r.titleMalayalam,
      cuisine: r.cuisine,
      type: r.mealType,
      collection: "Main Recipe",
      prompt: `A breathtaking, award-winning editorial food photograph of ${r.title} (${r.cuisine} cuisine). Served in authentic regional tableware. ${r.description} Rich authentic visual details: fresh garnishes of ${(r.ingredients || []).slice(0, 3).map((i) => i.name).join(", ")}, visible food steam, and delicate micro-textures. Atmosphere: cinematic 45-degree warm directional golden hour sunlight, soft fill reflection, gentle bokeh, shot on 85mm f/2.8 macro lens with liquid-glass aesthetic. Photorealistic, hyper-detailed food textures, natural colors, zero artificial bloom.`,
    })),
    ...DESSERT_RECIPES.map((d) => ({
      id: d.id,
      title: d.title,
      titleMl: d.titleMalayalam,
      cuisine: d.cuisine,
      type: d.subcategory,
      collection: "Dessert",
      prompt: `A breathtaking, award-winning editorial food photograph of ${d.title} (${d.cuisine} dessert). Served in traditional festive confectionery dish. ${d.description} Rich authentic visual details: garnished with ${(d.ingredients || []).slice(0, 3).map((i) => i.name).join(", ")}, glistening syrup, and caramelized textures. Atmosphere: cinematic 45-degree warm directional golden hour sunlight, soft fill reflection, gentle bokeh, shot on 85mm f/2.8 macro lens with liquid-glass aesthetic. Photorealistic, hyper-detailed food textures, natural colors.`,
    })),
    ...BEVERAGE_RECIPES.map((b) => ({
      id: b.id,
      title: b.title,
      titleMl: b.titleMalayalam,
      cuisine: b.cuisine,
      type: b.subcategory,
      collection: "Beverage",
      prompt: `A breathtaking, award-winning editorial food photograph of ${b.title} (${b.cuisine} beverage). Served in a tall ribbed crystal glass with natural condensation droplets and bamboo coaster. ${b.description} Rich authentic visual details: garnished with ${(b.ingredients || []).slice(0, 3).map((i) => i.name).join(", ")}, vibrant natural beverage tones, and ice crystals. Atmosphere: bright refreshing daylight with gentle backlight, shot on 85mm f/2.8 macro lens with liquid-glass aesthetic. Photorealistic, crystal-clear details.`,
    })),
  ];

  const filteredPrompts = allPromptItems.filter((item) => {
    const matchCol = filterCollection === "all" || item.collection === filterCollection;
    const matchQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleMl.includes(searchQuery) ||
      item.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCol && matchQuery;
  });

  const handleCopy = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-glass-border shadow-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>OPEN DATASETS & AI IMAGE GENERATION EXPORTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Download Recipe Database &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Gemini Image Prompts
            </span>
          </h1>
          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
            Download the complete 230-recipe catalog as clean CSV or Excel files, or export specialized prompts optimized for Google Gemini and Imagen 3 to generate high-fidelity, authentic culinary imagery.
          </p>
          <div className="text-xs sm:text-sm font-semibold text-emerald-400 font-serif">
            പാചകക്കുറിപ്പുകളുടെ ഡാറ്റാബേസും ജെമിനി ഇമേജ് പ്രോംപ്റ്റുകളും ഡൗൺലോഡ് ചെയ്യാം
          </div>
        </div>
      </div>

      {/* 2. Download Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" />
            Available Database Downloads
          </h2>
          <span className="text-xs text-foreground/60 font-mono">RFC 4180 CSV & JSON</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportFiles.map((file, idx) => {
            const Icon = file.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-glass-border hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {file.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-foreground group-hover:text-emerald-400 transition-colors">
                    {file.title}
                  </h3>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {file.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-glass-border/40">
                  <div className="flex items-center justify-between text-xs text-foreground/60">
                    <span className="font-semibold text-emerald-400">{file.records}</span>
                    <span>{file.size} • {file.format}</span>
                  </div>

                  <a
                    href={file.path}
                    download={file.filename}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/30 transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {file.filename.endsWith('.json') ? 'JSON' : 'CSV'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Gemini Image Prompt Interactive Studio */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-glass-border shadow-glass space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Camera className="w-4 h-4" />
              <span>GEMINI & IMAGEN 3 PROMPT GENERATOR</span>
            </div>
            <h2 className="text-2xl font-black text-foreground">
              Preview & Copy Gemini Image Prompts
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70">
              Click &quot;Copy Prompt&quot; to paste into Google Gemini, Google AI Studio, or Imagen 3 for photorealistic food renders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterCollection}
              onChange={(e) => setFilterCollection(e.target.value)}
              className="px-3 py-2 rounded-xl bg-glass-surface border border-glass-border text-xs text-foreground font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Collections (230)</option>
              <option value="Main Recipe">Main Recipes (140)</option>
              <option value="Dessert">Desserts (40)</option>
              <option value="Beverage">Beverages (50)</option>
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search recipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl bg-glass-surface border border-glass-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Prompts List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
          {filteredPrompts.slice(0, 25).map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-glass-border space-y-3 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.collection}
                    </span>
                    <span className="text-[10px] font-bold text-foreground/50">
                      {item.cuisine}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-foreground">
                      {item.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCopy(item.id, item.prompt)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isCopied
                        ? "bg-emerald-500 text-white"
                        : "bg-glass-card hover:bg-emerald-500/20 text-foreground border border-glass-border"
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "Copied!" : "Copy Prompt"}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-foreground/80 leading-relaxed select-all">
                  {item.prompt}
                </div>
              </div>
            );
          })}

          {filteredPrompts.length > 25 && (
            <div className="text-center py-4 text-xs text-foreground/60">
              Showing top 25 of {filteredPrompts.length} matching recipes. Download the full JSON or CSV export above to access all 230 prompts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
