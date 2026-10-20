import { describe, it, expect } from "vitest";
import { generateCustomPlacements, TablewareCustomizerState } from "@/components/table-styling/TablewareCustomizer";

describe("Tableware Customizer & Dynamic Placements", () => {
  it("generates correct placement coordinates for rectangular table with 4 guests", () => {
    const state: TablewareCustomizerState = {
      guestCount: 4,
      tableShape: "rectangular",
      cutleryFinish: "gold",
      plateStyle: "fine-bone-china",
      glasswareStyle: "cut-crystal-goblet",
      linensStyle: "crimson-zardozi-silk",
      servingStyle: "plated-western"
    };

    const placements = generateCustomPlacements(state);

    expect(placements.length).toBeGreaterThanOrEqual(10);
    const plates = placements.filter((p) => p.itemType === "plate");
    expect(plates.length).toBe(4);

    const cutlery = placements.filter((p) => p.itemType === "cutlery");
    expect(cutlery.length).toBeGreaterThanOrEqual(4);

    const glassware = placements.filter((p) => p.itemType === "glass");
    expect(glassware.length).toBe(4);
  });

  it("handles round tables and banana-leaf serving style with authentic Kerala placements", () => {
    const state: TablewareCustomizerState = {
      guestCount: 6,
      tableShape: "round",
      cutleryFinish: "antique-brass",
      plateStyle: "fresh-banana-leaf",
      glasswareStyle: "hammered-brass-tumbler",
      linensStyle: "kasavu-gold-brocade",
      servingStyle: "banana-leaf"
    };

    const placements = generateCustomPlacements(state);
    expect(placements.length).toBeGreaterThanOrEqual(12);

    const leaves = placements.filter((p) => p.itemType === "banana-leaf");
    expect(leaves.length).toBe(6);

    const centerpiece = placements.find((p) => p.itemType === "centerpiece");
    expect(centerpiece).toBeDefined();
    expect(centerpiece?.xPercent).toBe(50);
    expect(centerpiece?.yPercent).toBe(50);
  });
});
