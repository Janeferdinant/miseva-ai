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
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-brand-primary border border-brand-primary/30">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>CulinaryVerse AI • Next-Gen Multilingual Cooking Companion</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
            Cook with Cultural Mastery.{" "}
            <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent">
              Powered by Intelligent AI.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-medium">
            Explore authentic traditions across all 28 Indian states, 8 Union Territories, and celebrated world cuisines. Experience synchronized Malayalam and English voice narration, live grocery price comparisons across Indian retailers, and hands-free cooking.
          </p>

          <p className="text-sm sm:text-base text-brand-primary lang-ml font-semibold">
            ഇന്ത്യയിലെയും ലോകത്തിലെയും തനത് പാചക കലാവൈഭവം — മലയാളത്തിലും ഇംഗ്ലീഷിലും ശബ്ദവിവരണത്തോടെ.
          </p>

          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative max-w-2xl flex items-center">
              <Search className="w-5 h-5 text-brand-primary absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, ingredient, state (e.g. Avial, Biryani, Sarson Saag, Ramen)..."
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
            {["Kerala Sadya", "Thalassery Biryani", "Sarson Saag", "Chettinad Chicken", "Risotto ai Funghi", "Birria Tacos"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/recipes?q=${encodeURIComponent(tag)}`)}
                  className="px-2.5 py-1 rounded-lg glass-card text-foreground hover:border-brand-primary transition-colors text-[11px]"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>

        {/* Floating Capability Badges */}
        <div className="mt-10 pt-6 border-t border-glass-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
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

      {/* 2. Interactive Regional Indian Cuisines Showcase */}
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
