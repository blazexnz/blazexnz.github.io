# PI Memory Training App

This web app is designed to help you practice and improve your memory using a list of unique and memorable items. The app lets you reveal the items one by one and reset them whenever needed to enhance your recall abilities.

## Features
- **Reveal List:** Click to reveal a list of items that are hidden initially.
- **Dynamic List:** The list is generated from a predefined set of memory cues.
- **Interactive Display:** Items are revealed one by one when you click anywhere on the screen.
- **Reset Functionality:** Reset the list to hide all items and start over.
- **Configurable list:** All items are loaded from an external config.json file, making it easy to update without modyfing the code.
- **Simple Design:** Clean and minimal layout focused on improving memory training.

## How to use
1. **Click 'Reveal List':** Begin by revealing the list of items.
2. **Item-by-Item Recall:** As you click anywhere on the screen, each item will be revealed in order to help with memory recall.
3. **Reset the List:** Use the "Reset" button to hide all items and start a new memory session from scratch.

## To update the list
1. Edit the config.json file, where each entry is a string
2. Add, remove, reorder the list as you need to - the app will load them dynamically at runtime
