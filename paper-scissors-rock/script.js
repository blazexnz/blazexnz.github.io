const player1Section = document.getElementById('player1');
const player2Section = document.getElementById('player2');
const resultDiv = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');
const revealBtn = document.getElementById('reveal-btn');

const scoreP1Span = document.getElementById('score-p1');
const scoreP2Span = document.getElementById('score-p2');
const scoreTieSpan = document.getElementById('score-tie');

let player1Choice = null;
let player2Choice = null;

let scoreP1 = 0;
let scoreP2 = 0;
let scoreTie = 0;

const choiceButtons = document.querySelectorAll('.choice-btn');

choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const player = button.getAttribute('data-player');
    const choice = button.getAttribute('data-choice');

    if (player === '1') {
      player1Choice = choice;
      player1Section.style.display = 'none';
      player2Section.style.display = 'block';
      resultDiv.textContent = "Player 2, it's your turn!";
    } else if (player === '2') {
      player2Choice = choice;
      player2Section.style.display = 'none';
      revealBtn.style.display = 'block';
      resultDiv.textContent = "Both players have chosen. Press Reveal Winner.";
    }
  });
});

revealBtn.addEventListener('click', () => {
  revealBtn.disabled = true;
  revealBtn.style.display = 'none';

  const countdownEmojis = [
    "✋ Paper",
    "✌️ Scissors",
    "✊ Rock"
  ];

  let count = 0;
  resultDiv.textContent = countdownEmojis[count];
  const interval = setInterval(() => {
    count++;
    if (count < countdownEmojis.length) {
      resultDiv.textContent = countdownEmojis[count];
    } else {
      clearInterval(interval);
      showResult();
      revealBtn.disabled = false;
    }
  }, 500);  // faster countdown: 500ms per step
});

resetBtn.addEventListener('click', () => {
  player1Choice = null;
  player2Choice = null;
  resultDiv.textContent = '';
  resetBtn.style.display = 'none';
  revealBtn.style.display = 'none';
  revealBtn.disabled = false;
  player1Section.style.display = 'block';
  player2Section.style.display = 'none';

  // If you want to reset scores on reset, uncomment these:
  // scoreP1 = 0;
  // scoreP2 = 0;
  // scoreTie = 0;
  // updateScoreboard();
});

function getWinner(p1, p2) {
  if (p1 === p2) return 0;

  if (
    (p1 === 'rock' && p2 === 'scissors') ||
    (p1 === 'scissors' && p2 === 'paper') ||
    (p1 === 'paper' && p2 === 'rock')
  ) {
    return 1;
  } else {
    return 2;
  }
}

function choiceToEmoji(choice) {
  switch(choice) {
    case 'rock': return '✊ Rock';
    case 'paper': return '✋ Paper';
    case 'scissors': return '✌️ Scissors';
    default: return '';
  }
}

function showResult() {
  const winner = getWinner(player1Choice, player2Choice);

  const p1Text = choiceToEmoji(player1Choice);
  const p2Text = choiceToEmoji(player2Choice);

  if (winner === 0) {
    resultDiv.textContent = `It's a tie! Both chose ${p1Text}.`;
    scoreTie++;
  } else if (winner === 1) {
    resultDiv.innerHTML = `Player 1 chose ${p1Text}.<br>Player 2 chose ${p2Text}.<br><strong>Player 1 wins!</strong>`;
    scoreP1++;
  } else if (winner === 2) {
    resultDiv.innerHTML = `Player 1 chose ${p1Text}.<br>Player 2 chose ${p2Text}.<br><strong>Player 2 wins!</strong>`;
    scoreP2++;
  }

  updateScoreboard();
  resetBtn.style.display = 'block';
}

function updateScoreboard() {
  scoreP1Span.textContent = scoreP1;
  scoreP2Span.textContent = scoreP2;
  scoreTieSpan.textContent = scoreTie;
}
