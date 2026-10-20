package com.culinaryverse.ai.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

enum class CulinaryThemeName {
    EMERALD_KITCHEN,
    SAFFRON_SPICE,
    OCEAN_MIST,
    MIDNIGHT_GOURMET,
    ROSE_QUARTZ,
    IVORY_LUXURY
}

data class LiquidGlassColors(
    val glassSurface: Color,
    val glassBorder: Color,
    val primaryGradient: List<Color>
)

val LocalLiquidGlassColors = staticCompositionLocalOf {
    LiquidGlassColors(
        glassSurface = EmeraldGlassSurface,
        glassBorder = EmeraldGlassBorder,
        primaryGradient = listOf(EmeraldPrimary, EmeraldAccent)
    )
}

@Composable
fun CulinaryVerseAITheme(
    selectedTheme: CulinaryThemeName = CulinaryThemeName.EMERALD_KITCHEN,
    content: @Composable () -> Unit
) {
    val (colorScheme, glassColors) = when (selectedTheme) {
        CulinaryThemeName.EMERALD_KITCHEN -> {
            darkColorScheme(
                primary = EmeraldPrimary,
                secondary = EmeraldSecondary,
                tertiary = EmeraldAccent,
                background = EmeraldDarkBg,
                surface = Color(0xFF13221C),
                onPrimary = Color.White,
                onBackground = TextLight,
                onSurface = TextLight
            ) to LiquidGlassColors(
                glassSurface = EmeraldGlassSurface,
                glassBorder = EmeraldGlassBorder,
                primaryGradient = listOf(EmeraldPrimary, EmeraldAccent)
            )
        }
        CulinaryThemeName.SAFFRON_SPICE -> {
            darkColorScheme(
                primary = SaffronPrimary,
                secondary = SaffronSecondary,
                tertiary = SaffronAccent,
                background = SaffronDarkBg,
                surface = Color(0xFF2A1A10),
                onPrimary = Color.White,
                onBackground = TextLight,
                onSurface = TextLight
            ) to LiquidGlassColors(
                glassSurface = SaffronGlassSurface,
                glassBorder = SaffronGlassBorder,
                primaryGradient = listOf(SaffronPrimary, SaffronAccent)
            )
        }
        CulinaryThemeName.OCEAN_MIST -> {
            darkColorScheme(
                primary = OceanPrimary,
                secondary = OceanSecondary,
                tertiary = OceanAccent,
                background = OceanDarkBg,
                surface = Color(0xFF0F1E2E),
                onPrimary = Color.White,
                onBackground = TextLight,
                onSurface = TextLight
            ) to LiquidGlassColors(
                glassSurface = OceanGlassSurface,
                glassBorder = OceanGlassBorder,
                primaryGradient = listOf(OceanPrimary, OceanAccent)
            )
        }
        CulinaryThemeName.MIDNIGHT_GOURMET -> {
            darkColorScheme(
                primary = MidnightPrimary,
                secondary = MidnightSecondary,
                tertiary = MidnightAccent,
                background = MidnightDarkBg,
                surface = Color(0xFF131722),
                onPrimary = Color.Black,
                onBackground = TextLight,
                onSurface = TextLight
            ) to LiquidGlassColors(
                glassSurface = MidnightGlassSurface,
                glassBorder = MidnightGlassBorder,
                primaryGradient = listOf(MidnightPrimary, MidnightAccent)
            )
        }
        CulinaryThemeName.ROSE_QUARTZ -> {
            darkColorScheme(
                primary = RosePrimary,
                secondary = RoseSecondary,
                tertiary = RoseAccent,
                background = RoseDarkBg,
                surface = Color(0xFF24121A),
                onPrimary = Color.White,
                onBackground = TextLight,
                onSurface = TextLight
            ) to LiquidGlassColors(
                glassSurface = RoseGlassSurface,
                glassBorder = RoseGlassBorder,
                primaryGradient = listOf(RosePrimary, RoseAccent)
            )
        }
        CulinaryThemeName.IVORY_LUXURY -> {
            darkColorScheme(
                primary = IvorySecondary,
                secondary = IvoryPrimary,
                tertiary = IvoryAccent,
                background = IvoryDarkBg,
                surface = Color(0xFF1E1A17),
                onPrimary = Color.Black,
                onBackground = TextLight,
                onSurface = TextLight
            ) to LiquidGlassColors(
                glassSurface = IvoryGlassSurface,
                glassBorder = IvoryGlassBorder,
                primaryGradient = listOf(IvorySecondary, IvoryAccent)
            )
        }
    }

    CompositionLocalProvider(LocalLiquidGlassColors provides glassColors) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = Typography,
            content = content
        )
    }
}
