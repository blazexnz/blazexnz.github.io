# Meta Ads Review Tool 📊

A focused, phase-based dashboard for reviewing Meta ad performance at a glance — built for speed, not spreadsheets.

---

## Features

### Phases
- Phase 01 — Research 🔍
- Phase 02 — Testing 🧪
- Phase 03 — Scaling 🚀
- Phase 04 — Retention 🔁
- Each phase has its own metrics, targets, objectives, and daily actions

### Metrics
- Enter your values and instantly see pass ✓ or fail ✗
- Colour-coded cards (green / red) for at-a-glance review
- Target badges show the goal on every card
- Score bar summarises how many metrics are passing

### Export
- **PNG** — screenshot of the full dashboard
- **PDF** — printable document
- **Plain Text** — download as `.txt`
- **Copy to Clipboard** — paste into Slack, Notes, email

### Design
- Night mode by default
- Mobile-first (iPhone optimised)
- Values saved in browser via `localStorage`

---

## How to Use

1. Open `index.html` (keep `script.js` in the same folder)
2. Select your current phase
3. Enter your metric values from Meta Ads Manager
4. Green = passing, Red = needs attention
5. Export or copy your review when done
6. Hit **Clear Values** to reset for next session

---

## Customise Phases & Metrics

Edit the `PHASES` array in `script.js`:

```javascript
const PHASES = [
  {
    id: "research",
    num: "01",
    name: "Research",
    description: "Your phase description here.",
    objectives: [
      "Objective one",
      "Objective two",
    ],
    actions: [
      "Daily action one",
      "Daily action two",
    ],
    metrics: [
      {
        key: "cpc",
        name: "Cost Per Click (CPC)",
        target: "< $1.00",
        prefix: "$",
        operator: "lt",
        threshold: 1.0,
      },
    ],
  },
];
```

### Metric operators

| Operator | Meaning          |
|----------|------------------|
| `lt`     | Less than        |
| `lte`    | Less or equal    |
| `gt`     | Greater than     |
| `gte`    | Greater or equal |

### Prefix / Suffix

| Field    | Use for        | Example        |
|----------|----------------|----------------|
| `prefix` | Currency       | `"$"` → $1.20  |
| `suffix` | Percentage, multiplier | `"%"` → 1.5% / `"×"` → 2.0× |

---

## Files

```
index.html   — layout, styles, export modal
script.js    — phase data, logic, export functions
```
