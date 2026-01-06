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
  { club: "48° Pitching Wedge", distance: 110 },
  { club: "52° Gap Wedge", distance: 100 },
  { club: "56° Sand Wedge", distance: 90 },
  { club: "60° Lob Wedge", distance: 80 }
];

// CHANGE UNIT IF NEEDED ("yds" or "m")
const UNIT = "m";

const container = document.getElementById("clubs");

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
  container.appendChild(row);

  // ADD CLICK TO DELETE
  row.addEventListener("click", () => {
    row.remove();
  });
});
