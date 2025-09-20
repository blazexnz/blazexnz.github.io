(() => {
  const BAR_COUNT = 4;
  const app = document.querySelector('.app');
  const grid = document.querySelector('.grid');
  const signatureSelect = document.getElementById('signature');
  const linesSelect = document.getElementById('lines');
  const noteSelect = document.getElementById('noteSymbol');
  const tempoInput = document.getElementById('tempo');
  const playBtn = document.getElementById('playBtn');
  const stopBtn = document.getElementById('stopBtn');
  const beatsPerBarLabel = document.getElementById('beatsPerBarLabel');

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

  let beatsPerBar = parseInt(signatureSelect.value, 10);
  let lineCount = parseInt(linesSelect.value, 10);
  let noteSymbol = noteSelect.value;
  let tempo = parseInt(tempoInput.value, 10) || 100;

  let currentPos = 0;
  let timer = null;
  let isPlaying = false;

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
        for (let i = 0; i < beatsPerBar; i++) {
          const beat = document.createElement('button');
          beat.type = 'button';
          beat.className = 'beat';
          if (i === 0) beat.classList.add('strong');
          beat.textContent = noteSymbol;
          beat.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (beat.dataset.off === '1') {
              beat.dataset.off = '0';
              beat.textContent = noteSymbol;
              beat.classList.remove('muted');
            } else {
              beat.dataset.off = '0';
            }
          }, { passive: false });
          beats.appendChild(beat);
        }
        bar.appendChild(beats);
        bars.appendChild(bar);
      }

      lineWrap.appendChild(bars);
      grid.appendChild(lineWrap);
    }
    highlightCurrent();
  }

  function highlightCurrent() {
    document.querySelectorAll('.beat.current').forEach(el => el.classList.remove('current'));
    const totalBeats = BAR_COUNT * beatsPerBar;
    const pos = ((currentPos % totalBeats) + totalBeats) % totalBeats;
    const barIndex = Math.floor(pos / beatsPerBar);
    const beatIndex = pos % beatsPerBar;
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
      const bars = line.querySelectorAll('.bar');
      const bar = bars[barIndex];
      if (!bar) return;
      const beat = bar.querySelectorAll('.beat')[beatIndex];
      if (beat) beat.classList.add('current');
    });
  }

  function start() {
    if (isPlaying) return;
    isPlaying = true;
    playBtn.disabled = true;
    stopBtn.disabled = false;
    playBtn.setAttribute('aria-pressed', 'true');

    const totalBeats = BAR_COUNT * beatsPerBar;
    const msPerBeat = 60000 / tempo;
    tick();
    timer = setInterval(() => {
      tick();
    }, msPerBeat);
  }

  function tick() {
    const totalBeats = BAR_COUNT * beatsPerBar;
    const isDownbeat = (currentPos % beatsPerBar) === 0;
    const freq = isDownbeat ? 1200 : 800;
    try {
      playClick(audioCtx ? audioCtx.currentTime : 0, freq, 0.03, isDownbeat ? 0.22 : 0.14);
    } catch (e) {}
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
    document.querySelectorAll('.beat.current').forEach(el => el.classList.remove('current'));
  }

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
    document.querySelectorAll('.beat').forEach(b => {
      b.textContent = noteSymbol;
    });
  });

  tempoInput.addEventListener('change', (e) => {
    tempo = parseInt(e.target.value, 10) || 100;
    if (isPlaying) {
      stop();
      start();
    }
  });

  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // ✅ ensure audio context in direct user gesture
    ensureAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    start();
  }, { passive: false });

  stopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    stop();
  }, { passive: false });

  // ❌ removed global document touchend preventDefault

  buildGrid();

  window._rhythmTrainer = {
    start, stop, buildGrid, playClick
  };
})();
