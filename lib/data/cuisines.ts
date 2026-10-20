export interface CulinaryRegion {
  id: string;
  name: string;
  nameMalayalam: string;
  category: "South India" | "North India" | "West India" | "East India" | "Northeast India" | "Union Territories" | "Global";
  specialties: string[];
  icon: string;
  description: string;
}

export const INDIAN_REGIONS: CulinaryRegion[] = [
  // South India
  {
    id: "kerala",
    name: "Kerala",
    nameMalayalam: "കേരളം",
    category: "South India",
    specialties: ["Appam & Stew", "Puttu & Kadala", "Kerala Sadya", "Avial", "Malabar Biryani", "Palada Payasam", "Karimeen Pollichathu"],
    icon: "🌴",
    description: "God's Own Country: fragrant coconut oil, curry leaves, fermented rice batters, black pepper, and spice-rich coastal stews.",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    nameMalayalam: "തമിഴ്നാട്",
    category: "South India",
    specialties: ["Crispy Ghee Dosa", "Chettinad Pepper Chicken", "Medu Vada & Sambar", "Ven Pongal", "Filter Kaapi"],
    icon: "🛕",
    description: "Deep ancient culinary heritage of stone-ground lentils, freshly pounded Chettinad masala, and piping hot filter coffee.",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    nameMalayalam: "കർണാടക",
    category: "South India",
    specialties: ["Bisi Bele Bath", "Neer Dosa", "Mysore Masala Dosa", "Ragi Mudde", "Mysore Pak"],
    icon: "🍛",
    description: "From serene Udupi temple kitchens to fiery Mangalorean coastlines and wholesome millet ragi mudde.",
  },
  {
    id: "andhra-telangana",
    name: "Andhra & Telangana",
    nameMalayalam: "ആന്ധ്രാ & തെലങ്കാന",
    category: "South India",
    specialties: ["Hyderabadi Dum Biryani", "Gongura Mutton", "Pesarattu", "Ulava Charu", "Haleem"],
    icon: "🌶️",
    description: "Famous for tangy gongura leaves, fiery Guntur red chilies, and the legendary Nizam royal dum biryani.",
  },

  // North India
  {
    id: "punjab",
    name: "Punjab",
    nameMalayalam: "പഞ്ചാബ്",
    category: "North India",
    specialties: ["Sarson Da Saag & Makki Di Roti", "Butter Chicken", "Amritsari Kulcha", "Dal Makhani", "Creamy Lassi"],
    icon: "🌾",
    description: "Hearty, golden harvest cuisine rich in desi ghee, clay tandoor cooking, slow-simmered black lentils, and fresh butter.",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    nameMalayalam: "കശ്മീർ",
    category: "North India",
    specialties: ["Rogan Josh", "Dum Olav", "Yakhni", "Kashmiri Pulao", "Saffron Kahwa"],
    icon: "🏔️",
    description: "Valley of saffron, fennel, dry ginger (sonth), dried cockscomb petals, and the 36-course Wazwan royal feast.",
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    nameMalayalam: "ഉത്തർപ്രദേശ്",
    category: "North India",
    specialties: ["Awadhi Dum Biryani", "Galouti Kebab", "Banarasi Chaat", "Bedmi Puri", "Shahi Tukda"],
    icon: "👑",
    description: "Nawabi refinement of Lucknow, fragrant kewra, rose water, melting kebabs, and street food of holy Varanasi.",
  },
  {
    id: "delhi",
    name: "Delhi",
    nameMalayalam: "ഡൽഹി",
    category: "North India",
    specialties: ["Chole Bhature", "Tandoori Chicken", "Chandni Chowk Paratha", "Dahi Bhalla", "Kulfi Falooda"],
    icon: "🏛️",
    description: "The street food capital of India: spicy chickpeas, puffed golden bhaturas, Mughlai alleys, and chaat.",
  },

  // West India
  {
    id: "gujarat",
    name: "Gujarat",
    nameMalayalam: "ഗുജറാത്ത്",
    category: "West India",
    specialties: ["Khaman Dhokla", "Undhiyu", "Thepla", "Kadhi Khichdi", "Handvo"],
    icon: "✨",
    description: "Subtle balance of sweet, salty, and sour flavors, vegetarian artistry, and steaming fermented snacks.",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    nameMalayalam: "മഹാരാഷ്ട്ര",
    category: "West India",
    specialties: ["Vada Pav", "Misal Pav", "Puran Poli", "Bombil Fry", "Kanda Poha"],
    icon: "🏙️",
    description: "Bold Goda masala, coastal Malvani coconut-seafood curries, and iconic Mumbai street culinary sensations.",
  },
  {
    id: "goa",
    name: "Goa",
    nameMalayalam: "ഗോവ",
    category: "West India",
    specialties: ["Goan Fish Curry", "Pork Vindaloo", "Xacuti", "Sorpotel", "Bebinca"],
    icon: "🏖️",
    description: "Vibrant Indo-Portuguese fusion: coconut milk, toddy vinegar, triphala, kokum, and sweet layered bebinca.",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    nameMalayalam: "രാജസ്ഥാൻ",
    category: "West India",
    specialties: ["Dal Baati Churma", "Laal Maas", "Gatte Ki Sabzi", "Ker Sangri", "Ghevar"],
    icon: "🐪",
    description: "Arid desert preservation techniques, sun-dried berries, gram flour dumplings, and fiery Mathania chili curries.",
  },

  // East & Northeast India
  {
    id: "west-bengal",
    name: "West Bengal",
    nameMalayalam: "പശ്ചിമ ബംഗാൾ",
    category: "East India",
    specialties: ["Shorshe Ilish", "Kosha Mangsho", "Luchi & Cholar Dal", "Mishti Doi", "Rasgulla"],
    icon: "🐟",
    description: "Pungent mustard oil, Panch Phoron five-spice blend, freshwater fish mastery, and world-renowned dairy confections.",
  },
  {
    id: "odisha",
    name: "Odisha",
    nameMalayalam: "ഒഡീഷ",
    category: "East India",
    specialties: ["Chhena Poda", "Dalma", "Pakhala Bhata", "Khaja", "Macha Ghanta"],
    icon: "🪷",
    description: "Puri Jagannath temple Mahaprasad legacy, slow-baked caramelized cottage cheese cake, and wholesome lentil-vegetable stew.",
  },
  {
    id: "assam-northeast",
    name: "Assam & Northeast",
    nameMalayalam: "അസം & വടക്കുകിഴക്കൻ സംസ്ഥാനങ്ങൾ",
    category: "Northeast India",
    specialties: ["Masor Tenga", "Khar", "Pitha", "Steamed Pork with Bamboo Shoot", "Naga Ghost Pepper Stew"],
    icon: "🎋",
    description: "Clean sour and fermented profiles, bamboo shoots, fermented fish (ngari), smoked meats, and fragrant local herbs.",
  },
];

