import { describe, it, expect } from "vitest";
import { getAllRegions } from "@/lib/data/cuisines";
import {
  CONTINENT_MAP,
  getContinentForRegion,
  countVerifiedRecipesForRegion,
  generateCuisineBreadcrumb,
} from "@/lib/cuisines/hierarchy";

describe("Geographic Cuisine Hierarchy & Discovery Engine", () => {
  const regions = getAllRegions();

  it("should map every registered culinary region to a broad geographic continent", () => {
    for (const reg of regions) {
      const continent = getContinentForRegion(reg.id);
      expect(continent).toBeTruthy();
      expect(["South Asia", "Europe", "East Asia", "Southeast Asia", "Americas", "Middle East & Levant"]).toContain(continent);
    }
  });

  it("should calculate verified recipe counts grounded in the actual database", () => {
    const keralaCount = countVerifiedRecipesForRegion("kerala");
    expect(keralaCount).toBeGreaterThanOrEqual(1);

    const punjabCount = countVerifiedRecipesForRegion("punjab");
    expect(punjabCount).toBeGreaterThanOrEqual(1);

    // Ensure no fabrication - unknown regions return 0
    expect(countVerifiedRecipesForRegion("atlantis")).toBe(0);
  });

  it("should generate a strict 4-level navigation breadcrumb hierarchy", () => {
    const crumbs = generateCuisineBreadcrumb("kerala", "Main Course", "Avial");
    expect(crumbs).toHaveLength(6);
    expect(crumbs[0].label).toBe("Home");
    expect(crumbs[1].label).toBe("Explore Cuisines");
    expect(crumbs[2].label).toBe("South Asia");
    expect(crumbs[3].label).toBe("Kerala");
    expect(crumbs[4].label).toBe("Main Course");
    expect(crumbs[5].label).toBe("Avial");
  });
});
