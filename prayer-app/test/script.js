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
    let maxWidth = 0;
    const tempSpan = document.createElement('span');
    document.body.appendChild(tempSpan);
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = '1rem';

    // Find widest title
    Object.keys(prayersData[lang]).forEach(prayer => {
      tempSpan.textContent = prayer;
      maxWidth = Math.max(maxWidth, tempSpan.offsetWidth);
    });

    document.body.removeChild(tempSpan);

    // Create buttons with same width
    Object.keys(prayersData[lang]).forEach(prayer => {
      const div = document.createElement('div');
      div.className = 'prayer-item';
      div.style.width = maxWidth + 40 + 'px'; // +40 for padding/margin
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

    // Back to Top button (always appended after prayer)
    const backBtn = document.createElement('button');
    backBtn.id = 'backToTopBtn';
    backBtn.textContent = '⬆️ Back to Top';
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    container.appendChild(backBtn);

    // Scroll prayer into view at very top
    requestAnimationFrame(() => {
      div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
