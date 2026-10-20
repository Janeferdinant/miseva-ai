# CulinaryVerse AI — The World's Intelligent Cooking Agent

> **Academic Supervision:**  
> **Jane Rose**  
> **Assistant Professor, CSE**  
> *“CulinaryVerse AI — Discover cuisines, learn techniques, and cook with confidence.”*

---

## 🌟 Overview

**CulinaryVerse AI** is an intelligent, autonomous culinary companion combining traditional Indian regional culinary heritages across all **28 states and 8 Union Territories**, celebrated international cuisines, real-time AI cooking guidance, synchronized **Malayalam and English voice narration**, an animated **Liquid-Glass design system** with 6 coordinated palettes, and live **Indian grocery price comparisons** across 6 major retail platforms (Amazon Fresh, Flipkart Grocery, Swiggy Instamart, Blinkit, Zepto, and BigBasket).

The platform bridges culinary science, cultural gastronomy preservation, and modern web engineering into an educational and practical cooking companion.

---

## ✨ Key Capabilities & System Features

### 1. Liquid-Glass Design System (6 Themes & Light/Dark Mode)
- **Layered Depth & Translucency:** Built with frosted glass cards (`backdrop-blur-xl`), subtle translucent specular borders, and soft glowing ambient accents.
- **6 Coordinated Palettes:**
  1. **Emerald Kitchen** — Fresh coastal green, warm cream, and subtle gold accents.
  2. **Saffron & Spice** — Warm saffron, terracotta, and aromatic spice warmth.
  3. **Ocean Mist** — Teal, aqua, and translucent coastal blue.
  4. **Midnight Gourmet** — Deep navy, burgundy, and iridescent dark glass luxury.
  5. **Rose Quartz** — Blush, pearl, and delicate confectionery elegance.
  6. **Ivory Luxury** — Champagne, ivory, and imperial golden royalty.
- Fully responsive across mobile, tablet, and desktop with persistent user theme preferences in `localStorage`.

### 2. Comprehensive Indian Regional & Global Recipe Database
- **Scalable Taxonomy:** Authentically covers all culinary regions:
  - **South India:** Kerala (Traditional Sadya Avial, Malabar Thalassery Biryani, Palappam & Coconut Stew), Tamil Nadu (Chettinad Pepper Chicken), Karnataka (Bisi Bele Bath, Neer Dosa), Andhra & Telangana (Hyderabadi Kachchi Gosht Dum Biryani).
  - **North India:** Punjab (Sarson Da Saag & Makki Di Roti), Kashmir (Rogan Josh, Kahwa), Uttar Pradesh (Awadhi Dum), Delhi (Chole Bhature).
  - **West India:** Gujarat (Khaman Dhokla, Undhiyu), Maharashtra (Kolhapuri Misal Pav, Puran Poli), Goa (Goan Fish Curry), Rajasthan (Dal Baati Churma).
  - **East & Northeast:** West Bengal (Kosha Mangsho, Shorshe Ilish), Odisha (Chhena Poda, Dalma), Assam & Northeast (Masor Tenga, Smoked Bamboo Stew).
  - **Global Cuisines:** Italian (Risotto ai Funghi Porcini), Japanese (Handcrafted Umami Ramen), Mexican (Birria Quesatacos with Dipping Consommé), Thai (Tom Yum Goong), French (Ratatouille Niçoise), Middle Eastern (Shakshuka with Feta).
- Every recipe includes bilingual titles, descriptions, step-by-step instructions in **English and Malayalam (മലയാളം ലിപി)**, nutritional facts, allergen warnings, food safety storage guidance, equipment lists, and cultural citations.

### 3. Dynamic Serving Scaler & Culinary Math
- Scalable from 1 to 8+ servings with real-time recalculation of all ingredient quantities.
- Formats quantities into clean culinary fractions (e.g., `1/2`, `1/4`, `1 1/2`) without floating-point precision glitches.

### 4. Bilingual Audio Narration & Hands-Free Cooking Studio
- **Web Speech API Integration:** Reads each cooking step aloud in English or Malayalam (`ml-IN`).
- **Karaoke Step Highlighting:** Synchronized text highlighting keeps the cook oriented while following audio instructions.
- **Hands-Free Voice Recognition:** Cooks with wet or messy hands can activate the hands-free studio and speak commands:
  - *“Next step”* / *“Adutha step”*
  - *“Previous step”* / *“Munpathe step”*
  - *“Repeat”* / *“Veendum parayuka”*
  - *“Start timer”* / *“Timer thudanguka”*
