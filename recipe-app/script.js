let currentFontSize = 24;
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with HTML content and <strong> actors
const itemsData = [
  {
    name: "Sourdough Bread",
    checklist: {
      title: "Prep Steps",
      content: `
        <ul>
          <li><input type="checkbox"> Preheat oven to 180°C</li>
          <li><input type="checkbox"> Grease baking pan</li>
          <li><input type="checkbox"> Mix dry ingredients</li>
        </ul>
      `
    },
    ingredients: {
      title: "Ingredients",
      content: `
        <ul>
          <li>300g water (warm water for same day)</li>
          <li>100g starter</li>
          <li>430g bread flour</li>
          <li>10g sea salt</li>
        </ul>
        <p><strong>Note:</strong> For same day bake, feed sourdough for 4 hrs. Dough rests for 2 hrs instead of placing in fridge. 
        Total 12 hrs with starter, or if starter fed yesterday then 8 hrs.</p>
      `
    },
    day0: {
      title: "Day 0 – Morning/Night Before",
      content: `
        <ul>
          <li>Take starter out of fridge.</li>
          <li>If it's been in the fridge a while, feed in the morning and again before bed.</li>
          <li>If it's been used regularly, one feed before bed is enough.</li>
          <li>Feed ratio: 50g cold or room temperature water, 50g flour.</li>
          <li>Leave on bench overnight, ready for use tomorrow.</li>
        </ul>
      `
    },
    day1: {
      title: "Day 1 – Dough & Bulk Fermentation",
      content: `
        <ol>
          <li>Mix all ingredients (water, starter, flour, salt) until no dry bits remain. Use a spoon and scraper for clean hands.</li>
          <li>Cover & rest for 30 mins.</li>
          <li><strong>Meanwhile:</strong>
            <ul>
              <li>Set a timer (e.g. 'Sourdough' Apple Shortcut).</li>
              <li>Starter: if prepping another loaf, leave on bench during the day and feed before bed; otherwise, feed 30g water + 30g flour and refrigerate before bed.</li>
            </ul>
          </li>
          <li>Stretch & Fold #1 – twice around the bowl.</li>
          <li>Rest 30 mins.</li>
          <li>Stretch & Fold #2 – once around the bowl (gently).</li>
          <li>Rest 30 mins.</li>
          <li>Stretch & Fold #3 – once around the bowl (gently). Optional: cup & pull into a smooth ball, place back in bowl seam side down.</li>
          <li>Rest for 3.5 hrs.</li>
          <li>Preshape: scoop dough out, place on bench seam side down, cup & pull into a smooth ball. Rest 30 mins.</li>
          <li>Prepare basket with rice flour.</li>
          <li>Dust top of dough with rice flour.</li>
          <li>Final shape: form rectangle, place seam side up in basket.</li>
          <li>Rest 1 hour, then refrigerate (or rest 2 hrs for same-day bake).</li>
          <li>Proof overnight in fridge (uncovered).</li>
        </ol>
      `
    },
    day2: {
      title: "Day 2 – Bake Day",
      content: `
        <ol>
          <li>Preheat oven to 260°C for 30 mins with Dutch oven inside.</li>
          <li>Remove dough from fridge.</li>
          <li>Transfer dough to baking paper and brush off excess flour.</li>
          <li>Score the dough.</li>
          <li>Transfer to Dutch oven (using baking paper as a sling).</li>
          <li>Bake 20 mins with lid on.</li>
          <li>Bake 15–20 mins with lid off.</li>
          <li>Cool for at least 1 hour before slicing.</li>
        </ol>
      `
    }
  },
  {
    name: "Streets and Alleys",
    setup: {
      title: "Setup",
      content: `
        <ul>
          <li>Deal a column of 4 cards face up, leaving the centre column blank for the foundations.</li>
          <li>Deal another 4 cards face up on the right. The entire deck is dealt, leaving rows containing 7 cards on the left and 6 on the right.</li>
          <li>The four aces form the foundations.</li>
        </ul>
      `
    },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>The aces form the foundations. Cards placed on the aces must be of the same suit</li>
          <li>Cards can be placed on the rows, must be in descending order</li>
          <li>More than one card can be moved but must be in descending order</li>
          <li>Suits and colours do not matter on the rows</li>
          <li>Any card value can be placed in a blank spot in the rows</li>
        </ul>
      `
    },
    reference: {
      title: "Reference",
      content: `
        <ul>
          <li><a href="https://bicyclecards.com/how-to-play/streets-and-alleys" target="_blank">Streets and Alleys</a></li>
          <li><a href="https://www.youtube.com/watch?v=XzSWIKbfBSY" target="_blank">How To Play Streets and Alleys</a></li>
          <li><a href="https://www.youtube.com/watch?v=Kv1hMZ73OSA" target="_blank">Streets and Alleys Solitaire - How to Play</a></li>
        </ul>
      `
    },
    players: { title: "Players", content: "1" },
    deck: { title: "Deck", content: "Single deck" },
    notes: { title: "Notes", content: "Warning" },
    test: { title: "test", content: "Single deck" },
    tags: ["games", "single player"]
  },
  {
    name: "Accordion",
    setup: {
      title: "Setup",
      content: `
        <ul>
          <li><strong>Compact:</strong> 6 columns dealt left to right (then keep dealing cards to the right)</li>
          <li><strong>Standard:</strong> deal 52 cards in a straight line</li>
        </ul>
      `
    },
    tdr: { title: "tl;dr", content: "Stack left 1 or 3 steps, matching rank or suit" },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>Objective is to stack all cards to a single pile to the left (like an accordion)</li>
          <li>Look 1 step to the left, and 3 steps to the left</li>
          <li>Stack them if they are matching rank, or matching suit</li>
          <li>You can move any cards as long as it's legal</li>
          <li>All cards shift left as you move cards</li>
        </ul>
      `
    },
    players: { title: "Players", content: "1" },
    deck: { title: "Deck", content: "Single deck" },
    reference: {
      title: "Reference",
      content: `
        <ul>
          <li><a href="https://www.youtube.com/watch?v=9mMP_3e5LaE" target="_blank">Solitaire: Accordion Tutorial</a></li>
          <li><a href="https://www.youtube.com/watch?v=pXvfi8mf4YE" target="_blank">🪗 How to play Accordion - a Solitaire Tutorial! 🪗</a></li>
        </ul>
      `
    },
    tags: ["games", "single player"]
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

// === Filtering ===
function applyFilter(filter) {
  currentFilter = filter;
  const filteredItems = (filter === "all")
    ? itemsData
    : itemsData.filter(item => item.tags?.includes(filter));
  populateItemList(filteredItems);
  document.getElementById('items').innerHTML = '';
}

// === Populate item list ===
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

// === Display item ===
function displayItem(item, list) {
  const container = document.getElementById('items');
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.id = "itemTitleHeading";
  heading.textContent = item.name;
  container.appendChild(heading);

  Object.keys(item).forEach(key => {
    if (key === 'name' || key === 'tags') return;
    const section = item[key];
    if (!section || !section.content) return;

    const sectionDiv = document.createElement('div');
    if (key === 'notes') sectionDiv.className = 'notes';
    else if (key === 'reference') sectionDiv.className = 'reference';
    else if (key === 'checklist') sectionDiv.className = 'checklist';
    else sectionDiv.className = 'item';

    sectionDiv.style.fontSize = currentFontSize + 'px';

    const subHeading = document.createElement('h3');
    subHeading.textContent = section.title || key;
    subHeading.style.marginTop = '4px';
    subHeading.style.marginBottom = '8px';
    sectionDiv.appendChild(subHeading);

    const content = document.createElement('div');
    content.innerHTML = section.content;
    sectionDiv.appendChild(content);

    container.appendChild(sectionDiv);
  });

  // Nav buttons
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

// === Font control ===
document.getElementById('increaseFontBtn').addEventListener('click', () => {
  currentFontSize += 2;
  document.querySelectorAll('.item, .notes, .checklist').forEach(div => div.style.fontSize = currentFontSize + 'px');
});
document.getElementById('decreaseFontBtn').addEventListener('click', () => {
  currentFontSize = Math.max(12, currentFontSize - 2);
  document.querySelectorAll('.item, .notes, .checklist').forEach(div => div.style.fontSize = currentFontSize + 'px');
});

// === Init ===
applyFilter("all");
