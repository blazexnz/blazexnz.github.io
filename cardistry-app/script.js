let currentFontSize = 24;
let itemsData = [];
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with multiple tags
itemsData = [
  {
    name: "Charlier Cut",
    setup: { title: "The Setup", content: "Hold the deck in mechanics grip before starting the cut." },
    method: {
      title: "The Method",
      content: [
        { actor: "Dealer", text: "Shuffles the deck." },
        { actor: "Spectator", text: "Selects a card." },
        { actor: "Dealer", text: "Cuts the deck." }
      ]
    },
    notes: { title: "Notes", content: "This classic cardistry move develops dexterity and finger control. Practice slowly at first." },
    reference: { title: "Reference", text: "Charlier Cut Video", url: "https://www.example.com/charlier-cut" },
    tags: ["tricks"]
  },
  {
    name: "Sybil Cut",
    text: { title: "Text", content: "The Sybil Cut is a complex flourish involving multiple packets of cards being manipulated in the hands." },
    notes: { title: "Notes", content: "It’s a foundational multi-packet flourish that opens doors to more advanced cardistry." },
    reference: { title: "Reference", text: "Sybil Cut Video", url: "https://www.example.com/sybil-cut" },
    tags: ["tricks"]
  },
  {
    name: "Poker",
    text: { title: "Text", content: "Poker is a family of gambling card games that combines strategy, skill, and luck." },
    notes: { title: "Notes", content: "Popular variations include Texas Hold'em and Omaha. Understanding hand rankings is key." },
    tags: ["games"]
  },
  {
    name: "Magic Poker Trick",
    text: { title: "Text", content: "A simple trick using poker cards to amaze your friends." },
    notes: { title: "Notes", content: "This trick is both a game and a flourish, demonstrating sleight of hand." },
    reference: { title: "Reference", text: "Magic Trick Video", url: "https://www.example.com/magic-poker" },
    tags: ["tricks", "games"]
  }
];

// Apply filter based on tags
function applyFilter(filter) {
  currentFilter = filter;
  const filteredItems = (filter === "all")
    ? itemsData
    : itemsData.filter(item => item.tags.includes(filter));

  populateItemList(filteredItems);
  document.getElementById('items').innerHTML = '';
}

// Populate item list buttons
function populateItemList(list) {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = '';

  let maxWidth = 0;
  const tempSpan = document.createElement('span');
  document.body.appendChild(tempSpan);
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.fontSize = '1rem';

  list.forEach(item => {
    tempSpan.textContent = item.name;
    maxWidth = Math.max(maxWidth, tempSpan.offsetWidth);
  });
  document.body.removeChild(tempSpan);

  list.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item-button';
    div.style.width = maxWidth + 40 + 'px';
    div.textContent = item.name;
    div.addEventListener('click', () => {
      currentIndex = index;
      displayItem(list[index], list);
    });
    itemList.appendChild(div);
  });
}

// Display a single item
function displayItem(item, list) {
  const container = document.getElementById('items');
  container.innerHTML = '';

  Object.keys(item).forEach(key => {
    if (key === 'name' || key === 'tags') return; // skip non-content fields

    const section = item[key];
    if (!section || (!section.content && !section.url)) return;

    const sectionDiv = document.createElement('div');

    // Style boxes
    if (key === 'text') {
      sectionDiv.className = 'item';
    } else if (key === 'notes') {
      sectionDiv.className = 'notes';
    } else {
      sectionDiv.className = 'item';
    }

    sectionDiv.style.fontSize = currentFontSize + 'px';

    const heading = document.createElement('h3');
    heading.textContent = section.title || key;
    heading.style.marginTop = '4px';
    heading.style.marginBottom = '8px';
    sectionDiv.appendChild(heading);

    // ===== Reference as clickable link =====
    if (key === 'reference' && section.url) {
      const link = document.createElement('a');
      link.href = section.url;
      link.textContent = section.text || section.url;
      link.target = "_blank";
      link.style.color = "#1a0dab";
      sectionDiv.appendChild(link);

    // ===== Method as numbered list =====
    } else if (key === 'method' && Array.isArray(section.content)) {
      const ol = document.createElement('ol');
      section.content.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.actor ? `${step.actor}: ${step.text}` : step.text;
        ol.appendChild(li);
      });
      sectionDiv.appendChild(ol);

    // ===== Regular content =====
    } else {
      const content = document.createElement('p');
      content.textContent = section.content;
      sectionDiv.appendChild(content);
    }

    container.appendChild(sectionDiv);
  });

  // ===== Navigation Buttons =====
  const navDiv = document.createElement('div');
  navDiv.className = 'nav-buttons';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '⬅️ Prev';
  prevBtn.disabled = currentIndex <= 0;
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayItem(list[currentIndex], list);
    }
  });

  const topBtn = document.createElement('button');
  topBtn.textContent = '⬆️ Top';
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next ➡️';
  nextBtn.disabled = currentIndex >= list.length - 1;
  nextBtn.addEventListener('click', () => {
    if (currentIndex < list.length - 1) {
      currentIndex++;
      displayItem(list[currentIndex], list);
    }
  });

  navDiv.appendChild(prevBtn);
  navDiv.appendChild(topBtn);
  navDiv.appendChild(nextBtn);
  container.appendChild(navDiv);

  // Scroll into view
  requestAnimationFrame(() => {
    const yOffset = -20;
    const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}

// Font buttons
document.getElementById('increaseFontBtn').addEventListener('click', () => {
  currentFontSize += 2;
  document.querySelectorAll('.item, .notes').forEach(div => div.style.fontSize = currentFontSize + 'px');
});

document.getElementById('decreaseFontBtn').addEventListener('click', () => {
  currentFontSize = Math.max(12, currentFontSize - 2);
  document.querySelectorAll('.item, .notes').forEach(div => div.style.fontSize = currentFontSize + 'px');
});

// Filter buttons
document.querySelectorAll('#filterBar button').forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);
  });
});

// Initialize app
applyFilter("all");
