document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const toggleBtn = document.getElementById("toggleBtn");
    const modeSelect = document.getElementById("mode");
    const countInput = document.getElementById("count");
    const resultList = document.getElementById("resultList");
    let isHidden = false;

    async function fetchRandomWords(count) {
        try {
            const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${count}`);
            const words = await response.json();
            return words;
        } catch (error) {
            console.warn("Failed to fetch words, using fallback.");
            return Array.from({ length: count }, (_, i) => `word${i + 1}`); // Fallback words
        }
    }

    generateBtn.addEventListener("click", async function () {
        const mode = modeSelect.value;
        const count = Math.max(1, parseInt(countInput.value) || 5);
        resultList.innerHTML = ""; // Clear previous results

        if (mode === "word") {
            const words = await fetchRandomWords(count);
            words.forEach(word => {
                const listItem = document.createElement("li");
                listItem.textContent = word;
                resultList.appendChild(listItem);
            });
        } else {
            for (let i = 0; i < count; i++) {
                const listItem = document.createElement("li");
                listItem.textContent = Math.floor(Math.random() * 100); // Random number 0-99
                resultList.appendChild(listItem);
            }
        }
    });

    toggleBtn.addEventListener("click", function () {
        isHidden = !isHidden;
        resultList.style.display = isHidden ? "none" : "block";
        toggleBtn.textContent = isHidden ? "Show List" : "Hide List";
    });
});
