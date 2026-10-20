package com.culinaryverse.ai.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverter
import androidx.room.TypeConverters
import com.culinaryverse.ai.data.model.Ingredient
import com.culinaryverse.ai.data.model.InstructionStep
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

@Entity(tableName = "cached_recipes")
@TypeConverters(RecipeConverters::class)
data class RecipeEntity(
    @PrimaryKey val id: String,
    val slug: String,
    val title: String,
    val titleMalayalam: String,
    val cuisine: String,
    val stateOrCountry: String,
    val region: String,
    val mealType: String,
    val difficulty: String,
    val prepTime: Int,
    val cookTime: Int,
    val servings: Int,
    val imageUrl: String,
    val description: String,
    val descriptionMalayalam: String,
    val ingredientsJson: String,
    val instructionsJson: String,
    val isFavorite: Boolean = false,
    val isOfflineAvailable: Boolean = true,
    val cachedAt: Long = System.currentTimeMillis()
)

class RecipeConverters {
    private val gson = Gson()

    @TypeConverter
    fun fromIngredientList(value: List<Ingredient>?): String {
        return gson.toJson(value)
    }

    @TypeConverter
    fun toIngredientList(value: String): List<Ingredient> {
        val listType = object : TypeToken<List<Ingredient>>() {}.type
        return gson.fromJson(value, listType) ?: emptyList()
    }

    @TypeConverter
    fun fromInstructionStepList(value: List<InstructionStep>?): String {
        return gson.toJson(value)
    }

    @TypeConverter
    fun toInstructionStepList(value: String): List<InstructionStep> {
        val listType = object : TypeToken<List<InstructionStep>>() {}.type
        return gson.fromJson(value, listType) ?: emptyList()
    }
}
