package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import com.example.data.database.AppDatabase
import com.example.data.repository.ReadingRepository
import com.example.ui.screens.MainNavigationContent
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.viewmodel.ReadingViewModel
import com.example.ui.viewmodel.ReadingViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Initialize Room Database & Repository
        val database = AppDatabase.getDatabase(this)
        val repository = ReadingRepository(database.readingDao())

        // Initialize ViewModel with the factory
        val viewModel: ReadingViewModel by viewModels {
            ReadingViewModelFactory(repository)
        }

        setContent {
            MyApplicationTheme {
                MainNavigationContent(viewModel)
            }
        }
    }
}
