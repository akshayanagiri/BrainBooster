const instructionDisplay = document.getElementById('instructionDisplay');
const doneButton = document.getElementById('doneButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Data for cross-lateral coordination instructions
const instructions = [
    'Right hand to Left knee',
    'Left hand to Right knee',
    'Right hand to Left ear',
    'Left hand to Right ear',
    'Right elbow to Left knee',
    'Left elbow to Right knee',
    'Touch nose with Left hand',
    'Touch nose with Right hand'
];

// Game state variables
let score = 0;
let timer = 60;
let timerInterval;

// Add event listeners
document.addEventListener('DOMContentLoaded', startGame);
doneButton.addEventListener('click', handleDoneClick);

function startGame() {
    score = 0;
    timer = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = `${timer}s`;
    
    // Start the timer and the game
    startTimer();
    nextInstruction();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `${timer}s`;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function nextInstruction() {
    const randomIndex = Math.floor(Math.random() * instructions.length);
    instructionDisplay.textContent = instructions[randomIndex];
}

function handleDoneClick() {
    score++;
    scoreDisplay.textContent = score;
    nextInstruction();
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Time's up! Your final score is ${score}.`);
    // Optionally, you can add a reset button to start again
    doneButton.disabled = true;
}