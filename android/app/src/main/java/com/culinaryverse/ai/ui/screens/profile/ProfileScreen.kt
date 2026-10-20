package com.culinaryverse.ai.ui.screens.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.culinaryverse.ai.theme.CulinaryThemeName
import com.culinaryverse.ai.ui.components.LiquidGlassCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    currentTheme: CulinaryThemeName,
    onThemeSelected: (CulinaryThemeName) -> Unit,
    onNavigateBack: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profile & Settings", fontWeight = FontWeight.Bold) },
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
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Theme Selector Card
            item {
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Palette, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("LIQUID-GLASS THEME SELECTOR", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        }
                        Spacer(modifier = Modifier.height(10.dp))

                        val themes = listOf(
                            CulinaryThemeName.EMERALD_KITCHEN to "Emerald Kitchen (Kerala)",
                            CulinaryThemeName.SAFFRON_SPICE to "Saffron & Spice (Royal)",
                            CulinaryThemeName.OCEAN_MIST to "Ocean Mist (Malabar)",
                            CulinaryThemeName.MIDNIGHT_GOURMET to "Midnight Gourmet (Dark)",
                            CulinaryThemeName.ROSE_QUARTZ to "Rose Quartz (Blush)",
                            CulinaryThemeName.IVORY_LUXURY to "Ivory Luxury (Champagne)"
                        )

                        themes.forEach { (themeEnum, name) ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { onThemeSelected(themeEnum) }
                                    .padding(vertical = 8.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(name, fontSize = 13.sp, fontWeight = FontWeight.Medium)
                                if (currentTheme == themeEnum) {
                                    Icon(Icons.Default.Check, contentDescription = "Selected", tint = MaterialTheme.colorScheme.primary)
                                }
                            }
                        }
                    }
                }
            }

            // Academic Supervisor Branding Card (Mandatory Prompt Requirement)
            item {
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(
                        modifier = Modifier.padding(20.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Box(
                            modifier = Modifier
                                .size(64.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.School, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(32.dp))
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            "Jane Rose",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                        Text(
                            "Assistant Professor, CSE",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = MaterialTheme.colorScheme.primary
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(
                            "“Miseva AI — Your World. Your Kitchen. Your AI Chef. Discover cuisines, learn techniques, style your table, and cook with confidence.”",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.75f),
                            lineHeight = 17.sp,
                            modifier = Modifier.padding(horizontal = 8.dp)
                        )
                    }
                }
            }

            // Legal & Data Disclosures
            item {
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("About & Disclosures", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        Spacer(modifier = Modifier.height(6.dp))
                        Text("Version 1.0.0 (Native Android Compose)", fontSize = 11.sp, color = Color.Gray)
                        Text("Shared Backend REST APIs with Next.js Turbopack", fontSize = 11.sp, color = Color.Gray)
                        Text("Data Sources: Ministry of Tourism & Authenticated Regional Archives", fontSize = 11.sp, color = Color.Gray)
                        Text("AI Content Disclosure: Recipes verified; AI visuals labeled as inspiration.", fontSize = 11.sp, color = Color.Gray)
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}
