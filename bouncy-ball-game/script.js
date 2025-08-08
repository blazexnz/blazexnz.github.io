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
    vx: 0, // NEW: horizontal velocity
    gravity: 0.6,
    bouncePower: 15,
    onGround: true,
  };

  // Drag / hold state
  let dragging = false;
  let holding = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  // For throw velocity calculation
  let lastPos = { x: ball.x, y: ball.y };
  let lastMoveTime = 0;

  // Tap timing for progressive bounce
  let lastTapTime = 0;
  const maxBouncePower = 60;
  const bounceIncrement = 7;
  let currentBouncePower = ball.bouncePower;

  function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = '#00c896';
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  function update() {
    if (!dragging && !holding) {
      ball.vy += ball.gravity;
      ball.x += ball.vx; // NEW: apply horizontal velocity
      ball.y += ball.vy;

      // Ground bounce
      if (ball.y + ballRadius > height - 10) {
        ball.y = height - 10 - ballRadius;
        ball.vy *= -0.7; // bounce up with damping
        if (Math.abs(ball.vy) < 1) ball.vy = 0;
        ball.onGround = true;
        currentBouncePower = ball.bouncePower;
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
        ball.vx *= -0.7; // bounce off left wall
      } else if (ball.x + ballRadius > width) {
        ball.x = width - ballRadius;
        ball.vx *= -0.7; // bounce off right wall
      }

      // Apply horizontal friction
      ball.vx *= 0.99;
      if (Math.abs(ball.vx) < 0.05) ball.vx = 0;
    }
  }

  function loop() {
    clear();
    update();
    drawBall();
    requestAnimationFrame(loop);
  }

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

  function bounce() {
    const now = Date.now();
    if (now - lastTapTime < 400) {
      currentBouncePower = Math.min(currentBouncePower + bounceIncrement, maxBouncePower);
    } else {
      currentBouncePower = ball.bouncePower;
    }
    ball.vy = -currentBouncePower;
    ball.onGround = false;
    lastTapTime = now;
  }

  function isInBall(x, y) {
    let dx = x - ball.x;
    let dy = y - ball.y;
    return Math.sqrt(dx * dx + dy * dy) <= ballRadius;
  }

  canvas.addEventListener('pointerdown', (e) => {
    const pos = getPointerPos(e);
    if (isInBall(pos.x, pos.y)) {
      dragging = true;
      holding = true;
      dragOffsetX = pos.x - ball.x;
      dragOffsetY = pos.y - ball.y;
      ball.vx = 0; // stop horizontal motion while dragging
      ball.vy = 0; // freeze motion instantly
      lastPos = pos;
      lastMoveTime = Date.now();
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    e.preventDefault();
    const pos = getPointerPos(e);

    // if moved significantly, treat as dragging
    if (Math.abs(pos.x - (ball.x + dragOffsetX)) > 2 ||
        Math.abs(pos.y - (ball.y + dragOffsetY)) > 2) {
      holding = false;
    }

    ball.x = Math.min(Math.max(ballRadius, pos.x - dragOffsetX), width - ballRadius);
    ball.y = Math.min(Math.max(ballRadius, pos.y - dragOffsetY), height - ballRadius - 10);
    ball.vy = 0;

    // Track movement for velocity calculation
    let now = Date.now();
    let dt = (now - lastMoveTime) / 1000;
    if (dt > 0) {
      ball.vx = (pos.x - lastPos.x) / dt / 60; // scaled down
      ball.vy = (pos.y - lastPos.y) / dt / 60;
    }
    lastPos = pos;
    lastMoveTime = now;
  }, { passive: false });

  canvas.addEventListener('pointerup', (e) => {
    if (dragging) {
      if (holding) {
        holding = false;
      }
      dragging = false;
      // Throw effect: keep the velocity from pointermove
    } else {
      bounce();
    }
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  loop();
})();
