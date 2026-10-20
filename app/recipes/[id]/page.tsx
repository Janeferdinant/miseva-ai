"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  Flame,
  Heart,
  Share2,
  Printer,
  Calendar,
  ChefHat,
  ShieldAlert,
  Sparkles,
  Check,
  Volume2,
  UtensilsCrossed,
  Info,
  ArrowLeft,
  Mic,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import { getRecipeById, RECIPES } from "@/lib/data/recipes";
import { scaleRecipe } from "@/lib/recipes/scaling";
import { AudioNarrationPlayer } from "@/features/recipes/components/AudioNarrationPlayer";
import { HandsFreeCookingModal } from "@/features/recipes/components/HandsFreeCookingModal";
import { StepByStepCookingMode } from "@/components/recipes/StepByStepCookingMode";
import { RecipeCard } from "@/components/RecipeCard";
import { RetailerPriceTable } from "@/features/recipes/components/RetailerPriceTable";
import { toggleFavoriteRecipe, getFavoriteRecipeIds } from "@/lib/storage/user-store";
import { MalayalamRecipeView } from "@/components/MalayalamRecipeView";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const recipe = getRecipeById(resolvedParams.id);

  if (!recipe) {
    notFound();
  }

  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546833999-56f576340395?auto=format&fit=crop&w=1200&q=80";
  const [heroImg, setHeroImg] = useState(recipe.imageUrl);
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [isHandsFreeOpen, setIsHandsFreeOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedRecipes = React.useMemo(() => {
    const list = RECIPES.filter(
      (r) =>
        r.id !== recipe.id &&
        (r.cuisine === recipe.cuisine || r.stateOrCountry === recipe.stateOrCountry)
    ).slice(0, 3);
    if (list.length < 3) {
      const additional = RECIPES.filter(
        (r) => r.id !== recipe.id && !list.some((item) => item.id === r.id)
      ).slice(0, 3 - list.length);
      return [...list, ...additional];
    }
    return list;
  }, [recipe.id, recipe.cuisine, recipe.stateOrCountry]);

  React.useEffect(() => {
    setHeroImg(recipe.imageUrl);
  }, [recipe.imageUrl]);

  React.useEffect(() => {
    const favs = getFavoriteRecipeIds();
    setIsFavorite(favs.includes(recipe.id));
  }, [recipe.id]);

  const scaled = scaleRecipe(recipe, servings);

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleFavoriteToggle = () => {
    const next = toggleFavoriteRecipe(recipe.id);
    setIsFavorite(next);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70 hover:text-brand-primary transition-colors glass-card px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Recipes</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-xl glass-card transition-colors ${
              isFavorite ? "text-rose-500 fill-rose-500 border-rose-500/40" : "text-foreground"
            }`}
            title="Save to Favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl glass-card text-foreground hover:border-brand-primary transition-colors"
            title="Share Recipe Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl glass-card text-foreground hover:border-brand-primary transition-colors hidden sm:block"
            title="Print Recipe"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsCookingModeOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-background text-xs font-black shadow-md hover:bg-brand-primary/90 transition-all hover:scale-105"
            title="Start Step-by-Step Cooking Mode"
          >
            <ChefHat className="w-4 h-4" />
            <span>Start Cooking</span>
          </button>

          <button
            onClick={() => setIsHandsFreeOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-button text-xs font-bold shadow-md"
            title="Open Voice-Guided Hands-Free Mode"
          >
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">Voice Mode</span>
          </button>
        </div>
      </div>

      {/* Hero Visual & Title Section */}
      <div className="relative rounded-3xl glass-panel overflow-hidden border border-glass-border shadow-glass">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={heroImg}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={() => {
              if (heroImg !== FALLBACK_IMAGE) setHeroImg(FALLBACK_IMAGE);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 -mt-24 z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
              {recipe.stateOrCountry} • {recipe.cuisine}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold glass-card text-foreground capitalize">
              {recipe.mealType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold glass-card text-foreground">
              {recipe.difficulty}
            </span>
            {recipe.verified && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Verified Heritage
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            {recipe.title}
          </h1>

          <div className="text-xl sm:text-2xl text-brand-primary lang-ml font-bold">
            {recipe.titleMalayalam}
          </div>

          <p className="text-base sm:text-lg text-foreground/85 max-w-3xl leading-relaxed font-medium">
            {recipe.description}
          </p>

          <p className="text-sm sm:text-base text-foreground/70 lang-ml leading-relaxed max-w-3xl">
            {recipe.descriptionMalayalam}
          </p>

          {/* Quick Stats Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl glass-card">
              <div className="text-[10px] uppercase font-bold text-foreground/60 flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-primary" /> Prep & Cook Time
              </div>
              <div className="text-lg font-black text-foreground mt-0.5">
                {recipe.prepTime + recipe.cookTime} mins
              </div>
              <div className="text-[10px] text-foreground/50">
                {recipe.prepTime}m prep + {recipe.cookTime}m cook
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card">
              <div className="text-[10px] uppercase font-bold text-foreground/60 flex items-center gap-1">
                <Users className="w-3 h-3 text-brand-accent" /> Servings
              </div>
              <div className="text-lg font-black text-foreground mt-0.5">
                {servings} People
              </div>
              <div className="text-[10px] text-foreground/50">
                Dynamically scalable
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card">
              <div className="text-[10px] uppercase font-bold text-foreground/60 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500" /> Nutrition
              </div>
              <div className="text-lg font-black text-foreground mt-0.5">
                {recipe.nutrition.calories} kcal
              </div>
              <div className="text-[10px] text-foreground/50">
                {recipe.nutrition.protein}g protein • {recipe.nutrition.carbs}g carbs
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card">
              <div className="text-[10px] uppercase font-bold text-foreground/60 flex items-center gap-1">
                <UtensilsCrossed className="w-3 h-3 text-emerald-400" /> Equipment
              </div>
              <div className="text-sm font-bold text-foreground mt-1 truncate" title={recipe.equipment.join(", ")}>
                {recipe.equipment[0] || "Standard Cookware"}
              </div>
              <div className="text-[10px] text-foreground/50">
                +{recipe.equipment.length - 1} tools
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Malayalam Translation Section ("മലയാളത്തിൽ വായിക്കുക") */}
      <section>
        <MalayalamRecipeView recipe={recipe} />
      </section>

      {/* Main Content Two-Column Grid: Left Ingredients & Scaling | Right Instructions & Audio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Ingredients & Dynamic Serving Scaler */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-panel p-6 border border-glass-border shadow-glass space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-glass-border/60">
              <div>
                <h2 className="text-xl font-extrabold text-foreground">
                  Ingredients
                </h2>
                <div className="text-xs text-foreground/60">
                  {scaled.ingredients.length} items needed
                </div>
              </div>

              {/* Serving Size Adjuster */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl glass-card">
                {[1, 2, 4, 6, 8].map((count) => (
                  <button
                    key={count}
                    onClick={() => setServings(count)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      servings === count
                        ? "bg-brand-primary text-white shadow-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5">
              {scaled.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(ing.name)}
                    className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                      isChecked
                        ? "bg-brand-primary/10 border-brand-primary/30 opacity-60 line-through"
                        : "glass-card hover:border-brand-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-brand-primary border-brand-primary text-white"
                            : "border-white/30"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {ing.name}
                        </div>
                        <div className="text-[11px] text-foreground/60 lang-ml">
                          {ing.nameMalayalam}
                        </div>
                        {ing.notes && (
                          <div className="text-[10px] text-brand-primary font-medium">
                            {ing.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono font-bold text-xs text-foreground">
                      {ing.formattedAmount} {ing.unit}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Ingredients to Shopping List Action */}
            <div className="pt-2">
              <Link
                href={`/shopping?query=${encodeURIComponent(recipe.title)}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl glass-card hover:bg-brand-primary/10 border border-brand-primary/30 text-xs font-extrabold text-brand-primary transition-all shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Ingredients to Shopping List</span>
              </Link>
            </div>

            {/* Nutritional Breakdown Box */}
            <div className="pt-4 border-t border-glass-border/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Nutritional Profile (per serving)
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl glass-card">
                  <div className="text-[10px] text-foreground/50">Calories</div>
                  <div className="font-bold text-foreground mt-0.5">{recipe.nutrition.calories}</div>
                </div>
                <div className="p-2 rounded-xl glass-card">
                  <div className="text-[10px] text-foreground/50">Protein</div>
                  <div className="font-bold text-foreground mt-0.5">{recipe.nutrition.protein}g</div>
                </div>
                <div className="p-2 rounded-xl glass-card">
                  <div className="text-[10px] text-foreground/50">Carbs</div>
                  <div className="font-bold text-foreground mt-0.5">{recipe.nutrition.carbs}g</div>
                </div>
                <div className="p-2 rounded-xl glass-card">
                  <div className="text-[10px] text-foreground/50">Fat</div>
                  <div className="font-bold text-foreground mt-0.5">{recipe.nutrition.fat}g</div>
                </div>
              </div>
            </div>

            {/* Food Safety & Allergen Layer */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Food Safety & Allergens</span>
              </div>
              <div>
                <strong>Allergens: </strong> {recipe.foodSafety.allergens.join(", ")}
              </div>
              <div>
                <strong>Safe Storage: </strong> {recipe.foodSafety.safeStorage}
              </div>
              {recipe.foodSafety.internalTemp && (
                <div>
                  <strong>Internal Cooking Temp: </strong> {recipe.foodSafety.internalTemp}
                </div>
              )}
            </div>
          </div>

          {/* Substitutions & Practical Tips */}
          <div className="rounded-3xl glass-panel p-6 border border-glass-border shadow-glass space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-foreground">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>Substitutions & Practical Kitchen Tips</span>
            </div>
            <div className="space-y-3 text-xs text-foreground/80 leading-relaxed">
              <div className="p-3 rounded-xl glass-card border border-white/10 space-y-1">
                <span className="font-bold text-brand-primary">Traditional Alternative: </span>
                <span>
                  If fresh grated coconut is unavailable, unsweetened frozen grated coconut thawed to room temperature yields identical aroma and richness.
                </span>
              </div>
              <div className="p-3 rounded-xl glass-card border border-white/10 space-y-1">
                <span className="font-bold text-brand-accent">Oil Selection: </span>
                <span>
                  Virgin coconut oil or pure ghee provides authentic regional tempering; cold-pressed sesame or peanut oil can be substituted for a milder profile.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Audio Narration, Steps, and Timers */}
        <div className="lg:col-span-7 space-y-8">
          {/* Synchronized Bilingual Audio Player */}
          <AudioNarrationPlayer
            steps={recipe.instructions}
            recipeTitle={recipe.title}
          />

          {/* All Cooking Steps List */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-glass-border shadow-glass space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-glass-border/60">
              <h2 className="text-xl font-extrabold text-foreground">
                Step-by-Step Instructions
              </h2>
              <button
                onClick={() => setIsHandsFreeOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl glass-button text-xs font-bold"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Guided Cooking</span>
              </button>
            </div>

            <div className="space-y-6">
              {recipe.instructions.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-2xl glass-card space-y-3 relative border-l-4 border-l-brand-primary"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                      Step {step.stepNumber}
                    </span>
                    {step.timerMinutes && (
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {step.timerMinutes} mins
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-sm text-foreground/85 leading-relaxed font-medium">
                    {step.text}
                  </p>

                  <p className="text-sm text-foreground/75 lang-ml leading-relaxed">
                    {step.textMalayalam}
                  </p>

                  {step.tip && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-foreground/75">
                      <span className="font-bold text-brand-primary">Chef Secret: </span>
                      {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Retailer Price Comparison Section */}
      <section>
        <RetailerPriceTable recipe={recipe} servings={servings} />
      </section>

      {/* Related Recipes from the same cuisine */}
      {relatedRecipes.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                Explore More Flavours
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                More Recipes from {recipe.cuisine} & {recipe.stateOrCountry}
              </h3>
            </div>
            <Link
              href="/recipes"
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedRecipes.map((rel) => (
              <RecipeCard key={rel.id} recipe={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Cultural Heritage & Provenance Attribution */}
      <section className="rounded-3xl glass-panel p-6 sm:p-8 border border-glass-border/60 text-xs text-foreground/70 space-y-3">
        <div className="flex items-center gap-2 font-bold text-foreground uppercase tracking-wider">
          <Info className="w-4 h-4 text-brand-primary" />
          <span>Cultural Heritage & Data Attribution</span>
        </div>
        <p className="leading-relaxed">
          {recipe.culturalContext}
        </p>
        <div className="pt-2 border-t border-glass-border/40 text-[11px] text-foreground/50">
          Source Citation: {recipe.sourceAttribution}. Formatted for educational, non-commercial culinary preservation under academic research direction.
        </div>
      </section>

      {/* Focused Step-by-Step Cooking Mode Modal */}
      {isCookingModeOpen && (
        <StepByStepCookingMode
          recipe={recipe}
          onClose={() => setIsCookingModeOpen(false)}
        />
      )}

      {/* Hands Free Fullscreen Modal */}
      {isHandsFreeOpen && (
        <HandsFreeCookingModal
          recipe={recipe}
          onClose={() => setIsHandsFreeOpen(false)}
        />
      )}
    </div>
  );
}
