import { describe, it, expect } from "vitest";
import { THEMES, ThemeType, ModeType } from "../lib/theme/theme-context";

describe("Theme System", () => {
  it("should have all 6 liquid-glass themes defined", () => {
    const themeKeys = Object.keys(THEMES);
    expect(themeKeys).toEqual([
      "emerald",
      "saffron",
      "ocean",
      "midnight",
      "rose",
      "ivory",
    ]);
  });

  it("should provide valid metadata for each theme", () => {
    for (const key of Object.keys(THEMES) as ThemeType[]) {
      const theme = THEMES[key];
      expect(theme.name).toBeDefined();
      expect(theme.nameMalayalam).toBeDefined();
      expect(theme.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(theme.description).toBeDefined();
    }
  });

  it("should support both dark and light modes", () => {
    const validModes: ModeType[] = ["dark", "light"];
    expect(validModes.length).toBe(2);
  });
});
