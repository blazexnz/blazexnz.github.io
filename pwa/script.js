let binaryNumbers = [];
let currentIndex = 0;
let correctCount = 0; // Counter for correct answers
let incorrectCount = 0; // Counter for incorrect answers

function generateBinaryNumbers() {
    const container = document.getElementById('binary-container');
    container.innerHTML = ''; // Clear previous numbers
    binaryNumbers = []; // Reset the array
    currentIndex = 0; // Reset index
    correctCount = 0; // Reset correct counter
    incorrectCount = 0; // Reset incorrect counter

    for (let i = 0; i < 104; i++) {
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

// Add event listener to trigger checkAnswer() on input change
document.getElementById('decimal-input').addEventListener('input', function() {
    checkAnswer();
});

function highlightCurrentBinary() {
    // Highlight the current binary number for user reference
    document.querySelectorAll('.binary').forEach((el, index) => {
        if (index === currentIndex) {
            el.style.color = 'blue'; // Highlight current number in blue
        } else if (el.style.color !== 'green') {
            el.style.color = 'black'; // Reset color for others if not already green
        }
    });
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('decimal-input').value, 10);
    const correctAnswer = parseInt(binaryNumbers[currentIndex], 2);
    const resultElement = document.getElementById('result');
    const currentBinaryElement = document.getElementById(`binary-${currentIndex}`);

    if (userAnswer === correctAnswer) {
        currentBinaryElement.style.color = 'green'; // Change to green if correct
        correctCount++; // Increment the correct counter
        currentIndex++;
        document.getElementById('decimal-input').value = ''; // Clear input

        document.getElementById('correct-count').innerText = `Correct: ${correctCount}`; // Update correct counter display

        if (currentIndex < binaryNumbers.length) {
            highlightCurrentBinary();
            resultElement.innerText = `Correct! Enter the decimal value for the next binary number.`;
        } else {
            resultElement.innerText = `Congratulations! You've completed the set.`;
        }
    } else if (userAnswer !== NaN) {
        currentBinaryElement.style.color = 'red'; // Change to red if incorrect
        incorrectCount++; // Increment the incorrect counter
        document.getElementById('incorrect-count').innerText = `Incorrect: ${incorrectCount}`; // Update incorrect counter display
        resultElement.innerText = `Incorrect! Try again.`;
    }
}

function toggleBinaryVisibility() {
    const container = document.getElementById('binary-container');
    // Toggle visibility of the binary numbers
    if (container.style.display === 'none') {
        container.style.display = 'grid'; // Show the binary numbers
    } else {
        container.style.display = 'none'; // Hide the binary numbers
    }
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope: ', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed: ', error);
            });
    });
}
