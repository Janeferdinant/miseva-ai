package com.culinaryverse.ai.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.culinaryverse.ai.theme.LocalLiquidGlassColors

@Composable
fun LiquidGlassCard(
    modifier: Modifier = Modifier,
    cornerRadius: Dp = 24.dp,
    borderWidth: Dp = 1.dp,
    elevation: Dp = 8.dp,
    customSurfaceColor: Color? = null,
    content: @Composable BoxScope.() -> Unit
) {
    val glassColors = LocalLiquidGlassColors.current
    val surfaceColor = customSurfaceColor ?: glassColors.glassSurface
    val shape = RoundedCornerShape(cornerRadius)

    Box(
        modifier = modifier
            .shadow(elevation = elevation, shape = shape, spotColor = Color.Black.copy(alpha = 0.5f))
            .clip(shape)
            .background(surfaceColor)
            .border(borderWidth, glassColors.glassBorder, shape)
    ) {
        content()
    }
}