export const GLOBAL_CUISINES: CulinaryRegion[] = [
  {
    id: "italy",
    name: "Italian",
    nameMalayalam: "ഇറ്റാലിയൻ",
    category: "Global",
    specialties: ["Handmade Tagliatelle Carbonara", "Neapolitan Pizza Margherita", "Risotto ai Funghi", "Tiramisu"],
    icon: "🍝",
    description: "Purity of top-quality produce, aged Parmigiano Reggiano, extra virgin olive oil, and al dente handmade pasta.",
  },
  {
    id: "japan",
    name: "Japanese",
    nameMalayalam: "ജാപ്പനീസ്",
    category: "Global",
    specialties: ["Tonkotsu & Shoyu Ramen", "Salmon & Tuna Nigiri", "Crispy Tempura", "Matcha Soufflé"],
    icon: "🍣",
    description: "Harmony of umami, precision blade cuts, dashi broth depth, and respect for natural seasonal ingredients.",
  },
  {
    id: "mexico",
    name: "Mexican",
    nameMalayalam: "മെക്സിക്കൻ",
    category: "Global",
    specialties: ["Slow-braised Birria Tacos", "Enchiladas Verdes", "Charred Street Corn (Elote)", "Guacamole Tradicional"],
    icon: "🌮",
    description: "Ancient heritage of nixtamalized heirloom corn, smoky chipotle and ancho chilies, fresh lime, and cilantro.",
  },
  {
    id: "thailand",
    name: "Thai",
    nameMalayalam: "തായ്",
    category: "Global",
    specialties: ["Tom Yum Goong", "Thai Green Curry (Gaeng Kiew Wan)", "Pad Thai", "Mango Sticky Rice"],
    icon: "🍜",
    description: "Mastery of contrasting elements: spicy bird's eye chilies, sweet palm sugar, sour makrut lime, and salty fish sauce.",
  },
  {
    id: "middle-east",
    name: "Middle Eastern & Levantine",
    nameMalayalam: "മിഡിൽ ഈസ്റ്റേൺ",
    category: "Global",
    specialties: ["Authentic Crispy Falafel", "Creamy Hummus with Pine Nuts", "Shakshuka", "Lamb Kofta Kebab"],
    icon: "🧆",
    description: "Sumac, za'atar, tahini, pomegranate molasses, slow-roasted meats, and vibrant shared mezze platters.",
  },
  {
    id: "france",
    name: "French",
    nameMalayalam: "ഫ്രഞ്ച്",
    category: "Global",
    specialties: ["Boeuf Bourguignon", "Classic Ratatouille Niçoise", "French Onion Soup Gratinée", "Crème Brûlée"],
    icon: "🥐",
    description: "The mother sauces, slow braising, aromatic mirepoix, brown butter, wine reductions, and artisanal pastry.",
  },
  {
    id: "china",
    name: "Chinese",
    nameMalayalam: "ചൈനീസ്",
    category: "Global",
    specialties: ["Crispy Peking Duck", "Kung Pao Chicken", "Fiery Mapo Tofu", "Steamed Dim Sum Shumai", "Handmade Wonton Soup"],
    icon: "🥢",
    description: "Centuries of wok hei mastery, Sichuan peppercorn tingling numbing sensation, Cantonese steaming refinement, and handmade dim sum.",
  },
  {
    id: "korea",
    name: "Korean",
    nameMalayalam: "കൊറിയൻ",
    category: "Global",
    specialties: ["Sizzling Dolsot Bibimbap", "Kimchi Jjigae", "Crispy Korean Fried Chicken", "Bulgogi"],
    icon: "🍲",
    description: "Fermented gochujang and doenjang depth, toasted sesame oil, garlic, and hot bubbling stone pot stews.",
  },
];

export function getAllRegions(): CulinaryRegion[] {
  return [...INDIAN_REGIONS, ...GLOBAL_CUISINES];
}

export function getRegionBySlug(slug: string): CulinaryRegion | undefined {
  if (!slug || typeof slug !== "string") return undefined;
  const normalized = slug.trim().toLowerCase();
  return getAllRegions().find(
    (r) =>
      r.id.toLowerCase() === normalized ||
      r.name.toLowerCase() === normalized ||
      r.id.toLowerCase().replace(/-/g, "") === normalized.replace(/-/g, "")
  );
}
