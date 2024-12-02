function generateScrambles() {
  const type = document.getElementById('cube-type').value;
  const numberOfAlgorithms = parseInt(document.getElementById('number-of-algorithms').value, 10) || 5;
  const scrambles = [];
  const scrambleLengths = {
    '2x2': 11, // WCA standard: 9-11 moves for 2x2
    '3x3': 20, // WCA standard: 18-22 moves for 3x3
    '4x4': 40, // WCA standard: ~40 moves for 4x4
  };

  for (let i = 0; i < numberOfAlgorithms; i++) {
    scrambles.push(createWCAScramble(scrambleLengths[type]));
  }

  // Display scrambles on the page
  const scrambleContainer = document.getElementById('scrambles');
  scrambleContainer.innerHTML = scrambles
    .map(scramble => `<p class="scramble" onclick="removeScramble(this)">${scramble}</p>`)
    .join('');
}

function createWCAScramble(length) {
  const notations = ['R', 'U', 'L', 'F', 'D', 'B'];
  const modifiers = ['', "'", '2'];
  let scramble = '';
  let previousMove = '';

  for (let i = 0; i < length; i++) {
    let move;

    // Ensure no consecutive duplicate moves
    do {
      move = notations[Math.floor(Math.random() * notations.length)];
    } while (move === previousMove);

    previousMove = move;

    // Add a random modifier to the move
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble += `${move}${modifier} `;
  }

  return scramble.trim();
}

function removeScramble(element) {
  const scrambleContainer = document.getElementById('scrambles');
  scrambleContainer.removeChild(element); // Remove the clicked scramble
}
