package com.culinaryverse.ai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.culinaryverse.ai.theme.CulinaryThemeName
import com.culinaryverse.ai.theme.CulinaryVerseAITheme
import com.culinaryverse.ai.ui.navigation.CulinaryNavGraph

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            var selectedTheme by remember { mutableStateOf(CulinaryThemeName.EMERALD_KITCHEN) }

            CulinaryVerseAITheme(selectedTheme = selectedTheme) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    CulinaryNavGraph(
                        navController = navController,
                        currentTheme = selectedTheme,
                        onThemeSelected = { newTheme -> selectedTheme = newTheme }
                    )
                }
            }
        }
    }
}
