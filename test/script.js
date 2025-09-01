let counter = 100;
let score = 0;
let startTime = null;
let timerInterval = null;

let stepSizes = [7, 9, 11];
let currentStepIndex = 0;
let currentStep = stepSizes[currentStepIndex];
let randomMode = false;

const counterDisplay = document.getElementById('counter');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const stepDisplay = document.getElementById('step-display');

const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const resetBtn = document.getElementById('reset');
const cycleBtn = document.getElementById('cycle');
const randomBtn = document.getElementById('random');

function updateDisplay() {
    counterDisplay.textContent = counter;
    scoreDisplay.textContent = `Score: ${score}`;

    if (randomMode) {
        stepDisplay.style.display = 'block';
        stepDisplay.textContent = `Step: ${currentStep}`;
        addBtn.textContent = `+`;
        subtractBtn.textContent = `-`;
        cycleBtn.classList.remove('active');
        randomBtn.classList.add('active');
    } else {
        stepDisplay.style.display = 'none';
        addBtn.textContent = `+${currentStep}`;
        subtractBtn.textContent = `-${currentStep}`;
        randomBtn.classList.remove('active');
        cycleBtn.classList.add('active');
    }
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

function getStep() {
    if (randomMode) {
        currentStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
    }
    return currentStep;
}

addBtn.addEventListener('click', () => {
    const step = getStep();
    counter += step;
    score += 1;
    updateDisplay();
    startTimer();
});

subtractBtn.addEventListener('click', () => {
    const step = getStep();
    counter -= step;
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

cycleBtn.addEventListener('click', () => {
    randomMode = false;
    currentStepIndex = (currentStepIndex + 1) % stepSizes.length;
    currentStep = stepSizes[currentStepIndex];
    updateDisplay();
});

randomBtn.addEventListener('click', () => {
    randomMode = !randomMode;
    if (randomMode) {
        currentStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
    }
    updateDisplay();
});

updateDisplay();
