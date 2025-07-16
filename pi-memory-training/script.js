let listData = [];
let listItems = [];
let currentIndex = 0;

// Load the config JSON and initialize the app
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        listData = data;
    })
    .catch(error => {
        console.error('Error loading config.json:', error);
        alert('Could not load training list.');
    });

function showList() {
    const listElement = document.getElementById("list");

    // Clear the list before adding new items
    listElement.innerHTML = '';
    listItems = [];
    currentIndex = 0;

    // Create li elements dynamically based on the array
    listData.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
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
