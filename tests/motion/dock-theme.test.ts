import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Motion Control Dock & Theme UI/UX Enhancements", () => {
  it("provides MotionControlDock component with Cyber toggle and FX switches", () => {
    const dockPath = path.resolve(process.cwd(), "components/motion/MotionControlDock.tsx");
    expect(fs.existsSync(dockPath)).toBe(true);
    const code = fs.readFileSync(dockPath, "utf-8");
    expect(code).toContain("MotionControlDock");
    expect(code).toContain("Cyber Kitchen");
    expect(code).toContain("toggleCyberGrid");
    expect(code).toContain("toggleSound");
  });

  it("updates ThemeSelector to show 7 palettes and highlight futuristic cyber theme", () => {
    const themeSelPath = path.resolve(process.cwd(), "components/ThemeSelector.tsx");
    const code = fs.readFileSync(themeSelPath, "utf-8");
    expect(code).toContain("7 Palettes");
    expect(code).toContain("isFuturistic");
  });

  it("wires MotionControlDock into app/layout.tsx for persistent accessibility", () => {
    const layoutPath = path.resolve(process.cwd(), "app/layout.tsx");
    const code = fs.readFileSync(layoutPath, "utf-8");
    expect(code).toContain("MotionControlDock");
  });
});
