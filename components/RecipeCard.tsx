"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Users, Flame, Heart, Sparkles, ChefHat } from "lucide-react";
import { Recipe } from "@/lib/types/recipe";
import { toggleFavoriteRecipe, getFavoriteRecipeIds } from "@/lib/storage/user-store";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = getFavoriteRecipeIds();
    setIsFavorite(favs.includes(recipe.id));
  }, [recipe.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavoriteRecipe(recipe.id);
    setIsFavorite(next);
  };

  return (
    <Link
      href={`/recipes/${recipe.slug || recipe.id}`}
      className="group relative flex flex-col rounded-2xl glass-card overflow-hidden hover:scale-[1.01] transition-all duration-300 border border-glass-border"
    >
      {/* Top Visual Container */}
      <div className="relative h-48 w-full overflow-hidden bg-white/5">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full glass-card hover:scale-110 transition-transform bg-background/60 backdrop-blur-md"
          title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          aria-label="Save Recipe"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "text-rose-500 fill-rose-500" : "text-white"
            }`}
          />
        </button>

        {/* Regional / State Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold glass-panel bg-background/70 backdrop-blur-md border border-white/20 text-foreground">
          <ChefHat className="w-3 h-3 text-brand-primary" />
          <span>{recipe.stateOrCountry}</span>
          <span className="opacity-40">•</span>
          <span className="text-brand-primary font-bold">{recipe.cuisine}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dual Language Title */}
          <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-xs text-foreground/70 font-medium line-clamp-1 lang-ml mt-0.5">
            {recipe.titleMalayalam}
          </p>

          <p className="text-xs text-foreground/60 line-clamp-2 mt-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Meta Stats: Time, Servings, Calories */}
        <div className="mt-4 pt-3 border-t border-glass-border/60 flex items-center justify-between text-xs text-foreground/75 font-medium">
          <div className="flex items-center gap-1" title="Preparation & Cook Time">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span>{recipe.prepTime + recipe.cookTime}m</span>
          </div>

          <div className="flex items-center gap-1" title="Servings">
            <Users className="w-3.5 h-3.5 text-brand-accent" />
            <span>{recipe.servings} servings</span>
          </div>

          <div className="flex items-center gap-1" title="Calories">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{recipe.nutrition.calories} kcal</span>
          </div>
        </div>

        {/* Dietary Pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {recipe.dietary.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-foreground/80 border border-white/10"
            >
              {tag}
            </span>
          ))}
          {recipe.verified && (
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 ml-auto">
              <Sparkles className="w-3 h-3" /> Verified
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
