let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;
let showEN = false;

const storyContainer = document.getElementById('storyContainer');
const sentenceElem = document.getElementById('sentence');
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
    displaySentence();
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

// Display current sentence
function displaySentence() {
  const story = storiesData[currentStoryIndex];
  const sentence = story.sentences[currentSentenceIndex];

  if (showEN) {
    sentenceElem.textContent = sentence.en;
  } else {
    sentenceElem.textContent = sentence.vi;
  }
}

// Toggle sentence on tap/click
storyContainer.addEventListener('click', () => {
  showEN = !showEN;
  displaySentence();
});

// Buttons
prevBtn.addEventListener('click', () => {
  currentSentenceIndex = Math.max(0, currentSentenceIndex - 1);
  showEN = false;
  displaySentence();
});

startOverBtn.addEventListener('click', () => {
  currentSentenceIndex = 0;
  showEN = false;
  displaySentence();
});

nextBtn.addEventListener('click', () => {
  const story = storiesData[currentStoryIndex];
  if (currentSentenceIndex < story.sentences.length - 1) {
    currentSentenceIndex++;
  } else {
    currentSentenceIndex = 0; // loop back to start
  }
  showEN = false;
  displaySentence();
});

// Language selection
languageSelect.addEventListener('change', () => {
  displaySentence();
});

// Story selection
storySelect.addEventListener('change', (e) => {
  currentStoryIndex = parseInt(e.target.value);
  currentSentenceIndex = 0;
  showEN = false;
  displaySentence();
});
