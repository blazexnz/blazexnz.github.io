let currentFontSize = 24;
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with HTML content and <strong> actors
const itemsData = [
  {
    name: "Test test test Sourdough Bread",
    checklist: {
      title: "Progress tracker",
      content: `
        <ul>
          <li><input type="checkbox"> Preheat oven to 180°C</li>
          <li><input type="checkbox"> Grease baking pan</li>
          <li><input type="checkbox"> Mix dry ingredients</li>
        </ul>
      `
    },
    ingredients: {
      title: "Ingredients",
      content: `
        <ul>
          <li>300g water (warm water for same day)</li>
          <li>100g starter</li>
          <li>430g bread flour</li>
          <li>10g sea salt</li>
          <li>1/4 cup test</li>
          <li>1/3 tsp test</li>
          <li>1/4 tbsp test</li>
        </ul>
        <p>Makes 8 bases</p>
      `
    },
notes: {
title: "Notes",
content: "For same day bake, feed sourdough for 4 hrs. Dough rests for 2 hrs instead of placing in fridge. Total 12 hrs with starter, or if starter fed yesterday then 8 hrs.</p>"
},
    day0: {
      title: "Day 0 – Morning/Night Before",
      content: `
        <ul>
          <li>Take starter out of fridge.</li>
          <li>If it's been in the fridge a while, feed in the morning and again before bed.</li>
          <li>If it's been used regularly, one feed before bed is enough.</li>
          <li>Feed ratio: 50g cold or room temperature water, 50g flour.</li>
          <li>Leave on bench overnight, ready for use tomorrow.</li>
        </ul>
      `
    },
    day1: {
      title: "Day 1 – Dough & Bulk Fermentation",
      content: `
        <ol>
          <li>Mix all ingredients (water, starter, flour, salt) until no dry bits remain. Use a spoon and scraper for clean hands.</li>
          <li>Cover & rest for 30 mins.</li>
          <li><strong>Meanwhile:</strong>
            <ul>
              <li>Set a timer (e.g. 'Sourdough' Apple Shortcut).</li>
              <li>Starter: if prepping another loaf, leave on bench during the day and feed before bed; otherwise, feed 30g water + 30g flour and refrigerate before bed.</li>
            </ul>
          </li>
          <li>Stretch & Fold #1 – twice around the bowl.</li>
          <li>Rest 30 mins.</li>
          <li>Stretch & Fold #2 – once around the bowl (gently).</li>
          <li>Rest 30 mins.</li>
          <li>Stretch & Fold #3 – once around the bowl (gently). Optional: cup & pull into a smooth ball, place back in bowl seam side down.</li>
          <li>Rest for 3.5 hrs.</li>
          <li>Preshape: scoop dough out, place on bench seam side down, cup & pull into a smooth ball. Rest 30 mins.</li>
          <li>Prepare basket with rice flour.</li>
          <li>Dust top of dough with rice flour.</li>
          <li>Final shape: form rectangle, place seam side up in basket.</li>
          <li>Rest 1 hour, then refrigerate (or rest 2 hrs for same-day bake).</li>
          <li>Proof overnight in fridge (uncovered).</li>
        </ol>
      `
    },
    day2: {
      title: "Day 2 – Bake Day",
      content: `
        <ol>
          <li>Preheat oven to 260°C for 30 mins with Dutch oven inside.</li>
          <li>Remove dough from fridge.</li>
          <li>Transfer dough to baking paper and brush off excess flour.</li>
          <li>Score the dough.</li>
          <li>Transfer to Dutch oven (using baking paper as a sling).</li>
          <li>Bake 20 mins with lid on.</li>
          <li>Bake 15–20 mins with lid off.</li>
          <li>Cool for at least 1 hour before slicing.</li>
        </ol>
      `
    },
  tags: ["pizza", "vietnamese"]
  },
{
  name: "3 Hour Neapolitan Pizza",
  checklist: {
    title: "Progress tracker",
    content: `
      <ul>
        <li><input type="checkbox">Combine & rest for 30 mins</li>
        <li><input type="checkbox">Stretch & fold, shape (tight ball), rest 1 hr</li>
        <li><input type="checkbox">Divide & shape into 290g balls, rest 1.5 hrs</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>375g water</li>
        <li>500g '00' flour</li>
        <li>12g salt</li>
        <li>2g dry yeast</li>
      </ul>
      <p>Makes 3 bases</p>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>75% hydration</li>
        <li>Start 3-4 hours before bake, or overnight in fridge.</li>
      </ul>
    `
  },
  method: {
    title: "Method",
    content: `
      <ol>
        <li>Combine yeast & water</li>
        <li>Add flour & salt</li>
        <li>Mix to a shaggy dough</li>
        <li>Rest for 30 mins</li>
        <li>Stretch & fold, shape into a tight ball</li>
        <li>Rest for 1 hour</li>
        <li>Divide & shape into 290g balls</li>
        <li>Rest for 1.5 hrs</li>
      </ol>
    `
  },
  reference: {
    title: "Reference",
    content: `
      <a href="https://www.youtube.com/watch?v=7-5eCAiUYPg" target="_blank">3 Hour Neapolitan Pizza! (Easiest Recipe)</a>
    `
  },
  tags: ["pizza"]
},
{
  name: "2 Hour Neapolitan Pizza - FAST",
  checklist: {
    title: "Progress tracker",
    content: `
      <ul>
        <li><input type="checkbox"> Combine & knead for 7 mins</li>
        <li><input type="checkbox"> Rest for 45–60 mins</li>
        <li><input type="checkbox"> Divide & shape into 290g balls</li>
        <li><input type="checkbox"> Rest for 30–40 mins</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>375g water</li>
        <li>500g '00' flour</li>
        <li>12g salt</li>
        <li>7g dry yeast</li>
      </ul>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>75% hydration</li>
        <li>Start 2 hours before bake</li>
      </ul>
    `
  },
  method: {
    title: "Method",
    content: `
      <ol>
        <li>Combine water & yeast in a bowl</li>
        <li>Add flour, then salt</li>
        <li>Mix, then knead for 7 mins</li>
        <li>Rest for 45–60 mins</li>
        <li>Divide into 290g balls</li>
        <li>Rest for 30–40 mins</li>
      </ol>
    `
  },
  tags: ["pizza"]
},
{
  name: "Basic Artisan Bread",
  checklist: {
    title: "Progress tracker",
    content: `
      <ul>
        <li><input type="checkbox"> Combine & rest 30 mins</li>
        <li><input type="checkbox"> Stretch & fold #1 then rest 30 mins</li>
        <li><input type="checkbox"> Stretch & fold #2 then rest 30 mins</li>
        <li><input type="checkbox"> Stretch & fold #3 then rest 1 hr</li>
        <li><input type="checkbox"> Preshape then rest 30 mins</li>
        <li><input type="checkbox"> Final shape then rest 30 mins</li>
        <li><input type="checkbox"> Preheat oven 220°C</li>
        <li><input type="checkbox"> Bake 20 mins - lid on</li>
        <li><input type="checkbox"> Bake 15 mins - lid off</li>
        <li><input type="checkbox"> Cool for 1 hr</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>500g flour</li>
        <li>350g water (lukewarm)</li>
        <li>8g (1 packet) yeast</li>
        <li>10g salt</li>
      </ul>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>3.5 hours ready to bake, 5 hours ready to eat</li>
      </ul>
    `
  },
  method: {
    title: "Method",
    content: `
      <ol>
        <li>Mix yeast with water in a bowl</li>
        <li>Add flour & salt</li>
        <li>Combine until rough dough forms</li>
        <li>Rest for 30 min.</li>
        <li>Stretch & fold #1</li>
        <li>Rest for 30 mins</li>
        <li>Stretch & fold #2</li>
        <li>Rest for 30 mins</li>
        <li>Stretch & fold #3</li>
        <li>Rest for 1 hr</li>
        <li>Preshape by scooping the dough out of the bowl, placing on bench sticky/seam side down.</li>
        <li>Cup & pull into a smooth ball</li>
        <li>Rest for 30 mins</li>
        <li>Prepare basket in rice flour</li>
        <li>Dust top of dough with rice flour</li>
        <li>Final shape for basket as a rectangle, place in basket seam side up</li>
        <li>Preheat oven to 220°C (Dutch oven inside)./li>
        <li>Rest for 30 mins</li>
        <li>Transfer dough to baking paper</li>
        <li>Brush off excess flour</li>
        <li>Score</li>
        <li>Transfer to Dutch oven, lifting using the baking paper</li>
        <li>Bake for 20 mins with lid on</li>
        <li>Bake for 15–20 mins with lid off</li>
        <li>Cool for 1 hr before serving</li>
      </ol>
    `
  },
  tags: ["bread"]
},
{
  name: "Basic Artisan Bread - FAST",
  checklist: {
    title: "Progress tracker",
    content: `
      <ul>
        <li><input type="checkbox"> Combine & rest 20 mins</li>
        <li><input type="checkbox"> Stretch & fold then rest 1 hr</li>
        <li><input type="checkbox"> Shape then rest 45 mins</li>
        <li><input type="checkbox"> Preheat oven 220°C</li>
        <li><input type="checkbox"> Bake 20 mins - lid on</li>
        <li><input type="checkbox"> Bake 15 mins - lid off</li>
        <li><input type="checkbox"> Cool for 30 mins</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>500g flour</li>
        <li>350g water (lukewarm)</li>
        <li>8g (1 packet) yeast</li>
        <li>10g salt</li>
      </ul>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>2 hours ready to bake, 3 hours ready to eat</li>
      </ul>
    `
  },
  method: {
    title: "Method",
    content: `
      <ol>
        <li>Mix yeast with water in a bowl</li>
        <li>Add flour & salt</li>
        <li>Combine until rough dough forms</li>
        <li>Rest for 20 mins</li>
        <li>Stretch & fold</li>
        <li>Rest for 1 hr</li>
        <li>Prepare basket in rice flour</li>
        <li>Dust top of dough with rice flour</li>
        <li>Shape for basket as a rectangle, place in basket seam side up</li>
        <li>Rest for 45 mins</li>
        <li>Preheat oven to 220°C (Dutch oven inside)</li>
        <li>Transfer dough to baking paper</li>
        <li>Brush off excess flour</li>
        <li>Score</li>
        <li>Transfer to Dutch oven, lifting using the baking paper</li>
        <li>Bake for 20 mins with lid on</li>
        <li>Bake for 15–20 mins with lid off</li>
        <li>Cool for 30 mins before serving</li>
      </ol>
    `
  },
  tags: ["bread"]
}
];

