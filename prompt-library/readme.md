# Prompt Library 💾

A clean, distraction-free app to save, organise, search, back up, and instantly copy your favourite AI prompts.

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

### Import & Export
- Export your full library as JSON  
- Import prompt backups anytime  
- Smart merge importing  
- Conflict detection for modified prompts  
- Restore old prompt versions from backups  
- Keeps existing prompts instead of overwriting everything  

### Experience
- Smooth mobile-friendly interactions  
- Fast card-based layout  
- Toast notifications for actions  
- Animated tag pills and transitions  
- Sticky toolbar for quick searching and filtering  

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

## Importing & Exporting

### Export Library
1. Press the **⋯ menu**  
2. Select **Export JSON**  
3. Your full prompt library downloads as a backup file  

### Import Library
1. Press the **⋯ menu**  
2. Select **Import JSON**  
3. Choose a previously exported backup file  

The app will:
- Add brand new prompts automatically  
- Skip identical prompts  
- Detect modified prompts and ask whether to:
  - Keep the current version
  - Restore the backup version

Imports use a merge system, not a full sync. Existing prompts stay untouched unless you choose to replace them.

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
- Import files use JSON format  
- Exported backups are human-readable and editable  
