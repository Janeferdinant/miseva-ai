# CulinaryVerse AI — Native Android Application

Welcome to the native Android implementation of **CulinaryVerse AI**, developed with **Kotlin and Jetpack Compose (Material 3)**.

## Architecture Highlights

1. **Jetpack Compose Material 3**: Customized liquid-glass design system with translucent glass cards, border glows, and soft elevation shadows across all 6 curated themes:
   - *Emerald Kitchen (Kerala)*
   - *Saffron & Spice (Royal)*
   - *Ocean Mist (Malabar)*
   - *Midnight Gourmet (Dark)*
   - *Rose Quartz (Blush)*
   - *Ivory Luxury (Champagne)*
2. **ViewModel & Repository Architecture**: Clean separation between UI, business logic, and data sources.
3. **Room Database**: Complete offline caching for recipes and favorited items with `@TypeConverters`.
4. **Retrofit Client**: Connects to the shared Next.js backend REST APIs (`/api/recipes`, `/api/desserts`, `/api/beverages`, `/api/table-styling`).
5. **Android Text-to-Speech (TTS)**: Bilingual voice narration in English and Malayalam (`Locale("ml", "IN")` with English fallback).
6. **Screen-Awake Cooking Mode**: Keeps screen on via `FLAG_KEEP_SCREEN_ON` during active cooking sessions with user toggle.
7. **Deep Linking**: Supports both custom URI scheme (`culinaryverse://recipes/{id}`) and Universal Web links (`https://culinaryverse.ai/recipes/{id}`).

---

## Directory Structure

```
android/
├── app/
│   ├── build.gradle.kts
│   ├── proguard-rules.pro
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── res/
│       │   ├── values/ (strings.xml, colors.xml, themes.xml)
│       │   ├── drawable/ (vector assets)
│       │   └── mipmap-anydpi-v26/ (launcher icons)
│       └── java/com/culinaryverse/ai/
│           ├── MainActivity.kt
│           ├── CulinaryVerseApp.kt
│           ├── theme/ (Color.kt, Theme.kt, Type.kt)
│           ├── data/
│           │   ├── model/ (Recipe, Dessert, Beverage, TableStylingConcept, GroceryPrice)
│           │   ├── local/ (RecipeEntity, RecipeDao, CulinaryVerseDatabase)
│           │   ├── remote/ (CulinaryVerseApiService)
│           │   └── repository/ (RecipeRepository)
│           └── ui/
│               ├── navigation/ (Screen, CulinaryNavGraph)
│               ├── components/ (LiquidGlassCard)
│               └── screens/
│                   ├── home/ (HomeScreen)
│                   ├── recipe/ (RecipeDetailScreen)
│                   ├── cooking/ (CookingStudioScreen)
│                   ├── desserts/ (DessertsScreen)
│                   ├── beverages/ (BeveragesScreen)
│                   ├── tablestyling/ (TableStylingScreen)
│                   ├── shopping/ (ShoppingScreen)
│                   └── profile/ (ProfileScreen with Jane Rose branding)
├── gradle/
│   └── libs.versions.toml
├── build.gradle.kts
├── settings.gradle.kts
└── gradle.properties
```

---

## Building and Running

### Prerequisites
- Android Studio Hedgehog, Iguana, Jellyfish, or newer.
- Android SDK Platform 34 (Android 14) installed.
- JDK 17 configured in Android Studio Gradle settings.

### CLI Build Commands
```bash
# Debug APK
./gradlew assembleDebug

# Release AAB for Google Play Console
./gradlew bundleRelease
```

The compiled APK will be generated at:
`app/build/outputs/apk/debug/app-debug.apk`

---

## Testing Deep Links via ADB
```bash
# Custom scheme
adb shell am start -W -a android.intent.action.VIEW -d "culinaryverse://recipes/kerala-sadya-avial" com.culinaryverse.ai

# Web Universal Link
adb shell am start -W -a android.intent.action.VIEW -d "https://culinaryverse.ai/recipes/kerala-sadya-avial" com.culinaryverse.ai
```

---

## Academic Supervision Branding
**Jane Rose**
*Assistant Professor, CSE*
“CulinaryVerse AI — Discover cuisines, learn techniques, style your table, and cook with confidence.”
