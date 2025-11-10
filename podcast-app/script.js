// ================================
// Podcast App Script
// ================================

// 🎵 Define your local audio folder and file list here
const audioFolder = "./audio-assets/"; // folder next to index.html
let tracks = [
  { name: "Master Small Talk - The Cheat Sheet", url: audioFolder + "Master Small Talk - The Cheat Sheet.m4a" },
  { name: "Moira and Zen Gold-Plat to Masters Guide", url: audioFolder + "Moira and Zen Gold-Plat to Masters Guide.m4a" },
  { name: "Moira climb to masters", url: audioFolder + "Moira climb to masters.m4a" },
  { name: "Overwatch 2 - Blaze's Notes", url: audioFolder + "Overwatch 2 - Blaze's Notes.m4a" },
  { name: "Overwatch 2 Playbook - Damage Version", url: audioFolder + "Overwatch 2 Playbook - Damage Version.m4a" },
  { name: "Overwatch 2 Playbook - Pregame", url: audioFolder + "Overwatch 2 Playbook - Pregame.m4a" },
  { name: "Overwatch 2 Playbook - Standard", url: audioFolder + "Overwatch 2 Playbook - Standard.m4a" },
  { name: "Overwatch 2 Playbook - Support Version", url: audioFolder + "Overwatch 2 Playbook - Support Version.m4a" },
  { name: "The Golfers Playbook - long", url: audioFolder + "The Golfers Playbook - long.m4a" },
  { name: "The Golfers Playbook - normal", url: audioFolder + "The Golfers Playbook - normal.m4a" },
  { name: "The Golfers Playbook - short", url: audioFolder + "The Golfers Playbook - short.m4a" },
  { name: "Zen climb to masters", url: audioFolder + "Zen climb to masters.m4a" }
];

// Player State
let currentIndex = 0;
const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const filePicker = document.getElementById("filePicker");

// ================================
// BUILD PLAYLIST UI
// ================================
function rebuildPlaylist() {
  playlistEl.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => loadTrack(index, true));
    playlistEl.appendChild(li);
  });
  highlightActiveTrack();
}

function highlightActiveTrack() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, i) => li.classList.toggle("active", i === currentIndex));
}

function loadTrack(index, playImmediately = false) {
  if (index < 0 || index >= tracks.length) return;
  currentIndex = index;
  audio.src = tracks[index].url;
  highlightActiveTrack();
  if (playImmediately) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    playBtn.textContent = "▶️";
  }
}

// ================================
// CONTROLS
// ================================
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex, true);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex, true);
});

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex, true);
});

// ================================
// LOCAL FILE PICKER + DRAG/DROP SUPPORT
// ================================
filePicker.addEventListener("change", (e) => {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith("audio/"));
  const localTracks = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
  tracks = localTracks;
  rebuildPlaylist();
  loadTrack(0, true);
});

document.body.addEventListener("dragover", e => e.preventDefault());
document.body.addEventListener("drop", e => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("audio/"));
  if (!files.length) return;
  const localTracks = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
  tracks = localTracks;
  rebuildPlaylist();
  loadTrack(0, true);
});

// ================================
// INIT
// ================================
window.addEventListener("DOMContentLoaded", () => {
  rebuildPlaylist();
  if (tracks.length > 0) {
    loadTrack(0, false); // load but do NOT autoplay
  }
});

