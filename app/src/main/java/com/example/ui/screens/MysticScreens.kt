package com.example.ui.screens

import android.net.Uri
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import com.example.data.database.ReadingEntity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.StarBorder
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.ui.theme.MysticCardBg
import com.example.ui.theme.MysticDarkBg
import com.example.ui.theme.MysticGoldLight
import com.example.ui.theme.MysticPink
import com.example.ui.theme.MysticPrimary
import com.example.ui.theme.MysticSecondary
import com.example.ui.theme.MysticTextPrimary
import com.example.ui.theme.MysticTextSecondary
import com.example.ui.viewmodel.ReadingViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

// Navigation Screen States
sealed class Screen {
    object Home : Screen()
    object CoffeeForm : Screen()
    object AstrologyGrid : Screen()
    object Result : Screen()
    object History : Screen()
}

// Zodiac sign data structure
data class ZodiacSign(
    val name: String,
    val dateRange: String,
    val symbol: String,
    val description: String
)

val zodiacSigns = listOf(
    ZodiacSign("Koç", "21 Mart - 19 Nisan", "♈", "Cesur, enerjik ve öncü"),
    ZodiacSign("Boğa", "20 Nisan - 20 Mayıs", "♉", "Güvenilir, sabırlı ve kararlı"),
    ZodiacSign("İkizler", "21 Mayıs - 20 Haziran", "♊", "Zeki, meraklı ve iletişimci"),
    ZodiacSign("Yengeç", "21 Haziran - 22 Temmuz", "♋", "Duygusal, şefkatli ve sezgisel"),
    ZodiacSign("Aslan", "23 Temmuz - 22 Ağustos", "♌", "Cömert, karizmatik ve yaratıcı"),
    ZodiacSign("Başak", "23 Ağustos - 22 Eylül", "♍", "Çalışkan, analitik ve titiz"),
    ZodiacSign("Terazi", "23 Eylül - 22 Ekim", "♎", "Adil, uyumlu ve diplomatik"),
    ZodiacSign("Akrep", "23 Ekim - 21 Kasım", "♏", "Tutkulu, güçlü ve gizemli"),
    ZodiacSign("Yay", "22 Kasım - 21 Aralık", "♐", "Gezgin, iyimser ve özgürlükçü"),
    ZodiacSign("Oğlak", "22 Aralık - 19 Ocak", "♑", "Disiplinli, hırslı ve sabırlı"),
    ZodiacSign("Kova", "20 Ocak - 18 Şubat", "♒", "Yenilikçi, özgür ve insancıl"),
    ZodiacSign("Balık", "19 Şubat - 20 Mart", "♓", "Hayalperest, merhametli ve mistik")
)

// Preset Cup Styles
data class CoffeePreset(
    val id: String,
    val name: String,
    val description: String,
    val emoji: String
)

val coffeePresets = listOf(
    CoffeePreset("geleneksel", "Geleneksel Telveli Fincan", "Yoğun telvesiyle kadim gizemleri taşır.", "☕"),
    CoffeePreset("ask", "Aşk & Kısmet Fincanı", "Kalp ve sevgi yollarını aydınlatmayı amaçlar.", "💖"),
    CoffeePreset("kozmik", "Kozmik Yıldız Fincanı", "Gelecek kapılarını ve kader planını fısıldar.", "🌌")
)

