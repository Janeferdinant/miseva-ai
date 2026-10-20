package com.culinaryverse.ai.data.model

import com.google.gson.annotations.SerializedName

data class Recipe(
    val id: String,
    val slug: String,
    val title: String,
    val titleMalayalam: String,
    val transliteration: String? = null,
    val tagline: String,
    val description: String,
    val descriptionMalayalam: String,
    val cuisine: String,
    val stateOrCountry: String,
    val region: String,
    val mealType: String,
    val dietary: List<String> = emptyList(),
    val difficulty: String,
    val prepTime: Int,
    val cookTime: Int,
    val servings: Int,
    val imageUrl: String,
    val ingredients: List<Ingredient> = emptyList(),
    val instructions: List<InstructionStep> = emptyList(),
    val nutrition: NutritionInfo? = null,
    val foodSafety: FoodSafetyInfo? = null,
    val culturalContext: String? = null,
    val isFavorite: Boolean = false
)

data class Ingredient(
    val name: String,
    val nameMalayalam: String,
    val amount: Double,
    val unit: String,
    val notes: String? = null,
    val category: String? = null
)

data class InstructionStep(
    val stepNumber: Int,
    val title: String,
    val text: String,
    val textMalayalam: String,
    val timerMinutes: Int? = null,
    val tip: String? = null
)

data class NutritionInfo(
    val calories: Int,
    val protein: Int,
    val carbs: Int,
    val fat: Int,
    val fiber: Int
)

data class FoodSafetyInfo(
    val allergens: List<String> = emptyList(),
    val safeStorage: String,
    val safeStorageMalayalam: String,
    val internalTemp: String? = null,
    val handlingTips: String? = null
)

data class RecipeResponse(
    val total: Int,
    val recipes: List<Recipe>
)
