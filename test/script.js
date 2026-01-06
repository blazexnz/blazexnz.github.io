// DEFINE YOUR YARDAGES HERE
const DEFAULT_CLUBS = [
  { club: "Driver", distance: 245 },
  { club: "3 Wood", distance: 225 },
  { club: "5 Wood", distance: 210 },
  { club: "Hybrid", distance: 195 },
  { club: "4 Iron", distance: 185 },
  { club: "5 Iron", distance: 175 },
  { club: "6 Iron", distance: 165 },
  { club: "7 Iron", distance: 155 },
  { club: "8 Iron", distance: 145 },
  { club: "9 Iron", distance: 135 },
  { club: "Pitching Wedge", distance: 125 },
  { club: "Gap Wedge", distance: 110 },
  { club: "Sand Wedge", distance: 95 },
  { club: "Lob Wedge", distance: 80 }
];

const UNIT = "yds";
const STORAGE_KEY = "golfClubOrder";

let clubs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_CLUBS.slice();

const container = document.getElementById("clubs");

function renderClubs() {
  container.innerHTML = "";
  clubs.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "club";
    row.draggable = true;
    row.dataset.index = index;

    const name = document.createElement("div");
    name.className = "club-name";
    name.textContent = item.club;

    const distance = document.createElement("div");
    distance.className = "distance";
    distance.innerHTML = `${item.distance}<span class="unit">${UNIT}</span>`;

    row.appendChild(name);
    row.appendChild(distance);
    container.appendChild(row);

    // Drag events
    row.addEventListener("dragstart", (e) => {
      row.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index);
    });

    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
    });

    row.addEventListener("dragover", (e) => e.preventDefault());

    row.addEventListener("drop", (e) => {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
      const toIndex = index;
      if (fromIndex === toIndex) return;

      // Reorder array
      const moved = clubs.splice(fromIndex, 1)[0];
      clubs.splice(toIndex, 0, moved);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
      renderClubs();
    });
  });
}

// Initial render
renderClubs();