// === Filtering ===
function applyFilter(filter) {
  currentFilter = filter;
  const filteredItems = (filter === "all")
    ? itemsData
    : itemsData.filter(item => item.tags?.includes(filter));
  populateItemList(filteredItems);
  document.getElementById('items').innerHTML = '';
}

// === Populate item list ===
function populateItemList(list) {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = '';

  let maxWidth = 0;
  const tempSpan = document.createElement('span');
  document.body.appendChild(tempSpan);
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.fontSize = '1rem';

  list.forEach(item => {
    tempSpan.textContent = item.name;
    maxWidth = Math.max(maxWidth, tempSpan.offsetWidth);
  });
  document.body.removeChild(tempSpan);

  list.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item-button';
    div.style.width = maxWidth + 40 + 'px';
    div.textContent = item.name;
    div.addEventListener('click', () => {
      currentIndex = index;
      displayItem(list[index], list);
    });
    itemList.appendChild(div);
  });
}


// === Display item ===
function displayItem(item, list) {
  const container = document.getElementById('items');
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.id = "itemTitleHeading";
  heading.textContent = item.name;
  container.appendChild(heading);

  Object.keys(item).forEach(key => {
    if (key === 'name' || key === 'tags') return;
    const section = item[key];
    if (!section || !section.content) return;

    const sectionDiv = document.createElement('div');
    if (key === 'notes') sectionDiv.className = 'notes';
    else if (key === 'reference') sectionDiv.className = 'reference';
    else if (key === 'checklist') sectionDiv.className = 'checklist';
    else sectionDiv.className = 'item';

    sectionDiv.style.fontSize = currentFontSize + 'px';

    const subHeading = document.createElement('h3');
    subHeading.textContent = section.title || key;
    subHeading.style.marginTop = '4px';
    subHeading.style.marginBottom = '8px';
    sectionDiv.appendChild(subHeading);

    const content = document.createElement('div');
    content.innerHTML = section.content;
    sectionDiv.appendChild(content);

// --- Ingredients multiplier buttons ---
if (key === 'ingredients') {
  const originalContent = content.innerHTML; // store original HTML
  const buttonContainer = document.createElement('div');
  buttonContainer.style.margin = '10px 0';
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.gap = '10px';

  const halfBtn = document.createElement('button');
  halfBtn.textContent = '½';
  halfBtn.addEventListener('click', () => adjustIngredients(content, 0.5));

  const doubleBtn = document.createElement('button');
  doubleBtn.textContent = '2x';
  doubleBtn.addEventListener('click', () => adjustIngredients(content, 2));

const tripleBtn = document.createElement('button');
tripleBtn.textContent = '3x';
tripleBtn.addEventListener('click', () => adjustIngredients(content, 3));

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', () => {
    content.innerHTML = originalContent;
  });

  buttonContainer.appendChild(halfBtn);
  buttonContainer.appendChild(resetBtn);
  buttonContainer.appendChild(doubleBtn);
  buttonContainer.appendChild(tripleBtn);

  sectionDiv.appendChild(buttonContainer);
}

    container.appendChild(sectionDiv);
  });

  // Nav buttons
  const navDiv = document.createElement('div');
  navDiv.className = 'nav-buttons';
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '⬅️ Prev';
  prevBtn.disabled = currentIndex <= 0;
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayItem(list[currentIndex], list);
    }
  });

  const topBtn = document.createElement('button');
  topBtn.textContent = '⬆️ Top';
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next ➡️';
  nextBtn.disabled = currentIndex >= list.length - 1;
  nextBtn.addEventListener('click', () => {
    if (currentIndex < list.length - 1) {
      currentIndex++;
      displayItem(list[currentIndex], list);
    }
  });

  navDiv.appendChild(prevBtn);
  navDiv.appendChild(topBtn);
  navDiv.appendChild(nextBtn);
  container.appendChild(navDiv);

  // Smooth scroll to content
  requestAnimationFrame(() => {
    const yOffset = -20;
    const y = container.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
}

// === Adjust ingredient quantities with readable fractions ===
function adjustIngredients(contentDiv, factor) {
  const liElements = contentDiv.querySelectorAll('li');
  liElements.forEach(li => {
    li.innerHTML = li.innerHTML.replace(/(\d+\s*\/\s*\d+|\d+(?:\.\d+)?)\s*(g|ml|tsp|tbsp|cup|cups?)/gi, (match, num, unit) => {
      let value;
      if (num.includes('/')) {
        const parts = num.split('/');
        value = parseFloat(parts[0].trim()) / parseFloat(parts[1].trim());
      } else {
        value = parseFloat(num);
      }

      let newValue = value * factor;

      // Convert back to simplified fraction for values < 1
      if (newValue < 1) {
        const maxDenominator = 12; // reasonable fraction denominator
        let closestNumerator = Math.round(newValue * maxDenominator);
        if (closestNumerator === 0) closestNumerator = 1; // avoid 0/x
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(closestNumerator, maxDenominator);
        const numerator = closestNumerator / divisor;
        const denominator = maxDenominator / divisor;
        newValue = `${numerator}/${denominator}`;
      } else {
        newValue = (newValue % 1 === 0) ? newValue : newValue.toFixed(2);
      }

      return `${newValue} ${unit}`;
    });
  });

  // Also scale "Makes X" if present
  const makesP = contentDiv.querySelector('p');
  if (makesP && /makes\s+(\d+)/i.test(makesP.textContent)) {
    makesP.textContent = makesP.textContent.replace(/makes\s+(\d+)/i, (match, num) => {
      let newYield = Math.round(parseInt(num) * factor);
      return `Makes ${newYield}`;
    });
  }
}

// === Font control ===
document.getElementById('increaseFontBtn').addEventListener('click', () => {
  currentFontSize += 2;
  document.querySelectorAll('.item, .notes, .checklist').forEach(div => div.style.fontSize = currentFontSize + 'px');
});
document.getElementById('decreaseFontBtn').addEventListener('click', () => {
  currentFontSize = Math.max(12, currentFontSize - 2);
  document.querySelectorAll('.item, .notes, .checklist').forEach(div => div.style.fontSize = currentFontSize + 'px');
});

// === Init ===
applyFilter("all");
