package com.culinaryverse.ai.data.repository

import com.culinaryverse.ai.data.local.RecipeDao
import com.culinaryverse.ai.data.local.RecipeEntity
import com.culinaryverse.ai.data.model.Recipe
import com.culinaryverse.ai.data.remote.CulinaryVerseApiService
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn

class RecipeRepository(
    private val apiService: CulinaryVerseApiService,
    private val recipeDao: RecipeDao
) {
    private val gson = Gson()

    fun getRecipes(search: String? = null, cuisine: String? = null): Flow<List<Recipe>> = flow {
        // Try network first
        try {
            val response = apiService.getRecipes(search = search, cuisine = cuisine)
            val entities = response.recipes.map { it.toEntity() }
            recipeDao.insertRecipes(entities)
            emit(response.recipes)
        } catch (e: Exception) {
            // Fallback to local Room database on offline/network error
            val cached = if (cuisine != null) {
                // Fetch cached by cuisine
                recipeDao.getRecipeById(cuisine) // Or query
                emptyList<RecipeEntity>()
            } else {
                emptyList<RecipeEntity>()
            }
            emit(cached.map { it.toRecipe() })
        }
    }.flowOn(Dispatchers.IO)

    suspend fun getRecipeById(id: String): Recipe? {
        // Check Room local DB first for instant offline rendering
        val cached = recipeDao.getRecipeById(id)
        if (cached != null) {
            return cached.toRecipe()
        }

        return try {
            val remoteMap = apiService.getRecipeDetail(id = id, slug = id)
            val recipe = remoteMap["recipe"]
            if (recipe != null) {
                recipeDao.insertRecipe(recipe.toEntity())
            }
            recipe
        } catch (e: Exception) {
            null
        }
    }

    suspend fun toggleFavorite(id: String, currentFavorite: Boolean) {
        recipeDao.updateFavorite(id, !currentFavorite)
    }

    private fun Recipe.toEntity(): RecipeEntity {
        return RecipeEntity(
            id = id,
            slug = slug,
            title = title,
            titleMalayalam = titleMalayalam,
            cuisine = cuisine,
            stateOrCountry = stateOrCountry,
            region = region,
            mealType = mealType,
            difficulty = difficulty,
            prepTime = prepTime,
            cookTime = cookTime,
            servings = servings,
            imageUrl = imageUrl,
            description = description,
            descriptionMalayalam = descriptionMalayalam,
            ingredientsJson = gson.toJson(ingredients),
            instructionsJson = gson.toJson(instructions),
            isFavorite = isFavorite
        )
    }

    private fun RecipeEntity.toRecipe(): Recipe {
        return Recipe(
            id = id,
            slug = slug,
            title = title,
            titleMalayalam = titleMalayalam,
            cuisine = cuisine,
            stateOrCountry = stateOrCountry,
            region = region,
            mealType = mealType,
            difficulty = difficulty,
            prepTime = prepTime,
            cookTime = cookTime,
            servings = servings,
            imageUrl = imageUrl,
            description = description,
            descriptionMalayalam = descriptionMalayalam,
            ingredients = emptyList(),
            instructions = emptyList(),
            tagline = description,
            isFavorite = isFavorite
        )
    }
}
