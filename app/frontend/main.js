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

    // Обновление обратного отсчета
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
    
    // Обработка формы для поздравлений
    const wishForm = document.getElementById('wishForm');
    
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Здесь будет логика отправки поздравления на сервер
        alert('Поздравление успешно отправлено!');
        wishForm.reset();
    });
});

