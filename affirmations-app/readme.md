# Affirmations & Bible Verses ✨📖

A simple, calming app to read and clear affirmations or Bible verses as you go.

---

## Features

### Tabs
- Affirmations ✨  
- Bible Verses 📖  
- Easy switching between both  

### Interaction
- Tap an item to remove it  
- Smooth, distraction-free reading experience  
- Reset anytime to restore all items  
- Saved in browser via `localStorage`  

### Design
- Minimal interface  
- Calming manifestation-style colours  
- Mobile-first (iPhone optimised)  

---

## How to Use

1. Open `index.html`  
2. Choose a tab  
3. Tap items as you read to remove them  
4. Press reset to bring everything back  

---

## Customise Content

Edit `script.js`:

```javascript
const defaultData = {
  affirmations: [
    "Everything is working in my favor"
  ],
  verses: [
    {
      ref: "Philippians 4:13",
      text: "I can do all things through Christ who strengthens me."
    }
  ]
};