// twinking gold stars canvas background
@Composable
fun StarryBackground(modifier: Modifier = Modifier) {
    Canvas(modifier = modifier.fillMaxSize()) {
        val random = java.util.Random(42) // Stable position seed
        for (i in 0 until 50) {
            val x = random.nextFloat() * size.width
            val y = random.nextFloat() * size.height
            val radius = random.nextFloat() * 2.5f.dp.toPx() + 0.8f.dp.toPx()
            val alpha = random.nextFloat() * 0.45f + 0.25f
            drawCircle(
                color = Color(0xFFFFD700),
                radius = radius,
                center = Offset(x, y),
                alpha = alpha
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainNavigationContent(viewModel: ReadingViewModel) {
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Home) }

    // Observers
    val isLoading by viewModel.isLoading.collectAsState()
    val statusMessage by viewModel.statusMessage.collectAsState()
    val currentReadingText by viewModel.currentReadingText.collectAsState()
    val currentReadingType by viewModel.currentReadingType.collectAsState()
    val currentReadingSubject by viewModel.currentReadingSubject.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Start,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        // Brand Logo Icon Card with Gradient from Artistic Flair Design HTML
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .background(
                                    brush = Brush.linearGradient(
                                        colors = listOf(Color(0xFFA061FF), Color(0xFFD4AF37))
                                    ),
                                    shape = RoundedCornerShape(12.dp)
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.AutoAwesome,
                                contentDescription = "Star Logo",
                                tint = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            text = "Mistik Fal",
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Serif,
                            letterSpacing = 1.sp,
                            fontSize = 22.sp,
                            color = MysticSecondary
                        )
                    }
                },
                navigationIcon = {
                    if (currentScreen != Screen.Home) {
                        IconButton(onClick = { currentScreen = Screen.Home }) {
                            Icon(
                                imageVector = Icons.Default.Home,
                                contentDescription = "Home",
                                tint = MysticSecondary
                            )
                        }
                    }
                },
                actions = {
                    if (currentScreen != Screen.History) {
                        IconButton(onClick = { currentScreen = Screen.History }) {
                            Icon(
                                imageVector = Icons.Default.History,
                                contentDescription = "History",
                                tint = MysticSecondary
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MysticDarkBg,
                    titleContentColor = MysticSecondary
                )
            )
        },
        containerColor = MysticDarkBg,
        modifier = Modifier.fillMaxSize()
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            StarryBackground()

            AnimatedContent(
                targetState = currentScreen,
                transitionSpec = {
                    fadeIn(animationSpec = tween(400)) togetherWith fadeOut(animationSpec = tween(400))
                },
                label = "ScreenTransition"
            ) { targetScreen ->
                when (targetScreen) {
                    Screen.Home -> HomeScreen(
                        onNavigateToCoffee = { currentScreen = Screen.CoffeeForm },
                        onNavigateToAstrology = { currentScreen = Screen.AstrologyGrid },
                        onNavigateToHistory = { currentScreen = Screen.History }
                    )
                    Screen.CoffeeForm -> CoffeeFormScreen(
                        viewModel = viewModel,
                        onResultReady = { currentScreen = Screen.Result },
                        onBack = { currentScreen = Screen.Home }
                    )
                    Screen.AstrologyGrid -> AstrologyGridScreen(
                        viewModel = viewModel,
                        onResultReady = { currentScreen = Screen.Result },
                        onBack = { currentScreen = Screen.Home }
                    )
                    Screen.Result -> ResultScreen(
                        viewModel = viewModel,
                        onNavigateHome = { currentScreen = Screen.Home }
                    )
                    Screen.History -> HistoryScreen(
                        viewModel = viewModel,
                        onNavigateToReading = { reading ->
                            viewModel.startTypewriterEffect(reading.readingText)
                            // Set current states without reloading from network
                            currentScreen = Screen.Result
                        },
                        onBack = { currentScreen = Screen.Home }
                    )
                }
            }

            // Global Loading overlay
            if (isLoading) {
                MysticLoadingOverlay(message = statusMessage)
            }
        }
    }
}

