package com.culinaryverse.ai.data.model

data class Beverage(
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
    val cookTime: Int? = null,
    val servings: Int,
    val imageUrl: String,
    val isHot: Boolean,
    val sweetnessAdjustmentSupported: Boolean,
    val defaultSweetnessLevel: Int = 100,
    val ingredients: List<Ingredient> = emptyList(),
    val instructions: List<InstructionStep> = emptyList(),
    val costPerServing: Int,
    val refrigerationGuidance: String,
    val refrigerationGuidanceMalayalam: String,
    val dietary: List<String> = emptyList()
)

data class BeverageResponse(
    val total: Int,
    val beverages: List<Beverage>
)
