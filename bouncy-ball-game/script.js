(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startOverBtn = document.getElementById('startOverBtn');
  const modeSelect = document.getElementById('modeSelect');

  const btnDrop100 = document.getElementById('btnDrop100');
  const btnLaunchAll = document.getElementById('btnLaunchAll');
  const btnShuffle = document.getElementById('btnShuffle');
  const btnColors = document.getElementById('btnColors');

  const width = canvas.width;
  const height = canvas.height;

  const ballRadius = 25;
  const gravity = 0.6;

  let balls = []; // all balls
  let mode = 1; // 1 = original, 2 = juggling

  // For continuous dropping
  let dropping = false;
  let dropInterval = null;
  let dropX = width / 2;

  // Utility to generate pastel colors
  function randomPastelColor() {
    const r = Math.round((Math.random() * 127) + 127);
    const g = Math.round((Math.random() * 127) + 127);
    const b = Math.round((Math.random() * 127) + 127);
    return `rgb(${r},${g},${b})`;
  }

  function createBall(x, y, color = '#00c896') {
    balls.push({
      x,
      y,
      vx: 0,
      vy: 0,
      bouncePower: 30,
      currentBouncePower: 30,
      onGround: false,
      color,
    });
  }

  function drawBall(ball) {
    ctx.beginPath();
    ctx.fillStyle = ball.color || '#00c896';
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  function update() {
    for (let ball of balls) {
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Ground bounce
      if (ball.y + ballRadius > height - 10) {
        ball.y = height - 10 - ballRadius;
        ball.vy *= -0.7;
        if (Math.abs(ball.vy) < 1) ball.vy = 0;
        ball.onGround = true;
        ball.currentBouncePower = ball.bouncePower;
      } else {
        ball.onGround = false;
      }

      // Ceiling collision
      if (ball.y - ballRadius < 0) {
        ball.y = ballRadius;
        if (ball.vy < 0) ball.vy *= -0.7;
      }

      // Wall collisions
      if (ball.x - ballRadius < 0) {
        ball.x = ballRadius;
        ball.vx *= -0.7;
      } else if (ball.x + ballRadius > width) {
        ball.x = width - ballRadius;
        ball.vx *= -0.7;
      }

      // Horizontal friction
      ball.vx *= 0.99;
      if (Math.abs(ball.vx) < 0.05) ball.vx = 0;
    }
  }

  function loop() {
    clear();
    update();
    for (let ball of balls) {
      drawBall(ball);
    }
    requestAnimationFrame(loop);
  }

  function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    return { x, y };
  }

  // Mode switching via dropdown select
  modeSelect.addEventListener('change', () => {
    mode = parseInt(modeSelect.value, 10);
    balls = [];
  });

  // Main canvas pointer down
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const pos = getPointerPos(e);

    if (mode === 1) {
      // Mode 1: Original
      let touchedRestingBall = false;
      for (let ball of balls) {
        const dx = pos.x - ball.x;
        const dy = pos.y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= ballRadius && ball.onGround) {
          ball.vy = -ball.currentBouncePower;
          touchedRestingBall = true;
          break;
        }
      }
      if (!touchedRestingBall) {
        const bottomSafeZone = height - 80;
        if (pos.y < bottomSafeZone) {
          createBall(pos.x, pos.y);
        }
      }
    } else if (mode === 2) {
      // Mode 2: Juggling
      if (balls.length === 0) {
        createBall(width / 2, height / 2);
      }
      const ball = balls[0];
      ball.vy = -10;
    }
  }, { passive: false });

  // Press & hold + horizontal drag to continuously drop balls
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dropping = true;
    const pos = getPointerPos(e);
    dropX = pos.x;

    if (dropInterval) clearInterval(dropInterval);
    dropInterval = setInterval(() => {
      if (dropping) {
        createBall(dropX, 50);
      }
    }, 100);
  }, { passive: false });

  canvas.addEventListener('pointermove', (e) => {
    if (!dropping) return;
    const pos = getPointerPos(e);
    dropX = Math.min(Math.max(pos.x, ballRadius), width - ballRadius);
  });

  function stopDropping() {
    dropping = false;
    if (dropInterval) {
      clearInterval(dropInterval);
      dropInterval = null;
    }
  }

  canvas.addEventListener('pointerup', (e) => {
    e.preventDefault();
    stopDropping();
  });
  canvas.addEventListener('pointercancel', (e) => {
    e.preventDefault();
    stopDropping();
  });
  canvas.addEventListener('pointerout', (e) => {
    e.preventDefault();
    stopDropping();
  });
  canvas.addEventListener('pointerleave', (e) => {
    e.preventDefault();
    stopDropping();
  });

  // Start Over button
  const restartGame = () => { balls = []; };
  startOverBtn.addEventListener('click', restartGame);
  startOverBtn.addEventListener('touchend', restartGame);

  // Console buttons logic

  // 💥 Drop 100 balls spaced horizontally with slight intervals (rain effect), add to existing balls
  btnDrop100.addEventListener('click', () => {
    const spacing = width / 100;
    let i = 0;

    function dropOne() {
      if (i >= 100) return;
      // Add ball at spaced x, y=50
      createBall(spacing * i + spacing / 2, 50);
      i++;
      // Schedule next drop with slight random interval (20-50ms)
      setTimeout(dropOne, 20 + Math.random() * 30);
    }
    dropOne();
  });

  // 🚀 Launch all resting balls on the ground, launching them staggered over ~3s
  btnLaunchAll.addEventListener('click', () => {
    const restingBalls = balls.filter(b => b.onGround);
    restingBalls.forEach((ball, index) => {
      setTimeout(() => {
        ball.vy = -ball.currentBouncePower;
      }, index * 30); // 30ms delay between each launch
    });
  });

  // 🔄 Shuffle horizontal velocities randomly (-5 to +5)
  btnShuffle.addEventListener('click', () => {
    for (let ball of balls) {
      ball.vx = (Math.random() - 0.5) * 10;
    }
  });

  // 🌈 Change all balls to random pastel colors
  btnColors.addEventListener('click', () => {
    for (let ball of balls) {
      ball.color = randomPastelColor();
    }
  });

  // Disable double-tap zoom on iOS globally
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Disable right-click context menu on canvas
  canvas.addEventListener('contextmenu', e => e.preventDefault());

  loop();
})();
