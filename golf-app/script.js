// script.js

// DEFINE YOUR YARDAGES HERE
// Change numbers only – layout auto-updates

const CLUB_YARDAGES = [
  { club: "Driver", distance: 0 },
  { club: "3 Wood", distance: 0 },
  { club: "5 Wood", distance: 0 },
  { club: "4 hybrid", distance: 0 },
  { club: "7 hybrid", distance: 170 },
  { club: "4 Iron", distance: 170 },
  { club: "5 Iron", distance: 160 },
  { club: "6 Iron", distance: 150 },
  { club: "7 Iron", distance: 140 },
  { club: "8 Iron", distance: 130 },
  { club: "9 Iron", distance: 120 },
  { club: "48°", distance: 110 },
  { club: "52°", distance: 100 },
  { club: "56°", distance: 90 },
  { club: "60°", distance: 80 }
];

// CHANGE UNIT IF NEEDED ("yds" or "m")
const UNIT = "m";

// --------------------
// PAGE TOGGLE
// --------------------

const tabDistances = document.getElementById("tabDistances");
const tabThoughts = document.getElementById("tabThoughts");
const pageDistances = document.getElementById("pageDistances");
const pageThoughts = document.getElementById("pageThoughts");

function setActivePage(page) {
  const isDistances = page === "distances";

  tabDistances.classList.toggle("active", isDistances);
  tabThoughts.classList.toggle("active", !isDistances);

  pageDistances.classList.toggle("hidden", !isDistances);
  pageThoughts.classList.toggle("hidden", isDistances);
}

tabDistances.addEventListener("click", () => setActivePage("distances"));
tabThoughts.addEventListener("click", () => setActivePage("thoughts"));

// Default on distances
setActivePage("distances");

// --------------------
// DISTANCES RENDER
// --------------------

const clubsContainer = document.getElementById("clubs");

function renderDistances() {
  clubsContainer.innerHTML = "";

  CLUB_YARDAGES.forEach(item => {
    const row = document.createElement("div");
    row.className = "club";

    const name = document.createElement("div");
    name.className = "club-name";
    name.textContent = item.club;

    const distance = document.createElement("div");
    distance.className = "distance";
    distance.innerHTML = `${item.distance}<span class="unit">${UNIT}</span>`;

    row.appendChild(name);
    row.appendChild(distance);
    clubsContainer.appendChild(row);

    // ADD CLICK TO DELETE
    row.addEventListener("click", () => {
      row.remove();
    });
  });
}

renderDistances();

// --------------------
// SWING THOUGHTS
// --------------------

const STORAGE_KEY = "swing_thoughts";
const thoughtsList = document.getElementById("thoughtsList");
const thoughtInput = document.getElementById("thoughtInput");
const addThoughtBtn = document.getElementById("addThought");
const resetBtn = document.getElementById("resetThoughts");

const DEFAULT_THOUGHTS = [
  "Body -> arms -> body -> arms",
  "80% tempo",
  "Irons - strike down and through",
  "Make your next shot easy",
  "GIOTG",
  "Chipping - keep it low get the dirty hoes",
  "Putting - distance over line, 87→88"
];

function loadThoughts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_THOUGHTS];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...DEFAULT_THOUGHTS];
    return parsed.filter(t => typeof t === "string" && t.trim().length > 0);
  } catch {
    return [...DEFAULT_THOUGHTS];
  }
}

function saveThoughts(thoughts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughts));
  } catch {
    // ignore
  }
}

let swingThoughts = loadThoughts();

function renderThoughts() {
  thoughtsList.innerHTML = "";

  swingThoughts.forEach((text, idx) => {
    const row = document.createElement("div");
    row.className = "thought";

    const t = document.createElement("div");
    t.className = "thought-text";
    t.textContent = text;

    const pill = document.createElement("div");
    pill.className = "pill";
    pill.textContent = "Tap to delete";

    row.appendChild(t);
    row.appendChild(pill);
    thoughtsList.appendChild(row);

    row.addEventListener("click", () => {
      swingThoughts.splice(idx, 1);
      saveThoughts(swingThoughts);
      renderThoughts();
    });
  });
}

function addThought() {
  const value = (thoughtInput.value || "").trim();
  if (!value) return;

  swingThoughts.unshift(value);
  saveThoughts(swingThoughts);
  renderThoughts();

  thoughtInput.value = "";
  thoughtInput.focus();
}

addThoughtBtn.addEventListener("click", addThought);

thoughtInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addThought();
});

// --------------------
// RESET LOGIC (NEW)
// --------------------

resetBtn.onclick = () => {
  localStorage.removeItem(STORAGE_KEY);
  swingThoughts = [...DEFAULT_THOUGHTS];
  saveThoughts(swingThoughts);
  renderThoughts();
};

renderThoughts();
