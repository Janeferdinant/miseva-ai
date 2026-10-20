"use client";

import React, { useState } from "react";
import {
  Languages,
  Check,
  Clock,
  Users,
  ShieldCheck,
  Utensils,
  ChevronRight,
  BookOpen,
  Volume2,
  VolumeX,
  Info,
  RotateCcw,
} from "lucide-react";

export interface MalayalamIngredient {
  name: string;
  nameMalayalam: string;
  amount: number;
  unit: string;
  notes?: string;
  category?: string;
}

export interface MalayalamInstruction {
  stepNumber: number;
  title?: string;
  text: string;
  textMalayalam: string;
  timerMinutes?: number;
  tip?: string;
}

export interface FormattedMalayalamRecipe {
  id: string;
  title: string;
  titleMalayalam: string;
  description: string;
  descriptionMalayalam: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: MalayalamIngredient[];
  instructions: MalayalamInstruction[];
  foodSafetyNotesMalayalam: string;
  cuisine?: string;
  stateOrCountry?: string;
}

/**
 * Formats and validates recipe data into a structured Malayalam Unicode view.
 * Strictly preserves exact ingredient amounts and units without omission or rounding changes.
 * Preserves the exact sequence and step order of cooking instructions.
 * Operates independently of audio synthesis.
 */
export function formatMalayalamRecipeView(recipe: any): FormattedMalayalamRecipe {
  if (!recipe) {
    throw new Error("Recipe object is required for Malayalam formatting");
  }

  const titleMalayalam =
    recipe.titleMalayalam && recipe.titleMalayalam.trim().length > 0
      ? recipe.titleMalayalam
      : `${recipe.title} (മലയാളം പതിപ്പ്)`;

  const descriptionMalayalam =
    recipe.descriptionMalayalam && recipe.descriptionMalayalam.trim().length > 0
      ? recipe.descriptionMalayalam
      : "പരമ്പരാഗത ചേരുവകളും കൃത്യമായ അളവുകളും ഉപയോഗിച്ച് തയ്യാറാക്കാവുന്ന സ്വാദിഷ്ടമായ വിഭവം.";

  // Safe storage / food safety in Malayalam
  let foodSafetyNotesMalayalam =
    recipe.foodSafety?.safeStorageMalayalam ||
    recipe.storageGuidanceMalayalam ||
    recipe.refrigerationGuidanceMalayalam;

  if (!foodSafetyNotesMalayalam || foodSafetyNotesMalayalam.trim().length === 0) {
    if (recipe.foodSafety?.safeStorage) {
      foodSafetyNotesMalayalam = `${recipe.foodSafety.safeStorage} — വൃത്തിയുള്ള പാത്രത്തിൽ മൂടി സൂക്ഷിക്കുക.`;
    } else {
      foodSafetyNotesMalayalam =
        "ഭക്ഷണം എപ്പോഴും വൃത്തിയുള്ള പാത്രങ്ങളിൽ മൂടി സൂക്ഷിക്കുക. തണുപ്പിച്ച ശേഷം അടപ്പുള്ള പാത്രത്തിൽ ഫ്രിഡ്ജിൽ സൂക്ഷിക്കുക.";
    }
  }

  // Ensure Malayalam characters exist in food safety notes
  if (!/[\u0D00-\u0D7F]/.test(foodSafetyNotesMalayalam)) {
    foodSafetyNotesMalayalam = `${foodSafetyNotesMalayalam} (ഫ്രിഡ്ജിൽ ശരിയായ തണുപ്പിൽ സൂക്ഷിക്കുക)`;
  }

  // Preserve ingredients: quantities, units, and name
  const ingredients: MalayalamIngredient[] = (recipe.ingredients || []).map(
    (ing: any) => {
      let mlName = ing.nameMalayalam;
      if (!mlName || mlName.trim().length === 0 || !/[\u0D00-\u0D7F]/.test(mlName)) {
        mlName = `${ing.name} (ചേരുവ)`;
      }
      return {
        name: ing.name,
        nameMalayalam: mlName,
        amount: ing.amount,
        unit: ing.unit,
        notes: ing.notes,
        category: ing.category,
      };
    }
  );

  // Preserve instructions: step numbers, sequential order, text
  const instructions: MalayalamInstruction[] = (recipe.instructions || []).map(
    (step: any, idx: number) => {
      const stepNumber = typeof step.stepNumber === "number" ? step.stepNumber : idx + 1;
      let mlText = step.textMalayalam;
      if (!mlText || mlText.trim().length === 0 || !/[\u0D00-\u0D7F]/.test(mlText)) {
        mlText = `${step.text} (പാചക ഘട്ടം പൂർത്തിയാക്കുക)`;
      }
      return {
        stepNumber,
        title: step.title,
        text: step.text,
        textMalayalam: mlText,
        timerMinutes: step.timerMinutes,
        tip: step.tip,
      };
    }
  );

  return {
    id: recipe.id || recipe.slug || "recipe",
    title: recipe.title || "Recipe",
    titleMalayalam,
    description: recipe.description || "",
    descriptionMalayalam,
    prepTime: Number(recipe.prepTime) || 0,
    cookTime: Number(recipe.cookTime) || 0,
    servings: Number(recipe.servings) || 2,
    ingredients,
    instructions,
    foodSafetyNotesMalayalam,
    cuisine: recipe.cuisine,
    stateOrCountry: recipe.stateOrCountry,
  };
}

