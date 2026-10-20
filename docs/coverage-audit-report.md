# CulinaryVerse AI — Database Coverage & Minimum Rule Enforcement Report

**Audit Status:** ✅ **PASSED (100% COMPLIANT)**  
**Enforcement Script:** `tests/coverage-audit.test.ts` (Automated Vitest Suite)  
**Rule Minimum:** $\ge 10$ distinct, verified recipes/concepts per published cuisine, meal category, dessert subcategory, beverage subcategory, and table styling collection. Zero duplicate IDs, slugs, or titles permitted.

---

## 1. Summary Metrics

| Section | Total Items | Minimum Required per Category | Number of Categories | Compliance Status |
| :--- | :--- | :--- | :--- | :--- |
| **Main Regional & Global Recipes** | 140 Recipes | $\ge 10$ Recipes | 14 Cuisines | **PASSED (100%)** |
| **Desserts & Confectionery Studio** | 40 Recipes | $\ge 10$ Recipes | 4 Subcategories | **PASSED (100%)** |
| **Juices & Beverages Studio** | 50 Drinks | $\ge 10$ Drinks | 5 Subcategories | **PASSED (100%)** |
| **Table Decoration & Styling Studio**| 40 Concepts | $\ge 10$ Concepts | 4 Collections | **PASSED (100%)** |
| **Total Curated Platform Assets** | **270 Distinct Assets** | — | — | **PASSED (100%)** |

---

## 2. Indian Regional Cuisines Breakdown

Every published Indian cuisine contains at least 10 distinct, culturally authentic recipes:

| Indian Cuisine / Region | Verified Count | Required Minimum | Sample Trending Recipes | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Kerala Cuisine** | **10** | $\ge 10$ | Sadya Avial, Thalassery Dum Biryani, Karimeen Pollichathu, Palappam with Stew, Meen Pollichathu | **PASSED** |
| **Tamil Nadu Cuisine** | **10** | $\ge 10$ | Chettinad Pepper Chicken, Madurai Kari Dosa, Pongal, Dindigul Thalappakatti Biryani, Kothu Parotta | **PASSED** |
| **Karnataka Cuisine** | **10** | $\ge 10$ | Mysore Masala Dosa, Bisi Bele Bath, Mangalorean Kori Rotti, Neer Dosa, Pandi Curry, Davangere Benne Dosa | **PASSED** |
| **Andhra & Telangana** | **10** | $\ge 10$ | Hyderabadi Mutton Dum Biryani, Gongura Mamsam, Royyala Vepudu, Mirchi Ka Salan, Natu Kodi Pulusu | **PASSED** |
| **Punjabi Cuisine** | **10** | $\ge 10$ | Sarson Da Saag & Makki Di Roti, Dal Makhani, Amritsari Pindi Chole, Butter Chicken, Amritsari Kulcha | **PASSED** |
| **Maharashtrian Cuisine** | **10** | $\ge 10$ | Kolhapuri Misal Pav, Malvani Surmai Curry, Thalipeeth, Pitla Bhakri, Bharli Vangi, Puran Poli | **PASSED** |
| **Gujarati Cuisine** | **10** | $\ge 10$ | Authentic Kathiyawadi Undhiyu, Khaman Dhokla, Sev Tameta Nu Shaak, Methi Thepla, Dal Dhokli | **PASSED** |
| **Bengali Cuisine** | **10** | $\ge 10$ | Kolkata Kosha Mangsho & Luchi, Shorshe Ilish, Chingri Malai Curry, Chholar Dal, Rui Macher Jhol | **PASSED** |

---

## 3. Global Cuisines Breakdown

Every published international culinary tradition contains at least 10 distinct authentic dishes:

| Global Cuisine | Verified Count | Required Minimum | Sample Trending Recipes | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Italian** | **10** | $\ge 10$ | Risotto ai Funghi Porcini, Tagliatelle al Ragù Bolognese, Pizza Napoletana, Ossobuco alla Milanese | **PASSED** |
| **Japanese** | **10** | $\ge 10$ | Tonkotsu Chashu Ramen, Salmon Nigiri, Chicken Katsu Curry, Hiroshima Okonomiyaki, Gyudon | **PASSED** |
| **Mexican** | **10** | $\ge 10$ | Tacos al Pastor, Guacamole Tradicional, Enchiladas Verdes, Chiles en Nogada, Pozole Rojo, Birria de Res | **PASSED** |
| **Chinese** | **10** | $\ge 10$ | Sichuan Mapo Tofu, Kung Pao Chicken, Cantonese Shumai, Peking Roasted Duck, Dan Dan Noodles | **PASSED** |
| **Thai** | **10** | $\ge 10$ | Tom Yum Goong, Traditional Pad Thai Boran, Green Chicken Curry, Massaman Beef, Som Tum Thai | **PASSED** |
| **Middle Eastern** | **10** | $\ge 10$ | Hummus Bil Tahini, Crispy Herb Falafel, Shish Tawook, Shakshuka, Lamb Kofta, Jordanian Mansaf | **PASSED** |

---

## 4. Major Meal & Food Categories Breakdown

