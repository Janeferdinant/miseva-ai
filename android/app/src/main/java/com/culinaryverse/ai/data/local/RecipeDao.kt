package com.culinaryverse.ai.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface RecipeDao {

    @Query("SELECT * FROM cached_recipes ORDER BY cachedAt DESC")
    fun getAllCachedRecipes(): Flow<List<RecipeEntity>>

    @Query("SELECT * FROM cached_recipes WHERE isFavorite = 1")
    fun getFavoriteRecipes(): Flow<List<RecipeEntity>>

    @Query("SELECT * FROM cached_recipes WHERE id = :id OR slug = :id LIMIT 1")
    suspend fun getRecipeById(id: String): RecipeEntity?

    @Query("SELECT * FROM cached_recipes WHERE cuisine = :cuisine")
    fun getRecipesByCuisine(cuisine: String): Flow<List<RecipeEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecipes(recipes: List<RecipeEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecipe(recipe: RecipeEntity)

    @Query("UPDATE cached_recipes SET isFavorite = :isFavorite WHERE id = :id")
    suspend fun updateFavorite(id: String, isFavorite: Boolean)

    @Query("DELETE FROM cached_recipes WHERE isFavorite = 0 AND cachedAt < :expiryTimestamp")
    suspend fun clearOldCache(expiryTimestamp: Long)
}
