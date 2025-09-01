let counter = 100;
let score = 0;
let startTime = null;
let timerInterval = null;

let stepSizes = [7, 9, 11];
let currentStepIndex = 0;
let currentStep = stepSizes[currentStepIndex];
let randomMode = false; // default: cycle mode is active
let juggleMode = false; // new mode

const counterDisplay = document.getElementById('counter');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const stepDisplay = document.getElementById('step-display');

const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const resetBtn = document.getElementById('reset');
const cycleBtn = document.getElementById('cycle');
const randomBtn = document.getElementById('random');
const juggleBtn = document.getElementById('juggle');

let juggleRounds = 0;
let juggleTotalRounds = 5;
let juggleNumber = getRandomThreeDigit();
let juggleStep = 0;
let juggleOperand = '+';
let juggleStepSizes = [3, 5, 7, 9, 11];

function getRandomThreeDigit() {
    return Math.floor(Math.random() * 900) + 100;
}

function getJuggleStep() {
    juggleStep = juggleStepSizes[Math.floor(Math.random() * juggleStepSizes.length)];
    juggleOperand = Math.random() < 0.5 ? '+' : '-';
    return `${juggleOperand}${juggleStep}`;
}

function updateDisplay() {
    counterDisplay.textContent = counter;
    scoreDisplay.textContent = `Score: ${score}`;

    if (juggleMode) {
        stepDisplay.style.display = 'block';
        stepDisplay.textContent = `Step: ${getJuggleStep()}`;
        addBtn.textContent = '🔄'; // refresh
        subtractBtn.textContent = '➡️'; // next
        if (juggleRounds >= juggleTotalRounds) {
            subtractBtn.disabled = true;
        } else {
            subtractBtn.disabled = false;
        }
        cycleBtn.classList.remove('active');
        randomBtn.classList.remove('active');
        juggleBtn.classList.add('active');
    } else if (randomMode) {
        stepDisplay.style.display = 'block';
        stepDisplay.textContent = `Step: ${currentStep}`;
        addBtn.textContent = `+`;
        subtractBtn.textContent = `-`;
        cycleBtn.classList.remove('active');
        randomBtn.classList.add('active');
        juggleBtn.classList.remove('active');
    } else {
        stepDisplay.style.display = 'none';
        addBtn.textContent = `+${currentStep}`;
        subtractBtn.textContent = `-${currentStep}`;
        randomBtn.classList.remove('active');
        cycleBtn.classList.add('active');
        juggleBtn.classList.remove('active');
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

function fullReset() {
    counter = 100;
    score = 0;
    resetTimer();
    currentStepIndex = 0;
    currentStep = stepSizes[currentStepIndex];
    juggleRounds = 0;
    juggleNumber = getRandomThreeDigit();
    updateDisplay();
}

function getStep() {
    if (randomMode) {
        const step = currentStep;
        currentStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
        return step;
    }
    return currentStep;
}

// ----- Button Handlers -----

addBtn.addEventListener('click', () => {
    startTimer();
    if (juggleMode) {
        // refresh starting number
        juggleNumber = getRandomThreeDigit();
        juggleRounds = 0;
        counter = juggleNumber;
    } else {
        const step = getStep();
        counter += step;
        score += 1;
    }
    updateDisplay();
});

subtractBtn.addEventListener('click', () => {
    startTimer();
    if (juggleMode) {
        if (juggleRounds < juggleTotalRounds) {
            counter = juggleOperand === '+' ? counter + juggleStep : counter - juggleStep;
            juggleRounds++;
        }
    } else {
        const step = getStep();
        counter -= step;
        score += 1;
    }
    updateDisplay();
});

resetBtn.addEventListener('click', () => {
    fullReset();
});

function bindButton(button, handler) {
    button.addEventListener('click', handler);
    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        handler();
    }, { passive: false });
}

bindButton(cycleBtn, () => {
    randomMode = false;
    juggleMode = false;
    currentStepIndex = (currentStepIndex + 1) % stepSizes.length;
    currentStep = stepSizes[currentStepIndex];
    fullReset();
});

bindButton(randomBtn, () => {
    randomMode = true;
    juggleMode = false;
    currentStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
    fullReset();
});

bindButton(juggleBtn, () => {
    juggleMode = true;
    randomMode = false;
    juggleRounds = 0;
    juggleNumber = getRandomThreeDigit();
    counter = juggleNumber;
    fullReset();
});

updateDisplay();
