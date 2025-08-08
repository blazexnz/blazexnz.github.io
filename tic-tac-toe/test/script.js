const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");
const colorBtn = document.getElementById("colorBtn");
const colorModal = document.getElementById("colorModal");
const player1ColorPicker = document.getElementById("player1ColorPicker");
const player2ColorPicker = document.getElementById("player2ColorPicker");
const saveColorsBtn = document.getElementById("saveColorsBtn");
const cancelColorsBtn = document.getElementById("cancelColorsBtn");

const BOARD_SIZE = 3; // 3x3 grid
let currentPlayer = 1; // 1 or 2
let moves = []; // stack to store moves for undo

// Default player colors, use CSS variables
let playerColors = {
  1: "#FF4136", // red
  2: "#0074D9", // blue
};

function updateCSSVariables() {
  document.documentElement.style.setProperty("--player1-color", playerColors[1]);
  document.documentElement.style.setProperty("--player2-color", playerColors[2]);
}

function createBoard() {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 75px)`;
  board.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 75px)`;

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = i;
    dot.addEventListener("click", handleDotClick);
    board.appendChild(dot);
  }
}

function handleDotClick(e) {
  const dot = e.target;
  if (dot.classList.contains("player1") || dot.classList.contains("player2")) {
    // Already taken
    return;
  }
  // Mark dot with current player's color class
  dot.classList.add(`player${currentPlayer}`);
  moves.push({ index: dot.dataset.index, player: currentPlayer });

  // Switch player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function undoMove() {
  if (moves.length === 0) return;

  const lastMove = moves.pop();
  const dot = board.querySelector(`.dot[data-index='${lastMove.index}']`);
  if (dot) {
    dot.classList.remove("player1", "player2");
  }

  // Undo switches the player back
  currentPlayer = lastMove.player;
}

function resetBoard() {
  moves = [];
  currentPlayer = 1;
  const dots = board.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("player1", "player2"));
}

function openColorModal() {
  player1ColorPicker.value = playerColors[1];
  player2ColorPicker.value = playerColors[2];
  colorModal.classList.remove("hidden");
}

function closeColorModal() {
  colorModal.classList.add("hidden");
}

function saveColors() {
  playerColors[1] = player1ColorPicker.value;
  playerColors[2] = player2ColorPicker.value;
  updateCSSVariables();
  closeColorModal();
}

resetBtn.addEventListener("click", resetBoard);
undoBtn.addEventListener("click", undoMove);
colorBtn.addEventListener("click", openColorModal);
saveColorsBtn.addEventListener("click", saveColors);
cancelColorsBtn.addEventListener("click", closeColorModal);

updateCSSVariables();
createBoard();