| Category | Filter Rule | Recipe Count | Required Minimum | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Breakfast** | `mealType === "breakfast"` | **26 Recipes** | $\ge 10$ | **PASSED** |
| **Lunch** | `mealType === "lunch"` | **71 Recipes** | $\ge 10$ | **PASSED** |
| **Dinner** | `mealType === "dinner"` | **33 Recipes** | $\ge 10$ | **PASSED** |
| **Snacks & Street Food** | `mealType === "snack" \|\| street-food` | **18 Recipes** | $\ge 10$ | **PASSED** |
| **Rice Dishes & Biryanis** | Rice ingredients / title match | **24 Recipes** | $\ge 10$ | **PASSED** |
| **Curries & Gravies** | Curry, korma, dal, gravy, masala, stew, sambar | **58 Recipes** | $\ge 10$ | **PASSED** |
| **Breads & Flatbreads** | Roti, naan, paratha, parotta, dosa, appam, puri, luchi, thepla, bhakri, kulcha, bhature, pav, tortilla | **14 Recipes** | $\ge 10$ | **PASSED** |

---

## 5. Dedicated Desserts Studio Breakdown

| Subcategory | Count | Minimum | Featured Creations | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Payasam & Pradhaman** | **10** | $\ge 10$ | Palada, Ada Pradhaman, Parippu, Semiya, Ambalapuzha Paal Payasam, Nendran Pazham, Gothambu, Kadala, Aval, Chakka | **PASSED** |
| **Traditional Mithai** | **10** | $\ge 10$ | Gulab Jamun, Rasmalai, Jalebi, Mysore Pak, Ukadiche Modak, Besan Ladoo, Kaju Katli, Motichoor Ladoo, Gajar Halwa, Sandesh | **PASSED** |
| **Cakes & Bakes** | **10** | $\ge 10$ | Kerala Plum Cake, Fudgy Brownies, NY Cheesecake, Cardamom Tea Cake, Apple Crumble, Butter Croissants, Red Velvet, Crème Brûlée | **PASSED** |
| **Global Desserts** | **10** | $\ge 10$ | Tiramisu, Panna Cotta, Pistachio Baklava, Cheesy Kunafa, Strawberry Mochi, Churros, Eclairs, Tres Leches, Turkish Delight, Matcha Soufflé | **PASSED** |

---

## 6. Dedicated Juices & Beverages Studio Breakdown

| Subcategory | Count | Minimum | Featured Drinks | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Fresh Juices** | **10** | $\ge 10$ | Mosambi Ginger, Pomegranate Mint, Watermelon Basil, ABC Detox, Pineapple Pink Pepper, Valencia Orange, Cucumber Celery, Papaya, Amla, Guava Kanthari | **PASSED** |
| **Smoothies & Shakes** | **10** | $\ge 10$ | Calicut Sharjah Shake, Mango Mastani, Chikoo Date, Blueberry Yogurt, Avocado Honey, Strawberry Banana, Kesar Pista, Peanut Cacao, Tender Coconut, Berry Chia | **PASSED** |
| **Traditional Refreshers** | **10** | $\ge 10$ | Kulukki Sarbath, Kerala Sambharam, Nannari Sarbath, Punjabi Lassi, Solkadhi, Aam Panna, Madurai Jigarthanda, Banarasi Thandai, Bel Sharbat, Rose Milk | **PASSED** |
| **Mocktails & Coolers** | **10** | $\ge 10$ | Blue Curacao Fizz, Virgin Mojito, Spicy Guava Mary, Hibiscus Ginger, Masala Shikanji, Passion Fruit Spritzer, Cucumber Rosemary, Pomegranate Fizz | **PASSED** |
| **Artisanal Teas & Coffees**| **10** | $\ge 10$ | Kumbakonam Filter Coffee, Mumbai Cutting Chai, Malabar Sulaimani, Kashmiri Noon Chai, Matcha Latte, Cafe Con Leche, Turkish Coffee, Vietnamese Coffee | **PASSED** |

---

## 7. Dedicated Table Styling Studio Breakdown

| Collection | Count | Minimum | Key Concepts | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Kerala Sadya & Banquet** | **10** | $\ge 10$ | Grand Onam Mahasadya, Vishu Kani Feast, Illam Bronze Banquet, Malabar Dastarkhan, Syrian Christian Easter, Houseboat, Oottupura, Karkidakam, Toddy Chic, Eco-Sadya | **PASSED** |
| **Festive Indian Dining** | **10** | $\ge 10$ | Royal Diwali, Navratri Dandiya, Eid Silver Crescent, Durga Puja, Makar Sankranti, Thai Pongal, Ganesh Chaturthi, Holi Color Splash, Karwa Chauth, Raksha Bandhan | **PASSED** |
| **Celebrations & Banquets** | **10** | $\ge 10$ | Maharaja Wedding, Anniversary Rose Gold, Romantic Dinner for Two, Kids Carnival, Silver Jubilee, Black-Tie Formal, Engagement Brunch, Baby Shower, New Year, Graduation | **PASSED** |
| **Minimalist & Rustic Outdoor**| **10** | $\ge 10$ | Scandinavian Hygge, Mediterranean Olive Grove, Japanese Wabi-Sabi, Rustic Farmhouse Burlap, Coastal Driftwood, Zen Stone, Vineyard Sunset, Bohemian Rattan, Industrial Loft, Forest Upcycled | **PASSED** |

---

## Conclusion
The automated audit confirms zero duplicates, complete attribute verification, and full adherence to the $\ge 10$ rule across every published collection.
