const wordDisplay = document.getElementById('wordDisplay');
const buttonGrid = document.getElementById('buttonGrid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

const instructionsDisplay = document.getElementById('instructions'); // New reference for the instructions

// Data for colors and their hex codes
const colors = [
    { name: 'Red', hex: '#F44336' },
    { name: 'Green', hex: '#4CAF50' },
    { name: 'Blue', hex: '#2196F3' },
    { name: 'Yellow', hex: '#FFEB3B' }
];

// Game state variables
let score = 0;
let timer = 60;
let timerInterval;
let correctAnswer = '';
let matchType = 'word'; // New variable to track what to match

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
    score = 0;
    timer = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    startTimer();
    nextRound();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function nextRound() {
    // Determine whether to match the word or the color
    matchType = Math.random() < 0.5 ? 'word' : 'color';

    // Clear previous buttons
    buttonGrid.innerHTML = '';

    // Choose a random color name to display
    const wordColorObject = colors[Math.floor(Math.random() * colors.length)];
    const displayedWord = wordColorObject.name;
    wordDisplay.textContent = displayedWord;

    // Choose a random, different color for the text
    const textColorObject = colors.filter(c => c.name !== displayedWord)[Math.floor(Math.random() * (colors.length - 1))];
    wordDisplay.style.color = textColorObject.hex;

    // Set the correct answer based on the match type
    if (matchType === 'word') {
        correctAnswer = displayedWord;
        instructionsDisplay.textContent = 'Click the button that matches the **WORD**!';
    } else { // matchType === 'color'
        correctAnswer = textColorObject.name;
        instructionsDisplay.textContent = 'Click the button that matches the **COLOR**!';
    }

    // Shuffle the buttons and place them
    const shuffledColors = shuffleArray([...colors]);
    shuffledColors.forEach(color => {
        const button = document.createElement('button');
        button.classList.add('color-btn');
        button.style.backgroundColor = color.hex;
        button.textContent = color.name;
        button.addEventListener('click', () => handleButtonClick(button.textContent));
        buttonGrid.appendChild(button);
    });
}

function handleButtonClick(clickedColorName) {
    let isCorrect;
    if (matchType === 'word') {
        isCorrect = (clickedColorName === correctAnswer);
    } else { // matchType === 'color'
        isCorrect = (clickedColorName === correctAnswer);
    }

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = score;
        nextRound();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your final score is ${score}.`);
    wordDisplay.textContent = 'Game Over';
    wordDisplay.style.color = '#e0e0e0';
    buttonGrid.innerHTML = '';
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}