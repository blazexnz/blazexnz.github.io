let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;
let showingEN = false;
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

// Advance story by one reveal
function advanceStory() {
  const story = storiesData[currentStoryIndex];

  if (currentSentenceIndex === 0 && !showingEN && storyContainer.textContent === '') {
    storyContainer.textContent = `🌟 Story ${currentStoryIndex + 1}: ${story.title}\n\n`;
    showingEN = false;
    return;
  }

  if (currentSentenceIndex >= story.sentences.length) return;

  const sentence = story.sentences[currentSentenceIndex];
  const lang = languageSelect.value;

  if (!showingEN) {
    let text;
    if (lang === 'vi') text = sentence.vi;
    else if (lang === 'tl') text = sentence.tl;
    else if (lang === 'jp') text = sentence.jp;
    else text = sentence.vi;

    storyContainer.textContent += `${currentSentenceIndex + 1}. ${text}`;
    showingEN = true;
  } else {
    storyContainer.textContent += ` → ${sentence.en}\n`;
    showingEN = false;
    currentSentenceIndex++;
  }

  if (currentSentenceIndex >= story.sentences.length && !showingEN && story.focusWords) {
    storyContainer.textContent += `\n👉 Focus words: ${story.focusWords}\n`;
  }
}

// Reset story display
function resetStoryDisplay() {
  currentSentenceIndex = 0;
  showingEN = false;
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
