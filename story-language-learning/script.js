let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;
let showingEN = false; // track whether EN is currently displayed

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

// Show next part of current sentence
function advanceStory() {
  const story = storiesData[currentStoryIndex];
  if (currentSentenceIndex >= story.sentences.length) return;

  const sentence = story.sentences[currentSentenceIndex];
  let textToAdd = showingEN ? (languageSelect.value === 'vi' ? sentence.en : sentence.vi) 
                            : (languageSelect.value === 'vi' ? sentence.vi : sentence.en);

  // Add line breaks
  storyContainer.textContent += (storyContainer.textContent ? '\n' : '') + textToAdd;

  if (showingEN) {
    // finished this sentence, move to next
    currentSentenceIndex++;
    showingEN = false;
    storyContainer.textContent += '\n'; // extra line break between sentences
  } else {
    showingEN = true;
  }
}

// Reset story display
function resetStoryDisplay() {
  currentSentenceIndex = 0;
  showingEN = false;
  storyContainer.textContent = '';
  advanceStory();
}

// Click anywhere to advance story
document.body.addEventListener('click', (e) => {
  // Prevent advance when clicking controls or selects
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;
  advanceStory();
});

// Buttons for story navigation
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

// Language selection
languageSelect.addEventListener('change', () => {
  const story = storiesData[currentStoryIndex];
  storyContainer.textContent = '';
  // Reset to start
  currentSentenceIndex = 0;
  showingEN = false;
  advanceStory();
});

// Story selection
storySelect.addEventListener('change', (e) => {
  currentStoryIndex = parseInt(e.target.value);
  resetStoryDisplay();
});
