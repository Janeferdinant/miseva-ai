package com.culinaryverse.ai.ui.screens.beverages

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
fun BeveragesScreen(
    onNavigateBack: () -> Unit,
    onNavigateToDetail: (String) -> Unit
) {
    var selectedFilter by remember { mutableStateOf("All") }
    val filters = listOf("All", "Cold Refreshers", "Hot Teas & Coffees", "Fresh Juices", "Smoothies")

    val mockBeverages = listOf(
        Triple("kerala-kulukki-sarbath", "Kerala Kulukki Sarbath (Shaken Lime Chili)", "കുലുക്കി സർബത്ത്"),
        Triple("kumbakonam-degree-coffee", "Kumbakonam Degree Filter Coffee", "കുംഭകോണം ഡിഗ്രി കാപ്പി"),
        Triple("kerala-sambharam", "Spiced Butter Milk (Sambharam)", "കേരള സംഭാരം"),
        Triple("punjabi-sweet-lassi", "Amritsari Malai Sweet Lassi", "പഞ്ചാബി ലസ്സി"),
        Triple("sharjah-shake", "Calicut Beach Sharjah Shake", "ഷാർജ ഷേക്ക്"),
        Triple("solkadhi", "Konkani Kokum Solkadhi", "സോൾകഡി")
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Juices & Beverages Studio", fontWeight = FontWeight.Bold) },
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
                            Icon(Icons.Default.LocalBar, contentDescription = null, tint = Color(0xFF00BCD4))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("BEVERAGES STUDIO (50 ARTISANAL DRINKS)", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color(0xFF00BCD4))
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text("The Refreshment Studio", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold)
                        Text("Shaken Sarbaths, authentic South Indian filter coffee, and probiotic refreshers.", fontSize = 12.sp, color = Color.Gray)
                    }
                }
            }

            item {
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(filters) { f ->
                        FilterChip(
                            selected = selectedFilter == f,
                            onClick = { selectedFilter = f },
                            label = { Text(f, fontSize = 11.sp, fontWeight = FontWeight.SemiBold) }
                        )
                    }
                }
            }

            items(mockBeverages) { item ->
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
                                .background(Color(0xFF00BCD4).copy(alpha = 0.2f), RoundedCornerShape(12.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.LocalBar, contentDescription = null, tint = Color(0xFF00BCD4))
                        }
                        Spacer(modifier = Modifier.width(14.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(item.third, fontSize = 11.sp, color = Color(0xFF00BCD4))
                            Text(item.second, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text("Sweetness scaling supported", fontSize = 11.sp, color = Color.Gray)
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
