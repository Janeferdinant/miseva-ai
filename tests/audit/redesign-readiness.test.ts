import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Website Redesign Audit Documentation", () => {
  it("should have a comprehensive audit report document", () => {
    const auditPath = path.resolve(process.cwd(), "docs/audit/website-redesign-audit.md");
    expect(fs.existsSync(auditPath)).toBe(true);
    const content = fs.readFileSync(auditPath, "utf-8");
    expect(content).toContain("Cookpad");
    expect(content).toContain("Kitchen Stories");
    expect(content).toContain("BBC Good Food");
    expect(content).toContain("Ingredient Finder");
    expect(content).toContain("Cooking Mode");
  });
});
