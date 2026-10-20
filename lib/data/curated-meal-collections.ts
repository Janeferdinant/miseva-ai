import { CuratedMealCollection } from "@/lib/types/table-styling";

export const CURATED_MEAL_COLLECTIONS: CuratedMealCollection[] = [
  {
    id: "kerala-grand-lunch",
    slug: "kerala-grand-lunch",
    title: "Kerala Grand Lunch",
    titleMalayalam: "കേരള ഗ്രാന്റ് ലഞ്ച്",
    catchphrase: "A harmonious symphony of 9 traditional Sadya courses on fresh plantain leaf.",
    description: "An authentic Kerala feast presenting fragrant Matta rice, rich roasted coconut Avial, spiced Sambar, crisp Thoran, crunchy Papadam, sweet mango pickle, and heavenly Palada Pradhaman.",
    dishes: [
      {
        name: "Kerala Matta Rice (കുത്തരി ചോറ്)",
        course: "main",
        description: "Nutrient-rich steamed indigenous red rice, lightly fragrant and fluffy."
      },
      {
        name: "Authentic Kerala Sambar (സാമ്പാർ)",
        course: "main",
        description: "Slow-simmered lentils and garden vegetables tempered with shallots and curry leaves."
      },
      {
        name: "Traditional Avial (അവിയൽ)",
        course: "side",
        description: "Medley of seasonal vegetables steamed with crushed coconut, green chilies, and cold-pressed coconut oil."
      },
      {
        name: "Beans & Cabbage Thoran (തോരൻ)",
        course: "side",
        description: "Dry sautéed vegetables with grated fresh coconut, mustard seeds, and turmeric."
      },
      {
        name: "Crisp Kerala Papadam & Inji Puli (പപ്പടവും ഇഞ്ചിപ്പുളിയും)",
        course: "accompaniment",
        description: "Golden puffed lentil wafers paired with piquant dark ginger-tamarind preserve."
      },
      {
        name: "Palada Pradhaman (പാലട പ്രഥമൻ)",
        course: "dessert",
        description: "Creamy slow-reduced milk payasam with tender rice flakes, cardamom, and toasted cashews."
      }
    ],
    beveragePairing: {
      name: "Spiced Kerala Sambharam (മസാല സംഭാരം)",
      type: "traditional-digestive",
      servingVessel: "Chilled bell-metal brass tumbler with crushed curry leaves and green chili rim"
    },
    courseOrder: [
      "1. Salt, pickles, and crisp papadam placed on the leaf's top-left corner",
      "2. Thoran, avial, and pachadi lined across the top edge",
      "3. First mound of Matta rice served in center, crowned with hot parippu and ghee",
      "4. Sambar poured generously for the main course",
      "5. Palada Pradhaman served directly onto the leaf or in a bronze katori",
      "6. Concluding digestive glass of spiced Sambharam"
    ],
    idealThemeId: "kerala-royal-feast",
    occasion: "Festive Celebrations, Onam, Vishu, Sunday Family Feast",
    stylingNotes: "Serve strictly on trimmed, unblemished banana leaves with the narrow tip pointing left of the diner."
  },
  {
    id: "royal-indian-dinner",
    slug: "royal-indian-dinner",
    title: "Royal Indian Dinner",
    titleMalayalam: "രാജകീയ ഭാരതീയ ഡിന്നർ",
    catchphrase: "Mughal and Awadhi grandeur with rich aromas, saffron biryani, and warm tandoor breads.",
    description: "An opulent multi-course dinner featuring slow-cooked Dum Biryani, buttery Dal Makhani, Paneer Butter Masala, blistered Garlic Naan, and rose-scented Gulab Jamun.",
    dishes: [
      {
        name: "Hyderabadi Dum Biryani (ദം ബിരിയാണി)",
        course: "main",
        description: "Fragrant aged Basmati rice layered with aromatic whole spices, saffron milk, and caramelized onions."
      },
      {
        name: "Paneer Butter Masala (പനീർ ബട്ടർ മസാല)",
        course: "main",
        description: "Cottage cheese simmered in a velvety sauce of vine-ripened tomatoes, cashews, and fresh cream."
      },
      {
        name: "Dal Makhani (ദാൽ മഖാനി)",
        course: "side",
        description: "Slow-simmered black lentils and kidney beans enriched with churned white butter."
      },
      {
        name: "Tandoori Garlic Naan (ഗാർലിക് നാൻ)",
        course: "accompaniment",
        description: "Leavened flatbread brushed with crushed garlic butter and freshly chopped coriander."
      },
      {
        name: "Warm Gulab Jamun with Pistachio (ഗുലാബ് ജാമുൻ)",
        course: "dessert",
        description: "Melt-in-mouth milk dumplings soaked in green cardamom and rose sugar syrup."
      }
    ],
    beveragePairing: {
      name: "Royal Saffron Almond Lassi (കുങ്കുമപ്പൂവ് ലസ്സി)",
      type: "traditional-digestive",
      servingVessel: "Engraved tall brass tumbler garnished with Kashmiri saffron threads"
    },
    courseOrder: [
      "1. Starters: Tandoori paneer skewers with mint-coriander chutney",
      "2. Main Service: Dum Biryani centerpiece in handi, surrounded by bowls of Dal Makhani and paneer",
      "3. Bread Service: Freshly baked tandoori naans served in cloth-lined silver basket",
      "4. Sweet Finale: Warm Gulab Jamun served in silver katoris with silver vark leaf"
    ],
    idealThemeId: "royal-heritage",
    occasion: "Formal Wedding Reception, Milestone Anniversary, Grand Celebration",
    stylingNotes: "Arrange dishes symmetrically in a 7-piece royal thali or individual bone china charger plates with 24K gold rim."
  },
  {
    id: "continental-fine-dining",
    slug: "continental-fine-dining",
    title: "Continental Fine Dining",
    titleMalayalam: "കോണ്ടിനെന്റൽ ഫൈൻ ഡൈനിംഗ്",
    catchphrase: "A five-course culinary journey with refined European techniques and impeccable plating.",
    description: "An elegant evening course menu starting with velvety Truffle Mushroom soup, artisanal rosemary mains, French Ratatouille, decadent Tiramisu, and sparkling berry spritzers.",
    dishes: [
      {
        name: "Cream of Wild Forest Truffle Soup",
        course: "starter",
        description: "Slow-roasted field mushrooms finished with white truffle oil and herbed brioche croutons."
      },
      {
        name: "Grilled Herb Polenta Steak with Chimichurri",
        course: "main",
        description: "Crispy-edged golden polenta served over charred asparagus and wild garlic oil."
      },
      {
        name: "Classic Provençal Ratatouille",
        course: "side",
        description: "Thinly layered zucchini, eggplant, and roma tomatoes baked with fresh thyme."
      },
      {
        name: "Rustic Sourdough Boule & Cultured Butter",
        course: "accompaniment",
        description: "Naturally fermented sourdough slices with Maldon smoked sea salt butter."
      },
      {
        name: "Authentic Italian Espresso Tiramisu",
        course: "dessert",
        description: "Savoiardi ladyfingers steeped in dark roast espresso, layered with whipped mascarpone."
      }
    ],
    beveragePairing: {
      name: "Sparkling Pomegranate Rosemary Spritzer",
      type: "sparkling-cooler",
      servingVessel: "Lead-free crystal Bordeaux glass with a charred rosemary sprig"
    },
    courseOrder: [
      "1. Amuse-bouche & Sourdough service",
      "2. Soup Course: Wild Truffle Soup in deep coupe porcelain bowl",
      "3. Main Course: Herb Polenta Steak served on heated flat stoneware",
      "4. Palate Cleanser: Lemon thyme granita",
      "5. Dessert Course: Tiramisu presented with gold dessert fork and espresso"
    ],
    idealThemeId: "five-star-luxury",
    occasion: "Candlelight Date for Two, Business Dinner, Milestone Achievement",
    stylingNotes: "Maintain 2.5 cm spacing between silverware. Use silver charger underplates and unwrinkled white linen."
  },
  {
    id: "elegant-afternoon-tea",
    slug: "elegant-afternoon-tea",
    title: "Elegant Afternoon Tea",
    titleMalayalam: "ഹൈ ടീ സൽക്കാരം",
    catchphrase: "A delicate tiered display of warm scones, ribbon sandwiches, and rare tea leaves.",
    description: "Quintessential high tea hospitality featuring crustless cucumber-mint sandwiches, freshly baked buttermilk scones with clotted cream, delicate fruit tarts, and premium single-estate tea infusions.",
    dishes: [
      {
        name: "English Cucumber & Herb Ribbon Sandwiches",
        course: "starter",
        description: "Delicate crustless white and rye fingers layered with salted butter and garden mint."
      },
      {
        name: "Devonshire Buttermilk Scones",
        course: "side",
        description: "Fluffy warm scones accompanied by strawberry conserve and whipped Devon clotted cream."
      },
      {
        name: "Mini Glazed Fruit Tartlets",
        course: "dessert",
        description: "Buttery shortcrust pastry shells filled with Madagascar vanilla bean pastry cream."
      },
      {
        name: "Pistachio & Rose Macarons",
        course: "dessert",
        description: "Crisp almond meringue shells filled with dark chocolate ganache and candied pistachios."
      }
    ],
    beveragePairing: {
      name: "First Flush Darjeeling & Spiced Masala Chai",
      type: "tea-infusion",
      servingVessel: "Fine porcelain teacup with saucer, accompanied by bone china creamer and silver sugar tongs"
    },
    courseOrder: [
      "1. Bottom Tier: Savory ribbon sandwiches and mini savory quiches",
      "2. Middle Tier: Warm scones wrapped in linen napkin with preserves",
      "3. Top Tier: Sweet tartlets, macarons, and petite fours",
      "4. Continuous table pour of freshly steeped tea"
    ],
    idealThemeId: "garden-brunch",
    occasion: "Bridal Shower, Mother's Day, Afternoon Social Gathering",
    stylingNotes: "Tiered cake stand stands at the exact center of the table with tea cups positioned at the four o'clock angle."
  },
  {
    id: "dessert-indulgence",
    slug: "dessert-indulgence",
    title: "Dessert Indulgence",
    titleMalayalam: "ഡെസേർട്ട് സംഗമം",
    catchphrase: "An exclusive patisserie tasting menu of decadent chocolates, custards, and warm puddings.",
    description: "Curated for connoisseurs of fine sweets. Combines traditional Kerala Chakka Pradhaman, warm Valrhona chocolate fondant, New York style baked cheesecake, and velvety saffron kulfi.",
    dishes: [
      {
        name: "Warm Valrhona Chocolate Lava Cake",
        course: "dessert",
        description: "Dark 70% chocolate sponge with molten center, accompanied by Madagascar vanilla gelato."
      },
      {
        name: "Kerala Chakka Pradhaman (ചക്ക പ്രഥമൻ)",
        course: "dessert",
        description: "Heritage jackfruit preserve simmered in thick coconut milk, dark jaggery, and fried coconut slices."
      },
      {
        name: "Baked New York Vanilla Cheesecake",
        course: "dessert",
        description: "Creamy dense cheesecake over buttery graham cracker crust with raspberry coulis."
      },
      {
        name: "Malai Kesar Kulfi Popsicle (കേസർ കുൾഫി)",
        course: "dessert",
        description: "Slow-reduced creamy milk infused with saffron, cardamom, and toasted slivered pistachios."
      }
    ],
    beveragePairing: {
      name: "Cold Brew Affogato with Cinnamon Dust",
      type: "mocktail",
      servingVessel: "Fluted crystal coupe with dark espresso poured table-side over vanilla gelato"
    },
    courseOrder: [
      "1. First Course: Saffron Kulfi served chilled in small bowls",
      "2. Second Course: Rich Chakka Pradhaman in warm bronze cup",
      "3. Third Course: Warm molten chocolate lava cake with gold pastry fork",
      "4. Finishing Course: Cold Brew Affogato"
    ],
    idealThemeId: "dessert-atelier",
    occasion: "Post-Dinner Soirée, Birthday Finale, Confectionery Showcase",
    stylingNotes: "Use marble presentation slabs and gold pastry forks. Pin-spot lighting directly on glazes."
  },
  {
    id: "fresh-juice-elixir-bar",
    slug: "fresh-juice-elixir-bar",
    title: "Fresh Juice & Elixir Bar",
    titleMalayalam: "ഫ്രഷ് ജ്യൂസ് ബാർ",
    catchphrase: "Revitalizing tropical coolers, cold-pressed elixirs, and fresh botanical garnishes.",
    description: "An invigorating beverage atelier highlighting Malabar Kulukki Sarbath, refreshing Watermelon Mint cooler, spiced Tender Coconut water, and fragrant Masala Chaas.",
    dishes: [
      {
        name: "Malabar Green Chili Kulukki Sarbath (കുലുക്കി സർബത്ത്)",
        course: "starter",
        description: "Shaken iced lemonade with crushed green chilies, basil seeds (sabja), and sugar syrup."
      },
      {
        name: "Watermelon Mint Agave Cooler",
        course: "starter",
        description: "Cold-pressed fresh ruby watermelon with muddled spearmint and Himalayan pink salt."
      },
      {
        name: "Spiced Kerala Tender Coconut Elixir",
        course: "accompaniment",
        description: "Fresh green coconut water infused with crushed ginger, mint sprigs, and lemon zest."
      },
      {
        name: "Chilled Masala Buttermilk (തണുത്ത സംഭാരം)",
        course: "accompaniment",
        description: "Whisked yogurt tempered with ginger, green chili, curry leaves, and asafoetida."
      }
    ],
    beveragePairing: {
      name: "Sparkling Butterfly Pea Flower Lemonade",
      type: "mocktail",
      servingVessel: "Highball crystal glass with an ombre color shift from indigo to violet"
    },
    courseOrder: [
      "1. Welcoming glass of Butterfly Pea Flower Lemonade",
      "2. Shaken Kulukki Sarbath with spicy-sweet contrast",
      "3. Mid-day refresher: Chilled Tender Coconut Elixir",
      "4. Digestive finale: Masala Chaas served in clay kulhar cups"
    ],
    idealThemeId: "contemporary-global-dining",
    occasion: "Summer Brunch, Wellness Retreat, Garden Party",
    stylingNotes: "Display bottles and pitchers in hammered brass ice troughs with fresh lime slices and mint sprigs."
  }
];
