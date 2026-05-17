# World Clock 🕐🌎
A clean, dark-mode clock showing live US time zones — with a built-in NZ time converter.

---

## Features

### Live Clocks
- Eastern (New York)
- Central (Chicago)
- Mountain (Denver)
- Pacific (Los Angeles)

### Converter
- Set any NZ day and time
- Instantly see the equivalent time across all US zones
- Handles day crossover automatically

### Design
- Minimal dark interface
- 12-hour format with AM/PM
- Mobile-first (iPhone optimised)

---

## How to Use

1. Open `index.html`
2. View live clocks at a glance
3. Scroll to **Convert from NZ Time**
4. Adjust the day and time to see US equivalents

---

## Files

```
index.html   — markup + styles
script.js    — clock logic + converter
```

---

## Customise Zones

Edit the `ZONES` and `CONV_ZONES` arrays in `script.js`:

```javascript
const ZONES = [
  { id: 'ny', city: 'New York', label: 'ET', tz: 'America/New_York' },
  // add or remove zones here
];
```
