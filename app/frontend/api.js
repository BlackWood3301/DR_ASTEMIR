// API-клиент для работы с backend
// Заменяем абсолютный URL относительным путем
const API_URL = ''; // Пустая строка для относительных путей

// Функция для получения всех поздравлений
async function getAllPozdravlenia() {
    try {
        const response = await fetch(`${API_URL}/pozdravlenia/`);
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении поздравлений:', error);
        return [];
    }
}

// Функция для добавления нового поздравления
async function addPozdravlenie(name, description) {
    try {
        const response = await fetch(`${API_URL}/pozdravlenia/insert?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Ошибка при добавлении поздравления:', error);
        return false;
    }
} 