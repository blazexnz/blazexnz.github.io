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

  // Display scrambles on the page with numbers bolded
  const scrambleContainer = document.getElementById('scrambles');
  scrambleContainer.innerHTML = scrambles
    .map((scramble, i) => `<p class="scramble" onclick="removeScramble(this)"><strong>${i+1}.</strong> ${scramble}</p>`)
    .join('');
}

function createWCAScramble(length) {
  const faces = ['R', 'U', 'L', 'F', 'D', 'B'];
  const modifiers = ['', "'", '2'];
  const opposite = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

  const scrambleMoves = [];
  let prevFace = '';
  let prevPrevFace = '';
  let prevMove = '';

  for (let i = 0; i < length; i++) {
    let face, modifier, move;

    do {
      face = faces[Math.floor(Math.random() * faces.length)];
      modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      move = face + modifier;

      if (face === prevFace) continue;
      if (prevFace && move[0] === prevFace && isInverse(move, prevMove)) continue;
      if (prevFace && move[0] === prevFace) continue;
      if (opposite[face] === prevFace && prevPrevFace === face) continue;

      break;
    } while (true);

    scrambleMoves.push(move);
    prevPrevFace = prevFace;
    prevFace = face;
    prevMove = move;
  }

  return scrambleMoves.join(' ');
}

function isInverse(move1, move2) {
  if (!move1 || !move2) return false;
  const face1 = move1[0];
  const face2 = move2[0];
  if (face1 !== face2) return false;
  return (move1.includes("'") && !move2.includes("'") && !move2.includes('2')) ||
         (!move1.includes("'") && move2.includes("'") && !move1.includes('2'));
}

function removeScramble(element) {
  const scrambleContainer = document.getElementById('scrambles');
  scrambleContainer.removeChild(element);
}

// Generate 5 scrambles on initial page load
window.addEventListener('DOMContentLoaded', () => {
  generateScrambles();
});
