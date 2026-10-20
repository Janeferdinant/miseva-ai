import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RECIPES } from '../lib/data/recipes';
import { DESSERT_RECIPES } from '../lib/data/desserts';
import { BEVERAGE_RECIPES } from '../lib/data/beverages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_EXPORTS_DIR = path.join(ROOT_DIR, 'public', 'exports');

if (!fs.existsSync(PUBLIC_EXPORTS_DIR)) {
  fs.mkdirSync(PUBLIC_EXPORTS_DIR, { recursive: true });
}

// RFC 4180 CSV Escaping Helper
function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

function generateCsv(headers: string[], rows: any[][]): string {
  const headerLine = headers.map(escapeCsv).join(',');
  const rowLines = rows.map((row) => row.map(escapeCsv).join(','));
  return [headerLine, ...rowLines].join('\r\n');
}

// 1. Export Main Recipes (140)
const mainRecipeHeaders = [
  'ID',
  'Title',
  'Title_Malayalam',
  'Transliteration',
  'Cuisine',
  'Category',
  'PrepTime_Min',
  'CookTime_Min',
  'Servings',
  'Difficulty',
  'Calories_kcal',
  'Cost_Per_Serving_INR',
  'Dietary_Tags',
  'Description',
  'Key_Ingredients_Summary',
  'Ingredients_Count',
  'Instructions_Count',
  'Image_URL',
];

const mainRecipeRows = RECIPES.map((r) => [
  r.id,
  r.title,
  r.titleMalayalam,
  r.transliteration || '',
  r.cuisine,
  r.mealType,
  r.prepTime,
  r.cookTime,
  r.servings,
  r.difficulty,
  r.nutrition?.calories || '',
  '',
  (r.dietary || []).join('; '),
  r.description,
  (r.ingredients || []).map((i) => `${i.amount} ${i.unit} ${i.name}`).join('; '),
  r.ingredients?.length || 0,
  r.instructions?.length || 0,
  r.imageUrl,
]);

fs.writeFileSync(
  path.join(PUBLIC_EXPORTS_DIR, 'miseva_recipes_master.csv'),
  generateCsv(mainRecipeHeaders, mainRecipeRows),
  'utf-8'
);

// 2. Export Desserts (40)
const dessertHeaders = [
  'ID',
  'Slug',
  'Title',
  'Title_Malayalam',
  'Transliteration',
  'Subcategory',
  'Cuisine',
  'PrepTime_Min',
  'CookTime_Min',
  'Servings',
  'Difficulty',
  'Calories_kcal',
  'Cost_Per_Serving_INR',
  'Dietary_Tags',
  'Tagline',
  'Description',
  'Doneness_Indicators',
  'Ingredients_Summary',
  'Image_URL',
];

const dessertRows = DESSERT_RECIPES.map((d) => [
  d.id,
  d.slug,
  d.title,
  d.titleMalayalam,
  d.transliteration || '',
  d.subcategory,
  d.cuisine,
  d.prepTime,
  d.cookTime,
  d.servings,
  d.difficulty,
  d.nutrition?.calories || '',
  d.costPerServing || '',
  (d.dietary || []).join('; '),
  d.tagline || '',
  d.description,
  (d.donenessIndicators || []).join('; '),
  (d.ingredients || []).map((i) => `${i.amount} ${i.unit} ${i.name}`).join('; '),
  d.imageUrl,
]);

fs.writeFileSync(
  path.join(PUBLIC_EXPORTS_DIR, 'miseva_desserts_master.csv'),
  generateCsv(dessertHeaders, dessertRows),
  'utf-8'
);

// 3. Export Beverages (50)
const beverageHeaders = [
  'ID',
  'Slug',
  'Title',
  'Title_Malayalam',
  'Transliteration',
  'Subcategory',
  'Cuisine',
  'PrepTime_Min',
  'Servings',
  'Difficulty',
  'Calories_kcal',
  'Cost_Per_Serving_INR',
  'Is_Hot',
  'Sweetness_Adjustable',
  'Dietary_Tags',
  'Tagline',
  'Description',
  'Ingredients_Summary',
  'Image_URL',
];

const beverageRows = BEVERAGE_RECIPES.map((b) => [
  b.id,
  b.slug,
  b.title,
  b.titleMalayalam,
  b.transliteration || '',
  b.subcategory,
  b.cuisine,
  b.prepTime,
  b.servings,
  b.difficulty,
  b.nutrition?.calories || '',
  b.costPerServing || '',
  b.isHot ? 'Yes' : 'No',
  b.sweetnessAdjustmentSupported ? 'Yes' : 'No',
  (b.dietary || []).join('; '),
  b.tagline || '',
  b.description,
  (b.ingredients || []).map((i) => `${i.amount} ${i.unit} ${i.name}`).join('; '),
  b.imageUrl,
]);

