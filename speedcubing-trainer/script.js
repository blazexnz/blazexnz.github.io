const scrambleLengthRanges = {
  '2x2': [9, 11],
  '3x3': [18, 22],
  '4x4': [38, 42]
};

const cubeTypeEl = document.getElementById('cube-type');
const numberEl = document.getElementById('number-of-algorithms');
const regenBtn = document.getElementById('regen');
const resetBtn = document.getElementById('reset');
const currentBox = document.getElementById('currentScramble');
const progressText = document.getElementById('progressText');
const remainingText = document.getElementById('remainingText');

let scrambles = [];
let index = 0;

function createWCAScramble(length) {
  const faces = ['R','U','L','F','D','B'];
  const modifiers = ['', "'", '2'];
  const opposite = { U:'D', D:'U', L:'R', R:'L', F:'B', B:'F' };
  const scrambleMoves = [];
  let prevFace = '', prevPrevFace = '', prevMove = '';

  for (let i=0; i<length; i++) {
    let face, modifier, move;
    do {
      face = faces[Math.floor(Math.random()*faces.length)];
      modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
      move = face + modifier;
      if (face === prevFace) continue;
      if (prevFace && move[0] === prevFace && isInverse(move, prevMove)) continue;
      if (opposite[face] === prevFace && prevPrevFace === face) continue;
      break;
    } while(true);
    scrambleMoves.push(move);
    prevPrevFace = prevFace;
    prevFace = face;
    prevMove = move;
  }
  return scrambleMoves.join(' ');
}

function isInverse(move1, move2) {
  if (!move1 || !move2) return false;
  const face1 = move1[0], face2 = move2[0];
  if (face1 !== face2) return false;
  return (move1.includes("'") && !move2.includes("'") && !move2.includes('2')) ||
         (!move1.includes("'") && move2.includes("'") && !move1.includes('2'));
}

function generateScrambles() {
  const type = cubeTypeEl.value;
  const count = Math.max(1, parseInt(numberEl.value,10) || 1);
  scrambles = [];
  const [minLen, maxLen] = scrambleLengthRanges[type] || scrambleLengthRanges['3x3'];
  for (let i=0;i<count;i++){
    const randomLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    scrambles.push(createWCAScramble(randomLength));
  }
  index = 0;
  renderCurrent();
}

function renderCurrent() {
  if (!scrambles.length) {
    currentBox.innerHTML = 'No scrambles — click Generate';
    progressText.textContent = '0 / 0';
    remainingText.textContent = '';
    if(currentAlgMain) currentAlgMain.textContent = '— Current Algorithm —';
    return;
  }
  const current = scrambles[index];
  currentBox.innerHTML = `<div style="line-height:1.25">${index+1}. <strong>${escapeHtml(current)}</strong></div>`;
  progressText.textContent = `${index+1} / ${scrambles.length}`;
  remainingText.textContent = `${scrambles.length - (index+1)} left`;

  if(currentAlgMain) currentAlgMain.textContent = current;
}

function advanceScramble() {
  if (!scrambles.length) return;

  if (index < scrambles.length - 1) {
    index++;
    renderCurrent();
  } else {
    // When at the last scramble, show thumbs up in currentBox and alg main
    const completionMessage = 'Done';
    currentBox.innerHTML = `<div style="line-height:1.25; font-size:1.5em; text-align:center">${completionMessage}</div>`;
    if (currentAlgMain) currentAlgMain.textContent = completionMessage;

    // Keep progressText showing Finished
    progressText.textContent = `${scrambles.length} / ${scrambles.length}`;
    remainingText.textContent = 'Finished';

    // Optional: small animation to indicate the end
    currentBox.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(0.98)' }, { transform: 'scale(1)' }],
      { duration: 160 }
    );
  }
}


function resetAll() {
  scrambles = [];
  index = 0;
  renderCurrent();
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

regenBtn.addEventListener('click', generateScrambles);
resetBtn.addEventListener('click', resetAll);

currentBox.addEventListener('click', (e) => {
  if (!scrambles.length) { generateScrambles(); return; }
  advanceScramble();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (!scrambles.length) generateScrambles();
    else advanceScramble();
  } else if (e.key.toLowerCase() === 'g') {
    generateScrambles();
  } else if (e.key.toLowerCase() === 'r') {
    resetAll();
  }
});

window.addEventListener('DOMContentLoaded', () => { generateScrambles(); });
currentBox.addEventListener('mousedown', (e) => e.preventDefault());
