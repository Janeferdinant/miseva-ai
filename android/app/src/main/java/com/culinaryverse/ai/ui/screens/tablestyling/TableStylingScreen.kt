package com.culinaryverse.ai.ui.screens.tablestyling

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
fun TableStylingScreen(
    onNavigateBack: () -> Unit,
    onNavigateToDetail: (String) -> Unit
) {
    var selectedCollection by remember { mutableStateOf("All") }
    val collections = listOf("All", "Kerala Sadya", "Festive Indian", "Celebrations", "Minimalist & Outdoor")

    val mockConcepts = listOf(
        Triple("tab-kerala-onam-mahasadya", "Grand Onam Mahasadya (Banana-Leaf)", "തിരുവോണ മഹാസദ്യ വാഴയില വിരുന്ന്"),
        Triple("tab-royal-diwali-gold", "Royal Diwali Festive Banquet", "ദീപാവലി വിരുന്ന് മേശ"),
        Triple("tab-vishu-kani-banquet", "Vishu Kani Bell-Metal Feast", "വിഷുക്കണി ഓട്ടുപാത്ര വിരുന്ന്"),
        Triple("tab-anniversary-rose-gold", "Rose Gold Candlelight Anniversary", "വിവാഹ വാർഷിക മേശ"),
        Triple("tab-scandinavian-hygge-linen", "Scandinavian Hygge Oatmeal Linen", "നോർഡിക് ലളിത മേശ")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Table Styling Studio", fontWeight = FontWeight.Bold) },
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
                            Icon(Icons.Default.Restaurant, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("TABLE DECORATION STUDIO (40 CONCEPTS)", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text("The Tablescaping Studio", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold)
                        Text("Traditional plantain leaf placements, Nilavilakku brass lamps, and modern dining layouts.", fontSize = 12.sp, color = Color.Gray)
                    }
                }
            }

            item {
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(collections) { col ->
                        FilterChip(
                            selected = selectedCollection == col,
                            onClick = { selectedCollection = col },
                            label = { Text(col, fontSize = 11.sp, fontWeight = FontWeight.SemiBold) }
                        )
                    }
                }
            }

            items(mockConcepts) { item ->
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
                                .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.2f), RoundedCornerShape(12.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.Deck, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                        }
                        Spacer(modifier = Modifier.width(14.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(item.third, fontSize = 11.sp, color = MaterialTheme.colorScheme.secondary)
                            Text(item.second, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text("Includes 2D top-down layout & shopping list", fontSize = 11.sp, color = Color.Gray)
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
