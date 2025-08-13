function generateScrambles() {
  const type = document.getElementById('cube-type').value;
  const numberOfAlgorithms = parseInt(document.getElementById('number-of-algorithms').value, 10) || 5;
  const scrambles = [];

  // WCA standard length ranges (inclusive)
  const scrambleLengthRanges = {
    '2x2': [9, 11],
    '3x3': [18, 22],
    '4x4': [38, 42],
  };

  for (let i = 0; i < numberOfAlgorithms; i++) {
    const [minLen, maxLen] = scrambleLengthRanges[type];
    const randomLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    scrambles.push(createWCAScramble(randomLength));
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
  const opposite = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

  const scrambleMoves = [];
  let prevFace = '';
  let prevPrevFace = '';

  for (let i = 0; i < length; i++) {
    let face;

    do {
      face = notations[Math.floor(Math.random() * notations.length)];
      // Constraint 1: no consecutive duplicate moves
      if (face === prevFace) continue;
      // Constraint 2: avoid ABA pattern with opposite faces (e.g., U D U)
      if (opposite[face] === prevFace && prevPrevFace === face) continue;
      break;
    } while (true);

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scrambleMoves.push(face + modifier);

    prevPrevFace = prevFace;
    prevFace = face;
  }

  return scrambleMoves.join(' ');
}

function removeScramble(element) {
  const scrambleContainer = document.getElementById('scrambles');
  scrambleContainer.removeChild(element);
}
