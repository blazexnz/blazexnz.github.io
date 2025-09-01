const gameContainer = document.getElementById('game-container');
const messageEl = document.getElementById('message');
const newRoundBtn = document.getElementById('new-round');
const hintBtn = document.getElementById('hint-btn');
const confettiCanvas = document.getElementById('confetti-overlay');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// 100+ kid-friendly emojis with hints
const emojiData = [
  {emoji: "🍎", hints: ["fruit", "red", "apple"]},
  {emoji: "🍌", hints: ["fruit", "yellow", "banana"]},
  {emoji: "🍇", hints: ["fruit", "purple", "grapes"]},
  {emoji: "🍉", hints: ["fruit", "green/red", "watermelon"]},
  {emoji: "🍓", hints: ["fruit", "red", "strawberry"]},
  {emoji: "🍒", hints: ["fruit", "red", "cherries"]},
  {emoji: "🍍", hints: ["fruit", "yellow", "pineapple"]},
  {emoji: "🥝", hints: ["fruit", "green", "kiwi"]},
  {emoji: "🥭", hints: ["fruit", "orange", "mango"]},
  {emoji: "🥑", hints: ["fruit", "green", "avocado"]},
  {emoji: "🥕", hints: ["vegetable", "orange", "carrot"]},
  {emoji: "🌽", hints: ["vegetable", "yellow", "corn"]},
  {emoji: "🥦", hints: ["vegetable", "green", "broccoli"]},
  {emoji: "🥒", hints: ["vegetable", "green", "cucumber"]},
  {emoji: "🍅", hints: ["vegetable", "red", "tomato"]},
  {emoji: "🍄", hints: ["vegetable", "mushroom", "fungus"]},
  {emoji: "🍕", hints: ["food", "cheese", "pizza"]},
  {emoji: "🍔", hints: ["food", "burger", "sandwich"]},
  {emoji: "🍟", hints: ["food", "potato", "fries"]},
  {emoji: "🌭", hints: ["food", "hotdog", "sausage"]},
  {emoji: "🥪", hints: ["food", "sandwich", "lunch"]},
  {emoji: "🥗", hints: ["food", "green", "salad"]},
  {emoji: "🍩", hints: ["dessert", "sweet", "donut"]},
  {emoji: "🍪", hints: ["dessert", "sweet", "cookie"]},
  {emoji: "🍫", hints: ["dessert", "chocolate", "sweet"]},
  {emoji: "🍬", hints: ["dessert", "candy", "sweet"]},
  {emoji: "🍭", hints: ["dessert", "lollipop", "sweet"]},
  {emoji: "🎈", hints: ["party", "balloon", "red"]},
  {emoji: "🎁", hints: ["present", "gift", "box"]},
  {emoji: "🎂", hints: ["party", "cake", "birthday"]},
  {emoji: "🦄", hints: ["mythical", "unicorn", "magical"]},
  {emoji: "🦁", hints: ["animal", "lion", "wild"]},
  {emoji: "🐯", hints: ["animal", "tiger", "striped"]},
  {emoji: "🐸", hints: ["animal", "frog", "green"]},
  {emoji: "🐼", hints: ["animal", "panda", "black/white"]},
  {emoji: "🐨", hints: ["animal", "koala", "cute"]},
  {emoji: "🐰", hints: ["animal", "rabbit", "white"]},
  {emoji: "🐹", hints: ["animal", "hamster", "small"]},
  {emoji: "🐤", hints: ["animal", "chick", "yellow"]},
  {emoji: "🐦", hints: ["animal", "bird", "small"]},
  {emoji: "🐧", hints: ["animal", "penguin", "black/white"]},
  {emoji: "🐢", hints: ["animal", "turtle", "green"]},
  {emoji: "🐍", hints: ["animal", "snake", "green"]},
  {emoji: "🦖", hints: ["dinosaur", "T-Rex", "prehistoric"]},
  {emoji: "🦕", hints: ["dinosaur", "long neck", "prehistoric"]},
  {emoji: "🦋", hints: ["insect", "butterfly", "colorful"]},
  {emoji: "🐞", hints: ["insect", "ladybug", "red"]},
  {emoji: "🐝", hints: ["insect", "bee", "yellow/black"]},
  {emoji: "🦑", hints: ["sea animal", "squid", "tentacles"]},
  {emoji: "🐙", hints: ["sea animal", "octopus", "tentacles"]},
  {emoji: "🐠", hints: ["fish", "orange", "small"]},
  {emoji: "🐟", hints: ["fish", "blue", "small"]},
  {emoji: "🐡", hints: ["fish", "puffer", "spiky"]},
  {emoji: "🦀", hints: ["sea animal", "crab", "red"]},
  {emoji: "🦞", hints: ["sea animal", "lobster", "red"]},
  {emoji: "🦐", hints: ["sea animal", "shrimp", "small"]},
  {emoji: "🦢", hints: ["bird", "swan", "white"]},
  {emoji: "🦩", hints: ["bird", "flamingo", "pink"]}
];

const NUM_BUTTONS = 10; // updated from 9 to 10
let targetEmoji = null;
let revealedHints = 0;

// Generate a new round
function newRound() {
  gameContainer.innerHTML = "";
  revealedHints = 0;

  // Select random target
  targetEmoji = emojiData[Math.floor(Math.random() * emojiData.length)];

  // Initial message with first letter
  const firstLetter = targetEmoji.hints[2][0].toUpperCase();
  messageEl.textContent = `I spy with my little eye, something beginning with ${firstLetter}...`;

  // Select buttons
  let buttonEmojis = [targetEmoji.emoji];
  while (buttonEmojis.length < NUM_BUTTONS) {
    const e = emojiData[Math.floor(Math.random() * emojiData.length)].emoji;
    if (!buttonEmojis.includes(e)) buttonEmojis.push(e);
  }

  // Shuffle
  buttonEmojis = buttonEmojis.sort(() => Math.random() - 0.5);

  buttonEmojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.classList.add('emoji-btn');
    btn.addEventListener('click', () => handleClick(btn, emoji));
    gameContainer.appendChild(btn);
  });
}

// Handle click
function handleClick(btn, emoji) {
  if (emoji === targetEmoji.emoji) {
    showConfetti();
    messageEl.textContent = `🎉 You found it! ${emoji} 🎉`;
  } else {
    messageEl.textContent = `❌ Nope! Try again.`;
    btn.classList.add('disabled');
    btn.disabled = true;
  }
}

// Hint button
hintBtn.addEventListener('click', () => {
  revealedHints++;
  if (revealedHints <= targetEmoji.hints.length) {
    const hint = targetEmoji.hints[revealedHints - 1];
    messageEl.textContent = `Hint: ${hint}`;
  } else {
    messageEl.textContent = `No more hints!`;
  }
});

// New round
newRoundBtn.addEventListener('click', newRound);

// Confetti animation
function showConfetti() {
  confettiCanvas.style.display = "block";
  const confetti = [];
  const confettiCount = 200;

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCanvas.height,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }

  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((c, i) => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
      ctx.stroke();
      c.tilt += c.tiltAngleIncrement;
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
      if (c.y > confettiCanvas.height) {
        confetti[i] = {
          x: Math.random() * confettiCanvas.width,
          y: -10,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: Math.floor(Math.random() * 10) - 10,
          tiltAngleIncrement: c.tiltAngleIncrement
        };
      }
    });
    angle += 0.01;
    requestAnimationFrame(draw);
  }
  draw();

  setTimeout(() => { confettiCanvas.style.display = "none"; }, 3000);
}

// Start first round
newRound();
