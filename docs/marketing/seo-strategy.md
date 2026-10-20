# Miseva AI — Website Search Engine Optimization (SEO) Strategy

> **Domain Target:** `https://miseva.ai`  
> **Brand:** Miseva AI (*Your World. Your Kitchen. Your AI Chef.*)  
> **Effective:** October 2026

---

## 1. High-Intent Keyword Clusters

| Cluster Name | Target Keywords | Search Intent | Target URL |
| :--- | :--- | :--- | :--- |
| **Brand & AI Assistant** | "Miseva AI", "Miseva cooking app", "AI chef assistant", "hands-free cooking app" | Navigational / Commercial | `/`, `/about`, `/app` |
| **Malayalam Culinary** | "Malayalam cooking recipes", "Malayalam voice recipe app", "authentic Kerala Sadya guide", "Avial recipe Malayalam" | Informational / Transactional | `/explore?region=kerala`, `/recipes` |
| **Table Styling & Dining** | "Table styling ideas", "banana leaf Sadya arrangement", "festive Indian tablescaping", "dinner party table decor" | Inspiration / Commercial | `/table-styling` |
| **Confectionery & Drinks** | "Traditional Payasam recipes", "Palada pradhaman without sugar burn", "healthy detox juices", "mocktails at home" | Informational | `/desserts`, `/beverages` |
| **Smart Grocery Savings** | "Indian grocery price comparison", "Swiggy Instamart vs Blinkit price", "budget meal planning India" | High Commercial Intent | `/shopping`, `/meal-planner` |

---

## 2. Schema.org JSON-LD Structured Data

### A. Organization & WebSite Schema (Injected on Homepage)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://miseva.ai/#organization",
      "name": "Miseva AI",
      "url": "https://miseva.ai",
      "logo": "https://miseva.ai/brand/logo.svg",
      "description": "Your World. Your Kitchen. Your AI Chef. Multilingual culinary intelligence platform.",
      "founder": {
        "@type": "Person",
        "name": "Jane Rose",
        "jobTitle": "Assistant Professor, CSE"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Miseva AI",
      "operatingSystem": "Android, Web",
      "applicationCategory": "LifestyleApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    }
  ]
}
```

### B. Recipe Schema Template (`/recipes/[id]`)
Every recipe page includes valid `Recipe` structured data with:
- `name` & `name:ml`
- `image`
- `cookTime` (ISO 8601, e.g. `PT30M`)
- `prepTime`
- `recipeYield`
- `recipeIngredient`
- `recipeInstructions` with `HowToStep`
- `nutrition` (calories, dietary classification)

---

## 3. Robots.txt & XML Sitemap Configuration
- **Sitemap Location:** `https://miseva.ai/sitemap.xml`
- **Indexing Directives:**
  - Index all catalog routes (`/recipes`, `/explore`, `/desserts`, `/beverages`, `/table-styling`, `/about`, `/app`).
  - Disallow admin or private token endpoints.
