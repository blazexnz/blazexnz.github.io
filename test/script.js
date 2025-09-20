/* script.js
   Rhythm Playground
   - Generates a random combination of whole(4), half(2), quarter(1)
     that fills exactly 4 beats.
   - Plays a metronome and highlights notes when they start so kids clap.
*/

(() => {
  const generateBtn = document.getElementById('generateBtn');
  const playBtn = document.getElementById('playBtn');
  const barEl = document.getElementById('bar');
  const bpmInput = document.getElementById('bpmInput');
  const randomClapBtn = document.getElementById('randomClapBtn');

  // Note definitions
  const NOTES = [
    { name: 'whole', beats: 4, label: 'Whole', emoji: '🎵' },
    { name: 'half',  beats: 2, label: 'Half',  emoji: '🎶' },
    { name: 'quarter', beats: 1, label: 'Quarter', emoji: '♪' }
  ];

  // Audio context and click sound
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  async function resumeAudio() {
    ensureAudio();
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
  }

  function playClick(time, strong = false) {
    ensureAudio();
    const ctx = audioCtx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = strong ? 1200 : 880; // higher for clarity
    g.gain.setValueAtTime(0.0001, time || ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(strong ? 0.35 : 0.25, (time || ctx.currentTime) + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, (time || ctx.currentTime) + 0.18);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(time || ctx.currentTime);
    o.stop((time || ctx.currentTime) + 0.2);
  }

  // Generate a random pattern that sums to 4 beats
  function generatePattern() {
    const pattern = [];
    let remaining = 4;

    // Keep picking until filled
    while (remaining > 0) {
      const options = NOTES.filter(n => n.beats <= remaining);
      const weights = options.map(n => {
        if (n.name === 'quarter') return 3;
        if (n.name === 'half') return 2;
        return 1;
      });
      const total = weights.reduce((a,b)=>a+b,0);
      let r = Math.random()*total;
      let idx = 0;
      for (let i=0;i<weights.length;i++){
        r -= weights[i];
        if (r <= 0) { idx = i; break; }
      }
      pattern.push(options[idx]);
      remaining -= options[idx].beats;
    }
    return pattern;
  }

  function renderPattern(pattern) {
    barEl.innerHTML = '';
    barEl.setAttribute('aria-label', 'New rhythm: ' + pattern.map(n => n.label).join(', '));

    pattern.forEach((note, index) => {
      const div = document.createElement('div');
      div.className = 'note ' + note.name;
      div.style.flex = (note.beats) + ' 0 0';
      div.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="font-size:28px;">${note.emoji}</div>
          <div class="label">${note.label} • ${note.beats} ${note.beats===1?'beat':'beats'}</div>
        </div>
      `;
      barEl.appendChild(div);
    });
  }

  let currentPattern = generatePattern();
  renderPattern(currentPattern);

  // Generate button handler
  generateBtn.addEventListener('click', () => {
    currentPattern = generatePattern();
    renderPattern(currentPattern);
    if (playing) {
      stopPlaying();
      playSequence();
    }
  });

  function computeNoteStarts(pattern) {
    const starts = [];
    let pos = 0;
    pattern.forEach((note, i) => {
      starts.push({ index: i, startBeat: pos, beats: note.beats });
      pos += note.beats;
    });
    return starts;
  }

  let playing = false;
  let schedulerId = null;
  let startTime = 0;
  let lookahead = 0.1;
  let scheduleAhead = 0.2;
  let nextBeatTime = 0;
  let currentBeat = 0;

  function bpmToSec(bpm) {
    return 60 / bpm;
  }

  function playSequence() {
    if (playing) return;
    ensureAudio();
    const ctx = audioCtx;
    const bpm = Math.max(40, Math.min(220, Number(bpmInput.value || 90)));
    const beatSec = bpmToSec(bpm);

    const noteStarts = computeNoteStarts(currentPattern);

    startTime = ctx.currentTime + 0.05;
    nextBeatTime = startTime;
    currentBeat = 0;
    playing = true;
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.textContent = '⏸ Pause';

    function scheduler() {
      if (!playing) return;
      const now = ctx.currentTime;
      while (nextBeatTime < now + scheduleAhead) {
        const isDownbeat = (currentBeat % 4) === 0;
        playClick(nextBeatTime, isDownbeat);

        noteStarts.forEach(ns => {
          if (ns.startBeat === (currentBeat % 4)) {
            const el = barEl.children[ns.index];
            if (el) {
              setTimeout(() => {
                el.classList.add('playing');
              }, Math.max(0, (nextBeatTime - ctx.currentTime) * 1000));
              setTimeout(() => {
                el.classList.remove('playing');
              }, Math.max(0, (nextBeatTime - ctx.currentTime) * 1000) + (beatSec * 700));
            }
          }
        });

        nextBeatTime += beatSec;
        currentBeat++;
      }

      schedulerId = requestAnimationFrame(scheduler);
    }

    scheduler();
  }

  function stopPlaying() {
    if (!playing) return;
    playing = false;
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.textContent = '▶ Play';
    if (schedulerId) {
      cancelAnimationFrame(schedulerId);
      schedulerId = null;
    }
  }

  playBtn.addEventListener('click', async () => {
    await resumeAudio(); // ✅ ensure audio is unlocked on iOS
    if (!playing) playSequence();
    else stopPlaying();
  });

  randomClapBtn.addEventListener('click', async () => {
    await resumeAudio(); // ✅ ensure audio is unlocked on iOS
    playClick(audioCtx.currentTime, true);
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!playing) playSequence(); else stopPlaying();
    }
  });

  generateBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') generateBtn.click();
  });

  generateBtn.setAttribute('tabindex', '0');
  playBtn.setAttribute('tabindex', '0');
})();
