import { Recipe, ScaledRecipe, ScaledIngredient } from "../types/recipe";

/**
 * Format a numeric quantity into clean culinary fractions or rounded decimals.
 * e.g., 0.5 -> "1/2", 0.25 -> "1/4", 1.5 -> "1 1/2", 2 -> "2"
 */
export function formatQuantity(amount: number): string {
  if (amount === 0) return "0";
  if (amount < 0) return amount.toString();

  const whole = Math.floor(amount);
  const remainder = Math.round((amount - whole) * 100) / 100;

  let fraction = "";
  if (Math.abs(remainder - 0.5) < 0.05) {
    fraction = "1/2";
  } else if (Math.abs(remainder - 0.25) < 0.05) {
    fraction = "1/4";
  } else if (Math.abs(remainder - 0.75) < 0.05) {
    fraction = "3/4";
  } else if (Math.abs(remainder - 0.33) < 0.05) {
    fraction = "1/3";
  } else if (Math.abs(remainder - 0.67) < 0.05) {
    fraction = "2/3";
  } else if (Math.abs(remainder - 0.125) < 0.05) {
    fraction = "1/8";
  } else if (remainder >= 0.05) {
    // Round to 1 decimal place if not a common fraction
    return (Math.round(amount * 10) / 10).toString();
  }

  if (whole > 0 && fraction) {
    return `${whole} ${fraction}`;
  } else if (fraction) {
    return fraction;
  } else {
    return whole.toString();
  }
}

/**
 * Scale a recipe to a target number of servings.
 */
export function scaleRecipe(recipe: Recipe, targetServings: number): ScaledRecipe {
  const safeTarget = Math.max(1, targetServings);
  const ratio = safeTarget / recipe.servings;

  const scaledIngredients: ScaledIngredient[] = recipe.ingredients.map((ing) => {
    const scaledAmount = Math.round(ing.amount * ratio * 100) / 100;
    return {
      ...ing,
      originalAmount: ing.amount,
      amount: scaledAmount,
      formattedAmount: formatQuantity(scaledAmount),
    };
  });

  return {
    ...recipe,
    servings: safeTarget,
    ingredients: scaledIngredients,
    targetServings: safeTarget,
  };
}
