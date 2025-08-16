let currentFontSize = 24;
let prayersData = {};
let currentPrayerIndex = -1;
let currentLang = "en";

// Load prayers from JSON
async function loadPrayers() {
  const res = await fetch('prayers.json');
  prayersData = await res.json();
  populatePrayerList();
}

function populatePrayerList() {
  const prayerList = document.getElementById('prayerList');
  currentLang = document.getElementById('languageSelect').value;
  prayerList.innerHTML = '';

  if (prayersData[currentLang]) {
    let maxWidth = 0;
    const tempSpan = document.createElement('span');
    document.body.appendChild(tempSpan);
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = '1rem';

    Object.keys(prayersData[currentLang]).forEach(prayer => {
      tempSpan.textContent = prayer;
      maxWidth = Math.max(maxWidth, tempSpan.offsetWidth);
    });

    document.body.removeChild(tempSpan);

    Object.keys(prayersData[currentLang]).forEach((prayer, index) => {
      const div = document.createElement('div');
      div.className = 'prayer-item';
      div.style.width = maxWidth + 40 + 'px';
      div.textContent = prayer;
      div.addEventListener('click', () => {
        currentPrayerIndex = index;
        displayPrayer(prayer);
      });
      prayerList.appendChild(div);
    });
  }
}

function displayPrayer(prayerKey) {
  const container = document.getElementById('prayers');
  container.innerHTML = '';

  if (prayersData[currentLang] && prayersData[currentLang][prayerKey]) {
    const prayerText = prayersData[currentLang][prayerKey];
    const div = document.createElement('div');
    div.className = 'prayer';
    div.style.fontSize = currentFontSize + 'px';
    div.textContent = prayerText;
    container.appendChild(div);

    // Navigation buttons
    const navDiv = document.createElement('div');
    navDiv.className = 'nav-buttons';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '⬅️ Prev';
    prevBtn.disabled = currentPrayerIndex <= 0;
    prevBtn.addEventListener('click', () => {
      if (currentPrayerIndex > 0) {
        currentPrayerIndex--;
        const prevKey = Object.keys(prayersData[currentLang])[currentPrayerIndex];
        displayPrayer(prevKey);
      }
    });

    const backBtn = document.createElement('button');
    backBtn.id = 'backToTopBtn';
    backBtn.textContent = '⬆️ Back to Top';
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next ➡️';
    nextBtn.disabled = currentPrayerIndex >= Object.keys(prayersData[currentLang]).length - 1;
    nextBtn.addEventListener('click', () => {
      if (currentPrayerIndex < Object.keys(prayersData[currentLang]).length - 1) {
        currentPrayerIndex++;
        const nextKey = Object.keys(prayersData[currentLang])[currentPrayerIndex];
        displayPrayer(nextKey);
      }
    });

    navDiv.appendChild(prevBtn);
    navDiv.appendChild(backBtn);
    navDiv.appendChild(nextBtn);
    container.appendChild(navDiv);

    // Scroll prayer into view with slightly reduced white space
    requestAnimationFrame(() => {
      const yOffset = -20; // slightly less space above
      const y = div.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
