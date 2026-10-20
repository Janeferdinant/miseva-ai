import { describe, it, expect } from "vitest";
import { INDIAN_REGIONS, GLOBAL_CUISINES, getRegionBySlug, getAllRegions } from "@/lib/data/cuisines";
import { RECIPES } from "@/lib/data/recipes";

describe("Cuisine & Country Navigation and Routing", () => {
  it("defines unique, non-empty canonical slugs for all culinary regions", () => {
    const all = getAllRegions();
    expect(all.length).toBeGreaterThan(15);
    const slugs = all.map((r) => r.id);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("resolves region by slug accurately and handles case-insensitivity", () => {
    const kerala = getRegionBySlug("kerala");
    expect(kerala).toBeDefined();
    expect(kerala?.name).toBe("Kerala");
    expect(kerala?.category).toBe("South India");

    const italy = getRegionBySlug("ITALY");
    expect(italy).toBeDefined();
    expect(italy?.name).toBe("Italian");

    const punjab = getRegionBySlug("punjab");
    expect(punjab).toBeDefined();
    expect(punjab?.name).toBe("Punjab");
  });

  it("returns undefined for invalid or unknown region slugs", () => {
    expect(getRegionBySlug("atlantis")).toBeUndefined();
    expect(getRegionBySlug("")).toBeUndefined();
    expect(getRegionBySlug("unknown-region-999")).toBeUndefined();
  });

  it("has corresponding recipes for major culinary regions", () => {
    const keralaRecipes = RECIPES.filter(
      (r) =>
        r.stateOrCountry.toLowerCase().includes("kerala") ||
        r.cuisine.toLowerCase() === "kerala"
    );
    expect(keralaRecipes.length).toBeGreaterThan(0);

    const italianRecipes = RECIPES.filter(
      (r) =>
        r.stateOrCountry.toLowerCase().includes("italy") ||
        r.cuisine.toLowerCase() === "italian"
    );
    expect(italianRecipes.length).toBeGreaterThan(0);

    const japaneseRecipes = RECIPES.filter(
      (r) =>
        r.stateOrCountry.toLowerCase().includes("japan") ||
        r.cuisine.toLowerCase() === "japanese"
    );
    expect(japaneseRecipes.length).toBeGreaterThan(0);
  });

  it("all recipes have valid IDs that link to recipe detail pages", () => {
    for (const recipe of RECIPES) {
      expect(recipe.id).toBeTruthy();
      expect(recipe.id.trim()).not.toBe("");
      expect(recipe.title).toBeTruthy();
      expect(recipe.imageUrl).toBeTruthy();
    }
  });

  it("supports every defined country and cuisine route with full metadata", () => {
    const all = getAllRegions();
    for (const reg of all) {
      const resolved = getRegionBySlug(reg.id);
      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(reg.id);
      expect(resolved?.name).toBeTruthy();
      expect(resolved?.nameMalayalam).toBeTruthy();
      expect(resolved?.icon).toBeTruthy();
      expect(resolved?.specialties.length).toBeGreaterThan(0);
      expect(resolved?.description).toBeTruthy();
    }
  });

  it("includes dedicated ingredient finder and excludes marketing tab from culinary navigation", async () => {
    // Read components/Navbar.tsx to verify navigation items
    const fs = await import("fs");
    const path = await import("path");
    const navbarCode = fs.readFileSync(path.resolve(process.cwd(), "components/Navbar.tsx"), "utf-8");
    
    expect(navbarCode).toContain('href: "/ingredient-finder"');
    expect(navbarCode).toContain('Ingredient Finder');
    expect(navbarCode).toContain('href: "/explore"');
    expect(navbarCode).toContain('href: "/recipes"');
    expect(navbarCode).toContain('href: "/meal-planner"');
    expect(navbarCode).toContain('href: "/table-styling"');
    expect(navbarCode).not.toContain('href: "/marketing"');
    expect(navbarCode).not.toContain('href: "/campaigns"');
  });
});
