let currentFontSize = 24;

// Load prayers from JSON
let prayersData = {};

async function loadPrayers() {
  const res = await fetch('prayers.json');
  prayersData = await res.json();
  populatePrayerList();
}

function populatePrayerList() {
  const prayerList = document.getElementById('prayerList');
  const lang = document.getElementById('languageSelect').value;
  prayerList.innerHTML = '';

  if (prayersData[lang]) {
    Object.keys(prayersData[lang]).forEach(prayer => {
      const div = document.createElement('div');
      div.className = 'prayer-item';
      div.textContent = prayer;
      div.addEventListener('click', () => displayPrayer(prayer));
      prayerList.appendChild(div);
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
  populatePrayerList();
  document.getElementById('prayers').innerHTML = '';
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
