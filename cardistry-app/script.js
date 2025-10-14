let currentFontSize = 24;
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with HTML content and <strong> actors
const itemsData = [
  {
    "name": "Solitaire",
    "setup": {
      "title": "Setup",
      "content": "<ul><li>Tableau - deal seven piles, left to right, starting with the one card in the first column face up</li><li>Foundations - the aces form the foundation piles - hearts, diamonds, spades, clubs ♥ ♦ ♠ ♣</li><li>Draw pile - remaining cards after deal, you can go through this pile as many times as you like, drawing 1 or 3 cards, do not shuffle</li><li>Waste pile - laid face up in the stock pile, do not shuffle</li></ul>"
    },
    "method": {
      "title": "The Play",
      "content": "<ul><li>Create a sequence among the seven piles in descending order (K, Q, J, 10, 9, 8...)</li><li>Alternating colours - red/black</li><li>Only a King can move to a blank space</li></ul>"
    },
    "players": {
      "title": "Players",
      "content": "1"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games"]
  },
  {
    "name": "Streets and Alleys",
    "setup": {
      "title": "Setup",
      "content": "<p>Deal a column of 4 cards face up, leaving the centre column blank for the foundations, deal another 4 cards face up on the right. The entire deck is dealt, leaving rows containing 7 cards left, and rows of 6 on the right.</p><p>The four aces form the foundations.</p>"
    },
    "method": {
      "title": "The Play",
      "content": "<ul><li>The aces form the foundations. Cards placed on the aces must be of the same suit</li><li>Cards can be placed on the rows, must be in descending order</li><li>More than one card can be moved but must be in descending order</li><li>Suits and colours do not matter on the rows</li><li>Any card value can be placed in a blank spot in the rows</li></ul>"
    },
    "reference": {
      "title": "Reference",
      "content": `
    <ul>
      <li><a href="https://bicyclecards.com/how-to-play/streets-and-alleys" target="_blank">Streets and Alleys</a></li>
      <li><a href="https://www.youtube.com/watch?v=XzSWIKbfBSY" target="_blank">How To Play Streets and Alleys</a></li>
      <li><a href="https://www.youtube.com/watch?v=Kv1hMZ73OSA" target="_blank">Streets and Alleys Solitaire - How to Play</a></li>
    </ul>
  `
    },
    "players": {
      "title": "Players",
      "content": "1"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games"]
  },
  {
    "name": "Accordion",
    "setup": {
      "title": "Setup",
      "content": "<p>Compact: 6 columns dealt left to right (then keep dealing cards to the right)</p><p>Standard: deal 52 cards in a straight line</p>"
    },
    "method": {
      "title": "The Play",
      "content": "<ul><li>tl;dr -> stack left 1 or 3 steps, matching rank or suit</li><li>Objective is to stack all cards to a single pile to the left (like an accordion)</li><li>Look 1 step to the left, and 3 steps to the left</li><li>Stack them if they are matching rank, or matching suit</li><li>You can move any cards as long as it's legal</li><li>All cards shift left as you move cards</li></ul>"
    },
    "players": {
      "title": "Players",
      "content": "1"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "reference": {
      "title": "Reference",
      "content": `
    <ul>
      <li><a href="https://www.youtube.com/watch?v=9mMP_3e5LaE" target="_blank">Solitaire: Accordion Tutorial</a></li>
      <li><a href="https://www.youtube.com/watch?v=pXvfi8mf4YE" target="_blank">🪗 How to play Accordion - a Solitaire Tutorial! 🪗</a></li>
    </ul>
  `
    },
    "tags": ["games"]
  },
  {
    "name": "One Handed Solitaire",
    "setup": {
      "title": "Setup",
      "content": "<p>Hold the deck in your hand face down</p>"
    },
    "method": {
      "title": "The Play",
      "content": "<ul><li>tl:dr -> draw 4 cards from the bottom, same suit discard 2 cards in between, same rank discard 4 cards, 4 suits the same discard 4 cards, keep drawing from the bottom of the deck</li><li>Object is to remove as many cards from the deck as possible</li><li>Draw 4 cards from the bottom of the deck, face up on top</li><li>If the top and fourth card are the same:<ul><li>Suit -> the 2 cards between them are discarded</li><li>Rank -> all 4 cards are discarded</li><li>Optionally: if all 4 cards are the same suit -> all 4 cards are discarded</li></ul></li><li>If no legal moves, keep drawing a single card from the bottom</li><li>The best outcome: remove all cards from your hand</li></ul>"
    },
    "reference": {
      "title": "Reference",
      "content": '<a href="https://www.youtube.com/watch?v=jayssGEYyq4" target=\"_blank\">How To Play One Handed Solitaire</a>'
    },
    "players": {
      "title": "Players",
      "content": "1"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games"]
  },
  {
    "name": "Blaze's Blackjack Dealer Rules",
    "method": {
      "title": "Dealer Procedure",
      "content": "<ol><li>Shuffle the cards, burn one card</li><li>Deal cards clockwise to the players</li><li>Deal two cards each (lay down anti clockwise so that both pips are visible)</li><li>Deal the dealer 1 card</li><li>Double down - deal the card perpendicular to the cards</li></ol>"
    },
    "betting": {
      "title": "Betting rules",
      "content": "<ul><li>Double down - deal one card only</li><li>Splitting - deal one card, finish dealing the first hand before moving onto the second split card</li><li>Splitting aces - deal only one card</li></ul>"
    },
    "notes": {
      "title": "Notes",
      "content": "<ul><li>Blackjack - pays 2:1</li><li>If you split Aces, then the payout is 1:1 (because it's 21 NOT blackjack)</li></ul>"
    },
    "tags": ["games", "cards", "blackjack"]
  },
  {
    "name": "Red or Black",
    "setup": {
      "title": "Setup",
      "content": "<ul><li>Each player places a bet, calling \"red\" or \"black\"</li><li>Deal each player 5 cards face up</li></ul>"
    },
    "method": {
      "title": "The Play",
      "content": "<ul><li>If three, or more of the colour named, the dealer pays the bet</li><li>If three, or more are of the opposite colour, the dealer collects the bet</li><li>If all five cards are the same colour, double the bet is paid, or collected</li></ul>"
    },
    "reference": {
      "title": "Reference",
      "content": '<a href="https://bicyclecards.com/how-to-play/red-or-black" target=\"_blank\">Red or Black</a>'
    },
    "players": {
      "title": "Players",
      "content": "2, 3, 4, 5+"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games", "cards"]
  },
  {
    "name": "Play or Pay",
    "objective": {
      "title": "Objective",
      "content": "<p>Be the first player to get rid of all their cards</p>"
    },
    "setup": {
      "title": "The Deal",
      "content": "<ul><li>Deal the cards one at a time, face down. All cards are dealt, some players will receive fewer cards.</li><li>Each player with fewer cards ante one additional chip</li></ul>"
    },
    "method": {
      "title": "The Play",
      "content": "<ul><li>Each person must play a card if possible, clockwise. If the player is unable to play in turn, they put one chip in the pot</li><li>All cards played remain face up on the table, arranged in four rows of the four suits.</li><li>The first play may play any card</li><li>The sequence in the suit must be built up until all thirteen cards are played, and the sequence in suit is continuous, e.g., J Q K A 2</li><li>The player who plays the thirteenth card of a suit may choose any card from their hand to begin the next series</li></ul>"
    },

    "reference": {
      "title": "Reference",
      "content": '<a href="https://bicyclecards.com/how-to-play/play-or-pay" target=\"_blank\">Play or Pay</a>'
    },
    "players": {
      "title": "Players",
      "content": "3, 4, 5+"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games", "cards"]
  },
  {
    "name": "Red Dog",
    "objective": {
      "title": "Objective",
      "content": "<p>Be the player with the most chips at the end</p>"
    },
    "setup": {
      "title": "Setup",
      "content": "<ul><li>Each player pays the ante</li><li>Player to the dealer's right cuts the cards</li><li>Deal five cards to each player, one at a time (4 cards if more than 8 players)</li></ul>"
    },
    "method": {
      "title": "Betting",
      "content": "<ul><li>After checking your cards, player to the dealer's left may open the bets with any number of chips, into the pot. A player who does not wish to bet forfeits one chip to the pot</li><li>No bet may exceed the number of chips already in the pot</li><li>When the player has placed a bet, the dealer turns up the top card from the remainder of the pack. If the player who bet has a card of the same suit and of higher rank, they show the card and take back the amount of their bet, plus an equivalent amount from the pot</li><li>If the player has no card that beats the card shown, they must show their entire hand, and the amount of the bet is added to the pot</li><li>The next player in turn places a bet, another card is turned, and the same procedure is followed until all players, including the dealer have bet</li><li>If at any time the pot has no more chips in it (because a player has bet the pot and won), each player puts in one chip to restore the pot</li><li>When every player has had a chance to bet, the turn to deal passes to the dealer's left</li></ul>"
    },
    "reference": {
      "title": "Reference",
      "content": '<a href="https://bicyclecards.com/how-to-play/red-dog" target=\"_blank\">Red Dog</a>'
    },
    "players": {
      "title": "Players",
      "content": "2, 3, 4, 5+"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games", "cards"]
  },
  {
    "name": "Guts",
    "setup": {
      "title": "Setup",
      "content": "<p>Deal each player 2 cards, face down, left of the dealer</p>"
    },
    "method": {
      "title": "Rules",
      "content": "<ul><li>Each round starts with an ante</li><li>Each player in turn says \"in\" or \"out\"</li><li>Players who are out, forfeits their ante, but will not lose any further chips</li><li>Players with the highest ranking hand wins the pot</li><li>Players who are in, but don't have the highest ranking hand, pay the amount of the pot. This becomes the pot for the next round</li><li>If more than one player says \"in\", all those who are in reveal cards, player with the best cards wins the pot</li><li>If all players announce out, except for one player, they win the pot, the pot is empty so the next round begins with an ante</li><li>To prevent exponentially growing pots, cap the growing pot to 50x or 100x the ante. If the on the round that meets the cap, then the remaining pot becomes the ante for the next round</li><li>Shuffle the cards after each round (or blaze’s rule is to alternatively play a shoe of cards like blackjack)</li></ul>"
    },
    "scoring": {
      "title": "Scoring",
      "content": "<ul><li>Aces are high</li><li>Any pair of equal cards beats any two unequal cards</li><li>A higher pair beats a lower pair</li><li>Between two non-pair hands, the hand with the highest cards wins</li><li>If two hands have equal high cards, the hand whose other card is higher wins</li><li>No straights, no flushes</li><li>If two or more players tie for the best ranking hand, the pot is split. If there are no losing players, the pot is empty so the next round begins with an ante</li></ul>"
    },
    "reference": {
      "title": "Reference",
      "content": `
    <ul>
      <li><a href="https://bicyclecards.com/how-to-play/guts" target="_blank">Guts</a></li>
      <li><a href="https://www.youtube.com/watch?v=aZcwG3B5upM" target="_blank">How To Play Guts</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Guts_(card_game)" target="_blank">Guts (card game)</a></li>
      <li><a href="https://playingcarddecks.com/blogs/how-to-play/guts-game-rules" target="_blank">Guts Game Rules</a></li>
    </ul>
  `
    },
    "players": {
      "title": "Players",
      "content": "2, 3, 4, 5+"
    },
    "deck": {
      "title": "Deck",
      "content": "Single deck"
    },
    "tags": ["games", "cards", "poker"]
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

