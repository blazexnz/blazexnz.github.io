let currentFontSize = 24;
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with HTML content and <strong> actors
const itemsData = [
  {
    name: "Solitaire",
    setup: {
      title: "Setup",
      content: `
        <ul>
          <li>Tableau - deal seven piles, left to right, face up, starting with the one card in the first column</li>
          <li>Foundations - the aces form the foundation piles - hearts, diamonds, spades, clubs ♥ ♦ ♠ ♣</li>
          <li>Draw pile - remaining cards after deal, you can go through this pile as many times as you like, drawing 1 or 3 cards, do not shuffle</li>
          <li>Waste pile - laid face up in the stock pile, do not shuffle</li>
        </ul>
      `
    },
    tldr: { title: "tl;dr", content: "7 piles, face up, alternating colours" },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>Create a sequence among the seven piles in descending order (K, Q, J, 10, 9, 8...)</li>
          <li>Alternating colours - red/black</li>
          <li>Only a King can move to a blank space</li>
        </ul>
      `
    },
    players: { title: "Players", content: "1" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games", "single player"]
  },
  {
    name: "Streets and Alleys",
    setup: {
      title: "Setup",
      content: `
        <ul>
          <li>Deal a column of 4 cards face up, leaving the centre column blank for the foundations</li>
          <li>Deal another 4 cards face up on the right</li>
          <li>The entire deck is dealt, leaving rows containing 7 cards on the left and 6 on the right</li>
          <li>The four aces form the foundations</li>
        </ul>
      `
    },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>The aces form the foundations and cards placed on the aces must be of the same suit</li>
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
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games", "single player"]
  },
  {
    name: "Accordion",
    setup: {
      title: "Setup",
      content: `
        <ul>
           <li><strong>Compact:</strong> 6 piles dealt left to right, face up, then continue dealing cards to the right as gameplay progresses</li>
          <li><strong>Standard:</strong> Deal all 52 cards in a single row, left to right</li>
        </ul>
      `
    },
    tldr: { title: "tl;dr", content: "Stack piles to the left (1 or 3 spaces) if the top cards match in rank or suit" },
    objective: { title: "Objective", content: "Stack all cards to a single pile to the left (like an accordion)" },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>Look left, you may move a pile either 1 space to the left, or 3 spaces to the left</li>
          <li>Moves are legal if the top cards match in <strong>rank</strong> or <strong>suit</strong></li>
          <li>When you move a pile, all piles to the right shift left to close the gap</li>
          <li>You can move any pile at any time, as long as the move is legal</li>
          <li>Piles stack as a unit – once cards are stacked, they move together</li>
        </ul>
      `
    },
    players: { title: "Players", content: "1" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
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
    name: "One Handed Solitaire",
    setup: { title: "Setup", content: "Hold the deck in your hand face down" },
    tldr: {
      title: "tl;dr",
      content: `
        <ul>
          <li>Draw 4 cards from the bottom</li>
          <li>Same suit: discard 2 cards in between</li>
          <li>Same rank: discard 4 cards</li>
          <li>4 suits the same: discard 4 cards</li>
          <li>Keep drawing from the bottom of the deck</li>
        </ul>
      `
    },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>Draw 4 cards from the bottom of the deck, face up on top</li>
          <li>If the top and fourth card are the same:
            <ul>
              <li>Suit -> discard the 2 cards between them</li>
              <li>Rank -> discard all 4 cards</li>
              <li>Optionally, if all 4 cards are the same suit -> discard all 4 cards</li>
            </ul>
          </li>
          <li>If no legal moves, draw a single card from the bottom</li>
          <li>Goal: remove as many cards from the deck as possible</li>
        </ul>
      `
    },
    reference: { title: "Reference", content: '<a href="https://www.youtube.com/watch?v=jayssGEYyq4" target="_blank">How To Play One Handed Solitaire</a>' },
    players: { title: "Players", content: "1" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games", "single player"]
  },
  {
    name: "Blaze's Blackjack Dealer Rules",
    method: {
      title: "Dealer Procedure",
      content: `
        <ol>
          <li>Shuffle the cards, burn one card</li>
          <li>Deal cards clockwise to the players</li>
          <li>Deal two cards each (lay down anti clockwise so that both pips are visible)</li>
          <li>Deal the dealer 1 card</li>
          <li>Double down - deal the card perpendicular to the cards</li>
        </ol>
      `
    },
    betting: {
      title: "Betting Rules",
      content: `
        <ul>
          <li>Double down - deal one card only</li>
          <li>Splitting - deal one card, finish dealing the first hand before moving onto the second split card</li>
          <li>Splitting aces - deal only one card</li>
        </ul>
      `
    },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>Blackjack - pays 2:1</li>
          <li>If you split Aces, then the payout is 1:1 (because it's 21 NOT blackjack)</li>
        </ul>
      `
    },
    tags: ["games", "multi player", "betting"]
  },
  {
    name: "Red or Black",
    setup: {
      title: "Setup",
      content: `
        <ul>
          <li>Each player places a bet, calling "red" or "black"</li>
          <li>Deal each player 5 cards face up</li>
        </ul>
      `
    },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>If three or more of the colour named, the dealer pays the bet</li>
          <li>If three or more are of the opposite colour, the dealer collects the bet</li>
          <li>If all five cards are the same colour, double the bet is paid or collected</li>
        </ul>
      `
    },
    reference: { title: "Reference", content: '<a href="https://bicyclecards.com/how-to-play/red-or-black" target="_blank">Red or Black</a>' },
    players: { title: "Players", content: "2, 3, 4, 5+" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games",  "multi player", "betting"]
  },
  {
    name: "Play or Pay",
    objective: { title: "Objective", content: "Be the first player to get rid of all their cards" },
    setup: {
      title: "The Deal",
      content: `
        <ul>
          <li>Deal the cards one at a time, face down
          <li>All cards are dealt; some players will receive fewer cards</li>
          <li>Each player with fewer cards ante one additional chip</li>
        </ul>
      `
    },
    method: {
      title: "The Play",
      content: `
        <ul>
          <li>Each person must play a card if possible, clockwise. If unable, put one chip in the pot</li>
          <li>All cards played remain face up, arranged in four rows of the four suits</li>
          <li>The first play may play any card</li>
          <li>The sequence in the suit must be built up until all thirteen cards are played continuously</li>
          <li>The player who plays the thirteenth card of a suit may begin the next series with any card</li>
        </ul>
      `
    },
    reference: { title: "Reference", content: '<a href="https://bicyclecards.com/how-to-play/play-or-pay" target="_blank">Play or Pay</a>' },
    players: { title: "Players", content: "3, 4, 5+" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games",  "multi player", "betting"]
  },
  {
    name: "Red Dog",
    objective: { title: "Objective", content: "Be the player with the most chips at the end" },
    setup: {
      title: "Setup",
      content: `
        <ul>
          <li>Each player pays the ante</li>
          <li>Player to the dealer's right cuts the cards</li>
          <li>Deal five cards to each player, one at a time (4 cards if more than 8 players)</li>
        </ul>
      `
    },
    method: {
      title: "Betting",
      content: `
        <ul>
          <li>After checking your cards, player to the dealer's left may open the bets with any number of chips, into the pot</li>
          <li>No bet may exceed the number of chips already in the pot</li>
          <li>If the player who bet has a higher card of the same suit than the dealer’s card, they take back their bet plus equal from pot</li>
          <li>If the player cannot beat the card, they lose their bet to the pot</li>
          <li>The next player repeats until all have bet</li>
          <li>If the pot empties, each player adds one chip to restore it</li>
          <li>Dealer position rotates clockwise each round</li>
        </ul>
      `
    },
    reference: { title: "Reference", content: '<a href="https://bicyclecards.com/how-to-play/red-dog" target="_blank">Red Dog</a>' },
    players: { title: "Players", content: "2, 3, 4, 5+" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games",  "multi player", "betting"]
  },
  {
    name: "Guts",
    setup: { title: "Setup", content: "<p>Deal each player 2 cards, face down, left of the dealer</p>" },
    method: {
      title: "Rules",
      content: `
        <ul>
          <li>Each round starts with an ante</li>
          <li>Each player says "in" or "out"</li>
          <li>Players out forfeit ante only</li>
          <li>Players with highest hand win the pot</li>
          <li>Players in but not highest, pay the pot amount</li>
          <li>If multiple players tie for highest, pot is split</li>
          <li>If all but one player say "out", remaining player wins pot</li>
          <li>Pot growth capped at 50x or 100x ante</li>
          <li>Shuffle or play shoe like blackjack after each round</li>
        </ul>
      `
    },
    scoring: {
      title: "Scoring",
      content: `
        <ul>
          <li>Aces high</li>
          <li>Any pair beats any two unequal cards</li>
          <li>Higher pair beats lower pair</li>
          <li>Non-pair hands: highest card wins</li>
          <li>If equal high cards, next card decides</li>
          <li>No straights or flushes</li>
          <li>Ties split pot, empty pot next round ante applies</li>
        </ul>
      `
    },
    reference: {
      title: "Reference",
      content: `
        <ul>
          <li><a href="https://bicyclecards.com/how-to-play/guts" target="_blank">Guts</a></li>
          <li><a href="https://www.youtube.com/watch?v=aZcwG3B5upM" target="_blank">How To Play Guts</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Guts_(card_game)" target="_blank">Guts (card game)</a></li>
          <li><a href="https://playingcarddecks.com/blogs/how-to-play/guts-game-rules" target="_blank">Guts Game Rules</a></li>
        </ul>
      `
    },
    players: { title: "Players", content: "2, 3, 4, 5+" },
    deck: { title: "Deck", content: "Single standard 52-card deck" },
    tags: ["games",  "multi player", "betting"]
  },
  {
    name: "Single Deck Shuffle - Lite Version",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Spread & wash the deck (optional)</li>
          <li>Riffle shuffle twice</li>
          <li>Strip the deck 4 times (forming 5 packets)</li>
          <li>Riffle shuffle</li>
          <li>Cut the deck</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>Cutting a single deck should be between at least 10 cards on the top and 10 on the bottom.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.youtube.com/watch?v=svi7Jry-KQI" target="_blank">How To Shuffle Cards Profesionally</a>' },
    tags: ["shuffles"]
  },
  {
    name: "Single Deck Shuffle - Full Version",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Spread and wash the deck
          <li>Riffle shuffle twice
          <li>Strip the deck 6 times (forming 7 packets)</li>
          <li>Box shuffle: take 1/3 of the bottom, rotate 180°, and place on top</li>
          <li>Riffle shuffle</li>
          <li>Cut the deck (in between 10 cards)</li>
          <li>Burn the first card (for blackjack, baccarat, etc.)</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>Cutting a single deck should be between at least 10 cards on the top and 10 on the bottom.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.youtube.com/watch?v=svi7Jry-KQI" target="_blank">How To Shuffle Cards Profesionally</a>' },
    tags: ["shuffles"]
  },
  {
    name: "Double Deck Shuffle",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Spread & wash the deck
          <li>Riffle shuffle twice
          <li>Strip the deck 6 times (forming 7 packets)</li>
          <li>Box shuffle: move 1/3 from top to bottom</li>
          <li>Riffle shuffle</li>
          <li>Box shuffle: move 1/3 from bottom to top</li>
          <li>Riffle shuffle</li>
          <li>Cut the deck (in between 15 cards)</li>
          <li>Burn the first card (for blackjack, baccarat, etc.)</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>When cutting a double deck, place the cut card facing down, have them cut between the first 15 and last 15 cards, then place the bottom portion on top so the cut card is now on the bottom.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.youtube.com/watch?v=kmM3CjMPuz8" target="_blank">Blackjack Dealer Training: From Beginner to Pro in One Masterclass</a>' },
    tags: ["shuffles"]
  },
  {
    name: "4/6/8 Deck Shoe Shuffle",
    method: {
      title: "The Method",
      content: `
        <ol>
          <li>Break the decks into 2 equal stacks</li>
          <li>Take 1/4 of each stack, then riffle-strip-riffle</li>
          <li>Place the working deck in the centre</li>
          <li>Take 1/4 from working deck & 1/4 from left stack, riffle-strip-riffle, place on working stack</li>
          <li>Take 1/4 from working deck & 1/4 from right stack, riffle-strip-riffle, place on working stack</li>
          <li>Repeat until all cards are shuffled</li>
          <li>Break working deck into 2 equal stacks</li>
          <li>Take 1/4 from each stack, riffle leaving cards laced, roll stack, tidy against shoe</li>
          <li>Cuts the cards (in between 1–1.5 decks)</li>
          <li>Put the bottom cut on top so the cut card is on the bottom</li>
          <li>Put another cut card as an indicator for the next shuffle</li>
          <li>Place in the shoe and burn the first card (blackjack, baccarat, etc.)</li>
        </ol>`
    },
    notes: { title: "Notes", content: "<p>When cutting a 4, 6, or 8 deck shoe, roll the deck on its side, place it against the shoe, have the player cut between the first and last deck, then return the top portion to the bottom so the cut card is on the bottom. Place a second cut card 1–1.5 decks from the bottom to indicate when to start the next shuffle.</p>" },
    reference: { title: "Reference", content: '<a href="https://www.youtube.com/watch?v=kmM3CjMPuz8" target="_blank">Blackjack Dealer Training: From Beginner to Pro in One Masterclass</a>' },
    tags: ["shuffles"]
  },
{
  name: "Presidents (Scum)",
  objective: { 
    title: "Objective", 
    content: "Be the first to get rid of all your cards to become President, while avoiding being the last player out (scum/asshole)" 
  },
  setup: {
    title: "The Deal",
    content: `
      <ul>
        <li>Starting to the dealer's left, deal one card at a time until all cards are dealt.</li>
      </ul>
    `
  },
  method: {
    title: "The Play",
    content: `
      <ul>
        <li>The player to the dealer's left starts by playing any single card or set of equal cards (e.g., three fives)</li>
        <li>Each player in turn must either pass or play a higher card/set of equal size to beat the previous play</li>
        <li>Passing is always allowed and does not prevent playing in later turns</li>
        <li>The play continues until all other players pass. The last player to play starts the next round</li>
        <li>The first player to run out of cards becomes President, and the last player remaining is the Scum</li>
      </ul>
    `
  },
  reference: { 
    title: "Reference", 
    content: '<a href="https://bicyclecards.com/how-to-play/presidents" target="_blank">Presidents</a>' 
  },
  players: { 
    title: "Players", 
    content: "4 to 7 players (best with 5+)" 
  },
  deck: { 
    title: "Deck", 
    content: "Single standard 52-card deck" 
  },
  tags: ["games", "multi player"]
},
{
  name: "Gin Rummy",
  objective: { 
    title: "Objective", 
    content: "Be the first to lay down all your cards by forming sets (three or four of a kind) or runs (three or more consecutive cards of the same suit)" 
  },
  setup: {
    title: "The Deal",
    content: `
      <ul>
        <li>Shuffle and deal a set number of cards to each player (commonly 7 to 10 cards, depending on number of players)</li>
        <li>Place the remaining deck face down as the stockpile and turn the top card face up to start the discard pile</li>
      </ul>
    `
  },
  method: {
    title: "The Play",
    content: `
      <ul>
        <li>On their turn, a player draws one card from either the stockpile or discard pile</li>
        <li>Players may then lay down valid sets (three or four cards of the same rank) or runs (three or more consecutive cards of the same suit)</li>
        <li>Players may also add cards to existing sets or runs on the table</li>
        <li>At the end of the turn, the player discards one card onto the discard pile</li>
        <li>The round ends when a player has no cards left in hand, and scoring may occur based on remaining cards in opponents' hands</li>
      </ul>
    `
  },
    notes: { title: "Notes", content: "<p>Jokers may be included as wild cards</p>" },
  reference: { 
    title: "Reference", 
    content: '<a href="https://bicyclecards.com/how-to-play/gin-rummy" target="_blank">Gin Rummy Rules</a>' 
  },
  players: { 
    title: "Players", 
    content: "2 to 6 players" 
  },
  deck: { 
    title: "Deck", 
    content: "Single standard 52-card deck (Jokers optional)" 
  },
  tags: ["games", "multi player"]
},
{
  name: "Cắt tê (Catte)",
  objective: { 
    title: "Objective", 
    content: "Be the last remaining player by winning at least one trick in each round and ultimately win the final trick" 
  },
  setup: {
    title: "Setup & Deal",
    content: `
      <ul>
        <li>Each player antes the agreed amount into the pot (optional betting rule)</li>
        <li>Deal 6 cards to each player, one at a time</li>
        <li>The player with the highest Spade begins the first trick (or dealer’s left in casual play)</li>
      </ul>
    `
  },
  cardRanking: {
    title: "Card Ranking",
    content: `
      <ul>
        <li>Card ranks (low to high):</li>
          <ul>
            <li>2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A</li>
          </ul>
        <li>Suit priority (low to high):</li>
          <ul>
            <li> ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades</li>
          </ul>
        <li>When cards of the same rank are played, the suit determines the winner</li>
      </ul>
    `
  },
  method: {
    title: "Gameplay",
    content: `
      <ul>
        <li>The first player leads with any card</li>
        <li>Play proceeds clockwise</li>
        <li>Players must follow the same suit if they can</li>
        <li>If a player cannot follow suit, they may play any card but cannot win the trick</li>
        <li>The highest card of the leading suit wins the trick</li>
        <li>The winner of the trick leads the next round</li>
      </ul>
    `
  },
  elimination: {
    title: "Elimination Rules",
    content: `
      <ul>
        <li>If a player fails to win any tricks during the first four rounds, they are eliminated from the game</li>
        <li>Only players who have won a trick continue into the final rounds</li>
      </ul>
    `
  },
  finalRound: {
    title: "Final Round",
    content: `
      <ul>
        <li>Once only two or fewer players remain, they continue playing tricks</li>
        <li>The winner of the final trick wins the game and the pot</li>
      </ul>
    `
  },
  scoring: {
    title: "Scoring & Betting (Optional)",
    content: `
      <ul>
        <li>The final winner takes the pot</li>
        <li>In some variations, eliminated players must pay additional chips or penalties based on the number of tricks lost</li>
      </ul>
    `
  },
  players: { title: "Players", content: "2–6 (best with 4–6)" },
  deck: { title: "Deck", content: "Standard 52-card deck" },
  tags: ["games", "multi player", "betting"]
},
{
  name: "Tiến lên (Thirteen)",
  objective: { 
    title: "Objective", 
    content: "Be the first player to get rid of all your cards" 
  },
  setup: {
    title: "Setup & Deal",
    content: `
      <ul>
        <li>Deal all cards evenly amoung players</li>
        <li>Random dealer for the first hand, subsequent hands, the loser deals</li>
        <li>The player with the lowest card begins, usually 3♠</li>
      </ul>
    `
  },
  cardRanking: {
    title: "Card Ranking",
    content: `
      <ul>
        <li>Card ranks (low to high):</li>
          <ul>
            <li> 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2</li>
          </ul>
        <li>Suit priority (low to high):</li>
          <ul>
            <li>♠ Spades, ♣ Clubs, ♦ Diamonds, ♥ Hearts</li>
          </ul>
        <li>2 is the highest card</li>
        <li>Valid cards or combinations:</li>
          <ul>
            <li><strong>Single</strong> – a single card</li>
            <li><strong>Pair</strong> – two cards of the same rank, like 4♠ 4♥</li>             <li><strong>Triple</strong> – three cards of the same rank, like 9♦ 9♣ 9♠</li>             <li><strong>Straight</strong> – a sequence of 3 or more cards, regardless of suit, like 9♣ 10♦ J♣</li>
            <li><strong>Consecutive pairs</strong> – a sequence of 3 or more pairs, like 5♣ 5♠ 6♥ 6♦ 7♣ 7♦</li>
            <li><strong>Four-of-a-kind (Tứ quý)</strong> – four cards of the same rank, like A♥ A♦ A♣ A♠</li>
          </ul>
      </ul>
    `
  },
  method: {
    title: "Gameplay",
    content: `
      <ul>
        <li>The player with the 3♠ (or chosen first player) leads the first turn</li>
        <li>Play proceeds clockwise</li>
        <li>Players can play:</li>
          <ul>
            <li>A single card higher than the previous single</li>
            <li>A pair higher than the previous pair</li>
            <li>Triple or higher combinations according to rules</li>
          </ul>
        <li>If a player cannot or does not want to beat the current combination, they pass</li>
        <li>The last player to play a combination wins the trick and leads the next turn</li>
      </ul>
    `
  },
  winning: {
    title: "Winning",
    content: `
      <ul>
        <li>The first player to play all their cards wins</li>
        <li>Other players continue to determine 2nd, 3rd, etc. places</li>
      </ul>
    `
  },
  optionalRules: {
    title: "Optional / Regional Variations",
    content: `
      <ul>
        <li>“Bombs”: Four-of-a-kind or consecutive pairs can beat any other combination</li>
        <li>Special scoring or penalties for players left with high cards like 2s or multiple cards</li>
        <li>Some variants restrict the first move to the 3♠ only</li>
      </ul>
    `
  },
  players: { title: "Players", content: "2–4 (commonly 4)" },
  deck: { title: "Deck", content: "Standard 52-card deck" },
  tags: ["games", "multi player"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://en.wikipedia.org/wiki/Ti%E1%BA%BFn_l%C3%AAn" target="_blank">Tiến lên - Wikipedia</a>' 
  }
},
{
  name: "Tongits",
  objective: { 
    title: "Objective", 
    content: "Be the last player with cards or have the lowest points when the game ends" 
  },
  setup: {
    title: "Setup & Deal",
    content: `
      <ul>
        <li>3 players use a standard 52-card deck</li>
        <li>Deal 12 cards to each player</li>
        <li>The remaining deck is placed face down as the draw pile</li>
        <li>Randomly choose the first dealer; the dealer shuffles and deals clockwise</li>
      </ul>
    `
  },
  cardRanking: {
    title: "Card Ranking",
    content: `
      <ul>
        <li>Cards rank from 2 (lowest) to Ace (highest)</li>
        <li>Suit has no effect on ranking</li>
        <li>Valid combinations:</li>
          <ul>
            <li><strong>Set/Triplet</strong> – three or four cards of the same rank, e.g., 7♠ 7♦ 7♣</li>
            <li><strong>Run/Sequence</strong> – three or more consecutive cards of the same suit, e.g., 5♠ 6♠ 7♠</li>
            <li>Individual cards not in a set or run are considered single cards</li>
          </ul>
      </ul>
    `
  },
  method: {
    title: "Gameplay",
    content: `
      <ul>
        <li>Players may draw from the stock or take the top card from the discard pile</li>
        <li>Players aim to form sets or runs in their hand</li>
        <li>Players may also lay down combinations to reduce their hand points</li>
        <li>A player may call “Tongits” if they have no more cards or cannot improve their hand to force an end</li>
        <li>If the draw pile runs out, the game ends and points are counted</li>
      </ul>
    `
  },
  winning: {
    title: "Winning",
    content: `
      <ul>
        <li>The player who calls Tongits with no remaining cards wins automatically</li>
        <li>If the game ends by exhausting the draw pile, the player with the lowest total points in hand wins</li>
        <li>Points are counted by face value: numbered cards are worth their number, face cards are worth 10, Ace is 1</li>
      </ul>
    `
  },
  optionalRules: {
    title: "Optional / Regional Variations",
    content: `
      <ul>
        <li>Some variants allow a player to discard a single card if it doesn’t form part of a set or run</li>
        <li>Players may agree on a scoring system for multiple rounds</li>
        <li>Some variations allow three-of-a-kind to beat a run in special situations</li>
      </ul>
    `
  },
  players: { title: "Players", content: "3 (commonly)" },
  deck: { title: "Deck", content: "Standard 52-card deck" },
  tags: ["games", "multi player"]
},
{
  name: "Clock Solitaire",
  setup: {
    title: "Setup",
    content: `
      <ul>
        <li>Deal 13 piles of 4 cards each, face down, arranged in a clock formation</li>
        <li>Piles 1–12 represent the hours on a clock (1 = Ace, 11 = Jack, 12 = Queen)</li>
        <li>The 13th pile goes in the centre, and represents the Kings</li>
      </ul>
    `
  },
  tldr: { title: "tl;dr", content: "Deal 13 piles in a clock, one pile in the centre, flip cards according to rank, you win only if the final card turned over is the fourth King" },
  method: {
    title: "The Play",
    content: `
      <ul>
        <li>Start by flipping the top card of the centre pile (Kings)</li>
        <li>Place the flipped card face up under the pile that matches it's rank:</li>
          <ul>
            <li>Pile 1 = Ace</li>
            <li>Pile 2 = 2</li>
            <li>and so on until</li>
            <li>Pile 12 = Queen</li>
            <li>Centre pile = King</li>
          </ul>
        <li>Then flip the top card from that corresponding pile</li>
        <li>Continue flipping and placing cards according to their rank</li>
        <li>The game ends when all cards are face up or when the fourth King is placed</li>
      </ul>
    `
  },
  objective: { title: "Objective", content: "Reveal all cards and have the final card be the fourth King to win" },
  players: { title: "Players", content: "1" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["games", "single player"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/watch?v=Aw7vIwqhDTc" target="_blank">How To Play Clock Solitaire</a>' 
  }
},
{
  name: "FreeCell",
  setup: {
    title: "Setup",
    content: `
      <ul>
        <li>Deal all 52 cards face up into 8 tableau columns</li>
        <li>Columns 1–4 have 7 cards each, columns 5–8 have 6 cards each</li>
        <li>4 FreeCells (open slots) at the top left are used for temporary storage</li>
        <li>4 Foundation piles (one per suit) at the top right are built from Ace to King</li>
      </ul>
    `
  },
  tldr: { 
    title: "tl;dr", 
    content: "Deal all cards in 8 columns, build foundation piles (A→K by suit), piles on the tableau must be in descending order, alternating colours, use 4 free cells to hold cards" 
  },
  method: {
    title: "The Play",
    content: `
      <ul>
        <li>Build tableau piles in descending order <strong>by one rank lower</strong> and <strong>alternating colours</strong> (e.g., place 9♠ on 10♥)</li>
        <li>Only one card can be moved at a time (unless using free cells and empty columns to move sequences)</li>
        <li>You may move a card to a FreeCell and back to the tableau</li>
        <li>Foundations are built up by suit from Ace to King</li>
        <li>Cards cannot be moved back from foundation to the tableau</li>
        <li>Any single card can be placed into an empty tableau column</li>
        <li>Strategic use of FreeCells allows you to access and move buried cards</li>
      </ul>
    `
  },
  objective: { title: "Objective", content: "Move all cards to the foundation piles in ascending order by suit from Ace to King" },
  players: { title: "Players", content: "1" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["games", "single player"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/watch?v=vZWvggL7IuU" target="_blank">How To Play FreeCell</a>' 
  }
},
{
  name: "Card force",
  method: {
    title: "The Method",
    content: `
      <ol>
        <li><strong>Spectator:</strong> shuffle the cards</li>
        <li><strong>Dealer:</strong> hold deck facing dealer, ask them to stop on any card (except the bottom card which is the force card):</li>
          <ul>
            <li><strong>Dealer:</strong> slide down the bottom card so that you can do a second deal</li>
          </ul>
        <li><strong>Dealer:</strong> when they ask you to stop, the next card (bottom card) is the one you told them not to stop on</li>
      </ol>
    `
  },
  type: { title: "Trick Type", content: "Card force" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/shorts/Jl7kMruw7PI?si=b9uTrPQ1TYIgFMA4" target="_blank">Card Force</a>' 
  }
},
{
  name: "Aces find the aces",
  setup: {
    title: "Setup",
    content: `
      <ul>
        <li>Set up 1 black ace on top, 1 black ace on bottom</li>
      <ul>
    `
  },
  method: {
    title: "The Method",
    content: `
      <ol>
        <li><strong>Dealer:</strong> hand spectator 2 x red aces</li>
        <li><strong>Dealer:</strong> deal from the top of the deck, ask the spectator when to stop, place 1 red ace face up, place rest of deck on top</li>
        <li><strong>Dealer:</strong> deal again from the top of the deck, ask the spectator when to stop, place 1 red ace face up, place the rest of deck on top</li>
        <li><strong>Dealer:</strong> spread the deck, the card to the right of the red aces will be the black aces</li>
      <ol>
    `
  },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>Cut the deck to make it more convincing (before spreading the deck in step 5)</li>
          <li>You could also pull out the aces, face them down, then turn over all 4 cards at once (revealing 4 aces at once), asking "what's better than two aces? four aces" then reveal</li>
        </ul>
      `
    },
  type: { title: "Trick Type", content: "Set up" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/shorts/8ZMiG7IkjBA" target="_blank">Aces find the aces trick</a>' 
  }
},
{
  name: "Believe in magic",
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Spectator:</strong> shuffle the deck</li>
        <li><strong>Spectator:</strong> deal any number of cards face up on the table
        <li><strong>Dealer:</strong> ask them to stop anytime, when stopped, the next card (in the clean pile) is their card
        <li><strong>Spectator:</strong> Look at the next card, memorise it, then set it aside (face down)</li>
        <li><strong>Dealer:</strong> <i><strong>IMPORTANT</strong></i> Remember the first face up card in the discard pile</li>
        <li><strong>Dealer:</strong> put face up cards on top of the main deck, then put their card on top</li>
        <li><strong>Dealer:</strong> cut the deck</li>
        <li><strong>Dealer:</strong> find their card - it will be to the left of your card</li>
      <ol>
    `
  },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>You can spread the cards instead of riffle in step 1</li>
          <li>In step 7, the reveal, Instead of just revealing, just say something like "think of your card" "think of the colour" etc.</li>
          <li>Or you can ask them to say "left or right" then keep splitting the deck</li>
        </ul>
      `
    },
  type: { title: "Trick Type", content: "Key card" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/shorts/_w3Utwz906o" target="_blank">This will make people believe in magic!</a>' 
  }
},
{
  name: "Key card",
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Dealer:</strong> riffle the cards, tell me when to stop</li>
        <li><strong>Spectator:</strong> take the card, remember it</li>
        <li><strong>Dealer:</strong> swing cut, <i><strong>IMPORTANT</strong></i> peek the bottom card (in the pile in your right hand) while pointing to left pile asking them to place the card (left hand pile)</li>
        <li><strong>Spectator:</strong> place card on top of left pile</li>
        <li><strong>Dealer:</strong> place rest of cards on top</li>
        <li><strong>Spectator:</strong> cut the cards</li>
        <li><strong>Dealer:</strong> fan through cards, their card will be to the right of your key card</li>
      <ol>
    `
  },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>You can spread the cards instead of riffle in step 1</li>
          <li>In step 6 (the reveal), instead of just revealing, just say something like "think of your card" "think of the colour" etc.</li>
          <li>Or you can ask them to say "left or right" then keep splitting the deck</li>
        </ul>
      `
    },
  type: { title: "Trick Type", content: "Key card" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/watch?v=jZ1hvOXr3pI" target="_blank">Learn the EASIEST CARD TRICK! (The Key Card Trick)</a>' 
  }
},
{
  name: "Clock work card",
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Spectator:</strong> shuffle the deck</li>
        <li><strong>Dealer:</strong> deal out 13 cards</li>
        <li><strong>Spectator:</strong> shuffle those 13 cards</li>
        <li><strong>Spectator:</strong> pick a card, remember it, place on main deck</li>
        <li><strong>Spectator:</strong> break the small deck, keep them</li>
        <li><strong>Dealer:</strong> place rest of cards on main deck</li>
        <li><strong>Dealer:</strong> deal a clock of cards, from 12 to 1</li>
        <li><strong>Spectator:</strong> count how many cards they kept when they broke off</li>
        <li><strong>Dealer:</strong> choose that number of cards on the clock (that number is their card)</li>
        <li><strong>Dealer:</strong> Reveal their card</li>
      <ol>
    `
  },
  type: { title: "Trick Type", content: "Self working" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/shorts/_8zFfnRLdRA" target="_blank">This trick works EVERY TIME!</a>' 
  }
},
{
  name: "Trick of fives",
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Spectator:</strong> shuffle the cards</li>
        <li><strong>Spectator:</strong> create 5 packets of 5 cards, face down</li>
        <li><strong>Spectator:</strong> pick one packet and memorise one card, shuffle</li>
        <li><strong>Spectator:</strong> put that packet on one of the other piles</li>
        <li><strong>Spectator:</strong> pick up 2 of the other piles and put on top, put the last pile on the bottom</li>
        <li><strong>Dealer:</strong> deal 5 piles, 1 card per pile at a time, ask the spectator to remember which pile their card is in</li>
        <li><strong>Spectator:</strong> flip over the pile that has your card</li>
        <li><strong>Dealer:</strong> remove the top 2 cards, bottom 2 cards, their card is in the middle</li>
      <ol>
    `
  },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>The first 5 piles can be dealt face up and ask them just to think of the card</li>
          <li>On step 8 (the reveal), instead of just removing top and bottom 2 cards, you can ask them to pick a number </li>
          <li>between 1-5 then keep eliminating, number between 1-4, 1-3, 1-2 and with the last one being theirs</li>
        </ul>
      `
    },
  type: { title: "Trick Type", content: "Self working" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/shorts/UuGovhy2JDs" target="_blank">Try out THIS Card Trick!</a>' 
  }
},
{
  name: "The four jacks",
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Dealer:</strong> find 4 jacks and give them to the spectator</li>
        <li><strong>Dealer:</strong></i> <strong>IMPORTANT</strong></i> While they're inspecting the jacks, to a pinky break with 3 cards</li>
        <li><strong>Dealer:</strong> place the 4 jacks (face up) on the top of the deck (on top of the pinky break), then put main deck on table</li>
        <li><strong>Dealer:</strong> take the pile (pinky break cards and jacks) and one by one, put each jack face down on top of the deck, the last jack face up, but hiding the 3 misc cards beneath</li>
        <li><strong>Dealer:</strong> put the top jack on the table, and the three 3 robbers from the top of the deck randomly in the deck</li>
        <li><strong>Dealer:</strong> the single jack recalls the other 3 jacks, but they couldn't possibly be at the top of the deck now?</li>
      <ol>
    `
  },
  type: { title: "Trick Type", content: "Control (pinky break)" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/watch?v=XTHnra7nDS8" target="_blank">The Four Jacks | Magic Tricks and Tutorials | WillDoesMagic</a>' 
  }
},
{
  name: "4 cards face up (Jeremy Tan edition)",
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Spectator:</strong> pick 4 cards (easier to pick 4 of a kind, eg. aces)</li>
        <li><strong>Dealer:</strong> count off 12 cards, put rest of deck aside, spread the 12 cards</li>
        <li><strong>Spectator:</strong> insert (face up) in any order they like</li>
        <li><strong>Spectator:</strong> shuffle the cards - making sure only the aces are the ones that are face up</li>
        <li><strong>Dealer:</strong> deal cards one by one, first card face down, face up, face down, face up etc. - "to create more chaos"</li>
        <li><strong>Dealer:</strong> deal two cards at a time - ask if they want to deal (deal the two cards as they are) or flip (flip the two cards over)</li>
        <li><strong>Spectator:</strong> chooses deal, or flip</li>
        <li><strong>Dealer:</strong> spread cards to see how mixed up the cards are</li>
        <li><strong>Dealer:</strong> deal 4 cards top left to right, then under right to left, then under left to right, then under right to left</li>
        <li><strong>Dealer:</strong> on the last fold onto each other, square the cards</li>
          <ul>
            <li>If the last fold is left to right, their chosen cards will be face up</li>
            <li>If the last fold is right to left, then their chosen cards will be face down, so you'll need to flip</li>
          </ul>
      <ol>
    `
  },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>I think it's better on step 9 to have their chosen cards face down, remove all the rest, then reveal theirs</li>
        </ul>
      `
    },
  type: { title: "Trick Type", content: "Self working" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/watch?v=KwQLDWhga3o" target="_blank">Learn THE BEST Self-Working Card Trick in the World! (Magic Tutorial)</a>' 
  }
},
{
  name: "Kings and Queens",
  setup: {
    title: "Setup",
    content: `
      <ul>
        <li>Arrange 8 cards in this order:</li>
          <ol>
            <li>K♣ clubs</li>
            <li>K♥ hearts</li>
            <li>K♠ spades</li>
            <li>K♦ diamonds</li>
            <li>Q♣ clubs</li>
            <li>Q♥ hearts</li>
            <li>Q♠ spades</li>
            <li>Q♦ diamonds</li>
          </ol>
      <ul>
    `
  },
  method: {
    title: "Method",
    content: `
      <ol>
        <li><strong>Spectator:</strong> pick a card and remember it</li>
        <li><strong>Dealer:</strong> stagger each alternate card (starting with the second card), take the top portion, ask if their card is in there</li>
        <li><strong>Dealer:</strong> put the pile of cards (that has their card) on the top</li>
        <li><strong>Dealer:</strong> stagger each alternate card (starting with the second card), take the top portion, ask if their card is in there</li>
        <li><strong>Dealer:</strong> put the pile of cards (that has their card) on the bottom</li>
        <li><strong>Dealer:</strong> stagger each alternate card (starting with the second card), take the top portion, ask if their card is in there</li>
        <li><strong>Dealer:</strong> put the pile of cards (that has their card) on the top</li>
        <li><strong>Dealer:</strong> deal two piles (from left to right)</li>
        <li><strong>Dealer:</strong> take the left pile, deal two piles (from left to right)</li>
        <li><strong>Dealer:</strong> take the top card on the left pile, and push it forward</li>
        <li><strong>Dealer:</strong> flip over each pile - card on your right is their face card, middle card is their colour, card on your left is their suit</li>
      <ol>
    `
  },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>Vary the way you deal the piles - stagger, or deal from the bottom to two piles</li>
          <li>Let them choose which pile, and if it's not the one you need, you just choose the other</li>
          <li>Their card is on the left, and to remember that: you read left to right</li>
        </ul>
      `
    },
  type: { title: "Trick Type", content: "Self working" },
  deck: { title: "Deck", content: "Single standard 52-card deck" },
  tags: ["tricks"],
  reference: { 
    title: "Reference", 
    content: '<a href="https://www.youtube.com/shorts/soMEvbG0gCQ" target="_blank">Beginner Card Trick you can do IMMEDIATELY!</a>' 
  }
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

// ===== Updated Filter buttons to highlight active filter =====
const filterButtons = document.querySelectorAll('#filterBar button');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);

    // Remove active class from all buttons
    filterButtons.forEach(b => b.classList.remove('active-filter'));
    // Add active class to clicked button
    btn.classList.add('active-filter');
  });
});

// Highlight "all" by default on page load
document.querySelector('#filterBar button[data-filter="all"]').classList.add('active-filter');


// Initialize app
applyFilter("all");




