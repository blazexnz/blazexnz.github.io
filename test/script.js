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

// Load stories for the selected language
function loadStoriesForLanguage(data) {
  const lang = languageSelect.value;
  if (lang === 'vi') storiesData = data.viStories;
  else if (lang === 'tl') storiesData = data.tlStories;
  else if (lang === 'jp') storiesData = data.jpStories;
  else storiesData = data.viStories;
}

// Populate story dropdown
function populateStorySelect() {
  storySelect.innerHTML = '';
  storiesData.forEach((story, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${index + 1}: ${story.title}`;
    storySelect.appendChild(option);
  });
}

// Advance story (now renders ALL target language first, then English)
function advanceStory() {
  const story = storiesData[currentStoryIndex];
  const lang = languageSelect.value;

  // Only render once per story
  if (storyContainer.textContent !== '') return;

  // Title
  storyContainer.textContent = `🌟 Story ${currentStoryIndex + 1}: ${story.title}\n\n`;

  // Target language block
  story.sentences.forEach((sentence, index) => {
    let text;
    if (lang === 'vi') text = sentence.vi;
    else if (lang === 'tl') text = sentence.tl;
    else if (lang === 'jp') text = sentence.jp;
    else text = sentence.vi;

    storyContainer.textContent += `${index + 1}. ${text}\n`;
  });

  // Spacer
  storyContainer.textContent += `\n`;

  // English block
  story.sentences.forEach((sentence, index) => {
    storyContainer.textContent += `${index + 1}. ${sentence.en}\n`;
  });

  // Focus words
  if (story.focusWords) {
    storyContainer.textContent += `\n👉 Focus words: ${story.focusWords}\n`;
  }
}

// Reset story display
function resetStoryDisplay() {
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

// Navigation
nextSentenceBtn.addEventListener('click', advanceStory);

document.body.addEventListener('click', (e) => {
  if (!['BUTTON', 'SELECT'].includes(e.target.tagName)) advanceStory();
});

prevBtn.addEventListener('click', () => { 
  if (currentStoryIndex > 0) currentStoryIndex--; 
  storySelect.value = currentStoryIndex;
  resetStoryDisplay(); 
});

nextBtn.addEventListener('click', () => { 
  if (currentStoryIndex < storiesData.length - 1) currentStoryIndex++; 
  storySelect.value = currentStoryIndex;
  resetStoryDisplay(); 
});

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
