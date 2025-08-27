const PI_DIGITS = "14159265358979323846264338327950288419716939937510"
                + "58209749445923078164062862089986280348253421170679"; 

let startIndex = 0;
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;  // New counter for practice mode
let forgivenessUsed = false;
let started = false;
let startTime = null;
let timerInterval = null;
let mode = "competition";

let displayedDigits = ""; // tracks exactly what is shown in the scroll

const setupScreen = document.getElementById("setup-screen");
const trainingScreen = document.getElementById("training-screen");
const beginBtn = document.getElementById("beginBtn");
const digitInput = document.getElementById("digit-input");
const piDisplayInner = document.getElementById("pi-display-inner");
const counter = document.getElementById("counter");
const incorrectCounter = document.getElementById("incorrect-counter");
const message = document.getElementById("message");
const retryBtn = document.getElementById("retryBtn");
const startOverBtn = document.getElementById("startOverBtn");
const timer = document.getElementById("timer");
const piDisplay = document.getElementById("pi-display");

function updateTimer() {
  if (!started || !startTime) return;
  const elapsed = (Date.now() - startTime) / 1000;
  timer.textContent = `Time: ${elapsed.toFixed(1)}s`;
}

function resetTimer() {
  clearInterval(timerInterval);
  started = false;
  startTime = null;
  timer.textContent = "Time: 0.0s";
}

function scrollToCenter() {
  piDisplayInner.style.transform = "translateX(0px)";
  const displayWidth = piDisplay.offsetWidth;
  const text = piDisplayInner.textContent;
  if (!text) return;

  piDisplayInner.innerHTML = text.slice(0, -1) + `<span id="last-char">${text.slice(-1)}</span>`;
  const lastChar = document.getElementById("last-char");
  const rect = lastChar.getBoundingClientRect();
  const parentRect = piDisplay.getBoundingClientRect();
  const lastCharCenter = rect.left - parentRect.left + rect.width / 2;

  const offset = displayWidth / 2 - lastCharCenter;
  piDisplayInner.style.transform = `translateX(${offset}px)`;

  piDisplayInner.textContent = text;
}

function renderDigits() {
  piDisplayInner.textContent = displayedDigits;
  scrollToCenter();
}

beginBtn.addEventListener("click", () => {
  startIndex = parseInt(document.getElementById("startIndex").value, 10) || 0;
  mode = document.querySelector('input[name="mode"]:checked').value;

  currentIndex = startIndex;
  correctCount = 0;
  incorrectCount = 0; // Reset incorrect counter
  forgivenessUsed = false;
  displayedDigits = "3." + PI_DIGITS.slice(0, startIndex);
  resetTimer();

  setupScreen.classList.add("hidden");
  trainingScreen.classList.remove("hidden");

  renderDigits();
  counter.textContent = "Correct digits: 0";
  incorrectCounter.textContent = "Incorrect digits: 0";
  if (mode === "practice") incorrectCounter.classList.remove("hidden");
  else incorrectCounter.classList.add("hidden");
  message.textContent = "";
  digitInput.value = "";
  digitInput.focus();
});

digitInput.addEventListener("input", () => {
  let val = digitInput.value.replace(/[^0-9]/g, "");
  if (!val) return;

  if (!started) {
    started = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
  }

  const expected = PI_DIGITS[currentIndex];

  if (val === expected) {
    displayedDigits += val;
    correctCount++;
    currentIndex++;
    forgivenessUsed = false;
    message.textContent = "";
  } else {
    if (mode === "practice") {
      incorrectCount++;  // Increment counter for forgiven mistakes
      incorrectCounter.textContent = `Incorrect digits: ${incorrectCount}`;
      message.textContent = "Incorrect, try again!";
    } else {
      if (!forgivenessUsed) {
        message.textContent = "Incorrect! One more chance...";
        forgivenessUsed = true;
      } else {
        message.textContent = "Incorrect! Timer stopped.";
        clearInterval(timerInterval);
      }
    }
  }

  counter.textContent = `Correct digits: ${correctCount}`;
  digitInput.value = "";
  renderDigits();
});

retryBtn.addEventListener("click", () => {
  currentIndex = startIndex;
  correctCount = 0;
  incorrectCount = 0; // Reset incorrect counter
  forgivenessUsed = false;
  displayedDigits = "3." + PI_DIGITS.slice(0, startIndex);
  resetTimer();

  counter.textContent = "Correct digits: 0";
  incorrectCounter.textContent = "Incorrect digits: 0";
  if (mode === "practice") incorrectCounter.classList.remove("hidden");
  else incorrectCounter.classList.add("hidden");
  message.textContent = "";
  digitInput.value = "";
  digitInput.focus();
  renderDigits();
});

startOverBtn.addEventListener("click", () => {
  trainingScreen.classList.add("hidden");
  setupScreen.classList.remove("hidden");
  resetTimer();
});