// 1. HOME SCREEN (Ana Sayfa)
@Composable
fun HomeScreen(
    onNavigateToCoffee: () -> Unit,
    onNavigateToAstrology: () -> Unit,
    onNavigateToHistory: () -> Unit
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        // Mystical Hero Illustration using Canvas or dynamic designs
        Box(
            modifier = Modifier
                .size(130.dp)
                .drawBehind {
                    drawCircle(
                        brush = Brush.radialGradient(
                            colors = listOf(MysticPrimary.copy(alpha = 0.35f), Color.Transparent),
                            center = center,
                            radius = size.width / 1.3f
                        )
                    )
                },
            contentAlignment = Alignment.Center
        ) {
            val infiniteTransition = rememberInfiniteTransition(label = "crescent_rotate")
            val rotationAngle by infiniteTransition.animateFloat(
                initialValue = 0f,
                targetValue = 360f,
                animationSpec = infiniteRepeatable(
                    animation = tween(20000, easing = LinearEasing),
                    repeatMode = RepeatMode.Restart
                ),
                label = "rotation"
            )

            Icon(
                imageVector = Icons.Default.Star,
                contentDescription = null,
                tint = MysticSecondary,
                modifier = Modifier
                    .size(70.dp)
                    .rotate(rotationAngle)
            )
            Icon(
                imageVector = Icons.Default.StarBorder,
                contentDescription = null,
                tint = MysticPink,
                modifier = Modifier
                    .size(100.dp)
                    .rotate(-rotationAngle)
            )
        }

        Text(
            text = "Kader Kapısı Aralanıyor",
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Serif,
            fontSize = 24.sp,
            textAlign = TextAlign.Center,
            color = Color.White
        )

        // Daily Insight Card (Günün Mesajı) from "Artistic Flair" design HTML
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .border(
                    width = 1.dp,
                    color = MysticSecondary.copy(alpha = 0.25f),
                    shape = RoundedCornerShape(28.dp)
                ),
            shape = RoundedCornerShape(28.dp),
            colors = CardDefaults.cardColors(containerColor = Color.Transparent)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(Color(0xFF1D122D), Color(0xFF2D1B44))
                        )
                    )
                    .padding(20.dp)
            ) {
                Column(
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        text = "GÜNÜN MESAJI",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = MysticSecondary,
                        letterSpacing = 2.sp
                    )
                    Text(
                        text = "\"Bugün yıldızlar senin için parlıyor. Beklenmedik bir haber kapıda.\"",
                        fontSize = 15.sp,
                        fontFamily = FontFamily.Serif,
                        fontWeight = FontWeight.Medium,
                        color = MysticTextPrimary,
                        lineHeight = 22.sp,
                        textAlign = TextAlign.Start
                    )
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.padding(top = 4.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .height(1.dp)
                                .weight(1f)
                                .background(
                                    brush = Brush.linearGradient(
                                        colors = listOf(MysticSecondary.copy(alpha = 0.4f), Color.Transparent)
                                    )
                                )
                        )
                        Text(
                            text = "Astroloji Rehberi",
                            fontSize = 11.sp,
                            color = MysticSecondary.copy(alpha = 0.7f),
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }

        // Large button 1: Coffee Fortune (Kahve Falı)
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(90.dp)
                .clickable { onNavigateToCoffee() }
                .border(
                    width = 1.dp,
                    color = MysticPrimary.copy(alpha = 0.4f),
                    shape = RoundedCornerShape(24.dp)
                )
                .testTag("coffee_fortune_button"),
            colors = CardDefaults.cardColors(containerColor = MysticCardBg),
            shape = RoundedCornerShape(24.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .background(MysticPrimary.copy(alpha = 0.2f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text("☕", fontSize = 28.sp)
                }

                Spacer(modifier = Modifier.width(16.dp))

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Kahve Falı",
                        fontWeight = FontWeight.Bold,
                        color = MysticSecondary,
                        fontSize = 18.sp
                    )
                    Text(
                        text = "Fincanın fotoğrafını çek veya niyet et",
                        fontSize = 12.sp,
                        color = MysticTextSecondary
                    )
                }

                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = null,
                    tint = MysticSecondary
                )
            }
        }

        // Large button 2: Daily Astrology (Günlük Astroloji)
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(90.dp)
                .clickable { onNavigateToAstrology() }
                .border(
                    width = 1.dp,
                    color = MysticSecondary.copy(alpha = 0.4f),
                    shape = RoundedCornerShape(24.dp)
                )
                .testTag("astrology_button"),
            colors = CardDefaults.cardColors(containerColor = MysticCardBg),
            shape = RoundedCornerShape(24.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .background(MysticSecondary.copy(alpha = 0.2f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text("🔮", fontSize = 28.sp)
                }

                Spacer(modifier = Modifier.width(16.dp))

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Günlük Astroloji",
                        fontWeight = FontWeight.Bold,
                        color = MysticSecondary,
                        fontSize = 18.sp
                    )
                    Text(
                        text = "Yıldız haritanızın bugünkü durumunu görün",
                        fontSize = 12.sp,
                        color = MysticTextSecondary
                    )
                }

                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = null,
                    tint = MysticSecondary
                )
            }
        }

        // Floating quick actions
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onNavigateToHistory() }
                .padding(8.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.History,
                contentDescription = null,
                tint = MysticPink,
                modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = "Geçmiş Kehanetlerimi Görüntüle",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = MysticPink
            )
        }
    }
}

