import { describe, it, expect } from "vitest";
import React from "react";
import fs from "fs";
import path from "path";

describe("Motion Graphics System", () => {
  it("provides MotionProvider and useMotion hook exports in motion-context.tsx", () => {
    const filePath = path.resolve(process.cwd(), "components/motion/motion-context.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("export function MotionProvider");
    expect(content).toContain("export function useMotion");
    expect(content).toContain("motionLevel");
    expect(content).toContain("toggleParticles");
  });

  it("provides MotionGraphicsCanvas with HTML5 Canvas particle rendering", () => {
    const filePath = path.resolve(process.cwd(), "components/motion/MotionGraphicsCanvas.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("<canvas");
    expect(content).toContain("requestAnimationFrame");
    expect(content).toContain("cancelAnimationFrame");
  });

  it("integrates MotionProvider and MotionGraphicsCanvas in app/layout.tsx", () => {
    const layout = fs.readFileSync(path.resolve(process.cwd(), "app/layout.tsx"), "utf-8");
    expect(layout).toContain("MotionProvider");
    expect(layout).toContain("MotionGraphicsCanvas");
  });
});
