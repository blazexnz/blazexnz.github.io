let currentFontSize = 24;
let itemsData = [];
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with HTML content and <strong> actors
itemsData = [
  {
    name: "Charlier Cut",
    setup: { title: "The Setup", content: "<p>Hold the deck in mechanics grip before starting the cut.</p>" },
    method: {
      title: "The Method",
      content: `
        <ol>
          <li><strong>Dealer:</strong> Shuffles the deck.</li>
          <li><strong>Spectator:</strong> Selects a card.</li>
          <li><strong>Dealer:</strong> Cuts the deck.</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>This classic cardistry move develops dexterity and finger control. Practice slowly at first.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/charlier-cut" target="_blank">Charlier Cut Video</a>' },
    tags: ["tricks"]
  },
  {
    name: "Sybil Cut",
    text: { title: "Text", content: "<p>The Sybil Cut is a complex flourish involving multiple packets of cards being manipulated in the hands.</p>" },
    notes: { title: "Notes", content: "<p>It’s a foundational multi-packet flourish that opens doors to more advanced cardistry.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/sybil-cut" target="_blank">Sybil Cut Video</a>' },
    tags: ["tricks"]
  },
  {
    name: "Poker",
    text: { title: "Text", content: "<p>Poker is a family of gambling card games that combines strategy, skill, and luck.</p>" },
    notes: { title: "Notes", content: "<p>Popular variations include Texas Hold'em and Omaha. Understanding hand rankings is key.</p>" },
    tags: ["games"]
  },
  {
    name: "Magic Poker Trick",
    text: { title: "Text", content: "<p>A simple trick using poker cards to amaze your friends.</p>" },
    notes: { title: "Notes", content: "<p>This trick is both a game and a flourish, demonstrating sleight of hand.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/magic-poker" target="_blank">Magic Trick Video</a>' },
    tags: ["tricks", "games"]
  },
  {
    name: "Single Deck Shuffle - Lite Version",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Spread & wash the deck (optional).</li>
          <li>Riffle shuffle.</li>
          <li>Riffle shuffle again.</li>
          <li>Strip shuffle into 4 strips forming 5 packets.</li>
          <li>Riffle shuffle.</li>
          <li>Cut the deck.</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>Cutting a single deck should be between at least 10 cards on the top and 10 on the bottom.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/single-deck-lite" target="_blank">Single Deck Shuffle Tutorial</a>' },
    tags: ["shuffles"]
  },
  {
    name: "Single Deck Shuffle - Full Version",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Riffle shuffle.</li>
          <li>Riffle shuffle again.</li>
          <li>Strip shuffle into 6 strips forming 5 packets.</li>
          <li>Box shuffle: take 1/3 of the bottom, rotate 180°, and place on top.</li>
          <li>Riffle shuffle.</li>
          <li>Cut the deck (in between 10 cards).</li>
          <li>Burn the first card (for blackjack, baccarat, etc.).</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>Cutting a single deck should be between at least 10 cards on the top and 10 on the bottom.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/single-deck-full" target="_blank">Single Deck Shuffle Full Version Video</a>' },
    tags: ["shuffles"]
  },
  {
    name: "Double Deck Shuffle",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Riffle shuffle.</li>
          <li>Riffle shuffle again.</li>
          <li>Strip shuffle into 6 strips forming 5 packets.</li>
          <li>Box shuffle: move 1/3 from top to bottom.</li>
          <li>Riffle shuffle.</li>
          <li>Box shuffle: move 1/3 from bottom to top.</li>
          <li>Riffle shuffle.</li>
          <li>Cut the deck (in between 15 cards).</li>
          <li>Burn the first card (for blackjack, baccarat, etc.).</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>When cutting a double deck, place the cut card facing down, have them cut between the first 15 and last 15 cards, then place the bottom portion on top so the cut card is now on the bottom.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/double-deck" target="_blank">Double Deck Shuffle Video</a>' },
    tags: ["shuffles"]
  },
  {
    name: "4/6/8 Deck Shoe Shuffle",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Break the decks into 2 equal stacks.</li>
          <li>Take 1/4 of each stack, then riffle-strip-riffle.</li>
          <li>Place the working deck in the centre.</li>
          <li>Take 1/4 from working deck & 1/4 from left stack, riffle-strip-riffle, place on working stack.</li>
          <li>Take 1/4 from working deck & 1/4 from right stack, riffle-strip-riffle, place on working stack.</li>
          <li>Repeat until all cards are shuffled.</li>
          <li>Break working deck into 2 equal stacks.</li>
          <li>Take 1/4 from each stack, riffle leaving cards laced, roll stack, tidy against shoe.</li>
          <li>Cuts the cards (in between 1–1.5 decks).</li>
          <li>Put the bottom cut on top so the cut card is on the bottom.</li>
          <li>Put another cut card as an indicator for the next shuffle.</li>
          <li>Place in the shoe and burn the first card (blackjack, baccarat, etc.).</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>When cutting a 4, 6, or 8 deck shoe, roll the deck on its side, place it against the shoe, have the player cut between the first and last deck, then return the top portion to the bottom so the cut card is on the bottom. Place a second cut card 1–1.5 decks from the bottom to indicate when to start the next shuffle.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.example.com/shoe-shuffle" target="_blank">Shoe Shuffle Tutorial</a>' },
    tags: ["shuffles"]
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

  // ===== Heading above content boxes =====
  const heading = document.createElement('h2');
  heading.id = "itemTitleHeading";
  heading.textContent = item.name;
  container.appendChild(heading);

  Object.keys(item).forEach(key => {
    if (key === 'name' || key === 'tags') return; // skip non-content fields

    const section = item[key];
    if (!section || !section.content) return;

    const sectionDiv = document.createElement('div');

    // Style boxes
    if (key === 'text') {
      sectionDiv.className = 'item';
    } else if (key === 'notes') {
      sectionDiv.className = 'notes';
    } else if (key === 'reference') {
      sectionDiv.className = 'reference';
    } else {
      sectionDiv.className = 'item';
    }

    sectionDiv.style.fontSize = currentFontSize + 'px';

    const subHeading = document.createElement('h3');
    subHeading.textContent = section.title || key;
    subHeading.style.marginTop = '4px';
    subHeading.style.marginBottom = '8px';
    sectionDiv.appendChild(subHeading);

    // ===== Render HTML content directly =====
    const content = document.createElement('div');
    content.innerHTML = section.content;
    sectionDiv.appendChild(content);

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

  // Smooth scroll to content
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
