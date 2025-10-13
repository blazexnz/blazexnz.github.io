# 🃏 Cardistry App

A mobile-friendly web app to explore card tricks and games, with clear instructions, notes, and references. Designed for easy browsing, filtering, and reading on small screens.

## Features

- **Filter by Type:** Show all items, tricks, or games  
- **Adjustable Font Size:** Buttons to increase or decrease text size  
- **Step-by-Step Methods:** Numbered instructions with optional actor labels  
- **Notes Section:** Extra tips or commentary for each trick/game  
- **References:** Clickable links to videos or tutorials  
- **Navigation Buttons:** Quickly go to previous, next, or top of the page  

## How to Add New Content

### Structure

Each item should have the following format in `itemsData`:

```js
{
  name: "Item Name",
  text: { title: "Text", content: "General description of the trick or game." },
  setup: { title: "The Setup", content: "How to prepare before performing." },  // optional
  method: {
    title: "The Method",
    content: [
      { actor: "Dealer", text: "Shuffles the deck." },
      { actor: "Spectator", text: "Selects a card." },
      { text: "Cuts the deck." }  // actor is optional
    ]
  },
  notes: { title: "Notes", content: "Tips, warnings, or extra info." },  // optional
  reference: { title: "Reference", text: "Video Link", url: "https://..." },  // optional
  tags: ["tricks", "games"]  // use one or more tags for filtering
}
