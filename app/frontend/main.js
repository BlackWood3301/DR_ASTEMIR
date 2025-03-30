document.addEventListener('DOMContentLoaded', function() {
    // Мобильная навигация
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Анимация навигации
        nav.classList.toggle('nav-active');
        
        // Анимация ссылок
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Анимация бургера
        burger.classList.toggle('toggle');
    });

    // Установка даты дня рождения для обратного отсчета
    // Здесь можно установить реальную дату
    const birthdayDate = new Date('2024-04-01T00:00:00').getTime();

    // Закомментируйте или удалите этот блок, если не нужен обратный отсчет
    /*
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h3>С Днем Рождения!</h3>';
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    */

    // Анимация конфетти при нажатии на кнопку празднования
    const celebrateBtn = document.getElementById('celebrateBtn');
    const confettiContainer = document.querySelector('.confetti');
    
    celebrateBtn.addEventListener('click', () => {
        createConfetti();
        celebrateBtn.innerText = 'Ура! 🎉';
        
        setTimeout(() => {
            celebrateBtn.innerText = 'Отпраздновать!';
        }, 3000);
    });
    
    function createConfetti() {
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.position = 'absolute';
            confetti.style.top = '-10px';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Обработка модального окна для статей
    const modal = document.getElementById('articleModal');
    const newArticleBtn = document.getElementById('newArticleBtn');
    const closeBtn = document.querySelector('.close');
    
    newArticleBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработка формы для статей
    const articleForm = document.getElementById('articleForm');
    
    articleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Здесь будет логика отправки статьи на сервер
        alert('Статья успешно создана!');
        modal.style.display = 'none';
    });
    
    // Загрузка поздравлений с API при загрузке страницы
    loadPozdravlenia();
    
    // Обработка формы для поздравлений
    const wishForm = document.getElementById('wishForm');
    
    wishForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[type="text"]');
        const descriptionInput = this.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        
        if (name && description) {
            // Отправляем на сервер
            const success = await addPozdravlenie(name, description);
            
            if (success) {
                // Очищаем форму
                this.reset();
                
                // Перезагружаем список поздравлений
                loadPozdravlenia();
                
                alert('Поздравление успешно отправлено!');
            } else {
                alert('Не удалось отправить поздравление. Пожалуйста, попробуйте еще раз.');
            }
        } else {
            alert('Пожалуйста, заполните все поля формы.');
        }
    });
    
    // Функция для загрузки поздравлений с сервера
    async function loadPozdravlenia() {
        const wishesContainer = document.querySelector('.wishes-container');
        
        // Получаем данные с API
        const pozdravlenia = await getAllPozdravlenia();
        
        // Если нет данных
        if (!pozdravlenia || pozdravlenia.length === 0) {
            wishesContainer.innerHTML = '<p class="no-wishes">Пока нет поздравлений. Будьте первым!</p>';
            return;
        }
        
        // Очищаем контейнер
        wishesContainer.innerHTML = '';
        
        // Добавляем каждое поздравление в контейнер
        pozdravlenia.forEach(item => {
            // Получаем данные из вложенного объекта Pozdravlenia
            const pozdravlenie = item.Pozdravlenia;
            
            // Проверка на случай если структура данных изменится
            if (!pozdravlenie) {
                console.error('Неожиданная структура данных:', item);
                return;
            }
            
            const wishCard = document.createElement('div');
            wishCard.classList.add('wish-card');
            
            wishCard.innerHTML = `
                <div class="wish-header">
                    <h3>${pozdravlenie.name || 'Анонимно'}</h3>
                </div>
                <p>${pozdravlenie.description || 'Поздравление без текста'}</p>
            `;
            
            wishesContainer.appendChild(wishCard);
        });
    }
});

