let currentFontSize = 16;

// Load prayers from JSON
let prayersData = {};

async function loadPrayers() {
  const res = await fetch('prayers.json');
  prayersData = await res.json();
  populatePrayerMenu();
}

function populatePrayerMenu() {
  const prayerSelect = document.getElementById('prayerSelect');
  const lang = document.getElementById('languageSelect').value;
  prayerSelect.innerHTML = '<option value="">Select Prayer</option>';

  if (prayersData[lang]) {
    Object.keys(prayersData[lang]).forEach(prayer => {
      const opt = document.createElement('option');
      opt.value = prayer;
      opt.textContent = prayer;
      prayerSelect.appendChild(opt);
    });
  }
}

function displayPrayer(prayerKey) {
  const lang = document.getElementById('languageSelect').value;
  const container = document.getElementById('prayers');
  container.innerHTML = '';

  if (prayersData[lang] && prayersData[lang][prayerKey]) {
    const prayerText = prayersData[lang][prayerKey];
    const div = document.createElement('div');
    div.className = 'prayer';
    div.style.fontSize = currentFontSize + 'px';
    div.textContent = prayerText;
    container.appendChild(div);
  }
}

document.getElementById('languageSelect').addEventListener('change', () => {
  populatePrayerMenu();
  document.getElementById('prayers').innerHTML = '';
});

document.getElementById('prayerSelect').addEventListener('change', e => {
  displayPrayer(e.target.value);
});

document.getElementById('increaseFontBtn').addEventListener('click', () => {
  currentFontSize += 2;
  const prayerDiv = document.querySelector('.prayer');
  if (prayerDiv) prayerDiv.style.fontSize = currentFontSize + 'px';
});

document.getElementById('decreaseFontBtn').addEventListener('click', () => {
  currentFontSize = Math.max(12, currentFontSize - 2);
  const prayerDiv = document.querySelector('.prayer');
  if (prayerDiv) prayerDiv.style.fontSize = currentFontSize + 'px';
});

loadPrayers();