- **Built-in Step Timers:** Interactive countdown rings with auditory alerts upon completion.

### 5. Live Indian Grocery Price Comparison Engine
- Compares real product listings across **6 major grocery retailers in India**:
  - **Amazon Fresh India**
  - **Flipkart Grocery**
  - **Swiggy Instamart**
  - **Blinkit**
  - **Zepto**
  - **BigBasket / BBnow**
- **Dual Cost Intelligence:**
  - **Recipe Consumption Cost:** Exact cost attributable to the consumed servings.
  - **Checkout Cost:** Real-world expenditure required to purchase minimum retail pack sizes.
- **Normalized Rates:** Price per kg / per litre calculations.
- **Voluntary PIN Code Checker:** Tests hyperlocal availability across Indian metro and tier-1/tier-2 pincodes (e.g. 682001 Kochi, 560001 Bangalore, 110001 Delhi).
- Direct retailer search links for one-click purchasing without fabricated transactions.

### 6. Interactive AI Chef Studio & Pantry Matcher
- **Culinary RAG Engine:** Answers cooking chemistry questions (e.g., why raw coconut oil is finished off heat, risotto mantecatura starch emulsification, why spices are bloomed in hot oil).
- **Ingredient Substitution Matrix:** Suggests verified alternatives (e.g., raw green mango for sour curd in vegan Avial, star anise for kalpasi).
- **Interactive Pantry Assistant:** Select ingredients available in your kitchen, and the system ranks matched dishes with match percentages and missing ingredient lists.

### 7. 7-Day Smart Meal Planner & Budget Calculator
- Weekly calendar (Monday through Sunday) with 4 slots per day (Breakfast, Lunch, Dinner, Snack).
- Real-time weekly rollup of total calories, protein, carbs, fat, and estimated grocery budget.
- Consolidated shopping cart merging duplicate ingredients across planned meals.
- Leftover reuse suggestions (e.g., leftover rice to lemon/curd rice).

### 8. Food Safety & Allergen Layer
- Authoritative safe internal cooking temperatures (e.g. 74°C / 165°F for poultry/mutton).
- Allergen tags (dairy, gluten, shellfish, mustard, sesame, tree nuts).
- Safe refrigeration and reheating durations.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **Language:** TypeScript 5.7+ in strict mode
- **Styling:** Vanilla CSS design tokens + [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest 5.0](https://vitest.dev/)
- **Speech & Audio:** Web Speech API (`SpeechSynthesis`, `SpeechRecognition`)
- **Deployment Target:** [Vercel](https://vercel.com/)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js `v20.x` or `v24.x`
- npm `v10.x` or `v11.x`

### 1. Clone & Install
```bash
git clone https://github.com/Janeferdinant/culinaryverse-ai.git
cd culinaryverse-ai
npm install
```

### 2. Run Test Suite
```bash
npm test
```
All 24 automated unit tests for recipe scaling, liquid-glass theme tokens, pricing math, speech engine, AI chef reasoning, and meal planning will run and pass.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 Automated Testing Verification

The codebase includes comprehensive unit tests verifying core algorithms and contracts:
- `tests/theme.test.ts`: Verifies all 6 liquid-glass theme tokens, color hex codes, and light/dark modes.
- `tests/recipes.test.ts`: Validates complete recipe schema, bilingual instructions, and serving scaler fractions.
- `tests/pricing.test.ts`: Verifies consumption cost vs. checkout pack cost, normalized rates per kg, and retailer URL templates.
- `tests/speech.test.ts`: Validates Malayalam and English language configs and voice command parsing.
- `tests/ai-agent.test.ts`: Tests RAG culinary technique reasoning, pantry matching, and authentic ingredient substitutions.
- `tests/meal-planner.test.ts`: Tests 7-day schedule slot assignments and weekly budget/nutritional rollups.

Run test command:
```bash
npm test
```
Result: **6 test suites passed, 24 tests passed.**

---

## 🌐 Production Deployment

The project is structured for zero-config Vercel deployment:
```bash
npx vercel --prod
```

---

## 📄 Academic Attribution & Licensing

Supervised by **Jane Rose**, Assistant Professor, Department of Computer Science & Engineering.  
Designed for educational, computational gastronomy research, and cultural culinary heritage preservation. All recipes, cultural references, and retailer comparisons adhere to ethical, non-commercial attribution guidelines.
