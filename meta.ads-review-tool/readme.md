# Meta Ads Review Tool 📊

A focused, phase-based dashboard for reviewing Meta ad performance at a glance — built for speed, not spreadsheets.

---

## Features

### Phases
- Phase 01 — Mock Up Test 🎨
- Phase 02 — Testing 🧪
- Phase 03 — Scaling 🚀
- Phase 04 — Optimising ⚙️
- Each phase has its own metrics, targets, objectives, and daily actions

### Metrics
- Enter your values and instantly see pass ✓ or fail ✗
- Colour-coded cards (green / red) for at-a-glance review
- Target badges show the goal on every card
- Dollar fields use auto-decimal input — type `70` to get `$0.70`
- Score bar summarises how many metrics are passing

### Export
- **PNG** — screenshot of the full dashboard
- **PDF** — printable document
- **Plain Text** — download as `.txt`
- **Copy to Clipboard** — pastes phase name + metrics + score, ready for Slack, Notes, email

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
    id: "mockup",
    num: "01",
    name: "Mock Up Test",
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
        target: "< $1.70",
        prefix: "$",
        operator: "lt",
        threshold: 1.70,
        decimal: true,   // auto-decimal input (type 170 → $1.70)
      },
      {
        key: "link_clicks",
        name: "Link Clicks",
        target: "≥ 5",
        operator: "gte",
        threshold: 5,
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

### Prefix / Suffix / Decimal

| Field     | Use for                    | Example                      |
|-----------|----------------------------|------------------------------|
| `prefix`  | Currency symbol            | `"$"` → $1.70                |
| `suffix`  | Percentage or multiplier   | `"%"` → 1.5% / `"×"` → 2.0× |
| `decimal` | Auto-decimal on dollar fields | `true` → type `170` = $1.70 |

---

## Files

```
index.html   — layout, styles, export modal
script.js    — phase data, logic, export functions
```
