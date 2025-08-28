let mode = '';
let correct = 0;
let incorrect = 0;
let timer = 0;
let timerInterval;
let currentAnswer = 0;

const modeSelection = document.getElementById('modeSelection');
const gameArea = document.getElementById('gameArea');
const modeButtons = document.querySelectorAll('.mode-button');
const problemText = document.getElementById('problemText');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const hintBtn = document.getElementById('hintBtn');
const scoreboard = document.getElementById('scoreboard');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const startOverBtn = document.getElementById('startOverBtn');

// Clicking a mode starts the game immediately
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    mode = btn.dataset.mode;
    modeButtons.forEach(b => b.style.backgroundColor = '#ff69b4');
    btn.style.backgroundColor = '#ff4500';

    // Start game immediately
    modeSelection.classList.add('hidden');
    gameArea.classList.remove('hidden');
    correct = 0;
    incorrect = 0;
    timer = 0;
    startTimer();
    nextProblem();
    updateScore();
    answerInput.focus();
  });
});

function nextProblem() {
  let a = getRandomNumber();
  let b = getRandomNumber();

  if (mode === 'sub') {
    // Ensure subtraction does not go below zero
    if (b > a) [a, b] = [b, a];
    currentAnswer = a - b;
    problemText.textContent = `${a} - ${b} = ?`;
  } else if (mode === 'add') {
    currentAnswer = a + b;
    problemText.textContent = `${a} + ${b} = ?`;
  }

  problemText.classList.remove('shake');
  problemText.style.color = '#333';
  answerInput.value = '';
  answerInput.focus();
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function checkAnswer() {
  const answer = parseInt(answerInput.value);
  if (answer === currentAnswer) {
    correct++;
    nextProblem();
  } else {
    incorrect++;
    problemText.classList.add('shake');
    problemText.style.color = 'red';
    answerInput.value = '';
    answerInput.focus();
  }
  updateScore();
}

submitBtn.addEventListener('click', checkAnswer);

// Submit on Enter key press
answerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// Hint now solves the problem on screen directly
hintBtn?.addEventListener('click', () => {
  answerInput.value = currentAnswer;
});

function updateScore() {
  scoreboard.textContent = `Correct: ${correct} Incorrect: ${incorrect}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);
}

resetBtn.addEventListener('click', () => {
  correct = 0;
  incorrect = 0;
  timer = 0;
  updateScore();
  timerDisplay.textContent = `Time: 0s`;
  nextProblem();
});

startOverBtn.addEventListener('click', () => {
  gameArea.classList.add('hidden');
  modeSelection.classList.remove('hidden');
  mode = '';
  modeButtons.forEach(b => b.style.backgroundColor = '#ff69b4');
  clearInterval(timerInterval);
});
