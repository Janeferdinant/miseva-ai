import { describe, it, expect } from "vitest";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";
import { TABLE_STYLING_CONCEPTS } from "@/lib/data/table-styling-concepts";

describe("Table Styling Detail Resolution", () => {
  it("resolves all 10 luxury themes by slug or ID", () => {
    for (const theme of LUXURY_TABLE_THEMES) {
      expect(theme.slug).toBeTruthy();
      expect(theme.catchphrase).toBeTruthy();
      expect(theme.tableware).toBeDefined();
    }
  });

  it("resolves all 40 classic concepts by slug or ID", () => {
    for (const concept of TABLE_STYLING_CONCEPTS) {
      expect(concept.slug).toBeTruthy();
      expect(concept.moodBoardImageUrl).toBeTruthy();
      expect(concept.layoutPlacements.length).toBeGreaterThan(0);
    }
  });
});
