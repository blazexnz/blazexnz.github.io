document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('generate-btn').addEventListener('click', generateBinaryNumbers);
    document.getElementById('toggle-btn').addEventListener('click', toggleBinaryVisibility);
});

let binaryNumbers = [];
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let binaryVisible = true;

function generateBinaryNumbers() {
    const container = document.getElementById('binary-container');
    container.innerHTML = '';
    binaryNumbers = [];
    currentIndex = 0;
    correctCount = 0;
    incorrectCount = 0;

    const numberOfGroups = parseInt(document.getElementById('number-of-groups').value) || 10;

    for (let i = 0; i < numberOfGroups; i++) {
        let randomBinary = Math.floor(Math.random() * 8).toString(2).padStart(3, '0');
        binaryNumbers.push(randomBinary);

        let binaryElement = document.createElement('div');
        binaryElement.className = 'binary';
        binaryElement.id = `binary-${i}`;
        binaryElement.innerText = randomBinary;
        container.appendChild(binaryElement);
    }

    document.getElementById('result').innerText = 'Enter the decimal value for the first binary number.';
    document.getElementById('correct-count').innerText = `Correct: ${correctCount}`;
    document.getElementById('incorrect-count').innerText = `Incorrect: ${incorrectCount}`;
    highlightCurrentBinary();
}

document.getElementById('decimal-input').addEventListener('input', checkAnswer);

function highlightCurrentBinary() {
    if (currentIndex < binaryNumbers.length) {
        document.getElementById(`binary-${currentIndex}`).style.backgroundColor = 'lightblue';
    }
}

function checkAnswer() {
    const input = document.getElementById('decimal-input');
    const currentBinary = binaryNumbers[currentIndex];
    const decimalValue = parseInt(currentBinary, 2);

    if (input.value !== '' && parseInt(input.value, 10) === decimalValue) {
        document.getElementById(`binary-${currentIndex}`).style.backgroundColor = 'lightgreen';
        correctCount++;
        currentIndex++;
        input.value = '';
        document.getElementById('correct-count').innerText = `Correct: ${correctCount}`;
        document.getElementById('result').innerText = 'Correct!';
    } else if (input.value !== '' && parseInt(input.value, 10) !== decimalValue) {
        document.getElementById(`binary-${currentIndex}`).style.backgroundColor = 'lightcoral';
        incorrectCount++;
        currentIndex++;
        input.value = '';
        document.getElementById('incorrect-count').innerText = `Incorrect: ${incorrectCount}`;
        document.getElementById('result').innerText = 'Incorrect!';
    }

    if (currentIndex < binaryNumbers.length) {
        highlightCurrentBinary();
    } else {
        document.getElementById('result').innerText = 'Finished! Click "Generate" to start again.';
    }
}

function toggleBinaryVisibility() {
    const container = document.getElementById('binary-container');
    binaryVisible = !binaryVisible;
    container.style.display = binaryVisible ? 'grid' : 'none';
}
