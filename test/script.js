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

  if (who) {
    subParts.push(`<span class="tag">With</span> ${who}`);
  }

  if (note) {
    subParts.push(`<span class="tag">Memory</span> ${note}`);
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
  const isBeen = mode === "been";
  const data = isBeen ? BEEN_PLACES : WISH_PLACES;

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
