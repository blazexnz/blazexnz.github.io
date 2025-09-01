const board = document.getElementById("board");
const undoBtn = document.getElementById("undoBtn");
const colorBtn = document.getElementById("colorBtn");
const colorModal = document.getElementById("colorModal");
const player1ColorPicker = document.getElementById("player1ColorPicker");
const player2ColorPicker = document.getElementById("player2ColorPicker");
const saveColorsBtn = document.getElementById("saveColorsBtn");
const cancelColorsBtn = document.getElementById("cancelColorsBtn");
const winnerOverlay = document.getElementById("winnerOverlay");
const fireworksCanvas = document.getElementById("fireworksCanvas");
const playAgainBtn = document.getElementById("playAgainBtn");

const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");

const ROWS = 6;
const COLS = 7;

let startingPlayer = 1;
let currentPlayer = startingPlayer;
let moves = [];
let gameOver = false;
let scores = {1:0,2:0};
let grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));

let playerColors = {1:"#FF4136",2:"#0074D9"};

function updateCSSVariables() {
  document.documentElement.style.setProperty("--player1-color", playerColors[1]);
  document.documentElement.style.setProperty("--player2-color", playerColors[2]);
}

function updateScoreboard() {
  player1ScoreEl.textContent = `Player 1: ${scores[1]}`;
  player2ScoreEl.textContent = `Player 2: ${scores[2]}`;
  updateScoreboardHighlight();
}

function updateScoreboardHighlight() {
  document.querySelectorAll(".scoreboard span").forEach(el=>el.classList.remove("active"));
  const activeEl = currentPlayer===1?player1ScoreEl:player2ScoreEl;
  document.documentElement.style.setProperty("--active-highlight-color", playerColors[currentPlayer]);
  activeEl.classList.add("active");
}

function createBoard() {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${COLS}, 60px)`;
  board.style.gridTemplateRows = `repeat(${ROWS}, 60px)`;

  for (let r=0;r<ROWS;r++){
    for (let c=0;c<COLS;c++){
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.dataset.row = r;
      dot.dataset.col = c;
      dot.addEventListener("click", handleDotClick);
      board.appendChild(dot);
    }
  }
}

function handleDotClick(e){
  if(gameOver) return;
  const col = parseInt(e.target.dataset.col);

  // Find lowest empty row
  let row = ROWS-1;
  while(row>=0 && grid[row][col]!==0) row--;
  if(row<0) return;

  grid[row][col] = currentPlayer;
  const dot = board.querySelector(`.dot[data-row='${row}'][data-col='${col}']`);
  dot.classList.add(`player${currentPlayer}`);
  moves.push({row,col,player:currentPlayer});

  if(checkWin(currentPlayer,row,col)){
    scores[currentPlayer]++;
    updateScoreboard();
    showWinner(currentPlayer);
    gameOver=true;
    revealPlayAgain();
    return;
  }

  if(moves.length===ROWS*COLS){
    showDraw();
    gameOver=true;
    revealPlayAgain();
    return;
  }

  currentPlayer = currentPlayer===1?2:1;
  updateScoreboardHighlight();
}

function checkWin(player,row,col){
  function countDir(dr,dc){
    let r=row+dr,c=col+dc,count=0;
    while(r>=0 && r<ROWS && c>=0 && c<COLS && grid[r][c]===player){count++;r+=dr;c+=dc;}
    return count;
  }
  const directions=[[0,1],[1,0],[1,1],[1,-1]];
  return directions.some(([dr,dc])=>{
    return 1+countDir(dr,dc)+countDir(-dr,-dc)>=4;
  });
}

function showWinner(player){
  winnerOverlay.textContent=`🎉 Congratulations Player ${player}! 🎉`;
  winnerOverlay.classList.remove("hidden","fade-out");
  startFireworks();
  startingPlayer=startingPlayer===1?2:1;
  setTimeout(()=>{
    winnerOverlay.classList.add("fade-out");
    setTimeout(()=>{winnerOverlay.classList.add("hidden"); stopFireworks();},500);
  },1000);
}

function showDraw(){
  winnerOverlay.textContent="🤝 It's a draw!";
  winnerOverlay.classList.remove("hidden","fade-out");
  startingPlayer=startingPlayer===1?2:1;
  setTimeout(()=>{
    winnerOverlay.classList.add("fade-out");
    setTimeout(()=>{winnerOverlay.classList.add("hidden");},500);
  },1000);
}

function undoMove(){
  if(moves.length===0 || gameOver) return;
  const last=moves.pop();
  grid[last.row][last.col]=0;
  const dot=board.querySelector(`.dot[data-row='${last.row}'][data-col='${last.col}']`);
  dot.classList.remove("player1","player2");
  currentPlayer=last.player;
  updateScoreboardHighlight();
}

function resetBoard(){
  grid=Array.from({length:ROWS},()=>Array(COLS).fill(0));
  moves=[];
  currentPlayer=startingPlayer;
  gameOver=false;
  document.querySelectorAll(".dot").forEach(d=>d.classList.remove("player1","player2"));
  winnerOverlay.classList.add("hidden");
  stopFireworks();
  hidePlayAgain();
  updateScoreboardHighlight();
}

function openColorModal(){
  player1ColorPicker.value=playerColors[1];
  player2ColorPicker.value=playerColors[2];
  colorModal.classList.remove("hidden");
}

function closeColorModal(){ colorModal.classList.add("hidden"); }

function saveColors(){
  playerColors[1]=player1ColorPicker.value;
  playerColors[2]=player2ColorPicker.value;
  updateCSSVariables();
  updateScoreboardHighlight();
  closeColorModal();
}

/* Fireworks Animation */
let fwCtx = fireworksCanvas.getContext("2d");
let particles=[];
function startFireworks(){ fireworksCanvas.width=window.innerWidth; fireworksCanvas.height=window.innerHeight; particles=[]; createFirework(); requestAnimationFrame(updateFireworks);}
function stopFireworks(){particles=[]; fwCtx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);}
function createFirework(){for(let i=0;i<100;i++){particles.push({x:fireworksCanvas.width/2,y:fireworksCanvas.height/2,angle:Math.random()*Math.PI*2,speed:Math.random()*5+2,radius:Math.random()*2+1,life:100,color:`hsl(${Math.random()*360},100%,50%)`})}}
function updateFireworks(){fwCtx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);particles.forEach(p=>{p.x+=Math.cos(p.angle)*p.speed;p.y+=Math.sin(p.angle)*p.speed;p.life--;fwCtx.beginPath();fwCtx.arc(p.x,p.y,p.radius,0,Math.PI*2);fwCtx.fillStyle=p.color;fwCtx.fill();});particles=particles.filter(p=>p.life>0);if(particles.length>0){requestAnimationFrame(updateFireworks);}}

function revealPlayAgain(){ playAgainBtn.style.display="inline-block"; }
function hidePlayAgain(){ playAgainBtn.style.display="none"; }

undoBtn.addEventListener("click",undoMove);
colorBtn.addEventListener("click",openColorModal);
saveColorsBtn.addEventListener("click",saveColors);
cancelColorsBtn.addEventListener("click",closeColorModal);
playAgainBtn.addEventListener("click",()=>{resetBoard();});

updateCSSVariables();
updateScoreboard();
createBoard();
updateScoreboardHighlight();
hidePlayAgain();
