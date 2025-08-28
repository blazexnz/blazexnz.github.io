const menu = document.getElementById("menu");
const game = document.getElementById("game");
const problemText = document.getElementById("problemText");

const operationSelect = document.getElementById("operation");
const difficultySelect = document.getElementById("difficulty");
const modeRadioInput = document.getElementById("modeInput");
const modeRadioContinuous = document.getElementById("modeContinuous");

const inputMode = document.getElementById("inputMode");
const continuousMode = document.getElementById("continuousMode");

const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const autoCheckToggle = document.getElementById("autoCheckToggle");

const correctCountEl = document.getElementById("correctCount");
const incorrectCountEl = document.getElementById("incorrectCount");

const problemCountEl = document.getElementById("problemCount");
const runningTotalEl = document.getElementById("runningTotal");
const toggleTotalBtn = document.getElementById("toggleTotalBtn");

const resetBtn = document.getElementById("resetBtn");
const backBtn = document.getElementById("backBtn");
const startBtn = document.getElementById("startBtn");

const timerInputEl = document.getElementById("timerInput");
const timerContinuousEl = document.getElementById("timerContinuous");

const hintBtnInput = document.getElementById("hintBtnInput");
const hintBtnContinuous = document.getElementById("hintBtnContinuous");

let operation = "add";
let difficulty = 1;
let mode = "input";

let currentProblem = {};
let correctCount = 0;
let incorrectCount = 0;

let runningTotal = 0;
let problemCount = 0;
let showTotal = true;

let timer = 0;
let timerInterval = null;

// Auto check
let autoCheckTimer = null;

function randomNumber(size) {
  if (size === "single") return Math.floor(Math.random() * 9) + 1;
  if (size === "double") return Math.floor(Math.random() * 90) + 10;
  if (size === "triple") return Math.floor(Math.random() * 900) + 100;
}

function pickRandomOperation() {
  const ops = ["add", "sub", "mul", "div"];
  return ops[Math.floor(Math.random() * ops.length)];
}

function generateProblem() {
  let selectedOperation = operation === "mix" ? pickRandomOperation() : operation;
  let fixedSize = difficulty == 1 ? "single" : difficulty == 2 ? "double" : "triple";
  const otherSizes = ["single", "double", "triple"];
  let a, b, text, answer;

  if (selectedOperation === "add" || selectedOperation === "mul") {
    if (Math.random() < 0.5) {
      a = randomNumber(fixedSize);
      b = randomNumber(otherSizes[Math.floor(Math.random() * otherSizes.length)]);
    } else {
      b = randomNumber(fixedSize);
      a = randomNumber(otherSizes[Math.floor(Math.random() * otherSizes.length)]);
    }
    if (selectedOperation === "add") {
      text = `${a} + ${b}`;
      answer = a + b;
    } else {
      text = `${a} × ${b}`;
      answer = a * b;
    }
  }

  if (selectedOperation === "sub") {
    a = randomNumber(fixedSize);
    b = randomNumber(otherSizes[Math.floor(Math.random() * otherSizes.length)]);
    if (a < b) [a, b] = [b, a];
    text = `${a} - ${b}`;
    answer = a - b;
  }

  if (selectedOperation === "div") {
    b = randomNumber("single");
    answer = randomNumber(fixedSize);
    a = b * answer;
    text = `${a} ÷ ${b}`;
  }

  return { a, b, text, answer };
}

function startTimer() {
  clearInterval(timerInterval);
  timer = 0;
  if (mode === "input") timerInputEl.textContent = "0.0";
  if (mode === "continuous") timerContinuousEl.textContent = "0.0";
  timerInterval = setInterval(() => {
    timer += 0.1;
    let displayTime = timer.toFixed(1);
    if (mode === "input") timerInputEl.textContent = displayTime;
    if (mode === "continuous") timerContinuousEl.textContent = displayTime;
  }, 100);
}

startBtn.addEventListener("click", () => {
  operation = operationSelect.value;
  difficulty = difficultySelect.value;
  mode = modeRadioInput.checked ? "input" : "continuous";

  menu.classList.add("hidden");
  game.classList.remove("hidden");

  resetGame();
  nextProblem();
  startTimer();

  if (mode === "input") answerInput.focus();
});

// Submit handler
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

// Auto Check toggle
autoCheckToggle.addEventListener("change", () => {
  submitBtn.style.display = autoCheckToggle.checked ? "none" : "block";
});

// Enter key submission
answerInput.addEventListener("keydown", (e) => {
  if (!autoCheckToggle.checked && e.key === "Enter") {
    e.preventDefault();
    checkAnswer();
  }
});

// Input event for auto check with shorter dynamic delay
answerInput.addEventListener("input", () => {
  if (autoCheckToggle.checked) {
    clearTimeout(autoCheckTimer);

    let expectedLength = currentProblem.answer.toString().length;
    let delay = 100 + expectedLength * 150; // much shorter across the board

    autoCheckTimer = setTimeout(() => {
      checkAnswer();
    }, delay);
  }
});

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  if (!isNaN(userAnswer) && answerInput.value !== "") {
    if (userAnswer === currentProblem.answer) {
      correctCount++;
      correctCountEl.textContent = correctCount;
      answerInput.value = "";
      problemText.style.color = "";
      nextProblem();
    } else {
      incorrectCount++;
      incorrectCountEl.textContent = incorrectCount;
      answerInput.value = "";
      problemText.style.color = "red";

      problemText.classList.remove("shake");
      void problemText.offsetWidth;
      problemText.classList.add("shake");
    }
    answerInput.focus();
  }
}

document.body.addEventListener("click", (e) => {
  if (mode === "continuous") {
    if (!inputMode.contains(e.target) && !e.target.closest(".controls") && !e.target.closest("#hintBtnContinuous")) {
      problemCount++;
      problemCountEl.textContent = problemCount;
      runningTotal += currentProblem.answer;
      if (showTotal) runningTotalEl.textContent = runningTotal;
      nextProblem();
    }
  }
});

toggleTotalBtn.addEventListener("click", () => {
  showTotal = !showTotal;
  runningTotalEl.parentElement.style.display = showTotal ? "block" : "none";
});

resetBtn.addEventListener("click", () => {
  resetGame();
  startTimer();
});

backBtn.addEventListener("click", () => {
  game.classList.add("hidden");
  menu.classList.remove("hidden");
  clearInterval(timerInterval);
});

hintBtnInput.addEventListener("click", () => {
  problemText.textContent = `${currentProblem.text} = ${currentProblem.answer}`;
});

hintBtnContinuous.addEventListener("click", () => {
  problemText.textContent = `${currentProblem.text} = ${currentProblem.answer}`;
});

function resetGame() {
  correctCount = 0;
  incorrectCount = 0;
  runningTotal = 0;
  problemCount = 0;
  correctCountEl.textContent = 0;
  incorrectCountEl.textContent = 0;
  runningTotalEl.textContent = 0;
  problemCountEl.textContent = 0;
  answerInput.value = "";
  problemText.style.color = "";

  inputMode.classList.toggle("hidden", mode !== "input");
  continuousMode.classList.toggle("hidden", mode !== "continuous");

  if (mode === "input") answerInput.focus();
}

function nextProblem() {
  currentProblem = generateProblem();
  problemText.textContent = currentProblem.text;
  problemText.style.color = "";
}
