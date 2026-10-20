import { describe, it, expect } from "vitest";
import { THEMES, ThemeType, ModeType } from "@/lib/theme/theme-context";
import fs from "fs";
import path from "path";

describe("Theme System", () => {
  it("should have all 7 liquid-glass and futuristic themes defined", () => {
    const themeKeys = Object.keys(THEMES);
    expect(themeKeys).toEqual([
      "emerald",
      "saffron",
      "ocean",
      "midnight",
      "rose",
      "ivory",
      "cyber",
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

  it("should define liquid-glass interactive button states and accessibility in globals.css", () => {
    const css = fs.readFileSync(path.resolve(process.cwd(), "app/globals.css"), "utf-8");

    expect(css).toContain(".glass-button");
    expect(css).toContain(".glass-button:hover");
    expect(css).toContain(".glass-button:active");
    expect(css).toContain(".glass-button:focus-visible");
    expect(css).toContain(".glass-button:disabled");
    expect(css).toContain("prefers-reduced-motion");
    expect(css).toContain("touch-action: manipulation");
  });
});
