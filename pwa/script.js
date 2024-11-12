// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Your existing code for generating binary numbers, checking answers, etc.
let binaryNumbers = [];
let correctCount = 0;
let incorrectCount = 0;

function generateBinaryNumbers() {
    binaryNumbers = [];
    for (let i = 0; i < 104; i++) {
        let binary = Math.floor(Math.random() * 8).toString(2).padStart(3, '0');
        binaryNumbers.push(binary);
    }
    displayBinaryNumbers();
}

function displayBinaryNumbers() {
    const container = document.getElementById('binary-container');
    container.innerHTML = ''; // Clear the container before re-rendering
    binaryNumbers.forEach((binary, index) => {
        const div = document.createElement('div');
        div.className = 'binary';
        div.id = `binary-${index}`;
        div.textContent = binary;
        container.appendChild(div);
    });
}

function checkAnswer(index) {
    const userInput = document.getElementById(`decimal-${index}`).value;
    const binaryValue = binaryNumbers[index];
    const decimalValue = parseInt(binaryValue, 2);
    
    if (parseInt(userInput) === decimalValue) {
        document.getElementById(`binary-${index}`).style.color = 'green';
        correctCount++;
        document.getElementById('correct-counter').textContent = `Correct: ${correctCount}`;
    } else {
        document.getElementById(`binary-${index}`).style.color = 'red';
        incorrectCount++;
        document.getElementById('incorrect-counter').textContent = `Incorrect: ${incorrectCount}`;
    }
}

document.getElementById('generate-btn').addEventListener('click', generateBinaryNumbers);