// 2. FORTUNE SUBMISSION SCREEN (Fal Gönderim Sayfası)
@Composable
fun CoffeeFormScreen(
    viewModel: ReadingViewModel,
    onResultReady: () -> Unit,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    var selectedUri by remember { mutableStateOf<Uri?>(null) }
    var selectedPresetIndex by remember { mutableStateOf<Int?>(null) }

    // Picker
    val pickMediaLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia(),
        onResult = { uri ->
            if (uri != null) {
                selectedUri = uri
                selectedPresetIndex = null // Clear preset choice if user uploads an image
                viewModel.selectImageUri(uri)
            }
        }
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        item {
            Text(
                text = "Fincan Analiz Alanı",
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Serif,
                fontSize = 22.sp,
                color = Color.White
            )

            Text(
                text = "Kahve fincanının içini çek, galeriden yükle veya aşağıdan mistik hazır fincanlarımızdan birini seç.",
                fontSize = 13.sp,
                color = MysticTextSecondary,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(vertical = 8.dp)
            )

            Spacer(modifier = Modifier.height(16.dp))
        }

        // Image Selection Display Card
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(220.dp)
                    .border(1.5.dp, MysticSecondary, RoundedCornerShape(16.dp))
                    .testTag("photo_selector"),
                colors = CardDefaults.cardColors(containerColor = MysticCardBg),
                shape = RoundedCornerShape(16.dp)
            ) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    if (selectedUri != null) {
                        AsyncImage(
                            model = selectedUri,
                            contentDescription = "Kahve fincanı",
                            contentScale = ContentScale.Crop,
                            modifier = Modifier
                                .fillMaxSize()
                                .clip(RoundedCornerShape(16.dp))
                        )

                        // Clear photo trigger overlay
                        Box(
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .padding(12.dp)
                                .background(Color.Black.copy(alpha = 0.6f), CircleShape)
                                .clickable {
                                    selectedUri = null
                                    viewModel.selectImageUri(null)
                                }
                                .padding(8.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Delete,
                                contentDescription = "Sil",
                                tint = Color.White,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    } else if (selectedPresetIndex != null) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Text(
                                text = coffeePresets[selectedPresetIndex!!].emoji,
                                fontSize = 64.sp
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = coffeePresets[selectedPresetIndex!!].name,
                                fontWeight = FontWeight.Bold,
                                color = MysticSecondary,
                                fontSize = 16.sp
                            )
                            Text(
                                text = "Mistik fincan seçildi",
                                fontSize = 11.sp,
                                color = MysticTextSecondary
                            )
                        }
                    } else {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier
                                .fillMaxSize()
                                .clickable {
                                    pickMediaLauncher.launch(
                                        PickVisualMediaRequest(
                                            ActivityResultContracts.PickVisualMedia.ImageOnly
                                        )
                                    )
                                }
                        ) {
                            Icon(
                                imageVector = Icons.Default.CameraAlt,
                                contentDescription = "Görüntü seç",
                                tint = MysticSecondary,
                                modifier = Modifier.size(48.dp)
                            )
                            Spacer(modifier = Modifier.height(12.dp))
                            Text(
                                text = "Fotoğraf Yükle / Çek",
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                fontSize = 16.sp
                            )
                            Text(
                                text = "Fincanının içini net bir şekilde yükle",
                                fontSize = 11.sp,
                                color = MysticTextSecondary
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))
        }

        // Preset style title
        item {
            Text(
                text = "Veya Mistik Fincan Stili Seç",
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                color = MysticSecondary,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp)
            )
        }

        // Horizontal items for presets
        items(coffeePresets.size) { index ->
            val preset = coffeePresets[index]
            val isSelected = selectedPresetIndex == index && selectedUri == null

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp)
                    .clickable {
                        selectedPresetIndex = index
                        selectedUri = null // Clear manual photo selection
                        viewModel.selectImageUri(null)
                    }
                    .border(
                        width = if (isSelected) 1.5.dp else 0.5.dp,
                        color = if (isSelected) MysticSecondary else MysticPrimary.copy(alpha = 0.2f),
                        shape = RoundedCornerShape(12.dp)
                    ),
                colors = CardDefaults.cardColors(
                    containerColor = if (isSelected) MysticPrimary.copy(alpha = 0.15f) else MysticCardBg
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = preset.emoji, fontSize = 24.sp)
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = preset.name,
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            fontSize = 14.sp
                        )
                        Text(
                            text = preset.description,
                            fontSize = 11.sp,
                            color = MysticTextSecondary
                        )
                    }
                }
            }
        }

        // Submit Action Button
        item {
            Spacer(modifier = Modifier.height(24.dp))

            Button(
                onClick = {
                    val styleName = if (selectedPresetIndex != null) {
                        coffeePresets[selectedPresetIndex!!].name
                    } else {
                        "Geleneksel Türk Kahvesi Falı"
                    }
                    viewModel.getCoffeeFortune(context, selectedUri, styleName)
                    onResultReady()
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .testTag("falıma_bak_button"),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MysticSecondary)
            ) {
                Icon(
                    imageVector = Icons.Default.AutoAwesome,
                    contentDescription = null,
                    tint = Color.Black
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Falıma Bak",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    color = Color.Black
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Geri Dön",
                color = MysticPink,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier
                    .clickable { onBack() }
                    .padding(8.dp)
            )
        }
    }
}

