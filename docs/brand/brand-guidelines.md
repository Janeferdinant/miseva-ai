# Miseva AI — Complete Brand Guidelines & Design System

> **Brand Name:** **Miseva AI**  
> **Primary Tagline:** *Your World. Your Kitchen. Your AI Chef.*  
> **Brand Vision:** An intelligent culinary companion that helps people discover authentic recipes, cook with confidence, shop efficiently, master culinary science, speak with an AI chef in English and Malayalam, and style beautiful dining tables.

---

## 1. Brand Pillars & Voice Framework

### A. Core Pillars
1. **Mise en Place Precision:** Everything measured, prepped, and organized before cooking begins.
2. **Devoted Service (*Seva*):** Cooking as an act of hospitality, care, and cultural connection.
3. **Conversational AI Intelligence:** Real-time step guidance, hands-free voice commands, and culinary chemistry explanations.
4. **Cultural Authenticity:** Deep respect for traditional Kerala, regional Indian, and world gastronomy.
5. **Holistic Dining Artistry:** Moving beyond the skillet into table decoration, tablescaping, and sensory presentation.

### B. Tone of Voice
- **Masterful yet Accessible:** Speak like a warm, experienced executive chef who demystifies complex techniques without condescension.
- **Scientifically Grounded:** Explain *why* techniques work (e.g., starch gelatinization in risotto, spice blooming in hot oil).
- **Culturally Fluent:** Authentic culinary terminology in English and Malayalam (മലയാളം ലിപി) without clumsy transliterations.
- **Inspiring & Reassuring:** Empower beginners to attempt complex curries and sourdough without fear of failure.

---

## 2. Color Palette & Liquid-Glass Design Tokens

Miseva AI combines organic culinary earthiness with sophisticated technology glassmorphism:

```
┌────────────────────────────────────────────────────────────────────────┐
│  EMERALD DEEP      SAFFRON GOLD      WARM IVORY       FOREST DARK      │
│  #0F5132           #D97706           #FDFBF7          #062419          │
│  (Culinary Tech)   (Spice & Warmth)  (Editorial Clean)(Dark Surfaces)  │
└────────────────────────────────────────────────────────────────────────┘
```

| Token Name | HEX Code | RGB / HSL | Usage |
| :--- | :--- | :--- | :--- |
| **`--miseva-emerald-deep`** | `#0F5132` | `rgb(15, 81, 50)` | Primary brand mark, active buttons, headings |
| **`--miseva-emerald-light`**| `#059669` | `rgb(5, 150, 105)` | Interactive hover states, badges, success accents |
| **`--miseva-saffron`** | `#D97706` | `rgb(217, 119, 6)` | Secondary brand color, rating stars, timer alerts |
| **`--miseva-gold-accent`** | `#F59E0B` | `rgb(245, 158, 11)` | Kasavu gold highlights, festive table accents |
| **`--miseva-ivory`** | `#FDFBF7` | `rgb(253, 251, 247)` | Light theme background, clean editorial canvas |
| **`--miseva-forest-dark`** | `#062419` | `rgb(6, 36, 25)` | Dark theme background, deep contrast surfaces |
| **`--miseva-champagne`** | `#F7E7CE` | `rgb(247, 231, 206)` | Elegant card borders, subtle glowing rings |
| **`--miseva-glass-border`**| `rgba(255, 255, 255, 0.15)` | — | Translucent frosted glass card borders |
| **`--miseva-glass-bg`** | `rgba(255, 255, 255, 0.08)` | — | Frosted glass panel backgrounds (`backdrop-blur`) |

---

## 3. Typography Specifications

- **Primary Display & Headings:** `Plus Jakarta Sans`, `Inter`, or `Outfit` — Geometric precision with open letterforms that remain crisp at 4K display resolutions and small mobile screens.
- **Body & Instruction Text:** `Inter`, `Roboto` — Clean readability with generous line heights (`1.6` to `1.75`) designed for cooks reading recipes while standing at the kitchen counter.
- **Malayalam Script (മലയാളം ലിപി):** `Noto Sans Malayalam`, `Manjari`, `Chilanka` — Flawless rendering of traditional conjuncts and vowel signs across Web and Jetpack Compose.
- **Monospace & Numerical Metrics:** `JetBrains Mono` or tabular figures for cooking timers, temperatures (`180°C`), and grocery pricing (`₹240/kg`).

---

## 4. Academic Supervision Notice
Every customer-facing web footer, mobile profile screen, and release report must preserve the dedicated academic supervision attribution:

> **Academic Supervision:**  
> **Jane Rose**  
> **Assistant Professor, CSE**  
> *“Miseva AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”*
