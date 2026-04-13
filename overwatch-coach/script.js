const defaultThoughts = {
  tank: [
    "Track enemy cooldowns",
    "Hold corners properly",
    "Watch healer LOS"
  ],
  damage: [
    "Take off angles",
    "Confirm kills",
    "Track enemy ult economy"
  ],
  support: [
    "Position safely",
    "Watch flank routes",
    "Save cooldowns for key moments"
  ]
};

function loadRole(role) {
  const saved = JSON.parse(localStorage.getItem(role)) || [...defaultThoughts[role]];
  renderList(role, saved);
}

function renderList(role, items) {
  const list = document.getElementById(`${role}List`);
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.draggable = true;
    li.dataset.index = index;

    li.addEventListener("click", () => {
      items.splice(index, 1);
      localStorage.setItem(role, JSON.stringify(items));
      renderList(role, items);
    });

    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");

      const newOrder = [...list.children].map(child => child.textContent);
      localStorage.setItem(role, JSON.stringify(newOrder));
      renderList(role, newOrder);
    });

    list.appendChild(li);
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(list, e.clientY);

    if (afterElement == null) {
      list.appendChild(dragging);
    } else {
      list.insertBefore(dragging, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function addThought(role) {
  const input = document.getElementById(`${role}Input`);
  const value = input.value.trim();

  if (!value) return;

  const items = JSON.parse(localStorage.getItem(role)) || [...defaultThoughts[role]];
  items.push(value);

  localStorage.setItem(role, JSON.stringify(items));
  renderList(role, items);

  input.value = "";
}

function resetThoughts(role) {
  const resetList = [...defaultThoughts[role]];
  localStorage.setItem(role, JSON.stringify(resetList));
  renderList(role, resetList);
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.role).classList.add("active");
  });
});

["tank", "damage", "support"].forEach(role => {
  const input = document.getElementById(`${role}Input`);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addThought(role);
    }
  });
});

loadRole("tank");
loadRole("damage");
loadRole("support");
