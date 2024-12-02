function generateScrambles() {
  const type = document.getElementById('cube-type').value;
  const numberOfAlgorithms = parseInt(document.getElementById('number-of-algorithms').value, 10) || 5;
  const scrambles = [];
  const moves = {
    '2x2': 25, // Short scramble for 2x2
    '3x3': 20, // Standard scramble length for 3x3
    '4x4': 40, // Longer scramble for 4x4
  };

  // Generate specified number of scrambles
  for (let i = 0; i < numberOfAlgorithms; i++) {
    scrambles.push(createScramble(moves[type]));
  }

  // Display scrambles on the page
  const scrambleContainer = document.getElementById('scrambles');
  scrambleContainer.innerHTML = scrambles
    .map(scramble => `<p class="scramble" onclick="removeScramble(this)">${scramble}</p>`)
    .join('');
}

function createScramble(length) {
  const notations = ['R', 'U', 'L', 'F', 'D', 'B']; // Cube moves
  const modifiers = ['', "'", '2']; // Move modifiers
  let scramble = '';
  let prev = ''; // Prevent consecutive duplicate moves

  // Generate scramble sequence
  for (let i = 0; i < length; i++) {
    let move;
    do {
      move = notations[Math.floor(Math.random() * notations.length)];
    } while (move === prev); // Avoid repeating the last move
    prev = move;

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble += `${move}${modifier} `;
  }
  return scramble.trim(); // Return the scramble string
}

function removeScramble(element) {
  element.remove(); // Remove the clicked scramble from the screen
}
