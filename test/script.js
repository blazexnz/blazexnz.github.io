let storiesData = [];
let currentStoryIndex = 0;
let currentSentenceIndex = 0;
let currentFontSize = 20;

let pureCI = true;          // ✅ Pure CI ON by default
let showPreload = true;     // ✅ show English preload once per story


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

function advanceStory() {
  const story = storiesData[currentStoryIndex];
  const lang = languageSelect.value;

  // Title
  if (currentSentenceIndex === 0 && storyContainer.textContent === '') {
    storyContainer.textContent = `🌟 Story ${currentStoryIndex + 1}: ${story.title}\n\n`;

    // Optional preload (English shown ONCE, not line-by-line)
    if (pureCI && showPreload && story.preload && story.preload.length) {
      storyContainer.textContent += `🧠 Meaning preload (read once):\n`;
      story.preload.forEach(item => {
        storyContainer.textContent += `- ${item.vi} = ${item.en}\n`;
      });
      storyContainer.textContent += `\n📖 Story (Vietnamese only):\n`;
    }
    return;
  }

  if (currentSentenceIndex >= story.sentences.length) {
    if (story.focusWords) storyContainer.textContent += `\n👉 Focus: ${story.focusWords}\n`;
    return;
  }

  const sentence = story.sentences[currentSentenceIndex];

  // Pick correct language field
  let text = sentence.vi;
  if (lang === 'tl') text = sentence.tl;
  if (lang === 'jp') text = sentence.jp;

  // ✅ Pure CI: show only the target language line
  if (pureCI) {
    storyContainer.textContent += `${currentSentenceIndex + 1}. ${text}\n`;
    currentSentenceIndex++;
    return;
  }

  // (Optional) Old behavior fallback: VN then EN
  storyContainer.textContent += `${currentSentenceIndex + 1}. ${text} → ${sentence.en}\n`;
  currentSentenceIndex++;
}


// Reset story display
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
    })
    .catch(err => {
      storyContainer.textContent = '❌ Failed to load stories';
      console.error('Story load error:', err);
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
  })
  .catch(err => {
    storyContainer.textContent = '❌ Failed to load stories';
    console.error('Story load error:', err);
  });
