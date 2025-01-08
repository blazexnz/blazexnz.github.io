const numbers = {
  vietnamese: ['một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười',
               'một nghìn', 'mười nghìn', 'một trăm nghìn', 'một triệu', 'mười triệu', 'một trăm triệu', 'một tỷ'],
  tagalog: ['isa', 'dalawa', 'tatlo', 'apat', 'lima', 'anim', 'pito', 'walo', 'siyam', 'sampu',
            'isang libo', 'sampung libo', 'isang daang libo', 'isang milyon', 'sampong milyon', 'isang daang milyon', 'isang bilyon']
};

// Helper function to remove diacritics from Vietnamese text
function removeDiacritics(str) {
  const map = {
    'a': 'áàảãạăắằẳẵặâấầẩẫậ',
    'e': 'éèẻẽẹêếềểễệ',
    'i': 'íìỉĩị',
    'o': 'óòỏõọôốồổỗộơớờởỡợ',
    'u': 'úùủũụưứừửữự',
    'y': 'ýỳỷỹỵ',
    'd': 'đ',
    'A': 'ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ',
    'E': 'ÉÈẺẼẸÊẾỀỂỄỆ',
    'I': 'ÍÌỈĨỊ',
    'O': 'ÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ',
    'U': 'ÚÙỦŨỤƯỨỪỬỮỰ',
    'Y': 'ÝỲỶỸỴ',
    'D': 'Đ'
  };
  return str.split('').map(c => Object.keys(map).find(key => map[key].includes(c)) || c).join('');
}

const languageToggle = document.getElementById('language-toggle');
const modeToggle = document.getElementById('mode-toggle');
const minNumberInput = document.getElementById('min-number');
const maxNumberInput = document.getElementById('max-number');
const numberDisplay = document.getElementById('number-display');
const answerInput = document.getElementById('answer-input');
const feedbackDisplay = document.getElementById('feedback');
const correctAnswerDisplay = document.getElementById('correct-answer');
const scoreDisplay = document.getElementById('score-display');
const startOverButton = document.getElementById('start-over');
const showAnswerButton = document.getElementById('show-answer');

let currentLanguage = 'vietnamese';
let currentMode = 'base-to-target';
let currentNumber = 1;
let score = 0;

function generateNumberRange(min, max) {
  const range = [];
  for (let i = min; i <= Math.min(100, max); i++) {
    range.push(i);
  }
  if (max >= 1000) {
    range.push(1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000);
  }
  return range;
}

function getRandomNumber(range) {
  return range[Math.floor(Math.random() * range.length)];
}

function updateQuestion() {
  feedbackDisplay.classList.add('hidden');
  correctAnswerDisplay.classList.add('hidden');
  answerInput.value = '';

  const min = Math.max(parseInt(minNumberInput.value, 10), 1); // Ensure min value is 1
  const max = parseInt(maxNumberInput.value, 10);
  const range = generateNumberRange(min, max);

  currentNumber = getRandomNumber(range);

  if (currentMode === 'base-to-target') {
    numberDisplay.textContent = currentNumber;
    answerInput.setAttribute('inputmode', 'text'); // Regular input for base-to-target
  } else {
    numberDisplay.textContent = numbers[currentLanguage][range.indexOf(currentNumber)];
    answerInput.setAttribute('inputmode', 'numeric'); // Numeric input for target-to-base
  }
}

function checkAnswer() {
  const userAnswer = currentMode === 'base-to-target' 
    ? numbers[currentLanguage][generateNumberRange(1, 1000000000).indexOf(currentNumber)]
    : currentNumber.toString();

  // Remove diacritics for Vietnamese
  const normalizedUserAnswer = removeDiacritics(answerInput.value.toLowerCase().trim());
  const normalizedCorrectAnswer = removeDiacritics(userAnswer.toLowerCase().trim());

  if (normalizedUserAnswer === normalizedCorrectAnswer) {
    feedbackDisplay.textContent = 'Correct!';
    feedbackDisplay.classList.remove('hidden');
    feedbackDisplay.style.color = 'green'; // Correct feedback in green
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    setTimeout(() => updateQuestion(), 1000);
  } else if (answerInput.value.length >= userAnswer.length) {
    feedbackDisplay.textContent = `Wrong! The correct answer was ${userAnswer}.`;
    feedbackDisplay.classList.remove('hidden');
    feedbackDisplay.style.color = 'red'; // Incorrect feedback in red
    setTimeout(() => updateQuestion(), 1000);
  }
}

languageToggle.addEventListener('change', (e) => {
  currentLanguage = e.target.value;
  updateQuestion();
});

modeToggle.addEventListener('change', (e) => {
  currentMode = e.target.value;
  updateQuestion(); // Automatically update input mode when mode changes
});

answerInput.addEventListener('input', checkAnswer);

startOverButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  updateQuestion();
});

showAnswerButton.addEventListener('click', () => {
  const userAnswer = currentMode === 'base-to-target' 
    ? numbers[currentLanguage][generateNumberRange(1, 1000000000).indexOf(currentNumber)]
    : currentNumber;

  correctAnswerDisplay.textContent = `The correct answer is: ${userAnswer}`;
  correctAnswerDisplay.classList.remove('hidden');
  setTimeout(() => updateQuestion(), 1000);
});

// Ensure the minimum number is set to 1 on input
minNumberInput.addEventListener('input', () => {
  minNumberInput.value = Math.max(parseInt(minNumberInput.value, 10), 1);
});

// Initialize the first question
updateQuestion();
