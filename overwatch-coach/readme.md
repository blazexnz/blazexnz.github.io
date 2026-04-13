# Your Overwatch Coach 🎮

A tiny mobile-first Overwatch companion for quick role reminders during matches.

---

## Features

### Role Tabs
- Tank 🛡️, Damage ⚔️, Support 🩹  
- Quick role switching  

### Thoughts
- Default thoughts for each role  
- Add your own thoughts  
- Tap to delete  
- Drag to reorder  
- Reset to defaults  
- Saved in browser via `localStorage`  

---

## How to Use

1. Open `index.html`  
2. Select a role  
3. Add, delete, or reorder thoughts  
4. Reset anytime  

---

## Customise Defaults

Edit `script.js`:

```javascript
const defaultThoughts = {
  tank: ["Track enemy cooldowns"],
  damage: ["Take off angles"],
  support: ["Position safely"]
};
