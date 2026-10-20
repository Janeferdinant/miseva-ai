import { describe, it, expect } from "vitest";
import { RECIPES } from "@/lib/data/recipes";

describe("Focused Cooking Mode Logic & State Management", () => {
  const sampleRecipe = RECIPES.find((r) => r.id === "kerala-avial") || RECIPES[0];

  it("should have ordered sequential cooking steps", () => {
    expect(sampleRecipe.instructions.length).toBeGreaterThan(1);
    for (let i = 0; i < sampleRecipe.instructions.length; i++) {
      expect(sampleRecipe.instructions[i].stepNumber).toBe(i + 1);
      expect(sampleRecipe.instructions[i].title).toBeTruthy();
      expect(sampleRecipe.instructions[i].text).toBeTruthy();
      expect(sampleRecipe.instructions[i].textMalayalam).toBeTruthy();
    }
  });

  it("should calculate exact step progress percentage", () => {
    const totalSteps = sampleRecipe.instructions.length;
    const calculateProgress = (stepIndex: number, total: number) => {
      if (total <= 0) return 0;
      return Math.round(((stepIndex + 1) / total) * 100);
    };

    expect(calculateProgress(0, totalSteps)).toBe(Math.round((1 / totalSteps) * 100));
    expect(calculateProgress(totalSteps - 1, totalSteps)).toBe(100);
  });

  it("should support font size scale adjustments for kitchen distance readability", () => {
    const FONT_SCALES = ["normal", "large", "xlarge"] as const;
    type FontScale = (typeof FONT_SCALES)[number];

    const getNextFontScale = (current: FontScale, direction: "increase" | "decrease"): FontScale => {
      const idx = FONT_SCALES.indexOf(current);
      if (direction === "increase") {
        return idx < FONT_SCALES.length - 1 ? FONT_SCALES[idx + 1] : current;
      } else {
        return idx > 0 ? FONT_SCALES[idx - 1] : current;
      }
    };

    expect(getNextFontScale("normal", "increase")).toBe("large");
    expect(getNextFontScale("large", "increase")).toBe("xlarge");
    expect(getNextFontScale("xlarge", "increase")).toBe("xlarge");
    expect(getNextFontScale("xlarge", "decrease")).toBe("large");
    expect(getNextFontScale("normal", "decrease")).toBe("normal");
  });

  it("should identify step timers correctly for active countdowns", () => {
    const stepWithTimer = sampleRecipe.instructions.find((s) => s.timerMinutes && s.timerMinutes > 0);
    if (stepWithTimer) {
      expect(stepWithTimer.timerMinutes).toBeGreaterThan(0);
      const seconds = (stepWithTimer.timerMinutes || 0) * 60;
      expect(seconds).toBeGreaterThanOrEqual(60);
    }
  });
});
