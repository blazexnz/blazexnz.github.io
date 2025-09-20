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

  function playClick(time, strong = false) {
    ensureAudio();
    const ctx = audioCtx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = strong ? 1000 : 800;
    g.gain.setValueAtTime(0.0001, time || ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(strong ? 0.25 : 0.14, (time || ctx.currentTime) + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, (time || ctx.currentTime) + 0.12);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(time || ctx.currentTime);
    o.stop((time || ctx.currentTime) + 0.14);
  }

  // Generate a random pattern that sums to 4 beats
  function generatePattern() {
    const pattern = [];
    let remaining = 4;

    // Keep picking until filled
    while (remaining > 0) {
      // Filter notes that fit
      const options = NOTES.filter(n => n.beats <= remaining);
      // Weighted random: prefer quarters and halves for variety
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

  // Render bar — we measure widths as percentages based on beats (4 beats total).
  function renderPattern(pattern) {
    // Clear
    barEl.innerHTML = '';
    // For accessibility announce simple text
    barEl.setAttribute('aria-label', 'New rhythm: ' + pattern.map(n => n.label).join(', '));

    pattern.forEach((note, index) => {
      const div = document.createElement('div');
      div.className = 'note ' + note.name;
      // width is controlled via CSS rule classes and min-widths — but ensure flexible sizing:
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
    // stop play if playing
    stopPlaying();
  });

  // Small helper to map start times of each note (in beats)
  function computeNoteStarts(pattern) {
    const starts = [];
    let pos = 0;
    pattern.forEach((note, i) => {
      starts.push({ index: i, startBeat: pos, beats: note.beats });
      pos += note.beats;
    });
    return starts;
  }

  // Playback scheduling
  let playing = false;
  let schedulerId = null;
  let startTime = 0;
  let lookahead = 0.1; // seconds
  let scheduleAhead = 0.2; // seconds
  let nextBeatTime = 0;
  let currentBeat = 0; // 0..3

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

    startTime = ctx.currentTime + 0.05; // slight delay
    nextBeatTime = startTime;
    currentBeat = 0;
    playing = true;
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.textContent = '⏸ Pause';

    // schedule beats
    function scheduler() {
      if (!playing) return;
      const now = ctx.currentTime;
      // schedule upcoming beats within scheduleAhead window
      while (nextBeatTime < now + scheduleAhead) {
        // play click for each beat (strong on beat 1)
        const isDownbeat = (currentBeat % 4) === 0;
        playClick(nextBeatTime, isDownbeat);

        // highlight any note that starts at this beat
        noteStarts.forEach(ns => {
          if (ns.startBeat === (currentBeat % 4)) {
            // schedule highlight at nextBeatTime
            const el = barEl.children[ns.index];
            if (el) {
              // add playing class
              setTimeout(() => {
                el.classList.add('playing');
              }, Math.max(0, (nextBeatTime - ctx.currentTime) * 1000));
              // remove after a short time (so kids see a flash)
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

  playBtn.addEventListener('click', () => {
    if (!playing) playSequence();
    else stopPlaying();
  });

  // Try Clap => plays a single strong click for practice
  randomClapBtn.addEventListener('click', () => {
    ensureAudio();
    playClick(audioCtx.currentTime, true);
  });

  // Keyboard: space to toggle play
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!playing) playSequence(); else stopPlaying();
    }
  });

  // Prevent accidental double-tap zoom on iOS when tapping a button: touch-action is set in CSS.
  // Also remove unwanted 300ms click delay on older devices by using pointer events where available.
  // (No external libs required)

  // Accessibility: regenerate pattern with keyboard
  generateBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') generateBtn.click();
  });

  // On load, focus generate for accessibility
  generateBtn.setAttribute('tabindex', '0');
  playBtn.setAttribute('tabindex', '0');
})();