// 3. DAILY ASTROLOGY SELECTION (Günlük Astroloji Seçimi)
@Composable
fun AstrologyGridScreen(
    viewModel: ReadingViewModel,
    onResultReady: () -> Unit,
    onBack: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Günlük Astroloji",
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Serif,
            fontSize = 22.sp,
            color = Color.White
        )

        Text(
            text = "Yıldız haritanızın günlük enerjilerini ve kozmik sırlarını keşfetmek için burcunuzu seçin.",
            fontSize = 13.sp,
            color = MysticTextSecondary,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(vertical = 8.dp)
        )

        Spacer(modifier = Modifier.height(12.dp))

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            contentPadding = PaddingValues(bottom = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.weight(1f)
        ) {
            items(zodiacSigns) { sign ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(110.dp)
                        .clickable {
                            viewModel.getDailyHoroscope(sign.name, sign.dateRange)
                            onResultReady()
                        }
                        .border(0.5.dp, MysticPrimary.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                        .testTag("zodiac_${sign.name.lowercase()}"),
                    colors = CardDefaults.cardColors(containerColor = MysticCardBg),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(12.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Text(text = sign.symbol, fontSize = 28.sp)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = sign.name,
                            fontWeight = FontWeight.Bold,
                            color = MysticSecondary,
                            fontSize = 15.sp
                        )
                        Text(
                            text = sign.dateRange,
                            fontSize = 10.sp,
                            color = MysticTextSecondary
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Geri Dön",
            color = MysticPink,
            fontSize = 14.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier
                .clickable { onBack() }
                .padding(8.dp)
        )
    }
}

// 4. RESULT SCREEN (Sonuç Sayfası)
@Composable
fun ResultScreen(
    viewModel: ReadingViewModel,
    onNavigateHome: () -> Unit
) {
    val currentReadingText by viewModel.currentReadingText.collectAsState()
    val currentReadingType by viewModel.currentReadingType.collectAsState()
    val currentReadingSubject by viewModel.currentReadingSubject.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        // Star decoration card
        Box(
            modifier = Modifier
                .size(60.dp)
                .background(MysticSecondary.copy(alpha = 0.1f), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.AutoAwesome,
                contentDescription = null,
                tint = MysticSecondary,
                modifier = Modifier.size(32.dp)
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = currentReadingSubject ?: "Kader Kehaneti",
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Serif,
            fontSize = 22.sp,
            color = Color.White,
            textAlign = TextAlign.Center
        )

        Text(
            text = if (currentReadingType == "KAHVE") "Mistik Kahve Falı Sonucu" else "Günlük Kozmik Astroloji",
            fontSize = 12.sp,
            color = MysticSecondary,
            modifier = Modifier.padding(top = 2.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Large glassmorphic Result Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .border(1.dp, MysticSecondary.copy(alpha = 0.3f), RoundedCornerShape(24.dp)),
            colors = CardDefaults.cardColors(containerColor = MysticCardBg.copy(alpha = 0.85f)),
            shape = RoundedCornerShape(24.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 12.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(20.dp)
            ) {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Top
                ) {
                    item {
                        Text(
                            text = currentReadingText,
                            fontSize = 15.sp,
                            color = Color.White,
                            lineHeight = 24.sp,
                            modifier = Modifier.testTag("result_text")
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Actions Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // "Skip" typing button
            Button(
                onClick = { viewModel.skipTypewriter() },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp)
                    .padding(end = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MysticPrimary.copy(alpha = 0.2f)),
                border = BorderStroke(1.dp, MysticPrimary.copy(alpha = 0.5f))
            ) {
                Text(
                    text = "Hızlandır",
                    color = MysticTextPrimary,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )
            }

            // "Ana Sayfaya Dön"
            Button(
                onClick = { onNavigateHome() },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp)
                    .padding(start = 6.dp)
                    .testTag("back_home_button"),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MysticSecondary)
            ) {
                Text(
                    text = "Ana Sayfa",
                    color = Color.Black,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )
            }
        }
    }
}



// 5. HISTORY SCREEN (Fal Geçmişi)
@Composable
fun HistoryScreen(
    viewModel: ReadingViewModel,
    onNavigateToReading: (ReadingEntity) -> Unit,
    onBack: () -> Unit
) {
    val readings by viewModel.historyList.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Fal Geçmişi",
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Serif,
                fontSize = 22.sp,
                color = Color.White
            )

            if (readings.isNotEmpty()) {
                IconButton(onClick = { viewModel.clearHistory() }) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Clear History",
                        tint = MysticPink
                    )
                }
            }
        }

        Text(
            text = "Kozmik arşivler. Daha önce baktırdığınız kahve falları ve astroloji kehanetleri burada saklanır.",
            fontSize = 12.sp,
            color = MysticTextSecondary,
            modifier = Modifier.padding(vertical = 4.dp)
        )

        Spacer(modifier = Modifier.height(12.dp))

        if (readings.isEmpty()) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = "🌌", fontSize = 48.sp)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Arşivler Boş",
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        fontSize = 16.sp
                    )
                    Text(
                        text = "İlk falınıza baktırarak tarihi kaydedin.",
                        fontSize = 12.sp,
                        color = MysticTextSecondary,
                        textAlign = TextAlign.Center
                    )
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(readings) { reading ->
                    val dateFormatted = remember(reading.timestamp) {
                        try {
                            val sdf = SimpleDateFormat("dd MMMM yyyy, HH:mm", Locale("tr"))
                            sdf.format(Date(reading.timestamp))
                        } catch (e: Exception) {
                            "Mistik Tarih"
                        }
                    }

                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onNavigateToReading(reading) }
                            .border(
                                0.5.dp,
                                if (reading.type == "KAHVE") MysticPrimary.copy(alpha = 0.3f) else MysticSecondary.copy(
                                    alpha = 0.3f
                                ),
                                RoundedCornerShape(16.dp)
                            )
                            .testTag("history_item_${reading.id}"),
                        colors = CardDefaults.cardColors(containerColor = MysticCardBg),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(44.dp)
                                    .background(
                                        if (reading.type == "KAHVE") MysticPrimary.copy(alpha = 0.2f) else MysticSecondary.copy(
                                            alpha = 0.2f
                                        ), CircleShape
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = if (reading.type == "KAHVE") "☕" else "🔮",
                                    fontSize = 20.sp
                                )
                            }

                            Spacer(modifier = Modifier.width(16.dp))

                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = reading.subject,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    fontSize = 15.sp
                                )
                                Text(
                                    text = dateFormatted,
                                    fontSize = 11.sp,
                                    color = MysticTextSecondary
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = reading.readingText,
                                    fontSize = 12.sp,
                                    color = MysticTextSecondary,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                            }

                            IconButton(onClick = { viewModel.deleteReading(reading.id) }) {
                                Icon(
                                    imageVector = Icons.Default.Delete,
                                    contentDescription = "Delete Reading",
                                    tint = MysticTextSecondary,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Geri Dön",
            color = MysticPink,
            fontSize = 14.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier
                .clickable { onBack() }
                .padding(8.dp)
        )
    }
}

