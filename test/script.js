let listData = [];
let listItems = [];
let currentIndex = 0;
let isCardSet = false; // ⭐ NEW — tracks if list contains playing cards

function loadSelectedConfig() {
    const selectedFile = document.getElementById("configSelect").value;
    
    fetch(selectedFile)
        .then(response => response.json())
        .then(data => {
            listData = data;

            // ⭐ Detect if the dataset contains card symbols
            isCardSet = listData.some(item => /[♠♣♥♦]/.test(item));

            resetList();
        })
        .catch(error => {
            console.error('Error loading config:', error);
            alert('Failed to load the selected memory list.');
        });
}

// Load default on startup
window.onload = function () {
    loadSelectedConfig();
};

function colorizeSuits(text) {
    return text
        .replace(/♠/g, '<span style="color:black;">♠</span>')
        .replace(/♣/g, '<span style="color:black;">♣</span>')
        .replace(/♥/g, '<span style="color:red;">♥</span>')
        .replace(/♦/g, '<span style="color:red;">♦</span>');
}

function showList() {
    const listElement = document.getElementById("list");

    listElement.innerHTML = '';
    listItems = [];
    currentIndex = 0;

    // ⭐ Apply or remove card style class
    if (isCardSet) {
        listElement.classList.add("card-mode");
    } else {
        listElement.classList.remove("card-mode");
    }

    listData.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = colorizeSuits(item);
        li.style.display = "none";
        listElement.appendChild(li);
        listItems.push(li);
    });

    listElement.style.display = "block";
    document.body.addEventListener('click', revealNextItem);
}

function revealNextItem() {
    if (currentIndex < listItems.length) {
        listItems[currentIndex].style.display = "block";
        listItems[currentIndex].scrollIntoView({ behavior: "smooth", block: "end" });
        currentIndex++;
    }
}

function resetList() {
    const listElement = document.getElementById("list");
    listElement.style.display = "none";
    listItems.forEach(item => item.style.display = "none");
    currentIndex = 0;
}
