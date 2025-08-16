# 🙏 Prayer App

This web app allows you to select and display prayers in multiple languages. It features a clean, minimal interface with adjustable font sizes, making it easy to read and reflect on your chosen prayer.

## Features
- **Multiple Languages:** Select prayers in English, Vietnamese, or Tagalog.
- **Prayer Selection:** Choose from a list of available prayers, dynamically loaded from a JSON file.
- **Interactive Display:** Prayers appear in a visually appealing card with subtle design effects.
- **Adjustable Font Size:** Increase or decrease the text size for readability.
- **Configurable Content:** All prayers are loaded from an external `prayers.json` file, making it easy to update or expand without modifying the code.
- **Simple Design:** Clean, minimal layout focused on readability and meditation.

## How to use
1. **Select Language:** Choose your preferred language from the dropdown.
2. **Select Prayer:** Pick a prayer from the dynamically populated menu.
3. **Read Prayer:** The prayer text will appear in a styled card.
4. **Adjust Font Size:** Use the "A+" and "A-" buttons to increase or decrease the font size.

## To update or add prayers
1. Open `prayers.json`.
2. Add, remove, or edit prayers under the desired language key (`en`, `vi`, `tl`).
3. Save the file—your changes will automatically be available in the app.

## Notes
- The app is fully client-side and requires no server to run. Simply open `index.html` in a browser.
- Works well on desktop and mobile devices thanks to responsive design.
