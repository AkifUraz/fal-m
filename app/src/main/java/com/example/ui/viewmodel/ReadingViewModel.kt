package com.example.ui.viewmodel

import android.content.Context
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.net.Uri
import android.os.Build
import android.util.Base64
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.BuildConfig
import com.example.data.database.ReadingEntity
import com.example.data.gemini.Content
import com.example.data.gemini.GenerateContentRequest
import com.example.data.gemini.InlineData
import com.example.data.gemini.Part
import com.example.data.gemini.RetrofitClient
import com.example.data.repository.ReadingRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream

class ReadingViewModel(private val repository: ReadingRepository) : ViewModel() {

    // List of all readings from database
    val historyList: StateFlow<List<ReadingEntity>> = repository.allReadings
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _statusMessage = MutableStateFlow("")
    val statusMessage: StateFlow<String> = _statusMessage.asStateFlow()

    private val _currentReadingText = MutableStateFlow("")
    val currentReadingText: StateFlow<String> = _currentReadingText.asStateFlow()

    private val _currentReadingType = MutableStateFlow<String?>(null)
    val currentReadingType: StateFlow<String?> = _currentReadingType.asStateFlow()

    private val _currentReadingSubject = MutableStateFlow<String?>(null)
    val currentReadingSubject: StateFlow<String?> = _currentReadingSubject.asStateFlow()

    private val _selectedImageUri = MutableStateFlow<Uri?>(null)
    val selectedImageUri: StateFlow<Uri?> = _selectedImageUri.asStateFlow()

    private var typewriterJob: Job? = null
    private var fullReadingText: String = ""

    fun selectImageUri(uri: Uri?) {
        _selectedImageUri.value = uri
    }

    // Typewriter effect
    fun startTypewriterEffect(text: String) {
        typewriterJob?.cancel()
        fullReadingText = text
        _currentReadingText.value = ""
        typewriterJob = viewModelScope.launch {
            val words = text.split(" ")
            var currentText = ""
            for (i in words.indices) {
                currentText += (if (i == 0) "" else " ") + words[i]
                _currentReadingText.value = currentText
                delay(70) // Delay in milliseconds between words for smooth cosmic writing
            }
        }
    }

    fun skipTypewriter() {
        typewriterJob?.cancel()
        _currentReadingText.value = fullReadingText
    }

