import { getAllRegions, getRegionBySlug } from "@/lib/data/cuisines";
import { RECIPES } from "@/lib/data/recipes";

export const CONTINENT_MAP: Record<string, string> = {
  // Indian Regions -> South Asia (India)
  kerala: "South Asia",
  "tamil-nadu": "South Asia",
  karnataka: "South Asia",
  "andhra-telangana": "South Asia",
  punjab: "South Asia",
  rajasthan: "South Asia",
  kashmir: "South Asia",
  delhi: "South Asia",
  "uttar-pradesh": "South Asia",
  maharashtra: "South Asia",
  gujarat: "South Asia",
  goa: "South Asia",
  "west-bengal": "South Asia",
  odisha: "South Asia",
  "assam-northeast": "South Asia",
  // Global Regions
  italy: "Europe",
  japan: "East Asia",
  mexico: "Americas",
  thailand: "Southeast Asia",
  "middle-east": "Middle East & Levant",
  france: "Europe",
  china: "East Asia",
  korea: "East Asia",
};

export const CONTINENT_NAMES = [
  "All Continents",
  "South Asia",
  "East Asia",
  "Southeast Asia",
  "Europe",
  "Americas",
  "Middle East & Levant",
] as const;

export function getContinentForRegion(regionId: string): string {
  return CONTINENT_MAP[regionId] || "Global";
}

export function countVerifiedRecipesForRegion(regionId: string): number {
  const reg = getRegionBySlug(regionId);
  if (!reg) return 0;
  const regName = reg.name.toLowerCase();
  const regIdLower = reg.id.toLowerCase();

  return RECIPES.filter((r) => {
    return (
      r.stateOrCountry.toLowerCase().includes(regName) ||
      regName.includes(r.stateOrCountry.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(regIdLower) ||
      r.cuisine.toLowerCase().includes(regName)
    );
  }).length;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export function generateCuisineBreadcrumb(
  regionId: string,
  category?: string,
  dishTitle?: string
): BreadcrumbItem[] {
  const continent = getContinentForRegion(regionId);
  const reg = getRegionBySlug(regionId);
  const crumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Explore Cuisines", href: "/explore" },
    { label: continent, href: `/explore?continent=${encodeURIComponent(continent)}` },
  ];

  if (reg) {
    crumbs.push({
      label: reg.name,
      href: `/explore/${reg.id}`,
      isCurrent: !category && !dishTitle,
    });
  }

  if (category) {
    crumbs.push({
      label: category,
      href: `/explore/${regionId}?category=${encodeURIComponent(category)}`,
      isCurrent: !dishTitle,
    });
  }

  if (dishTitle) {
    crumbs.push({
      label: dishTitle,
      href: "#",
      isCurrent: true,
    });
  }

  return crumbs;
}
