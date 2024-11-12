let binaryNumbers = [];
let currentIndex = 0;
let correctCount = 0; // Counter for correct answers
let incorrectCount = 0; // Counter for incorrect answers
let binaryVisible = true; // Toggle visibility of binary numbers

function generateBinaryNumbers() {
    const groupCount = parseInt(document.getElementById('group-count').value);
    if (isNaN(groupCount) || groupCount <= 0) {
        alert('Please enter a valid number of groups.');
        return;
    }

    const container = document.getElementById('binary-container');
    container.innerHTML = ''; // Clear previous numbers
    binaryNumbers = []; // Reset the array
    currentIndex = 0; // Reset index
    correctCount = 0; // Reset correct counter
    incorrectCount = 0; // Reset incorrect counter

    for (let i = 0; i < groupCount; i++) {
        let randomBinary = Math.floor(Math.random() * 8).toString(2).padStart(3, '0');
        binaryNumbers.push(randomBinary);

        // Create and display binary elements
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

// Add event listener to check input automatically as user types
document.getElementById('decimal-input').addEventListener('input', function() {
    checkAnswer();
});

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
        input.value = ''; // Clear the input for the next number
        document.getElementById('correct-count').innerText = `Correct: ${correctCount}`;
        document.getElementById('result').innerText = 'Correct!';
    } else if (input.value !== '' && parseInt(input.value, 10) !== decimalValue) {
        document.getElementById(`binary-${currentIndex}`).style.backgroundColor = 'lightcoral';
        incorrectCount++;
        currentIndex++;
        input.value = ''; // Clear the input for the next number
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
    if (binaryVisible) {
        container.style.display = 'none';
    } else {
        container.style.display = 'grid';
    }
    binaryVisible = !binaryVisible;
}