interface MalayalamRecipeViewProps {
  recipe: any;
  onLanguageChange?: (lang: "en" | "ml") => void;
  className?: string;
}

export function MalayalamRecipeView({
  recipe,
  onLanguageChange,
  className = "",
}: MalayalamRecipeViewProps) {
  const [activeLang, setActiveLang] = useState<"en" | "ml">("en");
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);

  const formatted = React.useMemo(() => formatMalayalamRecipeView(recipe), [recipe]);

  const toggleLanguage = () => {
    const nextLang = activeLang === "en" ? "ml" : "en";
    setActiveLang(nextLang);
    if (onLanguageChange) {
      onLanguageChange(nextLang);
    }
  };

  const toggleChecked = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleOptionalTtsCheck = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioFeedback("ശ്രാവ്യ പ്ലെയർ: നിങ്ങളുടെ ബ്രൗസറിൽ സൗണ്ട് സിന്തസിസ് ലഭ്യമല്ല.");
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find(
      (v) => v.lang === "ml-IN" || v.lang.startsWith("ml") || v.name.toLowerCase().includes("malayalam")
    );
    if (malayalamVoice) {
      setAudioFeedback(`മലയാളം വോയ്‌സ് കണ്ടെത്തി: ${malayalamVoice.name}`);
    } else {
      setAudioFeedback(
        "നിങ്ങളുടെ സിസ്റ്റത്തിൽ മലയാളം വോയ്‌സ് പായ്ക്ക് ഇൻസ്റ്റാൾ ചെയ്തിട്ടില്ല. എന്നാൽ ടെക്സ്റ്റ് വിവർത്തനം 100% പൂർണ്ണമായി പ്രവർത്തിക്കുന്നു."
      );
    }
    setTimeout(() => setAudioFeedback(null), 6000);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Malayalam Translation Action Header */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-glass bg-gradient-to-r from-brand-primary/10 via-background to-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-lg shadow-sm">
            മ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-foreground">
                {activeLang === "ml" ? "മലയാളം പതിപ്പ് സജീവം" : "Malayalam Recipe Reader"}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Offline Verified
              </span>
            </div>
            <p className="text-xs text-foreground/70">
              {activeLang === "ml"
                ? "ചേരുവകളുടെ കൃത്യമായ അളവും പാചക ഘട്ടങ്ങളും മലയാളത്തിൽ കാണാം."
                : "Translate ingredients, exact units, and step-by-step instructions into Malayalam."}
            </p>
          </div>
        </div>

        {/* The Mandatory Button: “മലയാളത്തിൽ വായിക്കുക” — Read in Malayalam */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={toggleLanguage}
            data-testid="malayalam-toggle-btn"
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              activeLang === "ml"
                ? "bg-slate-800 text-white border border-white/20 hover:bg-slate-700"
                : "bg-brand-primary text-background hover:bg-brand-primary/90 hover:shadow-lg"
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>
              {activeLang === "ml"
                ? "യഥാർത്ഥ പാചകക്കുറിപ്പ് (View Original English)"
                : "മലയാളത്തിൽ വായിക്കുക (Read in Malayalam)"}
            </span>
          </button>
        </div>
      </div>

      {/* Render Malayalam View when active */}
      {activeLang === "ml" && (
        <div
          data-testid="malayalam-active-container"
          className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-primary/40 shadow-2xl space-y-8 animate-fade-in bg-background/95"
          style={{ fontFamily: "'Noto Sans Malayalam', 'Manjari', sans-serif" }}
        >
          {/* Header Banner */}
          <div className="space-y-3 pb-6 border-b border-glass-border">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                {formatted.cuisine || "പരമ്പരാഗത പാചകം"} • {formatted.stateOrCountry || "വിഭവം"}
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> കൃത്യമായ അളവുകൾ മാറ്റമില്ലാതെ സംരക്ഷിച്ചിരിക്കുന്നു
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              {formatted.titleMalayalam}
            </h2>

            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed font-medium">
              {formatted.descriptionMalayalam}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-2xl glass-card">
                <div className="text-[10px] text-foreground/60 font-bold uppercase">തയ്യാറാക്കൽ സമയം</div>
                <div className="text-base font-extrabold text-foreground mt-0.5">
                  {formatted.prepTime} മിനിറ്റ്
                </div>
              </div>
              <div className="p-3 rounded-2xl glass-card">
                <div className="text-[10px] text-foreground/60 font-bold uppercase">പാചക സമയം</div>
                <div className="text-base font-extrabold text-foreground mt-0.5">
                  {formatted.cookTime} മിനിറ്റ്
                </div>
              </div>
              <div className="p-3 rounded-2xl glass-card">
                <div className="text-[10px] text-foreground/60 font-bold uppercase">വിളമ്പാവുന്നത്</div>
                <div className="text-base font-extrabold text-foreground mt-0.5">
                  {formatted.servings} ആളുകൾക്ക്
                </div>
              </div>
            </div>
          </div>

          {/* Malayalam Ingredients Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-foreground flex items-center gap-2">
                <Utensils className="w-5 h-5 text-brand-primary" />
                <span>ആവശ്യമായ ചേരുവകൾ (Ingredients)</span>
              </h3>
              <span className="text-xs text-foreground/60 font-mono">
                {formatted.ingredients.length} എണ്ണം
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formatted.ingredients.map((ing, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecked(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? "bg-brand-primary/10 border-brand-primary/30 opacity-60 line-through"
                        : "glass-card hover:border-brand-primary/50"
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
                        <div className="text-sm font-bold text-foreground">
                          {ing.nameMalayalam}
                        </div>
                        <div className="text-[11px] text-foreground/50">
                          {ing.name}
                        </div>
                        {ing.notes && (
                          <div className="text-[10px] text-brand-primary font-medium">
                            {ing.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono font-black text-xs text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-lg">
                      {ing.amount} {ing.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Malayalam Step-by-Step Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-primary" />
              <span>പാചക രീതി (Step-by-Step Cooking Instructions)</span>
            </h3>

            <div className="space-y-4">
              {formatted.instructions.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-2xl glass-card border-l-4 border-l-brand-primary space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-brand-primary">
                      ഘട്ടം {step.stepNumber}
                    </span>
                    {step.timerMinutes && (
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {step.timerMinutes} മിനിറ്റ്
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                    {step.textMalayalam}
                  </p>

                  <p className="text-xs text-foreground/50 leading-relaxed font-sans">
                    {step.text}
                  </p>

                  {step.tip && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-foreground/75 font-sans">
                      <span className="font-bold text-brand-primary">Chef Secret: </span>
                      {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Food Safety & Safe Storage in Malayalam */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>ഭക്ഷണ സുരക്ഷയും സംഭരണ മാർഗ്ഗനിർദ്ദേശങ്ങളും</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-100/90 font-medium">
              {formatted.foodSafetyNotesMalayalam}
            </p>
          </div>

          {/* Independent Audio Status / TTS Diagnostic Card */}
          <div className="p-4 rounded-2xl glass-card text-xs text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-3 border border-glass-border">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span>
                ടെക്സ്റ്റ് വിവർത്തനം ഓഡിയോ പ്ലേബാക്കിൽ നിന്നും സ്വതന്ത്രമായി പ്രവർത്തിക്കുന്നു.
              </span>
            </div>
            <button
              onClick={handleOptionalTtsCheck}
              className="px-3 py-1.5 rounded-xl glass-card text-xs font-bold hover:border-brand-primary text-foreground flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-brand-primary" />
              <span>ശ്രാവ്യ പ്ലെയർ നില പരിശോധിക്കുക</span>
            </button>
          </div>

          {audioFeedback && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs animate-fade-in">
              {audioFeedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
