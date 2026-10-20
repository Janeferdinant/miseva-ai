"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  Bot,
  Volume2,
  ShoppingCart,
  Compass,
  ArrowRight,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { RECIPES } from "@/lib/data/recipes";
import { INDIAN_REGIONS, GLOBAL_CUISINES } from "@/lib/data/cuisines";
import { RecipeCard } from "@/components/RecipeCard";
import { HoloCulinaryRadar } from "@/components/motion/HoloCulinaryRadar";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingRecipes = RECIPES.slice(0, 6);
  const quickMeals = RECIPES.filter((r) => r.cookTime <= 25).slice(0, 3);
  const featuredRegions = INDIAN_REGIONS.slice(0, 6);

  return (
    <div className="space-y-16 py-4">
      {/* 1. Hero Section */}
      <section className="relative rounded-3xl glass-panel p-6 sm:p-10 lg:p-14 overflow-hidden border border-glass-border shadow-glass">
        {/* Decorative glass glow blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Miseva AI • Your World. Your Kitchen. Your AI Chef.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Your World. Your Kitchen.{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Your AI Chef.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-medium">
              Inspired by the culinary discipline of <em>mise en place</em> and devoted hospitality, Miseva AI helps you discover authentic recipes, cook hands-free with bilingual English and Malayalam AI voice guidance, compare Indian grocery prices, and style breathtaking dining tables.
            </p>

            <p className="text-sm sm:text-base text-emerald-400 lang-ml font-semibold">
              നിങ്ങളുടെ ലോകം. നിങ്ങളുടെ അടുക്കള. നിങ്ങളുടെ എ.ഐ ഷെഫ് — മലയാളത്തിലും ഇംഗ്ലീഷിലും തത്സമയ ശബ്ദ സഹായത്തോടെ.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/recipes"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2"
              >
                <span>Start Cooking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-chef"
                className="px-5 py-3 rounded-xl glass-button text-sm font-bold text-foreground border border-white/20 hover:border-amber-400/50 transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Try AI Chef</span>
              </Link>
              <Link
                href="/table-styling"
                className="px-5 py-3 rounded-xl glass-card text-sm font-bold text-foreground/90 border border-white/10 hover:border-emerald-400/50 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Table Styling</span>
              </Link>
              <Link
                href="/app"
                className="px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold transition-all flex items-center gap-2"
              >
                <span>Android App</span>
              </Link>
            </div>

            {/* Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative max-w-xl flex items-center">
                <Search className="w-5 h-5 text-emerald-400 absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dish, ingredient, state (e.g. Meen Curry, Risotto, Sadya)..."
                  className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl glass-input text-sm sm:text-base font-medium text-foreground shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-xl glass-button text-xs sm:text-sm font-bold shadow-md"
                >
                  Discover
                </button>
              </div>
            </form>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/75 font-medium pt-1">
              <span className="text-foreground/50">Popular:</span>
              {["Kerala Sadya", "Thalassery Biryani", "Sarson Saag", "Meen Pollichathu", "Risotto ai Funghi", "Birria Tacos"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => router.push(`/recipes?q=${encodeURIComponent(tag)}`)}
                    className="px-2.5 py-1 rounded-lg glass-card text-foreground hover:border-emerald-400 transition-colors text-[11px]"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Hero Visual Card (Right: 5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src="/brand/images/hero-culinary.jpg"
                alt="Miseva AI Signature Culinary Masterpiece"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-card border border-white/20 backdrop-blur-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Signature Creation</span>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Bilingual Voice Ready
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">Kerala Meen Chatti & Saffron Risotto</h4>
                <p className="text-[11px] text-white/70">Mise en place guidance with real-time audio navigation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Capability Badges */}
        <div className="mt-10 pt-6 border-t border-glass-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Bilingual Voice</div>
              <div className="text-[10px] text-foreground/60">English & മലയാളം Narration</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Live Price Compare</div>
              <div className="text-[10px] text-foreground/60">6 Indian Retailers</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Interactive AI Chef</div>
              <div className="text-[10px] text-foreground/60">Pantry & Technique Assistant</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Food Safety Layer</div>
              <div className="text-[10px] text-foreground/60">Allergens & Safe Temps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Holographic Culinary Telemetry HUD Module */}
      <section className="space-y-4">
        <HoloCulinaryRadar />
      </section>



      {/* 2. Dedicated Studios Trio: Desserts, Beverages, and Table Styling */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Dedicated Culinary Studios</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Explore Our Specialist Master Studios
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Desserts Studio Card */}
          <Link
            href="/desserts"
            className="group glass-card rounded-3xl p-6 border border-glass-border hover:border-brand-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  40 Master Recipes
                </div>
                <h3 className="text-xl font-extrabold text-foreground group-hover:text-brand-primary transition-colors">
                  Desserts & Sweets Studio
                </h3>
                <div className="text-xs text-foreground/60 font-serif">
                  പായസങ്ങളും മിഠായികളും
                </div>
              </div>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Slow-simmered Kerala Palada Pradhaman, ghee-roasted Mysore Pak, Italian Tiramisu, and French Crème Brûlée with exact baking temperatures and doneness tests.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-brand-primary">
              <span>Enter Desserts Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Beverages Studio Card */}
          <Link
            href="/beverages"
            className="group glass-card rounded-3xl p-6 border border-glass-border hover:border-cyan-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Volume2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  50 Artisanal Drinks
                </div>
                <h3 className="text-xl font-extrabold text-foreground group-hover:text-cyan-400 transition-colors">
                  Juices & Beverages Studio
                </h3>
                <div className="text-xs text-foreground/60 font-serif">
                  കുലുക്കി സർബത്തും പാനീയങ്ങളും
                </div>
              </div>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Shaken Kulukki Sarbath, authentic Kumbakonam Filter Coffee, refreshing Kerala Sambharam, smoothies, and mocktails with sweetness scaling.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Enter Beverages Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Table Styling Studio Card */}
          <Link
            href="/table-styling"
            className="group glass-card rounded-3xl p-6 border border-brand-primary/40 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/5 hover:border-brand-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glass flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                  40 Complete Concepts + 2D Planner
                </div>
                <h3 className="text-xl font-extrabold text-foreground group-hover:text-brand-primary transition-colors">
                  Table Decoration & Styling Studio
                </h3>
                <div className="text-xs text-foreground/60 font-serif">
                  മേശാലങ്കാര സ്റ്റുഡിയോ
                </div>
              </div>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Grand Kerala banana-leaf sadyas, Diwali candle banquets, and modern tablescapes. Interactive 2D top-down layout canvas, napkin guides, and decor shopping lists.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-brand-primary">
              <span>Launch Table Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Interactive Regional Indian Cuisines Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Indian Culinary Geography</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Explore Cuisines Across Indian States
            </h2>
          </div>
          <Link
            href="/explore"
            className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
          >
            <span>View All 28 States & UTs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredRegions.map((region) => (
            <Link
              key={region.id}
              href={`/explore?state=${region.id}`}
              className="p-5 rounded-2xl glass-card hover:scale-[1.02] transition-all border border-glass-border flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform">
                    {region.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary">
                    {region.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mt-3 group-hover:text-brand-primary transition-colors">
                  {region.name}
                </h3>
                <div className="text-xs text-foreground/60 lang-ml font-medium">
                  {region.nameMalayalam}
                </div>

                <p className="text-xs text-foreground/70 mt-2 line-clamp-2 leading-relaxed">
                  {region.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-glass-border/40">
                <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-1.5">
                  Signature Dishes
                </div>
                <div className="flex flex-wrap gap-1">
                  {region.specialties.slice(0, 3).map((dish) => (
                    <span
                      key={dish}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-foreground/80"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured & Trending Recipes */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Culinary Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Trending Authentic Recipes
            </h2>
          </div>
          <Link
            href="/recipes"
            className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
          >
            <span>Explore All Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 4. AI Chef Studio Interactive Teaser Banner */}
      <section className="rounded-3xl glass-panel p-6 sm:p-10 border border-brand-primary/40 relative overflow-hidden bg-gradient-to-r from-brand-primary/10 via-brand-accent/5 to-transparent shadow-glass">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold">
            <Bot className="w-4 h-4" />
            <span>Conversational Culinary Agent</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Meet Your Personal AI Master Chef
          </h2>

          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium">
            Got random pantry items at home? Wondering why you should temper spices in hot oil first, or need an authentic dairy-free substitute for your curry? Ask our interactive chef in English or Malayalam.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/ai-chef"
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass-button text-sm font-bold shadow-lg"
            >
              <Bot className="w-4 h-4" />
              <span>Launch AI Chef Studio</span>
            </Link>

            <Link
              href="/shopping"
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass-button-secondary text-sm font-bold"
            >
              <ShoppingCart className="w-4 h-4 text-brand-primary" />
              <span>Compare Grocery Prices</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Quick & Budget-Conscious Meals */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Quick & Nourishing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Cook in 25 Minutes or Less
            </h2>
          </div>
          <Link
            href="/recipes?quick=true"
            className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
          >
            <span>See Quick Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickMeals.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
