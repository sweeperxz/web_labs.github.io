$(document).ready(function() {
    // Глобальні змінні
    let currentNumber = 1;
    const maxNumber = 20;
    let timerInterval;
    let timeRemaining = 60;
    let attempts = 0;
    let gameStats = loadGameStats();
    
    // Ініціалізація гри
    initGame();
    
    // Функція ініціалізації гри
    function initGame() {
        // Очистити таймер, якщо він запущений
        clearInterval(timerInterval);
        
        // Скидання змінних
        currentNumber = 1;
        timeRemaining = 60;
        attempts = 0;
        
        // Оновлення таймера
        updateTimer();
        
        // Створити ігрове поле
        createGameBoard();
        
        // Запустити таймер
        startTimer();
        
        // Оновлення інформації
        updateGameInfo();
        
        // Оновлення статистики
        updateStatsTable();
    }
    
    // Створення ігрового поля
    function createGameBoard() {
        const $gameBoard = $('.game-board');
        $gameBoard.empty();
        
        // Створюємо масив чисел від 1 до 20
        const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
        
        // Перемішуємо масив
        shuffleArray(numbers);
        
        // Створюємо елементи на ігровому полі
        for (let i = 0; i < maxNumber; i++) {
            // Вибір випадкового розміру шрифту (5 варіантів)
            const fontSizes = [16, 18, 20, 22, 24];
            const fontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
            
            // Генерація випадкового кольору
            const randomColor = getRandomColor();
            
            // Створення елемента
            const $number = $('<div>')
                .addClass('number')
                .text(numbers[i])
                .css({
                    'font-size': fontSize + 'px',
                    'color': randomColor
                })
                .attr('data-number', numbers[i]);
            
            $gameBoard.append($number);
        }
        
        // Додати подію кліка на числа
        $('.number').on('click', handleNumberClick);
    }
    
    // Обробник кліка на число
    function handleNumberClick() {
        const $number = $(this);
        const numberValue = parseInt($number.attr('data-number'));
        
        // Збільшуємо лічильник спроб
        attempts++;
        
        // Перевіряємо, чи натиснуте правильне число
        if (numberValue === currentNumber) {
            // Виділяємо правильний вибір
            $number.addClass('selected');
            
            // Збільшуємо лічильник поточного числа
            currentNumber++;
            
            // Оновлюємо інформацію про гру
            updateGameInfo();
            
            // Перевіряємо, чи гра завершена
            if (currentNumber > maxNumber) {
                endGame(true);
            }
        } else {
            // Помилка - неправильне число
            $number.addClass('wrong');
            
            // Показуємо повідомлення про помилку
            showErrorMessage();
            
            // Видаляємо клас через 500мс
            setTimeout(function() {
                $number.removeClass('wrong');
            }, 500);
        }
    }
    
    // Показати повідомлення про помилку
    function showErrorMessage() {
        $('.game-info').text('Не вірна цифра! Спробуйте ще раз.').css('color', '#f44336');
        setTimeout(function() {
            updateGameInfo();
        }, 1500);
    }
    
    // Оновлення інформації про гру
    function updateGameInfo() {
        $('.game-info').text(`Знайдіть число ${currentNumber}`).css('color', '#333');
    }
    
    // Запуск таймера
    function startTimer() {
        timerInterval = setInterval(function() {
            timeRemaining--;
            updateTimer();
            
            if (timeRemaining <= 0) {
                // Час вийшов
                endGame(false);
            }
        }, 1000);
    }
    
    // Оновлення відображення таймера
    function updateTimer() {
        $('.timer').text(`Час: ${timeRemaining} сек.`);
        
        // Змінюємо колір таймера залежно від часу, що залишився
        if (timeRemaining <= 10) {
            $('.timer').css('color', '#d50000');
        } else if (timeRemaining <= 30) {
            $('.timer').css('color', '#ff6d00');
        } else {
            $('.timer').css('color', '#2e7d32');
        }
    }
    
    // Завершення гри
    function endGame(isSuccess) {
        // Зупиняємо таймер
        clearInterval(timerInterval);
        
        // Вимикаємо інтерактивність чисел
        $('.number').off('click');
        
        if (isSuccess) {
            const timeUsed = 60 - timeRemaining;
            
            // Зберігаємо результат у статистиці
            saveGameStats(timeUsed, attempts);
            
            // Показуємо модальне вікно з привітанням
            $('#congratsModal h3').text(`Вітаємо! Ви знайшли всі числа за ${timeUsed} секунд`);
            $('#congratsModal p').text(`Кількість спроб: ${attempts}`);
            $('#congratsModal').css('display', 'flex');
        } else {
            // Показуємо модальне вікно з повідомленням про поразку
            $('#timeoutModal').css('display', 'flex');
        }
        
        // Оновлюємо таблицю статистики
        updateStatsTable();
    }
    
    // Завантаження статистики з localStorage
    function loadGameStats() {
        const stats = localStorage.getItem('numberGameStats');
        return stats ? JSON.parse(stats) : [];
    }
    
    // Збереження статистики в localStorage
    function saveGameStats(time, attempts) {
        const newGame = {
            time: time,
            attempts: attempts,
            date: new Date().toLocaleString()
        };
        
        gameStats.push(newGame);
        
        // Сортування за часом (швидше = краще)
        gameStats.sort((a, b) => a.time - b.time);
        
        // Обмеження списку до 10 найкращих результатів
        if (gameStats.length > 10) {
            gameStats = gameStats.slice(0, 10);
        }
        
        // Збереження в localStorage
        localStorage.setItem('numberGameStats', JSON.stringify(gameStats));
    }
    
    // Оновлення таблиці статистики
    function updateStatsTable() {
        const $tbody = $('#statsTable tbody');
        $tbody.empty();
        
        if (gameStats.length === 0) {
            $tbody.append('<tr><td colspan="3">Немає записів</td></tr>');
            return;
        }
        
        gameStats.forEach((game, index) => {
            const $row = $('<tr>')
                .append($('<td>').text(game.date))
                .append($('<td>').text(game.time + ' сек.'))
                .append($('<td>').text(game.attempts));
            
            // Виділення найкращого результату
            if (index === 0) {
                $row.addClass('best-score');
            }
            
            $tbody.append($row);
        });
    }
    
    // Функція для перемішування масиву (алгоритм Фішера–Йейтса)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Функція для генерації випадкового кольору
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Обробники подій для кнопок
    $('#restartGame').on('click', function() {
        initGame();
    });
    
    // Обробники подій для модальних вікон
    $('.modal-restart').on('click', function() {
        $(this).closest('.modal').css('display', 'none');
        initGame();
    });
    
    $('.modal-close').on('click', function() {
        $(this).closest('.modal').css('display', 'none');
    });
}); 