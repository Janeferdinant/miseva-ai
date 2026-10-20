package com.culinaryverse.ai.data.model

data class GroceryPrice(
    val ingredientName: String,
    val quantity: String,
    val retailer: String, // Flipkart, Amazon Fresh, Blinkit, Swiggy Instamart, Zepto, BigBasket
    val packageSize: String,
    val priceINR: Double,
    val inStock: Boolean,
    val deliveryEstimate: String,
    val productUrl: String,
    val lastCheckedTimestamp: String
)
