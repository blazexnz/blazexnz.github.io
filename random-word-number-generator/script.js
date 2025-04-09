document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const toggleBtn = document.getElementById("toggleBtn");
    const copyBtn = document.getElementById("copyBtn");
    const modeSelect = document.getElementById("mode");
    const countInput = document.getElementById("count");
    const resultList = document.getElementById("resultList");
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const counterValue = document.getElementById("counterValue");
    const resetBtn = document.getElementById("resetBtn");
    const backToTopBtn = document.getElementById("backToTopBtn");  // Added back to top button reference
    let isHidden = false;
    let counter = 0;

    // Array of 1,000 basic everyday nouns
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
        "zipper", "zoo", "accordion", "admiral", "aeroplane", "airship", "album", "alcohol", "ambulance", "anatomy", 
        "angel", "ankle", "apricot", "appliance", "apprentice", "arm", "arrow", "ash", "astronaut", "athlete", 
        "atom", "audience", "auction", "avocado", "backbone", "backyard", "ball", "balloon", "barbell", "barcode", 
        "barnacle", "barrack", "barrier", "base", "baseball", "basketball", "bathtub", "beach", "beacon", "beak", 
        "beaker", "beam", "beanie", "bear", "beard", "beating", "beauty", "bed", "beehive", "beetle", "belly", 
        "bicycle", "bill", "billiard", "bingo", "birdcage", "birthday", "blender", "blouse", "board", "boiler", 
        "bottle", "box", "brake", "brass", "broomstick", "brow", "bucket", "bulb", "cactus", "cafe", "camera", 
        "canister", "cannon", "carpet", "carton", "catapult", "cauldron", "celebration", "centipede", "chalk", 
        "charcoal", "checklist", "cheese", "chemistry", "cherry", "chest", "chimney", "chip", "chocolate", "chopstick",
        "clamp", "claw", "clip", "clothesline", "clutch", "coal", "cocktail", "coin", "colander", "comb", "computer", 
        "cone", "cork", "couch", "cup", "cushion", "dagger", "dart", "desk", "diary", "dinosaur", "dish", "doll", 
        "door", "doorbell", "doormat", "drawer", "drum", "dustpan", "ear", "earphone", "easel", "eggplant", "elephant",
        "envelope", "eraser", "excavator", "eyebrow", "fence", "fishbowl", "flowerpot", "fork", "frame", "frying pan",
        "gadget", "garbage", "glasses", "glove", "guitar", "helmet", "hexagon", "hook", "hula", "ice", "incense", 
        "ink", "jacket", "jellybean", "jigsaw", "jug", "keychain", "keypad", "knight", "ladder", "leaf", "lens",
        "lighthouse", "lotion", "magnet", "map", "marker", "mat", "measuring cup", "mug", "nail", "necklace", "notebook",
        "octopus", "onion", "orange", "paintbrush", "piano", "picnic", "plate", "pliers", "postcard", "printer", 
        "puzzle", "quilt", "racket", "ring", "rocket", "rooster", "scissors", "screwdriver", "shelving", "skillet", 
        "snack", "snowflake", "spatula", "suitcase", "syrup", "television", "ticket", "toaster", "towel", "toothbrush",
        "trolley", "vacuum", "vase", "wallet", "washing machine", "watermelon", "whistle", "window", "wrench", "yarn",
        "zipper", "zombie"
    ];

    generateBtn.addEventListener("click", function () {
        const mode = modeSelect.value;
        const count = Math.max(1, parseInt(countInput.value) || 20);
        resultList.innerHTML = "";

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
                listItem.textContent = Math.floor(Math.random() * 100);
                resultList.appendChild(listItem);
            }
        }
    });

    toggleBtn.addEventListener("click", function () {
        isHidden = !isHidden;
        resultList.style.display = isHidden ? "none" : "block";
        toggleBtn.textContent = isHidden ? "Show List" : "Hide List";
    });

    copyBtn.addEventListener("click", function () {
        const items = resultList.querySelectorAll("li");
        if (items.length === 0) return;

        const text = Array.from(items).map(item => item.textContent).join("\n");
        navigator.clipboard.writeText(text).catch(err => console.error("Failed to copy:", err));
    });

    minusBtn.addEventListener("click", function () {
        if (counter > 0) {
            counter--;
            counterValue.textContent = counter;
        }
    });

    plusBtn.addEventListener("click", function () {
        counter++;
        counterValue.textContent = counter;
    });

    resetBtn.addEventListener("click", function () {
        counter = 0;
        counterValue.textContent = counter;
    });

    // Event listener for "Back to Top" button
    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});
