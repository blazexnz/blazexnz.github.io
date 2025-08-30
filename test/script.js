let counter = 100;
let score = 0;
let startTime = null;
let timerInterval = null;

const counterDisplay = document.getElementById('counter');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    counterDisplay.textContent = counter;
    scoreDisplay.textContent = `Score: ${score}`;
}

function startTimer() {
    if (startTime === null) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            timerDisplay.textContent = `Time: ${elapsed.toFixed(1)}s`;
        }, 100);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    timerDisplay.textContent = 'Time: 0.0s';
}

addBtn.addEventListener('click', () => {
    counter += 7;
    score += 1;
    updateDisplay();
    startTimer();
});

subtractBtn.addEventListener('click', () => {
    counter -= 7;
    score += 1;
    updateDisplay();
    startTimer();
});

resetBtn.addEventListener('click', () => {
    counter = 100;
    score = 0;
    updateDisplay();
    resetTimer();
});
