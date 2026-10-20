import { describe, it, expect } from "vitest";
import {
  createDefaultMealPlan,
  calculateMealPlanTotals,
  addRecipeToMealPlanSlot,
  MealPlanSchedule,
} from "../lib/storage/user-store";
import { RECIPES } from "../lib/data/recipes";

describe("Meal Planner & Budget Rollup", () => {
  it("should initialize a complete 7-day schedule with all meal slots", () => {
    const plan = createDefaultMealPlan();
    expect(plan.days.length).toBe(7);
    const dayNames = plan.days.map((d) => d.day);
    expect(dayNames).toContain("Monday");
    expect(dayNames).toContain("Sunday");

    for (const day of plan.days) {
      expect(day.slots.breakfast).toBeDefined();
      expect(day.slots.lunch).toBeDefined();
      expect(day.slots.dinner).toBeDefined();
      expect(day.slots.snack).toBeDefined();
    }
  });

  it("should add recipe to specific day and slot and calculate nutritional/budget totals", () => {
    let plan = createDefaultMealPlan();
    const recipe = RECIPES[0]; // Avial

    plan = addRecipeToMealPlanSlot(plan, "Monday", "lunch", recipe);
    const monday = plan.days.find((d) => d.day === "Monday");
    expect(monday?.slots.lunch?.id).toBe(recipe.id);

    const totals = calculateMealPlanTotals(plan);
    expect(totals.totalCalories).toBeGreaterThan(0);
    expect(totals.totalProtein).toBeGreaterThan(0);
    expect(totals.estimatedWeeklyBudget).toBeGreaterThan(0);
    expect(totals.scheduledRecipeCount).toBe(1);
  });
});
