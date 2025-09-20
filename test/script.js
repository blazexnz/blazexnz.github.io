// script.js
(() => {
  const BAR_COUNT = 8;
  const app = document.querySelector('.app');
  const grid = document.querySelector('.grid');
  const signatureSelect = document.getElementById('signature');
  const linesSelect = document.getElementById('lines');
  const noteSelect = document.getElementById('noteSymbol');
  const tempoInput = document.getElementById('tempo');
  const playBtn = document.getElementById('playBtn');
  const stopBtn = document.getElementById('stopBtn');
  const beatsPerBarLabel = document.getElementById('beatsPerBarLabel');

  // Audio context for click sounds
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  function playClick(time, freq = 1000, duration = 0.03, volume = 0.2) {
    ensureAudio();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.value = volume;
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start(time);
    g.gain.setValueAtTime(volume, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + duration);
    o.stop(time + duration + 0.02);
  }

  // State
  let beatsPerBar = parseInt(signatureSelect.value, 10);
  let lineCount = parseInt(linesSelect.value, 10);
  let noteSymbol = noteSelect.value;
  let tempo = parseInt(tempoInput.value, 10) || 100;

  let currentPos = 0; // from 0..(BAR_COUNT*beatsPerBar-1)
  let timer = null;
  let isPlaying = false;

  // Build grid UI
  function buildGrid() {
    grid.innerHTML = '';
    beatsPerBar = parseInt(signatureSelect.value, 10);
    lineCount = parseInt(linesSelect.value, 10);
    noteSymbol = noteSelect.value;
    beatsPerBarLabel.textContent = beatsPerBar;

    for (let r = 0; r < lineCount; r++) {
      const lineWrap = document.createElement('div');
      lineWrap.className = 'line panel';
      const title = document.createElement('div');
      title.className = 'row-title';
      title.textContent = lineCount === 1 ? 'Single line' : (r === 0 ? 'Line 1 (hand 1)' : 'Line 2 (hand 2)');
      lineWrap.appendChild(title);

      const bars = document.createElement('div');
      bars.className = 'bars';

      for (let b = 0; b < BAR_COUNT; b++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        const beats = document.createElement('div');
        beats.className = 'beats';
        // create beat boxes according to signature
        for (let i = 0; i < beatsPerBar; i++) {
          const beat = document.createElement('button'); // button makes it tappable
          beat.type = 'button';
          beat.className = 'beat';
          // mark first beat of bar as strong
          if (i === 0) beat.classList.add('strong');
          beat.textContent = noteSymbol;
          // allow toggling: cycle through a few symbols quickly (optional)
          beat.addEventListener('click', (ev) => {
            ev.preventDefault();
            // simple toggle: clear / set
            if (beat.dataset.off === '1') {
              beat.dataset.off = '0';
              beat.textContent = noteSymbol;
              beat.classList.remove('muted');
            } else {
              beat.dataset.off = '0'; // keep default - no mute functionality now
            }
          }, {passive:false});
          beats.appendChild(beat);
        }
        bar.appendChild(beats);
        bars.appendChild(bar);
      }

      lineWrap.appendChild(bars);
      grid.appendChild(lineWrap);
    }

    // reset position highlight
    highlightCurrent();
  }

  function highlightCurrent() {
    // remove existing highlights
    document.querySelectorAll('.beat.current').forEach(el => el.classList.remove('current'));
    // compute which beat to highlight
    const totalBeats = BAR_COUNT * beatsPerBar;
    const pos = ((currentPos % totalBeats) + totalBeats) % totalBeats;
    // map pos to bars & beat index per line
    const barIndex = Math.floor(pos / beatsPerBar);
    const beatIndex = pos % beatsPerBar;
    // highlight across lines
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
      const bars = line.querySelectorAll('.bar');
      const bar = bars[barIndex];
      if (!bar) return;
      const beat = bar.querySelectorAll('.beat')[beatIndex];
      if (beat) beat.classList.add('current');
    });
  }

  function scheduleNextTick() {
    const intervalMs = (60_000 / tempo) ; // quarter note interval
    return intervalMs;
  }

  function start() {
    if (isPlaying) return;
    isPlaying = true;
    playBtn.disabled = true;
    stopBtn.disabled = false;
    playBtn.setAttribute('aria-pressed', 'true');

    // if the sound hasn't been used yet, resume context on first interaction
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Use precise scheduling with setInterval. Good enough for practice app.
    const totalBeats = BAR_COUNT * beatsPerBar;
    const msPerBeat = 60000 / tempo;

    // immediate tick
    tick();

    timer = setInterval(() => {
      tick();
    }, msPerBeat);
  }

  function tick() {
    const totalBeats = BAR_COUNT * beatsPerBar;
    // audio click: accent for downbeat
    const isDownbeat = (currentPos % beatsPerBar) === 0;
    // frequency difference: downbeat higher pitch
    const freq = isDownbeat ? 1200 : 800;
    try { playClick(audioCtx ? audioCtx.currentTime : 0, freq, 0.03, isDownbeat ? 0.22 : 0.14); } catch (e) { /* ignore if audio not allowed */ }

    highlightCurrent();
    currentPos = (currentPos + 1) % totalBeats;
  }

  function stop() {
    if (!isPlaying) return;
    isPlaying = false;
    playBtn.disabled = false;
    stopBtn.disabled = true;
    playBtn.setAttribute('aria-pressed', 'false');
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    // clear highlight
    document.querySelectorAll('.beat.current').forEach(el => el.classList.remove('current'));
  }

  // Event listeners
  signatureSelect.addEventListener('change', () => {
    beatsPerBar = parseInt(signatureSelect.value, 10);
    beatsPerBarLabel.textContent = beatsPerBar;
    currentPos = 0;
    stop();
    buildGrid();
  });

  linesSelect.addEventListener('change', () => {
    lineCount = parseInt(linesSelect.value, 10);
    currentPos = 0;
    stop();
    buildGrid();
  });

  noteSelect.addEventListener('change', (e) => {
    noteSymbol = e.target.value;
    // update visible notes
    document.querySelectorAll('.beat').forEach(b => {
      b.textContent = noteSymbol;
    });
  });

  tempoInput.addEventListener('change', (e) => {
    tempo = parseInt(e.target.value, 10) || 100;
    // if playing, restart with new tempo
    if (isPlaying) {
      stop();
      start();
    }
  });

  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // create/resume audio context in user gesture
    ensureAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    start();
  }, {passive:false});

  stopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    stop();
  }, {passive:false});

  // Prevent double-tap zoom on iPhones when tapping buttons: already using touch-action: manipulation on button
  // Additional safety: prevent double-tap zoom pagewide by ignoring fast sequential taps on body (optional)
  let lastTap = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTap <= 300) {
      e.preventDefault();
    }
    lastTap = now;
  }, {passive:false});

  // Initialization
  buildGrid();

  // Expose small debug if needed
  window._rhythmTrainer = {
    start, stop, buildGrid, playClick
  };
})();
