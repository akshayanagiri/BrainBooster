// Get all necessary elements from the HTML
const gamePads = document.querySelectorAll('.game-pad');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const levelDisplay = document.getElementById('level');
const messageDisplay = document.getElementById('message');

// Game state variables
let sequence = [];
let userSequence = [];
let level = 0;
let score = 0;
let isPlaying = false;
let isUserTurn = false;

// Sounds for each pad (optional, but good for feedback)
const sounds = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), // Green
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), // Red
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), // Yellow
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')  // Blue
];

// Start the game
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Add event listeners to each game pad
gamePads.forEach(pad => {
    pad.addEventListener('click', () => {
        if (isUserTurn) {
            handleUserClick(pad);
        }
    });
});

// Main game functions

function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    resetGame(); // Reset everything and start
    nextLevel();
    messageDisplay.textContent = 'Good luck!';
}

function resetGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    score = 0;
    levelDisplay.textContent = level;
    messageDisplay.textContent = 'Game reset. Press Start to play again!';
    isPlaying = false;
    isUserTurn = false;
}

function nextLevel() {
    userSequence = [];
    level++;
    levelDisplay.textContent = level;
    messageDisplay.textContent = 'Watch the sequence!';
    disablePads();
    
    // Generate the next part of the sequence
    const nextPadIndex = Math.floor(Math.random() * 4);
    sequence.push(nextPadIndex);
    
    // Play the sequence for the user
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < sequence.length) {
            lightUpPad(sequence[i]);
            i++;
        } else {
            clearInterval(interval);
            isUserTurn = true;
            messageDisplay.textContent = 'Repeat the sequence!';
            enablePads();
        }
    }, 800); // Time between each pad lighting up
}

function lightUpPad(padIndex) {
    const pad = gamePads[padIndex];
    pad.classList.add('active');
    sounds[padIndex].play();
    setTimeout(() => {
        pad.classList.remove('active');
    }, 400); // How long the pad stays lit
}

function handleUserClick(pad) {
    const padIndex = parseInt(pad.dataset.pad);
    userSequence.push(padIndex);
    
    // Provide feedback to the user
    lightUpPad(padIndex);
    
    // Check if the user's click is correct
    if (userSequence[userSequence.length - 1] === sequence[userSequence.length - 1]) {
        // If the entire sequence has been repeated correctly
        if (userSequence.length === sequence.length) {
            isUserTurn = false;
            messageDisplay.textContent = 'Correct! Next level...';
            setTimeout(nextLevel, 1500);
        }
    } else {
        // Game over
        endGame();
    }
}

function endGame() {
    isUserTurn = false;
    isPlaying = false;
    messageDisplay.textContent = `Game Over! You reached Level ${level}. Press Reset to play again.`;
    disablePads();
}

function disablePads() {
    gamePads.forEach(pad => pad.classList.add('disabled'));
}

function enablePads() {
    gamePads.forEach(pad => pad.classList.remove('disabled'));
}