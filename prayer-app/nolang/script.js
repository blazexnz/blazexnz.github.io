let currentFontSize = 16;

// Load prayers from JSON
let prayersData = {};

// Load prayers from JSON file
async function loadPrayers() {
  const res = await fetch('prayers.json');
  prayersData = await res.json();
  populatePrayerMenu();
}

// Populate the prayer menu (single language: English for now)
function populatePrayerMenu() {
  const prayerSelect = document.getElementById('prayerSelect');
  prayerSelect.innerHTML = '<option value="">Select Prayer</option>';

  // Default to English prayers
  if (prayersData['en']) {
    Object.keys(prayersData['en']).forEach(prayer => {
      const opt = document.createElement('option');
      opt.value = prayer;
      opt.textContent = prayer;
      prayerSelect.appendChild(opt);
    });
  }
}

// Display selected prayer
function displayPrayer(prayerKey) {
  const container = document.getElementById('prayers');
  container.innerHTML = '';

  if (prayersData['en'] && prayersData['en'][prayerKey]) {
    const prayerText = prayersData['en'][prayerKey];
    const div = document.createElement('div');
    div.className = 'prayer';
    div.style.fontSize = currentFontSize + 'px';
    div.textContent = prayerText;
    container.appendChild(div);
  }
}

// Event listeners
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
