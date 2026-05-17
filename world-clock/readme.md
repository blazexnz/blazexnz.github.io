# Mission Control 🌎
A dark-mode dashboard showing live US time zones, a NZ time converter, and a live USD → NZD exchange rate.

---

## Features

### Live Clocks
- Eastern (New York)
- Central (Chicago)
- Mountain (Denver)
- Pacific (Los Angeles)

### USD → NZD Exchange Rate
- Live rate fetched from Frankfurter (ECB data, no API key needed)
- Preset conversions: US $1.00 / $2.50 / $12.50
- Custom converter — enter any USD or NZD amount
- Auto-refreshes every 60 seconds

### NZ Time Converter
- Defaults to current NZ day and time
- Instantly see the equivalent across all US zones
- Handles day crossover automatically
- Collapsible panel

### Design
- Minimal dark interface
- 12-hour format with AM/PM
- Mobile-first (iPhone optimised)

---

## How to Use

1. Open `index.html`
2. View live clocks at a glance
3. Check the **USD → NZD** panel for live exchange rates
4. Expand **Convert from NZ Time** to check meeting times

---

## Files

```
index.html   — markup + styles
script.js    — clock logic, converter + FX rate
```

---

## Customise

**Time zones** — edit `ZONES` and `CONV_ZONES` in `script.js`:
```javascript
const ZONES = [
  { id: 'ny', city: 'New York', label: 'ET', tz: 'America/New_York' },
  // add or remove zones here
];
```

**FX preset amounts** — edit `USD_AMOUNTS` in `script.js`:
```javascript
const USD_AMOUNTS = [1.00, 2.50, 12.50];
```
