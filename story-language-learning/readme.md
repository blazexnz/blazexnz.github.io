# 🌏 Language Learning App

This web app allows you to read and practice short bilingual stories in multiple languages. It features a clean, minimal interface designed for both desktop and mobile devices, with intuitive navigation and interactive sentence display.

## Features
- **Multiple Languages:** Start with Vietnamese/English, with the ability to add more languages in the future.
- **Story Selection:** Choose from a list of available stories, dynamically loaded from a JSON file.
- **Interactive Display:** Tap or click on the story box to toggle between the original and translated sentences.
- **Navigation Buttons:** Easily move between sentences with "Prev", "Next", and "Start Over" buttons.
- **Story Jump Menu:** Quickly skip to a particular story using the dropdown menu.
- **Responsive Design:** Works seamlessly on desktops, iPhones, and other mobile devices.
- **Configurable Content:** All stories are stored in an external `stories.json` file, making it easy to update or expand without changing the code.
- **Clean UI:** Rounded story boxes, soft shadows, and a subtle page background for a world-class reading experience.

## How to use
1. **Select Language:** Use the dropdown below the title to choose your preferred language (VN/EN).
2. **Select Story:** Pick a story from the story dropdown menu.
3. **Read Story:** The first sentence will appear in the original language. Tap anywhere on the story box to view the translation.
4. **Navigate Sentences:** Use "Prev", "Next", or "Start Over" to move through the story.
5. **Switch Stories:** Use the story dropdown to jump to a different story at any time.

## To update or add stories
1. Open `stories.json`.
2. Add, remove, or edit stories. Each story should include a title, a list of sentences with language keys, and an optional lesson section.
3. Save the file—changes will automatically reflect in the app.

## Notes
- Fully client-side—no server required. Just open `index.html` in a browser.
- Designed for both desktop and mobile devices with responsive layouts and touch-friendly interactions.
- Easily extensible to include additional languages or story collections in the future.
