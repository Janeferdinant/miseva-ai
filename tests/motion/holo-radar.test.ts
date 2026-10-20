import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Holographic Culinary Radar HUD & Web Audio Synthesizer", () => {
  it("provides sci-fi audio synthesizer in lib/audio/sci-fi-audio.ts", () => {
    const audioPath = path.resolve(process.cwd(), "lib/audio/sci-fi-audio.ts");
    expect(fs.existsSync(audioPath)).toBe(true);
    const code = fs.readFileSync(audioPath, "utf-8");
    expect(code).toContain("playSciFiChirp");
    expect(code).toContain("playRadarPing");
    expect(code).toContain("AudioContext");
  });

  it("provides HoloCulinaryRadar component with telemetry metrics", () => {
    const radarPath = path.resolve(process.cwd(), "components/motion/HoloCulinaryRadar.tsx");
    expect(fs.existsSync(radarPath)).toBe(true);
    const code = fs.readFileSync(radarPath, "utf-8");
    expect(code).toContain("HoloCulinaryRadar");
    expect(code).toContain("animate-radar-sweep");
    expect(code).toContain("cyber-hud-bracket");
    expect(code).toContain("Umami");
    expect(code).toContain("Spice");
  });

  it("integrates HoloCulinaryRadar into app/page.tsx hero section", () => {
    const homePath = path.resolve(process.cwd(), "app/page.tsx");
    const code = fs.readFileSync(homePath, "utf-8");
    expect(code).toContain("HoloCulinaryRadar");
  });
});
