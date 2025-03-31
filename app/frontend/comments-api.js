// API-клиент для работы с комментариями
const API_URL = ''; // Пустая строка для относительных путей

// Функция для получения всех комментариев
async function getAllComments() {
    try {
        const response = await fetch(`${API_URL}/comment/`);
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        return [];
    }
}

// Функция для добавления нового комментария
async function addComment(name, description) {
    try {
        const response = await fetch(`${API_URL}/comment/insert?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }
        
        const result = await response.json();
        return result === 1; // API возвращает 1 при успехе
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        return false;
    }
}

// Функция для безопасного отображения текста
function sanitizeText(text) {
    // Ограничиваем длину текста, если он слишком длинный
    const maxLength = 1000; // Максимальная длина текста
    if (text.length > maxLength) {
        text = text.substring(0, maxLength) + '...';
    }
    
    // Экранируем HTML-теги
    text = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    
    // Заменяем переносы строк на <br>
    return text.replace(/\n/g, '<br>');
}

// Обновленная функция отображения комментария
function displayComment(commentData) {
    const commentsContainer = document.getElementById('commentsContainer');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    
    // Получаем данные из структуры API
    const comment = commentData.Comment;
    
    // Безопасно отображаем текст
    const sanitizedName = sanitizeText(comment.name);
    const sanitizedDescription = sanitizeText(comment.description);
    
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">${sanitizedName}</div>
        </div>
        <div class="comment-text">${sanitizedDescription}</div>
    `;
    
    commentsContainer.prepend(commentElement);
}

// Функция для загрузки и отображения всех комментариев
async function loadComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    const comments = await getAllComments();
    
    // Очищаем контейнер
    commentsContainer.innerHTML = '';
    
    // Если комментариев нет
    if (!comments || comments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">Пока нет комментариев. Будьте первым!</p>';
        return;
    }
    
    // Отображаем комментарии
    comments.forEach(comment => {
        displayComment(comment);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    
    // Загружаем существующие комментарии
    loadComments();
    
    // Обработчик отправки формы
    commentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');
        
        const name = nameInput.value.trim();
        const description = textInput.value.trim();
        
        // Добавляем проверку длины
        if (name.length > 100) {
            alert('Имя не должно превышать 100 символов');
            return;
        }
        
        if (description.length > 1000) {
            alert('Комментарий не должен превышать 1000 символов');
            return;
        }
        
        if (name && description) {
            // Отправляем комментарий на сервер
            const success = await addComment(name, description);
            
            if (success) {
                // Очищаем форму
                nameInput.value = '';
                textInput.value = '';
                
                // Перезагружаем комментарии
                loadComments();
            } else {
                alert('Не удалось добавить комментарий. Пожалуйста, попробуйте еще раз.');
            }
        }
    });
}); 