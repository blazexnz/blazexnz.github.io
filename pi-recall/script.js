const PI_DIGITS = "14159265358979323846264338327950288419716939937510"
                + "58209749445923078164062862089986280348253421170679"
                + "82148086513282306647093844609550582231725359408128"
                + "48111745028410270193852110555964462294895493038196"
                + "44288109756659334461284756482337867831652712019091"
                + "45648566923460348610454326648213393607260249141273"
                + "72458700660631558817488152092096282925409171536436"
                + "78925903600113305305488204665213841469519415116094"
                + "33057270365759591953092186117381932611793105118548"
                + "07446237996274956735188575272489122793818301194912"
                + "98336733624406566430860213949463952247371907021798"
                + "60943702770539217176293176752384674818467669405132"
                + "00056812714526356082778577134275778960917363717872"
                + "14684409012249534301465495853710507922796892589235"
                + "42019956112129021960864034418159813629774771309960"
                + "51870721134999999837297804995105973173281609631859"
                + "50244594553469083026425223082533446850352619311881"
                + "71010003137838752886587533208381420617177669147303"
                + "59825349042875546873115956286388235378759375195778"
                + "18577805321712268066130019278766111959092164201989";

let startIndex = 0;
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let forgivenessUsed = false;
let started = false;
let startTime = null;
let timerInterval = null;
let mode = "competition";

let displayedDigits = "";

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
  incorrectCount = 0;
  forgivenessUsed = false;
  displayedDigits = "3." + PI_DIGITS.slice(0, startIndex);
  resetTimer();

  setupScreen.classList.add("hidden");
  trainingScreen.classList.remove("hidden");

  renderDigits();
  counter.textContent = "Correct: 0";
  incorrectCounter.textContent = "Incorrect: 0";
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
      incorrectCount++;
      incorrectCounter.textContent = `Incorrect: ${incorrectCount}`;
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

  counter.textContent = `Correct: ${correctCount}`;
  digitInput.value = "";
  renderDigits();
});

retryBtn.addEventListener("click", () => {
  currentIndex = startIndex;
  correctCount = 0;
  incorrectCount = 0;
  forgivenessUsed = false;
  displayedDigits = "3." + PI_DIGITS.slice(0, startIndex);
  resetTimer();

  counter.textContent = "Correct: 0";
  incorrectCounter.textContent = "Incorrect: 0";
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
