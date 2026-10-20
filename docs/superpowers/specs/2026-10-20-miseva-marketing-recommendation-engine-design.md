# MISEVA AI — AUTONOMOUS MARKETING, SOCIAL PUBLISHING & PERSONALISATION PLATFORM
## System Architecture & Technical Design Specification

### 1. Strategic Intent & Non-Demographic Foundation
Miseva AI shifts its marketing and recommendation architecture fundamentally toward **user intent and job-to-be-done** (e.g. what can I cook with ingredients on hand, budget-friendly meal preparation, regional Kerala/Malayalam heritage, luxury dining and table styling, effortless entertaining). 
- **Core Directive:** Never make assumptions about age or gender the default targeting strategy.
- **Fairness & Privacy:** Interest-based, contextual, and consented behavioral signals only.
- **Anonymous Fallback:** First-time or anonymous visitors receive purely contextual recommendations based on current page or recipe intent without profile tracking or fingerprinting.

---

### 2. Configurable Audience Segments (A through I)
1. **Segment A: Ingredient-Based Recipe Seekers**
   - *Intent:* Solve immediate "What can I cook with these ingredients?" problem.
   - *Key Channels:* Search ads, Instagram Reels, YouTube Shorts, SEO recipe pages.
   - *Hook Focus:* "3 dinners from ingredients already in your fridge."
2. **Segment B: Kerala & Malayalam Cooking**
   - *Intent:* Regional authenticity, Malayalam voice guidance, traditional Kerala dishes.
   - *Key Channels:* Malayalam food creators, Instagram Reels, YouTube Shorts, WhatsApp opt-in.
   - *Hook Focus:* Natural Malayalam cooking guidance, authentic spices, Sadhya & seafood recipes.
3. **Segment C: Budget-Conscious Meal Planners**
   - *Intent:* Smart grocery shopping, batch cooking, cost-per-serving optimization.
   - *Key Channels:* Search, YouTube, Pinterest Infographics, Blog guides.
   - *Hook Focus:* Weekly meal prep under ₹1,500, zero food waste.
4. **Segment D: Students & Busy Professionals**
   - *Intent:* 15-minute meals, minimal cleanup, microwave/one-pot cooking.
   - *Key Channels:* Instagram Reels, Shorts, Quick Recipe cards.
   - *Hook Focus:* Nutritious, quick meals when exhausted after work.
5. **Segment E: Families & Household Meal Organisers**
   - *Intent:* Pleasing diverse household palates, balanced nutrition, coordinated meals.
   - *Key Channels:* Pinterest boards, YouTube long-form, Facebook community.
   - *Hook Focus:* Coordinated dinners where kids and adults both enjoy.
6. **Segment F: Dessert, Juice & Baking Enthusiasts**
   - *Intent:* Artisanal confectionery, tropical fresh juices, weekend baking indulgence.
   - *Key Channels:* Pinterest, Instagram visual carousels, TikTok/Reels.
   - *Hook Focus:* Molten chocolate lava cake & fresh Kerala tender coconut juice.
7. **Segment G: Fine Dining & Table Styling Enthusiasts**
   - *Intent:* Plating aesthetics, coordinated tableware, dinner party hosting.
   - *Key Channels:* Table Styling Studio, Pinterest, Instagram aesthetic carousels.
   - *Hook Focus:* Royal Malabar Gold & Kasavu dining concepts.
8. **Segment H: International Cuisine Explorers**
   - *Intent:* Exploring global dishes (Italian, Mexican, Japanese, Mediterranean).
   - *Key Channels:* YouTube tutorials, Instagram, Food culture blogs.
   - *Hook Focus:* Authentic Risotto and Ramen with locally available Indian ingredients.
9. **Segment I: Existing Users Who Need Re-Engagement**
   - *Intent:* Resuming unfinished onboarding, revisit saved dishes, weekly meal plan reminder.
   - *Key Channels:* Consented push notifications, WhatsApp opt-in updates (respecting quiet hours).
   - *Hook Focus:* "Your saved Malabar Parotta recipe is waiting."

---

### 3. Consent-Based Recommendation Engine Architecture
- **Layer 1: Contextual Matcher:** Match active page, current category, or search query to compatible recipes, tools, and campaigns without persistent cookies.
- **Layer 2: Content-Based Matcher:** Compute cosine/jaccard similarity across recipe tags, difficulty, dietary preferences, and regional spice levels.
- **Layer 3: Collaborative Filtering Readiness:** Aggregated, anonymized co-cooking matrix ("users who cooked Dish X also enjoyed Dish Y").
- **Layer 4: Explainability Decorator:** Every recommendation returns `reason` (e.g., "Matched to your search for quick coconut curries"), `confidenceScore` (0.0 to 1.0), and `personalisationBasis`.
- **Layer 5: Consent & Privacy Guard:** Honor `allowPersonalisation`, `allowNotifications`, and provide `resetPersonalisation()` and `deleteUserData()` capabilities.

---

### 4. 8 Dedicated Campaign Landing Pages & Funnel Attribution
- `/campaigns/ingredient-finder`
- `/campaigns/kerala-recipes`
- `/campaigns/malayalam-assistant`
- `/campaigns/meal-planner`
- `/campaigns/budget-cooking`
- `/campaigns/desserts-juices`
- `/campaigns/table-styling`
- `/campaigns/international-recipes`

Each landing page features:
1. Dynamic UTM parameter capture (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`).
2. Interactive micro-experience (e.g. ingredient filter, Malayalam voice preview player, budget calculator).
3. Clear conversion CTAs to Web App and Google Play.
4. Funnel telemetry: Impression -> Landing Visit -> App Install -> First Cooking Session -> Premium Conversion.
5. Cost Per Activated User (CPAU) calculation.

---

### 5. Marketing Automation Dashboard Modules
1. **Campaign Calendar:** 30-day interactive calendar with day-by-day themes, pillars, and bilingual scripts.
2. **Daily Content Queue:** Chronological queue with status badges, scheduling, and approval gates.
3. **AI Content Studio:** Generation pipeline for segment-targeted concepts, storyboards, voice-overs, and policy scoring.
4. **Customer Segment Manager:** Configuration and prompt library for Segments A through I.
5. **Social Account Connections:** Status states (Connected, Pending Approval, Unavailable, Failed) with manual checklists.
6. **Publishing Status & Error Monitor:** Idempotency ledger, exponential backoff tracking, duplicate prevention.
7. **Media Asset Library:** Provenance registry, licensed images, catalog linkage.
8. **Recommendation Engine Simulator:** Real-time test harness for contextual & consented recommendations.
9. **Campaign Analytics:** Funnel breakdown, cost per install, cost per activated user, channel ROI.
10. **Budget and Experiment Tracker:** Test budgets, spending caps, A/B hypothesis verification.
11. **Consent & Privacy Controls:** User consent audit, opt-in/opt-out status, data deletion compliance.
