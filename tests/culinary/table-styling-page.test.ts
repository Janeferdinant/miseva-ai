import { describe, it, expect } from "vitest";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { CURATED_MEAL_COLLECTIONS } from "@/lib/data/curated-meal-collections";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";

describe("Table Styling Studio Page Integration", () => {
  it("provides comprehensive data for 10 luxury themes, 6 curated meals, and 40 classic concepts", () => {
    expect(LUXURY_TABLE_THEMES.length).toBe(10);
    expect(CURATED_MEAL_COLLECTIONS.length).toBe(6);
    expect(TABLE_STYLING_CONCEPTS.length).toBe(40);
  });

  it("verifies all luxury themes have valid slugs matching their IDs for routing", () => {
    for (const t of LUXURY_TABLE_THEMES) {
      expect(t.slug).toBe(t.id);
    }
  });
});
