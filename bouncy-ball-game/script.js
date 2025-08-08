(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startOverBtn = document.getElementById('startOverBtn');

  const width = canvas.width;
  const height = canvas.height;

  const ballRadius = 25;
  const gravity = 0.6;

  let balls = []; // store all balls

  function createBall(x, y) {
    balls.push({
      x,
      y,
      vx: 0,
      vy: 0,
      bouncePower: 30, // increased so it hits the roof
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
    const pos = getPointerPos(e);

    // Check if user tapped a ball that is resting at the bottom
    let touchedRestingBall = false;
    for (let ball of balls) {
      const dx = pos.x - ball.x;
      const dy = pos.y - ball.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= ballRadius && ball.onGround) {
        ball.vy = -ball.currentBouncePower; // make it bounce
        touchedRestingBall = true;
        break;
      }
    }

    // If no resting ball touched, create a new ball only if click is not near bottom
    if (!touchedRestingBall) {
      const bottomSafeZone = height - 80; // 80px from bottom is safe click zone for existing balls
      if (pos.y < bottomSafeZone) {
        createBall(pos.x, pos.y);
      }
    }
  });

  startOverBtn.addEventListener('click', () => {
    balls = [];
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  loop();
})();
