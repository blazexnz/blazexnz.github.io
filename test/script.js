// Bucket List App
// Edit the two arrays below. No in-browser adding needed.

// 1) PLACES YOU'VE BEEN
const BEEN_PLACES = [
  {
    date: "2023 Dec",
    countryEmoji: "🇦🇺",
    place: "Gold Coast",
    icon: "✈️",
    who: "RC & Family",
    note: "Sun, beaches, and that first holiday buzz."
  },
  {
    date: "2024 Apr",
    countryEmoji: "🇯🇵",
    place: "Tokyo",
    icon: "🚇",
    who: "RC",
    note: "Late-night ramen + endless neon."
  },
  {
    date: "2025 Sep",
    countryEmoji: "🇻🇳",
    place: "Hội An",
    icon: "🏮",
    who: "RC & Sarah",
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

// NEW: per-mode sort order (persisted). true = newest first, false = oldest first
const SORT_KEY_BEEN = "bucket_list_sort_been";
const SORT_KEY_WISH = "bucket_list_sort_wish";

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

/**
 * NEW: Parse "YYYY Mon" (e.g., "2023 Dec") to a sortable number.
 * Returns -Infinity if date missing/invalid (so those drift to the end).
 */
function parseYearMonth(dateStr) {
  if (!dateStr) return Number.NEGATIVE_INFINITY;

  const parts = String(dateStr).trim().split(/\s+/);
  if (parts.length < 2) return Number.NEGATIVE_INFINITY;

  const year = parseInt(parts[0], 10);
  const mon = parts[1].toLowerCase();

  const months = {
    jan: 1, january: 1,
    feb: 2, february: 2,
    mar: 3, march: 3,
    apr: 4, april: 4,
    may: 5,
    jun: 6, june: 6,
    jul: 7, july: 7,
    aug: 8, august: 8,
    sep: 9, sept: 9, september: 9,
    oct: 10, october: 10,
    nov: 11, november: 11,
    dec: 12, december: 12
  };

  const monthNum = months[mon];
  if (!Number.isFinite(year) || !monthNum) return Number.NEGATIVE_INFINITY;

  // 2023-12 => 202312 (sortable as number)
  return year * 100 + monthNum;
}

// NEW: read/write sort flag
function getSortNewestFirst(mode) {
  const key = mode === "been" ? SORT_KEY_BEEN : SORT_KEY_WISH;
  const saved = localStorage.getItem(key);
  // default: BEEN newest-first, WISH as-entered (oldest-first)
  if (saved === null) return mode === "been";
  return saved === "true";
}

function setSortNewestFirst(mode, value) {
  const key = mode === "been" ? SORT_KEY_BEEN : SORT_KEY_WISH;
  localStorage.setItem(key, String(value));
}

// NEW: ensure a simple sort toggle exists in the header pill row (no HTML edits needed)
function ensureSortButton() {
  if (document.getElementById("sortToggle")) return;

  const metaRow = document.querySelector(".metaRow");
  if (!metaRow) return;

  const btn = document.createElement("button");
  btn.id = "sortToggle";
  btn.type = "button";
  btn.style.appearance = "none";
  btn.style.border = "1px solid var(--line)";
  btn.style.background = "rgba(255,255,255,0.70)";
  btn.style.borderRadius = "999px";
  btn.style.padding = "8px 10px";
  btn.style.boxShadow = "0 6px 16px rgba(20, 33, 61, 0.06)";
  btn.style.backdropFilter = "blur(10px)";
  btn.style.webkitBackdropFilter = "blur(10px)";
  btn.style.color = "var(--muted)";
  btn.style.fontWeight = "650";
  btn.style.fontSize = "13px";
  btn.style.cursor = "pointer";
  btn.style.touchAction = "manipulation"; // iPhone: prevent double tap zoom
  btn.style.webkitTapHighlightColor = "transparent";
  btn.style.userSelect = "none";

  // Hover only for mouse/trackpad (avoid sticky hover on iPhone)
  btn.addEventListener("touchstart", () => {}, { passive: true });

  btn.addEventListener("click", () => {
    const mode = getInitialMode();
    const current = getSortNewestFirst(mode);
    setSortNewestFirst(mode, !current);
    render(mode);
  });

  metaRow.appendChild(btn);
}

function updateSortButton(mode) {
  const btn = document.getElementById("sortToggle");
  if (!btn) return;

  const newestFirst = getSortNewestFirst(mode);

  // Simple label:
  // BEEN: "Newest first" <-> "Oldest first"
  // WISH: "Reverse" <-> "Normal" (since many wish items won't have dates)
  if (mode === "been") {
    btn.textContent = newestFirst ? "↕️ Newest first" : "↕️ Oldest first";
  } else {
    btn.textContent = newestFirst ? "↕️ Reverse" : "↕️ Normal";
  }
}

function buildCardBeen(item, index) {
  const date = item.date ? escapeHtml(item.date) : "";
  const country = item.countryEmoji ? escapeHtml(item.countryEmoji) : "";
  const place = item.place ? escapeHtml(item.place) : "";
  const icon = item.icon ? escapeHtml(item.icon) : "📍";
  const note = item.note ? escapeHtml(item.note) : "";
  const who = item.who ? escapeHtml(item.who) : "";

  const lineTop = `
    <div class="line1">
      <span class="when"><span class="pin" aria-hidden="true">📍</span>${date}</span>
      <span class="emoji" aria-hidden="true">${country}</span>
      <span class="emoji" aria-hidden="true">${icon}</span>
      <p class="place" title="${place}">${place}</p>
    </div>
  `;

  let subParts = [];

  if (note) {
    subParts.push(`<span class="tag">Memory</span> ${note}`);
  }

  if (who) {
    subParts.push(`<span class="tag">With</span> ${who}`);
  }

  if (!who && !note) {
    subParts.push(`<span class="tag">Visited</span> Added in code`);
  }

  const sub = `<p class="sub">${subParts.join(" ")}</p>`;

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
      <span class="when"><span class="pin" aria-hidden="true">✨</span></span>
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
  ensureSortButton();
  updateSortButton(mode);

  const isBeen = mode === "been";
  const source = isBeen ? BEEN_PLACES : WISH_PLACES;

  // Copy array so we don't mutate your original ordering
  let data = source.slice();

  // NEW: sorting / reversing
  const newestFirst = getSortNewestFirst(mode);

  if (isBeen) {
    // Sort by parsed year+month, then reverse if needed
    data.sort((a, b) => parseYearMonth(a.date) - parseYearMonth(b.date));
    if (newestFirst) data.reverse();
  } else {
    // Wish list might not have dates — by default it's "as entered"
    // Toggle simply reverses the list order
    if (newestFirst) data.reverse();
  }

  els.btnBeen.setAttribute("aria-pressed", String(isBeen));
  els.btnWish.setAttribute("aria-pressed", String(!isBeen));

  els.footerMode.textContent = `Mode: ${isBeen ? "Been" : "Wish"}`;
  els.secondaryText.textContent = isBeen
    ? "Scroll for a walk down memory lane"
    : "A gentle nudge toward your next adventure";

  const count = data.length;
  els.summaryText.textContent = `${count} place${count === 1 ? "" : "s"}`;

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
  els.btnBeen.addEventListener("click", () => setMode("been"));
  els.btnWish.addEventListener("click", () => setMode("wish"));

  els.btnBeen.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") setMode("been");
  });
  els.btnWish.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") setMode("wish");
  });
}

wireEvents();
render(getInitialMode());
