import { describe, it, expect } from "vitest";
import { THEMES, ThemeType } from "@/lib/theme/theme-context";
import fs from "fs";
import path from "path";

describe("Futuristic Cyber Kitchen 2099 Theme", () => {
  it("includes 'cyber' in THEMES with futuristic cyberpunk styling", () => {
    expect((THEMES as Record<string, unknown>)["cyber"]).toBeDefined();
    const cyber = (THEMES as Record<string, any>)["cyber"];
    expect(cyber.id).toBe("cyber");
    expect(cyber.name).toContain("Cyber");
    expect(cyber.nameMalayalam).toBeDefined();
    expect(cyber.accent.toLowerCase()).toBe("#00f0ff");
    expect(cyber.glow).toContain("rgba(0, 240, 255");
  });

  it("defines cyber data-theme CSS variables in app/globals.css for dark and light modes", () => {
    const css = fs.readFileSync(path.resolve(process.cwd(), "app/globals.css"), "utf-8");
    expect(css).toContain('data-theme="cyber"][data-mode="dark"]');
    expect(css).toContain('data-theme="cyber"][data-mode="light"]');
    expect(css).toContain("--brand-primary: #00f0ff");
    expect(css).toContain(".cyber-grid");
    expect(css).toContain(".cyber-hud-bracket");
    expect(css).toContain(".cyber-glow-text");
  });
});
