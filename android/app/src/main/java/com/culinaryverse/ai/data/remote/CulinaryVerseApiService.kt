package com.culinaryverse.ai.data.remote

import com.culinaryverse.ai.data.model.BeverageResponse
import com.culinaryverse.ai.data.model.DessertResponse
import com.culinaryverse.ai.data.model.Recipe
import com.culinaryverse.ai.data.model.RecipeResponse
import com.culinaryverse.ai.data.model.TableStylingResponse
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query
import java.util.concurrent.TimeUnit

interface CulinaryVerseApiService {

    @GET("api/recipes")
    suspend fun getRecipes(
        @Query("q") search: String? = null,
        @Query("cuisine") cuisine: String? = null,
        @Query("region") region: String? = null,
        @Query("mealType") mealType: String? = null
    ): RecipeResponse

    @GET("api/recipes")
    suspend fun getRecipeDetail(
        @Query("id") id: String? = null,
        @Query("slug") slug: String? = null
    ): Map<String, Recipe>

    @GET("api/desserts")
    suspend fun getDesserts(
        @Query("subcategory") subcategory: String? = null,
        @Query("q") search: String? = null
    ): DessertResponse

    @GET("api/beverages")
    suspend fun getBeverages(
        @Query("subcategory") subcategory: String? = null,
        @Query("hot") isHot: Boolean? = null,
        @Query("q") search: String? = null
    ): BeverageResponse

    @GET("api/table-styling")
    suspend fun getTableStylingConcepts(
        @Query("collection") collection: String? = null,
        @Query("shape") shape: String? = null
    ): TableStylingResponse

    companion object {
        // Points to local dev machine or production Vercel deployment
        private const val BASE_URL = "http://10.0.2.2:3000/" // Android Emulator localhost bridge

        fun create(): CulinaryVerseApiService {
            val logging = HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }

            val client = OkHttpClient.Builder()
                .addInterceptor(logging)
                .connectTimeout(15, TimeUnit.SECONDS)
                .readTimeout(15, TimeUnit.SECONDS)
                .build()

            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(CulinaryVerseApiService::class.java)
        }
    }
}
