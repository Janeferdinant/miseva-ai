package com.culinaryverse.ai.ui.screens.recipe

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import com.culinaryverse.ai.ui.components.LiquidGlassCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RecipeDetailScreen(
    recipeId: String,
    onNavigateBack: () -> Unit,
    onLaunchCookingStudio: (String) -> Unit
) {
    var servingsMultiplier by remember { mutableStateOf(1f) }
    var selectedLang by remember { mutableStateOf("en") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Recipe Detail", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    TextButton(onClick = { selectedLang = if (selectedLang == "en") "ml" else "en" }) {
                        Text(if (selectedLang == "en") "മലയാളം" else "English", fontWeight = FontWeight.Bold)
                    }
                }
            )
        },
        bottomBar = {
            Surface(
                color = MaterialTheme.colorScheme.background,
                modifier = Modifier.padding(16.dp)
            ) {
                Button(
                    onClick = { onLaunchCookingStudio(recipeId) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                ) {
                    Icon(Icons.Default.PlayArrow, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        if (selectedLang == "ml") "കുക്കിംഗ് സ്റ്റുഡിയോ തുടങ്ങുക" else "Start Cooking Session",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                }
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Text(
                            "Kerala Culinary Heritage",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.secondary,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            if (selectedLang == "ml") "തനത് കേരള സദ്യ അവിയൽ" else "Authentic Kerala Sadya Avial",
                            fontSize = 22.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            if (selectedLang == "ml")
                                "13 പച്ചക്കറികളും നാളികേരവും പച്ചവെളിച്ചെണ്ണയും ചേർത്ത തനത് സദ്യ വിഭവം."
                            else
                                "The celebrated centerpiece of the Kerala Sadya feast. Thirteen garden vegetables gently steamed with cumin-coconut paste and finished with raw virgin coconut oil.",
                            fontSize = 13.sp,
                            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.8f),
                            lineHeight = 18.sp
                        )
                    }
                }
            }

            // Servings Scaler
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Serving Size: ${Math.round(4 * servingsMultiplier)} Persons", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        listOf(0.5f to "2p", 1f to "4p", 2f to "8p").forEach { (mult, label) ->
                            FilterChip(
                                selected = servingsMultiplier == mult,
                                onClick = { servingsMultiplier = mult },
                                label = { Text(label, fontSize = 11.sp, fontWeight = FontWeight.Bold) }
                            )
                        }
                    }
                }
            }

            // Ingredients List
            item {
                Text("Required Ingredients", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }

            val ingredients = listOf(
                "Raw Plantain (ഏത്തക്ക)" to "1 cup",
                "Elephant Foot Yam (ചേന)" to "1 cup",
                "Grated Coconut (തേങ്ങ ചിരകിയത്)" to "1.5 cups",
                "Sour Curd (തൈര്)" to "0.5 cup",
                "Cold-Pressed Coconut Oil (വെളിച്ചെണ്ണ)" to "2 tbsp",
                "Curry Leaves (കറിവേപ്പില)" to "3 sprigs"
            )

            items(ingredients) { (ing, qty) ->
                LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 14.dp, vertical = 10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(ing, fontSize = 13.sp, fontWeight = FontWeight.Medium)
                        Text(qty, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(60.dp))
            }
        }
    }
}
