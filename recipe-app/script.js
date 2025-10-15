let currentFontSize = 24;
let currentIndex = -1;
let currentFilter = "all";

// Self-contained items with HTML content and <strong> actors
const itemsData = [
{
    name: "Blaze’s sourdough bread",
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
          <li>430g bakers flour</li>
          <li>300g water (lukewarm)</li>
          <li>100g starter</li>
          <li>10g salt</li>
        </ul>
        <p><strong>Starter feed ratio:</strong></p>
        <ul>
          <li>50g cold or room temperature water</li>
          <li>50g bakers flour</li>
        </ul>
      `
    },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>Day 1 – Mix & Bulk Ferment = 6.5 hrs</li>
          <li>Day 2 – Bake Day = 1.5 hrs ready to eat</li>
        </ul>
      `
    },
    day0: {
      title: "Day 0 – morning/night before - feed the starter",
      content: `
        <ul>
          <li>Take starter out of fridge</li>
          <li>If it's been in the fridge a while, feed in the morning and again before bed</li>
          <li>If it's been used regularly, one feed before bed is enough</li>
          <li>Feed ratio: 50g cold or room temperature water, 50g flour</li>
          <li>Leave on bench overnight, ready for use tomorrow</li>
        </ul>
      `
    },
    day1: {
      title: "Day 1 – dough & bulk fermentation",
      content: `
        <ol>
          <li>Mix starter with water in a bowl</li>
          <li>Add flour & salt</li>
          <li>Combine until rough dough forms</li>
          <li>Cover & rest for 30 mins</li>
          <li><strong>Meanwhile:</strong>
            <ul>
              <li>Set a timer</li>
              <li>Starter: if prepping another loaf, leave on bench during the day, and feed before bed, otherwise, maintenance feed immediately (feed ratio: 30g water/30g flour), place in fridge before bed</li>
            </ul>
          </li>
          <li>Stretch & fold #1 – twice around the bowl.</li>
          <li>Cover & rest 30 mins</li>
          <li>Stretch & fold #2 – once around the bowl (gently).</li>
          <li>Cover & rest 30 mins</li>
          <li>Stretch & fold #3 – once around the bowl (gently)</li>
            <ul>
              <li><strong>Optional:</strong> cup & pull into a smooth ball, place back in bowl seam side down</li>
            </ul>
          <li>Cover & rest for 3.5 hrs</li>
          <li>Pre-shape: scoop the dough out of the bowl, place on bench sticky/seam side down, cup & pull into a smooth ball</li>
          <liCover & Rest for 30 mins</li>
          <li>Dust basket with rice flour</li>
          <li>Final shape: form a rectangle, place seam side up in basket</li>
          <li>Cover with Ziploc bag, rest for 1 hour, then place in fridge</li>
          <li>Proof overnight in fridge</li>
        </ol>
      `
    },
    day2: {
      title: "Day 2 – bake day",
      content: `
        <ol>
          <li>30 mins before baking, preheat oven to 260°C (with Dutch oven inside)</li>
          <liOnce preheated, remove from fridge</li>
          <li>Transfer dough to baking paper</li>
          <li>Brush off excess flour</li>
          <li>Score the dough</li>
          <li>Transfer to Dutch oven, lifting using the baking paper</li>
          <li>Bake for 20 mins with lid on</li>
          <li>Bake for 15-20 mins with lid off</li>
          <li>Rest for 1 hour before serving</li>
        </ol>
      `
    },
  tags: ["bread"]
  },
{
    name: "Blaze’s sourdough bread - SAME DAY",
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
          <li>430g bakers flour</li>
          <li>300g water (lukewarm)</li>
          <li>100g starter</li>
          <li>10g salt</li>
        </ul>
        <p><strong>Starter feed ratio:</strong></p>
        <ul>
          <li>50g cold or room temperature water</li>
          <li>50g bakers flour</li>
        </ul>
      `
    },
    notes: {
      title: "Notes",
      content: `
        <ul>
          <li>Notes: 12.5 hrs hours ready to bake, 13.5 hrs ready to eat</li>
        </ul>
      `
    },
    day0: {
      title: "Feed the starter",
      content: `
        <ul>
          <li>Out of the fridge: feed starter for 4 hrs</li>
          <li>If fed last night, then it's ready to use</li>
        </ul>
      `
    },
    day1: {
      title: "Dough & bulk fermentation",
      content: `
        <ol>
          <li>Mix starter with water in a bowl</li>
          <li>Add flour & salt</li>
          <li>Combine until rough dough forms</li>
          <li>Cover & rest for 30 mins</li>
          <li><strong>Meanwhile:</strong>
            <ul>
              <li>Set a timer</li>
              <li>Starter: if prepping another loaf, leave on bench during the day, and feed before bed, otherwise, maintenance feed immediately (feed ratio: 30g water/30g flour), place in fridge before bed</li>
            </ul>
          </li>
          <li>Stretch & fold #1 – twice around the bowl.</li>
          <li>Cover & rest 30 mins</li>
          <li>Stretch & fold #2 – once around the bowl (gently).</li>
          <li>Cover & rest 30 mins</li>
          <li>Stretch & fold #3 – once around the bowl (gently)</li>
            <ul>
              <li><strong>Optional:</strong> cup & pull into a smooth ball, place back in bowl seam side down</li>
            </ul>
          <li>Cover & rest for 3.5 hrs</li>
          <li>Pre-shape: scoop the dough out of the bowl, place on bench sticky/seam side down, cup & pull into a smooth ball</li>
          <liCover & Rest for 30 mins</li>
          <li>Dust basket with rice flour</li>
          <li>Final shape: form a rectangle, place seam side up in basket</li>
          <li>Cover & rest for 2 hrs</li>
        </ol>
      `
    },
    day2: {
      title: "Ready to bake",
      content: `
        <ol>
          <li>Preheat oven 30 mins 260°C (with Dutch oven inside)</li>
          <li>Transfer dough to baking paper</li>
          <li>Brush off excess flour</li>
          <li>Score the dough</li>
          <li>Transfer to Dutch oven, lifting using the baking paper</li>
          <li>Bake for 20 mins with lid on</li>
          <li>Bake for 15-20 mins with lid off</li>
          <li>Rest for 1 hour before serving</li>
        </ol>
      `
    },
  tags: ["bread"]
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
        <li>500g '00' flour</li>
        <li>375g water</li>
        <li>2g instant dry yeast</li>
        <li>12g salt</li>
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
        <li>500g '00' flour</li>
        <li>375g water</li>
        <li>7g instant dry yeast</li>
        <li>12g salt</li>
      </ul>
       <p>Makes 3 bases</p>
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
        <li><input type="checkbox">Combine & rest 30 mins</li>
        <li><input type="checkbox">Stretch & fold #1 then rest 30 mins</li>
        <li><input type="checkbox">Stretch & fold #2 then rest 30 mins</li>
        <li><input type="checkbox">Stretch & fold #3 then rest 1 hr</li>
        <li><input type="checkbox">Preshape then rest 30 mins</li>
        <li><input type="checkbox">Final shape then rest 30 mins, preheat oven 220°C</li>
        <li><input type="checkbox">Score the dough</li>
        <li><input type="checkbox">Bake 20 mins - lid on</li>
        <li><input type="checkbox">Bake 15 mins - lid off</li>
        <li><input type="checkbox">Cool for 1 hr</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>500g bakers flour</li>
        <li>350g water (lukewarm)</li>
        <li>8g instant dry yeast</li>
        <li>10g salt</li>
      </ul>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>3.5 hours ready to bake, 5 hours ready to eat</li>
        <li>8g is 1 packet Edmonds Instant Dry Yeast</li>
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
        <li>Cover & rest for 30 mins</li>
        <li>Stretch & fold #1</li>
        <li>Cover & rest for 30 mins</li>
        <li>Stretch & fold #2</li>
        <li>Cover & rest for 30 mins</li>
        <li>Stretch & fold #3</li>
        <li>Cover & rest for 1 hr </li>
        <li>Pre-shape: scoop the dough out of the bowl, place on bench sticky/seam side down, cup & pull into a smooth ball</li>
        <li>Leave on bench, cover with bowl, rest for 30 mins</li>
        <li>Dust basket with rice flour</li>
        <li>Final shape: form a rectangle, place seam side up in basket</li>
        <li>Preheat oven to 220°C (with Dutch oven inside)</li>
        <li>Cover & rest for 30 mins</li>
        <li>Transfer dough to baking paper</li>
        <li>Brush off excess flour</li>
        <li>Score the dough</li>
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
        <li><input type="checkbox">Combine & rest 20 mins</li>
        <li><input type="checkbox">Stretch & fold then rest 1 hr</li>
        <li><input type="checkbox">Shape then rest 45 mins</li>
        <li><input type="checkbox">Preheat oven 220°C</li>
        <li><input type="checkbox">Score the dough</li>
        <li><input type="checkbox">Bake 20 mins - lid on</li>
        <li><input type="checkbox">Bake 15 mins - lid off</li>
        <li><input type="checkbox">Cool for 30 mins</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>500g bakers flour</li>
        <li>350g water (lukewarm)</li>
        <li>8g instant dry yeast</li>
        <li>10g salt</li>
      </ul>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>2 hours ready to bake, 3 hours ready to eat</li>
        <li>8g is 1 packet Edmonds Instant Dry Yeast</li>
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
        <li>Cover & rest for 20 mins</li>
        <li>Stretch & fold</li>
        <li>Cover & rest for 1 hr</li>
        <li>Dust basket with rice flour</li>
        <li>Shape: form rectangle, place seam side up in basket</li>
        <li>Cover & rest for 45 mins</li>
        <li>Preheat oven to 220°C (with Dutch oven inside)</li>
        <li>Transfer dough to baking paper</li>
        <li>Brush off excess flour</li>
        <li>Score the dough</li>
        <li>Transfer to Dutch oven, lifting using the baking paper</li>
        <li>Bake for 20 mins with lid on</li>
        <li>Bake for 15–20 mins with lid off</li>
        <li>Cool for 30 mins before serving</li>
      </ol>
    `
  },
  tags: ["bread"]
},
{
  name: "Lazy Homemade Bread",
  checklist: {
    title: "Progress tracker",
    content: `
      <ul>
        <li><input type="checkbox">Combine & rest 2-3 hrs</li>
        <li><input type="checkbox">Shape then rest for 15 mins, preheat oven 230°C</li>
        <li><input type="checkbox">Score the dough</li>
        <li><input type="checkbox">Bake 20 mins - lid on</li>
        <li><input type="checkbox">Bake 15 mins - lid off</li>
        <li><input type="checkbox">Cool 15 mins</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>450g bakers flour</li>
        <li>375g very warm water</li>
        <li>6g instant dry yeast</li>
        <li>10g salt</li>
      </ul>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>2-3 hours ready to bake, 2 hr 15 mins ready to eat</li>
        <li>8g is 1 packet Edmonds Instant Dry Yeast</li>
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
        <li>Cover & rest for 2-3 hrs</li>
        <li>Preheat oven to 230°C (with Dutch oven inside oven)</li>
        <li>Dust basket with rice flour</li>
        <li>Final shape: scoop out of bowl, form a rectangle, place in basket seam side up, dust dough with rice flour</li>
        <li>Rest for 15 min</li>
        <li>Transfer dough to baking paper</li>
        <li>Brush off excess rice flour</li>
        <li>Score</li>
        <liTransfer to Dutch oven, lifting using the baking paper</li>
        <li>Bake for 20 mins with lid on</li>
        <li>Bake for 15 mins with lid off</li>
        <li>Cool for 15 mins before serving</li>
      </ol>
    `
  },
  reference: {
    title: "Reference",
    content: `
      <a href="https://www.youtube.com/shorts/z3W9P3Vcu_Q" target="_blank">The Easiest & Laziest Homemade Bread - Perfect EVERY Time</a>
    `
  },
  tags: ["bread"]
},
{
  name: "Ugali",
  checklist: {
    title: "Progress tracker",
    content: `
      <ul>
        <li><input type="checkbox"> Boil 1 cup of water</li>
        <li><input type="checkbox"> Slowly 2/3 maize meal while stirring</li>
        <li><input type="checkbox"> Stir 1–2 mins until thick on medium heat</li>
        <li><input type="checkbox"> Add the remaining maize meal while stirring</li>
        <li><input type="checkbox"> Stir until firm</li>
        <li><input type="checkbox"> Cover and steam on low heat for 2–3 mins</li>
      </ul>
    `
  },
  ingredients: {
    title: "Ingredients",
    content: `
      <ul>
        <li>1/2 cup Star Super Maize Meal</li>
        <li>1 cup water</li>
        <li>A pinch of salt</li>
      </ul>
      <p>Makes 1 serving</p>
    `
  },
  notes: {
    title: "Notes",
    content: `
      <ul>
        <li>270 cals per serving</li>
      </ul>
    `
  },
  method: {
    title: "Method",
    content: `
      <ol>
        <li>Bring 1 cup of water to a boil in a small pot</li>
        <li>Lower the heat to medium. Slowly stir in about 2/3 of the maize meal to make a smooth mixture</li>
        <li>Stir for 1–2 minutes until it starts to thicken</li>
        <li>Add the remaining 1/3 of the maize meal gradually, stirring continuously</li>
        <li>Keep stirring until the ugali is thick and pulls away from the sides of the pot</li>
        <li>Lower heat, cover the pot, and let it steam for 2–3 minutes</li>
        <li>Scoop the ugali onto a plate or bowl, shape it into a mound, and serve hot</li>
      </ol>
    `
  },
  tags: ["meals"]
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



