// DEFINE YOUR YARDAGES HERE
// Change numbers only – layout auto-updates

const CLUB_YARDAGES = [
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
