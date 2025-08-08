(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startOverBtn = document.getElementById('startOverBtn');
  const modeSelect = document.getElementById('modeSelect');

  const btnDrop100 = document.getElementById('btnDrop100');
  const btnLaunchAll = document.getElementById('btnLaunchAll');
  const btnShuffle = document.getElementById('btnShuffle');
  const btnColors = document.getElementById('btnColors');
  const btnGravitySlam = document.getElementById('btnGravitySlam');
  const btnChaosGravity = document.getElementById('btnChaosGravity');
  const btnFreeze = document.getElementById('btnFreeze');

  const width = canvas.width;
  const height = canvas.height;

  const ballRadius = 25;
  const normalGravity = 0.6;

  let balls = []; // all balls
  let mode = 1; // 1 = original, 2 = juggling

  // Gravity modes:
  // 0 = normal gravity (0.6)
  // 1 = gravity slam (very high gravity slam down)
  // 2 = chaos gravity (no gravity, no rest, infinite bounce)
  // 3 = freeze mode (balls freeze, no movement)
  let gravityMode = 0;

  // For continuous dropping
  let dropping = false;
  let dropInterval = null;
  let dropPos = { x: width / 2, y: 50 };

  // Utility to generate pastel colors
  function randomPastelColor() {
    const r = Math.round((Math.random() * 127) + 127);
    const g = Math.round((Math.random() * 127) + 127);
    const b = Math.round((Math.random() * 127) + 127);
    return `rgb(${r},${g},${b})`;
  }

  function createBall(x, y, color = '#00c896') {
    // If in freeze mode, new balls also have zero velocity and no movement
    balls.push({
      x,
      y,
      vx: gravityMode === 3 ? 0 : 0,
      vy: gravityMode === 3 ? 0 : 0,
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
    if (gravityMode === 3) {
      // Freeze mode: Do NOT update positions or velocities
      // Simply keep balls where they are
      return;
    }

    for (let ball of balls) {
      // Apply gravity based on mode
      if (gravityMode === 0) {
        // Normal gravity
        ball.vy += normalGravity;
      } else if (gravityMode === 1) {
        // Gravity slam: slam down fast, no bounce except ground stick
        ball.vy += 20; // very strong gravity to slam down
      } else if (gravityMode === 2) {
        // Chaos gravity: no gravity pulling down, invert vy on collisions endlessly
        // So no gravity added here
      }

      ball.x += ball.vx;
      ball.y += ball.vy;

      // Handle collisions differently per gravity mode
      if (gravityMode === 2) {
        // Chaos gravity mode: Bounce off all walls infinitely, no rest
        // Bounce off ground
        if (ball.y + ballRadius > height - 10) {
          ball.y = height - 10 - ballRadius;
          ball.vy *= -1; // invert vy, no energy loss
          ball.onGround = false; // never rest
        } else {
          ball.onGround = false;
        }

        // Ceiling collision
        if (ball.y - ballRadius < 0) {
          ball.y = ballRadius;
          ball.vy *= -1;
        }

        // Wall collisions
        if (ball.x - ballRadius < 0) {
          ball.x = ballRadius;
          ball.vx *= -1;
        } else if (ball.x + ballRadius > width) {
          ball.x = width - ballRadius;
          ball.vx *= -1;
        }

        // No friction or slowing in chaos gravity mode

      } else if (gravityMode === 1) {
        // Gravity slam mode: slam to ground and settle

        if (ball.y + ballRadius > height - 10) {
          ball.y = height - 10 - ballRadius;
          ball.vy = 0;
          ball.vx = 0;
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

        // Horizontal friction to settle
        ball.vx *= 0.99;
        if (Math.abs(ball.vx) < 0.05) ball.vx = 0;

      } else {
        // Normal gravity mode (gravityMode === 0)

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
    gravityMode = 0; // reset gravity to normal on mode change
    btnFreeze.classList.remove('active-freeze');
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

  // Press & hold + drag to continuously drop balls from exact pointer position
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dropping = true;
    dropPos = getPointerPos(e);

    if (dropInterval) clearInterval(dropInterval);
    dropInterval = setInterval(() => {
      if (dropping) {
        // Clamp x and y inside canvas bounds with radius margin
        let x = Math.min(Math.max(dropPos.x, ballRadius), width - ballRadius);
        let y = Math.min(Math.max(dropPos.y, ballRadius), height - ballRadius - 100); // keep some margin top
        createBall(x, y);
      }
    }, 100);
  }, { passive: false });

  canvas.addEventListener('pointermove', (e) => {
    if (!dropping) return;
    dropPos = getPointerPos(e);
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
  const restartGame = () => {
    balls = [];
    gravityMode = 0; // reset gravity on restart
    btnFreeze.classList.remove('active-freeze');
  };
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
    // Reset gravity mode to normal to allow balls to behave normally
    gravityMode = 0;
    btnFreeze.classList.remove('active-freeze');

    const restingBalls = balls.filter(b => b.onGround);
    restingBalls.forEach((ball, index) => {
      setTimeout(() => {
        ball.vy = -ball.currentBouncePower;
      }, index * 30); // 30ms delay between each launch
    });
  });

  // 🔄 Shuffle horizontal velocities randomly (-5 to +5)
  btnShuffle.addEventListener('click', () => {
    // Reset gravity mode to normal if chaos or slam active
    gravityMode = 0;
    btnFreeze.classList.remove('active-freeze');

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

  // ⬇️ Gravity Slam button — slam all balls to the ground once, then return to normal gravity mode
  btnGravitySlam.addEventListener('click', () => {
    gravityMode = 1;
    btnFreeze.classList.remove('active-freeze');

    for (let ball of balls) {
      // Reset velocities so slam works clearly
      ball.vx = 0;
      ball.vy = 0;
      ball.onGround = false;
    }

    // After short delay to let slam happen, reset gravityMode to normal
    setTimeout(() => {
      gravityMode = 0;
    }, 300); // 300ms slam duration approx
  });

  // 🔥 Chaos Gravity button — set chaos gravity mode and randomize velocities
  btnChaosGravity.addEventListener('click', () => {
    gravityMode = 2;
    btnFreeze.classList.remove('active-freeze');

    for (let ball of balls) {
      ball.vx = (Math.random() - 0.5) * 20;
      ball.vy = (Math.random() - 0.5) * 20;
      ball.onGround = false;
    }
  });

  // ❄️ Freeze Mode button — toggle freeze mode
  btnFreeze.addEventListener('click', () => {
    if (gravityMode === 3) {
      // If freeze is active, turn it off and return to normal gravity
      gravityMode = 0;
      btnFreeze.classList.remove('active-freeze');
    } else {
      // Activate freeze mode
      gravityMode = 3;
      btnFreeze.classList.add('active-freeze');
      // Freeze all balls immediately: zero velocity, keep position
      for (let ball of balls) {
        ball.vx = 0;
        ball.vy = 0;
      }
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
