import { describe, it, expect } from "vitest";
import {
  calculateIngredientCost,
  calculateRecipeGroceryCost,
  consolidateShoppingList,
  getRetailerQuotes,
  RETAILERS,
} from "../lib/pricing/cart-calculator";
import { RECIPES } from "../lib/data/recipes";

describe("Retailer Pricing & Cost Intelligence Engine", () => {
  it("should have all 6 Indian grocery retailers defined", () => {
    expect(RETAILERS.length).toBe(6);
    const retailerIds = RETAILERS.map((r) => r.id);
    expect(retailerIds).toContain("amazon-fresh");
    expect(retailerIds).toContain("flipkart-grocery");
    expect(retailerIds).toContain("swiggy-instamart");
    expect(retailerIds).toContain("blinkit");
    expect(retailerIds).toContain("zepto");
    expect(retailerIds).toContain("bigbasket");
  });

  it("should correctly compute consumption cost vs checkout pack cost", () => {
    // e.g. recipe needs 150g, package is 500g at ₹100
    // consumption cost = 100 * (150 / 500) = ₹30
    // checkout cost = 1 pack * 100 = ₹100
    const cost = calculateIngredientCost({
      requiredAmount: 150,
      requiredUnit: "g",
      packageSize: 500,
      packageUnit: "g",
      packagePrice: 100,
    });

    expect(cost.consumptionCost).toBe(30);
    expect(cost.packsNeeded).toBe(1);
    expect(cost.checkoutCost).toBe(100);
    expect(cost.normalizedPricePerKg).toBe(200); // 100 / 0.5kg
  });

  it("should handle multi-pack requirements correctly", () => {
    // e.g. recipe needs 1200g, package is 500g at ₹100
    // needs 3 packs = ₹300 checkout cost
    // consumption cost = 100 * (1200 / 500) = ₹240
    const cost = calculateIngredientCost({
      requiredAmount: 1200,
      requiredUnit: "g",
      packageSize: 500,
      packageUnit: "g",
      packagePrice: 100,
    });

    expect(cost.consumptionCost).toBe(240);
    expect(cost.packsNeeded).toBe(3);
    expect(cost.checkoutCost).toBe(300);
  });

  it("should calculate complete recipe grocery cost across multiple retailers", () => {
    const recipe = RECIPES[0]; // Kerala Avial
    const summary = calculateRecipeGroceryCost(recipe, 4);

    expect(summary.totalConsumptionCost).toBeGreaterThan(0);
    expect(summary.totalCheckoutCost).toBeGreaterThanOrEqual(summary.totalConsumptionCost);
    expect(summary.retailerComparisons.length).toBe(6);

    for (const retailer of summary.retailerComparisons) {
      expect(retailer.retailerId).toBeDefined();
      expect(retailer.retailerName).toBeDefined();
      expect(retailer.searchUrl).toContain("http");
    }
  });

  it("should consolidate multiple recipes into a merged shopping list", () => {
    const list = consolidateShoppingList([RECIPES[0], RECIPES[1]]);
    expect(list.length).toBeGreaterThan(0);

    // Items should be unique by standardized name
    const names = list.map((item) => item.name.toLowerCase());
    const uniqueNames = new Set(names);
    expect(names.length).toBe(uniqueNames.size);
  });
});
