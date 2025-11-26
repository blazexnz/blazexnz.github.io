let listData = [];
let listItems = [];
let currentIndex = 0;

function loadSelectedConfig() {
    const selectedFile = document.getElementById("configSelect").value;
    
    fetch(selectedFile)
        .then(response => response.json())
        .then(data => {
            listData = data;
            resetList(); // reset view if new config loaded
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
