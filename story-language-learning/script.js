let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;

const storyContainer = document.getElementById('storyContainer');
const languageSelect = document.getElementById('languageSelect');
const storySelect = document.getElementById('storySelect');

const prevBtn = document.getElementById('prevBtn');
const startOverBtn = document.getElementById('startOverBtn');
const nextBtn = document.getElementById('nextBtn');

// Load stories from JSON
fetch('stories.json')
  .then(response => response.json())
  .then(data => {
    storiesData = data.stories;
    populateStorySelect();
    resetStoryDisplay();
  });

// Populate story selection dropdown
function populateStorySelect() {
  storySelect.innerHTML = '';
  storiesData.forEach((story, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${index + 1}: ${story.title}`;
    storySelect.appendChild(option);
  });
}

// Display next part of story
function advanceStory() {
  const story = storiesData[currentStoryIndex];
  if (currentSentenceIndex >= story.sentences.length) return;

  const sentence = story.sentences[currentSentenceIndex];
  let text = '';

  if (languageSelect.value === 'vi') {
    text = sentence.vi + '\n' + sentence.en;
  } else {
    text = sentence.en + '\n' + sentence.vi;
  }

  // Add to existing content with double line break
  storyContainer.textContent += (storyContainer.textContent ? '\n\n' : '') + text;

  currentSentenceIndex++;
}

// Reset story display
function resetStoryDisplay() {
  currentSentenceIndex = 0;
  storyContainer.textContent = '';
  advanceStory();
}

// Click anywhere to advance story
document.body.addEventListener('click', (e) => {
  // Prevent double-advance when clicking controls
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;
  advanceStory();
});

// Buttons
prevBtn.addEventListener('click', () => {
  if (currentSentenceIndex > 1) {
    currentSentenceIndex -= 2;
    const story = storiesData[currentStoryIndex];
    storyContainer.textContent = '';
    for (let i = 0; i < currentSentenceIndex; i++) {
      const s = story.sentences[i];
      storyContainer.textContent += (i > 0 ? '\n\n' : '') + (languageSelect.value === 'vi' ? `${s.vi}\n${s.en}` : `${s.en}\n${s.vi}`);
    }
    currentSentenceIndex++;
  }
});

startOverBtn.addEventListener('click', () => {
  resetStoryDisplay();
});

nextBtn.addEventListener('click', () => {
  advanceStory();
});

// Language selection
languageSelect.addEventListener('change', () => {
  const story = storiesData[currentStoryIndex];
  storyContainer.textContent = '';
  for (let i = 0; i < currentSentenceIndex; i++) {
    const s = story.sentences[i];
    storyContainer.textContent += (i > 0 ? '\n\n' : '') + (languageSelect.value === 'vi' ? `${s.vi}\n${s.en}` : `${s.en}\n${s.vi}`);
  }
});

// Story selection
storySelect.addEventListener('change', (e) => {
  currentStoryIndex = parseInt(e.target.value);
  resetStoryDisplay();
});
