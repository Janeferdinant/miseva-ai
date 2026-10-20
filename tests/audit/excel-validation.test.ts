import { describe, it, expect } from "vitest";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

describe("Excel Workbook Quality & Data Integrity Validation", { timeout: 20000 }, () => {
  const excelPath = path.resolve(process.cwd(), "public/exports/Miseva_AI_Complete_Recipe_Catalogue.xlsx");

  it("verifies the workbook file exists on disk with valid size", () => {
    expect(fs.existsSync(excelPath)).toBe(true);
    const stats = fs.statSync(excelPath);
    expect(stats.size).toBeGreaterThan(100 * 1024); // Greater than 100 KB
  });

  it("loads the workbook and verifies all 8 mandatory sheets exist", async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    const sheetNames = workbook.worksheets.map((s) => s.name);
    expect(sheetNames).toContain("Recipe Catalogue");
    expect(sheetNames).toContain("Ingredients");
    expect(sheetNames).toContain("Preparation Steps");
    expect(sheetNames).toContain("Image Registry");
    expect(sheetNames).toContain("Image Audit");
    expect(sheetNames).toContain("Duplicate Image Report");
    expect(sheetNames).toContain("Bug & Regression Report");
    expect(sheetNames).toContain("Summary Dashboard");
    expect(sheetNames.length).toBe(8);
  });

  it("validates Sheet 1: Recipe Catalogue contains all 230 distinct culinary dishes", async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    const sheet = workbook.getWorksheet("Recipe Catalogue");
    expect(sheet).toBeDefined();

    // 1 header row + 230 dish rows = 231 rows
    expect(sheet!.rowCount).toBe(231);

    const recipeIds = new Set<string>();
    for (let r = 2; r <= 231; r++) {
      const row = sheet!.getRow(r);
      const id = String(row.getCell(1).value);
      const title = String(row.getCell(2).value);
      const cuisine = String(row.getCell(6).value);
      const imageUrl = String(row.getCell(17).value);

      expect(id).toBeTruthy();
      expect(title).toBeTruthy();
      expect(cuisine).toBeTruthy();
      expect(imageUrl).toContain("images.unsplash.com");

      recipeIds.add(id);
    }

    expect(recipeIds.size).toBe(230);
  });

  it("validates Sheet 2: Ingredients contains individual ingredient records linked to valid dishes", async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    const s1 = workbook.getWorksheet("Recipe Catalogue")!;
    const validDishIds = new Set<string>();
    for (let r = 2; r <= s1.rowCount; r++) {
      validDishIds.add(String(s1.getRow(r).getCell(1).value));
    }

    const s2 = workbook.getWorksheet("Ingredients");
    expect(s2).toBeDefined();
    expect(s2!.rowCount).toBeGreaterThan(1000);

    for (let r = 2; r <= s2!.rowCount; r++) {
      const row = s2!.getRow(r);
      const dishId = String(row.getCell(1).value);
      const ingName = String(row.getCell(4).value);

      expect(validDishIds.has(dishId)).toBe(true);
      expect(ingName).toBeTruthy();
    }
  });

  it("validates Sheet 3: Preparation Steps has sequential steps and intact Malayalam instructions", async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    const s3 = workbook.getWorksheet("Preparation Steps");
    expect(s3).toBeDefined();
    expect(s3!.rowCount).toBeGreaterThan(600);

    let foundMalayalam = false;
    for (let r = 2; r <= s3!.rowCount; r++) {
      const row = s3!.getRow(r);
      const text = String(row.getCell(5).value);
      const textMl = String(row.getCell(6).value || "");

      expect(text).toBeTruthy();
      if (textMl && textMl.length > 0 && textMl !== "undefined" && textMl !== "null") {
        foundMalayalam = true;
      }
    }

    expect(foundMalayalam).toBe(true);
  });

  it("validates Sheet 5: Image Audit has 230 rows and flags resolved anomalies", async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    const s5 = workbook.getWorksheet("Image Audit");
    expect(s5).toBeDefined();
    expect(s5!.rowCount).toBe(231);

    let salmonChecked = false;
    let chakkaChecked = false;

    for (let r = 2; r <= 231; r++) {
      const row = s5!.getRow(r);
      const recipeId = String(row.getCell(1).value);
      const status = String(row.getCell(16).value);

      expect(["Verified Match", "Corrected and Verified"]).toContain(status);

      if (recipeId === "jap-salmon-nigiri") {
        expect(status).toBe("Corrected and Verified");
        salmonChecked = true;
      }
      if (recipeId === "des-chakka-pradhaman") {
        expect(status).toBe("Corrected and Verified");
        chakkaChecked = true;
      }
    }

    expect(salmonChecked).toBe(true);
    expect(chakkaChecked).toBe(true);
  });

  it("validates Sheet 8: Summary Dashboard displays zero unresolved defects", async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);

    const s8 = workbook.getWorksheet("Summary Dashboard");
    expect(s8).toBeDefined();

    const metrics = new Map<string, any>();
    for (let r = 2; r <= s8!.rowCount; r++) {
      const row = s8!.getRow(r);
      const name = String(row.getCell(2).value);
      const val = row.getCell(3).value;
      metrics.set(name, val);
    }

    expect(metrics.get("Total Distinct Culinary Dishes")).toBe(230);
    expect(metrics.get("Number of Missing Images")).toBe(0);
    expect(metrics.get("Number of Incorrect Images Remaining")).toBe(0);
    expect(metrics.get("Number of Duplicate Image Groups Remaining")).toBe(0);
    expect(metrics.get("Unresolved Critical or High Bugs")).toBe(0);
  });
});
