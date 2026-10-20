package com.culinaryverse.ai.data.model

data class Dessert(
    val id: String,
    val slug: String,
    val title: String,
    val titleMalayalam: String,
    val tagline: String,
    val description: String,
    val descriptionMalayalam: String,
    val subcategory: String,
    val cuisine: String,
    val difficulty: String,
    val prepTime: Int,
    val cookTime: Int,
    val servings: Int,
    val imageUrl: String,
    val bakingTemperature: BakingTemp? = null,
    val donenessIndicators: List<String> = emptyList(),
    val ingredients: List<Ingredient> = emptyList(),
    val instructions: List<InstructionStep> = emptyList(),
    val costPerServing: Int,
    val storageGuidance: String,
    val storageGuidanceMalayalam: String,
    val dietary: List<String> = emptyList()
)

data class BakingTemp(
    val celsius: Int,
    val fahrenheit: Int
)

data class DessertResponse(
    val total: Int,
    val desserts: List<Dessert>
)
