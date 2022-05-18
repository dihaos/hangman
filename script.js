const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const notificationText = document.querySelector('#notification-text');
const finalMessage = document.querySelector('#final-message');
const finalMessageRevealWord = document.querySelector('#final-message-reveal-word');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['ЖИЗНЬ', 'СВОБОДА', 'КОСМОС', 'СМЕРТЬ'];
const letterTwice = 'Вы уже выбрали эту букву'
const correctLetters = [];
const wrongLetters = [];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

// Отображение правильных букв
const displayWord = () => {
    wordEl.innerHTML =
        `${selectedWord
            .split('')
            .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
            .join('')}`;

    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Великолепно!';
        finalMessageRevealWord.innerText = '';
        popup.style.display = 'flex';

        playable = false;
    }
}

// Отображение неправильных букв
const updateWrongLettersEl = () => {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Неправильные буквы:</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

    figureParts.forEach((part, i) => {
        const errors = wrongLetters.length;

        i < errors
            ? part.style.display = 'block'
            : part.style.display = 'none';
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'К сожалению, вы проиграли.';
        finalMessageRevealWord.innerText = `Правильный ответ: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

// Отображение уведомления о повторном выборе буквы 
const showNotification = (text = letterTwice) => {
    notificationText.innerText = text
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

// Отслеживание нажатий клавиш
window.addEventListener('keydown', e => {
    if (playable) {
        if (/[а-я]/i.test(e.key)) {
            const letter = e.key.toUpperCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);

                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);

                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        } 
    }
});


displayWord();