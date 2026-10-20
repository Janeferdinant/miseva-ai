import { describe, it, expect } from "vitest";
import { generateThemePrompt, PresentationPromptOptions } from "@/lib/table-styling/image-prompt-engine";
import { LUXURY_TABLE_THEMES } from "@/lib/data/luxury-table-themes";

describe("Theme-Specific Image Prompt Engine", () => {
  it("synthesizes high-fidelity photographic prompts with tableware and lighting specs", () => {
    const royalTheme = LUXURY_TABLE_THEMES.find((t) => t.id === "royal-heritage")!;
    const options: PresentationPromptOptions = {
      selectedDishes: ["Mughlai Dum Biryani", "Shahi Paneer", "Garlic Naan"],
      guestCount: 6,
      tableShape: "rectangular",
      occasion: "Royal Banquet",
      cutleryOverride: "gold",
      plateOverride: "fine-bone-china"
    };

    const result = generateThemePrompt(royalTheme, options);

    expect(result.prompt).toBeDefined();
    expect(result.prompt).toContain("Royal Heritage");
    expect(result.prompt).toContain("gold");
    expect(result.prompt).toContain("Mughlai Dum Biryani");
    expect(result.prompt).toContain("fine-bone-china");
    expect(result.negativePrompt).toContain("distorted");
    expect(result.metadata.aspectRatio).toBe("16:9");
    expect(result.metadata.themeId).toBe("royal-heritage");
    expect(result.metadata.guestCount).toBe(6);
  });

  it("handles empty dish selection gracefully by using theme signature culinary specialties", () => {
    const keralaTheme = LUXURY_TABLE_THEMES.find((t) => t.id === "kerala-royal-feast")!;
    const result = generateThemePrompt(keralaTheme, {
      guestCount: 4,
      tableShape: "rectangular",
      occasion: "Onam Sadya"
    });

    expect(result.prompt).toContain("Kerala Royal Feast");
    expect(result.prompt).toContain("banana-leaf");
    expect(result.metadata.dishesCount).toBeGreaterThan(0);
  });
});
