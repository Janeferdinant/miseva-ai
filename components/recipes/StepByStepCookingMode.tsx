"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sun,
  Eye,
  CheckCircle2,
  Sparkles,
  Clock,
  ListChecks,
  Check,
} from "lucide-react";
import { Recipe, CookingStep } from "@/lib/types/recipe";
import { SpeechEngine } from "@/lib/voice/speech-engine";

interface StepByStepCookingModeProps {
  recipe: Recipe;
  initialStepIndex?: number;
  onClose: () => void;
}

export function StepByStepCookingMode({
  recipe,
  initialStepIndex = 0,
  onClose,
}: StepByStepCookingModeProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
  const [fontScale, setFontScale] = useState<"normal" | "large" | "xlarge">("large");
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [isWakeLocked, setIsWakeLocked] = useState(false);
  const [wakeLockObj, setWakeLockObj] = useState<any>(null);

  const steps = recipe.instructions;
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Timer state for current step
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sync step timer when step changes
  useEffect(() => {
    if (currentStep.timerMinutes && currentStep.timerMinutes > 0) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
      setIsTimerRunning(false);
    } else {
      setTimerSecondsLeft(null);
      setIsTimerRunning(false);
    }
  }, [currentStepIndex, currentStep.timerMinutes]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev !== null && prev > 1) {
            return prev - 1;
          }
          setIsTimerRunning(false);
          // Audio chime or speech announcement
          SpeechEngine.speak("Cooking step timer completed!", "en");
          return 0;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  // Screen WakeLock API
  useEffect(() => {
    let lock: any = null;
    const requestWakeLock = async () => {
      if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
        try {
          lock = await (navigator as any).wakeLock.request("screen");
          setWakeLockObj(lock);
          setIsWakeLocked(true);
        } catch {
          setIsWakeLocked(false);
        }
      }
    };

    requestWakeLock();

    return () => {
      if (lock) {
        lock.release().catch(() => {});
      }
    };
  }, []);

  const handleNext = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const speakCurrentStep = (lang: "en" | "ml") => {
    const textToSpeak =
      lang === "ml"
        ? currentStep.textMalayalam || currentStep.text
        : `${currentStep.title}. ${currentStep.text}`;
    SpeechEngine.speak(textToSpeak, lang);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const textClasses = {
    normal: "text-base sm:text-lg leading-relaxed",
    large: "text-lg sm:text-2xl leading-relaxed font-semibold",
    xlarge: "text-xl sm:text-3xl leading-relaxed font-bold",
  }[fontScale];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col text-foreground overflow-hidden animate-fade-in select-none">
      {/* Top Header Bar */}
      <header className="px-4 sm:px-8 py-4 border-b border-glass-border/60 flex items-center justify-between gap-4 bg-background/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-2xl glass-card hover:bg-white/10 transition-colors"
            title="Exit Cooking Mode (Esc)"
          >
            <X className="w-5 h-5 text-foreground/80" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-primary">
                Cooking Mode
              </span>
              <span className="text-xs text-foreground/40">•</span>
              <span className="text-xs font-semibold text-foreground/75 truncate max-w-[200px] sm:max-w-md">
                {recipe.title}
              </span>
            </div>
            <div className="text-[11px] text-foreground/60">
              Step {currentStepIndex + 1} of {totalSteps} ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Controls: Wake Lock, Text Size, Ingredients Drawer */}
        <div className="flex items-center gap-2">
          {/* Wake Lock Status */}
          {isWakeLocked && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
              title="Screen kept active while cooking"
            >
              <Sun className="w-3.5 h-3.5 animate-pulse" />
              <span>Screen On</span>
            </div>
          )}

          {/* Font Sizer Controls */}
          <div className="flex items-center gap-1 p-1 rounded-xl glass-card">
            <button
              onClick={() => setFontScale("normal")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                fontScale === "normal"
                  ? "bg-brand-primary text-background shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontScale("large")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                fontScale === "large"
                  ? "bg-brand-primary text-background shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              title="Large Font Size (Recommended for Countertop Reading)"
            >
              A+
            </button>
            <button
              onClick={() => setFontScale("xlarge")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                fontScale === "xlarge"
                  ? "bg-brand-primary text-background shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Ingredients Checklist Drawer Button */}
          <button
            onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isIngredientsOpen
                ? "bg-brand-primary text-background border-brand-primary"
                : "glass-card text-foreground hover:border-brand-primary/50"
            }`}
          >
            <ListChecks className="w-4 h-4" />
            <span className="hidden sm:inline">Ingredients</span>
          </button>
        </div>
      </header>

      {/* Progress Bar Strip */}
      <div className="w-full bg-white/5 h-1.5">
        <div
          className="bg-brand-primary h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Step Content Container */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 max-w-4xl mx-auto flex flex-col justify-between space-y-8">
          <div className="space-y-6 animate-fade-in">
            {/* Step Counter Badge */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-black border border-brand-primary/30">
                Step {currentStep.stepNumber} of {totalSteps}
              </span>

              {/* TTS Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakCurrentStep("en")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs font-bold hover:text-brand-primary transition-colors"
                  title="Read aloud in English"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>English</span>
                </button>
                <button
                  onClick={() => speakCurrentStep("ml")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs font-bold hover:text-brand-primary transition-colors font-serif lang-ml"
                  title="Read aloud in Malayalam"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>മലയാളം</span>
                </button>
              </div>
            </div>

            {/* Step Title */}
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              {currentStep.title}
            </h2>

            {/* Instruction Body (English) */}
            <div className={`text-foreground/90 ${textClasses}`}>
              {currentStep.text}
            </div>

            {/* Instruction Body (Malayalam) */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-brand-primary">
                മലയാള നിർദ്ദേശം
              </div>
              <p className="text-base sm:text-xl font-serif lang-ml text-foreground/85 leading-relaxed">
                {currentStep.textMalayalam}
              </p>
            </div>

            {/* Chef Secret / Tip */}
            {currentStep.tip && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Chef's Pro Tip
                  </div>
                  <div className="text-xs sm:text-sm font-medium mt-0.5">
                    {currentStep.tip}
                  </div>
                </div>
              </div>
            )}

            {/* Embedded Active Step Countdown Timer */}
            {timerSecondsLeft !== null && (
              <div className="p-5 sm:p-6 rounded-3xl glass-card border border-brand-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                      Step Timer
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                      {formatTimer(timerSecondsLeft)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-primary text-background font-extrabold text-sm shadow-md hover:bg-brand-primary/90 transition-all"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Start Timer</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSecondsLeft((currentStep.timerMinutes || 0) * 60);
                    }}
                    className="p-2.5 rounded-2xl glass-card hover:bg-white/10 text-foreground transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Ingredients Sidebar Drawer */}
        {isIngredientsOpen && (
          <aside className="w-80 sm:w-96 border-l border-glass-border/60 bg-background/95 p-6 overflow-y-auto space-y-4 animate-slide-left z-20">
            <div className="flex items-center justify-between pb-3 border-b border-glass-border/60">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-brand-primary" />
                <h3 className="font-extrabold text-sm text-foreground">
                  Ingredients Checklist
                </h3>
              </div>
              <button
                onClick={() => setIsIngredientsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-foreground/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(ing.name)}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between border text-xs ${
                      isChecked
                        ? "bg-brand-primary/10 border-brand-primary/30 opacity-60 line-through"
                        : "glass-card hover:border-brand-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-brand-primary border-brand-primary text-background"
                            : "border-white/30"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{ing.name}</div>
                        <div className="text-[10px] text-foreground/60 lang-ml">
                          {ing.nameMalayalam}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono font-bold text-foreground/80">
                      {ing.amount} {ing.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Navigation Dock */}
      <footer className="px-4 sm:px-8 py-4 border-t border-glass-border/60 flex items-center justify-between gap-4 bg-background/80">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
            currentStepIndex === 0
              ? "opacity-30 cursor-not-allowed glass-card text-foreground/50"
              : "glass-button hover:bg-white/10 text-foreground"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {/* Step Dots Indicators */}
        <div className="hidden md:flex items-center gap-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStepIndex
                  ? "w-8 bg-brand-primary"
                  : idx < currentStepIndex
                  ? "w-2.5 bg-brand-primary/50"
                  : "w-2 bg-white/20"
              }`}
              title={`Jump to Step ${idx + 1}`}
            />
          ))}
        </div>

        {currentStepIndex < totalSteps - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-brand-primary text-background font-black text-xs sm:text-sm shadow-lg hover:bg-brand-primary/90 transition-all hover:scale-105"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-emerald-500 text-background font-black text-xs sm:text-sm shadow-lg hover:bg-emerald-400 transition-all hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish Cooking</span>
          </button>
        )}
      </footer>
    </div>
  );
}
