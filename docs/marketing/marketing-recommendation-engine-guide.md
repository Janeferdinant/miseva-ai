# MISEVA AI — AUTONOMOUS MARKETING & CUSTOMER RECOMMENDATION ENGINE
## Operator & Engineering Field Guide

### 1. Executive Summary & Core Philosophy
Miseva AI's marketing and recommendation systems are fundamentally structured around **user intent and job-to-be-done**—solving immediate cooking questions, turning available ingredients into dinner, organizing weekly meal plans on a budget, celebrating regional Kerala and Malayalam culinary heritage, or curating five-star luxury dining experiences.

**Key Rule:** Demographics (such as assuming women of a particular age are the core audience) are never used as default customer profiles. All targeting and recommendations rely on consented first-party interactions and contextual intent.

---

### 2. The 9 Intent-Driven Customer Segments
| Code | Name | Intent / Job-to-be-Done | Key Channels | Primary Hook |
| :--- | :--- | :--- | :--- | :--- |
| **SEG-A** | **Ingredient-Based Recipe Seekers** | Turn whatever ingredients are in the fridge into quick, delicious meals. | Search Ads, Instagram Reels, Shorts | "3 dinners from ingredients already in your fridge." |
| **SEG-B** | **Kerala & Malayalam Cooking** | Authentic Kerala heritage dishes with Malayalam voice guidance. | Malayalam Creators, YouTube Shorts, WhatsApp | "മലയാളത്തിൽ പാചകം പഠിക്കാം! Step-by-step voice guided cooking." |
| **SEG-C** | **Budget-Conscious Meal Planners** | Organize weekly meals, reduce food waste, benchmark grocery prices. | Pinterest, Google Search, YouTube | "Meal prep 5 days of healthy dinners under ₹1,200." |
| **SEG-D** | **Students & Busy Professionals** | Fast 15-minute healthy dinners with minimal cleanup after work. | Instagram Reels, Quick Recipe Cards | "Exhausted after 9 hours of work? 15-minute garlic paneer bowl." |
| **SEG-E** | **Families & Household Organisers** | Harmonizing family dinners, coordinating compatible side dishes. | Pinterest Boards, YouTube Long-form | "Dinner that everyone in the house actually agrees on." |
| **SEG-F** | **Dessert, Juice & Baking** | Confectionery masterpieces, tropical fresh juices, weekend baking. | Instagram Carousels, Pinterest | "Restaurant-grade Molten Dark Chocolate Lava Cake at home." |
| **SEG-G** | **Fine Dining & Table Styling** | Tableware curation, candlelit ambience, luxury Kasavu dinner themes. | Table Styling Studio, Instagram Aesthetic | "Transform your dinner table into 5-star luxury with AI styling." |
| **SEG-H** | **International Cuisine Explorers** | Cooking authentic Risotto, Ramen, and Tacos with Indian supermarket items. | YouTube Tutorials, Instagram Guides | "Creamy Italian Risotto with ingredients from your local store." |
| **SEG-I** | **Consented User Re-Engagement** | Helpful, non-pressuring reminders for saved dishes and active meal plans. | In-App Alerts, WhatsApp Opt-in | "Your saved Malabar Chicken Curry is ready for tonight." |

---

### 3. Consent-Based Explainable Recommendation Engine
The recommendation engine operates across 5 distinct architectural layers:
1. **Contextual Matcher:** Evaluates active page URL, current recipe tags, and active search queries. Completely functional for anonymous visitors with zero tracking or cookies.
2. **Content-Based Ranker:** Computes similarity between user-consented categories and candidate dishes.
3. **Collaborative Filtering Readiness:** Pre-configured matrix factorization hooks ("users who cooked Dish A also enjoyed Dish B").
4. **Explainability Decorator:** Attaches an explicit `reason` string (e.g., *"Based on your search for quick coconut curries"*), a `confidenceScore` (0.0 to 1.0), and a `personalisationBasis` tag (`CONTEXTUAL` vs `CONTENT_INTEREST`).
5. **Consent & Privacy Guard:** Strictly adheres to user opt-out preferences. When `allowPersonalisation` is toggled off, all stored signals are bypassed and recommendations immediately revert to generic contextual suggestions.

---

### 4. 8 Campaign Landing Pages & Dynamic Routing
Miseva AI hosts 8 dedicated campaign portals under `/campaigns/[slug]`:
1. `/campaigns/ingredient-finder` — Interactive ingredient selector with instant recipe matching.
2. `/campaigns/kerala-recipes` — God's Own Country heritage recipes with bilingual notes.
3. `/campaigns/malayalam-assistant` — In-browser Malayalam speech synthesis audio preview.
4. `/campaigns/meal-planner` — Interactive weekly meal planner preview and prep checklist.
5. `/campaigns/budget-cooking` — Interactive budget slider calculating per-serving cost savings.
6. `/campaigns/desserts-juices` — Artisanal confectionery gallery with Molten Chocolate Lava Cake.
7. `/campaigns/table-styling` — Table Styling Studio luxury themes (Kasavu Gold, Emerald Velvet).
8. `/campaigns/international-recipes` — Global recipe guide adapted for Indian kitchen ingredients.

#### Funnel Telemetry & Cost Per Activated User (CPAU)
Funnel stages tracked via `/api/marketing/attribution`:
$$\text{Impression} \longrightarrow \text{Ad Click} \longrightarrow \text{Landing Visit} \longrightarrow \text{App Install} \longrightarrow \text{First Cooking Session} \longrightarrow \text{Repeat User}$$

$$\text{CPAU} = \frac{\text{Total Campaign Spend (INR)}}{\text{First Successful Cooking Sessions (Activated Users)}}$$

---

### 5. Idempotency & Exponential Backoff Engine
- **Duplicate Prevention:** Every scheduled campaign post is tagged with a deterministic `idempotencyKey` (e.g. `idem-post-day-01-ig`). Re-submissions of completed posts are permanently blocked.
- **Exponential Backoff:** Transient network timeouts or platform rate limits trigger automatic backoff:
  - Attempt 1: 300 seconds (5 minutes)
  - Attempt 2: 600 seconds (10 minutes)
  - Attempt 3: 1200 seconds (20 minutes)
  - Attempt > 3: Automatic escalation to **Manual Review Required**.
- **Auth Token Expiration:** Token revocations or permissions rejections immediately flag the job for administrator intervention, without futile retry loops.

---

### 6. Marketing Dashboard Executive Guide (11 Modules)
Operators manage campaigns via `/marketing`:
1. **30-Day Calendar:** Interactive calendar with day-by-day themes, pillars, and bilingual copy.
2. **Daily Queue:** Chronological publishing queue with live countdowns and status indicators.
3. **AI Content Studio:** Segment-targeted generator with vertical-video storyboards and voiceover text.
4. **Customer Segments:** Configuration and prompt generator for Segments A through I.
5. **Recommendation Engine:** Real-time test simulator for contextual vs consented recommendations.
6. **Social Connections:** Connection status, token health, and permission review for Meta, YouTube, Pinterest, LinkedIn, and WhatsApp.
7. **Error & Retry Monitor:** Idempotency ledger, retry queue, and transient failure diagnostics.
8. **Media Assets:** Asset provenance registry with verified dish catalog linkage and licenses.
9. **Budget & Experiments:** A/B growth experiment tracker with statistical confidence scoring and spend caps.
10. **Funnel Analytics:** Comprehensive conversion rates, blended CPAU, and estimated vs observed revenue.
11. **Consent & Privacy:** Regulatory compliance audit (DPDP, Google Play, GDPR), quiet hours guard, and user data deletion manager.
