// --- ГЛАВНАЯ НАВИГАЦИЯ САЙТА (МГНОВЕННОЕ ПЕРЕКЛЮЧЕНИЕ) ---
function switchTab(tabId) {
    // 1. Находим абсолютно все блоки контента и скрываем их
    var blocks = document.getElementsByClassName('content-block');
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove('active');
    }

    // 2. Сбрасываем выделение (активный цвет) со всех кнопок меню
    var buttons = document.getElementsByClassName('nav-btn');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }

    // 3. Мгновенно отображаем блок с нужным ID (about, portfolio или contacts)
    var targetBlock = document.getElementById(tabId);
    if (targetBlock) {
        targetBlock.classList.add('active');
    }

    // 4. Возвращаем активное выделение нажатой кнопке
    for (var k = 0; k < buttons.length; k++) {
        if (buttons[k].getAttribute('onclick').includes("'" + tabId + "'")) {
            buttons[k].classList.add('active');
        }
    }
}

// --- ОТКРЫТИЕ СТРАНИЦ КОНКРЕТНЫХ ПРОЕКТОВ ---
function openProject(projectId) {
    // Скрываем все разделы
    var blocks = document.getElementsByClassName('content-block');
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove('active');
    }

    // Показываем блок выбранного проекта
    var projectBlock = document.getElementById('project-' + projectId);
    if (projectBlock) {
        projectBlock.classList.add('active');
    }

    // Держим кнопку Portfolio активной в меню
    var buttons = document.getElementsByClassName('nav-btn');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
        if (buttons[j].getAttribute('onclick').includes("'portfolio'")) {
            buttons[j].classList.add('active');
        }
    }
}

// --- УНИВЕРСАЛЬНЫЙ СКРИПТ ДЛЯ ГИФ-СЛАЙДЕРОВ ---
function initSliders() {
    // Находим все контейнеры слайдеров на странице (в Dr Futura, Brainiac и т.д.)
    var containers = document.querySelectorAll('.gif-slider-container');

    containers.forEach(function(container) {
        var currentIndex = 0;
        var slides = container.querySelectorAll('.slider-gif-item');
        var dots = container.querySelectorAll('.gif-dot');
        var prevBtn = container.querySelector('.prev-gif-btn');
        var nextBtn = container.querySelector('.next-gif-btn');

        if (slides.length === 0) return;

        function updateSlider(index) {
            if (index >= slides.length) { currentIndex = 0; }
            else if (index < 0) { currentIndex = slides.length - 1; }
            else { currentIndex = index; }

            for (var i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
                if (dots[i]) dots[i].classList.remove('active');
            }

            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        // Привязываем события к стрелочкам конкретного слайдера
        if (prevBtn) {
            prevBtn.onclick = function(e) { e.stopPropagation(); updateSlider(currentIndex - 1); };
        }
        if (nextBtn) {
            nextBtn.onclick = function(e) { e.stopPropagation(); updateSlider(currentIndex + 1); };
        }

        // Привязываем события к точкам конкретного слайдера
        dots.forEach(function(dot, dotIdx) {
            dot.onclick = function(e) { e.stopPropagation(); updateSlider(dotIdx); };
        });
    });
}

// Запускаем инициализацию слайдеров строго после полной загрузки страницы
window.addEventListener('DOMContentLoaded', initSliders);

// --- ФУНКЦИЯ ЭФФЕКТА ДЛЯ ПРИЗРАКА 👻 ---
function popGhost() {
    var ghost = document.querySelector('.header-ghost');
    if (ghost) {
        ghost.classList.add('ghost-pop-effect');
        setTimeout(function() {
            ghost.classList.remove('ghost-pop-effect');
        }, 200);
    }
}
