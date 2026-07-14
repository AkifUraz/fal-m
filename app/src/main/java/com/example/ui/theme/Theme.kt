package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

import androidx.compose.ui.graphics.Color

private val DarkColorScheme =
  darkColorScheme(
    primary = MysticPrimary,
    secondary = MysticSecondary,
    tertiary = MysticPink,
    background = MysticDarkBg,
    surface = MysticCardBg,
    onPrimary = Color.Black,
    onSecondary = Color.Black,
    onBackground = MysticTextPrimary,
    onSurface = MysticTextPrimary,
    surfaceVariant = MysticCardBg,
    onSurfaceVariant = MysticTextSecondary
  )

private val LightColorScheme = DarkColorScheme // Force dark theme everywhere for mystical vibe

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = true, // Force true
  dynamicColor: Boolean = false, // Disable dynamic color to maintain purple/gold aesthetic
  content: @Composable () -> Unit,
) {
  val colorScheme = DarkColorScheme

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
