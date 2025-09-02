(() => {
  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // tame DPR for perf
  let width = 0, height = 0;

  const buttons = Array.from(document.querySelectorAll('.control-btn'));
  const durationInput = document.getElementById('duration');

  // Prevent sticky focus on buttons after tap, and avoid double tap zoom
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.blur();
    }, { passive: true });
  });

  function resize() {
    width = Math.floor(window.innerWidth);
    height = Math.floor(window.innerHeight);
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // ---- Effect Engine ----
  const effects = [];
  let raf = null;

  function loop(ts) {
    ctx.clearRect(0, 0, width, height);

    // Draw
    for (let i = effects.length - 1; i >= 0; i--) {
      const e = effects[i];
      e.update(ts);
      e.draw(ctx);

      if (e.done) effects.splice(i, 1);
    }

    raf = effects.length ? requestAnimationFrame(loop) : null;
  }

  function addEffect(factory, seconds) {
    const eff = factory({ width, height });
    eff.seconds = Math.max(1, Math.min(20, Number(seconds) || 6));
    eff.startTime = performance.now();
    eff.endTime = eff.startTime + eff.seconds * 1000;
    effects.push(eff);
    if (!raf) raf = requestAnimationFrame(loop);
  }

  // Utilities
  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Shapes
  function drawHeart(ctx, x, y, size, rot = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(size, size);
    ctx.beginPath();
    ctx.moveTo(0, -0.35);
    ctx.bezierCurveTo(0, -0.7, -0.6, -0.85, -0.95, -0.45);
    ctx.bezierCurveTo(-1.35, 0.05, -0.7, 0.6, 0, 1.0);
    ctx.bezierCurveTo(0.7, 0.6, 1.35, 0.05, 0.95, -0.45);
    ctx.bezierCurveTo(0.6, -0.85, 0, -0.7, 0, -0.35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawBalloon(ctx, x, y, r, hue) {
    ctx.save();
    const grad = ctx.createRadialGradient(x - r*0.3, y - r*0.3, r*0.2, x, y, r);
    grad.addColorStop(0, `hsl(${hue}, 90%, 70%)`);
    grad.addColorStop(1, `hsl(${hue}, 90%, 50%)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 0.8, r, 0, 0, Math.PI * 2);
    ctx.fill();

    // Knot
    ctx.fillStyle = `hsl(${hue}, 90%, 35%)`;
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.95);
    ctx.lineTo(x - 4, y + r * 1.1);
    ctx.lineTo(x + 4, y + r * 1.1);
    ctx.closePath();
    ctx.fill();

    // String
    ctx.strokeStyle = `rgba(255,255,255,0.6)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + r * 1.1);
    const length = 40;
    for (let i = 1; i <= 6; i++) {
      ctx.lineTo(x + Math.sin((y + i*10) * 0.02) * 3, y + r*1.1 + i * (length/6));
    }
    ctx.stroke();
    ctx.restore();
  }

  // ---- Individual Effect Factories ----

  // 1) Confetti
  function ConfettiFactory(bounds) {
    const N = Math.floor(120 * (bounds.width * bounds.height) / (390*700)) + 70;
    const pieces = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(-bounds.height, -10),
      w: rand(6, 12),
      h: rand(8, 18),
      r: rand(0, Math.PI * 2),
      rv: rand(-0.2, 0.2),
      vy: rand(90, 220) / 60,
      vx: rand(-40, 40) / 60,
      hue: randInt(0, 360),
      sat: randInt(70, 95),
      light: randInt(45, 65),
      sway: rand(0.8, 1.8),
      swayT: rand(0, Math.PI*2)
    }));

    return {
      done: false,
      update(ts) {
        const now = performance.now();
        this.done = now > this.endTime;
        pieces.forEach(p => {
          p.swayT += 0.05;
          p.x += p.vx + Math.sin(p.swayT) * p.sway;
          p.y += p.vy;
          p.r += p.rv;
          if (p.y > height + 20) {
            p.y = rand(-height * 0.6, -10);
            p.x = rand(0, width);
          }
        });
      },
      draw(ctx) {
        pieces.forEach(p => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.r);
          ctx.fillStyle = `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`;
          ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
          ctx.restore();
        });
      }
    };
  }

  // 2) Fireworks
  function FireworksFactory(bounds) {
    const rockets = [];
    const bursts = [];
    const gravity = 0.025;

    function spawnRocket() {
      const x = rand(bounds.width * 0.1, bounds.width * 0.9);
      const y = bounds.height + 10;
      const vy = -rand(4.8, 6.4);
      const vx = rand(-0.7, 0.7);
      const hue = randInt(0, 360);
      rockets.push({ x, y, vx, vy, hue, exploded: false, peak: rand(bounds.height*0.25, bounds.height*0.5) });
    }

    function explode(rocket) {
      const count = randInt(50, 90);
      const parts = Array.from({ length: count }, () => {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(1.2, 3.2);
        return {
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: rand(40, 80),
          age: 0,
          hue: (rocket.hue + randInt(-20, 20) + 360) % 360
        };
      });
      bursts.push(parts);
    }

    let lastSpawn = 0;

    return {
      done: false,
      update(ts) {
        const now = performance.now();
        this.done = now > this.endTime && rockets.length === 0 && bursts.length === 0;

        if (now - lastSpawn > 400 && now < this.endTime) {
          spawnRocket();
          lastSpawn = now;
        }

        rockets.forEach(r => {
          r.x += r.vx;
          r.y += r.vy;
          r.vy += gravity * 0.4;
          if (!r.exploded && r.vy > 0 || r.y < r.peak) {
            r.exploded = true;
            explode(r);
          }
        });
        for (let i = rockets.length - 1; i >= 0; i--) {
          if (rockets[i].exploded) rockets.splice(i, 1);
        }

        // update bursts
        for (let b = bursts.length - 1; b >= 0; b--) {
          const parts = bursts[b];
          parts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += gravity;
            p.vx *= 0.995;
            p.vy *= 0.995;
            p.age++;
          });
          if (parts.every(p => p.age > p.life)) bursts.splice(b, 1);
        }
      },
      draw(ctx) {
        // subtle haze
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        bursts.forEach(parts => {
          parts.forEach(p => {
            const alpha = 1 - (p.age / p.life);
            ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${clamp(alpha, 0, 1)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        });

        rockets.forEach(r => {
          ctx.strokeStyle = `hsla(${r.hue}, 95%, 70%, 0.9)`;
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x - r.vx * 4, r.y - r.vy * 4);
          ctx.stroke();
        });
      }
    };
  }

  // 3) Rain
  function RainFactory(bounds) {
    const N = Math.floor(300 * bounds.width / 390);
    const drops = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(-bounds.height, 0),
      l: rand(8, 16),
      v: rand(3.6, 6.2)
    }));

    return {
      done: false,
      update() {
        const now = performance.now();
        this.done = now > this.endTime;
        drops.forEach(d => {
          d.y += d.v;
          d.x += 0.6; // wind
          if (d.y > height) {
            d.y = rand(-40, -10);
            d.x = rand(0, width);
          }
        });
      },
      draw(ctx) {
        ctx.strokeStyle = 'rgba(200, 220, 255, 0.6)';
        ctx.lineWidth = 1;
        drops.forEach(d => {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - 0.5, d.y - d.l);
          ctx.stroke();
        });
      }
    };
  }

  // 4) Snow
  function SnowFactory(bounds) {
    const N = Math.floor(120 * (bounds.width / 390)) + 50;
    const flakes = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(-bounds.height, 0),
      r: rand(1.2, 3.2),
      vy: rand(0.3, 1.1),
      sway: rand(0.5, 1.4),
      t: rand(0, Math.PI * 2)
    }));
    return {
      done: false,
      update(){
        const now = performance.now();
        this.done = now > this.endTime;
        flakes.forEach(f => {
          f.t += 0.02;
          f.x += Math.sin(f.t) * f.sway * 0.4;
          f.y += f.vy;
          if (f.y > height + 5) {
            f.y = -10;
            f.x = rand(0, width);
          }
        });
      },
      draw(ctx){
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        flakes.forEach(f => {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };
  }

  // 5) Bubbles (rise)
  function BubblesFactory(bounds) {
    const N = Math.floor(120 * (bounds.width / 390));
    const bubbles = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(bounds.height * 0.7, bounds.height + 40),
      r: rand(4, 14),
      vy: rand(0.6, 1.6),
      vx: rand(-0.3, 0.3),
      t: rand(0, Math.PI * 2)
    }));
    return {
      done: false,
      update(){
        const now = performance.now();
        this.done = now > this.endTime;
        bubbles.forEach(b => {
          b.t += 0.04;
          b.x += Math.sin(b.t) * 0.6 + b.vx;
          b.y -= b.vy;
          if (b.y < -20) {
            b.y = rand(height + 10, height + 40);
            b.x = rand(0, width);
          }
        });
      },
      draw(ctx){
        bubbles.forEach(b => {
          const g = ctx.createRadialGradient(b.x - b.r*0.4, b.y - b.r*0.4, b.r*0.2, b.x, b.y, b.r);
          g.addColorStop(0, 'rgba(255,255,255,0.95)');
          g.addColorStop(1, 'rgba(180,200,255,0.28)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.35)';
          ctx.stroke();
        });
      }
    };
  }

  // 6) Balloons (rise with strings)
  function BalloonsFactory(bounds) {
    const N = Math.floor(20 * (bounds.width / 390)) + 12;
    const balls = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(bounds.height * 1.0, bounds.height + 160),
      r: rand(14, 26),
      vy: rand(0.5, 1.0),
      hue: randInt(0, 360)
    }));
    return {
      done: false,
      update(){
        const now = performance.now();
        this.done = now > this.endTime;
        balls.forEach(b => {
          b.y -= b.vy;
          b.x += Math.sin(b.y * 0.02) * 0.5;
          if (b.y < -60) {
            b.y = rand(height + 40, height + 160);
            b.x = rand(0, width);
          }
        });
      },
      draw(ctx){
        balls.forEach(b => drawBalloon(ctx, b.x, b.y, b.r, b.hue));
      }
    };
  }

  // 7) Hearts (fall)
  function HeartsFactory(bounds) {
    const N = Math.floor(100 * (bounds.width / 390)) + 50;
    const hearts = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(-bounds.height, 0),
      s: rand(6, 12),
      r: rand(0, Math.PI * 2),
      vr: rand(-0.02, 0.02),
      vy: rand(0.8, 1.6),
      hue: randInt(340, 360)
    }));
    return {
      done: false,
      update(){
        const now = performance.now();
        this.done = now > this.endTime;
        hearts.forEach(h => {
          h.r += h.vr;
          h.y += h.vy;
          h.x += Math.sin(h.y * 0.03) * 0.4;
          if (h.y > height + 12) {
            h.y = -20;
            h.x = rand(0, width);
          }
        });
      },
      draw(ctx){
        hearts.forEach(h => {
          ctx.fillStyle = `hsl(${h.hue}, 85%, 55%)`;
          drawHeart(ctx, h.x, h.y, h.s / 20, h.r);
        });
      }
    };
  }

  // 8) Sparkles (twinkle everywhere)
  function SparklesFactory(bounds) {
    const N = Math.floor(160 * (bounds.width * bounds.height) / (390*700)) + 80;
    const stars = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(0, bounds.height),
      r: rand(0.6, 1.8),
      t: rand(0, Math.PI * 2),
      s: rand(0.02, 0.06)
    }));
    return {
      done: false,
      update(){
        const now = performance.now();
        this.done = now > this.endTime;
        stars.forEach(s => {
          s.t += s.s;
        });
      },
      draw(ctx){
        stars.forEach(s => {
          const a = (Math.sin(s.t) * 0.5 + 0.5) * 0.9 + 0.1;
          ctx.fillStyle = `rgba(255,255,220,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };
  }

  // 9) Emoji Storm (random emoji downpour)
  function EmojiFactory(bounds) {
    const EMOJI = ['🎉','✨','❤️','🎈','❄️','🌧️','💥','🫧','🤩','⭐','🎊','💕','🥳'];
    const N = Math.floor(90 * (bounds.width / 390)) + 60;
    const items = Array.from({ length: N }, () => ({
      x: rand(0, bounds.width),
      y: rand(-bounds.height, 0),
      size: rand(16, 36),
      vy: rand(0.8, 2.2),
      vx: rand(-0.4, 0.4),
      t: rand(0, Math.PI * 2),
      glyph: EMOJI[randInt(0, EMOJI.length - 1)],
      rot: rand(0, Math.PI*2),
      vr: rand(-0.02, 0.02)
    }));
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    return {
      done: false,
      update(){
        const now = performance.now();
        this.done = now > this.endTime;
        items.forEach(it => {
          it.t += 0.04;
          it.y += it.vy;
          it.x += it.vx + Math.sin(it.t) * 0.6;
          it.rot += it.vr;
          if (it.y > height + 30) {
            it.y = rand(-60, -10);
            it.x = rand(0, width);
          }
        });
      },
      draw(ctx){
        items.forEach(it => {
          ctx.save();
          ctx.translate(it.x, it.y);
          ctx.rotate(it.rot);
          ctx.font = `${it.size}px system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`;
          ctx.fillText(it.glyph, 0, 0);
          ctx.restore();
        });
      }
    };
  }

  const FACTORIES = {
    confetti: ConfettiFactory,
    fireworks: FireworksFactory,
    rain:      RainFactory,
    snow:      SnowFactory,
    bubbles:   BubblesFactory,
    balloons:  BalloonsFactory,
    hearts:    HeartsFactory,
    sparkles:  SparklesFactory,
    emoji:     EmojiFactory
  };

  // Wire buttons
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const effect = btn.getAttribute('data-effect');
      const secs = durationInput?.value || 6;
      const factory = FACTORIES[effect];
      if (factory) addEffect(factory, secs);
    }, { passive: true });
  });

  // Optional: tap on canvas to explode fireworks where you tap
  canvas.addEventListener('pointerdown', (e) => {
    // small sparkle burst on tap for delight
    const p = { x: e.clientX, y: e.clientY };
    const burst = (() => {
      const parts = Array.from({ length: 50 }, () => ({
        x: p.x, y: p.y,
        vx: Math.cos(rand(0, Math.PI*2)) * rand(0.5, 2.5),
        vy: Math.sin(rand(0, Math.PI*2)) * rand(0.5, 2.5),
        a: 1
      }));
      return {
        done: false,
        update(){
          const now = performance.now();
          this.done = now > (this.endTime || (this.startTime + 800));
          parts.forEach(pt => {
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.vx *= 0.98;
            pt.vy *= 0.98;
            pt.a *= 0.95;
          });
        },
        draw(ctx){
          parts.forEach(pt => {
            ctx.fillStyle = `rgba(255,255,255,${pt.a.toFixed(3)})`;
            ctx.fillRect(pt.x, pt.y, 2, 2);
          });
        }
      };
    })();
    burst.startTime = performance.now();
    burst.endTime = burst.startTime + 800;
    effects.push(burst);
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

})();
