'use strict';

// ─── Zone definitions ──────────────────────────────────────────────────
const ZONES = [
  { id: 'us',  city: 'United States', label: 'LOCAL / ET', primary: true, tz: 'America/New_York' },
  { id: 'ny',  city: 'New York',      label: 'ET',                        tz: 'America/New_York' },
  { id: 'chi', city: 'Chicago',       label: 'CT',                        tz: 'America/Chicago' },
  { id: 'den', city: 'Denver',        label: 'MT',                        tz: 'America/Denver' },
  { id: 'la',  city: 'Los Angeles',   label: 'PT',                        tz: 'America/Los_Angeles' },
];

const CONV_ZONES = [
  { city: 'New York',      label: 'ET', tz: 'America/New_York' },
  { city: 'Chicago',       label: 'CT', tz: 'America/Chicago' },
  { city: 'Denver',        label: 'MT', tz: 'America/Denver' },
  { city: 'Los Angeles',   label: 'PT', tz: 'America/Los_Angeles' },
];

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// ─── Helpers ───────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, '0'); }

function getPartsIn(tz, now) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour: 'numeric', minute: '2-digit',
    second: '2-digit', hour12: false, weekday: 'short', month: 'short', day: 'numeric',
  });
  const parts = {};
  fmt.formatToParts(now).forEach(({ type, value }) => { parts[type] = value; });
  const h = parseInt(parts.hour, 10);
  parts.ampm   = h < 12 || h === 24 ? 'AM' : 'PM';
  parts.hour12 = h % 12 || 12;
  return parts;
}

function utcOffset(tz, now) {
  const utc  = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const loc  = new Date(now.toLocaleString('en-US', { timeZone: tz }));
  const diff = (loc - utc) / 60000;
  const sign = diff >= 0 ? '+' : '−';
  const h    = Math.floor(Math.abs(diff) / 60);
  const m    = Math.abs(diff) % 60;
  return `UTC${sign}${pad(h)}${m ? ':' + pad(m) : ''}`;
}

// ─── Build live clock cards ─────────────────────────────────────────────
const grid     = document.getElementById('clock-grid');
const cardRefs = {};

ZONES.forEach(zone => {
  const card = document.createElement('div');
  card.className = 'card' + (zone.primary ? ' us' : '');
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', zone.city + ' time');
  card.innerHTML = `
    <span class="card-offset" id="offset-${zone.id}"></span>
    <span class="card-zone">${zone.label}</span>
    <span class="card-city">${zone.city}</span>
    <div class="card-time" id="time-${zone.id}">
      <span class="hours"></span><span class="colon">:</span><span class="mins"></span><span class="ampm"></span>
    </div>
    <div class="card-sub" id="sub-${zone.id}"></div>
  `;
  grid.appendChild(card);
  cardRefs[zone.id] = {
    hours:  card.querySelector('.hours'),
    mins:   card.querySelector('.mins'),
    ampm:   card.querySelector('.ampm'),
    sub:    card.querySelector(`#sub-${zone.id}`),
    offset: card.querySelector(`#offset-${zone.id}`),
  };
});

// ─── Live tick ─────────────────────────────────────────────────────────
const headerDate = document.getElementById('utc-label');
const footerUtc  = document.getElementById('footer-utc');
let lastSec = -1, offsetsSet = false;

