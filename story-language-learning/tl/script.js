let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;
let currentFontSize = 20;

const storyContainer = document.getElementById('storyContainer');
const languageSelect = document.getElementById('languageSelect');
const storySelect = document.getElementById('storySelect');

const prevBtn = document.getElementById('prevBtn');
const startOverBtn = document.getElementById('startOverBtn');
const nextBtn = document.getElementById('nextBtn');
const nextSentenceBtn = document.getElementById('nextSentenceBtn');

const increaseFontBtn = document.getElementById('increaseFont');
const decreaseFontBtn = document.getElementById('decreaseFont');

let showingSentence = false;

// Load stories for the selected language
function loadStoriesForLanguage(data) {
  const lang = languageSelect.value;
  if (lang === 'vi') storiesData = data.viStories;
  else if (lang === 'tl') storiesData = data.tlStories;
  else storiesData = data.enStories || data.viStories;
}

function populateStorySelect() {
  storySelect.innerHTML = '';
  storiesData.forEach((story, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${index + 1}: ${story.title}`;
    storySelect.appendChild(option);
  });
}

function advanceStory() {
  const story = storiesData[currentStoryIndex];
  if (currentSentenceIndex >= story.sentences.length) return;

  const sentence = story.sentences[currentSentenceIndex];
  storyContainer.textContent += `${currentSentenceIndex + 1}. ${sentence}\n`;

  currentSentenceIndex++;
}

function resetStoryDisplay() {
  currentSentenceIndex = 0;
  storyContainer.textContent = '';
  advanceStory();
}

// Font controls
increaseFontBtn.addEventListener('click', () => {
  currentFontSize += 2;
  storyContainer.style.fontSize = currentFontSize + 'px';
});
decreaseFontBtn.addEventListener('click', () => {
  currentFontSize -= 2;
  storyContainer.style.fontSize = currentFontSize + 'px';
});

// Navigation & next sentence
nextSentenceBtn.addEventListener('click', advanceStory);
document.body.addEventListener('click', (e) => {
  if (!['BUTTON','SELECT'].includes(e.target.tagName)) advanceStory();
});
prevBtn.addEventListener('click', () => { if (currentStoryIndex>0) currentStoryIndex--; resetStoryDisplay(); });
nextBtn.addEventListener('click', () => { if (currentStoryIndex<storiesData.length-1) currentStoryIndex++; resetStoryDisplay(); });
startOverBtn.addEventListener('click', resetStoryDisplay);

languageSelect.addEventListener('change', () => {
  fetch('stories.json')
    .then(res => res.json())
    .then(data => {
      loadStoriesForLanguage(data);
      populateStorySelect();
      resetStoryDisplay();
    });
});

storySelect.addEventListener('change', (e) => {
  currentStoryIndex = parseInt(e.target.value);
  resetStoryDisplay();
});

// Initial fetch
fetch('stories.json')
  .then(res => res.json())
  .then(data => {
    loadStoriesForLanguage(data);
    populateStorySelect();
    resetStoryDisplay();
  });
