package com.culinaryverse.ai.ui.screens.shopping

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.culinaryverse.ai.ui.components.LiquidGlassCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ShoppingScreen(
    onNavigateBack: () -> Unit
) {
    var pinCode by remember { mutableStateOf("682001") } // Kochi default PIN

    val mockRetailers = listOf(
        Triple("Blinkit Quick Commerce", "10-15 mins delivery", "₹240 Total"),
        Triple("Swiggy Instamart", "15-20 mins delivery", "₹255 Total"),
        Triple("Zepto Grocery", "10 mins delivery", "₹235 Total"),
        Triple("Amazon Fresh India", "Same day delivery", "₹220 Total"),
        Triple("Flipkart Grocery", "Next morning delivery", "₹210 Total"),
        Triple("BigBasket (BB Now)", "25 mins delivery", "₹245 Total")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Grocery Price Comparison", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.LocationOn, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Delivery PIN Code: $pinCode", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            "Comparing real-time prices across major Indian quick-commerce and hyper-local grocery providers.",
                            fontSize = 11.sp,
                            color = Color.Gray
                        )
                    }
                }
            }

            item {
                Text("Verified Retailer Prices", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }

            items(mockRetailers) { (retailer, delivery, price) ->
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(retailer, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text(delivery, fontSize = 11.sp, color = Color.Gray)
                        }
                        Text(
                            price,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 16.sp,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}
