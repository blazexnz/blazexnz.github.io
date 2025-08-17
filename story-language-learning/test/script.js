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

const increaseFontBtn = document.getElementById('increaseFont');
const decreaseFontBtn = document.getElementById('decreaseFont');

// Load stories
fetch('stories.json')
  .then(response => response.json())
  .then(data => {
    storiesData = data.stories;
    populateStorySelect();
    resetStoryDisplay();
  });

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

  if (currentSentenceIndex === 0 && !showingEN && storyContainer.textContent === '') {
    storyContainer.textContent = `🌟 Story ${currentStoryIndex + 1}: ${story.title}\n\n`;
    showingEN = false;
    return;
  }

  if (currentSentenceIndex >= story.sentences.length) return;

  const sentence = story.sentences[currentSentenceIndex];
  let textToAdd = showingEN ? (languageSelect.value === 'vi' ? sentence.en : sentence.vi)
                            : (languageSelect.value === 'vi' ? sentence.vi : sentence.en);

  if (!showingEN) {
    storyContainer.textContent += `${currentSentenceIndex + 1}. ${textToAdd}`;
  } else {
    storyContainer.textContent += ` → ${textToAdd}\n`;
    currentSentenceIndex++;
  }

  showingEN = !showingEN;

  if (currentSentenceIndex >= story.sentences.length && !showingEN) {
    storyContainer.textContent += `\n👉 Focus words: ${story.focusWords}\n`;
  }

  // Auto-scroll to bottom
  storyContainer.scrollTop = storyContainer.scrollHeight;
}

function resetStoryDisplay() {
  currentSentenceIndex = 0;
  showingEN = false;
  storyContainer.textContent = '';
  advanceStory();
  storyContainer.scrollTop = 0; // reset scroll
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

document.body.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;
  advanceStory();
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

startOverBtn.addEventListener('click', () => {
  resetStoryDisplay();
});

languageSelect.addEventListener('change', () => {
  storyContainer.textContent = '';
  currentSentenceIndex = 0;
  showingEN = false;
  advanceStory();
});

storySelect.addEventListener('change', (e) => {
  currentStoryIndex = parseInt(e.target.value);
  resetStoryDisplay();
});
