let binaryNumbers = [];
let currentIndex = 0;

function generateBinaryNumbers() {
    const container = document.getElementById('binary-container');
    container.innerHTML = ''; // Clear previous numbers
    binaryNumbers = []; // Reset the array
    currentIndex = 0; // Reset index

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
    highlightCurrentBinary();
}

// Add event listener to trigger `checkAnswer()` on "Enter" key press
document.getElementById('decimal-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
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
        currentIndex++;
        document.getElementById('decimal-input').value = ''; // Clear input

        if (currentIndex < binaryNumbers.length) {
            highlightCurrentBinary();
            resultElement.innerText = `Correct! Enter the decimal value for the next binary number.`;
        } else {
            resultElement.innerText = `Congratulations! You've completed the set.`;
        }
    } else {
        currentBinaryElement.style.color = 'red'; // Change to red if incorrect
        resultElement.innerText = `Incorrect! Try again.`;
    }
}
