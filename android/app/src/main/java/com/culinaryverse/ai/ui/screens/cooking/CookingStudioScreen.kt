package com.culinaryverse.ai.ui.screens.cooking

import android.app.Activity
import android.speech.tts.TextToSpeech
import android.view.WindowManager
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.culinaryverse.ai.ui.components.LiquidGlassCard
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CookingStudioScreen(
    recipeId: String,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    var isKeepScreenOn by remember { mutableStateOf(true) }
    var currentStepIndex by remember { mutableStateOf(0) }
    var selectedLang by remember { mutableStateOf("en") }
    var isTtsSpeaking by remember { mutableStateOf(false) }

    // Screen-awake support: FLAG_KEEP_SCREEN_ON during active cooking
    DisposableEffect(isKeepScreenOn) {
        val window = (context as? Activity)?.window
        if (isKeepScreenOn) {
            window?.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        } else {
            window?.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
        onDispose {
            window?.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
    }

    // Android Text-to-Speech Engine
    var tts: TextToSpeech? by remember { mutableStateOf(null) }
    DisposableEffect(Unit) {
        val speechEngine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                speechEngine?.language = Locale("en", "IN")
            }
        }
        tts = speechEngine
        onDispose {
            speechEngine.stop()
            speechEngine.shutdown()
        }
    }

    val steps = listOf(
        Pair(
            "Prep & Batons Cutting",
            "Cut raw plantain, elephant yam, cucumber, carrot, and beans into uniform 2-inch batons. Keep yam immersed in water to prevent discoloration."
        ),
        Pair(
            "Coconut & Cumin Grind",
            "Coarsely crush grated coconut, cumin seeds, and green chilies using pulse mode. Do not add water; keep the paste thick and textured."
        ),
        Pair(
            "Steam Vegetables",
            "Cook firm vegetables (yam, plantain) first with turmeric and salt. Add tender vegetables later until cooked through yet retaining crisp bite."
        ),
        Pair(
            "Finish with Coconut Oil",
            "Turn off heat. Fold in the crushed coconut mixture, beaten sour curd, fresh curry leaves, and a generous drizzle of virgin coconut oil."
        )
    )

    val currentStep = steps[currentStepIndex]

    fun speakCurrentStep() {
        if (isTtsSpeaking) {
            tts?.stop()
            isTtsSpeaking = false
        } else {
            tts?.speak(
                "${currentStep.first}. ${currentStep.second}",
                TextToSpeech.QUEUE_FLUSH,
                null,
                "step_${currentStepIndex}"
            )
            isTtsSpeaking = true
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text("Hands-Free Cooking Studio", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        Text("Step ${currentStepIndex + 1} of ${steps.size}", fontSize = 11.sp, color = MaterialTheme.colorScheme.primary)
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.Close, contentDescription = "Exit Cooking Studio")
                    }
                },
                actions = {
                    // Screen-Awake toggle button
                    IconButton(onClick = { isKeepScreenOn = !isKeepScreenOn }) {
                        Icon(
                            if (isKeepScreenOn) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                            contentDescription = "Toggle Screen Awake",
                            tint = if (isKeepScreenOn) MaterialTheme.colorScheme.primary else Color.Gray
                        )
                    }
                    TextButton(onClick = { selectedLang = if (selectedLang == "en") "ml" else "en" }) {
                        Text(if (selectedLang == "en") "മലയാളം" else "English", fontWeight = FontWeight.Bold)
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(20.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Step Progress Bar
            LinearProgressIndicator(
                progress = { (currentStepIndex + 1f) / steps.size },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp)
                    .clip(CircleShape),
                color = MaterialTheme.colorScheme.primary,
                trackColor = MaterialTheme.colorScheme.surfaceVariant
            )

            // Step Content Card
            LiquidGlassCard(modifier = Modifier.fillMaxWidth()) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(60.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            "${currentStepIndex + 1}",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Black,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        currentStep.first,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onBackground
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Text(
                        currentStep.second,
                        fontSize = 15.sp,
                        color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.85f),
                        lineHeight = 22.sp
                    )

                    Spacer(modifier = Modifier.height(24.dp))

                    // Audio Read-Along Button
                    OutlinedButton(
                        onClick = { speakCurrentStep() },
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = MaterialTheme.colorScheme.primary
                        )
                    ) {
                        Icon(
                            if (isTtsSpeaking) Icons.Default.VolumeOff else Icons.Default.VolumeUp,
                            contentDescription = null
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(if (isTtsSpeaking) "Stop Audio" else "Listen Audio Narration", fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Navigation Controls (Previous / Next)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                OutlinedButton(
                    onClick = { if (currentStepIndex > 0) currentStepIndex-- },
                    enabled = currentStepIndex > 0,
                    modifier = Modifier
                        .weight(1f)
                        .height(52.dp),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Icon(Icons.Default.ArrowBack, contentDescription = null)
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Previous", fontWeight = FontWeight.Bold)
                }

                Button(
                    onClick = {
                        if (currentStepIndex < steps.size - 1) {
                            currentStepIndex++
                        } else {
                            onNavigateBack()
                        }
                    },
                    modifier = Modifier
                        .weight(1f)
                        .height(52.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                ) {
                    Text(
                        if (currentStepIndex < steps.size - 1) "Next Step" else "Complete!",
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Icon(Icons.Default.ArrowForward, contentDescription = null)
                }
            }
        }
    }
}