// 6. LOADING OVERLAY (Yükleme Ekranı)
@Composable
fun MysticLoadingOverlay(message: String) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.85f))
            .clickable(enabled = false) {}, // Intercept clicks so user can't click things behind
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(32.dp)
        ) {
            // Pulsing rotating cosmic circle
            val infiniteTransition = rememberInfiniteTransition(label = "loader_rotate")
            val angle by infiniteTransition.animateFloat(
                initialValue = 0f,
                targetValue = 360f,
                animationSpec = infiniteRepeatable(
                    animation = tween(2500, easing = LinearEasing),
                    repeatMode = RepeatMode.Restart
                ),
                label = "angle"
            )

            Box(
                modifier = Modifier
                    .size(90.dp)
                    .drawBehind {
                        drawCircle(
                            brush = Brush.radialGradient(
                                colors = listOf(MysticPrimary.copy(alpha = 0.5f), Color.Transparent),
                                center = center,
                                radius = size.width / 2f
                            )
                        )
                    }
                    .rotate(angle),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(72.dp),
                    color = MysticSecondary,
                    strokeWidth = 3.dp
                )
                Text("🔮", fontSize = 28.sp)
            }

            Spacer(modifier = Modifier.height(28.dp))

            Text(
                text = "KOZMİK KEHANET HAZIRLANIYOR",
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                letterSpacing = 2.sp,
                color = MysticSecondary,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = message,
                fontSize = 15.sp,
                fontFamily = FontFamily.Serif,
                color = Color.White,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 24.dp)
            )
        }
    }
}
