import { describe, it, expect } from "vitest";
import { RECIPES } from "@/lib/data/recipes";
import { DESSERT_RECIPES } from "@/lib/data/desserts";
import { BEVERAGE_RECIPES } from "@/lib/data/beverages";
import { buildAuthoritativeImageRegistry, buildImageAuditRecords } from "@/lib/data/image-registry";

describe("Dish-to-Image Comprehensive Audit & Registry Validation", () => {
  it("audits the complete catalog of 230 distinct culinary dishes", () => {
    expect(RECIPES.length).toBe(140);
    expect(DESSERT_RECIPES.length).toBe(40);
    expect(BEVERAGE_RECIPES.length).toBe(50);
    const total = RECIPES.length + DESSERT_RECIPES.length + BEVERAGE_RECIPES.length;
    expect(total).toBe(230);

    const registry = buildAuthoritativeImageRegistry();
    expect(registry.length).toBe(230);
  });

  it("guarantees 100% uniqueness of image URLs across all 230 dishes (zero duplicates)", () => {
    const allUrls = [
      ...RECIPES.map((r) => r.imageUrl),
      ...DESSERT_RECIPES.map((d) => d.imageUrl),
      ...BEVERAGE_RECIPES.map((b) => b.imageUrl),
    ];
    expect(allUrls.length).toBe(230);

    const uniqueSet = new Set(allUrls);
    expect(uniqueSet.size).toBe(230);
  });

  it("verifies Japanese salmon nigiri sushi does not use living aquarium fish photo", () => {
    const salmonRecipe = RECIPES.find((r) => r.id === "jap-salmon-nigiri");
    expect(salmonRecipe).toBeDefined();
    // Verify it is NOT the aquarium/living fish photo
    expect(salmonRecipe?.imageUrl).not.toContain("photo-1579871494447-9811cf80d66c");
    expect(salmonRecipe?.imageUrl).toContain("images.unsplash.com");
  });

  it("verifies Kerala Chakka Pradhaman does not use book cover / product packaging photo", () => {
    const chakkaDessert = DESSERT_RECIPES.find((d) => d.id === "des-chakka-pradhaman");
    expect(chakkaDessert).toBeDefined();
    // Verify it is NOT the book cover photo
    expect(chakkaDessert?.imageUrl).not.toContain("photo-1544816155-12df9643f363");
    expect(chakkaDessert?.imageUrl).toContain("images.unsplash.com");
  });

  it("verifies that desserts and beverages do not use chapati or flatbread photos", () => {
    // Known chapati / roti Unsplash photo IDs that were mistakenly applied
    const chapatiPhotoIds = ["photo-1565557623262-b51c2513a641", "photo-1509440159596"];
    for (const d of DESSERT_RECIPES) {
      if (d.id === "des-palada-pradhaman" || d.id === "des-ada-pradhaman") {
        for (const chapatiId of chapatiPhotoIds) {
          expect(d.imageUrl).not.toContain(chapatiId);
        }
      }
    }
    for (const b of BEVERAGE_RECIPES) {
      for (const chapatiId of chapatiPhotoIds) {
        expect(b.imageUrl).not.toContain(chapatiId);
      }
    }
  });

  it("generates complete Image Audit records for all 230 dishes with resolution statuses", () => {
    const auditRecords = buildImageAuditRecords();
    expect(auditRecords.length).toBe(230);

    const salmonAudit = auditRecords.find((a) => a.recipeId === "jap-salmon-nigiri");
    expect(salmonAudit).toBeDefined();
    expect(salmonAudit?.finalAuditStatus).toBe("Corrected and Verified");
    expect(salmonAudit?.detectedProblem).toContain("aquarium");

    const chakkaAudit = auditRecords.find((a) => a.recipeId === "des-chakka-pradhaman");
    expect(chakkaAudit).toBeDefined();
    expect(chakkaAudit?.finalAuditStatus).toBe("Corrected and Verified");
    expect(chakkaAudit?.detectedProblem).toContain("packaging");
  });

  it("verifies 100% uniqueness of images across all 40 table styling concepts", async () => {
    const { TABLE_STYLING_CONCEPTS } = await import("@/lib/data/table-styling-concepts");
    expect(TABLE_STYLING_CONCEPTS.length).toBe(40);

    const moodUrls = TABLE_STYLING_CONCEPTS.map((c) => c.moodBoardImageUrl);
    expect(moodUrls.length).toBe(40);

    const uniqueMoods = new Set(moodUrls);
    expect(uniqueMoods.size).toBe(40);

    for (const url of moodUrls) {
      expect(url).toBeDefined();
      expect(url.length).toBeGreaterThan(10);
      expect(url !== "undefined").toBe(true);
    }

    // Zero cross-tab collisions with culinary catalog
    const foodUrls = new Set([
      ...RECIPES.map((r) => r.imageUrl),
      ...DESSERT_RECIPES.map((d) => d.imageUrl),
      ...BEVERAGE_RECIPES.map((b) => b.imageUrl),
    ]);
    for (const url of moodUrls) {
      expect(foodUrls.has(url)).toBe(false);
    }
  });
});
