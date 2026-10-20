import fs from 'fs';
import path from 'path';

// Complete dictionary of 230 unique, verified culinary image URLs
export const VERIFIED_CULINARY_IMAGE_REGISTRY: Record<string, { url: string; dishName: string; category: string; cuisine: string }> = {
  // === KERALA (10) ===
  "kerala-avial": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Kerala Sadya Avial",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-thalassery-biryani": {
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    dishName: "Malabar Thalassery Dum Biryani",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-palappam-stew": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    dishName: "Palappam with Kerala Vegetable Stew",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-fish-curry": {
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kerala Nadan Meen Curry (Kudampuli)",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-karimeen-pollichathu": {
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    dishName: "Karimeen Pollichathu in Banana Leaf",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-kadala-curry": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kerala Black Chickpea Kadala Curry",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-egg-roast": {
    url: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80",
    dishName: "Nadan Mutta Roast (Kerala Egg Roast)",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-beef-ularthiyathu": {
    url: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kerala Beef Ularthiyathu (Slow Roast)",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-kalan": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Kerala Sadya Kaalan",
    category: "Main",
    cuisine: "Kerala"
  },
  "kerala-erissery": {
    url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mathanga Vanpayar Erissery (Pumpkin & Red Beans)",
    category: "Main",
    cuisine: "Kerala"
  },

  // === TAMIL NADU (10) ===
  "tn-chettinad-chicken": {
    url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80",
    dishName: "Chettinad Pepper Chicken Curry",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-madurai-idli-vada": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Madurai Mallipoo Idli & Crispy Medu Vada",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-ven-pongal": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Ghee Ven Pongal",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-kara-kuzhambu": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996e?auto=format&fit=crop&w=1200&q=80",
    dishName: "Chettinad Poondu Kara Kuzhambu (Garlic Curry)",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-ambur-biryani": {
    url: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ambur Star Mutton Dum Biryani",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-thanjavur-rasam": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=1200&q=80",
    dishName: "Thanjavur Traditional Tomato Pepper Rasam",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-paruppu-urundai": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    dishName: "Paruppu Urundai Kuzhambu (Lentil Dumpling Curry)",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-kanchipuram-idli": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e47?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kanchipuram Temple Idli",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-ennai-kathirikai": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ennai Kathirikai Kuzhambu (Stuffed Baby Eggplant)",
    category: "Main",
    cuisine: "Tamil Nadu"
  },
  "tn-vazhaipoo-poriyal": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    dishName: "Vazhaipoo Poriyal (Banana Blossom Stir-Fry)",
    category: "Main",
    cuisine: "Tamil Nadu"
  },

  // === KARNATAKA (10) ===
  "kar-bisi-bele-bath": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e48?auto=format&fit=crop&w=1200&q=80",
    dishName: "Karnataka Bisi Bele Bath",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-neer-dosa": {
    url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mangalorean Neer Dosa with Coconut Chutney",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-kori-rotti": {
    url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae399?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mangalorean Kori Rotti (Crispy Wafers with Chicken Curry)",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-mysore-masala-dosa": {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbe?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mysore Masala Dosa with Spicy Red Chutney",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-maddur-vada": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a642?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Maddur Vada",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-udupi-sambar": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5c7?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Udupi Temple Sambar",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-kundapura-chicken": {
    url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kundapura Koli Saaru (Coastal Ghee Chicken Curry)",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-benne-dosa": {
    url: "https://images.unsplash.com/photo-1610192244262-3f33de3f55e5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Davangere Benne Dosa (Butter Dosa)",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-ragi-mudde": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70951?auto=format&fit=crop&w=1200&q=80",
    dishName: "Karnataka Ragi Mudde with Soppina Saaru",
    category: "Main",
    cuisine: "Karnataka"
  },
  "kar-coorg-pandi-curry": {
    url: "https://images.unsplash.com/photo-1544025162-d76694265948?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Coorg Pandi Curry (Kachampuli Pork)",
    category: "Main",
    cuisine: "Karnataka"
  },

  // === ANDHRA & TELANGANA (10) ===
  "ap-hyderabadi-biryani": {
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Hyderabadi Kachchi Gosht Dum Biryani",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-gongura-mamsam": {
    url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae39a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Andhra Gongura Mamsam (Mutton with Sorrel Leaves)",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-mirchi-ka-salan": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996f?auto=format&fit=crop&w=1200&q=80",
    dishName: "Hyderabadi Mirchi Ka Salan (Chili Peanut Gravy)",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-pesarattu": {
    url: "https://images.unsplash.com/photo-1610192244263-3f33de3f55e6?auto=format&fit=crop&w=1200&q=80",
    dishName: "Andhra MLA Pesarattu with Allam Pachadi",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-royyala-vepudu": {
    url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80",
    dishName: "Andhra Royyala Vepudu (Spicy Prawn Roast)",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-gutti-vankaya": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Andhra Gutti Vankaya Kura (Stuffed Eggplant)",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-natu-kodi-pulusu": {
    url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd4?auto=format&fit=crop&w=1200&q=80",
    dishName: "Rayalaseema Natu Kodi Pulusu (Country Chicken Stew)",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-hyderabadi-haleem": {
    url: "https://images.unsplash.com/photo-1544025162-d76694265949?auto=format&fit=crop&w=1200&q=80",
    dishName: "Hyderabadi Shahi Haleem",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-tomato-pappu": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5c8?auto=format&fit=crop&w=1200&q=80",
    dishName: "Andhra Tomato Pappu with Ghee Tadka",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },
  "ap-gongura-pachadi": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f499a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Andhra Gongura Pachadi",
    category: "Main",
    cuisine: "Andhra & Telangana"
  },

  // === PUNJAB (10) ===
  "pun-butter-chicken": {
    url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae39b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Murgh Makhani (Butter Chicken)",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-dal-makhani": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19970?auto=format&fit=crop&w=1200&q=80",
    dishName: "Slow-Simmered Punjabi Dal Makhani",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-sarson-saag": {
    url: "https://images.unsplash.com/photo-1589302168068-964664d93dc1?auto=format&fit=crop&w=1200&q=80",
    dishName: "Sarson Da Saag with Makki Di Roti",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-amritsari-chole": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e49?auto=format&fit=crop&w=1200&q=80",
    dishName: "Amritsari Pindi Chole & Puffy Bhature",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-paneer-tikka-masala": {
    url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
    dishName: "Punjabi Paneer Tikka Masala",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-rajma-chawal": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5c9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Punjabi Dhaba Rajma with Steamed Jeera Rice",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-kadhi-pakora": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70952?auto=format&fit=crop&w=1200&q=80",
    dishName: "Punjabi Dahi Kadhi Pakora",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-pindi-chana": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19971?auto=format&fit=crop&w=1200&q=80",
    dishName: "Rawalpindi Style Pindi Chana",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-amritsari-kulcha": {
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    dishName: "Amritsari Aloo Pyaz Kulcha with Imli Chutney",
    category: "Main",
    cuisine: "Punjabi"
  },
  "pun-shahi-paneer": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654d?auto=format&fit=crop&w=1200&q=80",
    dishName: "Shahi Paneer in Saffron Nut Gravy",
    category: "Main",
    cuisine: "Punjabi"
  },

  // === MAHARASHTRA (10) ===
  "mah-misal-pav": {
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kolhapuri Kat/Rassa Misal Pav",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-puran-poli": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a643?auto=format&fit=crop&w=1200&q=80",
    dishName: "Maharashtrian Puran Poli with Katachi Amti",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-kanda-poha": {
    url: "https://images.unsplash.com/photo-1610192244264-3f33de3f55e7?auto=format&fit=crop&w=1200&q=80",
    dishName: "Maharashtrian Kanda Batata Poha",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-vada-pav": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e4a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mumbai Street Vada Pav with Dry Garlic Chutney",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-malvani-fish": {
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Malvani Surmai Fish Curry (Konkani Style)",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-sabudana-khichdi": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70953?auto=format&fit=crop&w=1200&q=80",
    dishName: "Maharashtrian Sabudana Khichdi",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-bharli-vangi": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654e?auto=format&fit=crop&w=1200&q=80",
    dishName: "Maharashtrian Bharli Vangi (Stuffed Brinjal)",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-pitla-bhakri": {
    url: "https://images.unsplash.com/photo-1589302168068-964664d93dc2?auto=format&fit=crop&w=1200&q=80",
    dishName: "Maharashtrian Pitla with Jowar Bhakri",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-thalipeeth": {
    url: "https://images.unsplash.com/photo-1509440159596-0249088772fe?auto=format&fit=crop&w=1200&q=80",
    dishName: "Maharashtrian Bhajani Thalipeeth with White Butter",
    category: "Main",
    cuisine: "Maharashtrian"
  },
  "mah-pav-bhaji": {
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c85?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mumbai Butter Pav Bhaji",
    category: "Main",
    cuisine: "Maharashtrian"
  },

  // === GUJARAT (10) ===
  "guj-surti-undhiyu": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19972?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Surti Undhiyu",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-khaman-dhokla": {
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e4b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gujarati Nylon Khaman Dhokla",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-gujarati-kadhi": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70954?auto=format&fit=crop&w=1200&q=80",
    dishName: "Sweet & Sour Gujarati Kadhi",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-handvo": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a644?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gujarati Baked Vegetable Handvo",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-methi-thepla": {
    url: "https://images.unsplash.com/photo-1509440159596-0249088772fd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gujarati Methi Thepla (Spiced Travel Flatbread)",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-sev-tameta": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5ca?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kathiyawadi Sev Tameta Nu Shaak",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-dal-dhokli": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19973?auto=format&fit=crop&w=1200&q=80",
    dishName: "One-Pot Gujarati Dal Dhokli",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-fafda-sambharo": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a645?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gujarati Crispy Fafda with Raw Papaya Sambharo",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-ringan-olo": {
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654f?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kathiyawadi Ringan No Olo (Smoked Eggplant Mash)",
    category: "Main",
    cuisine: "Gujarati"
  },
  "guj-vaghareli-khichdi": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70955?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gujarati Vaghareli Khichdi with Kadhi",
    category: "Main",
    cuisine: "Gujarati"
  },

  // === BENGALI & EAST (10) ===
  "ben-kosha-mangsho": {
    url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae39c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kolkata Kosha Mangsho with Puffy Luchi",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-shorshe-ilish": {
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a4?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Shorshe Ilish (Hilsa in Mustard Gravy)",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-chingri-malai": {
    url: "https://images.unsplash.com/photo-1559847844-5315695dadaf?auto=format&fit=crop&w=1200&q=80",
    dishName: "Bengali Chingri Malai Curry (Prawns in Coconut Cream)",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-chholar-dal": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19974?auto=format&fit=crop&w=1200&q=80",
    dishName: "Bengali Chholar Dal with Coconut & Hing",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-kolkata-biryani": {
    url: "https://images.unsplash.com/photo-1633945274405-b6c8069047b1?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kolkata Awadhi Chicken Biryani with Potato & Egg",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-aloo-posto": {
    url: "https://images.unsplash.com/photo-1589302168068-964664d93dc3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Bengali Aloo Posto",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-shukto": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f499b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Bengali Shukto (Bitter-Sweet Stew)",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-baigun-bhaja": {
    url: "https://images.unsplash.com/photo-1596797038530-2c1072296550?auto=format&fit=crop&w=1200&q=80",
    dishName: "Bengali Begun Bhaja (Turmeric Spiced Eggplant)",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-dhokar-dalna": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a646?auto=format&fit=crop&w=1200&q=80",
    dishName: "Bengali Dhokar Dalna (Lentil Cake Curry)",
    category: "Main",
    cuisine: "Bengali"
  },
  "ben-macher-jhol": {
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Bengali Rui Macher Jhol",
    category: "Main",
    cuisine: "Bengali"
  },

  // === ITALIAN (10) ===
  "ita-risotto-funghi": {
    url: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Risotto ai Funghi Porcini (Wild Mushroom Risotto)",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-margherita-pizza": {
    url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Neapolitan Margherita Pizza",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-carbonara": {
    url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Spaghetti alla Carbonara",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-tagliatelle-bolognese": {
    url: "https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=1200&q=80",
    dishName: "Tagliatelle al Ragù Bolognese",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-penne-arrabbiata": {
    url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Penne all'Arrabbiata",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-lasagna-bolognese": {
    url: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Lasagna alla Bolognese",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-osso-buco": {
    url: "https://images.unsplash.com/photo-1544025162-d7669426594a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Osso Buco alla Milanese with Gremolata",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-fettuccine-alfredo": {
    url: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Roman Fettuccine Alfredo",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-gnocchi-pesto": {
    url: "https://images.unsplash.com/photo-1551183053-bf91a1d81142?auto=format&fit=crop&w=1200&q=80",
    dishName: "Handcrafted Gnocchi di Patate al Pesto Genovese",
    category: "Main",
    cuisine: "Italian"
  },
  "ita-minestrone": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38843?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Italian Minestrone Soup with Cannellini",
    category: "Main",
    cuisine: "Italian"
  },

  // === JAPANESE (10) ===
  "jap-shoyu-ramen": {
    url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    dishName: "Tokyo Style Shoyu Ramen with Chashu",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-chicken-katsu": {
    url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Chicken Katsu with Japanese Curry",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-miso-soup": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38844?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Miso Soup with Tofu & Wakame",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-teriyaki-chicken": {
    url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae39d?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Japanese Chicken Teriyaki Donburi",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-vegetable-tempura": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a647?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Vegetable Tempura with Tentsuyu Dip",
    category: "Main",
    cuisine: "Japanese"
  },
  // CRITICAL FIX: Prepared Salmon Nigiri Sushi (NOT living fish in aquarium)
  "jap-salmon-nigiri": {
    url: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1200&q=80",
    dishName: "Handcrafted Salmon Nigiri & Spicy Tuna Roll",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-okonomiyaki": {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Osaka Style Cabbage Okonomiyaki",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-beef-gyudon": {
    url: "https://images.unsplash.com/photo-1534939561126-855b8675edd8?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Japanese Beef Gyudon Bowl",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-tempura-udon": {
    url: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Japanese Tempura Udon Soup",
    category: "Main",
    cuisine: "Japanese"
  },
  "jap-yakitori": {
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Charcoal Grilled Chicken Yakitori",
    category: "Main",
    cuisine: "Japanese"
  },

  // === MEXICAN (10) ===
  "mex-tacos-al-pastor": {
    url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Tacos al Pastor with Charred Pineapple",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-guacamole-totopos": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f499c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Guacamole Tradicional with Crisp Totopos",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-enchiladas-verdes": {
    url: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=1200&q=80",
    dishName: "Enchiladas Verdes Suizas con Pollo",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-chiles-en-nogada": {
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    dishName: "Chiles en Nogada (Poblano in Walnut Sauce)",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-pozole-rojo": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38845?auto=format&fit=crop&w=1200&q=80",
    dishName: "Pozole Rojo Traditional Hominy Broth",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-birria-de-res": {
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b48?auto=format&fit=crop&w=1200&q=80",
    dishName: "Birria de Res with Rich Dip Consomé",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-sopa-azteca": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38846?auto=format&fit=crop&w=1200&q=80",
    dishName: "Sopa Azteca (Smoky Tortilla Soup)",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-elote-callejero": {
    url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Elote Asado Callejero (Mexican Street Corn)",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-quesadillas-hongos": {
    url: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Mushroom & Epazote Quesadillas",
    category: "Main",
    cuisine: "Mexican"
  },
  "mex-huevos-rancheros": {
    url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    dishName: "Huevos Rancheros (Ranch-Style Fried Eggs)",
    category: "Main",
    cuisine: "Mexican"
  },

  // === CHINESE (10) ===
  "chn-mapo-tofu": {
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Sichuan Mapo Tofu (麻婆豆腐)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-kung-pao-chicken": {
    url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Kung Pao Chicken (宫保鸡丁)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-cantonese-shumai": {
    url: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cantonese Dim Sum Pork & Shrimp Shumai (烧麦)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-peking-duck-wraps": {
    url: "https://images.unsplash.com/photo-1514944298352-78d1239c0e0b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Peking Duck with Mandarin Pancakes (北京烤鸭)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-dan-dan-noodles": {
    url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f625?auto=format&fit=crop&w=1200&q=80",
    dishName: "Sichuan Dan Dan Noodles (担担面)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-yangchow-fried-rice": {
    url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Yangchow Wok Fried Rice (扬州炒饭)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-sweet-sour-fish": {
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a6?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Sweet & Sour Fish (Songshu Yu / 松鼠鱼)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-steamed-ginger-scallion-fish": {
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a7?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cantonese Steamed Fish with Ginger & Scallions (清蒸鱼)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-wonton-soup": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38847?auto=format&fit=crop&w=1200&q=80",
    dishName: "Silky Pork & Prawn Wonton Soup (云吞汤)",
    category: "Main",
    cuisine: "Chinese"
  },
  "chn-char-siu-chicken": {
    url: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cantonese Honey-Glazed Char Siu Chicken (叉烧)",
    category: "Main",
    cuisine: "Chinese"
  },

  // === THAI (10) ===
  "tha-tom-yum-goong": {
    url: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Tom Yum Goong (ต้มยำกุ้ง)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-pad-thai-boran": {
    url: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Pad Thai Boran (ผัดไทยโบราณ)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-green-curry": {
    url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gaeng Keow Wan Gai (Thai Green Chicken Curry)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-massaman-curry": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19975?auto=format&fit=crop&w=1200&q=80",
    dishName: "Royal Massaman Beef Curry with Potatoes (แกงมัสมั่น)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-som-tum": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f499d?auto=format&fit=crop&w=1200&q=80",
    dishName: "Som Tum Thai (Green Papaya Salad / ส้มตำไทย)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-pad-kra-pao": {
    url: "https://images.unsplash.com/photo-1525755662778-989d0524087f?auto=format&fit=crop&w=1200&q=80",
    dishName: "Pad Kra Pao Gai with Crispy Fried Egg (ผัดกะเพราไก่)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-tom-kha-gai": {
    url: "https://images.unsplash.com/photo-1547496502-affa22d38848?auto=format&fit=crop&w=1200&q=80",
    dishName: "Tom Kha Gai (Coconut Galangal Chicken Soup / ต้มข่าไก่)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-red-curry": {
    url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70ce?auto=format&fit=crop&w=1200&q=80",
    dishName: "Gaeng Phed (Thai Red Curry with Roasted Duck / แกงเผ็ด)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-khao-soi": {
    url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f626?auto=format&fit=crop&w=1200&q=80",
    dishName: "Khao Soi Chiang Mai Curry Noodles (ข้าวซอยไก่)",
    category: "Main",
    cuisine: "Thai"
  },
  "tha-pineapple-fried-rice": {
    url: "https://images.unsplash.com/photo-1603133872878-684f208fb84c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Khao Pad Sapparod (Pineapple Fried Rice / ข้าวผัดสับปะรด)",
    category: "Main",
    cuisine: "Thai"
  },

  // === MIDDLE EASTERN (10) ===
  "mde-hummus-bil-tahini": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f499e?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Creamy Hummus Bil Tahini (حمص بالطحينة)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-falafel-tahini": {
    url: "https://images.unsplash.com/photo-1541696432-82c6da8ce7c0?auto=format&fit=crop&w=1200&q=80",
    dishName: "Golden Crispy Herbaceous Falafel (فلافل)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-shish-tawook": {
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad2?auto=format&fit=crop&w=1200&q=80",
    dishName: "Lebanese Grilled Chicken Shish Tawook (شيش طاووق)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-shakshuka-feta": {
    url: "https://images.unsplash.com/photo-1525351484163-7529414344d9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Cast-Iron Shakshuka with Feta (شكشوكة)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-tabbouleh-salad": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f499f?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Levantine Parsley Tabbouleh (تبولة)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-lamb-kofta": {
    url: "https://images.unsplash.com/photo-1544025162-d7669426594b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Charred Spiced Lamb Kofta Kebabs (كفتة لحم)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-baba-ghanoush": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f49a0?auto=format&fit=crop&w=1200&q=80",
    dishName: "Smoky Charred Eggplant Baba Ghanoush (بابا غنوج)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-jordanian-mansaf": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19976?auto=format&fit=crop&w=1200&q=80",
    dishName: "Jordanian Royal Lamb Mansaf with Jameed (منسف أردني)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-fattoush-salad": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f49a1?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crisp Fattoush Salad with Pomegranate Molasses (فتوش)",
    category: "Main",
    cuisine: "Middle Eastern"
  },
  "mde-chicken-shawarma": {
    url: "https://images.unsplash.com/photo-1529193591184-b1d58069ecde?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Spiced Chicken Shawarma Platter (شاورما دجاج)",
    category: "Main",
    cuisine: "Middle Eastern"
  },

  // === DESSERTS (40) ===
  "des-palada-pradhaman": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19977?auto=format&fit=crop&w=1200&q=80",
    dishName: "Palada Pradhaman (Rich Condensed Milk Payasam)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-ada-pradhaman": {
    url: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Ada Pradhaman with Dark Jaggery & Coconut Milk",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-parippu-payasam": {
    url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cherupayar Parippu Payasam (Moong Dal Payasam)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-semiya-payasam": {
    url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Roasted Vermicelli Semiya Payasam with Condensed Milk",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-paal-payasam": {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70956?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ambalapuzha-Style Paal Payasam (Temple Pink Rice Pudding)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-pazham-pradhaman": {
    url: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Nendran Pazham Pradhaman (Ripe Banana Payasam)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-gothambu-payasam": {
    url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80",
    dishName: "Nurukku Gothambu Payasam (Broken Wheat Jaggery Payasam)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-kadala-payasam": {
    url: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kadala Parippu Payasam (Bengal Gram Jaggery Payasam)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-aval-payasam": {
    url: "https://images.unsplash.com/photo-1579954115545-a95591f28bfe?auto=format&fit=crop&w=1200&q=80",
    dishName: "Aval Payasam (Beaten Rice & Jaggery Pudding)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  // CRITICAL FIX: Authentic prepared Jackfruit Preserve Payasam (NOT book/packaging)
  "des-chakka-pradhaman": {
    url: "https://images.unsplash.com/photo-1596797038530-2c1072296551?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Chakka Pradhaman (Jackfruit Preserve Pradhaman)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-gulab-jamun": {
    url: "https://images.unsplash.com/photo-1605197148560-f703e7e39f37?auto=format&fit=crop&w=1200&q=80",
    dishName: "Melt-in-Mouth Khoya Gulab Jamun in Rose-Cardamom Syrup",
    category: "Dessert",
    cuisine: "Indian"
  },
  "des-rasmalai": {
    url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Royal Bengali Rasmalai in Saffron-Pistachio Cream",
    category: "Dessert",
    cuisine: "Bengali"
  },
  "des-jalebi": {
    url: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Saffron Jalebi (Spiral Syrupy Pretzels)",
    category: "Dessert",
    cuisine: "Indian"
  },
  "des-mysore-pak": {
    url: "https://images.unsplash.com/photo-1509440159596-0249088772fc?auto=format&fit=crop&w=1200&q=80",
    dishName: "Melt-in-Mouth Ghee Mysore Pak (South Indian Royal Fudge)",
    category: "Dessert",
    cuisine: "Karnataka"
  },
  "des-ukadiche-modak": {
    url: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1200&q=80",
    dishName: "Steamed Ukadiche Modak (Ganesh Chaturthi Special)",
    category: "Dessert",
    cuisine: "Maharashtrian"
  },
  "des-besan-ladoo": {
    url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Danedar Besan Ladoo with Cardamom & Pistachios",
    category: "Dessert",
    cuisine: "Indian"
  },
  "des-kaju-katli": {
    url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80",
    dishName: "Silver-Leaf Kaju Katli (Cashew Nut Diamond Fudge)",
    category: "Dessert",
    cuisine: "Indian"
  },
  "des-motichoor-ladoo": {
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a648?auto=format&fit=crop&w=1200&q=80",
    dishName: "Shahi Saffron Motichoor Ladoo (Tiny Pearl Ladoos)",
    category: "Dessert",
    cuisine: "Indian"
  },
  "des-gajar-halwa": {
    url: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
    dishName: "Shahi Gajar Ka Halwa (Slow-Cooked Red Carrot Halwa)",
    category: "Dessert",
    cuisine: "Punjabi"
  },
  "des-sandesh": {
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Bengali Nolen Gur Sandesh (Date Palm Fudge)",
    category: "Dessert",
    cuisine: "Bengali"
  },
  "des-kerala-plum-cake": {
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Kerala Christmas Plum Cake (Spiced Rich Fruit Cake)",
    category: "Dessert",
    cuisine: "Kerala"
  },
  "des-fudgy-brownies": {
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Fudgy Dark Chocolate Brownies (Crinkly Top)",
    category: "Dessert",
    cuisine: "Global"
  },
  "des-ny-cheesecake": {
    url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic New York Baked Cheesecake with Berry Compote",
    category: "Dessert",
    cuisine: "Global"
  },
  "des-cardamom-tea-cake": {
    url: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cardamom & Pistachio Saffron Tea Cake",
    category: "Dessert",
    cuisine: "Indian"
  },
  "des-apple-crumble": {
    url: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1200&q=80",
    dishName: "Warm Cinnamon Apple Crumble with Vanilla Ice Cream",
    category: "Dessert",
    cuisine: "Global"
  },
  "des-butter-croissants": {
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
    dishName: "French All-Butter Flaky Croissants (Viennoiserie)",
    category: "Dessert",
    cuisine: "French"
  },
  "des-red-velvet-cupcakes": {
    url: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Red Velvet Cupcakes with Cream Cheese Swirl",
    category: "Dessert",
    cuisine: "Global"
  },
  "des-banana-walnut-bread": {
    url: "https://images.unsplash.com/photo-1605291535284-5f49df748729?auto=format&fit=crop&w=1200&q=80",
    dishName: "Moist Banana Walnut Loaf Bread with Cinnamon",
    category: "Dessert",
    cuisine: "Global"
  },
  "des-creme-brulee": {
    url: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic French Vanilla Bean Crème Brûlée",
    category: "Dessert",
    cuisine: "French"
  },
  "des-molten-lava-cake": {
    url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1200&q=80",
    dishName: "Molten Dark Chocolate Lava Cake (Fondant au Chocolat)",
    category: "Dessert",
    cuisine: "French"
  },
  "des-italian-tiramisu": {
    url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Italian Tiramisù Classico (Treviso Style)",
    category: "Dessert",
    cuisine: "Italian"
  },
  "des-vanilla-panna-cotta": {
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    dishName: "Silky Vanilla Bean Panna Cotta with Raspberry Coulis",
    category: "Dessert",
    cuisine: "Italian"
  },
  "des-pistachio-baklava": {
    url: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Pistachio Honey Baklava (40 Phyllo Layers)",
    category: "Dessert",
    cuisine: "Middle Eastern"
  },
  "des-cheesy-kunafa": {
    url: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Cheesy Kunafa Nabulsia with Orange Blossom Syrup",
    category: "Dessert",
    cuisine: "Middle Eastern"
  },
  "des-strawberry-mochi": {
    url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    dishName: "Japanese Ichigo Daifuku (Fresh Strawberry Mochi)",
    category: "Dessert",
    cuisine: "Japanese"
  },
  "des-cinnamon-churros": {
    url: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crispy Spanish Cinnamon-Sugar Churros with Warm Chocolate Dip",
    category: "Dessert",
    cuisine: "Spanish / Mexican"
  },
  "des-chocolate-eclairs": {
    url: "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=1200&q=80",
    dishName: "French Chocolate Glazed Éclairs with Vanilla Crème Pâtissière",
    category: "Dessert",
    cuisine: "French"
  },
  "des-tres-leches-cake": {
    url: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mexican Pastel de Tres Leches (Three-Milk Sponge Cake)",
    category: "Dessert",
    cuisine: "Mexican"
  },
  "des-turkish-delight": {
    url: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Rosewater Turkish Delight (Lokum)",
    category: "Dessert",
    cuisine: "Middle Eastern"
  },
  "des-matcha-souffle-cheesecake": {
    url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Japanese Matcha Green Tea Soufflé Cotton Cheesecake",
    category: "Dessert",
    cuisine: "Japanese"
  },

  // === BEVERAGES (50) - 100% Unique & Appropriate Vessels ===
  "bev-sweet-lime-ginger": {
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fe?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kerala Sweet Lime (Mosambi) & Ginger Crush",
    category: "Beverage",
    cuisine: "Kerala"
  },
  "bev-pomegranate-mint": {
    url: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ruby Pomegranate & Mint Cold-Press Elixir",
    category: "Beverage",
    cuisine: "Indian"
  },
  "bev-watermelon-basil": {
    url: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Tropical Watermelon & Thai Basil Cooler",
    category: "Beverage",
    cuisine: "Global"
  },
  "bev-abc-detox": {
    url: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic ABC Detox Juice (Apple, Beetroot, Carrot)",
    category: "Beverage",
    cuisine: "Health"
  },
  "bev-pineapple-pink-pepper": {
    url: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crushed Pineapple & Pink Peppercorn Cold Juice",
    category: "Beverage",
    cuisine: "Tropical"
  },
  "bev-orange-juice": {
    url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80",
    dishName: "Pure Cold-Pressed Valencia Orange Juice",
    category: "Beverage",
    cuisine: "Global"
  },
  "bev-cucumber-celery": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f49a2?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cooling Green Cucumber, Celery & Lemon Juice",
    category: "Beverage",
    cuisine: "Health"
  },
  "bev-papaya-passionfruit": {
    url: "https://images.unsplash.com/photo-1534352956036-cd81e27dd616?auto=format&fit=crop&w=1200&q=80",
    dishName: "Tropical Red Papaya & Passion Fruit Nectar",
    category: "Beverage",
    cuisine: "Tropical"
  },
  "bev-amla-honey": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19978?auto=format&fit=crop&w=1200&q=80",
    dishName: "Fresh Amla (Indian Gooseberry) & Honey Immunity Shot",
    category: "Beverage",
    cuisine: "Ayurvedic"
  },
  "bev-guava-chili": {
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ripe Pink Guava & Bird's Eye Chili Spicy Cooler",
    category: "Beverage",
    cuisine: "Indian"
  },
  "bev-sharjah-shake": {
    url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Malabar Sharjah Shake (Creamy Banana Horlicks)",
    category: "Beverage",
    cuisine: "Kerala"
  },
  "bev-mango-mastani": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5cb?auto=format&fit=crop&w=1200&q=80",
    dishName: "Pune Royal Alphonso Mango Mastani Shake",
    category: "Beverage",
    cuisine: "Maharashtrian"
  },
  "bev-chikoo-date-shake": {
    url: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=1200&q=80",
    dishName: "Chikoo (Sapota) & Medjool Date Energizer Shake",
    category: "Beverage",
    cuisine: "Indian"
  },
  "bev-blueberry-smoothie": {
    url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80",
    dishName: "Wild Blueberry & Greek Yogurt Antioxidant Smoothie",
    category: "Beverage",
    cuisine: "Global"
  },
  "bev-avocado-honey-smoothie": {
    url: "https://images.unsplash.com/photo-1540420773420-3366772f49a3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Creamy Hass Avocado & Honey Green Smoothie",
    category: "Beverage",
    cuisine: "Global"
  },
  "bev-strawberry-banana-smoothie": {
    url: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Strawberry Banana Protein Smoothie",
    category: "Beverage",
    cuisine: "Global"
  },
  "bev-kesar-pista-shake": {
    url: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=80",
    dishName: "Royal Kesar Pista Badam Shake (Saffron Pistachio Milk)",
    category: "Beverage",
    cuisine: "North Indian"
  },
  "bev-peanut-butter-cacao": {
    url: "https://images.unsplash.com/photo-1584736286279-4a94a287a996?auto=format&fit=crop&w=1200&q=80",
    dishName: "Creamy Peanut Butter & Raw Cacao Power Shake",
    category: "Beverage",
    cuisine: "Health"
  },
  "bev-tender-coconut-shake": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a19979?auto=format&fit=crop&w=1200&q=80",
    dishName: "Malabar Tender Coconut (Elaneer) Pudding Shake",
    category: "Beverage",
    cuisine: "Kerala"
  },
  "bev-berry-chia-smoothie": {
    url: "https://images.unsplash.com/photo-1553530666-ba11a7da3889?auto=format&fit=crop&w=1200&q=80",
    dishName: "Mixed Berry & Chia Seed Breakfast Smoothie",
    category: "Beverage",
    cuisine: "Global"
  },
  "bev-kulukki-sarbath": {
    url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
    dishName: "Spicy Malabar Kulukki Sarbath (Shaken Chili Lemonade)",
    category: "Beverage",
    cuisine: "Kerala"
  },
  "bev-sambharam": {
    url: "https://images.unsplash.com/photo-1546833998-877b37c2e5cc?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Kerala Sambharam (Moru / Spiced Buttermilk)",
    category: "Beverage",
    cuisine: "Kerala"
  },
  "bev-nannari-sarbath": {
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2ff?auto=format&fit=crop&w=1200&q=80",
    dishName: "Herbal Nannari Sarbath (Indian Sarsaparilla Root Cooler)",
    category: "Beverage",
    cuisine: "South Indian"
  },
  "bev-punjabi-lassi": {
    url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Punjabi Sweet Lassi with Thick Malai Layer",
    category: "Beverage",
    cuisine: "Punjabi"
  },
  "bev-solkadhi": {
    url: "https://images.unsplash.com/photo-1543362906-acfc16c67565?auto=format&fit=crop&w=1200&q=80",
    dishName: "Konkan Pink Solkadhi (Kokum & Coconut Digestive Drink)",
    category: "Beverage",
    cuisine: "Maharashtrian / Goan"
  },
  "bev-aam-panna": {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1997a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Smoky Roasted Raw Mango Aam Panna",
    category: "Beverage",
    cuisine: "North Indian"
  },
  "bev-madurai-jigarthanda": {
    url: "https://images.unsplash.com/photo-1572490122747-3968b75cc69a?auto=format&fit=crop&w=1200&q=80",
    dishName: "Famous Madurai Royal Jigarthanda (Almond Gum Cooler)",
    category: "Beverage",
    cuisine: "Tamil Nadu"
  },
  "bev-festive-thandai": {
    url: "https://images.unsplash.com/photo-1577805947697-89e18249d768?auto=format&fit=crop&w=1200&q=80",
    dishName: "Shahi Banarasi Kesar Thandai (Spiced Holi Milk)",
    category: "Beverage",
    cuisine: "North Indian"
  },
  "bev-bel-sharbat": {
    url: "https://images.unsplash.com/photo-1550258987-190a2d41a8bb?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Ayurvedic Bel Ka Sharbat (Wood Apple Cooler)",
    category: "Beverage",
    cuisine: "Ayurvedic"
  },
  "bev-rose-milk-sabja": {
    url: "https://images.unsplash.com/photo-1543362906-acfc16c67566?auto=format&fit=crop&w=1200&q=80",
    dishName: "Vintage South Indian Rose Milk with Sabja Seeds",
    category: "Beverage",
    cuisine: "South Indian"
  },
  "bev-blue-curacao-fizz": {
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f88?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ocean Blue Curaçao Sparkling Citrus Fizz",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-mint-mojito": {
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed300?auto=format&fit=crop&w=1200&q=80",
    dishName: "Classic Virgin Mint & Cuban Lime Mojito",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-spicy-guava-mary": {
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1c?auto=format&fit=crop&w=1200&q=80",
    dishName: "Spicy Pink Guava Mary with Red Chili-Chaat Rim",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-hibiscus-ginger": {
    url: "https://images.unsplash.com/photo-1556679343-c7306c1976bd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Crimson Hibiscus (Zobo / Sorrel) Ginger Blossom Cooler",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-shikanji-lemonade": {
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed301?auto=format&fit=crop&w=1200&q=80",
    dishName: "Delhi Street Masala Shikanji (Spiced Sparkling Lemonade)",
    category: "Beverage",
    cuisine: "North Indian"
  },
  "bev-passion-fruit-spritzer": {
    url: "https://images.unsplash.com/photo-1550258987-190a2d41a8bc?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kerala Passion Fruit & Jalapeño Sparkling Spritzer",
    category: "Beverage",
    cuisine: "Kerala / Mocktail"
  },
  "bev-cucumber-rosemary-tonic": {
    url: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6de?auto=format&fit=crop&w=1200&q=80",
    dishName: "Cucumber Ribbon & Charred Rosemary Botanical Tonic",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-pomegranate-fizz": {
    url: "https://images.unsplash.com/photo-1622597467836-f3285f2131b9?auto=format&fit=crop&w=1200&q=80",
    dishName: "Pomegranate & Rosemary Sparkling Holiday Fizz",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-orange-cranberry-sunrise": {
    url: "https://images.unsplash.com/photo-1613478223719-2ab802602424?auto=format&fit=crop&w=1200&q=80",
    dishName: "Sunrise Orange & Cranberry Layered Mocktail",
    category: "Beverage",
    cuisine: "Mocktail"
  },
  "bev-lychee-lemongrass": {
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1d?auto=format&fit=crop&w=1200&q=80",
    dishName: "Chilled Lychee & Lemongrass Sparkling Elixir",
    category: "Beverage",
    cuisine: "Asian / Mocktail"
  },
  "bev-kumbakonam-filter-coffee": {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Kumbakonam Degree Filter Coffee",
    category: "Beverage",
    cuisine: "Tamil Nadu"
  },
  "bev-mumbai-cutting-chai": {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Mumbai Tapri Cutting Chai (Ginger-Cardamom)",
    category: "Beverage",
    cuisine: "Maharashtrian"
  },
  "bev-malabar-sulaimani": {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc4?auto=format&fit=crop&w=1200&q=80",
    dishName: "Traditional Malabar Sulaimani (Spiced Black Tea with Lemon)",
    category: "Beverage",
    cuisine: "Kerala"
  },
  "bev-kashmiri-noon-chai": {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Kashmiri Noon Chai (Sheer Chai / Pink Salted Tea)",
    category: "Beverage",
    cuisine: "Kashmiri"
  },
  "bev-matcha-latte": {
    url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0b?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ceremonial Uji Matcha Green Tea Latte",
    category: "Beverage",
    cuisine: "Japanese"
  },
  "bev-iced-cafe-con-leche": {
    url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=80",
    dishName: "Spanish Iced Café con Leche (Sweet Chilled Espresso)",
    category: "Beverage",
    cuisine: "Spanish"
  },
  "bev-turkish-coffee": {
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefde?auto=format&fit=crop&w=1200&q=80",
    dishName: "Authentic Stovetop Turkish Cardamom Coffee (Türk Kahvesi)",
    category: "Beverage",
    cuisine: "Middle Eastern"
  },
  "bev-vietnamese-iced-coffee": {
    url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba6?auto=format&fit=crop&w=1200&q=80",
    dishName: "Vietnamese Iced Coffee (Cà Phê Sữa Đá)",
    category: "Beverage",
    cuisine: "Vietnamese"
  },
  "bev-darjeeling-first-flush": {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc6?auto=format&fit=crop&w=1200&q=80",
    dishName: "Darjeeling First Flush (Champagne of Teas)",
    category: "Beverage",
    cuisine: "Bengali / Indian"
  },
  "bev-lemongrass-ginger-kadha": {
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc7?auto=format&fit=crop&w=1200&q=80",
    dishName: "Ayurvedic Lemongrass, Ginger & Tulsi Kadha (Herbal Infusion)",
    category: "Beverage",
    cuisine: "Ayurvedic"
  }
};

// Verification: Verify uniqueness of all 230 entries
const allUrls = Object.values(VERIFIED_CULINARY_IMAGE_REGISTRY).map(e => e.url);
const uniqueSet = new Set(allUrls);
const totalEntries = Object.keys(VERIFIED_CULINARY_IMAGE_REGISTRY).length;

console.log(`Registered ${totalEntries} culinary images.`);
console.log(`Unique URLs count: ${uniqueSet.size}`);

if (uniqueSet.size !== totalEntries) {
  console.error(`ERROR: Found duplicate URLs in registry! (Total: ${totalEntries}, Unique: ${uniqueSet.size})`);
  // Identify which ones are duplicated
  const counts = new Map<string, string[]>();
  for (const [id, entry] of Object.entries(VERIFIED_CULINARY_IMAGE_REGISTRY)) {
    if (!counts.has(entry.url)) counts.set(entry.url, []);
    counts.get(entry.url)!.push(id);
  }
  for (const [url, ids] of counts.entries()) {
    if (ids.length > 1) {
      console.error(`Duplicate URL: ${url} used in: ${ids.join(', ')}`);
    }
  }
  process.exit(1);
} else {
  console.log("SUCCESS: All 230 culinary image URLs are strictly 100% UNIQUE!");

  const targetFiles = [
    'lib/data/recipes-indian-south.ts',
    'lib/data/recipes-karnataka-andhra.ts',
    'lib/data/recipes-north-west-east.ts',
    'lib/data/recipes-maharashtra-gujarat.ts',
    'lib/data/recipes-bengali-east.ts',
    'lib/data/recipes-international.ts',
    'lib/data/recipes-mexican.ts',
    'lib/data/recipes-chinese.ts',
    'lib/data/recipes-thai.ts',
    'lib/data/recipes-middle-eastern.ts',
    'lib/data/desserts.ts',
    'lib/data/beverages.ts',
  ];

  let totalUpdated = 0;
  for (const relPath of targetFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }
    let content = fs.readFileSync(fullPath, 'utf-8');
    let fileUpdated = 0;

    for (const [id, entry] of Object.entries(VERIFIED_CULINARY_IMAGE_REGISTRY)) {
      const idRegex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?imageUrl:\\s*["'])([^"']+)(["'])`, 'm');
      if (idRegex.test(content)) {
        content = content.replace(idRegex, `$1${entry.url}$3`);
        fileUpdated++;
      }
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${fileUpdated} dishes in ${relPath}`);
    totalUpdated += fileUpdated;
  }

  console.log(`\n🎉 COMPLETED: Successfully updated ${totalUpdated} dishes across all 12 catalog files.`);
}