fs.writeFileSync(
  path.join(PUBLIC_EXPORTS_DIR, 'miseva_beverages_master.csv'),
  generateCsv(beverageHeaders, beverageRows),
  'utf-8'
);

// 4. Combined Complete Database (230 records)
const combinedHeaders = [
  'Database_Type',
  'ID',
  'Title',
  'Title_Malayalam',
  'Cuisine',
  'Category_or_Subcategory',
  'PrepTime_Min',
  'CookTime_Min',
  'Servings',
  'Difficulty',
  'Calories_kcal',
  'Cost_INR',
  'Description',
  'Dietary_Tags',
  'Ingredients_Count',
  'Image_URL',
];

const combinedRows = [
  ...RECIPES.map((r) => [
    'Main Recipe',
    r.id,
    r.title,
    r.titleMalayalam,
    r.cuisine,
    r.mealType,
    r.prepTime,
    r.cookTime,
    r.servings,
    r.difficulty,
    r.nutrition?.calories || '',
    '',
    r.description,
    (r.dietary || []).join('; '),
    r.ingredients?.length || 0,
    r.imageUrl,
  ]),
  ...DESSERT_RECIPES.map((d) => [
    'Dessert',
    d.id,
    d.title,
    d.titleMalayalam,
    d.cuisine,
    d.subcategory,
    d.prepTime,
    d.cookTime,
    d.servings,
    d.difficulty,
    d.nutrition?.calories || '',
    d.costPerServing || '',
    d.description,
    (d.dietary || []).join('; '),
    d.ingredients?.length || 0,
    d.imageUrl,
  ]),
  ...BEVERAGE_RECIPES.map((b) => [
    'Beverage',
    b.id,
    b.title,
    b.titleMalayalam,
    b.cuisine,
    b.subcategory,
    b.prepTime,
    0,
    b.servings,
    b.difficulty,
    b.nutrition?.calories || '',
    b.costPerServing || '',
    b.description,
    (b.dietary || []).join('; '),
    b.ingredients?.length || 0,
    b.imageUrl,
  ]),
];

fs.writeFileSync(
  path.join(PUBLIC_EXPORTS_DIR, 'miseva_complete_culinary_database.csv'),
  generateCsv(combinedHeaders, combinedRows),
  'utf-8'
);

// 5. Build Gemini & Imagen Image Generation Prompt Records (All 230 recipes)
export interface GeminiPromptRecord {
  record_id: string;
  collection: 'Main Recipe' | 'Dessert' | 'Beverage';
  title: string;
  title_malayalam: string;
  cuisine: string;
  dish_type: string;
  crockery_and_plating: string;
  textures_and_garnishes: string;
  lighting_and_atmosphere: string;
  gemini_image_prompt: string;
  recommended_aspect_ratio: '4:3' | '16:9' | '1:1';
}

function buildGeminiPrompt(
  title: string,
  cuisine: string,
  type: string = '',
  desc: string = '',
  ingredients: string[] = []
): { crockery: string; textures: string; lighting: string; prompt: string } {
  const safeType = (type || '').toLowerCase();
  let crockery = 'Authentic ceramic stoneware on a matte textured surface';
  if (cuisine === 'Kerala') {
    crockery = 'Traditional unglazed heavy bronze Uruli or clay Chatti over a woven Kasavu linen runner';
  } else if (cuisine === 'Tamil Nadu' || cuisine === 'South Indian') {
    crockery = 'Traditional banana leaf lining inside a heavy bell-metal or brass thali';
  } else if (cuisine === 'Italian') {
    crockery = 'Rustic handmade Italian glazed ceramic plate on Tuscan dark slate';
  } else if (cuisine === 'Japanese') {
    crockery = 'Handcrafted wabi-sabi ceramic bowl on natural dark hinoki wood';
  } else if (cuisine === 'Mexican') {
    crockery = 'Terracotta cazuela with artisanal Talavera ceramic accents';
  } else if (safeType.includes('juice') || safeType.includes('beverage') || safeType.includes('drink')) {
    crockery = 'Tall ribbed crystal highball glass with condensation droplets and natural bamboo coaster';
  }

  const textures = `Fresh vibrant garnishes of ${ingredients.slice(0, 4).join(', ')}, visible food steam, glistening rich sauces, and delicate micro-textures.`;
  const lighting = 'Cinematic 45-degree warm directional golden hour sunlight, soft fill reflection, gentle bokeh, shot on 85mm f/2.8 macro lens with liquid-glass aesthetic.';
  
  const prompt = `A breathtaking, award-winning editorial food photograph of ${title} (${cuisine} cuisine). Served in ${crockery}. ${desc} Rich authentic visual details: ${textures} Atmosphere: ${lighting} Photorealistic, hyper-detailed food textures, natural colors, zero artificial bloom, cinematic culinary presentation.`;

  return { crockery, textures, lighting, prompt };
}