    // Load daily horoscope
    fun getDailyHoroscope(signName: String, dateRange: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _statusMessage.value = "Yıldızlar hizalanıyor..."
            _currentReadingType.value = "ASTROLOJI"
            _currentReadingSubject.value = "$signName Burcu"
            _currentReadingText.value = ""

            val prompt = """
                Sen kadim ve gizemli bir astrologsun. $signName burcu ($dateRange) için bugün tarihli mistik, detaylı ve şiirsel bir günlük burç yorumu yaz. 
                Yorumun aşk, kariyer, sağlık ve şans konularına değinsin. Yıldızların bugünkü konumuna göre gizemli, etkileyici ve Türkçe bir anlatım yap. 
                Kullanıcıya özel hissettirecek kehanetlerde bulun. Yaklaşık 180-220 kelime olsun.
            """.trimIndent()

            val apiKey = BuildConfig.GEMINI_API_KEY
            if (apiKey.isEmpty() || apiKey == "MY_GEMINI_API_KEY") {
                simulateMockHoroscope(signName)
                _isLoading.value = false
                return@launch
            }

            try {
                // Mystical phase loading message simulation
                launch {
                    delay(2000)
                    if (_isLoading.value) _statusMessage.value = "Gezegenlerin fısıltısı dinleniyor..."
                    delay(2000)
                    if (_isLoading.value) _statusMessage.value = "Kozmik enerji kartı açılıyor..."
                }

                val request = GenerateContentRequest(
                    contents = listOf(Content(parts = listOf(Part(text = prompt))))
                )
                val response = withContext(Dispatchers.IO) {
                    RetrofitClient.service.generateContent(apiKey, request)
                }

                val resultText = response.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text
                    ?: "Yıldızlar şu an karanlıkta kalmış görünüyor, daha sonra tekrar dene."

                // Save reading to Room database
                val entity = ReadingEntity(
                    type = "ASTROLOJI",
                    subject = "$signName Burcu",
                    readingText = resultText
                )
                repository.insertReading(entity)

                startTypewriterEffect(resultText)

            } catch (e: Exception) {
                Log.e("ReadingViewModel", "Error fetching horoscope", e)
                simulateMockHoroscope(signName)
            } finally {
                _isLoading.value = false
            }
        }
    }

    // Load coffee fortune
    fun getCoffeeFortune(context: Context, uri: Uri?, customStyleName: String?) {
        viewModelScope.launch {
            _isLoading.value = true
            _statusMessage.value = "Gözler kapatılıyor, niyetler tutuluyor..."
            _currentReadingType.value = "KAHVE"
            _currentReadingSubject.value = customStyleName ?: "Kahve Falı"
            _currentReadingText.value = ""

            val apiKey = BuildConfig.GEMINI_API_KEY
            val isMockKey = apiKey.isEmpty() || apiKey == "MY_GEMINI_API_KEY"

            try {
                // Mystical progress loading simulation
                launch {
                    delay(2000)
                    if (_isLoading.value) _statusMessage.value = "Fincanın telveleri analiz ediliyor..."
                    delay(2000)
                    if (_isLoading.value) _statusMessage.value = "Mistik semboller çözümleniyor..."
                    delay(2000)
                    if (_isLoading.value) _statusMessage.value = "Kehanet kaleme dökülüyor..."
                }

                var resultText = ""

                if (isMockKey) {
                    delay(5000) // Simulation time
                    resultText = getMockCoffeeReading(customStyleName ?: "Kahve Falı")
                } else {
                    val prompt = """
                        Sen gizemli, sezgileri çok güçlü, kadim bir Türk kahvesi falcısısın. 
                        Sana gönderilen fincan telvesini detaylı ve mistik bir dille yorumla. 
                        Eğer bir resim gönderildiyse oradaki sembolleri (kuş, yol, balık, göz, anahtar gibi sembolleri arayarak) çöz. 
                        Eğer resim net değilse ya da özel seçilmiş bir fincan tarzıysa ('$customStyleName'), bunu bir başyapıt gibi hayal et.
                        Geleceğe dair aşk, para, kısmet ve sağlık konularında Türkçe, akıcı, tatlı ve şiirsel bir fal bak. 
                        Falın sonunda her zaman 'Üç vakte kadar...' diye başlayan heyecan verici bir kehanet ekle. 
                        Yaklaşık 220-270 kelime olsun.
                    """.trimIndent()

                    val parts = mutableListOf<Part>()
                    parts.add(Part(text = prompt))

                    if (uri != null) {
                        val bitmap = withContext(Dispatchers.IO) {
                            getBitmapFromUri(context, uri)
                        }
                        if (bitmap != null) {
                            val base64Image = withContext(Dispatchers.IO) {
                                bitmap.toBase64()
                            }
                            parts.add(Part(inlineData = InlineData(mimeType = "image/jpeg", data = base64Image)))
                        }
                    }

                    val request = GenerateContentRequest(
                        contents = listOf(Content(parts = parts))
                    )
                    val response = withContext(Dispatchers.IO) {
                        RetrofitClient.service.generateContent(apiKey, request)
                    }

                    resultText = response.candidates?.firstOrNull()?.content?.parts?.firstOrNull()?.text
                        ?: "Fincanın sırrı çözülemedi, bir şeyler telveyi gölgeliyor."
                }

                // Save reading to database
                val entity = ReadingEntity(
                    type = "KAHVE",
                    subject = customStyleName ?: "Kahve Falı",
                    readingText = resultText,
                    imageUri = uri?.toString()
                )
                repository.insertReading(entity)

                startTypewriterEffect(resultText)

            } catch (e: Exception) {
                Log.e("ReadingViewModel", "Error fetching coffee fortune", e)
                val fallbackText = getMockCoffeeReading(customStyleName ?: "Kahve Falı")
                
                val entity = ReadingEntity(
                    type = "KAHVE",
                    subject = customStyleName ?: "Kahve Falı",
                    readingText = fallbackText,
                    imageUri = uri?.toString()
                )
                repository.insertReading(entity)
                startTypewriterEffect(fallbackText)
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun deleteReading(id: Int) {
        viewModelScope.launch {
            repository.deleteReading(id)
        }
    }

    fun clearHistory() {
        viewModelScope.launch {
            repository.clearAll()
        }
    }

    // Helper to get Bitmap from Uri
    private fun getBitmapFromUri(context: Context, uri: Uri): Bitmap? {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                val source = ImageDecoder.createSource(context.contentResolver, uri)
                ImageDecoder.decodeBitmap(source)
            } else {
                @Suppress("DEPRECATION")
                android.provider.MediaStore.Images.Media.getBitmap(context.contentResolver, uri)
            }
        } catch (e: Exception) {
            Log.e("ReadingViewModel", "Failed to decode Uri to Bitmap", e)
            null
        }
    }

    // Helper to convert Bitmap to Base64
    private fun Bitmap.toBase64(): String {
        val outputStream = ByteArrayOutputStream()
        compress(Bitmap.CompressFormat.JPEG, 70, outputStream) // Compact size for API call
        return Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP)
    }

    // Mock predictions in case the API key is not configured or fails
    private fun simulateMockHoroscope(signName: String) {
        val mockText = """
            Kozmik dalgalar bugün $signName burcu için çok derin fısıltılar taşıyor. 
            Gökyüzünde Güneş ve Neptün arasındaki mistik kavuşum, bugün sezgilerini adeta bir fener gibi parlatıyor.
            
            💖 AŞK: Kalbinde uzun süredir biriken o gizemli bulutlar bugün dağılıyor. Partnerinle veya hayatına girmesini beklediğin o kişiyle arandaki bağ, kozmik bir çekimle güçlenecek. Küçük bir tatlı mesaj veya beklenmedik bir bakış, her şeyi değiştirebilir.
            
            💼 KARİYER: Zihnindeki parlak fikirler altın sarısı ışıklar gibi saçılıyor. Kararsız kaldığın bir iş projesinde, bugün sezgilerine güvenmelisiniz. Maddi konularda yakın bir dostundan alacağın gizemli bir tavsiye, geleceğini şekillendirebilir.
            
            🔮 ŞANS: Bugün karşına çıkacak olan 7 ve 9 sayıları senin uğurun olacak. Doğu yönünden esecek rüzgarlar sana hayırlı kısmet kapıları açıyor. Kendine güven ve yıldızların fısıltısına kulak ver!
        """.trimIndent()
        startTypewriterEffect(mockText)
    }

    private fun getMockCoffeeReading(style: String): String {
        return """
            Fincanındaki karanlık telveler adeta gizemli bir masalın sayfaları gibi açılıyor. Bu fincanda o kadar yoğun ve mistik bir enerji birikmiş ki, hayret etmemek elde değil!
            
            Hemen fincanın göbeğinde beliren büyük, görkemli bir kuş figürü dikkatimi çekiyor. Bu kuş, sana çok uzak diyarlardan, belki de aklının ucundan bile geçmeyen bir yerden gelecek olan hayırlı ve temiz haberlerin müjdecisidir. Kanatları o kadar geniş ki, hanenin üzerindeki tüm sıkıntıları tek bir çırpışta alıp götürecek.
            
            Yolun hemen kenarında kıvrılan uzun, aydınlık bir çizgi var. Bu çizgi önünde açılacak temiz bir seyahat ya da kariyerinde atacağın parlak bir adımı gösteriyor. Yolun başında küçük engeller görünüyor ama azmin ve kalbinin temizliği sayesinde bu engeller birer birer eriyecek. Yolun sonu ise altın sarısı bir ışıkla parlıyor, yani başarı kaçınılmaz!
            
            Aşk hanende ise bir göz var. Bu göz, seni uzaktan uzağa büyük bir hayranlıkla izleyen, ama çekingenliğinden dolayı sana bir türlü açılamayan gizemli birine işaret ediyor. Çok yakın bir zamanda bu kişinin cesaretini toplayıp kapını çaldığını göreceksin. Şayet hayatında biri varsa, aranızdaki soğuk rüzgarlar yerini sıcacık, samimi bir bahar havasına bırakacak.
            
            Üç vakte kadar hayatında öyle bir dönüm noktası yaşanacak ki, 'iyi ki bu yollardan geçmişim' diyeceksin. Kalbini ferah tut, fincanındaki tüm güzellikler seninle olsun!
        """.trimIndent()
    }
}

// Factory to create ViewModel with constructor parameters
class ReadingViewModelFactory(private val repository: ReadingRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ReadingViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return ReadingViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
