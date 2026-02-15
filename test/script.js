// Bucket List App
// Edit the two arrays below. No in-browser adding needed.

// 1) PLACES YOU'VE BEEN
// Example format desired: 📍2023 Dec - 🇦🇺 ✈️ Gold Coast
const BEEN_PLACES = [
  {
    // display line: 📍2023 Dec - 🇦🇺 ✈️ Gold Coast
    date: "2023 Dec",
    countryEmoji: "🇦🇺",
    place: "Gold Coast",
    icon: "✈️",        // optional: ✈️ 🚗 🛳️ 🏕️ etc.
    note: "Sun, beaches, and that first holiday buzz." // optional
  },
  {
    date: "2024 Apr",
    countryEmoji: "🇯🇵",
    place: "Tokyo",
    icon: "🚇",
    note: "Late-night ramen + endless neon."
  },
  {
    date: "2025 Sep",
    countryEmoji: "🇻🇳",
    place: "Hội An",
    icon: "🏮",
    note: "Lanterns, riverside walks, and coffee."
  }
];

// 2) WISH LIST (BUCKET LIST) PLACES TO VISIT
const WISH_PLACES = [
  {
    countryEmoji: "🇮🇹",
    place: "Rome",
    icon: "🏛️",
    note: "History, pasta, and long evening strolls."
  },
  {
    countryEmoji: "🇺🇸",
    place: "Yosemite",
    icon: "🏞️",
    note: "Big views, bigger hikes."
  },
  {
    countryEmoji: "🇮🇸",
    place: "Iceland Road Trip",
    icon: "🚗",
    note: "Waterfalls + hot springs."
  }
];

const STORAGE_KEY = "bucket_list_mode"; // "been" | "wish"

const els = {
  btnBeen: document.getElementById("btnBeen"),
  btnWish: document.getElementById("btnWish"),
  list: document.getElementById("list"),
  empty: document.getElementById("empty"),
  summaryText: document.getElementById("summaryText"),
  footerMode: document.getElementById("footerMode"),
  secondaryText: document.getElementById("secondaryText")
};

function getInitialMode() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "wish" ? "wish" : "been";
}

function setMode(mode) {
  localStorage.setItem(STORAGE_KEY, mode);
  render(mode);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildCardBeen(item, index) {
  const date = item.date ? escapeHtml(item.date) : "";
  const country = item.countryEmoji ? escapeHtml(item.countryEmoji) : "";
  const place = item.place ? escapeHtml(item.place) : "";
  const icon = item.icon ? escapeHtml(item.icon) : "📍";
  const note = item.note ? escapeHtml(item.note) : "";

  // Visual line: 📍2023 Dec - 🇦🇺 ✈️ Gold Coast
  const lineTop = `
    <div class="line1">
      <span class="when"><span class="pin" aria-hidden="true">📍</span>${date}</span>
      <span class="tag" aria-hidden="true">-</span>
      <span class="emoji" aria-hidden="true">${country}</span>
      <span class="emoji" aria-hidden="true">${icon}</span>
      <p class="place" title="${place}">${place}</p>
    </div>
  `;

  const sub = note
    ? `<p class="sub"><span class="tag">Memory</span> ${note}</p>`
    : `<p class="sub"><span class="tag">Visited</span> Added in code</p>`;

  return `
    <article class="card" data-index="${index}">
      <div class="left">
        ${lineTop}
        ${sub}
      </div>
      <div class="right">
        <div class="badge">#${index + 1}</div>
      </div>
    </article>
  `;
}

function buildCardWish(item, index) {
  const country = item.countryEmoji ? escapeHtml(item.countryEmoji) : "🌍";
  const place = item.place ? escapeHtml(item.place) : "";
  const icon = item.icon ? escapeHtml(item.icon) : "✨";
  const note = item.note ? escapeHtml(item.note) : "";

  const lineTop = `
    <div class="line1">
      <span class="when"><span class="pin" aria-hidden="true">✨</span>Bucket</span>
      <span class="tag" aria-hidden="true">-</span>
      <span class="emoji" aria-hidden="true">${country}</span>
      <span class="emoji" aria-hidden="true">${icon}</span>
      <p class="place" title="${place}">${place}</p>
    </div>
  `;

  const sub = note
    ? `<p class="sub"><span class="tag">Why</span> ${note}</p>`
    : `<p class="sub"><span class="tag">Next</span> Added in code</p>`;

  return `
    <article class="card" data-index="${index}">
      <div class="left">
        ${lineTop}
        ${sub}
      </div>
      <div class="right">
        <div class="badge">#${index + 1}</div>
      </div>
    </article>
  `;
}

function render(mode) {
  const isBeen = mode === "been";
  const data = isBeen ? BEEN_PLACES : WISH_PLACES;

  // Toggle button states
  els.btnBeen.setAttribute("aria-pressed", String(isBeen));
  els.btnWish.setAttribute("aria-pressed", String(!isBeen));

  // Header/labels
  els.footerMode.textContent = `Mode: ${isBeen ? "Been" : "Wish"}`;
  els.secondaryText.textContent = isBeen
    ? "Scroll for that achievement feeling"
    : "A gentle nudge toward your next adventure";

  // Summary
  const count = data.length;
  els.summaryText.textContent = `${count} place${count === 1 ? "" : "s"}`;

  // List
  if (!data || data.length === 0) {
    els.list.innerHTML = "";
    els.empty.style.display = "block";
    els.empty.textContent = isBeen
      ? "No visited places yet. Add some entries to BEEN_PLACES in script.js."
      : "No wish list places yet. Add some entries to WISH_PLACES in script.js.";
    return;
  }

  els.empty.style.display = "none";
  els.list.innerHTML = data
    .map((item, idx) => (isBeen ? buildCardBeen(item, idx) : buildCardWish(item, idx)))
    .join("");
}

function wireEvents() {
  // Click + touch (buttons already have touch-action: manipulation in CSS)
  els.btnBeen.addEventListener("click", () => setMode("been"));
  els.btnWish.addEventListener("click", () => setMode("wish"));

  // Keyboard accessibility
  els.btnBeen.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") setMode("been");
  });
  els.btnWish.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") setMode("wish");
  });
}

// Init
wireEvents();
render(getInitialMode());
