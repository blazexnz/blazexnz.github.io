(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;

  // Ball properties
  const ballRadius = 25;
  let ball = {
    x: width / 2,
    y: height - ballRadius - 10,
    vy: 0,
    gravity: 0.6,
    bouncePower: 15,
    onGround: true,
  };

  // Drag state
  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  // Tap timing for progressive bounce
  let lastTapTime = 0;
  const maxBouncePower = 60;  // maximum bounce power
  const bounceIncrement = 7;  // bounce power increase per tap
  let currentBouncePower = ball.bouncePower;

  // Helpers
  function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = '#00c896'; // solid green
    ctx.shadowColor = 'transparent'; // no glow
    ctx.shadowBlur = 0; // no blur
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  function update() {
    if (!dragging) {
      ball.vy += ball.gravity;
      ball.y += ball.vy;

      // Ground collision
      if (ball.y + ballRadius > height - 10) {
        ball.y = height - 10 - ballRadius;
        ball.vy = 0;
        ball.onGround = true;

        // Reset bounce power on ground contact
        currentBouncePower = ball.bouncePower;
      } else {
        ball.onGround = false;
      }

      // Ceiling collision (prevent ball going off top)
      if (ball.y - ballRadius < 0) {
        ball.y = ballRadius;
        if (ball.vy < 0) ball.vy = 0;
      }
    }
  }

  function loop() {
    clear();
    update();
    drawBall();
    requestAnimationFrame(loop);
  }

  // Input handling
  function getPointerPos(e) {
    let rect = canvas.getBoundingClientRect();
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

  // Bounce the ball with progressive height
  function bounce() {
    const now = Date.now();

    if (now - lastTapTime < 400) {
      currentBouncePower = Math.min(currentBouncePower + bounceIncrement, maxBouncePower);
    } else {
      currentBouncePower = ball.bouncePower;
    }

    // Increase vy (negative to go up)
    ball.vy = -currentBouncePower;
    ball.onGround = false;

    lastTapTime = now;
  }

  // Detect if pointer is inside ball
  function isInBall(x, y) {
    let dx = x - ball.x;
    let dy = y - ball.y;
    return Math.sqrt(dx*dx + dy*dy) <= ballRadius;
  }

  // Event listeners
  canvas.addEventListener('pointerdown', (e) => {
    const pos = getPointerPos(e);
    if (isInBall(pos.x, pos.y)) {
      dragging = true;
      dragOffsetX = pos.x - ball.x;
      dragOffsetY = pos.y - ball.y;
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    ball.x = Math.min(Math.max(ballRadius, pos.x - dragOffsetX), width - ballRadius);
    ball.y = Math.min(Math.max(ballRadius, pos.y - dragOffsetY), height - ballRadius - 10);
    ball.vy = 0;
  }, { passive: false });

  canvas.addEventListener('pointerup', (e) => {
    if (dragging) {
      dragging = false;
    } else {
      bounce();
    }
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  loop();
})();
