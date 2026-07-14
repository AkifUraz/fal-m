package com.example.data.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "readings")
data class ReadingEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val type: String, // "KAHVE" or "ASTROLOJI"
    val subject: String, // e.g. "Yengeç Burcu" or "Kahve Falı"
    val readingText: String,
    val imageUri: String? = null,
    val timestamp: Long = System.currentTimeMillis()
)
