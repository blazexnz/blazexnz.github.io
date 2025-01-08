<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Language Practice App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      text-align: center;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    select, input, button {
      width: 100%;  /* Ensure full width for inputs, selects, and buttons */
      padding: 10px;
      font-size: 16px;
      box-sizing: border-box;  /* Include padding in the width calculation */
    }
    #number-display {
      font-size: 24px;
      text-align: center;
      margin: 20px 0;
    }
    #feedback {
      color: red;
      text-align: center;
      margin-top: 10px;
    }
    #correct-answer {
      color: blue;
      text-align: center;
      margin-top: 10px;
    }
    #score-display {
      text-align: center;
      margin-top: 15px;
    }
    .form-group {
      display: block;  /* Make sure inputs are stacked vertically */
    }
    .form-group input {
      width: 100%;
    }
    .form-group select {
      width: 100%;
    }
    .inline-inputs {
      display: flex;
      justify-content: space-between;
    }
    .inline-inputs input {
      width: 48%;  /* Ensure min and max number inputs are on the same line */
    }
  </style>
</head>
<body>
  <h1>Language Practice</h1>
  <div class="container">
    <div class="form-group">
      <label for="language-toggle">Choose Language:</label>
      <select id="language-toggle">
        <option value="vietnamese">Vietnamese</option>
        <option value="tagalog">Tagalog</option>
      </select>
    </div>

    <div class="form-group">
      <label for="mode-toggle">Mode:</label>
      <select id="mode-toggle">
        <option value="base-to-target">Base to Target</option>
        <option value="target-to-base">Target to Base</option>
      </select>
    </div>

    <div class="form-group inline-inputs">
      <div>
        <label for="min-number">Min Number:</label>
        <input type="number" id="min-number" value="0" min="0">
      </div>
      <div>
        <label for="max-number">Max Number:</label>
        <input type="number" id="max-number" value="10" min="0">
      </div>
    </div>

    <div class="form-group">
      <button id="start-over">Start Over</button>
    </div>

    <div id="number-display"></div>

    <div class="form-group">
      <label for="answer-input">Your Answer:</label>
      <input type="text" id="answer-input" placeholder="Enter your answer">
    </div>

    <div id="feedback"></div>
    <div id="correct-answer"></div>

    <div id="score-display">Score: 0</div>

    <div class="form-group">
      <button id="show-answer">Show Answer</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>

<script>
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

  const min = parseInt(minNumberInput.value, 10);
  const max = parseInt(maxNumberInput.value, 10);
  const range = generateNumberRange(min, max);

  currentNumber = getRandomNumber(range);

  if (currentMode === 'base-to-target') {
    numberDisplay.textContent = currentNumber;
  } else {
    numberDisplay.textContent = numbers[currentLanguage][range.indexOf(currentNumber)];
  }

  // Force number keyboard for target-to-base mode
  if (currentMode === 'target-to-base') {
    answerInput.type = 'tel'; // Change input type to 'tel' to trigger numeric keyboard
  } else {
    answerInput.type = 'text'; // Revert to text input for other modes
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
  updateQuestion();
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
minNumberInput.value = Math.max(parseInt(minNumberInput.value, 10), 1);
minNumberInput.addEventListener('input', () => {
  minNumberInput.value = Math.max(parseInt(minNumberInput.value, 10), 1);
});

// Initialize the first question
updateQuestion();
</script>
