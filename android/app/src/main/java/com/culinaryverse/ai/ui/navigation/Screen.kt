package com.culinaryverse.ai.ui.navigation

sealed class Screen(val route: String, val title: String, val titleMl: String) {
    object Home : Screen("home", "Home", "ഹോം")
    object Explore : Screen("explore", "Cuisines", "സംസ്ഥാനങ്ങൾ")
    object Desserts : Screen("desserts", "Desserts", "മധുരങ്ങൾ")
    object Beverages : Screen("beverages", "Beverages", "പാനീയങ്ങൾ")
    object TableStyling : Screen("table_styling", "Table Styling", "മേശാലങ്കാരം")
    object Shopping : Screen("shopping", "Price Compare", "വിലകൾ")
    object MealPlanner : Screen("meal_planner", "Meal Plan", "പ്ലാനർ")
    object Profile : Screen("profile", "Profile", "പ്രൊഫൈൽ")

    object RecipeDetail : Screen("recipe/{id}", "Recipe", "പാചകക്കുറിപ്പ്") {
        fun createRoute(id: String) = "recipe/$id"
    }

    object CookingStudio : Screen("cooking_studio/{id}", "Cooking Studio", "കുക്കിംഗ് സ്റ്റുഡിയോ") {
        fun createRoute(id: String) = "cooking_studio/$id"
    }
}
