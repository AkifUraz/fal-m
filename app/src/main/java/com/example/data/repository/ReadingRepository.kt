package com.example.data.repository

import com.example.data.database.ReadingDao
import com.example.data.database.ReadingEntity
import kotlinx.coroutines.flow.Flow

class ReadingRepository(private val readingDao: ReadingDao) {
    val allReadings: Flow<List<ReadingEntity>> = readingDao.getAllReadings()

    suspend fun insertReading(reading: ReadingEntity) {
        readingDao.insertReading(reading)
    }

    suspend fun deleteReading(id: Int) {
        readingDao.deleteReading(id)
    }

    suspend fun clearAll() {
        readingDao.clearAllReadings()
    }
}
