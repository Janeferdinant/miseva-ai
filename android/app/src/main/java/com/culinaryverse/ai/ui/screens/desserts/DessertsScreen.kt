package com.culinaryverse.ai.ui.screens.desserts

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
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
fun DessertsScreen(
    onNavigateBack: () -> Unit,
    onNavigateToDetail: (String) -> Unit
) {
    var selectedSubcategory by remember { mutableStateOf("All") }
    val subcategories = listOf("All", "Payasam & Pradhaman", "Traditional Mithai", "Cakes & Bakes", "Global Desserts")

    val mockDesserts = listOf(
        Triple("palada-pradhaman", "Authentic Palada Pradhaman", "പാലട പ്രഥമൻ (Pink Slow Simmered)"),
        Triple("mysore-pak", "Royal Mysore Pak (Ghee Porous)", "നെയ്യ് മൈസൂർ പാക്ക്"),
        Triple("gulab-jamun", "Shahi Gulab Jamun with Rose Syrup", "ഗുലാബ് ജാമുൻ"),
        Triple("kerala-plum-cake", "Rich Kerala Spiced Plum Cake", "കേരള പ്ലം കേക്ക്"),
        Triple("tiramisu", "Classic Venetian Tiramisu", "ഇറ്റാലിയൻ ടിറാമിസു"),
        Triple("ada-pradhaman", "Nadan Jaggery Ada Pradhaman", "അട പ്രഥമൻ")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Desserts & Sweets Studio", fontWeight = FontWeight.Bold) },
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
                            Icon(Icons.Default.Cake, contentDescription = null, tint = Color(0xFFFFA000))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("DESSERTS STUDIO (40 MASTER RECIPES)", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color(0xFFFFA000))
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text("The Confectionery Studio", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold)
                        Text("Calibrated baking temperatures, sugar syrup consistency guides, and authentic Payasams.", fontSize = 12.sp, color = Color.Gray)
                    }
                }
            }

            item {
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(subcategories) { sub ->
                        FilterChip(
                            selected = selectedSubcategory == sub,
                            onClick = { selectedSubcategory = sub },
                            label = { Text(sub, fontSize = 11.sp, fontWeight = FontWeight.SemiBold) }
                        )
                    }
                }
            }

            items(mockDesserts) { item ->
                LiquidGlassCard(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onNavigateToDetail(item.first) }
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(48.dp)
                                .background(Color(0xFFFFA000).copy(alpha = 0.2f), RoundedCornerShape(12.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.Cake, contentDescription = null, tint = Color(0xFFFFA000))
                        }
                        Spacer(modifier = Modifier.width(14.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(item.third, fontSize = 11.sp, color = MaterialTheme.colorScheme.secondary)
                            Text(item.second, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text("Doneness test: Slow reduction & aroma", fontSize = 11.sp, color = Color.Gray)
                        }
                        Icon(Icons.Default.ChevronRight, contentDescription = null, tint = Color.Gray)
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}
