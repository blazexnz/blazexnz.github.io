# 🃏 Cardistry App

A mobile-friendly web app to explore card tricks and games, with clear instructions, notes, and references. Designed for easy browsing, filtering, and reading on small screens.

## Features

- **Filter by Type:** Show all items, tricks, games, or shuffles  
- **Adjustable Font Size:** Buttons to increase or decrease text size  
- **Step-by-Step Methods:** Numbered instructions with optional actor labels  
- **Notes Section:** Extra tips or commentary for each trick/game  
- **References:** Clickable links to videos or tutorials  
- **Navigation Buttons:** Quickly go to previous, next, or top of the page  

## How to Add New Content

### Flexible Structure

Each item in `itemsData` can include as many or as few sections as needed. Sections are rendered dynamically — if a section is missing, it will simply be skipped, or you can add as many new ones as you like. Common sections include:

- `text` – general description  
- `setup` – preparation instructions  
- `method` – step-by-step numbered instructions, optionally with actors  
- `notes` – tips, warnings, or extra info  
- `reference` – links to videos or tutorials  
- `tags` – array of tags for filtering (`"tricks"`, `"games"`, `"shuffles"`, etc.)

Example of an item with multiple sections:

```js
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
  notes: { title: "Notes", content: "<p>Practice slowly at first to build dexterity.</p>" },
  reference: { title: "Reference", content: '<a href="https://www.example.com/charlier-cut" target="_blank">Video Tutorial</a>' },
  tags: ["tricks"]
}
