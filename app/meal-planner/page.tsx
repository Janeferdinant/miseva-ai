"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Trash2,
  Sparkles,
  Flame,
  Clock,
  DollarSign,
  Utensils,
  ChevronRight,
  Info,
} from "lucide-react";
import { RECIPES } from "@/lib/data/recipes";
import {
  createDefaultMealPlan,
  addRecipeToMealPlanSlot,
  removeRecipeFromMealPlanSlot,
  calculateMealPlanTotals,
  MealPlanSchedule,
  MealSlotName,
  saveMealPlanToStorage,
  loadMealPlanFromStorage,
} from "@/lib/storage/user-store";

export default function MealPlannerPage() {
  const [schedule, setSchedule] = useState<MealPlanSchedule>(createDefaultMealPlan());
  const [activeDay, setActiveDay] = useState<string>("Monday");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<MealSlotName>("lunch");

  useEffect(() => {
    const saved = loadMealPlanFromStorage();
    // If empty schedule, seed a rich initial authentic rotation
    if (saved.days[0].slots.lunch === null) {
      let seeded = addRecipeToMealPlanSlot(saved, "Monday", "breakfast", RECIPES[2]); // Palappam
      seeded = addRecipeToMealPlanSlot(seeded, "Monday", "lunch", RECIPES[0]); // Avial
      seeded = addRecipeToMealPlanSlot(seeded, "Sunday", "lunch", RECIPES[1]); // Thalassery Biryani
      seeded = addRecipeToMealPlanSlot(seeded, "Wednesday", "dinner", RECIPES[3]); // Chettinad Chicken
      seeded = addRecipeToMealPlanSlot(seeded, "Friday", "dinner", RECIPES[9]); // Risotto
      setSchedule(seeded);
      saveMealPlanToStorage(seeded);
    } else {
      setSchedule(saved);
    }
  }, []);

  const totals = calculateMealPlanTotals(schedule);

  const handleOpenAddModal = (slot: MealSlotName) => {
    setTargetSlot(slot);
    setIsModalOpen(true);
  };

  const handleSelectRecipeForSlot = (recipe: any) => {
    const updated = addRecipeToMealPlanSlot(schedule, activeDay, targetSlot, recipe);
    setSchedule(updated);
    saveMealPlanToStorage(updated);
    setIsModalOpen(false);
  };

  const handleRemoveSlotItem = (day: string, slot: MealSlotName) => {
    const updated = removeRecipeFromMealPlanSlot(schedule, day, slot);
    setSchedule(updated);
    saveMealPlanToStorage(updated);
  };

  const currentDayPlan = schedule.days.find(
    (d) => d.day.toLowerCase() === activeDay.toLowerCase()
  );

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-glass-border shadow-glass">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Calendar className="w-4 h-4" />
              <span>Personalized Weekly Culinary Rotation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-1">
              7-Day Smart Meal Planner & Budget Calculator
            </h1>
            <p className="text-sm text-foreground/75 mt-1 max-w-2xl">
              Organize your weekly breakfast, lunch, dinner, and snack routines. Balance nutrition, minimize food waste, and estimate grocery budgets.
            </p>
          </div>

          <button
            onClick={() => {
              const fresh = createDefaultMealPlan();
              setSchedule(fresh);
              saveMealPlanToStorage(fresh);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-card text-xs font-bold text-rose-400 hover:border-rose-400/50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Schedule</span>
          </button>
        </div>

        {/* Weekly Nutritional & Budget Rollup Banner */}
        <div className="mt-8 pt-6 border-t border-glass-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-card border-brand-primary/30 bg-brand-primary/5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
              Estimated Weekly Budget
            </div>
            <div className="text-2xl font-black text-foreground mt-0.5">
              ₹{totals.estimatedWeeklyBudget}
            </div>
            <div className="text-[10px] text-foreground/60">
              For {totals.scheduledRecipeCount} scheduled meals
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" /> Total Calories
            </div>
            <div className="text-2xl font-black text-foreground mt-0.5">
              {totals.totalCalories} kcal
            </div>
            <div className="text-[10px] text-foreground/60">
              Across planned meal slots
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
              Total Protein
            </div>
            <div className="text-2xl font-black text-foreground mt-0.5">
              {totals.totalProtein}g
            </div>
            <div className="text-[10px] text-foreground/60">
              Sustained high-energy nutrition
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
              Scheduled Meals
            </div>
            <div className="text-2xl font-black text-foreground mt-0.5">
              {totals.scheduledRecipeCount} / 28
            </div>
            <div className="text-[10px] text-foreground/60">
              Slots active this week
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {schedule.days.map((d) => {
          const isSelected = activeDay.toLowerCase() === d.day.toLowerCase();
          const activeSlotsCount = Object.values(d.slots).filter(Boolean).length;
          return (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex flex-col items-start gap-0.5 ${
                isSelected
                  ? "bg-brand-primary text-white shadow-md scale-105"
                  : "glass-card text-foreground/75 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{d.day}</span>
                {activeSlotsCount > 0 && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-white" : "bg-brand-primary"
                    }`}
                  />
                )}
              </div>
              <div className="text-[10px] opacity-75 font-normal lang-ml">
                {d.dayMalayalam.split(" ")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Meal Slots */}
      {currentDayPlan && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-foreground">
              Planned Meals for {currentDayPlan.day} ({currentDayPlan.dayMalayalam})
            </h2>
            <Link
              href="/shopping"
              className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
            >
              <span>View Consolidated Shopping List</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["breakfast", "lunch", "dinner", "snack"] as MealSlotName[]).map((slot) => {
              const item = currentDayPlan.slots[slot];
              return (
                <div
                  key={slot}
                  className="rounded-2xl glass-panel p-5 border border-glass-border flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-glass-border/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-primary capitalize">
                      {slot}
                    </span>
                    {item && (
                      <button
                        onClick={() => handleRemoveSlotItem(currentDayPlan.day, slot)}
                        className="text-foreground/40 hover:text-rose-400 p-1"
                        title="Remove dish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {item ? (
                    <div className="space-y-2">
                      <Link
                        href={`/recipes/${item.id}`}
                        className="font-bold text-base text-foreground hover:text-brand-primary transition-colors block line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <div className="text-xs text-foreground/60 lang-ml line-clamp-1">
                        {item.titleMalayalam}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-foreground/75 font-mono">
                        <span>{item.calories} kcal</span>
                        <span className="font-bold text-brand-primary">~₹{item.estimatedCost}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center space-y-2">
                      <Utensils className="w-8 h-8 text-foreground/30 mx-auto" />
                      <div className="text-xs text-foreground/50">No dish scheduled</div>
                      <button
                        onClick={() => handleOpenAddModal(slot)}
                        className="px-3 py-1.5 rounded-xl glass-button text-xs font-bold inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Dish</span>
                      </button>
                    </div>
                  )}

                  {item && (
                    <button
                      onClick={() => handleOpenAddModal(slot)}
                      className="text-center text-[11px] font-bold text-brand-primary hover:underline"
                    >
                      Change Dish
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leftover Management Ideas Card */}
      <div className="p-6 rounded-3xl glass-panel border border-brand-primary/30 flex items-start gap-4 bg-brand-primary/5">
        <Info className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-foreground/80 leading-relaxed">
          <div className="font-bold text-foreground text-sm">Culinary Waste Reduction & Leftover Magic:</div>
          <p>
            Have leftover rice from Sunday's Thalassery Biryani? Turn it into authentic South Indian Lemon Rice or comforting Curd Rice on Monday. Leftover steamed vegetables from Kerala Sadya Avial can be rolled into healthy morning wraps or cutlets.
          </p>
        </div>
      </div>

      {/* Recipe Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl glass-panel border border-brand-primary/40 shadow-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-foreground">
                Select Recipe for {activeDay} ({targetSlot})
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-foreground/60 hover:text-foreground text-sm font-bold"
              >
                Close
              </button>
            </div>

            <div className="overflow-y-auto space-y-2.5 max-h-[60vh] pr-1">
              {RECIPES.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleSelectRecipeForSlot(recipe)}
                  className="p-3.5 rounded-2xl glass-card hover:border-brand-primary cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-sm text-foreground">
                        {recipe.title}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {recipe.stateOrCountry} • {recipe.nutrition.calories} kcal
                      </div>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 rounded-xl glass-button text-xs font-bold">
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
