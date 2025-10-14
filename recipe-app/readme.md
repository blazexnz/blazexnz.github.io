# 📝 Recipe App

A mobile-friendly web app to explore recipes with clear instructions, ingredients, and step-by-step checklists. Designed for easy browsing, filtering, and reading on small screens.

## Features

- **Filter by Type:** Show all recipes or filter by categories (bread, pizza, Vietnamese, baking, etc.)  
- **Adjustable Font Size:** Buttons to increase or decrease text size for readability  
- **Step-by-Step Checklists:** Interactive checkboxes for preparation and cooking steps  
- **Ingredients Section:** Clearly listed ingredients with optional notes  
- **Notes Section:** Extra tips, warnings, or commentary for each recipe  
- **References:** Clickable links to videos or tutorials  
- **Navigation Buttons:** Quickly go to previous, next, or top of the page  

## How to Add New Recipes

### Flexible Structure

Each recipe in `itemsData` can include multiple sections, all rendered dynamically. Sections are optional — if a section is missing, it will simply be skipped. Common sections include:

- `ingredients` – list of ingredients with optional notes  
- `checklist` – preparation or cooking steps as interactive checkboxes  
- `day0`, `day1`, `day2`, etc. – multi-day instructions for recipes that require fermentation or resting  
- `method` – step-by-step instructions  
- `notes` – tips, warnings, or extra info  
- `reference` – links to videos or tutorials  
- `tags` – array of tags for filtering (`"bread"`, `"pizza"`, `"vietnamese"`, `"baking"`, `"other"`)

### Styling based on keys

- `ingredients` – standard white box  
- `checklist` – light green box with checkboxes  
- `notes` – yellow italic box  
- `reference` – blue box  
- other sections – standard white content box  
