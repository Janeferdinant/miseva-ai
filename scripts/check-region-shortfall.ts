import { getAllRegions } from "../lib/data/cuisines";
import { RECIPES } from "../lib/data/recipes";

const regions = getAllRegions();

console.log("=== GEOGRAPHIC COVERAGE AUDIT (CURRENT STATE) ===");
const report = [];

for (const reg of regions) {
  // Find matching recipes
  const matches = RECIPES.filter((r) => {
    const rCuisine = (r.cuisine || "").toLowerCase().replace(/[-&]/g, " ").trim();
    const rState = (r.stateOrCountry || "").toLowerCase().replace(/[-&]/g, " ").trim();
    const regId = reg.id.toLowerCase().replace(/[-&]/g, " ").trim();
    const regName = reg.name.toLowerCase().replace(/[-&]/g, " ").trim();

    return (
      rCuisine === regId ||
      rCuisine === regName ||
      rState === regId ||
      rState === regName ||
      rCuisine.includes(regId) ||
      regId.includes(rCuisine) ||
      rState.includes(regName) ||
      regName.includes(rState)
    );
  });

  const count = matches.length;
  const shortfall = Math.max(0, 5 - count);

  report.push({
    id: reg.id,
    name: reg.name,
    category: reg.category,
    currentCount: count,
    shortfall,
    status: count >= 5 ? "COMPLETE" : count === 0 ? "ZERO" : "BELOW_MINIMUM",
    dishes: matches.map((m) => m.title),
  });
}

console.table(report.map(r => ({
  Region: r.name,
  Category: r.category,
  Count: r.currentCount,
  Shortfall: r.shortfall,
  Status: r.status
})));

const totalShortfall = report.reduce((sum, r) => sum + r.shortfall, 0);
console.log(`\nTotal Regions: ${report.length}`);
console.log(`Complete Regions (>= 5): ${report.filter(r => r.status === 'COMPLETE').length}`);
console.log(`Below Minimum (< 5): ${report.filter(r => r.status !== 'COMPLETE').length}`);
console.log(`Zero Recipes: ${report.filter(r => r.currentCount === 0).length}`);
console.log(`Total Recipes Needed to Reach Minimum of 5 per Region: ${totalShortfall}`);
