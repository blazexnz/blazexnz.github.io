# Golf Club Distances ⛳

A lightweight, mobile-friendly web app to track **distances** for your golf clubs. Perfect for quick reference on the range or the course.

---

## Features

- Preloaded clubs from Driver to Lob Wedge  
- Customisable distances in meters (`m`) or yards (`yds`)  
- Tap a club to remove it from the list  
- Responsive design for mobile and desktop  
- Touch-friendly and interactive  

---

## How to Use

1. Open `index.html` in your browser.  
2. View your clubs and their distances.  
3. Tap a club to remove it.  
4. Edit `script.js` to update distances or units:

```javascript
// Example: update your club distances
const CLUB_YARDAGES = [
  { club: "Driver", distance: 245 },
  { club: "3 Wood", distance: 225 },
  // ...
];

// Change units to "yds" or "m"
const UNIT = "m";
