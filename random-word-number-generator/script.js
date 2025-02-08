document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const toggleBtn = document.getElementById("toggleBtn");
    const modeSelect = document.getElementById("mode");
    const countInput = document.getElementById("count");
    const resultList = document.getElementById("resultList");
    let isHidden = false;

    // Array of 500 basic everyday nouns
    const words = [
        "apple", "banana", "book", "bottle", "chair", "clock", "cup", "desk", "door", "egg",
        "fan", "flag", "flower", "fork", "glass", "hat", "key", "lamp", "leaf", "letter",
        "light", "map", "mirror", "pen", "pencil", "plate", "poster", "radio", "scissors", "shirt",
        "shoe", "spoon", "straw", "table", "television", "toothbrush", "towel", "umbrella", "wallet", "watch",
        "window", "airplane", "backpack", "banana", "battery", "bicycle", "bowl", "bread", "camera", "car",
        "cart", "cigarette", "clock", "coin", "computer", "couch", "cupboard", "diamond", "dish", "doorway",
        "dresser", "earphone", "envelope", "eraser", "furniture", "glove", "hammer", "headphone", "ice", "keychain",
        "knife", "ladder", "lemon", "letter", "magnet", "microwave", "mobile", "needle", "newspaper", "notebook",
        "ocean", "orange", "pillow", "plaque", "postcard", "printer", "quilt", "refrigerator", "remote", "rubber",
        "rug", "shelf", "shovel", "socks", "spade", "spoon", "stapler", "stool", "suitcase", "tablecloth",
        "tape", "television", "tissue", "toaster", "toothpaste", "towel", "train", "trashcan", "vacuum", "vase",
        "watch", "wallet", "washer", "whistle", "window", "wrench", "yarn", "zebra", "alarm", "alligator", "ambulance",
        "anchor", "angel", "animal", "apron", "architect", "ashtray", "atlas", "aunt", "balloon", "banana",
        "barn", "baseball", "basket", "bat", "battery", "beach", "bear", "bed", "bee", "beef", "bell", "belt",
        "bicycle", "billboard", "bird", "boat", "body", "bookcase", "border", "bottle", "bowtie", "bowl", "bracelet",
        "brain", "bread", "bridge", "brother", "broom", "brush", "bucket", "bus", "butterfly", "button", "cake", 
        "camera", "camp", "candle", "cap", "car", "carpet", "cart", "casket", "cat", "caterpillar", "ceiling", 
        "cellphone", "chalk", "chair", "chalkboard", "cheese", "chicken", "child", "chocolate", "circle", "clocks",
        "clothes", "coaster", "coffee", "coin", "computer", "cup", "cushion", "desk", "doll", "dog", "dollhouse", 
        "door", "dragon", "dresser", "earphones", "elephant", "envelope", "eraser", "excavator", "fence", "fish",
        "flower", "folder", "football", "fork", "frame", "frying pan", "funnel", "game", "giraffe", "glasses", "glove",
        "grapes", "guitar", "hammer", "hat", "headphone", "helmet", "hen", "hook", "house", "ice", "image", 
        "ink", "jacket", "jar", "jelly", "jigsaw", "jug", "kangaroo", "key", "keyboard", "kettle", "kite", 
        "lamp", "laptop", "leaf", "letter", "lighthouse", "lollipop", "magnet", "marker", "mattress", "microphone",
        "microwave", "mirror", "mom", "monkey", "mug", "nail", "nurse", "notebook", "orange", "paintbrush", 
        "pencil", "pen", "piano", "picture", "plane", "plank", "plate", "pocket", "popsicle", "postcard", "printer",
        "pumpkin", "quilt", "racket", "radio", "refrigerator", "remote", "ring", "rocket", "scissors", "shoe", 
        "shirt", "shovel", "shelf", "skateboard", "snowman", "soap", "sock", "spoon", "stapler", "stove", "suitcase",
        "table", "television", "ticket", "toaster", "toothbrush", "towel", "train", "tree", "trophy", "umbrella", 
        "vacuum", "vase", "violin", "wallet", "washing machine", "whistle", "window", "wrench", "yarn", "zebra",
        "zipper", "zoo"
    ];

    generateBtn.addEventListener("click", function () {
        const mode = modeSelect.value;
        const count = Math.max(1, parseInt(countInput.value) || 5);
        resultList.innerHTML = ""; // Clear previous results

        if (mode === "word") {
            const shuffledWords = [...words].sort(() => Math.random() - 0.5).slice(0, count);
            shuffledWords.forEach(word => {
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
