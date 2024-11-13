document.getElementById('generateBtn').addEventListener('click', generateNumber);
document.getElementById('answerInput').addEventListener('input', checkAnswer);

let currentNumber = null;
let correctAnswer = null;
let mode = '';
let correctCount = 0; // Counter for correct answers

function generateNumber() {
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);
    mode = document.getElementById('modeToggle').value;

    // Generate a random number within the specified range
    currentNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    if (mode === 'binaryToDecimal') {
        document.getElementById('numberContainer').innerHTML = `<div class="number">${currentNumber.toString(2)}</div>`;
        correctAnswer = currentNumber; // Decimal is the correct answer
    } else {
        document.getElementById('numberContainer').innerHTML = `<div class="number">${currentNumber}</div>`;
        correctAnswer = currentNumber.toString(2); // Binary is the correct answer
    }

    // Clear input and feedback for the new number
    document.getElementById('answerInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').classList.remove('correct', 'wrong');
}

function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim();
    const feedback = document.getElementById('feedback');

    if (userAnswer === correctAnswer.toString()) {
        feedback.textContent = 'Correct!';
        feedback.classList.remove('wrong');
        feedback.classList.add('correct');

        // Increment the correct answer counter and update the display
        correctCount++;
        document.getElementById('counter').textContent = `Correct Answers: ${correctCount}`;

        // Automatically progress to the next number after a short delay
        setTimeout(() => {
            generateNumber();
        }, 1000);
    } else {
        feedback.textContent = 'Incorrect, try again.';
        feedback.classList.remove('correct');
        feedback.classList.add('wrong');
    }
}
