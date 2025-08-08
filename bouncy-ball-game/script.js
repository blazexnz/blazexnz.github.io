(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startOverBtn = document.getElementById('startOverBtn');
  const modeToggleBtn = document.getElementById('modeToggleBtn');

  const width = canvas.width;
  const height = canvas.height;

  const ballRadius = 25;
  const gravity = 0.6;

  let balls = []; // store all balls
  let mode = 1; // 1 = original, 2 = juggling

  function createBall(x, y) {
    balls.push({
      x,
      y,
      vx: 0,
      vy: 0,
      bouncePower: 30, // enough to hit roof
      currentBouncePower: 30,
      onGround: false,
      lastTapTime: 0
    });
  }

  function drawBall(ball) {
    ctx.beginPath();
    ctx.fillStyle = '#00c896';
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

  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault(); // stop iOS zoom on pointer down
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

  // Start Over button handlers (click + touch)
  const restartGame = () => { balls = []; };
  startOverBtn.addEventListener('click', restartGame);
  startOverBtn.addEventListener('touchend', restartGame);

  // Mode Toggle: Fix buggy toggle on iPhone by debouncing and handling touch/click properly
  let toggleCooldown = false;
  const toggleMode = () => {
    if (toggleCooldown) return;
    toggleCooldown = true;
    setTimeout(() => toggleCooldown = false, 300);
    mode = mode === 1 ? 2 : 1;
    modeToggleBtn.textContent = `Mode: ${mode}`;
    balls = [];
  };
  modeToggleBtn.addEventListener('click', toggleMode);
  modeToggleBtn.addEventListener('touchend', (e) => {
    e.preventDefault(); // prevent ghost clicks on iOS
    toggleMode();
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  // Disable double-tap zoom on iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  loop();
})();