function tick() {
  const now = new Date();
  const sec = now.getSeconds();

  if (!offsetsSet || sec === 0) {
    headerDate.textContent = now.toLocaleDateString('en-US', {
      timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    }).toUpperCase();
    ZONES.forEach(z => { cardRefs[z.id].offset.textContent = utcOffset(z.tz, now); });
    offsetsSet = true;
  }

  if (sec !== lastSec) {
    lastSec = sec;
    ZONES.forEach(zone => {
      const p   = getPartsIn(zone.tz, now);
      const ref = cardRefs[zone.id];
      ref.hours.textContent = pad(p.hour12);
      ref.mins.textContent  = pad(p.minute);
      ref.ampm.textContent  = p.ampm;
      ref.sub.textContent   = `${p.weekday.toUpperCase()}  ${p.month.toUpperCase()} ${p.day}`;
    });
    footerUtc.textContent =
      `UTC  ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  }
}

tick();
setInterval(tick, 500);

// ─── Converter ─────────────────────────────────────────────────────────
const convDay     = document.getElementById('conv-day');
const convTime    = document.getElementById('conv-time');
const convResults = document.getElementById('conv-results');

// Pre-select current NZ day and time
(function initNZDefaults() {
  const now = new Date();
  const nzParts = {};
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Pacific/Auckland',
    weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(now).forEach(({ type, value }) => { nzParts[type] = value; });

  const idx = DAYS.indexOf(nzParts.weekday);
  if (idx !== -1) convDay.value = idx;

  const h = parseInt(nzParts.hour, 10) % 24;
  convTime.value = `${pad(h)}:${nzParts.minute}`;
})();

function formatResult(h12, min, ampm) {
  return `<span class="hours">${pad(h12)}</span>`
       + `<span class="colon">:</span>`
       + `<span class="mins">${pad(min)}</span>`
       + `<span class="ampm">${ampm}</span>`;
}

function runConverter() {
  const [hStr, mStr] = convTime.value.split(':');
  const inputHour   = parseInt(hStr, 10);
  const inputMin    = parseInt(mStr, 10);
  const inputDayIdx = parseInt(convDay.value, 10);

  if (isNaN(inputHour) || isNaN(inputMin)) return;

  // Build a reference Date that represents the chosen NZ local time.
  // Strategy: find the next occurrence of inputDayIdx in NZ, then
  // set hours/minutes in NZ by constructing via UTC offset.
  const now = new Date();

  // Get current NZ date components
  const nzFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  const nzParts = {};
  nzFmt.formatToParts(now).forEach(({ type, value }) => { nzParts[type] = value; });

  const nzYear  = parseInt(nzParts.year, 10);
  const nzMonth = parseInt(nzParts.month, 10) - 1;
  const nzDay2  = parseInt(nzParts.day, 10);

  // Build a Date string as if it's Auckland local time, then convert
  // We use a trick: create an ISO string, interpret it as UTC to get a
  // reference, then shift by the NZ offset to get the true UTC instant.
  const nzOffsetMin = (() => {
    const utcMs = Date.UTC(nzYear, nzMonth, nzDay2,
      parseInt(nzParts.hour, 10), parseInt(nzParts.minute, 10), parseInt(nzParts.second, 10));
    return Math.round((now.getTime() - utcMs) / 60000);
  })();

  // Determine which calendar date in NZ corresponds to inputDayIdx
  // Start from current NZ date and walk forward up to 7 days
  let candidateDate = new Date(Date.UTC(nzYear, nzMonth, nzDay2, inputHour, inputMin, 0) - nzOffsetMin * 60000);

  // Get the day-of-week for that candidate in NZ
  const getDayNZ = (d) => parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Pacific/Auckland', weekday: 'short' })
      .format(d)
      .replace(/Sun/,'0').replace(/Mon/,'1').replace(/Tue/,'2').replace(/Wed/,'3')
      .replace(/Thu/,'4').replace(/Fri/,'5').replace(/Sat/,'6'), 10
  );

  // Simpler: get numeric day via a parts approach
  const getDayNumNZ = (d) => {
    const p = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Pacific/Auckland', weekday: 'long',
    }).format(d);
    return DAYS.indexOf(p);
  };

  let currentDayNZ = getDayNumNZ(candidateDate);
  let diff = (inputDayIdx - currentDayNZ + 7) % 7;
  // shift candidate by diff days
  candidateDate = new Date(candidateDate.getTime() + diff * 86400000);

  // candidateDate is now a UTC instant representing NZ inputDayIdx at inputHour:inputMin
  // Format the NZ source display
  const nzH12   = inputHour % 12 || 12;
  const nzAmPm  = inputHour < 12 ? 'AM' : 'PM';
  const nzDayName = DAYS[inputDayIdx].toUpperCase();

  // Build result rows
  let html = `
    <div class="result-row nz-row">
      <div class="result-zone">NZST / NZDT</div>
      <div class="result-city">New Zealand</div>
      <div class="result-time">${formatResult(nzH12, inputMin, nzAmPm)}</div>
      <div class="result-day">${nzDayName}</div>
    </div>
  `;

  CONV_ZONES.forEach(zone => {
    const p = getPartsIn(zone.tz, candidateDate);
    const dayName = new Intl.DateTimeFormat('en-US', {
      timeZone: zone.tz, weekday: 'long',
    }).format(candidateDate).toUpperCase();

    html += `
      <div class="result-row">
        <div class="result-zone">${zone.label}</div>
        <div class="result-city">${zone.city}</div>
        <div class="result-time">${formatResult(p.hour12, parseInt(p.minute, 10), p.ampm)}</div>
        <div class="result-day">${dayName}</div>
      </div>
    `;
  });

  convResults.innerHTML = html;
}

convDay.addEventListener('change', runConverter);
convTime.addEventListener('input',  runConverter);
convTime.addEventListener('change', runConverter);

// Run once on load
runConverter();

// ─── FX Rate ───────────────────────────────────────────────────────────
const USD_AMOUNTS = [1.00, 2.50, 12.50];
const FX_IDS      = ['fx-a', 'fx-b', 'fx-c'];

function fmtUSD(amount) {
  const str   = amount.toFixed(2);
  const [d,c] = str.split('.');
  return `$${d}<span class="fx-cents">.${c}</span>`;
}

let currentRate = null; // USD → NZD rate

function fmtNZD(amount) {
  const str   = amount.toFixed(2);
  const [d,c] = str.split('.');
  return `NZ$${d}<span class="fx-cents">.${c}</span>`;
}

function updateCustom() {
  if (!currentRate) return;
  const raw = parseFloat(document.getElementById('fx-custom-input').value);
  const dir = document.getElementById('fx-custom-dir').value;
  const result = document.getElementById('fx-custom-result');

  if (isNaN(raw) || raw === 0) { result.innerHTML = '—'; return; }

  if (dir === 'usd') {
    result.innerHTML = fmtNZD(raw * currentRate);
  } else {
    result.innerHTML = fmtUSD(raw / currentRate);
  }
}

async function fetchFX() {
  try {
    const res  = await fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=NZD');
    const data = await res.json();
    const rate = data.rates.NZD;
    currentRate = rate;

    document.getElementById('fx-rate').innerHTML =
      `1 USD = <span>NZ$${rate.toFixed(4)}</span>`;

    USD_AMOUNTS.forEach((usd, i) => {
      document.getElementById(FX_IDS[i]).innerHTML = fmtNZD(usd * rate);
    });

    const now = new Date();
    document.getElementById('fx-updated').textContent =
      `UPDATED  ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    updateCustom();

  } catch (e) {
    document.getElementById('fx-rate').textContent = 'unavailable';
  }
}

fetchFX();
setInterval(fetchFX, 60 * 1000);

document.getElementById('fx-custom-input').addEventListener('input', updateCustom);
document.getElementById('fx-custom-dir').addEventListener('change', updateCustom);

// ─── Converter toggle ──────────────────────────────────────────────────
document.getElementById('converter-toggle').addEventListener('click', () => {
  document.getElementById('converter').classList.toggle('collapsed');
});
