# Prompt Library ⌘🗒️

A clean, distraction-free app to save, organise, search, and quickly copy your favourite AI prompts.

---

## Features

### Prompt Management
- Create new prompts instantly  
- Edit existing prompts  
- Delete prompts you no longer need  
- Copy prompts to clipboard with one tap  

### Organisation
- Add multiple tags per prompt  
- Filter prompts by tag  
- Search titles, descriptions, tags, and prompt content  
- Auto-generated tag suggestions  

### Experience
- Smooth mobile-friendly interactions  
- Fast card-based layout  
- Toast notifications for actions  
- Animated tag pills and transitions  

### Storage
- Saved locally in browser via `localStorage`  
- No login required  
- Data persists between refreshes  

### Design
- Minimal editorial-inspired interface  
- Warm paper-style colour palette  
- Mobile-first responsive layout  
- Optimised for quick access and readability  

---

## How to Use

1. Open `index.html`  
2. Press **+ New Prompt**  
3. Add a title, tags, description, and prompt  
4. Save your prompt  
5. Use search or filters to find prompts later  
6. Tap **Copy** to instantly copy a prompt  

---

## Customise Content

Edit `script.js`:

```javascript
prompts = [
  {
    id: uid(),
    title: 'Rewrite for Clarity',
    tags: ['Writing'],
    desc: 'Simplifies complex text without losing meaning.',
    prompt: 'Rewrite the following text so it is clear and concise...',
    created: Date.now()
  }
];
```

---

## Built With

- HTML  
- CSS  
- Vanilla JavaScript  
- `localStorage` for persistence  

---

## Notes

- All data is stored locally in your browser  
- Clearing browser storage will remove saved prompts  
- No external database or backend required  