const geminiPromptRecords: GeminiPromptRecord[] = [];

// Main Recipes
for (const r of RECIPES) {
  const ingNames = (r.ingredients || []).map((i) => i.name);
  const { crockery, textures, lighting, prompt } = buildGeminiPrompt(
    r.title,
    r.cuisine,
    r.mealType,
    r.description,
    ingNames
  );
  geminiPromptRecords.push({
    record_id: r.id,
    collection: 'Main Recipe',
    title: r.title,
    title_malayalam: r.titleMalayalam,
    cuisine: r.cuisine,
    dish_type: r.mealType,
    crockery_and_plating: crockery,
    textures_and_garnishes: textures,
    lighting_and_atmosphere: lighting,
    gemini_image_prompt: prompt,
    recommended_aspect_ratio: '4:3',
  });
}

// Desserts
for (const d of DESSERT_RECIPES) {
  const ingNames = (d.ingredients || []).map((i) => i.name);
  const { crockery, textures, lighting, prompt } = buildGeminiPrompt(
    d.title,
    d.cuisine,
    d.subcategory,
    d.description,
    ingNames
  );
  geminiPromptRecords.push({
    record_id: d.id,
    collection: 'Dessert',
    title: d.title,
    title_malayalam: d.titleMalayalam,
    cuisine: d.cuisine,
    dish_type: d.subcategory,
    crockery_and_plating: crockery,
    textures_and_garnishes: textures,
    lighting_and_atmosphere: lighting,
    gemini_image_prompt: prompt,
    recommended_aspect_ratio: '4:3',
  });
}

// Beverages
for (const b of BEVERAGE_RECIPES) {
  const ingNames = (b.ingredients || []).map((i) => i.name);
  const { crockery, textures, lighting, prompt } = buildGeminiPrompt(
    b.title,
    b.cuisine,
    b.subcategory,
    b.description,
    ingNames
  );
  geminiPromptRecords.push({
    record_id: b.id,
    collection: 'Beverage',
    title: b.title,
    title_malayalam: b.titleMalayalam,
    cuisine: b.cuisine,
    dish_type: b.subcategory,
    crockery_and_plating: crockery,
    textures_and_garnishes: textures,
    lighting_and_atmosphere: lighting,
    gemini_image_prompt: prompt,
    recommended_aspect_ratio: '4:3',
  });
}

// Save Gemini JSON export
fs.writeFileSync(
  path.join(PUBLIC_EXPORTS_DIR, 'gemini_recipe_image_prompts.json'),
  JSON.stringify(geminiPromptRecords, null, 2),
  'utf-8'
);

// Save Gemini CSV export
const geminiCsvHeaders = [
  'Record_ID',
  'Collection',
  'Title',
  'Title_Malayalam',
  'Cuisine',
  'Dish_Type',
  'Crockery_and_Plating',
  'Textures_and_Garnishes',
  'Lighting_and_Atmosphere',
  'Gemini_Ready_Prompt',
  'Recommended_Aspect_Ratio',
];

const geminiCsvRows = geminiPromptRecords.map((gp) => [
  gp.record_id,
  gp.collection,
  gp.title,
  gp.title_malayalam,
  gp.cuisine,
  gp.dish_type,
  gp.crockery_and_plating,
  gp.textures_and_garnishes,
  gp.lighting_and_atmosphere,
  gp.gemini_image_prompt,
  gp.recommended_aspect_ratio,
]);

fs.writeFileSync(
  path.join(PUBLIC_EXPORTS_DIR, 'gemini_recipe_image_prompts.csv'),
  generateCsv(geminiCsvHeaders, geminiCsvRows),
  'utf-8'
);

console.log('========================================================');
console.log('✅ RECIPE DATABASE EXPORT GENERATION COMPLETE');
console.log(`Exported Main Recipes: ${RECIPES.length}`);
console.log(`Exported Desserts: ${DESSERT_RECIPES.length}`);
console.log(`Exported Beverages: ${BEVERAGE_RECIPES.length}`);
console.log(`Total Combined Records: ${combinedRows.length}`);
console.log(`Total Gemini Prompt Records: ${geminiPromptRecords.length}`);
console.log(`Generated files in: ${PUBLIC_EXPORTS_DIR}`);
console.log('========================================================');
