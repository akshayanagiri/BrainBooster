const problemDisplay = document.getElementById('problemDisplay');
const answerInput = document.getElementById('answerInput');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Game state variables
let score = 0;
let timer = 60;
let timerInterval;
let correctAnswer;

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
    score = 0;
    timer = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    nextProblem();
    startTimer();
    answerInput.focus();
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

function nextProblem() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    
    // Ensure division results in a whole number
    if (operator === '/') {
        num1 = num1 * num2;
    }

    problemDisplay.textContent = `${num1} ${operator} ${num2}`;
    correctAnswer = eval(`${num1} ${operator} ${num2}`); // Calculates the answer
    answerInput.value = '';
}

answerInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (userAnswer === correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
        nextProblem();
    } else {
        // You could add a penalty or message here,
        // but for a fast-paced game, just moving on is fine.
        nextProblem();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your final score is ${score}.`);
    answerInput.disabled = true;
}