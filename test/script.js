let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;
let currentFontSize = 20;

// Reveal state:
// 0 = title
// 1 = target language (vi/tl/jp) sentences
// 2 = english sentences
// 3 = focus words
let revealPhase = 0;

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

// Advance story by one reveal (all target language first, then all English)
function advanceStory() {
  const story = storiesData[currentStoryIndex];
  const lang = languageSelect.value;

  // Phase 0: Title
  if (revealPhase === 0) {
    // Only print title once
    if (storyContainer.textContent === '') {
      storyContainer.textContent = `🌟 Story ${currentStoryIndex + 1}: ${story.title}\n\n`;
    }
    revealPhase = 1;
    currentSentenceIndex = 0;
    return;
  }

  // Phase 1: Target language sentences (one-by-one)
  if (revealPhase === 1) {
    if (currentSentenceIndex >= story.sentences.length) {
      storyContainer.textContent += `\n`;
      revealPhase = 2;
      currentSentenceIndex = 0;
      return;
    }

    const sentence = story.sentences[currentSentenceIndex];
    let text;
    if (lang === 'vi') text = sentence.vi;
    else if (lang === 'tl') text = sentence.tl;
    else if (lang === 'jp') text = sentence.jp;
    else text = sentence.vi;

    storyContainer.textContent += `${currentSentenceIndex + 1}. ${text}\n`;
    currentSentenceIndex++;
    return;
  }

  // Phase 2: English sentences (one-by-one)
  if (revealPhase === 2) {
    if (currentSentenceIndex >= story.sentences.length) {
      revealPhase = 3;
      return;
    }

    const sentence = story.sentences[currentSentenceIndex];
    storyContainer.textContent += `${currentSentenceIndex + 1}. ${sentence.en}\n`;
    currentSentenceIndex++;
    return;
  }

  // Phase 3: Focus words (once)
  if (revealPhase === 3) {
    if (story.focusWords) {
      // Only add once
      if (!storyContainer.textContent.includes('\n👉 Focus words:')) {
        storyContainer.textContent += `\n👉 Focus words: ${story.focusWords}\n`;
      }
    }
    revealPhase = 4; // done
    return;
  }
}

// Reset story display
function resetStoryDisplay() {
  currentSentenceIndex = 0;
  revealPhase = 0;
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
