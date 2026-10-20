import { Recipe } from "../types/recipe";
import { calculateRecipeGroceryCost } from "../pricing/cart-calculator";

export type MealSlotName = "breakfast" | "lunch" | "dinner" | "snack";

export interface MealSlotItem {
  id: string;
  title: string;
  titleMalayalam: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  estimatedCost: number;
}

export interface DayPlan {
  day: string;
  dayMalayalam: string;
  slots: Record<MealSlotName, MealSlotItem | null>;
}

export interface MealPlanSchedule {
  id: string;
  name: string;
  days: DayPlan[];
}

export interface MealPlanTotals {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  estimatedWeeklyBudget: number;
  scheduledRecipeCount: number;
}

const DAYS_META: { day: string; dayMalayalam: string }[] = [
  { day: "Monday", dayMalayalam: "തിങ്കൾ (Monday)" },
  { day: "Tuesday", dayMalayalam: "ചൊവ്വ (Tuesday)" },
  { day: "Wednesday", dayMalayalam: "ബുധൻ (Wednesday)" },
  { day: "Thursday", dayMalayalam: "വ്യാഴം (Thursday)" },
  { day: "Friday", dayMalayalam: "വെള്ളി (Friday)" },
  { day: "Saturday", dayMalayalam: "ശനി (Saturday)" },
  { day: "Sunday", dayMalayalam: "ഞായർ (Sunday)" },
];

export function createDefaultMealPlan(): MealPlanSchedule {
  return {
    id: "default-week-plan",
    name: "Standard Weekly Culinary Rotation",
    days: DAYS_META.map((d) => ({
      day: d.day,
      dayMalayalam: d.dayMalayalam,
      slots: {
        breakfast: null,
        lunch: null,
        dinner: null,
        snack: null,
      },
    })),
  };
}

export function addRecipeToMealPlanSlot(
  plan: MealPlanSchedule,
  dayName: string,
  slot: MealSlotName,
  recipe: Recipe
): MealPlanSchedule {
  const grocerySummary = calculateRecipeGroceryCost(recipe, recipe.servings);

  const slotItem: MealSlotItem = {
    id: recipe.id,
    title: recipe.title,
    titleMalayalam: recipe.titleMalayalam,
    servings: recipe.servings,
    calories: recipe.nutrition.calories,
    protein: recipe.nutrition.protein,
    carbs: recipe.nutrition.carbs,
    fat: recipe.nutrition.fat,
    estimatedCost: grocerySummary.totalConsumptionCost,
  };

  const updatedDays = plan.days.map((d) => {
    if (d.day.toLowerCase() === dayName.toLowerCase()) {
      return {
        ...d,
        slots: {
          ...d.slots,
          [slot]: slotItem,
        },
      };
    }
    return d;
  });

  return {
    ...plan,
    days: updatedDays,
  };
}

export function removeRecipeFromMealPlanSlot(
  plan: MealPlanSchedule,
  dayName: string,
  slot: MealSlotName
): MealPlanSchedule {
  const updatedDays = plan.days.map((d) => {
    if (d.day.toLowerCase() === dayName.toLowerCase()) {
      return {
        ...d,
        slots: {
          ...d.slots,
          [slot]: null,
        },
      };
    }
    return d;
  });

  return {
    ...plan,
    days: updatedDays,
  };
}

export function calculateMealPlanTotals(plan: MealPlanSchedule): MealPlanTotals {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let estimatedWeeklyBudget = 0;
  let scheduledRecipeCount = 0;

  for (const day of plan.days) {
    for (const slotKey of Object.keys(day.slots) as MealSlotName[]) {
      const item = day.slots[slotKey];
      if (item) {
        totalCalories += item.calories;
        totalProtein += item.protein;
        totalCarbs += item.carbs;
        totalFat += item.fat;
        estimatedWeeklyBudget += item.estimatedCost;
        scheduledRecipeCount += 1;
      }
    }
  }

  return {
    totalCalories: Math.round(totalCalories),
    totalProtein: Math.round(totalProtein * 10) / 10,
    totalCarbs: Math.round(totalCarbs * 10) / 10,
    totalFat: Math.round(totalFat * 10) / 10,
    estimatedWeeklyBudget: Math.round(estimatedWeeklyBudget),
    scheduledRecipeCount,
  };
}

// Client Storage API
const FAVORITES_KEY = "culinaryverse_favorites";
const MEAL_PLAN_KEY = "culinaryverse_meal_plan";

export function getFavoriteRecipeIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteRecipe(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getFavoriteRecipeIds();
    let updated: string[];
    let isFav = false;
    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
      isFav = false;
    } else {
      updated = [...current, id];
      isFav = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return isFav;
  } catch {
    return false;
  }
}

export function saveMealPlanToStorage(plan: MealPlanSchedule): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
  } catch {}
}

export function loadMealPlanFromStorage(): MealPlanSchedule {
  if (typeof window === "undefined") return createDefaultMealPlan();
  try {
    const raw = localStorage.getItem(MEAL_PLAN_KEY);
    return raw ? JSON.parse(raw) : createDefaultMealPlan();
  } catch {
    return createDefaultMealPlan();
  }
}
